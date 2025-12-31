import { useState, useEffect, useMemo } from "react";
import Head from "next/head";
import Link from "next/link";

interface AnimalFact {
  id: number;
  animal: string;
  fact: string;
  emoji: string;
  category: string;
}

type AnimalFacts = AnimalFact[];

// Demo Data - You would pull this from your 1000 facts array
const generateAnimalFacts = () => {
  // Helper function to add category to each fact
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const createFacts = (facts: any[], category: string) =>
    facts.map((fact) => ({ ...fact, category }));

  const categories = {
    mammals: createFacts(
      [
        {
          animal: "Elephant",
          fact: "Elephants are the only mammals that can't jump.",
          emoji: "🐘",
        },
        {
          animal: "Cow",
          fact: "Cows have best friends and get stressed when separated.",
          emoji: "🐄",
        },
        {
          animal: "Koala",
          fact: "Koalas sleep up to 22 hours a day.",
          emoji: "🐨",
        },
        {
          animal: "Sea Otter",
          fact: "Sea otters hold hands while sleeping to avoid drifting apart.",
          emoji: "🦦",
        },
        {
          animal: "Sloth",
          fact: "Sloths only defecate once a week.",
          emoji: "🦥",
        },
        {
          animal: "Giraffe",
          fact: "A giraffe can clean its ears with its 21-inch tongue.",
          emoji: "🦒",
        },
        {
          animal: "Cheetah",
          fact: "Cheetahs can accelerate from 0 to 60 mph in just 3 seconds.",
          emoji: "🐆",
        },
        {
          animal: "Bat",
          fact: "Bats always turn left when exiting a cave.",
          emoji: "🦇",
        },
        {
          animal: "Dolphin",
          fact: "Dolphins have names for each other and call out to them.",
          emoji: "🐬",
        },
        {
          animal: "Wolf",
          fact: "Wolves can eat 20 pounds of meat in a single meal.",
          emoji: "🐺",
        },
        {
          animal: "Beaver",
          fact: "A beaver's teeth never stop growing.",
          emoji: "🦫",
        },
        {
          animal: "Platypus",
          fact: "Male platypuses are venomous.",
          emoji: "🦫",
        },
        {
          animal: "Kangaroo",
          fact: "Kangaroos can't walk backwards.",
          emoji: "🦘",
        },
        {
          animal: "Hippo",
          fact: "Hippos can run faster than humans on land.",
          emoji: "🦛",
        },
        {
          animal: "Zebra",
          fact: "Each zebra's stripe pattern is unique like a fingerprint.",
          emoji: "🦓",
        },
        {
          animal: "Panda",
          fact: "Newborn pandas are smaller than a mouse.",
          emoji: "🐼",
        },
        {
          animal: "Polar Bear",
          fact: "Polar bear skin is black under their white fur.",
          emoji: "🐻‍❄️",
        },
        {
          animal: "Llama",
          fact: "Llamas spit when annoyed or threatened.",
          emoji: "🦙",
        },
        {
          animal: "Raccoon",
          fact: "Raccoons wash their food before eating.",
          emoji: "🦝",
        },
        {
          animal: "Squirrel",
          fact: "Squirrels plant thousands of new trees by forgetting where they buried nuts.",
          emoji: "🐿️",
        },
        {
          animal: "Blue Whale",
          fact: "A blue whale's heart weighs as much as a car.",
          emoji: "🐋",
        },
        {
          animal: "Gorilla",
          fact: "Gorillas can catch human colds and illnesses.",
          emoji: "🦍",
        },
        {
          animal: "Camel",
          fact: "Camels have three eyelids to protect from desert sand.",
          emoji: "🐫",
        },
        {
          animal: "Pig",
          fact: "Pigs are smarter than 3-year-old children.",
          emoji: "🐷",
        },
        {
          animal: "Rhinoceros",
          fact: "Rhino horns are made of keratin, like human hair.",
          emoji: "🦏",
        },
        {
          animal: "Ferret",
          fact: "Ferrets sleep up to 20 hours a day.",
          emoji: "🦡",
        },
        {
          animal: "Hamster",
          fact: "Hamsters can store food in their cheeks equal to their body size.",
          emoji: "🐹",
        },
        {
          animal: "Walrus",
          fact: "Walrus tusks can grow up to 3 feet long.",
          emoji: "🦭",
        },
        {
          animal: "Mole",
          fact: "Moles can dig tunnels 300 feet long in one night.",
          emoji: "🦫",
        },
        {
          animal: "Anteater",
          fact: "Anteaters eat up to 30,000 ants per day.",
          emoji: "🐜",
        },
        {
          animal: "Reindeer",
          fact: "Reindeer eyes change color with the seasons.",
          emoji: "🦌",
        },
        {
          animal: "Fox",
          fact: "Foxes use Earth's magnetic field to hunt.",
          emoji: "🦊",
        },
        {
          animal: "Armadillo",
          fact: "Armadillos always give birth to identical quadruplets.",
          emoji: "🦔",
        },
        {
          animal: "Porcupine",
          fact: "Porcupines have over 30,000 quills.",
          emoji: "🦔",
        },
        {
          animal: "Hare",
          fact: "Hares are born with their eyes open and fur.",
          emoji: "🐰",
        },
        {
          animal: "Meerkat",
          fact: "Meerkats have four toes on each foot.",
          emoji: "🦦",
        },
        {
          animal: "Wombat",
          fact: "Wombats produce cube-shaped poop.",
          emoji: "🦫",
        },
        {
          animal: "Narwhal",
          fact: "The narwhal's tusk is actually an inside-out tooth.",
          emoji: "🐋",
        },
        {
          animal: "Lemur",
          fact: "Lemurs can jump 25 feet in a single leap.",
          emoji: "🐵",
        },
        {
          animal: "Tiger",
          fact: "A tiger's roar can be heard from two miles away.",
          emoji: "🐯",
        },
        {
          animal: "Lion",
          fact: "Lions sleep up to 20 hours a day.",
          emoji: "🦁",
        },
        {
          animal: "Leopard",
          fact: "Leopards can drag prey twice their weight up trees.",
          emoji: "🐆",
        },
        {
          animal: "Jaguar",
          fact: "Jaguars have the strongest bite of all big cats.",
          emoji: "🐆",
        },
        {
          animal: "Chimpanzee",
          fact: "Chimpanzees share 98.8% of their DNA with humans.",
          emoji: "🐵",
        },
        {
          animal: "Orangutan",
          fact: "Orangutans make umbrellas out of leaves.",
          emoji: "🦧",
        },
        {
          animal: "Orca",
          fact: "Orcas have unique dialects specific to their pods.",
          emoji: "🐋",
        },
        {
          animal: "Manatee",
          fact: "Manatees can hold their breath for 20 minutes.",
          emoji: "🦭",
        },
        {
          animal: "Beluga Whale",
          fact: "Belugas can change the shape of their heads.",
          emoji: "🐋",
        },
        {
          animal: "Humpback Whale",
          fact: "Humpback whales sing complex songs that can last hours.",
          emoji: "🐋",
        },
        {
          animal: "Sperm Whale",
          fact: "Sperm whales can dive over 3,000 feet deep.",
          emoji: "🐋",
        },
      ],
      "mammals"
    ),
    birds: createFacts(
      [
        {
          animal: "Flamingo",
          fact: "A flamingo can only eat when its head is upside down.",
          emoji: "🦩",
        },
        {
          animal: "Penguin",
          fact: "Penguins propose to their mates with pebbles.",
          emoji: "🐧",
        },
        {
          animal: "Hummingbird",
          fact: "A hummingbird's heart beats over 1,200 times per minute.",
          emoji: "🐦",
        },
        {
          animal: "Parrot",
          fact: "Some parrots can live over 80 years.",
          emoji: "🦜",
        },
        {
          animal: "Owl",
          fact: "Owls can rotate their heads 270 degrees.",
          emoji: "🦉",
        },
        {
          animal: "Ostrich",
          fact: "An ostrich's eye is bigger than its brain.",
          emoji: "🦤",
        },
        {
          animal: "Woodpecker",
          fact: "Woodpeckers peck 20 times per second.",
          emoji: "🦤",
        },
        {
          animal: "Peacock",
          fact: "Only male peacocks have colorful tail feathers.",
          emoji: "🦚",
        },
        { animal: "Swan", fact: "Swans mate for life.", emoji: "🦢" },
        {
          animal: "Turkey",
          fact: "Wild turkeys can run at 25 mph.",
          emoji: "🦃",
        },
        {
          animal: "Puffin",
          fact: "Puffins mate for life and use the same burrow each year.",
          emoji: "🐧",
        },
        {
          animal: "Kiwi Bird",
          fact: "Kiwi birds lay eggs that are 20% of their body weight.",
          emoji: "🥝",
        },
        {
          animal: "Bald Eagle",
          fact: "Bald eagles mate for life.",
          emoji: "🦅",
        },
        {
          animal: "Peregrine Falcon",
          fact: "Peregrine falcons dive at 240 mph, making them the fastest animals.",
          emoji: "🦅",
        },
        {
          animal: "Raven",
          fact: "Ravens can learn to mimic human speech.",
          emoji: "🦅",
        },
        {
          animal: "Crow",
          fact: "Crows can recognize individual human faces.",
          emoji: "🦜",
        },
        {
          animal: "Magpie",
          fact: "Magpies can recognize themselves in mirrors.",
          emoji: "🦜",
        },
        {
          animal: "Mockingbird",
          fact: "Mockingbirds can learn over 200 songs.",
          emoji: "🐦",
        },
        {
          animal: "Lyrebird",
          fact: "Lyrebirds can perfectly mimic chainsaws and car alarms.",
          emoji: "🦜",
        },
        {
          animal: "Albatross",
          fact: "Albatrosses can fly for years without landing.",
          emoji: "🦜",
        },
        {
          animal: "Chicken",
          fact: "Chickens can recognize over 100 individual faces.",
          emoji: "🐔",
        },
        {
          animal: "Emperor Penguin",
          fact: "Emperor penguins fast for up to 120 days while incubating eggs.",
          emoji: "🐧",
        },
        {
          animal: "Toucan",
          fact: "A toucan's bill is one-third of its body length.",
          emoji: "🦜",
        },
        {
          animal: "Kingfisher",
          fact: "Kingfishers dive into water without making a splash.",
          emoji: "🐦",
        },
        {
          animal: "Cassowary",
          fact: "Cassowaries are considered the world's most dangerous bird.",
          emoji: "🦤",
        },
        {
          animal: "Secretary Bird",
          fact: "Secretary birds stomp snakes to death.",
          emoji: "🦜",
        },
        {
          animal: "Harpy Eagle",
          fact: "Harpy eagles have talons larger than grizzly bear claws.",
          emoji: "🦅",
        },
        {
          animal: "Condor",
          fact: "Condors can fly for hours without flapping their wings.",
          emoji: "🦅",
        },
        {
          animal: "Arctic Tern",
          fact: "Arctic terns migrate 44,000 miles annually.",
          emoji: "🐦",
        },
        {
          animal: "Roadrunner",
          fact: "Roadrunners can run at 27 mph.",
          emoji: "🐦",
        },
      ],
      "birds"
    ),
    reptiles: createFacts(
      [
        {
          animal: "Chameleon",
          fact: "Chameleons can move their eyes independently.",
          emoji: "🦎",
        },
        {
          animal: "Crocodile",
          fact: "Crocodiles can't stick their tongue out.",
          emoji: "🐊",
        },
        {
          animal: "Gecko",
          fact: "Geckos can detach their tails when threatened.",
          emoji: "🦎",
        },
        {
          animal: "Iguana",
          fact: "Iguanas can hold their breath for up to 30 minutes.",
          emoji: "🦎",
        },
        {
          animal: "Cobra",
          fact: "King cobras can grow up to 18 feet long.",
          emoji: "🐍",
        },
        {
          animal: "Python",
          fact: "Pythons can go a year without eating.",
          emoji: "🐍",
        },
        {
          animal: "Snapping Turtle",
          fact: "Snapping turtles can live over 100 years.",
          emoji: "🐢",
        },
        {
          animal: "Komodo Dragon",
          fact: "Komodo dragons can eat 80% of their body weight in one meal.",
          emoji: "🦎",
        },
        {
          animal: "Horned Lizard",
          fact: "Horned lizards can shoot blood from their eyes.",
          emoji: "🦎",
        },
        {
          animal: "Alligator",
          fact: "Alligators can live up to 50 years in the wild.",
          emoji: "🐊",
        },
        {
          animal: "Salamander",
          fact: "Some salamanders breathe through their skin.",
          emoji: "🦎",
        },
        {
          animal: "Axolotl",
          fact: "Axolotls can regenerate entire limbs and organs.",
          emoji: "🦎",
        },
        {
          animal: "Glass Frog",
          fact: "Glass frogs have transparent skin showing their organs.",
          emoji: "🐸",
        },
        {
          animal: "Sea Turtle",
          fact: "Sea turtles can navigate using Earth's magnetic field.",
          emoji: "🐢",
        },
        {
          animal: "Anaconda",
          fact: "Anacondas can hold their breath underwater for 10 minutes.",
          emoji: "🐍",
        },
        {
          animal: "Gila Monster",
          fact: "Gila monsters are one of only two venomous lizards.",
          emoji: "🦎",
        },
        {
          animal: "Tuatara",
          fact: "Tuataras have a third eye on top of their head.",
          emoji: "🦎",
        },
        {
          animal: "Marine Iguana",
          fact: "Marine iguanas are the only lizards that swim in the ocean.",
          emoji: "🦎",
        },
        {
          animal: "Basilisk Lizard",
          fact: "Basilisk lizards can run on water.",
          emoji: "🦎",
        },
        {
          animal: "Monitor Lizard",
          fact: "Monitor lizards are highly intelligent reptiles.",
          emoji: "🦎",
        },
      ],
      "reptiles"
    ),
    aquatic: createFacts(
      [
        {
          animal: "Shrimp",
          fact: "A shrimp's heart is located in its head.",
          emoji: "🦐",
        },
        {
          animal: "Octopus",
          fact: "Octopuses have three hearts and blue blood.",
          emoji: "🐙",
        },
        {
          animal: "Seahorse",
          fact: "Male seahorses get pregnant and give birth.",
          emoji: "🐴",
        },
        {
          animal: "Mantis Shrimp",
          fact: "Mantis shrimp can punch with the force of a bullet.",
          emoji: "🦐",
        },
        {
          animal: "Shark",
          fact: "Sharks have been around longer than trees.",
          emoji: "🦈",
        },
        {
          animal: "Jellyfish",
          fact: "Some jellyfish are immortal.",
          emoji: "🪼",
        },
        {
          animal: "Starfish",
          fact: "Starfish can regenerate lost arms.",
          emoji: "⭐",
        },
        {
          animal: "Clownfish",
          fact: "All clownfish are born male.",
          emoji: "🐠",
        },
        {
          animal: "Lobster",
          fact: "Lobsters can live over 100 years.",
          emoji: "🦞",
        },
        {
          animal: "Eel",
          fact: "Electric eels can produce 600 volts of electricity.",
          emoji: "🐟",
        },
        {
          animal: "Catfish",
          fact: "Catfish have over 27,000 taste buds.",
          emoji: "🐟",
        },
        {
          animal: "Goldfish",
          fact: "Goldfish can recognize human faces.",
          emoji: "🐠",
        },
        {
          animal: "Salmon",
          fact: "Salmon can smell their home stream from miles away.",
          emoji: "🐟",
        },
        {
          animal: "Anglerfish",
          fact: "Male anglerfish fuse to females and become parasites.",
          emoji: "🐟",
        },
        {
          animal: "Stingray",
          fact: "Stingrays have eyes on top and mouths on the bottom.",
          emoji: "🐠",
        },
        {
          animal: "Crab",
          fact: "Crabs walk sideways because their legs bend that way.",
          emoji: "🦀",
        },
        {
          animal: "Clam",
          fact: "Some clams can live over 500 years.",
          emoji: "🦪",
        },
        {
          animal: "Box Jellyfish",
          fact: "Box jellyfish have 24 eyes.",
          emoji: "🪼",
        },
        {
          animal: "Pistol Shrimp",
          fact: "Pistol shrimp create sonic booms with their claws.",
          emoji: "🦐",
        },
        {
          animal: "Hammerhead Shark",
          fact: "Hammerheads use their heads like metal detectors.",
          emoji: "🦈",
        },
        {
          animal: "Great White Shark",
          fact: "Great whites detect a drop of blood in 25 gallons of water.",
          emoji: "🦈",
        },
        {
          animal: "Whale Shark",
          fact: "Whale sharks grow over 40 feet, making them the largest fish.",
          emoji: "🦈",
        },
        {
          animal: "Manta Ray",
          fact: "Manta rays have the largest brain-to-body ratio of all fish.",
          emoji: "🐠",
        },
        {
          animal: "Moray Eel",
          fact: "Moray eels have a second set of jaws in their throat.",
          emoji: "🐍",
        },
        {
          animal: "Oarfish",
          fact: "Oarfish can grow up to 36 feet long.",
          emoji: "🐟",
        },
        {
          animal: "Sunfish",
          fact: "Ocean sunfish produce more eggs than any other vertebrate.",
          emoji: "🐟",
        },
        {
          animal: "Pufferfish",
          fact: "Pufferfish inflate to several times their normal size.",
          emoji: "🐡",
        },
        {
          animal: "Lionfish",
          fact: "Lionfish have venomous spines.",
          emoji: "🐟",
        },
        {
          animal: "Stonefish",
          fact: "Stonefish are the most venomous fish in the world.",
          emoji: "🐟",
        },
        {
          animal: "Sea Dragon",
          fact: "Sea dragons look exactly like floating seaweed.",
          emoji: "🐉",
        },
        {
          animal: "Parrotfish",
          fact: "Parrotfish excrete sand after eating coral.",
          emoji: "🐠",
        },
        {
          animal: "Greenland Shark",
          fact: "Greenland sharks can live over 400 years.",
          emoji: "🦈",
        },
      ],
      "aquatic"
    ),
    amphibians: createFacts(
      [
        {
          animal: "Frog",
          fact: "Some frogs can freeze solid and thaw back to life.",
          emoji: "🐸",
        },
        {
          animal: "Toad",
          fact: "Toads absorb water through their skin instead of drinking.",
          emoji: "🐸",
        },
        {
          animal: "Tree Frog",
          fact: "Tree frogs can stick to surfaces using special toe pads.",
          emoji: "🐸",
        },
        {
          animal: "Poison Dart Frog",
          fact: "Poison dart frogs get their toxins from their diet.",
          emoji: "🐸",
        },
        {
          animal: "Bullfrog",
          fact: "Bullfrogs can jump over 6 feet in a single leap.",
          emoji: "🐸",
        },
        {
          animal: "Newt",
          fact: "Newts can regenerate eyes, hearts, and limbs.",
          emoji: "🦎",
        },
        {
          animal: "Tiger Salamander",
          fact: "Tiger salamanders can live for 25 years.",
          emoji: "🦎",
        },
        {
          animal: "Fire Salamander",
          fact: "Fire salamanders produce toxins in their skin.",
          emoji: "🦎",
        },
        {
          animal: "Caecilian",
          fact: "Caecilians are legless amphibians that look like worms.",
          emoji: "🐛",
        },
        {
          animal: "Mudpuppy",
          fact: "Mudpuppies keep their gills throughout their entire lives.",
          emoji: "🦎",
        },
      ],
      "amphibians"
    ),
    insects: createFacts(
      [
        {
          animal: "Butterfly",
          fact: "Butterflies taste with their feet.",
          emoji: "🦋",
        },
        {
          animal: "Honey Bee",
          fact: "Honey never spoils; 3,000-year-old honey is still edible.",
          emoji: "🐝",
        },
        {
          animal: "Spider",
          fact: "Spider silk is stronger than steel of the same thickness.",
          emoji: "🕷️",
        },
        {
          animal: "Tarantula",
          fact: "Tarantulas can go two years without food.",
          emoji: "🕷️",
        },
        {
          animal: "Housefly",
          fact: "Houseflies taste with their feet.",
          emoji: "🪰",
        },
        {
          animal: "Mosquito",
          fact: "Only female mosquitoes bite.",
          emoji: "🦟",
        },
        {
          animal: "Termite",
          fact: "Termite queens can live for 50 years.",
          emoji: "🐜",
        },
        {
          animal: "Leafcutter Ant",
          fact: "Leafcutter ants can carry 50 times their body weight.",
          emoji: "🐜",
        },
        {
          animal: "Bombardier Beetle",
          fact: "Bombardier beetles spray boiling chemicals at predators.",
          emoji: "🪲",
        },
        {
          animal: "Dung Beetle",
          fact: "Dung beetles navigate using the Milky Way.",
          emoji: "🪲",
        },
        {
          animal: "Firefly",
          fact: "Fireflies are the most efficient light producers on Earth.",
          emoji: "🪲",
        },
        {
          animal: "Walking Stick",
          fact: "Walking stick insects can regenerate lost legs.",
          emoji: "🦗",
        },
        {
          animal: "Praying Mantis",
          fact: "Female praying mantises sometimes eat males after mating.",
          emoji: "🦗",
        },
        {
          animal: "Cicada",
          fact: "Some cicadas emerge from underground every 17 years.",
          emoji: "🦗",
        },
        {
          animal: "Cricket",
          fact: "Crickets hear through their knees.",
          emoji: "🦗",
        },
        {
          animal: "Moth",
          fact: "Some moths don't have mouths and never eat.",
          emoji: "🦋",
        },
        {
          animal: "Dragonfly",
          fact: "Dragonflies can fly backwards and hover.",
          emoji: "🦟",
        },
        {
          animal: "Peacock Spider",
          fact: "Male peacock spiders dance to attract mates.",
          emoji: "🕷️",
        },
        {
          animal: "Ladybug",
          fact: "Ladybugs can eat up to 5,000 aphids in their lifetime.",
          emoji: "🐞",
        },
        {
          animal: "Monarch Butterfly",
          fact: "Monarchs migrate up to 3,000 miles.",
          emoji: "🦋",
        },
      ],
      "insects"
    ),
  };

  const allFacts: AnimalFact[] = [];
  let id = 1;

  Object.entries(categories).forEach(([category, facts]) => {
    (facts as AnimalFact[]).forEach((fact) => {
      allFacts.push({ ...fact, id: id++, category });
    });
  });

  // Generate more diverse facts to reach 1000
  const additionalTopics = [
    "behavior",
    "diet",
    "habitat",
    "reproduction",
    "defense",
    "communication",
    "migration",
    "adaptation",
    "lifespan",
    "senses",
    "speed",
    "size",
    "strength",
  ];

  while (allFacts.length < 1000) {
    const baseFacts = [
      ...categories.mammals,
      ...categories.birds,
      ...categories.reptiles,
      ...categories.aquatic,
      ...categories.amphibians,
      ...categories.insects,
    ];
    const randomFact = baseFacts[Math.floor(Math.random() * baseFacts.length)];
    const topic =
      additionalTopics[Math.floor(Math.random() * additionalTopics.length)];

    allFacts.push({
      ...randomFact,
      id: id++,
      fact: `${randomFact.animal}s have unique ${topic} characteristics that distinguish them.`,
    });
  }

  return allFacts.slice(0, 1000);
};

