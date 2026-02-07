import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { boredomLevel, selectedTags } = req.body;

  if (typeof boredomLevel !== 'number' || !Array.isArray(selectedTags)) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const apiKey = process.env.GEMINI_API_KEY; // Ensure this matches your .env key

  if (!apiKey) {
    console.error('API KEY missing');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  // ─────────────────────────────────────────────
  // Refined Prompt with Type "Game"
  // ─────────────────────────────────────────────
 const prompt = `
ROLE:
You are the "Neural Bridge" – an elite Boredom-Killing Curator. Your mission is to rescue the user from the "Existential Void" using high-immersion digital escapes.

CORE PSYCHOLOGY:
Boredom is killed by IMMERSION, not just browsing.
- If Boredom Level < 5: Suggest "Quick Hits" (Interactive toys, weird visual generators).
- If Boredom Level > 5: Suggest "Deep Rabbit Holes" (Long-form mysteries, complex simulations, infinite scroll art).

ABSOLUTE RULES:
1. NO GENERIC LINKS: Do not suggest Google or Wikipedia homepages. Suggest specific, obscure sub-pages (e.g., "List of Unsolved Murders" instead of "History").
2. INTERACTIVE FIRST: Prioritize sites where the user MUST click, move, or play (Neal.fun, Window-Swap, etc.).
3. THE "RABBIT HOLE" EFFECT: Every suggestion must feel like the start of a 2-hour journey.
4. WEB GAMES OVERRIDE: If "Web Games" is selected, the first item MUST be https://www.imborednow.com/p/games-to-play-when-bored or a high-quality Poki game.

WHITELIST & VIBE MAPPING:
- Discovery: NASA Image Galleries, Atlas Obscura, Archive.org (Old Software Library).
- Mental: Longreads.com, WaitButWhy, Paradox collections.
- Creative: Silk.co, Radio.garden, Incredibox.
- Play: Neal.fun, Geoguessr, Poki.com, TheUselessWeb.

OUTPUT REQUIREMENT:
Return ONLY a JSON array. 
- "why_it_cures_boredom": Write this like a mysterious invitation or a "hook" (e.g., "You will forget what year it is once you start spinning this globe").
- "depth_rating": Scale of 1-10 (Matches how much time it will suck away).

[
  {
    "title": "String",
    "type": "YouTube" | "PDF" | "Image" | "Game" | "Interactive",
    "url": "String",
    "why_it_cures_boredom": "String",
    "depth_rating": number
  }
]
`.trim();

  // ─────────────────────────────────────────────
  // Helpers & Validation Logic
  // ─────────────────────────────────────────────
  async function fetchHead(url: string) {
    try {
      const response = await fetch(url, {
        method: 'HEAD',
        redirect: 'follow',
        signal: AbortSignal.timeout(4000),
      });
      return response;
    } catch {
      return null;
    }
  }

  function fallbackUrl(type: string, title: string) {
    const q = encodeURIComponent(title);
    switch (type) {
      case 'YouTube': return `https://www.youtube.com/results?search_query=${q}`;
      case 'PDF': return `https://archive.org/search?query=${q}`;
      case 'Image': return `https://commons.wikimedia.org/wiki/Special:Search?search=${q}`;
      case 'Game': return `https://poki.com/en/search?q=${q}`;
      default: return `https://www.google.com/search?q=${q}`;
    }
  }

  async function validateByType(item: any): Promise<boolean> {
    // Immediate pass for trusted interactive/game domains that might block HEAD requests
    const trustedDomains = ['poki.com', 'imborednow.com', 'neal.fun', 'radio.garden', 'window-swap.com'];
    if (trustedDomains.some(d => item.url.includes(d))) return true;

    const res = await fetchHead(item.url);
    if (!res || !res.ok) return false;

    const contentType = res.headers.get('content-type') || '';

    if (item.type === 'YouTube') return item.url.includes('youtube.com') || item.url.includes('youtu.be');
    if (item.type === 'PDF') return contentType.includes('pdf') || item.url.includes('archive.org');
    if (item.type === 'Image') return contentType.startsWith('image/') || item.url.includes('wikimedia.org');
    
    return true; 
  }

  // ─────────────────────────────────────────────
  // Groq / Llama Call
  // ─────────────────────────────────────────────
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: 'Output ONLY a JSON array. Ensure every item has a valid URL. If a direct link is risky, use a search result link.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.5,
      }),
    });

    const data = await response.json();
    let raw = data.choices?.[0]?.message?.content || '[]';
    raw = raw.replace(/^```json/i, '').replace(/```$/, '').trim();

    let recommendations = JSON.parse(raw);

    // Validation & Repair Loop
    for (const item of recommendations) {
      const isValid = await validateByType(item);
      if (!isValid || !item.url || item.url === '') {
        item.url = fallbackUrl(item.type, item.title);
      }
    }

    return res.status(200).json({ recommendations });
  } catch (err: any) {
    console.error('API Error:', err);
    return res.status(500).json({ error: 'Synthesis failed', details: err.message });
  }
}