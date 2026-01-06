import { useState } from "react";

const DIY_CRAFTS = [
  {
    id: 1,
    title: "Instant Galaxy Jar",
    emoji: "🌌",
    difficulty: "Easy",
    time: "10 mins",
    category: "Decor",
    materials: [
      "Glass Jar",
      "Cotton Balls",
      "Glitter",
      "Food Coloring",
      "Water",
    ],
    steps: [
      "Fill the jar 1/3 with water and add food coloring.",
      "Stuff cotton balls to absorb the colored water.",
      "Sprinkle glitter for stars.",
      "Repeat layers with different colors until full.",
      "Seal and shake for galaxy effect!",
    ],
    fun_fact: "The Milky Way galaxy is about 100,000 light-years wide!",
  },
  {
    id: 2,
    title: "Paper Plate Dream Catcher",
    emoji: "🎨",
    difficulty: "Easy",
    time: "20 mins",
    category: "Kids",
    materials: [
      "Paper Plate",
      "Yarn",
      "Beads",
      "Feathers",
      "Scissors",
      "Hole Punch",
    ],
    steps: [
      "Cut out the center of the paper plate leaving a 2-inch rim.",
      "Punch holes around the rim evenly spaced.",
      "Weave yarn through the holes creating a web pattern.",
      "Add beads while weaving for decoration.",
      "Attach feathers to the bottom with yarn.",
    ],
    fun_fact: "Dream catchers originated from Native American Ojibwe culture!",
  },
  {
    id: 3,
    title: "Tin Can Herb Garden",
    emoji: "🌿",
    difficulty: "Easy",
    time: "15 mins",
    category: "Garden",
    materials: [
      "Tin Cans",
      "Paint",
      "Soil",
      "Herb Seeds",
      "Rocks for Drainage",
    ],
    steps: [
      "Clean and dry the tin cans thoroughly.",
      "Paint the outside with your favorite colors.",
      "Poke drainage holes in the bottom.",
      "Add rocks, then soil, then plant seeds.",
      "Water and place on a sunny windowsill.",
    ],
    fun_fact: "Basil can help repel mosquitoes naturally!",
  },
  {
    id: 4,
    title: "Washi Tape Wall Art",
    emoji: "🎭",
    difficulty: "Easy",
    time: "25 mins",
    category: "Decor",
    materials: ["Washi Tape", "Canvas or Wall", "Scissors", "Ruler"],
    steps: [
      "Plan your design on paper first.",
      "Use ruler to create straight lines with tape.",
      "Create geometric patterns or words.",
      "Layer different colors for depth.",
      "Press down firmly to secure.",
    ],
    fun_fact:
      "Washi tape comes from Japanese 'washi' paper made from natural fibers!",
  },
  {
    id: 5,
    title: "Coffee Filter Flowers",
    emoji: "🌸",
    difficulty: "Easy",
    time: "15 mins",
    category: "Decor",
    materials: [
      "Coffee Filters",
      "Markers",
      "Water Spray",
      "Pipe Cleaners",
      "Scissors",
    ],
    steps: [
      "Color the coffee filters with markers.",
      "Spray lightly with water to blend colors.",
      "Let dry completely.",
      "Stack 3-4 filters and pinch in the center.",
      "Wrap pipe cleaner around center to create stem.",
    ],
    fun_fact:
      "Coffee filters were invented in 1908 by Melitta Bentz in Germany!",
  },
  {
    id: 6,
    title: "Mason Jar Lantern",
    emoji: "🏮",
    difficulty: "Easy",
    time: "20 mins",
    category: "Decor",
    materials: [
      "Mason Jar",
      "Tissue Paper",
      "Mod Podge",
      "LED Candle",
      "Brush",
    ],
    steps: [
      "Tear tissue paper into small pieces.",
      "Brush Mod Podge onto jar surface.",
      "Apply tissue paper pieces overlapping slightly.",
      "Add another coat of Mod Podge over tissue.",
      "Let dry and place LED candle inside.",
    ],
    fun_fact: "Mason jars were patented in 1858 and are still popular today!",
  },
  {
    id: 7,
    title: "Painted Rock Pets",
    emoji: "🪨",
    difficulty: "Easy",
    time: "30 mins",
    category: "Kids",
    materials: [
      "Smooth Rocks",
      "Acrylic Paint",
      "Paintbrushes",
      "Googly Eyes",
      "Glue",
    ],
    steps: [
      "Wash and dry rocks thoroughly.",
      "Paint base coat and let dry.",
      "Add details like spots, stripes, or patterns.",
      "Glue on googly eyes.",
      "Seal with clear coat if desired.",
    ],
    fun_fact: "Rock painting has been practiced since prehistoric cave art!",
  },
  {
    id: 8,
    title: "Popsicle Stick Photo Frame",
    emoji: "🖼️",
    difficulty: "Easy",
    time: "25 mins",
    category: "Gifts",
    materials: [
      "Popsicle Sticks",
      "Glue",
      "Paint",
      "Decorations",
      "Magnet Strip",
    ],
    steps: [
      "Glue 4 popsicle sticks into a square frame.",
      "Paint and let dry completely.",
      "Add decorations like buttons or sequins.",
      "Attach magnet strip to back.",
      "Insert photo and display on fridge.",
    ],
    fun_fact: "Popsicle sticks were originally called 'Epsicle' sticks!",
  },
  {
    id: 9,
    title: "Yarn Wrapped Letters",
    emoji: "✨",
    difficulty: "Medium",
    time: "45 mins",
    category: "Decor",
    materials: ["Cardboard Letters", "Yarn", "Glue", "Scissors"],
    steps: [
      "Apply glue to a small section of letter.",
      "Wrap yarn tightly around that section.",
      "Continue wrapping, adding glue as needed.",
      "Fill in entire letter with yarn.",
      "Trim and secure end with extra glue.",
    ],
    fun_fact: "Yarn crafting dates back over 20,000 years!",
  },
  {
    id: 10,
    title: "Toilet Paper Roll Organizer",
    emoji: "📦",
    difficulty: "Easy",
    time: "20 mins",
    category: "Recycling",
    materials: [
      "Toilet Paper Rolls",
      "Cardboard Box",
      "Glue",
      "Paint",
      "Scissors",
    ],
    steps: [
      "Cut toilet paper rolls to same height.",
      "Paint rolls in coordinating colors.",
      "Glue rolls inside a cardboard box standing up.",
      "Let dry completely.",
      "Use to organize pens, makeup brushes, or cords.",
    ],
    fun_fact:
      "Americans use about 50 pounds of toilet paper per person annually!",
  },
  {
    id: 11,
    title: "Beaded Friendship Bracelets",
    emoji: "💎",
    difficulty: "Medium",
    time: "40 mins",
    category: "Jewelry",
    materials: ["Embroidery Floss", "Beads", "Tape", "Scissors"],
    steps: [
      "Cut three strands of floss 24 inches long.",
      "Tie together and tape end to work surface.",
      "Braid strands adding beads as you go.",
      "Continue until desired length.",
      "Tie ends and trim excess.",
    ],
    fun_fact:
      "Friendship bracelets originated from Central American craft traditions!",
  },
  {
    id: 12,
    title: "Egg Carton Caterpillar",
    emoji: "🐛",
    difficulty: "Easy",
    time: "15 mins",
    category: "Kids",
    materials: ["Egg Carton", "Paint", "Pipe Cleaners", "Googly Eyes", "Glue"],
    steps: [
      "Cut a row of 6 cups from egg carton.",
      "Paint in bright colors and let dry.",
      "Glue googly eyes on first cup.",
      "Poke holes and insert pipe cleaners for antennae.",
      "Draw a smile with marker.",
    ],
    fun_fact:
      "Some caterpillars have up to 4,000 muscles in their tiny bodies!",
  },
  {
    id: 13,
    title: "Wine Cork Bath Mat",
    emoji: "🛁",
    difficulty: "Hard",
    time: "2 hours",
    category: "Home",
    materials: ["Wine Corks (200+)", "Rubber Mat", "Hot Glue Gun", "Knife"],
    steps: [
      "Cut corks in half lengthwise.",
      "Arrange corks on mat to plan layout.",
      "Hot glue corks flat-side down to mat.",
      "Fill entire mat with tightly packed corks.",
      "Let dry overnight before using.",
    ],
    fun_fact: "Cork is harvested from cork oak trees without harming the tree!",
  },
  {
    id: 14,
    title: "Newspaper Seedling Pots",
    emoji: "🌱",
    difficulty: "Easy",
    time: "10 mins",
    category: "Garden",
    materials: ["Newspaper", "Glass or Can", "Tape", "Soil", "Seeds"],
    steps: [
      "Cut newspaper into 4-inch wide strips.",
      "Wrap strip around glass leaving overhang.",
      "Fold bottom overhang inward to create base.",
      "Tape to secure, then slide off glass.",
      "Fill with soil and plant seeds.",
    ],
    fun_fact:
      "Newspaper pots can be planted directly in soil and will decompose!",
  },
  {
    id: 15,
    title: "Fabric Scrap Bookmark",
    emoji: "📚",
    difficulty: "Easy",
    time: "20 mins",
    category: "Gifts",
    materials: [
      "Fabric Scraps",
      "Ribbon",
      "Fusible Interfacing",
      "Iron",
      "Scissors",
    ],
    steps: [
      "Cut fabric into 2x6 inch rectangle.",
      "Iron fusible interfacing to back.",
      "Fold edges inward and iron flat.",
      "Attach ribbon to top with a few stitches.",
      "Add decorative button if desired.",
    ],
    fun_fact: "The earliest bookmarks date back to the 6th century!",
  },
  {
    id: 16,
    title: "Plastic Bottle Planters",
    emoji: "♻️",
    difficulty: "Easy",
    time: "15 mins",
    category: "Recycling",
    materials: ["Plastic Bottles", "Scissors", "Paint", "Soil", "Small Plants"],
    steps: [
      "Cut bottle in half horizontally.",
      "Poke drainage holes in bottom half.",
      "Paint or decorate outside of bottle.",
      "Fill with soil and plant.",
      "Water and place in sunny spot.",
    ],
    fun_fact:
      "One recycled plastic bottle saves enough energy to power a laptop for 3 hours!",
  },
  {
    id: 17,
    title: "Button Bowl",
    emoji: "🥣",
    difficulty: "Medium",
    time: "1 hour",
    category: "Decor",
    materials: ["Buttons", "Balloon", "Mod Podge", "Bowl", "Brush"],
    steps: [
      "Inflate balloon and place in bowl.",
      "Brush Mod Podge on half of balloon.",
      "Press buttons onto glued area overlapping.",
      "Apply more Mod Podge over buttons.",
      "Let dry 24 hours, pop balloon, and remove.",
    ],
    fun_fact:
      "The oldest known button was found in Pakistan from 5,000 years ago!",
  },
  {
    id: 18,
    title: "Handprint Canvas Art",
    emoji: "🖐️",
    difficulty: "Easy",
    time: "30 mins",
    category: "Kids",
    materials: ["Canvas", "Acrylic Paint", "Paintbrush", "Markers"],
    steps: [
      "Paint child's hand with desired color.",
      "Press hand firmly onto canvas.",
      "Let dry completely.",
      "Use markers to turn handprint into an animal or design.",
      "Add details like eyes, scenery, or text.",
    ],
    fun_fact: "Handprints in caves have been found dating back 40,000 years!",
  },
  {
    id: 19,
    title: "Melted Crayon Art",
    emoji: "🖍️",
    difficulty: "Medium",
    time: "45 mins",
    category: "Decor",
    materials: ["Crayons", "Canvas", "Hot Glue Gun", "Hair Dryer", "Newspaper"],
    steps: [
      "Glue crayons in a row across top of canvas.",
      "Place canvas upright on newspaper.",
      "Use hair dryer on high to melt crayons.",
      "Let wax drip down creating colorful streams.",
      "Allow to cool and dry completely.",
    ],
    fun_fact: "The average child will wear down 730 crayons by age 10!",
  },
  {
    id: 20,
    title: "Sock Snowman",
    emoji: "⛄",
    difficulty: "Easy",
    time: "25 mins",
    category: "Seasonal",
    materials: [
      "White Sock",
      "Rice",
      "Rubber Bands",
      "Buttons",
      "Fabric Scraps",
      "Glue",
    ],
    steps: [
      "Fill sock 2/3 full with rice.",
      "Tie off top with rubber band.",
      "Create head by adding rubber band 1/3 from top.",
      "Glue on buttons for eyes and down front.",
      "Add fabric scrap scarf and small hat.",
    ],
    fun_fact: "The largest snowman ever built was 122 feet tall in Maine!",
  },
  {
    id: 21,
    title: "Origami Crane Mobile",
    emoji: "🕊️",
    difficulty: "Medium",
    time: "1 hour",
    category: "Decor",
    materials: [
      "Origami Paper",
      "String",
      "Embroidery Hoop",
      "Scissors",
      "Needle",
    ],
    steps: [
      "Fold 10-15 origami cranes in various colors.",
      "Cut strings to different lengths.",
      "Thread needle and attach string to each crane.",
      "Tie strings to embroidery hoop at different points.",
      "Hang hoop from ceiling with additional string.",
    ],
    fun_fact: "Japanese legend says folding 1,000 cranes grants a wish!",
  },
  {
    id: 22,
    title: "Seashell Wind Chime",
    emoji: "🐚",
    difficulty: "Medium",
    time: "45 mins",
    category: "Decor",
    materials: ["Seashells", "Driftwood", "Fishing Line", "Drill", "Beads"],
    steps: [
      "Drill small holes in shells carefully.",
      "Cut fishing line into various lengths.",
      "String shells onto lines with beads between.",
      "Tie lines to driftwood at intervals.",
      "Add hanging loop to driftwood center.",
    ],
    fun_fact: "The sound of wind chimes can help reduce stress and anxiety!",
  },
  {
    id: 23,
    title: "Felt Flower Bouquet",
    emoji: "💐",
    difficulty: "Medium",
    time: "50 mins",
    category: "Gifts",
    materials: [
      "Felt Sheets",
      "Floral Wire",
      "Glue Gun",
      "Scissors",
      "Green Tape",
    ],
    steps: [
      "Cut felt into petal shapes.",
      "Layer and glue petals around wire stem.",
      "Cut leaf shapes from green felt.",
      "Glue leaves to stem below flower.",
      "Wrap stem with green floral tape.",
    ],
    fun_fact:
      "Felt is one of the oldest textiles, dating back over 8,000 years!",
  },
  {
    id: 24,
    title: "Magazine Paper Beads",
    emoji: "📰",
    difficulty: "Medium",
    time: "1 hour",
    category: "Jewelry",
    materials: [
      "Magazines",
      "Glue",
      "Toothpicks",
      "Clear Nail Polish",
      "String",
    ],
    steps: [
      "Cut magazine pages into long triangles.",
      "Start rolling wide end around toothpick tightly.",
      "Glue tip down when fully rolled.",
      "Coat with clear nail polish and let dry.",
      "String beads to make necklace or bracelet.",
    ],
    fun_fact:
      "Paper beads have been made in Uganda for decades as a sustainable craft!",
  },
  {
    id: 25,
    title: "Clothespin Photo Display",
    emoji: "📸",
    difficulty: "Easy",
    time: "20 mins",
    category: "Decor",
    materials: ["Wooden Clothespins", "String or Wire", "Paint", "Photos"],
    steps: [
      "Paint clothespins in fun colors and let dry.",
      "String wire between two points on wall.",
      "Clip clothespins onto wire.",
      "Attach photos to clothespins.",
      "Rearrange photos anytime you want.",
    ],
    fun_fact: "The spring clothespin was invented in 1853 by David M. Smith!",
  },
  {
    id: 26,
    title: "Cardboard Box Castle",
    emoji: "🏰",
    difficulty: "Medium",
    time: "1.5 hours",
    category: "Kids",
    materials: [
      "Large Cardboard Boxes",
      "Paint",
      "Scissors",
      "Tape",
      "Markers",
    ],
    steps: [
      "Cut door and windows in main box.",
      "Create turrets from smaller boxes or tubes.",
      "Attach turrets to corners with tape.",
      "Paint entire castle gray or tan.",
      "Add details like flags and brick patterns.",
    ],
    fun_fact:
      "The largest castle in the world is Prague Castle at 753,474 sq ft!",
  },
  {
    id: 27,
    title: "Spoon Garden Markers",
    emoji: "🥄",
    difficulty: "Easy",
    time: "15 mins",
    category: "Garden",
    materials: ["Old Spoons", "Paint Markers", "Hammer", "Clear Sealant"],
    steps: [
      "Clean spoons thoroughly.",
      "Use paint markers to write plant names on spoons.",
      "Add decorative designs if desired.",
      "Spray with clear sealant to protect.",
      "Push spoon handles into soil beside plants.",
    ],
    fun_fact: "Companion planting certain herbs together can improve growth!",
  },
  {
    id: 28,
    title: "Duct Tape Wallet",
    emoji: "💳",
    difficulty: "Medium",
    time: "40 mins",
    category: "Accessories",
    materials: ["Duct Tape", "Scissors", "Ruler", "Velcro (optional)"],
    steps: [
      "Create fabric by overlapping duct tape strips sticky-side up.",
      "Cover with more tape sticky-side down.",
      "Cut into wallet-sized pieces.",
      "Fold and tape edges to create pockets.",
      "Add velcro closure if desired.",
    ],
    fun_fact: "Duct tape was originally called 'duck tape' and was army green!",
  },
  {
    id: 29,
    title: "Ice Cream Stick Explosion Box",
    emoji: "🎁",
    difficulty: "Hard",
    time: "2 hours",
    category: "Gifts",
    materials: [
      "Popsicle Sticks",
      "Glue",
      "Photos",
      "Decorative Paper",
      "Ribbons",
    ],
    steps: [
      "Create small box from popsicle sticks.",
      "Make panels that fold open from center.",
      "Decorate each panel with photos and messages.",
      "Add pockets for small gifts.",
      "Tie with ribbon that releases when pulled.",
    ],
    fun_fact:
      "Explosion boxes became popular as memory keeping gifts in 2010s!",
  },
  {
    id: 30,
    title: "Salt Dough Ornaments",
    emoji: "🎄",
    difficulty: "Easy",
    time: "45 mins + drying",
    category: "Seasonal",
    materials: ["Flour", "Salt", "Water", "Cookie Cutters", "Paint", "String"],
    steps: [
      "Mix 2 cups flour, 1 cup salt, 1 cup water into dough.",
      "Roll out to 1/4 inch thickness.",
      "Cut shapes with cookie cutters.",
      "Poke hole for hanging and bake at 200°F for 3 hours.",
      "Paint when cool and add string.",
    ],
    fun_fact: "Salt dough recipes have been used since ancient Egypt!",
  },
  {
    id: 31,
    title: "Bubble Wrap Printing",
    emoji: "🎨",
    difficulty: "Easy",
    time: "20 mins",
    category: "Kids",
    materials: ["Bubble Wrap", "Paint", "Paper", "Tape", "Rolling Pin"],
    steps: [
      "Tape bubble wrap to work surface bubble-side up.",
      "Paint colors onto bubbles.",
      "Press paper onto painted bubble wrap.",
      "Gently roll with rolling pin or hand.",
      "Peel off to reveal bubble pattern.",
    ],
    fun_fact: "Bubble wrap was originally intended to be textured wallpaper!",
  },
  {
    id: 32,
    title: "Upcycled Denim Coasters",
    emoji: "👖",
    difficulty: "Easy",
    time: "25 mins",
    category: "Recycling",
    materials: ["Old Jeans", "Scissors", "Cork Backing", "Fabric Glue"],
    steps: [
      "Cut 4-inch circles from jean legs.",
      "Cut matching circles from cork.",
      "Glue denim to cork backing.",
      "Add decorative stitching if desired.",
      "Make a set of 4-6 coasters.",
    ],
    fun_fact: "Americans throw away 14 million tons of textiles annually!",
  },
  {
    id: 33,
    title: "Lavender Sachet Bags",
    emoji: "💜",
    difficulty: "Easy",
    time: "30 mins",
    category: "Gifts",
    materials: [
      "Fabric Squares",
      "Dried Lavender",
      "Ribbon",
      "Needle and Thread",
    ],
    steps: [
      "Cut two 4x4 inch fabric squares.",
      "Sew three sides together inside out.",
      "Turn right-side out through open side.",
      "Fill with dried lavender.",
      "Sew or tie closed with ribbon.",
    ],
    fun_fact: "Lavender has been used for fragrance for over 2,500 years!",
  },
  {
    id: 34,
    title: "Pinecone Bird Feeder",
    emoji: "🐦",
    difficulty: "Easy",
    time: "15 mins",
    category: "Garden",
    materials: ["Pinecones", "Peanut Butter", "Birdseed", "String", "Plate"],
    steps: [
      "Tie string around top of pinecone.",
      "Spread peanut butter all over pinecone.",
      "Roll in birdseed on a plate.",
      "Press gently so seeds stick.",
      "Hang from tree branch and watch birds visit.",
    ],
    fun_fact: "Chickadees can remember thousands of hiding spots for food!",
  },
  {
    id: 35,
    title: "Watercolor Bookmark",
    emoji: "🌈",
    difficulty: "Easy",
    time: "30 mins",
    category: "Gifts",
    materials: [
      "Watercolor Paper",
      "Watercolors",
      "Brush",
      "Scissors",
      "Laminator or Clear Tape",
      "Ribbon",
    ],
    steps: [
      "Cut watercolor paper into bookmark strips.",
      "Paint abstract designs or patterns.",
      "Let dry completely.",
      "Laminate or cover with clear tape for durability.",
      "Punch hole and add ribbon tassel.",
    ],
    fun_fact:
      "Watercolor paint has been used by artists since ancient Egyptian times!",
  },
  {
    id: 36,
    title: "Bottle Cap Magnets",
    emoji: "🧲",
    difficulty: "Easy",
    time: "20 mins",
    category: "Recycling",
    materials: [
      "Bottle Caps",
      "Magnets",
      "Hot Glue",
      "Paint",
      "Mod Podge",
      "Photos or Paper",
    ],
    steps: [
      "Clean bottle caps thoroughly.",
      "Paint inside of caps or add decorative paper.",
      "Cut photos or images to fit inside cap.",
      "Glue image inside with Mod Podge.",
      "Hot glue magnet to back of cap.",
    ],
    fun_fact: "Crown bottle caps were invented in 1892 by William Painter!",
  },
  {
    id: 37,
    title: "Braided T-Shirt Rug",
    emoji: "🧵",
    difficulty: "Hard",
    time: "3 hours",
    category: "Recycling",
    materials: ["Old T-Shirts", "Scissors", "Needle and Thread"],
    steps: [
      "Cut t-shirts into 2-inch wide strips.",
      "Braid three strips together tightly.",
      "Coil braid into circular or oval shape.",
      "Sew coils together as you wind.",
      "Secure end and tuck under for clean finish.",
    ],
    fun_fact: "Each American throws away about 70 pounds of textiles per year!",
  },
  {
    id: 38,
    title: "Pressed Flower Frame",
    emoji: "🌼",
    difficulty: "Medium",
    time: "2 weeks (pressing time)",
    category: "Decor",
    materials: [
      "Fresh Flowers",
      "Heavy Books",
      "Parchment Paper",
      "Frame",
      "Tweezers",
      "Glue",
    ],
    steps: [
      "Place flowers between parchment paper in heavy book.",
      "Let press for 1-2 weeks.",
      "Carefully remove dried flowers with tweezers.",
      "Arrange on frame backing and glue lightly.",
      "Assemble frame to preserve flowers.",
    ],
    fun_fact: "Pressed flower art dates back to 16th century herbalists!",
  },
  {
    id: 39,
    title: "Shoebox Diorama",
    emoji: "📦",
    difficulty: "Medium",
    time: "1 hour",
    category: "Kids",
    materials: [
      "Shoebox",
      "Construction Paper",
      "Small Toys/Figurines",
      "Glue",
      "Paint",
      "Natural Materials",
    ],
    steps: [
      "Choose a scene (ocean, forest, space, etc.).",
      "Paint or paper the inside of box as background.",
      "Create ground layer with paper or natural materials.",
      "Add figurines and decorative elements.",
      "Create details like trees, rocks, or buildings.",
    ],
    fun_fact: "Dioramas were first created in 1822 by Louis Daguerre in Paris!",
  },
  {
    id: 40,
    title: "Macrame Plant Hanger",
    emoji: "🪴",
    difficulty: "Hard",
    time: "2 hours",
    category: "Decor",
    materials: [
      "Macrame Cord",
      "Metal Ring",
      "Scissors",
      "Pot",
      "Measuring Tape",
    ],
    steps: [
      "Cut 8 strands of cord 10 feet long each.",
      "Fold in half and attach to metal ring.",
      "Create square knots in 4 groups down length.",
      "Join adjacent cords from different groups to form basket.",
      "Gather all cords at bottom and tie off.",
    ],
    fun_fact: "Macrame became hugely popular in the 1970s home decor trend!",
  },
  {
    id: 41,
    title: "Painted Flower Pots",
    emoji: "🏺",
    difficulty: "Easy",
    time: "30 mins",
    category: "Garden",
    materials: [
      "Terra Cotta Pots",
      "Acrylic Paint",
      "Paintbrushes",
      "Sealer Spray",
    ],
    steps: [
      "Clean pots and let dry completely.",
      "Paint base coat and let dry.",
      "Add designs, patterns, or messages.",
      "Let all paint dry thoroughly.",
      "Spray with sealer for outdoor protection.",
    ],
    fun_fact: "Terra cotta means 'baked earth' in Italian!",
  },
  {
    id: 42,
    title: "Pom Pom Garland",
    emoji: "🎉",
    difficulty: "Easy",
    time: "45 mins",
    category: "Decor",
    materials: ["Yarn", "Cardboard", "Scissors", "String or Twine"],
    steps: [
      "Cut two cardboard circles with holes in center.",
      "Wrap yarn around both circles repeatedly.",
      "Cut around outer edge through all yarn layers.",
      "Tie tightly between cardboard circles and remove cardboard.",
      "String multiple pom poms onto twine for garland.",
    ],
    fun_fact: "Cheerleaders started using pom poms in the 1930s!",
  },
  {
    id: 43,
    title: "Soap Carving",
    emoji: "🧼",
    difficulty: "Medium",
    time: "40 mins",
    category: "Kids",
    materials: ["Bar of Soap", "Butter Knife", "Toothpick", "Pencil", "Towel"],
    steps: [
      "Draw design on soap with pencil.",
      "Use butter knife to carve away excess soap.",
      "Add details with toothpick.",
      "Smooth rough areas gently.",
      "Rinse off pencil marks when done.",
    ],
    fun_fact: "Soap carving became popular at Boy Scout camps in the 1920s!",
  },
  {
    id: 44,
    title: "DIY Terrarium",
    emoji: "🌿",
    difficulty: "Easy",
    time: "35 mins",
    category: "Garden",
    materials: [
      "Glass Container",
      "Pebbles",
      "Activated Charcoal",
      "Potting Soil",
      "Small Plants",
      "Decorations",
    ],
    steps: [
      "Layer pebbles in bottom for drainage.",
      "Add thin layer of activated charcoal.",
      "Add potting soil 2-3 inches deep.",
      "Plant succulents or small plants.",
      "Add decorative rocks, figures, or moss.",
    ],
    fun_fact:
      "The first terrarium was created by accident in 1842 by Nathaniel Ward!",
  },
  {
    id: 45,
    title: "Recycled Crayon Hearts",
    emoji: "❤️",
    difficulty: "Easy",
    time: "30 mins",
    category: "Recycling",
    materials: ["Broken Crayons", "Silicone Heart Mold", "Oven"],
    steps: [
      "Preheat oven to 275°F.",
      "Remove paper wrappers from crayons.",
      "Break crayons into small pieces.",
      "Fill silicone molds with crayon pieces.",
      "Bake for 10-15 minutes, cool, and pop out.",
    ],
    fun_fact: "Crayola makes nearly 3 billion crayons every year!",
  },
  {
    id: 46,
    title: "Painted Stone Tic-Tac-Toe",
    emoji: "⭕",
    difficulty: "Easy",
    time: "40 mins",
    category: "Kids",
    materials: [
      "10 Smooth Stones",
      "Paint",
      "Small Canvas or Board",
      "Paintbrush",
    ],
    steps: [
      "Paint 5 stones with X's and 5 with O's.",
      "Let stones dry completely.",
      "Paint tic-tac-toe grid on canvas.",
      "Let grid dry.",
      "Store stones in small bag with board.",
    ],
    fun_fact: "Tic-tac-toe dates back to ancient Egypt around 1300 BCE!",
  },
  {
    id: 47,
    title: "Cupcake Liner Flowers",
    emoji: "🧁",
    difficulty: "Easy",
    time: "20 mins",
    category: "Kids",
    materials: [
      "Cupcake Liners",
      "Pipe Cleaners",
      "Buttons",
      "Glue",
      "Scissors",
    ],
    steps: [
      "Stack 2-3 cupcake liners together.",
      "Poke pipe cleaner through center.",
      "Glue button on top to secure.",
      "Bend pipe cleaner into stem shape.",
      "Create multiple flowers for a bouquet.",
    ],
    fun_fact: "Cupcake liners were invented in the early 1900s!",
  },
  {
    id: 48,
    title: "Marble Maze Box",
    emoji: "🎲",
    difficulty: "Medium",
    time: "1 hour",
    category: "Kids",
    materials: ["Shoebox Lid", "Straws", "Glue Gun", "Marble", "Paint"],
    steps: [
      "Paint inside of shoebox lid.",
      "Cut straws into various lengths.",
      "Glue straws inside box to create maze paths.",
      "Add start and finish points.",
      "Test with marble and adjust as needed.",
    ],
    fun_fact: "The first glass marbles were made in Germany in the 1800s!",
  },
  {
    id: 49,
    title: "Fabric Scrap Bunting",
    emoji: "🎪",
    difficulty: "Easy",
    time: "45 mins",
    category: "Decor",
    materials: [
      "Fabric Scraps",
      "Bias Tape or Ribbon",
      "Scissors",
      "Sewing Machine or Glue",
    ],
    steps: [
      "Cut fabric into triangle shapes.",
      "Fold top edge over bias tape.",
      "Sew or glue triangles to tape evenly spaced.",
      "Continue until desired length.",
      "Hang across room or outside.",
    ],
    fun_fact: "Bunting was originally used for ship flags in the 18th century!",
  },
  {
    id: 50,
    title: "Matchbox Art",
    emoji: "🔥",
    difficulty: "Medium",
    time: "50 mins",
    category: "Gifts",
    materials: [
      "Empty Matchboxes",
      "Decorative Paper",
      "Tiny Objects",
      "Glue",
      "Paint",
    ],
    steps: [
      "Cover matchbox with decorative paper.",
      "Create tiny scene or message inside.",
      "Add miniature objects or drawings.",
      "Decorate outside with designs or words.",
      "Give as a tiny surprise gift.",
    ],
    fun_fact: "Matchbox collecting is called 'phillumeny'!",
  },
  {
    id: 51,
    title: "CD Sun Catcher",
    emoji: "💿",
    difficulty: "Easy",
    time: "25 mins",
    category: "Recycling",
    materials: ["Old CDs", "String", "Permanent Markers", "Beads", "Scissors"],
    steps: [
      "Decorate CD with permanent markers.",
      "Thread string through center hole.",
      "Add beads to string above and below CD.",
      "Create hanging loop at top.",
      "Hang in sunny window.",
    ],
    fun_fact:
      "CDs can reflect light into rainbow patterns due to their spiral grooves!",
  },
  {
    id: 52,
    title: "Paper Bag Puppets",
    emoji: "🎭",
    difficulty: "Easy",
    time: "20 mins",
    category: "Kids",
    materials: [
      "Paper Lunch Bags",
      "Construction Paper",
      "Glue",
      "Markers",
      "Googly Eyes",
    ],
    steps: [
      "Keep bag folded flat with bottom flap as face.",
      "Cut and glue paper features (ears, nose, hair).",
      "Add googly eyes and draw mouth.",
      "Decorate body of bag.",
      "Insert hand to animate puppet.",
    ],
    fun_fact: "Puppetry has been performed for over 3,000 years!",
  },
  {
    id: 53,
    title: "Embroidery Hoop Art",
    emoji: "🪡",
    difficulty: "Medium",
    time: "1.5 hours",
    category: "Decor",
    materials: [
      "Embroidery Hoop",
      "Fabric",
      "Embroidery Floss",
      "Needle",
      "Scissors",
      "Pattern",
    ],
    steps: [
      "Secure fabric tightly in embroidery hoop.",
      "Transfer pattern to fabric with pencil.",
      "Thread needle and begin stitching design.",
      "Use different stitches for variety.",
      "Trim excess fabric and hang on wall.",
    ],
    fun_fact: "Embroidery dates back to the Warring States period in China!",
  },
  {
    id: 54,
    title: "Cardboard Tube Binoculars",
    emoji: "🔭",
    difficulty: "Easy",
    time: "15 mins",
    category: "Kids",
    materials: [
      "2 Toilet Paper Rolls",
      "Paint",
      "Glue",
      "String",
      "Hole Punch",
    ],
    steps: [
      "Paint tubes and let dry.",
      "Glue tubes side by side.",
      "Punch holes on outer sides.",
      "Thread string through for neck strap.",
      "Decorate with stickers or markers.",
    ],
    fun_fact: "The first binoculars were invented in the 17th century!",
  },
  {
    id: 55,
    title: "Sponge Painting",
    emoji: "🧽",
    difficulty: "Easy",
    time: "25 mins",
    category: "Kids",
    materials: ["Sponges", "Paint", "Paper", "Scissors", "Plates"],
    steps: [
      "Cut sponges into different shapes.",
      "Pour paint onto plates.",
      "Dip sponge shapes into paint.",
      "Press onto paper to create designs.",
      "Layer different colors and shapes.",
    ],
    fun_fact: "Natural sea sponges have been used for over 2,000 years!",
  },
  {
    id: 56,
    title: "Ribbon Wands",
    emoji: "✨",
    difficulty: "Easy",
    time: "15 mins",
    category: "Kids",
    materials: [
      "Wooden Dowels",
      "Ribbons",
      "Jingle Bells",
      "Glue or Tape",
      "Scissors",
    ],
    steps: [
      "Cut ribbons into 3-foot lengths.",
      "Attach ribbons to one end of dowel.",
      "Add jingle bells to ribbon ends.",
      "Secure with glue or tape.",
      "Wave and dance with your wand.",
    ],
    fun_fact: "Rhythmic gymnastics has used ribbon wands since the 1960s!",
  },
  {
    id: 57,
    title: "Leaf Rubbing Art",
    emoji: "🍂",
    difficulty: "Easy",
    time: "20 mins",
    category: "Kids",
    materials: ["Fresh Leaves", "Paper", "Crayons", "Tape"],
    steps: [
      "Collect leaves with interesting vein patterns.",
      "Tape leaves under paper on table.",
      "Rub crayon sideways over paper.",
      "Leaf pattern will appear on paper.",
      "Create collage with multiple leaf rubbings.",
    ],
    fun_fact: "Leaf rubbing is called 'frottage' in art!",
  },
  {
    id: 58,
    title: "Painted Bookends",
    emoji: "📚",
    difficulty: "Medium",
    time: "1 hour",
    category: "Decor",
    materials: [
      "Plain Bookends or Bricks",
      "Acrylic Paint",
      "Paintbrush",
      "Sealer",
      "Felt Pads",
    ],
    steps: [
      "Clean bookend surfaces thoroughly.",
      "Apply primer if needed and let dry.",
      "Paint designs or patterns on bookends.",
      "Add multiple coats if necessary.",
      "Seal and attach felt pads to bottom.",
    ],
    fun_fact: "The first bookends were patented in 1877!",
  },
  {
    id: 59,
    title: "Paper Quilling Cards",
    emoji: "💌",
    difficulty: "Medium",
    time: "45 mins",
    category: "Gifts",
    materials: [
      "Quilling Paper Strips",
      "Quilling Tool",
      "Glue",
      "Cardstock",
      "Tweezers",
    ],
    steps: [
      "Roll paper strips tightly with quilling tool.",
      "Release to desired size and glue end.",
      "Pinch into various shapes (teardrop, square, etc.).",
      "Arrange shapes on card front in design.",
      "Glue pieces down carefully with tweezers.",
    ],
    fun_fact: "Paper quilling originated in Renaissance times among nuns!",
  },
  {
    id: 60,
    title: "Miniature Fairy Garden",
    emoji: "🧚",
    difficulty: "Medium",
    time: "1 hour",
    category: "Garden",
    materials: [
      "Shallow Container",
      "Small Plants",
      "Miniature Accessories",
      "Pebbles",
      "Soil",
    ],
    steps: [
      "Add drainage layer to container bottom.",
      "Fill with potting soil.",
      "Plant small succulents or moss.",
      "Add miniature furniture and fairy figures.",
      "Create paths with tiny pebbles.",
    ],
    fun_fact: "Fairy gardens became popular in the UK in the 1990s!",
  },
  {
    id: 61,
    title: "Tin Can Stilts",
    emoji: "🥫",
    difficulty: "Easy",
    time: "20 mins",
    category: "Kids",
    materials: ["2 Large Tin Cans", "Rope", "Can Opener", "Duct Tape"],
    steps: [
      "Remove top of cans and ensure no sharp edges.",
      "Punch two holes opposite each other near closed end.",
      "Thread rope through holes long enough to hold.",
      "Knot rope inside can to secure.",
      "Stand on cans holding ropes and walk.",
    ],
    fun_fact: "Stilt walking has been practiced for over 2,000 years!",
  },
  {
    id: 62,
    title: "Beeswax Wrap",
    emoji: "🐝",
    difficulty: "Easy",
    time: "30 mins",
    category: "Home",
    materials: [
      "Cotton Fabric",
      "Beeswax Pellets",
      "Parchment Paper",
      "Iron",
      "Scissors",
    ],
    steps: [
      "Cut fabric into desired sizes.",
      "Place fabric between parchment paper.",
      "Sprinkle beeswax pellets on fabric.",
      "Iron on low heat to melt wax into fabric.",
      "Let cool and use as reusable food wrap.",
    ],
    fun_fact: "Beeswax wraps can last up to a year with proper care!",
  },
  {
    id: 63,
    title: "Potato Stamp Printing",
    emoji: "🥔",
    difficulty: "Easy",
    time: "25 mins",
    category: "Kids",
    materials: ["Potatoes", "Knife", "Paint", "Paper", "Plate"],
    steps: [
      "Cut potato in half.",
      "Carve design into potato cut surface.",
      "Pour paint onto plate.",
      "Dip potato stamp into paint.",
      "Press onto paper to create prints.",
    ],
    fun_fact: "Potato printing is an ancient folk art technique!",
  },
  {
    id: 64,
    title: "Yarn Ball Bowl",
    emoji: "🧶",
    difficulty: "Medium",
    time: "Overnight drying",
    category: "Decor",
    materials: ["Yarn", "Balloon", "Fabric Stiffener", "Bowl", "Plastic Wrap"],
    steps: [
      "Inflate balloon and place in bowl.",
      "Soak yarn in fabric stiffener.",
      "Wrap yarn around balloon randomly.",
      "Let dry completely overnight.",
      "Pop balloon and remove from inside.",
    ],
    fun_fact: "Yarn balls can be wound by hand or with a yarn swift tool!",
  },
  {
    id: 65,
    title: "Clothespin Airplane",
    emoji: "✈️",
    difficulty: "Easy",
    time: "15 mins",
    category: "Kids",
    materials: ["Clothespin", "Popsicle Sticks", "Glue", "Paint", "Markers"],
    steps: [
      "Glue popsicle stick across clothespin for wings.",
      "Glue smaller stick at tail end.",
      "Paint and let dry.",
      "Add details with markers.",
      "Clip onto paper to display.",
    ],
    fun_fact: "The Wright brothers' first flight lasted only 12 seconds!",
  },
  {
    id: 66,
    title: "Nature Wreath",
    emoji: "🌾",
    difficulty: "Medium",
    time: "1 hour",
    category: "Decor",
    materials: [
      "Wire Wreath Form",
      "Natural Materials (twigs, leaves, flowers)",
      "Floral Wire",
      "Ribbon",
    ],
    steps: [
      "Gather natural materials from outdoors.",
      "Attach materials to wreath form with wire.",
      "Layer and overlap for full appearance.",
      "Add seasonal elements as desired.",
      "Hang with ribbon loop.",
    ],
    fun_fact: "Wreaths have symbolized victory and honor since ancient times!",
  },
  {
    id: 67,
    title: "Paint Chip Art",
    emoji: "🎨",
    difficulty: "Easy",
    time: "30 mins",
    category: "Decor",
    materials: ["Free Paint Chips", "Scissors", "Frame", "Glue", "Paper"],
    steps: [
      "Collect free paint chips from hardware store.",
      "Cut into shapes or strips.",
      "Arrange in gradient pattern or design.",
      "Glue onto backing paper.",
      "Frame and hang on wall.",
    ],
    fun_fact: "Paint chips are free samples to help with color decisions!",
  },
  {
    id: 68,
    title: "Felt Food Play Set",
    emoji: "🍕",
    difficulty: "Hard",
    time: "3 hours",
    category: "Kids",
    materials: [
      "Felt Sheets",
      "Stuffing",
      "Needle and Thread",
      "Velcro",
      "Scissors",
    ],
    steps: [
      "Cut felt into food shapes (pizza, fruits, etc.).",
      "Sew edges leaving opening for stuffing.",
      "Stuff lightly and sew closed.",
      "Add details with embroidery or more felt.",
      "Add velcro to 'cuttable' foods.",
    ],
    fun_fact: "Play food helps children develop imagination and life skills!",
  },
  {
    id: 69,
    title: "Chalkboard Labels",
    emoji: "🏷️",
    difficulty: "Easy",
    time: "30 mins + drying",
    category: "Home",
    materials: [
      "Chalkboard Paint",
      "Small Wood Shapes or Cardstock",
      "Paintbrush",
      "Adhesive",
      "Chalk",
    ],
    steps: [
      "Apply 2-3 coats of chalkboard paint to shapes.",
      "Let dry completely between coats.",
      "Attach adhesive backing.",
      "Stick to jars or containers.",
      "Label with chalk.",
    ],
    fun_fact: "Chalkboard paint was invented in the 1990s for home use!",
  },
  {
    id: 70,
    title: "Paper Snowflakes",
    emoji: "❄️",
    difficulty: "Easy",
    time: "15 mins",
    category: "Seasonal",
    materials: ["White Paper", "Scissors", "Pencil"],
    steps: [
      "Fold paper into triangle multiple times.",
      "Draw cutting pattern on folded paper.",
      "Cut along lines carefully.",
      "Unfold to reveal snowflake.",
      "Make many and hang from ceiling.",
    ],
    fun_fact: "No two snowflakes are exactly alike in nature!",
  },
  {
    id: 71,
    title: "Cork Board Map",
    emoji: "🗺️",
    difficulty: "Medium",
    time: "1.5 hours",
    category: "Decor",
    materials: ["Cork Board", "Printed Map", "Mod Podge", "Push Pins", "Frame"],
    steps: [
      "Cut map to fit cork board.",
      "Apply Mod Podge to cork surface.",
      "Smooth map onto cork board.",
      "Apply Mod Podge over top and let dry.",
      "Frame and use pins to mark travels.",
    ],
    fun_fact: "Cork comes from the bark of cork oak trees!",
  },
  {
    id: 72,
    title: "Perler Bead Coasters",
    emoji: "⬡",
    difficulty: "Easy",
    time: "30 mins",
    category: "Home",
    materials: [
      "Perler Beads",
      "Pegboard",
      "Ironing Paper",
      "Iron",
      "Cork Backing",
    ],
    steps: [
      "Arrange beads on pegboard in pattern.",
      "Place ironing paper over beads.",
      "Iron on medium heat to fuse beads.",
      "Let cool and remove from pegboard.",
      "Glue cork backing for protection.",
    ],
    fun_fact: "Perler beads were introduced in the 1960s in Sweden!",
  },
  {
    id: 73,
    title: "Decoupage Tray",
    emoji: "🍽️",
    difficulty: "Medium",
    time: "1 hour + drying",
    category: "Decor",
    materials: [
      "Wooden Tray",
      "Decorative Napkins or Paper",
      "Mod Podge",
      "Brush",
      "Sealer",
    ],
    steps: [
      "Sand tray lightly and wipe clean.",
      "Cut out designs from napkins.",
      "Apply Mod Podge to tray surface.",
      "Place designs and smooth out bubbles.",
      "Seal with multiple coats of Mod Podge.",
    ],
    fun_fact: "Decoupage comes from French word 'découper' meaning to cut out!",
  },
  {
    id: 74,
    title: "String Art",
    emoji: "🧵",
    difficulty: "Hard",
    time: "2 hours",
    category: "Decor",
    materials: [
      "Wood Board",
      "Nails",
      "Hammer",
      "Embroidery Thread",
      "Pattern",
    ],
    steps: [
      "Transfer pattern outline to wood.",
      "Hammer nails along pattern outline.",
      "Tie thread to starting nail.",
      "Wrap thread around nails following pattern.",
      "Tie off and trim excess thread.",
    ],
    fun_fact: "String art became popular in the 1970s home decor!",
  },
  {
    id: 75,
    title: "Fabric Bookmark Tassels",
    emoji: "📖",
    difficulty: "Easy",
    time: "20 mins",
    category: "Gifts",
    materials: ["Embroidery Floss", "Cardboard", "Scissors", "Beads"],
    steps: [
      "Wrap floss around cardboard 30-40 times.",
      "Tie tightly at top and cut bottom loops.",
      "Wrap thread around top section to create tassel head.",
      "Trim ends evenly.",
      "Add beads to hanging loop.",
    ],
    fun_fact: "Tassels have been used as decorations for thousands of years!",
  },
  {
    id: 76,
    title: "Milk Jug Watering Can",
    emoji: "💧",
    difficulty: "Easy",
    time: "10 mins",
    category: "Garden",
    materials: ["Empty Milk Jug", "Nail", "Hammer", "Paint (optional)"],
    steps: [
      "Clean milk jug thoroughly.",
      "Use nail and hammer to poke holes in cap.",
      "Decorate outside with paint if desired.",
      "Fill with water.",
      "Use for gentle plant watering.",
    ],
    fun_fact:
      "Milk jugs are made from HDPE plastic, which is highly recyclable!",
  },
  {
    id: 77,
    title: "Pallet Wood Sign",
    emoji: "🪵",
    difficulty: "Medium",
    time: "1.5 hours",
    category: "Decor",
    materials: [
      "Pallet Wood",
      "Sandpaper",
      "Paint or Stain",
      "Stencils",
      "Brush",
    ],
    steps: [
      "Sand pallet wood smooth.",
      "Apply base coat of paint or stain.",
      "Use stencils to add words or designs.",
      "Paint letters or design carefully.",
      "Seal with protective finish.",
    ],
    fun_fact: "Wooden pallets can be reused 10-15 times on average!",
  },
  {
    id: 78,
    title: "Puffy Paint Art",
    emoji: "🎨",
    difficulty: "Easy",
    time: "20 mins + drying",
    category: "Kids",
    materials: [
      "Shaving Cream",
      "White Glue",
      "Food Coloring",
      "Cardboard",
      "Ziplock Bag",
    ],
    steps: [
      "Mix equal parts shaving cream and glue.",
      "Add food coloring and mix.",
      "Put in ziplock bag and cut corner.",
      "Squeeze onto cardboard in designs.",
      "Let dry overnight to puff up.",
    ],
    fun_fact: "Puffy paint creates 3D textured artwork!",
  },
  {
    id: 79,
    title: "Wine Cork Trivet",
    emoji: "🍷",
    difficulty: "Medium",
    time: "45 mins",
    category: "Home",
    materials: ["Wine Corks (20-30)", "Hot Glue Gun", "Cardboard Base", "Felt"],
    steps: [
      "Cut cardboard circle or square for base.",
      "Glue felt to bottom of cardboard.",
      "Arrange corks in pattern on top.",
      "Hot glue corks to base and each other.",
      "Let dry completely before using.",
    ],
    fun_fact: "Cork is naturally heat resistant and water repellent!",
  },
  {
    id: 80,
    title: "Popsicle Stick Jewelry Box",
    emoji: "💎",
    difficulty: "Hard",
    time: "2 hours",
    category: "Gifts",
    materials: ["Popsicle Sticks", "Glue", "Paint", "Hinges", "Felt"],
    steps: [
      "Build box base from popsicle sticks.",
      "Create four walls by stacking sticks.",
      "Make separate lid slightly larger.",
      "Paint and decorate when dry.",
      "Attach tiny hinges to connect lid.",
    ],
    fun_fact: "The first jewelry boxes were created in ancient Egypt!",
  },
  {
    id: 81,
    title: "Balloon Stress Ball",
    emoji: "🎈",
    difficulty: "Easy",
    time: "15 mins",
    category: "Kids",
    materials: ["Balloons", "Flour or Rice", "Funnel", "Markers"],
    steps: [
      "Stretch balloon opening over funnel.",
      "Pour flour or rice through funnel.",
      "Fill balloon to desired size.",
      "Remove funnel and tie balloon.",
      "Draw face on balloon with markers.",
    ],
    fun_fact:
      "Squeezing stress balls can help reduce anxiety and improve focus!",
  },
  {
    id: 82,
    title: "Ice Tie-Dye",
    emoji: "🧊",
    difficulty: "Easy",
    time: "24 hours",
    category: "Kids",
    materials: [
      "White T-Shirt",
      "Ice Cubes",
      "Powdered Dye",
      "Cooling Rack",
      "Pan",
    ],
    steps: [
      "Place shirt on rack over pan.",
      "Cover shirt with ice cubes.",
      "Sprinkle powdered dye over ice.",
      "Let ice melt completely.",
      "Rinse, wash, and dry shirt.",
    ],
    fun_fact: "Ice dyeing creates unique watercolor-like patterns!",
  },
  {
    id: 83,
    title: "Scrapbook Page",
    emoji: "📔",
    difficulty: "Medium",
    time: "1 hour",
    category: "Gifts",
    materials: [
      "Scrapbook Paper",
      "Photos",
      "Stickers",
      "Glue",
      "Scissors",
      "Decorative Tape",
    ],
    steps: [
      "Choose theme and select photos.",
      "Arrange photos on page without gluing first.",
      "Add decorative paper borders.",
      "Glue photos and embellishments.",
      "Journal memories around photos.",
    ],
    fun_fact: "Modern scrapbooking began in the 1980s!",
  },
  {
    id: 84,
    title: "Hanging Succulent Planter",
    emoji: "🪴",
    difficulty: "Medium",
    time: "40 mins",
    category: "Garden",
    materials: [
      "Small Pot",
      "Macrame or String",
      "Succulents",
      "Soil",
      "S-Hook",
    ],
    steps: [
      "Create or purchase macrame hanger.",
      "Place pot in hanger.",
      "Fill with cactus soil mix.",
      "Plant succulent carefully.",
      "Hang with S-hook in bright indirect light.",
    ],
    fun_fact: "Succulents can survive without water for weeks!",
  },
  {
    id: 85,
    title: "Paper Fortune Teller",
    emoji: "🔮",
    difficulty: "Easy",
    time: "10 mins",
    category: "Kids",
    materials: ["Square Paper", "Markers or Crayons"],
    steps: [
      "Fold square paper corner to corner both ways.",
      "Fold corners to center point.",
      "Flip over and fold corners to center again.",
      "Fold in half and slide fingers in pockets.",
      "Write fortunes and numbers inside flaps.",
    ],
    fun_fact: "Fortune tellers are also called 'cootie catchers'!",
  },
  {
    id: 86,
    title: "Homemade Bath Bombs",
    emoji: "🛀",
    difficulty: "Medium",
    time: "30 mins + drying",
    category: "Gifts",
    materials: [
      "Baking Soda",
      "Citric Acid",
      "Essential Oils",
      "Food Coloring",
      "Molds",
      "Witch Hazel",
    ],
    steps: [
      "Mix 1 cup baking soda with 1/2 cup citric acid.",
      "Add drops of essential oil and coloring.",
      "Spray witch hazel while mixing until moldable.",
      "Pack tightly into molds.",
      "Let dry 24 hours before removing.",
    ],
    fun_fact:
      "Bath bombs fizz due to the chemical reaction between baking soda and citric acid!",
  },
  {
    id: 87,
    title: "Jeans Pocket Organizer",
    emoji: "👖",
    difficulty: "Medium",
    time: "45 mins",
    category: "Recycling",
    materials: ["Old Jeans", "Scissors", "Wooden Board", "Hammer", "Nails"],
    steps: [
      "Cut pockets from old jeans carefully.",
      "Arrange pockets on wooden board.",
      "Nail pockets to board through belt loops.",
      "Add hooks for hanging if desired.",
      "Hang on wall for storage.",
    ],
    fun_fact: "The first jeans pockets were added by Levi Strauss in 1873!",
  },
  {
    id: 88,
    title: "Glitter Slime",
    emoji: "✨",
    difficulty: "Easy",
    time: "20 mins",
    category: "Kids",
    materials: [
      "White Glue",
      "Liquid Starch",
      "Glitter",
      "Bowl",
      "Food Coloring",
    ],
    steps: [
      "Pour glue into bowl.",
      "Add food coloring and glitter.",
      "Slowly add liquid starch while stirring.",
      "Knead with hands until right consistency.",
      "Store in airtight container.",
    ],
    fun_fact: "Slime was first sold as a toy in 1976 by Mattel!",
  },
  {
    id: 89,
    title: "Wax Paper Window Decorations",
    emoji: "🪟",
    difficulty: "Easy",
    time: "30 mins",
    category: "Kids",
    materials: ["Wax Paper", "Crayon Shavings", "Iron", "String", "Scissors"],
    steps: [
      "Place crayon shavings between two sheets of wax paper.",
      "Cover with cloth and iron on low.",
      "Cut into shapes when cool.",
      "Punch hole and add string.",
      "Hang in window to catch light.",
    ],
    fun_fact: "Wax paper was invented in 1872 in France!",
  },
];

