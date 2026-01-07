import { useState } from "react";
import Head from "next/head";

const TRIVIA_DATA = [
  {
    id: 1,
    question: "Which planet is known as the 'Red Planet'?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    answer: "Mars",
    category: "Space",
    emoji: "🚀",
    fact: "Mars is red because its surface is covered in iron oxide (rust)!",
  },
  {
    id: 2,
    question: "What is the only fruit that has its seeds on the outside?",
    options: ["Blueberry", "Strawberry", "Kiwi", "Banana"],
    answer: "Strawberry",
    category: "Nature",
    emoji: "🍓",
    fact: "The average strawberry has about 200 seeds!",
  },
  {
    id: 3,
    question: "How many hearts does an octopus have?",
    options: ["One", "Two", "Three", "Four"],
    answer: "Three",
    category: "Animals",
    emoji: "🐙",
    fact: "Two hearts pump blood to the gills, while the third pumps it to the rest of the body!",
  },
  {
    id: 4,
    question: "What is the smallest country in the world?",
    options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
    answer: "Vatican City",
    category: "Geography",
    emoji: "🌍",
    fact: "Vatican City is only 0.17 square miles and has a population of around 800 people!",
  },
  {
    id: 5,
    question: "Who painted the Mona Lisa?",
    options: ["Michelangelo", "Leonardo da Vinci", "Raphael", "Donatello"],
    answer: "Leonardo da Vinci",
    category: "Art",
    emoji: "🎨",
    fact: "It took Leonardo da Vinci about 4 years to paint the Mona Lisa!",
  },
  {
    id: 6,
    question: "What is the hardest natural substance on Earth?",
    options: ["Gold", "Iron", "Diamond", "Titanium"],
    answer: "Diamond",
    category: "Science",
    emoji: "💎",
    fact: "Diamonds form about 100 miles below Earth's surface under extreme heat and pressure!",
  },
  {
    id: 7,
    question: "Which animal can sleep for up to 3 years?",
    options: ["Bear", "Snail", "Sloth", "Tortoise"],
    answer: "Snail",
    category: "Animals",
    emoji: "🐌",
    fact: "Snails can hibernate for up to 3 years during extreme weather conditions!",
  },
  {
    id: 8,
    question: "What is the largest ocean on Earth?",
    options: [
      "Atlantic Ocean",
      "Indian Ocean",
      "Arctic Ocean",
      "Pacific Ocean",
    ],
    answer: "Pacific Ocean",
    category: "Geography",
    emoji: "🌊",
    fact: "The Pacific Ocean covers more than 63 million square miles!",
  },
  {
    id: 9,
    question: "How many bones are in the adult human body?",
    options: ["186", "206", "226", "246"],
    answer: "206",
    category: "Science",
    emoji: "🦴",
    fact: "Babies are born with about 270 bones, but some fuse together as they grow!",
  },
  {
    id: 10,
    question: "What year did the Titanic sink?",
    options: ["1910", "1912", "1914", "1916"],
    answer: "1912",
    category: "History",
    emoji: "🚢",
    fact: "The Titanic sank on April 15, 1912, after hitting an iceberg!",
  },
  {
    id: 11,
    question: "Which gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    answer: "Carbon Dioxide",
    category: "Science",
    emoji: "🌱",
    fact: "Plants use carbon dioxide during photosynthesis to produce oxygen and glucose!",
  },
  {
    id: 12,
    question: "What is the fastest land animal?",
    options: ["Lion", "Cheetah", "Leopard", "Gazelle"],
    answer: "Cheetah",
    category: "Animals",
    emoji: "🐆",
    fact: "Cheetahs can reach speeds up to 70 mph in short bursts!",
  },
  {
    id: 13,
    question: "How many continents are there?",
    options: ["Five", "Six", "Seven", "Eight"],
    answer: "Seven",
    category: "Geography",
    emoji: "🗺️",
    fact: "The seven continents are Africa, Antarctica, Asia, Europe, North America, Oceania, and South America!",
  },
  {
    id: 14,
    question: "What is the chemical symbol for gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    answer: "Au",
    category: "Science",
    emoji: "🥇",
    fact: "Au comes from the Latin word 'aurum' meaning gold!",
  },
  {
    id: 15,
    question: "Which instrument has 88 keys?",
    options: ["Organ", "Piano", "Accordion", "Synthesizer"],
    answer: "Piano",
    category: "Music",
    emoji: "🎹",
    fact: "Modern pianos have 52 white keys and 36 black keys!",
  },
  {
    id: 16,
    question: "What is the tallest mountain in the world?",
    options: ["K2", "Kilimanjaro", "Mount Everest", "Denali"],
    answer: "Mount Everest",
    category: "Geography",
    emoji: "⛰️",
    fact: "Mount Everest is 29,032 feet tall and still growing about 4mm per year!",
  },
  {
    id: 17,
    question: "How many legs does a spider have?",
    options: ["Six", "Eight", "Ten", "Twelve"],
    answer: "Eight",
    category: "Animals",
    emoji: "🕷️",
    fact: "Spiders are arachnids, not insects, which is why they have 8 legs instead of 6!",
  },
  {
    id: 18,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Madrid", "Paris"],
    answer: "Paris",
    category: "Geography",
    emoji: "🗼",
    fact: "Paris is known as the 'City of Light' because it was one of the first cities to use street lighting!",
  },
  {
    id: 19,
    question: "Which planet is closest to the Sun?",
    options: ["Venus", "Earth", "Mercury", "Mars"],
    answer: "Mercury",
    category: "Space",
    emoji: "☀️",
    fact: "Mercury completes an orbit around the Sun in just 88 Earth days!",
  },
  {
    id: 20,
    question: "What is the largest mammal in the world?",
    options: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
    answer: "Blue Whale",
    category: "Animals",
    emoji: "🐋",
    fact: "Blue whales can weigh up to 200 tons and grow up to 100 feet long!",
  },
  {
    id: 21,
    question: "How many colors are in a rainbow?",
    options: ["Five", "Six", "Seven", "Eight"],
    answer: "Seven",
    category: "Science",
    emoji: "🌈",
    fact: "The seven colors are Red, Orange, Yellow, Green, Blue, Indigo, and Violet (ROYGBIV)!",
  },
  {
    id: 22,
    question: "What is the largest organ in the human body?",
    options: ["Liver", "Brain", "Skin", "Heart"],
    answer: "Skin",
    category: "Science",
    emoji: "🧑",
    fact: "Human skin weighs about 8 pounds and covers approximately 22 square feet!",
  },
  {
    id: 23,
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["China", "Japan", "Thailand", "South Korea"],
    answer: "Japan",
    category: "Geography",
    emoji: "🇯🇵",
    fact: "Japan is called this because it's located to the east where the sun rises!",
  },
  {
    id: 24,
    question: "What is the fastest fish in the ocean?",
    options: ["Tuna", "Marlin", "Swordfish", "Sailfish"],
    answer: "Sailfish",
    category: "Animals",
    emoji: "🐟",
    fact: "Sailfish can swim up to 68 mph, making them the fastest fish in the ocean!",
  },
  {
    id: 25,
    question: "How many teeth does an adult human have?",
    options: ["28", "30", "32", "34"],
    answer: "32",
    category: "Science",
    emoji: "🦷",
    fact: "This includes 4 wisdom teeth, though many people have them removed!",
  },
  {
    id: 26,
    question: "What is the longest river in the world?",
    options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
    answer: "Nile",
    category: "Geography",
    emoji: "🏞️",
    fact: "The Nile River is about 4,135 miles long and flows through 11 countries!",
  },
  {
    id: 27,
    question: "Which bird cannot fly?",
    options: ["Penguin", "Parrot", "Eagle", "Hawk"],
    answer: "Penguin",
    category: "Animals",
    emoji: "🐧",
    fact: "Penguins use their wings as flippers to swim underwater instead of flying!",
  },
  {
    id: 28,
    question: "What is the hottest planet in our solar system?",
    options: ["Mercury", "Venus", "Mars", "Jupiter"],
    answer: "Venus",
    category: "Space",
    emoji: "🪐",
    fact: "Venus reaches temperatures of 900°F due to its thick atmosphere that traps heat!",
  },
  {
    id: 29,
    question: "How many sides does a hexagon have?",
    options: ["Four", "Five", "Six", "Seven"],
    answer: "Six",
    category: "Math",
    emoji: "⬡",
    fact: "Honeycomb cells are hexagonal because this shape uses the least amount of wax!",
  },
  {
    id: 30,
    question: "What is the national animal of Australia?",
    options: ["Koala", "Kangaroo", "Emu", "Wombat"],
    answer: "Kangaroo",
    category: "Animals",
    emoji: "🦘",
    fact: "Kangaroos can jump up to 30 feet in a single leap!",
  },
  {
    id: 31,
    question: "Which element has the chemical symbol 'O'?",
    options: ["Gold", "Oxygen", "Osmium", "Oganesson"],
    answer: "Oxygen",
    category: "Science",
    emoji: "💨",
    fact: "Oxygen makes up about 21% of Earth's atmosphere!",
  },
  {
    id: 32,
    question: "How many stripes are on the American flag?",
    options: ["11", "13", "15", "50"],
    answer: "13",
    category: "History",
    emoji: "🇺🇸",
    fact: "The 13 stripes represent the original 13 colonies!",
  },
  {
    id: 33,
    question: "What is the largest desert in the world?",
    options: ["Sahara", "Arabian", "Gobi", "Antarctic"],
    answer: "Antarctic",
    category: "Geography",
    emoji: "🏜️",
    fact: "Antarctica is technically a desert because it receives very little precipitation!",
  },
  {
    id: 34,
    question: "Which animal is the tallest in the world?",
    options: ["Elephant", "Giraffe", "Ostrich", "Camel"],
    answer: "Giraffe",
    category: "Animals",
    emoji: "🦒",
    fact: "Giraffes can grow up to 18 feet tall and their tongues are about 20 inches long!",
  },
  {
    id: 35,
    question: "What is the speed of light?",
    options: [
      "186,000 mph",
      "186,000 miles per second",
      "300,000 mph",
      "300,000 km per hour",
    ],
    answer: "186,000 miles per second",
    category: "Science",
    emoji: "💡",
    fact: "Light can travel around Earth 7.5 times in just one second!",
  },
  {
    id: 36,
    question: "Which ocean is the deepest?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    answer: "Pacific",
    category: "Geography",
    emoji: "🌊",
    fact: "The Mariana Trench in the Pacific Ocean is nearly 7 miles deep!",
  },
  {
    id: 37,
    question: "How many chambers does the human heart have?",
    options: ["Two", "Three", "Four", "Five"],
    answer: "Four",
    category: "Science",
    emoji: "❤️",
    fact: "The heart beats about 100,000 times per day!",
  },
  {
    id: 38,
    question: "What is the capital of Italy?",
    options: ["Venice", "Milan", "Rome", "Florence"],
    answer: "Rome",
    category: "Geography",
    emoji: "🏛️",
    fact: "Rome is over 2,500 years old and is called the 'Eternal City'!",
  },
  {
    id: 39,
    question: "Which animal can change its color?",
    options: ["Frog", "Chameleon", "Snake", "Lizard"],
    answer: "Chameleon",
    category: "Animals",
    emoji: "🦎",
    fact: "Chameleons change color for communication and temperature regulation, not just camouflage!",
  },
  {
    id: 40,
    question: "How many planets are in our solar system?",
    options: ["Seven", "Eight", "Nine", "Ten"],
    answer: "Eight",
    category: "Space",
    emoji: "🌌",
    fact: "Pluto was reclassified as a dwarf planet in 2006!",
  },
  {
    id: 41,
    question: "What is the smallest bone in the human body?",
    options: ["Stapes", "Femur", "Radius", "Tibia"],
    answer: "Stapes",
    category: "Science",
    emoji: "👂",
    fact: "The stapes is in your ear and is only 2.8mm long!",
  },
  {
    id: 42,
    question: "Which country has the most natural lakes?",
    options: ["USA", "Russia", "Canada", "Brazil"],
    answer: "Canada",
    category: "Geography",
    emoji: "🏔️",
    fact: "Canada has over 2 million lakes covering about 8% of its land!",
  },
  {
    id: 43,
    question: "What is the only flying mammal?",
    options: ["Flying Squirrel", "Bat", "Sugar Glider", "Flying Lemur"],
    answer: "Bat",
    category: "Animals",
    emoji: "🦇",
    fact: "Bats can live for over 30 years and some can fly at speeds of 60 mph!",
  },
  {
    id: 44,
    question: "How many minutes are in a full day?",
    options: ["1,440", "1,400", "1,200", "1,000"],
    answer: "1,440",
    category: "Math",
    emoji: "⏰",
    fact: "There are 24 hours × 60 minutes = 1,440 minutes in a day!",
  },
  {
    id: 45,
    question: "What is the largest planet in our solar system?",
    options: ["Saturn", "Neptune", "Jupiter", "Uranus"],
    answer: "Jupiter",
    category: "Space",
    emoji: "🪐",
    fact: "Jupiter is so large that all other planets in the solar system could fit inside it!",
  },
  {
    id: 46,
    question: "Which metal is liquid at room temperature?",
    options: ["Lead", "Mercury", "Zinc", "Copper"],
    answer: "Mercury",
    category: "Science",
    emoji: "🌡️",
    fact: "Mercury is the only metal that is liquid at standard room temperature!",
  },
  {
    id: 47,
    question: "What is the capital of Egypt?",
    options: ["Cairo", "Alexandria", "Luxor", "Giza"],
    answer: "Cairo",
    category: "Geography",
    emoji: "🏜️",
    fact: "Cairo is the largest city in Africa and the Arab world!",
  },
  {
    id: 48,
    question: "Which animal has the longest lifespan?",
    options: ["Elephant", "Tortoise", "Whale", "Parrot"],
    answer: "Tortoise",
    category: "Animals",
    emoji: "🐢",
    fact: "Some tortoises can live over 150 years!",
  },
  {
    id: 49,
    question: "What is the square root of 144?",
    options: ["10", "11", "12", "13"],
    answer: "12",
    category: "Math",
    emoji: "🔢",
    fact: "12 × 12 = 144!",
  },
  {
    id: 50,
    question: "Which country is home to the kangaroo?",
    options: ["New Zealand", "Australia", "Papua New Guinea", "Indonesia"],
    answer: "Australia",
    category: "Geography",
    emoji: "🦘",
    fact: "Australia has over 50 million kangaroos, more than twice its human population!",
  },
  {
    id: 51,
    question: "How many wings does a bee have?",
    options: ["Two", "Four", "Six", "Eight"],
    answer: "Four",
    category: "Animals",
    emoji: "🐝",
    fact: "Bees have two pairs of wings that hook together when flying!",
  },
  {
    id: 52,
    question: "What is the freezing point of water in Celsius?",
    options: ["-10°C", "0°C", "10°C", "32°C"],
    answer: "0°C",
    category: "Science",
    emoji: "🧊",
    fact: "Water freezes at 0°C or 32°F!",
  },
  {
    id: 53,
    question: "Which mountain range is Mount Everest part of?",
    options: ["Alps", "Andes", "Himalayas", "Rockies"],
    answer: "Himalayas",
    category: "Geography",
    emoji: "🏔️",
    fact: "The Himalayas span five countries and contain 9 of the world's 10 highest peaks!",
  },
  {
    id: 54,
    question: "What is the national bird of the United States?",
    options: ["Bald Eagle", "Golden Eagle", "Hawk", "Falcon"],
    answer: "Bald Eagle",
    category: "Animals",
    emoji: "🦅",
    fact: "Bald eagles can live up to 28 years in the wild and have a wingspan of 7 feet!",
  },
  {
    id: 55,
    question: "How many sides does a triangle have?",
    options: ["Two", "Three", "Four", "Five"],
    answer: "Three",
    category: "Math",
    emoji: "🔺",
    fact: "The angles in a triangle always add up to 180 degrees!",
  },
  {
    id: 56,
    question: "Which planet has the most moons?",
    options: ["Earth", "Mars", "Saturn", "Jupiter"],
    answer: "Saturn",
    category: "Space",
    emoji: "🪐",
    fact: "Saturn has over 140 confirmed moons!",
  },
  {
    id: 57,
    question: "What is the boiling point of water at sea level?",
    options: ["90°C", "100°C", "110°C", "120°C"],
    answer: "100°C",
    category: "Science",
    emoji: "♨️",
    fact: "Water boils at 100°C or 212°F at sea level!",
  },
  {
    id: 58,
    question: "Which country is known for the Great Wall?",
    options: ["Japan", "China", "Mongolia", "Korea"],
    answer: "China",
    category: "Geography",
    emoji: "🏯",
    fact: "The Great Wall of China is over 13,000 miles long!",
  },
  {
    id: 59,
    question: "What color is a polar bear's skin?",
    options: ["White", "Pink", "Black", "Brown"],
    answer: "Black",
    category: "Animals",
    emoji: "🐻‍❄️",
    fact: "Polar bears have black skin under their white fur to absorb heat!",
  },
  {
    id: 60,
    question: "How many degrees are in a circle?",
    options: ["180", "270", "360", "450"],
    answer: "360",
    category: "Math",
    emoji: "⭕",
    fact: "A full rotation or circle contains 360 degrees!",
  },
  {
    id: 61,
    question: "Which star is closest to Earth?",
    options: ["Proxima Centauri", "Sirius", "The Sun", "Alpha Centauri"],
    answer: "The Sun",
    category: "Space",
    emoji: "☀️",
    fact: "The Sun is about 93 million miles away from Earth!",
  },
  {
    id: 62,
    question: "What is the most abundant gas in Earth's atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    answer: "Nitrogen",
    category: "Science",
    emoji: "💨",
    fact: "Nitrogen makes up about 78% of Earth's atmosphere!",
  },
  {
    id: 63,
    question: "Which continent is the Sahara Desert located on?",
    options: ["Asia", "Africa", "Australia", "South America"],
    answer: "Africa",
    category: "Geography",
    emoji: "🏜️",
    fact: "The Sahara Desert is almost as large as the United States!",
  },
  {
    id: 64,
    question: "What do pandas primarily eat?",
    options: ["Fish", "Bamboo", "Meat", "Insects"],
    answer: "Bamboo",
    category: "Animals",
    emoji: "🐼",
    fact: "Pandas can eat up to 40 pounds of bamboo per day!",
  },
  {
    id: 65,
    question: "What is 7 × 8?",
    options: ["54", "56", "58", "60"],
    answer: "56",
    category: "Math",
    emoji: "✖️",
    fact: "7 × 8 = 56, one of the trickier multiplication facts!",
  },
  {
    id: 66,
    question: "Which planet is known for its rings?",
    options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
    answer: "Saturn",
    category: "Space",
    emoji: "🪐",
    fact: "Saturn's rings are made of ice and rock particles!",
  },
  {
    id: 67,
    question: "What is the chemical symbol for water?",
    options: ["H2O", "O2", "CO2", "H2"],
    answer: "H2O",
    category: "Science",
    emoji: "💧",
    fact: "H2O means two hydrogen atoms bonded to one oxygen atom!",
  },
  {
    id: 68,
    question: "Which river flows through Egypt?",
    options: ["Amazon", "Nile", "Mississippi", "Yangtze"],
    answer: "Nile",
    category: "Geography",
    emoji: "🏞️",
    fact: "The Nile River was crucial to ancient Egyptian civilization!",
  },
  {
    id: 69,
    question: "How many eyes does a spider typically have?",
    options: ["Two", "Four", "Six", "Eight"],
    answer: "Eight",
    category: "Animals",
    emoji: "🕷️",
    fact: "Despite having 8 eyes, most spiders have poor vision!",
  },
  {
    id: 70,
    question: "What is half of 100?",
    options: ["25", "40", "50", "60"],
    answer: "50",
    category: "Math",
    emoji: "➗",
    fact: "50 is exactly halfway between 0 and 100!",
  },
  {
    id: 71,
    question: "Which planet is the smallest in our solar system?",
    options: ["Mars", "Mercury", "Venus", "Pluto"],
    answer: "Mercury",
    category: "Space",
    emoji: "☿️",
    fact: "Mercury is only slightly larger than Earth's moon!",
  },
  {
    id: 72,
    question: "What gas do humans breathe out?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Helium"],
    answer: "Carbon Dioxide",
    category: "Science",
    emoji: "😮‍💨",
    fact: "We breathe in oxygen and breathe out carbon dioxide!",
  },
  {
    id: 73,
    question: "Which country is home to the Eiffel Tower?",
    options: ["Italy", "Spain", "France", "Germany"],
    answer: "France",
    category: "Geography",
    emoji: "🗼",
    fact: "The Eiffel Tower was built in 1889 and is 1,083 feet tall!",
  },
  {
    id: 74,
    question: "Which bird is known for its colorful tail feathers?",
    options: ["Parrot", "Peacock", "Eagle", "Owl"],
    answer: "Peacock",
    category: "Animals",
    emoji: "🦚",
    fact: "Only male peacocks have the colorful tail display!",
  },
  {
    id: 75,
    question: "What is 10 × 10?",
    options: ["10", "50", "100", "1000"],
    answer: "100",
    category: "Math",
    emoji: "💯",
    fact: "10 squared equals 100!",
  },
  {
    id: 76,
    question: "What do you call a baby kangaroo?",
    options: ["Cub", "Joey", "Kit", "Pup"],
    answer: "Joey",
    category: "Animals",
    emoji: "🦘",
    fact: "Baby kangaroos are only about 1 inch long when born!",
  },
  {
    id: 77,
    question: "How many days are in a leap year?",
    options: ["364", "365", "366", "367"],
    answer: "366",
    category: "Math",
    emoji: "📅",
    fact: "Leap years happen every 4 years to keep our calendar aligned!",
  },
  {
    id: 78,
    question: "Which planet has a Great Red Spot?",
    options: ["Mars", "Jupiter", "Saturn", "Neptune"],
    answer: "Jupiter",
    category: "Space",
    emoji: "🔴",
    fact: "The Great Red Spot is a giant storm that's been raging for over 300 years!",
  },
  {
    id: 79,
    question: "What is the main ingredient in bread?",
    options: ["Sugar", "Flour", "Milk", "Butter"],
    answer: "Flour",
    category: "Food",
    emoji: "🍞",
    fact: "Bread has been a staple food for thousands of years!",
  },
  {
    id: 80,
    question: "Which ocean is between North America and Europe?",
    options: ["Pacific", "Atlantic", "Indian", "Arctic"],
    answer: "Atlantic",
    category: "Geography",
    emoji: "🌊",
    fact: "The Atlantic Ocean covers about 20% of Earth's surface!",
  },
  {
    id: 81,
    question: "What is the fastest land animal in North America?",
    options: ["Wolf", "Bear", "Pronghorn", "Deer"],
    answer: "Pronghorn",
    category: "Animals",
    emoji: "🦌",
    fact: "Pronghorns can run up to 55 mph!",
  },
  {
    id: 82,
    question: "How many hours are in two days?",
    options: ["24", "36", "48", "60"],
    answer: "48",
    category: "Math",
    emoji: "🕐",
    fact: "24 hours × 2 days = 48 hours!",
  },
  {
    id: 83,
    question: "What causes tides in Earth's oceans?",
    options: ["The Sun", "The Wind", "The Moon", "Earth's Rotation"],
    answer: "The Moon",
    category: "Science",
    emoji: "🌙",
    fact: "The Moon's gravitational pull creates high and low tides!",
  },
  {
    id: 84,
    question: "Which country is shaped like a boot?",
    options: ["Greece", "Italy", "Spain", "Portugal"],
    answer: "Italy",
    category: "Geography",
    emoji: "👢",
    fact: "Italy extends into the Mediterranean Sea in a distinctive boot shape!",
  },
  {
    id: 85,
    question: "What do caterpillars turn into?",
    options: ["Moths", "Butterflies", "Both", "Bees"],
    answer: "Both",
    category: "Animals",
    emoji: "🦋",
    fact: "Caterpillars metamorphose into either butterflies or moths!",
  },
  {
    id: 86,
    question: "What is 15 + 15?",
    options: ["25", "30", "35", "40"],
    answer: "30",
    category: "Math",
    emoji: "➕",
    fact: "15 + 15 = 30, which is also 15 × 2!",
  },
];