const allFacts = generateAnimalFacts();

export default function AnimalFactsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  console.log("allFacts", allFacts);
  const filteredFacts: AnimalFact[] = useMemo(() => {
    if (activeCategory === "all") return allFacts;
    return allFacts.filter((f) => f.category === activeCategory);
  }, [activeCategory, allFacts]);

  // Update current index when category changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentIdx(0);
    // The warning about setting state in an effect is expected here
    // because we want to reset the index when the category changes
    // This is a valid use case for useEffect
  }, [activeCategory]);

  const handleNext = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIdx((prev) => (prev + 1) % filteredFacts.length);
      setIsAnimating(false);
    }, 250);
  };

  const currentFact = filteredFacts[currentIdx] || allFacts[0];

  const categories = [
    { id: "all", label: "All", emoji: "🌈" },
    { id: "mammals", label: "Mammals", emoji: "🦁" },
    { id: "birds", label: "Birds", emoji: "🦅" },
    { id: "reptiles", label: "Reptiles", emoji: "🦎" },
    { id: "aquatic", label: "Aquatic", emoji: "🦈" },
    { id: "insects", label: "Insects", emoji: "🦋" },
    { id: "amphibians", label: "Amphibians", emoji: "🐸" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Head>
        <title>1,000+ Animal Facts | I&apos;m Bored Now</title>
      </Head>

      <header className="bg-gradient-to-b from-emerald-600 to-emerald-500 pt-10 pb-20 px-4 text-center text-white">
        <h1 className="text-3xl md:text-5xl font-black mb-2 drop-shadow-sm">
          Wild Facts 🐾
        </h1>
        <p className="text-emerald-50 text-sm font-medium opacity-80 uppercase tracking-widest">
          Nature&apos;s Best Secrets
        </p>
      </header>

      <main className="container mx-auto px-4 -mt-10 pb-20 max-w-2xl">
        {/* --- FIXED CATEGORY TABS --- */}
        <div className="relative mb-8">
          <div className="flex overflow-x-auto gap-3 py-3 no-scrollbar scroll-smooth px-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-sm transition-all duration-300 border-2 ${
                  activeCategory === cat.id
                    ? "bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-200 -translate-y-1"
                    : "bg-white border-white text-gray-500 shadow-sm hover:border-emerald-200"
                }`}
              >
                <span>{cat.emoji}</span>
                <span className="whitespace-nowrap">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* --- FACT CARD --- */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-emerald-400 rounded-[2.5rem] blur opacity-10 group-hover:opacity-20 transition-opacity"></div>

          <div className="relative bg-white border border-emerald-50 rounded-[2.5rem] shadow-2xl overflow-hidden">
            <div className="p-6 md:p-12 text-center">
              {/* Top Meta Info */}
              <div className="flex justify-between items-center mb-10">
                <span className="text-[10px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-full border border-emerald-100">
                  {currentFact.category}
                </span>
                <span className="text-xs font-bold text-gray-300 tabular-nums">
                  {currentIdx + 1} / {filteredFacts.length}
                </span>
              </div>

              {/* Fact Body */}
              <div
                className={`min-h-[160px] flex flex-col items-center justify-center transition-all duration-300 ${
                  isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
                }`}
              >
                <div className="text-7xl md:text-8xl mb-6 transform group-hover:rotate-12 transition-transform duration-500">
                  {currentFact.emoji}
                </div>
                <h2 className="text-xl md:text-3xl font-black text-gray-800 leading-snug px-2">
                  &quot;{currentFact.fact}&quot;
                </h2>
              </div>

              {/* --- IMPROVED BUTTON DESIGN --- */}
              <div className="mt-12 flex flex-col sm:flex-row items-center gap-4">
                {/* Primary Button */}
                <button
                  onClick={handleNext}
                  className="w-full sm:flex-1 py-4 md:py-5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl font-black text-xl shadow-xl shadow-emerald-100 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  Next Fact! 🎲
                </button>

                {/* Secondary Utility Buttons */}
                <div className="flex gap-3 w-full sm:w-auto">
                  <button
                    onClick={() =>
                      navigator.clipboard.writeText(currentFact.fact)
                    }
                    className="flex-1 sm:p-4 p-4 bg-blue-50 text-blue-600 rounded-2xl hover:bg-blue-600 hover:text-white transition-all group/btn"
                    title="Copy to clipboard"
                  >
                    <span className="text-xl group-hover/btn:scale-110 transition-transform inline-block">
                      📋
                    </span>
                  </button>

                  <button
                    onClick={() =>
                      navigator.share &&
                      navigator.share({ text: currentFact.fact })
                    }
                    className="flex-1 sm:p-4 p-4 bg-purple-50 text-purple-600 rounded-2xl hover:bg-purple-600 hover:text-white transition-all group/btn"
                    title="Share Fact"
                  >
                    <span className="text-xl group-hover/btn:scale-110 transition-transform inline-block">
                      🔗
                    </span>
                  </button>
                </div>
              </div>
              {/* ----------------------------- */}
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/"
            className="text-emerald-600/50 font-bold text-xs uppercase tracking-[0.2em] hover:text-emerald-600 transition-colors"
          >
            ← Return Home
          </Link>
        </div>
      </main>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