export default function DIYPage() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [checkedSteps, setCheckedSteps] = useState<number[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const craft = DIY_CRAFTS[currentIdx];

  const handleNext = () => {
    setIsTransitioning(true);

    setTimeout(() => {
      setCurrentIdx((prev) => {
        // If there's only 1 craft, just return it
        if (DIY_CRAFTS.length <= 1) return prev;

        let nextRandomIdx;
        // Loop to ensure the new random index isn't the same as the current one
        do {
          nextRandomIdx = Math.floor(Math.random() * DIY_CRAFTS.length);
        } while (nextRandomIdx === prev);

        return nextRandomIdx;
      });

      setCheckedSteps([]);
      setIsTransitioning(false);
    }, 400); // Matches your CSS transition duration
  };

  const toggleStep = (index: number) => {
    setCheckedSteps((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 overflow-x-hidden">
      {/* Dynamic Header */}
      <header className="bg-gradient-to-r from-rose-500 to-purple-600 pt-16 pb-32 px-4 text-center relative overflow-hidden">
        {/* Animated Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-rose-300 rounded-full blur-3xl animate-pulse delay-700" />
        </div>

        <div
          className={`transition-all duration-500 transform ${
            isTransitioning
              ? "scale-75 opacity-0 rotate-12"
              : "scale-100 opacity-100 rotate-0"
          }`}
        >
          <span className="text-6xl mb-4 block animate-bounce-slow drop-shadow-xl">
            {craft.emoji}
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-2 drop-shadow-md">
            {craft.title}
          </h1>
          <div className="flex justify-center gap-3">
            <span className="bg-white/20 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-white/30">
              {craft.time}
            </span>
            <span className="bg-white/20 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-white/30">
              {craft.difficulty}
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 -mt-20 relative z-10">
        <div
          className={`bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-8 md:p-12 border border-slate-100 transition-all duration-500 ${
            isTransitioning
              ? "opacity-0 translate-y-10 scale-95"
              : "opacity-100 translate-y-0 scale-100"
          }`}
        >
          {/* Materials Section with Staggered Fade */}
          <section className="mb-10 animate-fade-in-up">
            <h3 className="text-indigo-600 font-black uppercase tracking-widest text-[10px] mb-4">
              You&apos;ll Need:
            </h3>
            <div className="flex flex-wrap gap-2">
              {craft.materials.map((item, i) => (
                <span
                  key={i}
                  style={{ animationDelay: `${i * 100}ms` }}
                  className="bg-slate-50 text-slate-600 px-4 py-2 rounded-xl font-bold border border-slate-100 italic animate-pop-in"
                >
                  + {item}
                </span>
              ))}
            </div>
          </section>

          {/* Steps Section */}
          <section className="space-y-4 mb-10">
            <h3 className="text-indigo-600 font-black uppercase tracking-widest text-[10px] mb-4">
              How to make it:
            </h3>
            {craft.steps.map((step, index) => (
              <div
                key={index}
                onClick={() => toggleStep(index)}
                style={{ animationDelay: `${index * 150}ms` }}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex gap-4 items-start animate-fade-in-right ${
                  checkedSteps.includes(index)
                    ? "bg-emerald-50 border-emerald-300 opacity-60 scale-[0.98]"
                    : "bg-white border-slate-100 hover:border-purple-200 hover:shadow-md active:scale-95"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                    checkedSteps.includes(index)
                      ? "bg-emerald-500 text-white rotate-[360deg]"
                      : "bg-purple-100 text-purple-600"
                  }`}
                >
                  {checkedSteps.includes(index) ? "✓" : index + 1}
                </div>
                <p
                  className={`font-bold transition-all duration-300 ${
                    checkedSteps.includes(index)
                      ? "line-through text-slate-400"
                      : "text-slate-700"
                  }`}
                >
                  {step}
                </p>
              </div>
            ))}
          </section>

          {/* Fun Fact Footer */}
          <div className="bg-purple-50 rounded-2xl p-6 border-l-4 border-purple-500 animate-pulse-subtle">
            <p className="text-purple-800 font-bold italic leading-relaxed">
              <span className="text-xl mr-2">💡</span> Did you know?{" "}
              {craft.fun_fact}
            </p>
          </div>

          <button
            onClick={handleNext}
            disabled={isTransitioning}
            className="w-full mt-10 py-6 bg-slate-900 text-white rounded-[1.5rem] font-black text-xl hover:bg-purple-600 hover:shadow-2xl hover:shadow-purple-200 transition-all active:scale-95 flex items-center justify-center gap-3 group"
          >
            I&apos;m Bored, Next!
            <span className="group-hover:rotate-12 transition-transform">
              ✂️
            </span>
          </button>
        </div>
      </main>

      {/* CUSTOM CSS ANIMATIONS */}
      <style jsx>{`
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        @keyframes pop-in {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in-right {
          0% {
            opacity: 0;
            transform: translateX(-20px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes pulse-subtle {
          0%,
          100% {
            background-color: rgb(250 245 255);
          }
          50% {
            background-color: rgb(243 232 255);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .animate-pop-in {
          animation: pop-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)
            backwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out backwards;
        }
        .animate-fade-in-right {
          animation: fade-in-right 0.5s ease-out backwards;
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
