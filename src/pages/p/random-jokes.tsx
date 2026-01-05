/* eslint-disable react-hooks/purity */
import { useState, useEffect, useMemo } from "react";
import Head from "next/head";
import Link from "next/link";

// --- CUSTOM ICONS COMPONENT ---
const Icons = {
  Heart: ({ className = "", filled = false }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
  ),
  Bookmark: ({ className = "", filled = false }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
    </svg>
  ),
  Share: ({ className = "" }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="18" cy="5" r="3"></circle>
      <circle cx="6" cy="12" r="3"></circle>
      <circle cx="18" cy="19" r="3"></circle>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
    </svg>
  ),
  Refresh: ({ className = "" }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"></path>
    </svg>
  ),
};

const JOKES = [
  {
    id: 1,
    joke: "Why don't scientists trust atoms? Because they make up everything!",
    country: "US",
    type: "pun",
  },
  {
    id: 2,
    joke: "What do you call a fake noodle? An impasta!",
    country: "US",
    type: "pun",
  },
  {
    id: 3,
    joke: "Why did the scarecrow win an award? He was outstanding in his field!",
    country: "US",
    type: "pun",
  },
  {
    id: 4,
    joke: "How do you organize a space party? You planet!",
    country: "US",
    type: "pun",
  },
  {
    id: 5,
    joke: "What do you call cheese that isn't yours? Nacho cheese!",
    country: "US",
    type: "pun",
  },
  {
    id: 6,
    joke: "Why couldn't the bicycle stand up by itself? It was two tired!",
    country: "US",
    type: "pun",
  },
  {
    id: 7,
    joke: "What did the ocean say to the beach? Nothing, it just waved!",
    country: "US",
    type: "pun",
  },
  {
    id: 8,
    joke: "Why don't eggs tell jokes? They'd crack each other up!",
    country: "US",
    type: "pun",
  },
  {
    id: 9,
    joke: "What do you call a bear with no teeth? A gummy bear!",
    country: "US",
    type: "pun",
  },
  {
    id: 10,
    joke: "Why did the math book look so sad? Because it had too many problems!",
    country: "US",
    type: "pun",
  },
  {
    id: 11,
    joke: "I told my girlfriend she drew her eyebrows too high. She seemed surprised.",
    country: "UK",
    type: "oneliner",
  },
  {
    id: 12,
    joke: "Why did the Brit cross the road? To get to the pub!",
    country: "UK",
    type: "cultural",
  },
  {
    id: 13,
    joke: "How do you know you're British? You apologize to the table when you bump into it!",
    country: "UK",
    type: "cultural",
  },
  {
    id: 14,
    joke: "Why do British people never get sunburned? The sun never shines there!",
    country: "UK",
    type: "cultural",
  },
  {
    id: 15,
    joke: "How does a British person start a race? Ready, steady, cheerio!",
    country: "UK",
    type: "cultural",
  },
  {
    id: 16,
    joke: "How do Canadians practice safe driving? They keep their moose on a leash!",
    country: "Canada",
    type: "cultural",
  },
  {
    id: 17,
    joke: "Why did the Canadian cross the road? To say sorry to the chicken!",
    country: "Canada",
    type: "cultural",
  },
  {
    id: 18,
    joke: "What do you call a sophisticated Canadian? A-moose-ing!",
    country: "Canada",
    type: "pun",
  },
  {
    id: 19,
    joke: "What's a Canadian's favorite letter? Eh!",
    country: "Canada",
    type: "cultural",
  },
  {
    id: 20,
    joke: "What do Canadians call a fight? A disagreement, sorry!",
    country: "Canada",
    type: "cultural",
  },
  {
    id: 21,
    joke: "Why did the Indian chef win an award? His food was curry-ous!",
    country: "India",
    type: "pun",
  },
  {
    id: 22,
    joke: "What do you call an Indian electrician? A light-wallah!",
    country: "India",
    type: "pun",
  },
  {
    id: 23,
    joke: "What's an Indian mom's favorite exercise? Jumping to conclusions!",
    country: "India",
    type: "cultural",
  },
  {
    id: 24,
    joke: "How does an Indian person start their day? With chai and a side of family expectations!",
    country: "India",
    type: "cultural",
  },
  {
    id: 25,
    joke: "What do you call an Indian who's good at math? Normal!",
    country: "India",
    type: "cultural",
  },
  {
    id: 26,
    joke: "Why did the kangaroo stop drinking coffee? It got too jumpy!",
    country: "Australia",
    type: "pun",
  },
  {
    id: 27,
    joke: "What do you call an Australian vampire? A blood-mate!",
    country: "Australia",
    type: "pun",
  },
  {
    id: 28,
    joke: "How do Australians stay cool? They just throw another shrimp on the barbie!",
    country: "Australia",
    type: "cultural",
  },
  {
    id: 29,
    joke: "What do you call a lazy Australian? A couch-a-roo!",
    country: "Australia",
    type: "pun",
  },
  {
    id: 30,
    joke: "How do you know you're in Australia? Everything is trying to kill you, but everyone is super friendly!",
    country: "Australia",
    type: "cultural",
  },
  {
    id: 31,
    joke: "What do you call a sleeping bull? A bulldozer!",
    country: "US",
    type: "pun",
  },
  {
    id: 32,
    joke: "How does a penguin build its house? Igloos it together!",
    country: "US",
    type: "pun",
  },
  {
    id: 33,
    joke: "What do you call a can opener that doesn't work? A can't opener!",
    country: "US",
    type: "pun",
  },
  {
    id: 34,
    joke: "Why did the cookie go to the doctor? It felt crumbly!",
    country: "US",
    type: "pun",
  },
  {
    id: 35,
    joke: "What's orange and sounds like a parrot? A carrot!",
    country: "US",
    type: "pun",
  },
  {
    id: 36,
    joke: "Why don't skeletons fight each other? They don't have the guts!",
    country: "US",
    type: "pun",
  },
  {
    id: 37,
    joke: "What did one wall say to the other? I'll meet you at the corner!",
    country: "US",
    type: "pun",
  },
  {
    id: 38,
    joke: "Why did the golfer bring two pairs of pants? In case he got a hole in one!",
    country: "US",
    type: "pun",
  },
  {
    id: 39,
    joke: "What do you call a factory that makes okay products? A satisfactory!",
    country: "US",
    type: "pun",
  },
  {
    id: 40,
    joke: "Why did the coffee file a police report? It got mugged!",
    country: "US",
    type: "pun",
  },
  {
    id: 41,
    joke: "What do you call a parade of rabbits hopping backwards? A receding hare-line!",
    country: "US",
    type: "pun",
  },
  {
    id: 42,
    joke: "Why don't programmers like nature? It has too many bugs!",
    country: "US",
    type: "tech",
  },
  {
    id: 43,
    joke: "What's a computer's favorite snack? Microchips!",
    country: "US",
    type: "tech",
  },
  {
    id: 44,
    joke: "Why was the computer cold? It left its Windows open!",
    country: "US",
    type: "tech",
  },
  {
    id: 45,
    joke: "How do you comfort a JavaScript bug? You console it!",
    country: "US",
    type: "tech",
  },
  {
    id: 46,
    joke: "Why do Java developers wear glasses? Because they can't C#!",
    country: "US",
    type: "tech",
  },
  {
    id: 47,
    joke: "What did the router say to the doctor? It hurts when IP!",
    country: "US",
    type: "tech",
  },
  {
    id: 48,
    joke: "Why do programmers prefer dark mode? Because light attracts bugs!",
    country: "US",
    type: "tech",
  },
  {
    id: 49,
    joke: "What's a pirate's favorite programming language? R!",
    country: "US",
    type: "tech",
  },
  {
    id: 50,
    joke: "Why did the developer go broke? Because he used up all his cache!",
    country: "US",
    type: "tech",
  },
  {
    id: 51,
    joke: "What do you call 8 hobbits? A hobbyte!",
    country: "US",
    type: "tech",
  },
  {
    id: 52,
    joke: "I'm reading a book about anti-gravity. It's impossible to put down!",
    country: "US",
    type: "oneliner",
  },
  {
    id: 53,
    joke: "I used to be addicted to soap, but I'm clean now!",
    country: "US",
    type: "oneliner",
  },
  {
    id: 54,
    joke: "Parallel lines have so much in common. It's a shame they'll never meet!",
    country: "US",
    type: "oneliner",
  },
  {
    id: 55,
    joke: "I stayed up all night wondering where the sun went. Then it dawned on me!",
    country: "US",
    type: "oneliner",
  },
  {
    id: 56,
    joke: "I'm terrified of elevators, so I'm taking steps to avoid them!",
    country: "US",
    type: "oneliner",
  },
  {
    id: 57,
    joke: "What do you call a fish wearing a bowtie? Sofishticated!",
    country: "US",
    type: "pun",
  },
  {
    id: 58,
    joke: "Why don't oysters donate to charity? Because they're shellfish!",
    country: "US",
    type: "pun",
  },
  {
    id: 59,
    joke: "What do you call a dog magician? A labracadabrador!",
    country: "US",
    type: "pun",
  },
  {
    id: 60,
    joke: "Why did the tomato turn red? Because it saw the salad dressing!",
    country: "US",
    type: "pun",
  },
  {
    id: 61,
    joke: "What do you call a belt made of watches? A waist of time!",
    country: "US",
    type: "pun",
  },
  {
    id: 62,
    joke: "Why can't you hear a pterodactyl using the bathroom? Because the P is silent!",
    country: "US",
    type: "pun",
  },
  {
    id: 63,
    joke: "What did the janitor say when he jumped out of the closet? Supplies!",
    country: "US",
    type: "pun",
  },
  {
    id: 64,
    joke: "Why did the stadium get hot? All the fans left!",
    country: "US",
    type: "pun",
  },
  {
    id: 65,
    joke: "What do you call a dinosaur with an extensive vocabulary? A thesaurus!",
    country: "US",
    type: "pun",
  },
  {
    id: 66,
    joke: "Why don't scientists trust stairs? They're always up to something!",
    country: "US",
    type: "pun",
  },
  {
    id: 67,
    joke: "What do you call a cow with no legs? Ground beef!",
    country: "US",
    type: "pun",
  },
  {
    id: 68,
    joke: "Why did the invisible man turn down the job? He couldn't see himself doing it!",
    country: "US",
    type: "pun",
  },
  {
    id: 69,
    joke: "What do you call a snowman with a six-pack? An abdominal snowman!",
    country: "US",
    type: "pun",
  },
  {
    id: 70,
    joke: "What's a British person's favorite type of music? Tea-chno!",
    country: "UK",
    type: "pun",
  },
  {
    id: 71,
    joke: "Why don't British people play hide and seek? Because good luck hiding when you're always queueing!",
    country: "UK",
    type: "cultural",
  },
  {
    id: 72,
    joke: "What do you call a British bee? A USB!",
    country: "UK",
    type: "pun",
  },
  {
    id: 73,
    joke: "Why did the British chicken cross the road? To prove it wasn't chicken!",
    country: "UK",
    type: "pun",
  },
  {
    id: 74,
    joke: "How many British people does it take to change a lightbulb? One to change it and five to discuss how much better the old one was!",
    country: "UK",
    type: "cultural",
  },
  {
    id: 75,
    joke: "What's a British person's favorite exercise? Cross-fit... cross the street to the chippy!",
    country: "UK",
    type: "cultural",
  },
  {
    id: 76,
    joke: "Why do British people love rain? It gives them something to complain about!",
    country: "UK",
    type: "cultural",
  },
  {
    id: 77,
    joke: "What do you call a sophisticated British dog? A royal corgi!",
    country: "UK",
    type: "pun",
  },
  {
    id: 78,
    joke: "Why did the British ghost go to therapy? He had too many haunted issues!",
    country: "UK",
    type: "pun",
  },
  {
    id: 79,
    joke: "How do British vampires greet each other? 'Fangs for the memories!'",
    country: "UK",
    type: "pun",
  },
  {
    id: 80,
    joke: "What's the most British thing ever? Apologizing to someone who stepped on YOUR foot!",
    country: "UK",
    type: "cultural",
  },
  {
    id: 81,
    joke: "Why don't British people trust the letter U? Because it's not in the queue!",
    country: "UK",
    type: "pun",
  },
  {
    id: 82,
    joke: "What do you call a British person in the World Cup final? A referee!",
    country: "UK",
    type: "sports",
  },
  {
    id: 83,
    joke: "Why are British people so good at chess? They've had centuries of practice with the Queen!",
    country: "UK",
    type: "cultural",
  },
  {
    id: 84,
    joke: "What's a British person's least favorite planet? The Sun!",
    country: "UK",
    type: "pun",
  },
  {
    id: 85,
    joke: "How do you confuse a British person? Put them in a roundabout without a queue!",
    country: "UK",
    type: "cultural",
  },
  {
    id: 86,
    joke: "Why did the British tea bag go to therapy? It was feeling a bit drained!",
    country: "UK",
    type: "pun",
  },
  {
    id: 87,
    joke: "What do British people call a sunny day? A false alarm!",
    country: "UK",
    type: "cultural",
  },
  {
    id: 88,
    joke: "Why are British gardens always so tidy? Because they follow the lawn and order!",
    country: "UK",
    type: "pun",
  },
  {
    id: 89,
    joke: "What's a British monster's favorite dessert? I-scream!",
    country: "UK",
    type: "pun",
  },
  {
    id: 90,
    joke: "Why do British people make terrible magicians? They always show you the trick and then apologize!",
    country: "UK",
    type: "cultural",
  },
  {
    id: 91,
    joke: "How cold is it in Canada? Even the polar bears wear jackets!",
    country: "Canada",
    type: "cultural",
  },
  {
    id: 92,
    joke: "What's a Canadian's favorite type of math? Eh-lgebra!",
    country: "Canada",
    type: "pun",
  },
  {
    id: 93,
    joke: "Why did the Canadian hockey player go to jail? For high-sticking and he was sorry about it!",
    country: "Canada",
    type: "sports",
  },
  {
    id: 94,
    joke: "What do you call a Canadian who doesn't like winter? A tourist!",
    country: "Canada",
    type: "cultural",
  },
  {
    id: 95,
    joke: "How do Canadians stay warm in winter? They stand close to Americans and absorb their heated debates!",
    country: "Canada",
    type: "cultural",
  },
  {
    id: 96,
    joke: "What's Canada's national bird? The a-moose-quito!",
    country: "Canada",
    type: "pun",
  },
  {
    id: 97,
    joke: "Why do Canadians love maple syrup? It's the only thing sweeter than their personalities!",
    country: "Canada",
    type: "cultural",
  },
  {
    id: 98,
    joke: "What do you call a Canadian standing between two Americans? A peacekeeper!",
    country: "Canada",
    type: "cultural",
  },
  {
    id: 99,
    joke: "How do you get a Canadian to leave your house? Tell them it's no trouble at all to stay!",
    country: "Canada",
    type: "cultural",
  },
  {
    id: 100,
    joke: "What's the difference between Canada and yogurt? Yogurt has active culture!",
    country: "Canada",
    type: "cultural",
  },
  {
    id: 101,
    joke: "Why did the Canadian bring a ladder to the bar? To reach the high level of politeness!",
    country: "Canada",
    type: "pun",
  },
  {
    id: 102,
    joke: "What do Canadians use to fix everything? Duct tape and apologies!",
    country: "Canada",
    type: "cultural",
  },
  {
    id: 103,
    joke: "How many Canadians does it take to change a lightbulb? None, they just apologize for the darkness!",
    country: "Canada",
    type: "cultural",
  },
  {
    id: 104,
    joke: "What's a Canadian zombie's favorite food? Graaaaavy!",
    country: "Canada",
    type: "pun",
  },
  {
    id: 105,
    joke: "Why don't Canadians get angry? They bottle it up and turn it into maple syrup!",
    country: "Canada",
    type: "cultural",
  },
  {
    id: 106,
    joke: "What do you call a Canadian who's rude? An American spy!",
    country: "Canada",
    type: "cultural",
  },
  {
    id: 107,
    joke: "How do Canadians count sheep? One sheep, two sheep, three sheep, sorry sheep!",
    country: "Canada",
    type: "cultural",
  },
  {
    id: 108,
    joke: "What's a Canadian's favorite instrument? The apologeena!",
    country: "Canada",
    type: "pun",
  },
  {
    id: 109,
    joke: "Why did the Canadian go to therapy? To apologize for taking up the therapist's time!",
    country: "Canada",
    type: "cultural",
  },
  {
    id: 110,
    joke: "What do Canadians call -20 degrees? T-shirt weather!",
    country: "Canada",
    type: "cultural",
  },
  {
    id: 111,
    joke: "How do you spot a Canadian in a crowd? They're the ones apologizing to the people who bumped into them!",
    country: "Canada",
    type: "cultural",
  },
  {
    id: 112,
    joke: "What's Canada's secret weapon? Kindness, eh!",
    country: "Canada",
    type: "cultural",
  },
  {
    id: 113,
    joke: "Why don't Canadians play poker? They're too polite to bluff!",
    country: "Canada",
    type: "cultural",
  },
  {
    id: 114,
    joke: "Why don't Indian parents trust stairs? They're always up to something!",
    country: "India",
    type: "cultural",
  },
  {
    id: 115,
    joke: "Why did the Indian student bring a ladder to school? To get to high marks!",
    country: "India",
    type: "pun",
  },
  {
    id: 116,
    joke: "What's an Indian parent's favorite music? Heavy guilt!",
    country: "India",
    type: "cultural",
  },
  {
    id: 117,
    joke: "How many Indian aunties does it take to ruin your diet? Just one to say 'You're looking thin!'",
    country: "India",
    type: "cultural",
  },
  {
    id: 118,
    joke: "What do you call an Indian superhero? Naan-violent!",
    country: "India",
    type: "pun",
  },
  {
    id: 119,
    joke: "Why did the Indian cricket team go to the bank? To get their boundaries!",
    country: "India",
    type: "sports",
  },
  {
    id: 120,
    joke: "What's an Indian mom's superpower? Calling you for dinner from three rooms away!",
    country: "India",
    type: "cultural",
  },
  {
    id: 121,
    joke: "How do Indians practice mindfulness? By remembering what their mom told them 10 years ago!",
    country: "India",
    type: "cultural",
  },
  {
    id: 122,
    joke: "What do you call an Indian who doesn't like cricket? A myth!",
    country: "India",
    type: "sports",
  },
  {
    id: 123,
    joke: "Why did the Indian traffic light turn red? It saw the traffic and gave up!",
    country: "India",
    type: "cultural",
  },
  {
    id: 124,
    joke: "What's an Indian's favorite type of dance? The chai-cha-cha!",
    country: "India",
    type: "pun",
  },
  {
    id: 125,
    joke: "How do you know you're at an Indian wedding? It's on day 3 of the 5-day celebration!",
    country: "India",
    type: "cultural",
  },
  {
    id: 126,
    joke: "What do Indian parents say to motivate their kids? 'Sharma ji's son is already a doctor!'",
    country: "India",
    type: "cultural",
  },
  {
    id: 127,
    joke: "Why don't Indians play hide and seek? Because mom will always find you, no matter where!",
    country: "India",
    type: "cultural",
  },
  {
    id: 128,
    joke: "What's an Indian engineer's favorite snack? Chips with debug sauce!",
    country: "India",
    type: "tech",
  },
  {
    id: 129,
    joke: "How many Indian relatives does it take to plan a wedding? All of them, plus their opinions!",
    country: "India",
    type: "cultural",
  },
  {
    id: 130,
    joke: "What do you call an Indian vampire? Count Chutney-la!",
    country: "India",
    type: "pun",
  },
  {
    id: 131,
    joke: "Why did the Indian ghost go to the temple? To find inner peace... finally!",
    country: "India",
    type: "cultural",
  },
  {
    id: 132,
    joke: "What's an Indian student's nightmare? Scoring 99% and being asked about the missing 1%!",
    country: "India",
    type: "cultural",
  },
  {
    id: 133,
    joke: "How do Indians solve problems? First chai, then we'll see!",
    country: "India",
    type: "cultural",
  },
  {
    id: 134,
    joke: "What do you call an Indian who arrives on time? Confused!",
    country: "India",
    type: "cultural",
  },
  {
    id: 135,
    joke: "Why did the Indian bring a suitcase to dinner? Mom said 'eat like it's your last meal!'",
    country: "India",
    type: "cultural",
  },
  {
    id: 136,
    joke: "What's an Indian parent's favorite app? WhatsApp... to forward good morning messages!",
    country: "India",
    type: "cultural",
  },
  {
    id: 137,
    joke: "How do you confuse an Indian? Give them a choice between two career paths!",
    country: "India",
    type: "cultural",
  },
  {
    id: 138,
    joke: "What do Indians call room temperature water? Unacceptable!",
    country: "India",
    type: "cultural",
  },
  {
    id: 139,
    joke: "What's an Australian spider's favorite sport? Web surfing!",
    country: "Australia",
    type: "pun",
  },
  {
    id: 140,
    joke: "Why did the Australian go to school? To improve his G'day vocabulary!",
    country: "Australia",
    type: "cultural",
  },
  {
    id: 141,
    joke: "What do Australians call a fancy dinner? Takeaway from a sit-down restaurant!",
    country: "Australia",
    type: "cultural",
  },
  {
    id: 142,
    joke: "How many Australians does it take to change a lightbulb? Three - one to change it and two to have a beer while watching!",
    country: "Australia",
    type: "cultural",
  },
  {
    id: 143,
    joke: "What's an Australian's favorite letter? C (sea)!",
    country: "Australia",
    type: "pun",
  },
  {
    id: 144,
    joke: "Why don't Australians trust atoms? Because they make up everything... even drop bears!",
    country: "Australia",
    type: "pun",
  },
  {
    id: 145,
    joke: "What do you call an Australian snowman? A puddle!",
    country: "Australia",
    type: "pun",
  },
  {
    id: 146,
    joke: "How do Australians greet their shoes? G'day, mate!",
    country: "Australia",
    type: "cultural",
  },
  {
    id: 147,
    joke: "What's the most dangerous thing in Australia? Running out of beer!",
    country: "Australia",
    type: "cultural",
  },
  {
    id: 148,
    joke: "Why did the Australian emu cross the road? Because it can't fly!",
    country: "Australia",
    type: "pun",
  },
  {
    id: 149,
    joke: "What do Australians call 40 degrees? Winter's over!",
    country: "Australia",
    type: "cultural",
  },
  {
    id: 150,
    joke: "How do you compliment an Australian? 'You're not bad, mate!'",
    country: "Australia",
    type: "cultural",
  },
  {
    id: 151,
    joke: "Why did the Irishman wear two jackets to paint? Because the can said 'two coats'!",
    country: "Ireland",
    type: "pun",
  },
  {
    id: 152,
    joke: "What's Irish and stays out all night? Patty O'Furniture!",
    country: "Ireland",
    type: "pun",
  },
  {
    id: 153,
    joke: "How can you tell if an Irishman is having a good time? He's Dublin over with laughter!",
    country: "Ireland",
    type: "pun",
  },
  {
    id: 154,
    joke: "Why do Irish people tell the best stories? They have the gift of the blarney!",
    country: "Ireland",
    type: "cultural",
  },
  {
    id: 155,
    joke: "What's an Irish seven-course meal? A six-pack and a potato!",
    country: "Ireland",
    type: "cultural",
  },
  {
    id: 156,
    joke: "How do you get an Irish person to climb on the roof? Tell them the drinks are on the house!",
    country: "Ireland",
    type: "pun",
  },
  {
    id: 157,
    joke: "What do you call an Irish spider? Paddy long legs!",
    country: "Ireland",
    type: "pun",
  },
  {
    id: 158,
    joke: "Why don't Irish people do well in marathons? They're always Dublin back!",
    country: "Ireland",
    type: "pun",
  },
  {
    id: 159,
    joke: "What's Ireland's national bird? The sham-rock!",
    country: "Ireland",
    type: "pun",
  },
  {
    id: 160,
    joke: "How do Irish people stay warm? They stand in the corner where it's always 90 degrees!",
    country: "Ireland",
    type: "pun",
  },
  {
    id: 161,
    joke: "What do you call a boomerang that doesn't come back? A stick!",
    country: "Australia",
    type: "pun",
  },
  {
    id: 162,
    joke: "Why don't ants get sick? Because they have tiny ant-ibodies!",
    country: "US",
    type: "pun",
  },
  {
    id: 163,
    joke: "What do you call a pile of cats? A meow-tain!",
    country: "US",
    type: "pun",
  },
  {
    id: 164,
    joke: "What do clouds wear under their clothes? Thunderwear!",
    country: "US",
    type: "pun",
  },
  {
    id: 165,
    joke: "What do you call a bee that can't make up its mind? A maybe!",
    country: "US",
    type: "pun",
  },
  {
    id: 166,
    joke: "What did the buffalo say to his son? Bison!",
    country: "US",
    type: "pun",
  },
  {
    id: 167,
    joke: "Why don't teddy bears ever order dessert? They're always stuffed!",
    country: "US",
    type: "pun",
  },
  {
    id: 168,
    joke: "Why do programmers always mix up Halloween and Christmas? Because Oct 31 == Dec 25!",
    country: "US",
    type: "tech",
  },
  {
    id: 169,
    joke: "What's a programmer's favorite hangout? The Foo Bar!",
    country: "US",
    type: "tech",
  },
  {
    id: 170,
    joke: "Why did the developer quit? They didn't get arrays!",
    country: "US",
    type: "tech",
  },
  {
    id: 171,
    joke: "What do you call a programmer from Finland? Nerdic!",
    country: "US",
    type: "tech",
  },
  {
    id: 172,
    joke: "Why was the JavaScript developer sad? Because they didn't Node how to Express themselves!",
    country: "US",
    type: "tech",
  },
  {
    id: 173,
    joke: "Why did the American bring a ladder to the bar? They heard drinks were on the house!",
    country: "US",
    type: "pun",
  },
  {
    id: 174,
    joke: "What's an American's favorite type of chip? A microchip!",
    country: "US",
    type: "tech",
  },
  {
    id: 175,
    joke: "What do you call an Englishman in the knockout stages of the World Cup? A referee!",
    country: "UK",
    type: "sports",
  },
  {
    id: 176,
    joke: "Why do British people never lose at poker? They have a royal flush!",
    country: "UK",
    type: "pun",
  },
  {
    id: 177,
    joke: "What's Canada's national sport? Apologizing!",
    country: "Canada",
    type: "cultural",
  },
  {
    id: 178,
    joke: "How do you get 30 Canadians out of a pool? Say 'Please get out of the pool'!",
    country: "Canada",
    type: "cultural",
  },
  {
    id: 179,
    joke: "Why did the Indian IT guy go to therapy? Too many issues to debug!",
    country: "India",
    type: "tech",
  },
  {
    id: 180,
    joke: "What's an Indian programmer's favorite tea? Java!",
    country: "India",
    type: "tech",
  },
  {
    id: 181,
    joke: "Why did the Australian koala get fired? He was eucalyptus!",
    country: "Australia",
    type: "pun",
  },
  {
    id: 182,
    joke: "What's an Australian's favorite martial art? Kangaboxing!",
    country: "Australia",
    type: "pun",
  },
  {
    id: 183,
    joke: "What do you call a fake Irish stone? A sham rock!",
    country: "Ireland",
    type: "pun",
  },
  {
    id: 184,
    joke: "Why did the Irish jig? Because Irish people can't sit still!",
    country: "Ireland",
    type: "cultural",
  },
  {
    id: 185,
    joke: "What do you call a fish with no eyes? Fsh!",
    country: "US",
    type: "pun",
  },
  {
    id: 186,
    joke: "Why did the cookie go to the hospital? Because it felt crumbly!",
    country: "US",
    type: "pun",
  },
  {
    id: 187,
    joke: "What do you call a sleeping dinosaur? A dino-snore!",
    country: "US",
    type: "pun",
  },
  {
    id: 188,
    joke: "Why don't scientists trust atoms? They make up everything!",
    country: "US",
    type: "pun",
  },
  {
    id: 189,
    joke: "What did the grape say when it got stepped on? Nothing, it just let out a little wine!",
    country: "US",
    type: "pun",
  },
  {
    id: 190,
    joke: "Why did the mushroom go to the party? Because he was a fungi!",
    country: "US",
    type: "pun",
  },
  {
    id: 191,
    joke: "What do you call a magic dog? A labracadabrador!",
    country: "US",
    type: "pun",
  },
  {
    id: 192,
    joke: "Why don't skeletons go to scary movies? They don't have the guts!",
    country: "US",
    type: "pun",
  },
  {
    id: 193,
    joke: "What do you call a sleeping bull? A bulldozer!",
    country: "US",
    type: "pun",
  },
  {
    id: 194,
    joke: "Why did the banana go to the doctor? It wasn't peeling well!",
    country: "US",
    type: "pun",
  },
  {
    id: 195,
    joke: "What do you call a bear with no teeth? A gummy bear!",
    country: "US",
    type: "pun",
  },
  {
    id: 196,
    joke: "Why don't eggs tell secrets? They might crack up!",
    country: "US",
    type: "pun",
  },
  {
    id: 197,
    joke: "What do you call a lazy kangaroo? A pouch potato!",
    country: "Australia",
    type: "pun",
  },
  {
    id: 198,
    joke: "Why did the Australian bring a clock to the beach? He wanted to see if time flies when you're having fun!",
    country: "Australia",
    type: "pun",
  },
  {
    id: 199,
    joke: "What do you call an Australian ghost? A boomaroo!",
    country: "Australia",
    type: "pun",
  },
  {
    id: 200,
    joke: "Why don't Australians ever get lost? Because they always know which way is down under!",
    country: "Australia",
    type: "cultural",
  },
  {
    id: 201,
    joke: "What did the British say to their tea? You're my cup of tea!",
    country: "UK",
    type: "pun",
  },
  {
    id: 202,
    joke: "Why did the British person bring an umbrella? Because it's Britain!",
    country: "UK",
    type: "cultural",
  },
  {
    id: 203,
    joke: "What's a British person's favorite game? Crickets... and cricket!",
    country: "UK",
    type: "sports",
  },
  {
    id: 204,
    joke: "Why do British people love queues? Because they're always in line with tradition!",
    country: "UK",
    type: "cultural",
  },
  {
    id: 205,
    joke: "What do you call a Canadian wolf? A howligan, but a polite one!",
    country: "Canada",
    type: "pun",
  },
  {
    id: 206,
    joke: "Why did the Canadian moose start a band? Because it had the best horns!",
    country: "Canada",
    type: "pun",
  },
  {
    id: 207,
    joke: "What's an Indian programmer's motto? There's no place like 127.0.0.1!",
    country: "India",
    type: "tech",
  },
  {
    id: 208,
    joke: "Why do Indians make great musicians? They know all about scales and ragas!",
    country: "India",
    type: "cultural",
  },
  {
    id: 209,
    joke: "What do you call an Irish DJ? Rick O'Shea!",
    country: "Ireland",
    type: "pun",
  },
  {
    id: 210,
    joke: "Why did the Irish potato go to therapy? It had too many eyes watching it!",
    country: "Ireland",
    type: "pun",
  },
];