export default function TriviaPage() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [seenIndices, setSeenIndices] = useState<number[]>([]);

  const trivia = TRIVIA_DATA[currentIdx];

  const handleOptionClick = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);

    if (option === trivia.answer) {
      setScore((prev) => prev + 1);
    } else {
      setScore(0); // Reset streak on wrong answer
    }
  };

  const handleNext = () => {
    setIsAnimating(true);

    setTimeout(() => {
      setCurrentIdx((prevIdx) => {
        // 1. Create a list of indices that haven't been seen yet
        // We also exclude the current index so they never see the same one twice
        const availableIndices = TRIVIA_DATA.map((_, index) => index).filter(
          (index) => !seenIndices.includes(index) && index !== prevIdx
        );

        let nextIdx: number;

        // 2. If we ran out of new trivia, reset the history and pick a new one
        if (availableIndices.length === 0) {
          setSeenIndices([prevIdx]); // Reset history but keep track of current
          // Pick any random index except the current one
          do {
            nextIdx = Math.floor(Math.random() * TRIVIA_DATA.length);
          } while (nextIdx === prevIdx && TRIVIA_DATA.length > 1);
        } else {
          // 3. Pick a random index from the available (unseen) list
          const randomIndexInAvailable = Math.floor(
            Math.random() * availableIndices.length
          );
          nextIdx = availableIndices[randomIndexInAvailable];

          // 4. Update the seen list
          setSeenIndices((prevSeen) => [...prevSeen, nextIdx]);
        }

        return nextIdx;
      });

      setSelectedOption(null);
      setIsAnswered(false);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#EEF2FF] font-sans pb-20 overflow-hidden">
      <Head>
        <title>Daily Trivia | imborednow</title>
      </Head>

      {/* --- STREAK HEADER --- */}
      <header className="bg-slate-900 pt-12 pb-24 px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400 rounded-full mb-4 animate-bounce">
          <span className="text-sm font-black text-slate-900 uppercase tracking-tighter">
            🔥 Current Streak: {score}
          </span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-white">
          Boredom <span className="text-indigo-400">Trivia</span>
        </h1>
      </header>

      <main className="max-w-2xl mx-auto px-4 -mt-16 relative z-10">
        <div
          className={`transition-all duration-300 transform ${
            isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
        >
          <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 border border-slate-100">
            {/* CATEGORY TAG */}
            <div className="flex justify-center mb-6">
              <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100">
                {trivia.category}
              </span>
            </div>

            {/* QUESTION */}
            <div className="text-center mb-10">
              <div className="text-6xl mb-4">{trivia.emoji}</div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-800 leading-tight">
                {trivia.question}
              </h2>
            </div>

            {/* OPTIONS GRID */}
            <div className="grid grid-cols-1 gap-3 mb-8">
              {trivia.options.map((option) => {
                const isCorrect = option === trivia.answer;
                const isSelected = selectedOption === option;

                let style =
                  "bg-slate-50 border-slate-100 text-slate-700 hover:border-indigo-300";
                if (isAnswered) {
                  if (isCorrect)
                    style =
                      "bg-emerald-50 border-emerald-500 text-emerald-700 ring-4 ring-emerald-100";
                  else if (isSelected)
                    style =
                      "bg-rose-50 border-rose-500 text-rose-700 opacity-60";
                  else
                    style =
                      "bg-slate-50 border-slate-50 text-slate-300 opacity-40";
                }

                return (
                  <button
                    key={option}
                    onClick={() => handleOptionClick(option)}
                    disabled={isAnswered}
                    className={`p-5 rounded-2xl border-2 font-bold text-lg text-left transition-all flex items-center justify-between active:scale-95 ${style}`}
                  >
                    {option}
                    {isAnswered && isCorrect && (
                      <span className="text-emerald-500 text-xl">✓</span>
                    )}
                    {isAnswered && isSelected && !isCorrect && (
                      <span className="text-rose-500 text-xl">✕</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* REVEAL FACT CARD */}
            {isAnswered && (
              <div className="bg-indigo-50 rounded-2xl p-6 border-2 border-indigo-100 animate-pop-in mb-8">
                <p className="text-indigo-900 font-bold leading-relaxed">
                  <span className="text-xl mr-2">🤓</span>
                  <span className="uppercase text-[10px] font-black block mb-1 opacity-50">
                    Did you know?
                  </span>
                  {trivia.fact}
                </p>
              </div>
            )}

            {/* NEXT BUTTON */}
            {isAnswered && (
              <button
                onClick={handleNext}
                className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-xl hover:bg-indigo-700 shadow-xl transition-all active:scale-95"
              >
                Next Question →
              </button>
            )}
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes pop-in {
          0% {
            opacity: 0;
            transform: translateY(10px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-pop-in {
          animation: pop-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)
            forwards;
        }
      `}</style>
    </div>
  );
}