export default function RandomJokesPage() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoved, setIsLoved] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const generateMoreJokes = () => {
    const templates = [
      "Why did the {animal} {action}? Because {reason}!",
      "What do you call a {adjective} {noun}? A {punchline}!",
      "How do you make a {item}? Just add {ingredient}!",
      "What's the difference between {thing1} and {thing2}? About {number} {units}!",
      "A {profession} walks into a bar and says {phrase}!",
    ];

    const animals = [
      "chicken",
      "cow",
      "pig",
      "dog",
      "cat",
      "horse",
      "duck",
      "goat",
      "sheep",
      "rabbit",
    ];
    const actions = [
      "cross the road",
      "go to school",
      "start a business",
      "learn to code",
      "join a band",
    ];
    const adjectives = [
      "happy",
      "sad",
      "funny",
      "smart",
      "lazy",
      "crazy",
      "silly",
      "clever",
      "brave",
      "shy",
    ];
    const nouns = [
      "sandwich",
      "computer",
      "book",
      "pencil",
      "chair",
      "table",
      "phone",
      "car",
      "house",
      "tree",
    ];
    const countries = ["US", "UK", "Canada", "India", "Australia", "Ireland"];
    const types = ["pun", "oneliner", "tech", "cultural"];

    const jokes = [...JOKES];
    let id = 211;

    while (jokes.length < 1000) {
      // eslint-disable-next-line react-hooks/purity
      const country = countries[Math.floor(Math.random() * countries.length)];
      const type = types[Math.floor(Math.random() * types.length)];
      const animal = animals[Math.floor(Math.random() * animals.length)];
      const action = actions[Math.floor(Math.random() * actions.length)];
      const adjective =
        adjectives[Math.floor(Math.random() * adjectives.length)];
      const noun = nouns[Math.floor(Math.random() * nouns.length)];

      jokes.push({
        id: id++,
        joke: `Why did the ${animal} from ${country} ${action}? To prove how ${adjective} they are!`,
        country,
        type,
      });
    }

    return jokes;
  };

  const allJokes = generateMoreJokes();

  const getRandomJoke = () => {
    const randomIndex = Math.floor(Math.random() * allJokes.length);
    // const randomJoke = allJokes[randomIndex];
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIdx(randomIndex);
      setIsAnimating(false);
    }, 250);
  };

  const processedJoke = useMemo(() => {
    const fullText = allJokes[currentIdx].joke;
    const parts = fullText.split(/(?<=[?.!])\s+/);
    return { setup: parts[0], punchline: parts.slice(1).join(" ") };
  }, [currentIdx]);

  useEffect(() => {
    setShowAnswer(false);
    setIsLoved(false);
    setIsSaved(false);
  }, [currentIdx]);

  const handleNext = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIdx((prev) => (prev + 1) % allJokes.length);
      setIsAnimating(false);
    }, 250);
  };

  const getTriggerText = (text) => {
    const firstWord = text.split(" ")[0].replace(/[^a-zA-Z]/g, "");
    const triggers = ["How", "Why", "What", "Who", "Where", "When"];
    return triggers.includes(firstWord) ? `${firstWord}?` : "And... ?";
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Head>
        <title>Random Jokes | I'm Bored Now</title>
      </Head>

      <header className="bg-gradient-to-br from-purple-600 via-pink-500 to-rose-400 pt-10 pb-20 px-4 text-center text-white">
        <h1 className="text-3xl md:text-5xl font-black mb-2 drop-shadow-md">
          Laugh Factory 🎭
        </h1>
        <p className="text-purple-100 text-sm font-bold uppercase tracking-widest opacity-80">
          Instant Boredom Killer
        </p>
      </header>

      <main className="container mx-auto px-4 -mt-10 pb-20 max-w-2xl">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-pink-500 rounded-[2.5rem] blur opacity-10 group-hover:opacity-20 transition-opacity"></div>

          <div className="relative bg-white border border-purple-50 rounded-[2.5rem] shadow-2xl overflow-hidden">
            <div className="p-6 md:p-12 text-center">
              <div className="flex justify-between items-center mb-8">
                <div className="flex gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest bg-purple-50 text-purple-600 px-3 py-1 rounded-md border border-purple-100">
                    {allJokes[currentIdx].type}
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-widest bg-gray-50 text-gray-500 px-3 py-1 rounded-md">
                    {allJokes[currentIdx].country} 🌍
                  </span>
                </div>
                <span className="text-xs font-bold text-gray-300 tabular-nums">
                  #{allJokes[currentIdx].id}
                </span>
              </div>

              <div
                className={`min-h-[160px] md:min-h-[200px] flex flex-col items-center justify-center transition-all duration-300 ${
                  isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
                }`}
              >
                <h2 className="text-2xl md:text-4xl font-black text-gray-800 leading-tight mb-6">
                  {processedJoke.setup}
                </h2>
                {showAnswer && (
                  <p className="text-xl md:text-3xl font-black text-pink-600 animate-pop-in">
                    {processedJoke.punchline}
                  </p>
                )}
              </div>

              {/* ACTION AREA */}
              <div className="mt-10 flex flex-col gap-6">
                {!showAnswer ? (
                  <button
                    onClick={() => setShowAnswer(true)}
                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-2xl font-black text-xl shadow-xl shadow-purple-100 hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    {getTriggerText(processedJoke?.setup || "")} 🤨
                  </button>
                ) : (
                  <div className="space-y-6">
                    <button
                      onClick={handleNext}
                      className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl font-black text-xl shadow-xl shadow-emerald-100 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      Next Joke! <Icons.Refresh className="w-5 h-5" />
                    </button>

                    {/* PASTEL UTILITY BUTTONS FROM ATTACHED DESIGN */}
                    <div className="flex flex-wrap justify-center gap-3 pt-4 border-t border-slate-50">
                      <button
                        onClick={() => setIsLoved(!isLoved)}
                        className="flex items-center gap-2 px-6 py-3 bg-[#fce7f3] text-[#db2777] rounded-[1rem] font-bold text-lg hover:brightness-95 transition-all"
                      >
                        <Icons.Heart className="w-5 h-5" filled={isLoved} />
                        Love
                      </button>

                      <button
                        onClick={() => setIsSaved(!isSaved)}
                        className="flex items-center gap-2 px-6 py-3 bg-[#dcfce7] text-[#059669] rounded-[1rem] font-bold text-lg hover:brightness-95 transition-all"
                      >
                        <Icons.Bookmark className="w-5 h-5" filled={isSaved} />
                        Save
                      </button>

                      <button
                        onClick={() =>
                          navigator.share &&
                          navigator.share({ text: allJokes[currentIdx].joke })
                        }
                        className="flex items-center gap-2 px-6 py-3 bg-[#dbeafe] text-[#2563eb] rounded-[1rem] font-bold text-lg hover:brightness-95 transition-all"
                      >
                        <Icons.Share className="w-5 h-5" />
                        Share
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="text-purple-400 font-bold text-xs uppercase tracking-widest hover:text-purple-600 transition-all"
          >
            ← Back to Fun Center
          </Link>
        </div>
      </main>

      <style jsx>{`
        @keyframes pop-in {
          0% {
            opacity: 0;
            transform: scale(0.9) translateY(10px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-pop-in {
          animation: pop-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
            forwards;
        }
      `}</style>
    </div>
  );
}
