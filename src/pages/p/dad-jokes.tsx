/* eslint-disable react-hooks/purity */
import { useState } from "react";
import Head from "next/head";
import confetti from "canvas-confetti";
import DadJokeCard from "@/components/DadJokeCard";

const dadJokes = [
  {
    q: "Why don't scientists trust atoms?",
    a: "Because they make up everything!",
  },
  {
    q: "I'm reading a book about anti-gravity.",
    a: "It's impossible to put down!",
  },
  {
    q: "Why did the scarecrow win an award?",
    a: "He was outstanding in his field!",
  },
  { q: "What do you call a fake noodle?", a: "An impasta!" },
  { q: "How does a penguin build its house?", a: "Igloos it together!" },
  { q: "Why don't eggs tell jokes?", a: "They'd crack each other up!" },
  { q: "What do you call cheese that isn't yours?", a: "Nacho cheese!" },
  { q: "Why couldn't the bicycle stand up by itself?", a: "It was two tired!" },
  { q: "What did the ocean say to the beach?", a: "Nothing, it just waved!" },
  {
    q: "Why do chicken coops only have two doors?",
    a: "Because if they had four, they'd be chicken sedans!",
  },
  { q: "What's orange and sounds like a parrot?", a: "A carrot!" },
  {
    q: "Why did the math book look sad?",
    a: "Because it had too many problems!",
  },
  { q: "How do you organize a space party?", a: "You planet!" },
  { q: "What do you call a bear with no teeth?", a: "A gummy bear!" },
  {
    q: "Why don't skeletons fight each other?",
    a: "They don't have the guts!",
  },
  {
    q: "What did one wall say to the other wall?",
    a: "I'll meet you at the corner!",
  },
  { q: "Why did the coffee file a police report?", a: "It got mugged!" },
  { q: "What do you call a dog magician?", a: "A labracadabrador!" },
  { q: "How do you make a tissue dance?", a: "You put a little boogie in it!" },
  { q: "What do you call a pile of cats?", a: "A meowtain!" },
  {
    q: "Why did the golfer bring two pairs of pants?",
    a: "In case he got a hole in one!",
  },
  {
    q: "What did the grape do when it got stepped on?",
    a: "Nothing, it just let out a little wine!",
  },
  {
    q: "Why don't oysters donate to charity?",
    a: "Because they're shellfish!",
  },
  { q: "What do you call a sleeping bull?", a: "A bulldozer!" },
  { q: "How do you catch a squirrel?", a: "Climb a tree and act like a nut!" },
  {
    q: "Why did the tomato turn red?",
    a: "Because it saw the salad dressing!",
  },
  {
    q: "What do you call a factory that makes okay products?",
    a: "A satisfactory!",
  },
  { q: "Why did the cookie go to the doctor?", a: "Because it felt crumbly!" },
  {
    q: "What do you call a can opener that doesn't work?",
    a: "A can't opener!",
  },
  { q: "How does the moon cut his hair?", a: "Eclipse it!" },
  { q: "What do you call a fish with no eyes?", a: "Fsh!" },
  {
    q: "Why did the student eat his homework?",
    a: "Because the teacher said it was a piece of cake!",
  },
  { q: "What do you call a boomerang that doesn't come back?", a: "A stick!" },
  {
    q: "Why don't scientists trust stairs?",
    a: "They're always up to something!",
  },
  {
    q: "What did the janitor say when he jumped out of the closet?",
    a: "Supplies!",
  },
  { q: "How do you make holy water?", a: "You boil the heck out of it!" },
  {
    q: "What do you call a dinosaur that crashes his car?",
    a: "Tyrannosaurus Wrecks!",
  },
  { q: "Why did the picture go to jail?", a: "Because it was framed!" },
  { q: "What do you call a belt made of watches?", a: "A waist of time!" },
  { q: "How do you make a lemon drop?", a: "Just let it fall!" },
  { q: "What do you call a nervous javelin thrower?", a: "Shakespeare!" },
  {
    q: "Why don't seagulls fly over the bay?",
    a: "Because then they'd be bagels!",
  },
  { q: "What did the buffalo say when his son left?", a: "Bison!" },
  {
    q: "Why did the invisible man turn down the job offer?",
    a: "He couldn't see himself doing it!",
  },
  { q: "What do you call a pig that does karate?", a: "A pork chop!" },
  { q: "How do celebrities stay cool?", a: "They have many fans!" },
  {
    q: "What do you call a parade of rabbits hopping backwards?",
    a: "A receding hare-line!",
  },
  { q: "Why did the stadium get hot after the game?", a: "All the fans left!" },
  { q: "What do you call a lazy kangaroo?", a: "A pouch potato!" },
  { q: "How do you organize a fantastic space party?", a: "You planet well!" },
  {
    q: "What did the left eye say to the right eye?",
    a: "Between you and me, something smells!",
  },
  { q: "Why don't eggs like jokes?", a: "They might crack up!" },
  {
    q: "What do you call a snowman with a six-pack?",
    a: "An abdominal snowman!",
  },
  { q: "How does a scientist freshen her breath?", a: "With experi-mints!" },
  { q: "What do you call a fake stone in Ireland?", a: "A sham rock!" },
  { q: "Why did the bicycle fall over?", a: "Because it was two tired!" },
  { q: "What do you call a group of disorganized cats?", a: "A cat-astrophe!" },
  { q: "How do you make an octopus laugh?", a: "With ten-tickles!" },
  { q: "What did the big flower say to the little flower?", a: "Hi, bud!" },
  {
    q: "Why don't basketball players go on vacation?",
    a: "They'd get called for traveling!",
  },
  { q: "What do you call a singing laptop?", a: "A Dell!" },
  { q: "How do you stop a bull from charging?", a: "Cancel its credit card!" },
  { q: "What did zero say to eight?", a: "Nice belt!" },
  { q: "Why did the coach go to the bank?", a: "To get his quarterback!" },
  { q: "What do you call a sleeping dinosaur?", a: "A dino-snore!" },
  { q: "How do you fix a broken pizza?", a: "With tomato paste!" },
  { q: "What did the pirate say on his 80th birthday?", a: "Aye matey!" },
  { q: "Why don't ants get sick?", a: "They have little anty-bodies!" },
  { q: "What do you call a bear in the rain?", a: "A drizzly bear!" },
  { q: "How do you throw a space party?", a: "You planet!" },
  {
    q: "What did one hat say to the other?",
    a: "You stay here, I'll go on ahead!",
  },
  {
    q: "Why did the melon jump into the lake?",
    a: "It wanted to be a water-melon!",
  },
  { q: "What do you call a sad strawberry?", a: "A blueberry!" },
  { q: "How do you count cows?", a: "With a cowculator!" },
  {
    q: "What did the stamp say to the envelope?",
    a: "Stick with me and we'll go places!",
  },
  {
    q: "Why did the math teacher open a window company?",
    a: "She loved working with panes!",
  },
  {
    q: "What do you call a train carrying bubble gum?",
    a: "A chew-chew train!",
  },
  { q: "How do you make a bandstand?", a: "Take away their chairs!" },
  {
    q: "What did the policeman say to his belly button?",
    a: "You're under a vest!",
  },
  { q: "Why don't crabs give to charity?", a: "Because they're shellfish!" },
  { q: "What do you call a laughing motorcycle?", a: "A Yamahahaha!" },
  { q: "How do you organize a party in space?", a: "You planet!" },
  { q: "What did the nose say to the finger?", a: "Stop picking on me!" },
  { q: "Why did the banana go to the doctor?", a: "It wasn't peeling well!" },
  { q: "How do you make a water bed more bouncy?", a: "Add spring water!" },
  { q: "What did one plate say to the other plate?", a: "Dinner's on me!" },
  { q: "Why did the gym close down?", a: "It just didn't work out!" },
  { q: "What do you call a monkey in a minefield?", a: "A babooooom!" },
  { q: "How do you make a kleenex dance?", a: "Put a little boogie in it!" },
  {
    q: "What did the calculator say to the student?",
    a: "You can count on me!",
  },
  {
    q: "Why don't teddy bears ever eat dessert?",
    a: "They're always stuffed!",
  },
  { q: "What do you call a sleeping pizza?", a: "A piZZZa!" },
  { q: "How do trees access the internet?", a: "They log in!" },
  {
    q: "What did the drummer call his twin daughters?",
    a: "Anna one, Anna two!",
  },
  { q: "Why did the computer go to the doctor?", a: "It had a virus!" },
  { q: "What do you call a magician on a plane?", a: "A flying sorcerer!" },
  { q: "How do you make gold soup?", a: "Add 24 carrots!" },
  { q: "What did the triangle say to the circle?", a: "You're pointless!" },
  { q: "Why don't vampires go to barbecues?", a: "They don't like stakes!" },
  { q: "What do you call a shoe made of a banana?", a: "A slipper!" },
  { q: "How do you catch a unique rabbit?", a: "Unique up on it!" },
  { q: "What did the sushi say to the bee?", a: "Wassabee!" },
  { q: "Why did the orange stop?", a: "It ran out of juice!" },
  { q: "What do you call a religious insect?", a: "A mosque-ito!" },
  { q: "How do you make a strawberry shake?", a: "Take it to a scary movie!" },
  { q: "What did the mountain climber name his son?", a: "Cliff!" },
  {
    q: "Why don't eggs tell each other secrets?",
    a: "They might crack under pressure!",
  },
  { q: "What do you call a duck that gets good grades?", a: "A wise quacker!" },
  { q: "How do you make seven even?", a: "Take away the 's'!" },
  { q: "What did the paper say to the pencil?", a: "Write on!" },
  {
    q: "Why did the restaurant on the moon get bad reviews?",
    a: "No atmosphere!",
  },
  { q: "What do you call a grumpy cow?", a: "Moooooody!" },
  { q: "How do you make a pool table laugh?", a: "Tickle its balls!" },
  {
    q: "What did the fisherman say to the magician?",
    a: "Pick a cod, any cod!",
  },
  { q: "Why don't lobsters share?", a: "Because they're shellfish!" },
  { q: "What do you call a nun in a wheelchair?", a: "Virgin mobile!" },
  { q: "How do you weigh a millennial?", a: "In Instagrams!" },
  { q: "What did the green grape say to the purple grape?", a: "Breathe!" },
  {
    q: "Why did the scarecrow become a successful motivational speaker?",
    a: "He was outstanding in his field!",
  },
  {
    q: "What do you call a line of rabbits walking backwards?",
    a: "A receding hare-line!",
  },
  { q: "How do you make a hankie dance?", a: "Put a little boogie in it!" },
  { q: "What did the blanket say to the bed?", a: "I've got you covered!" },
  { q: "Why don't programmers like nature?", a: "Too many bugs!" },
  { q: "How do you get a tissue to dance?", a: "Put a little boogey in it!" },
  { q: "What did the beach say to the tide?", a: "Long time no sea!" },
  { q: "Why did the cookie cry?", a: "His mom was a wafer too long!" },
  { q: "What do you call a fish wearing a crown?", a: "King Neptune!" },
  { q: "How do you make a Swiss roll?", a: "Push him down a hill!" },
  {
    q: "What did the Atlantic Ocean say to the Pacific Ocean?",
    a: "Nothing, they just waved!",
  },
  { q: "Why don't mountains ever get cold?", a: "They wear snow caps!" },
  { q: "What do you call a bee that can't make up its mind?", a: "A maybe!" },
  { q: "How do you make an egg laugh?", a: "Tell it a yolk!" },
  {
    q: "What did the mayonnaise say when the refrigerator door was opened?",
    a: "Close the door, I'm dressing!",
  },
  { q: "Why did the Oreo go to the dentist?", a: "It lost its filling!" },
  { q: "What do you call a bear with no ears?", a: "B!" },
  { q: "How do you make a hot dog stand?", a: "Take away its chair!" },
  {
    q: "What did the rug say to the floor?",
    a: "Don't move, I've got you covered!",
  },
  { q: "Why don't cannibals eat clowns?", a: "They taste funny!" },
  { q: "What do you call an alligator in a vest?", a: "An investigator!" },
  {
    q: "How do you make a million dollars?",
    a: "Start with a billion dollars and launch an airline!",
  },
  {
    q: "What did the horse say after it tripped?",
    a: "Help, I've fallen and I can't giddyup!",
  },
  { q: "Why don't fish play basketball?", a: "They're afraid of the net!" },
  {
    q: "How do you make a fire with two sticks?",
    a: "Make sure one is a match!",
  },
  { q: "What did one volcano say to the other?", a: "I lava you!" },
  {
    q: "Why don't some couples go to the gym?",
    a: "Because some relationships don't work out!",
  },
  { q: "What do you call birds that stick together?", a: "Vel-crows!" },
  { q: "How do you make a milkshake?", a: "Give a cow a pogo stick!" },
  { q: "What did the alien say to the garden?", a: "Take me to your weeder!" },
  { q: "Why don't astronauts use bookmarks?", a: "They prefer space bars!" },
  { q: "How do you make antifreeze?", a: "Steal her blanket!" },
  {
    q: "What did the digital clock say to the grandfather clock?",
    a: "Look, no hands!",
  },
  {
    q: "Why don't elevators ever get tired?",
    a: "They're good at letting things go!",
  },
  { q: "What do you call a Mexican who lost his car?", a: "Carlos!" },
  { q: "How do you make a cat happy?", a: "Give it some purr-sonal space!" },
  {
    q: "What did the thermometer say to the graduated cylinder?",
    a: "You may have graduated, but I have more degrees!",
  },
  { q: "Why don't ghosts like rain?", a: "It dampens their spirits!" },
  { q: "How do you make a skeleton laugh?", a: "Tickle its funny bone!" },
  {
    q: "What did the cell phone say to the other cell phone?",
    a: "Can you hear me now?",
  },
  { q: "Why don't melons get married?", a: "Because they cantaloupe!" },
  { q: "What do you call a snowman party?", a: "A snowball!" },
  {
    q: "How do you make a unicorn float?",
    a: "Two scoops of ice cream, root beer, and a unicorn!",
  },
  {
    q: "What did the doctor say to the rocket ship?",
    a: "Time to get your booster shot!",
  },
  {
    q: "Why don't calendars ever go on vacation?",
    a: "Their days are numbered!",
  },
  { q: "What do you call a pile of kittens?", a: "A meow-ntain!" },
  {
    q: "What did the limestone say to the geologist?",
    a: "Don't take me for granite!",
  },
  { q: "Why don't eggs exercise?", a: "They might crack up!" },
  {
    q: "What do you call a potato that's always getting into trouble?",
    a: "A medi-tater!",
  },
  { q: "How do you make a lemon sad?", a: "Take away its zest for life!" },
  {
    q: "What did the big bucket say to the little bucket?",
    a: "Looking a little pail!",
  },
  { q: "Why don't bicycles ever win races?", a: "They're two tired!" },
  { q: "What do you call a happy penguin?", a: "A pen-grin!" },
  {
    q: "How do you make a small fortune in the stock market?",
    a: "Start with a large fortune!",
  },
  { q: "Why don't trees use computers?", a: "They prefer to log out!" },
  {
    q: "What do you call a dinosaur with an extensive vocabulary?",
    a: "A thesaurus!",
  },
  { q: "How do you make a plumber sad?", a: "Drain his enthusiasm!" },
  {
    q: "What did the left shoe say to the right shoe?",
    a: "I think we make a great pair!",
  },
  { q: "Why don't keys ever get lost?", a: "They always find their way home!" },
  { q: "What do you call a sleeping dinosaur?", a: "A stega-snore-us!" },
  {
    q: "How do you make a musician laugh?",
    a: "Tell them a note-worthy joke!",
  },
  {
    q: "What did the stoplight say to the car?",
    a: "Don't look, I'm changing!",
  },
  {
    q: "Why don't clouds ever go to college?",
    a: "They already have degrees!",
  },
  { q: "What do you call a cow with a twitch?", a: "Beef jerky!" },
  { q: "How do you make a pirate angry?", a: "Take away the 'p'!" },
  {
    q: "Why don't pencils ever go to parties?",
    a: "They're afraid they'll get too sharp!",
  },
  { q: "What do you call a deer with no eyes?", a: "No idea!" },
  { q: "How do you make a fruit punch?", a: "Give it boxing lessons!" },
  { q: "What did the baby corn say to the mama corn?", a: "Where's pop corn?" },
  { q: "Why don't books ever feel lonely?", a: "They always have a spine!" },
  { q: "What do you call a cow that plays guitar?", a: "A moo-sician!" },
  {
    q: "How do you make a sad banana happy?",
    a: "Give it a bunch of friends!",
  },
  { q: "What did the pen say to the paper?", a: "I dot my i's on you!" },
  { q: "Why don't scissors ever gossip?", a: "They always cut to the chase!" },
  { q: "What do you call a sheep with no legs?", a: "A cloud!" },
  {
    q: "How do you make a tissue box smile?",
    a: "Tell it a sneeze-worthy joke!",
  },
  {
    q: "Why don't planets ever get lonely?",
    a: "They're always in orbit with friends!",
  },
  { q: "What do you call a sleeping bag full of dads?", a: "A dad-nap!" },
  { q: "What did the plate say to the bowl?", a: "You're soup-er!" },
  { q: "Why don't clocks ever go to therapy?", a: "They just need to unwind!" },
  { q: "What do you call a bee that lives in America?", a: "A USB!" },
  { q: "How do you make a chicken laugh?", a: "Tell it an egg-cellent joke!" },
  {
    q: "Why don't magnets ever go to school?",
    a: "They find it too attractive!",
  },
  { q: "How do you make a balloon laugh?", a: "Tickle it until it pops!" },
  {
    q: "What did the hurricane say to the coconut tree?",
    a: "Hold on to your nuts, this is no ordinary blowjob!",
  },
  { q: "Why don't rivers ever go broke?", a: "They have two banks!" },
  { q: "How do you make a door stop working?", a: "Give it a raise!" },
  { q: "What did the roof say to the house?", a: "I've got you covered!" },
  {
    q: "Why don't batteries ever feel tired?",
    a: "They're always charged up!",
  },
  { q: "What do you call a nervous train?", a: "An express-anxiety!" },
  { q: "How do you make a window blind?", a: "Poke it in the eye!" },
  { q: "What did the salt say to the pepper?", a: "Season's greetings!" },
  { q: "Why don't mirrors ever lie?", a: "They only reflect the truth!" },
  { q: "What do you call a lazy doctor?", a: "Doctor Do-Little!" },
  { q: "How do you make a pool table laugh?", a: "Tickle its pockets!" },
  {
    q: "What did the dad spider say to his baby spider?",
    a: "You spend too much time on the web!",
  },
  {
    q: "Why don't pencils ever win arguments?",
    a: "They always have to erase their mistakes!",
  },
  {
    q: "What do you call a cow that's just given birth?",
    a: "De-calf-inated!",
  },
  { q: "How do you make a car sound sad?", a: "Take away its muffler!" },
  { q: "What did the light bulb say to the switch?", a: "You turn me on!" },
  {
    q: "Why don't shoes ever get tired?",
    a: "They're always getting a sole workout!",
  },
  { q: "What do you call a rabbit with fleas?", a: "Bugs Bunny!" },
  { q: "How do you make a vegetable laugh?", a: "Tell it a corny joke!" },
  {
    q: "What did the frog say when it got a flat tire?",
    a: "Nothing, it just jump-started its car!",
  },
  {
    q: "Why don't spoons ever get invited to parties?",
    a: "They're always stirring things up!",
  },
  { q: "What do you call a flying police officer?", a: "A heli-cop-ter!" },
  { q: "How do you make a napkin dance?", a: "Put a little dip in it!" },
  { q: "What did the sink say to the toilet?", a: "You look flushed!" },
  { q: "Why don't buttons ever get nervous?", a: "They always stay fastened!" },
  { q: "How do you make a mailbox laugh?", a: "Tell it a package of jokes!" },
  {
    q: "What did the traffic light say to the other traffic light?",
    a: "Don't look, I'm changing!",
  },
  {
    q: "Why don't printers ever get invited to parties?",
    a: "They always jam!",
  },
  { q: "What do you call a sleeping lawyer?", a: "A law-zzz-yer!" },
  { q: "How do you make a duck float?", a: "Add ice cream and root beer!" },
  { q: "What did the sock say to the foot?", a: "You're toe-tally awesome!" },
  { q: "Why don't markers ever feel sad?", a: "They're always feeling fine!" },
  { q: "How do you make a chair stand?", a: "Take away its seat!" },
  { q: "What did the shovel say to the dirt?", a: "I dig you!" },
  { q: "Why don't alarm clocks ever sleep in?", a: "They're always alert!" },
  {
    q: "What do you call a book club that's been stuck on one book for years?",
    a: "Church!",
  },
  { q: "How do you make a tennis ball stop bouncing?", a: "Let it retire!" },
  {
    q: "What did the broom say to the dustpan?",
    a: "Let's sweep the competition!",
  },
  { q: "Why don't stamps ever get lost?", a: "They're always getting mailed!" },
  { q: "What do you call a sleeping T-Rex?", a: "A dino-snore!" },
  { q: "How do you make a TV laugh?", a: "Tell it something funny!" },
  { q: "What did the paint say to the wall?", a: "I've got you covered!" },
  { q: "Why don't socks ever win races?", a: "They always get cold feet!" },
  { q: "What do you call a detective alligator?", a: "An investi-gator!" },
  { q: "How do you make a guitar happy?", a: "Stroke its strings!" },
  { q: "What did the fork say to the knife?", a: "You're so sharp!" },
  {
    q: "Why don't erasers ever remember anything?",
    a: "They always rub things out!",
  },
  { q: "What do you call a sleeping priest?", a: "A holy slumber!" },
  { q: "How do you make a drum laugh?", a: "Tell it a beat joke!" },
  { q: "What did the pillow say to the blanket?", a: "I've got you covered!" },
  {
    q: "Why don't staplers ever get separated?",
    a: "They're always attached!",
  },
  {
    q: "What do you call a cat that swallowed a ball of yarn?",
    a: "A ball of fur!",
  },
  { q: "How do you make a piano laugh?", a: "Tickle its ivories!" },
  { q: "What did the microwave say to the food?", a: "You make me hot!" },
  { q: "Why don't umbrellas ever feel down?", a: "They always look up!" },
  { q: "What do you call a broken can opener?", a: "A can't opener!" },
  {
    q: "How do you make a vacuum cleaner happy?",
    a: "Give it something to suck up to!",
  },
  { q: "What did the wallet say to the money?", a: "You're so valuable!" },
  {
    q: "Why don't rulers ever bend the truth?",
    a: "They're always straight with you!",
  },
  { q: "What do you call a sleeping computer?", a: "A screen-saver!" },
  { q: "How do you make a lamp bright?", a: "Tell it an illuminating joke!" },
  {
    q: "What did the hammer say to the nail?",
    a: "You're getting hammered tonight!",
  },
  {
    q: "Why don't doorknobs ever get dizzy?",
    a: "They're used to turning around!",
  },
  {
    q: "What do you call a nervous wreck?",
    a: "My first time parallel parking!",
  },
  { q: "How do you make a toaster laugh?", a: "Pop a joke in it!" },
  {
    q: "What did the comb say to the hair?",
    a: "I'm bristling with excitement!",
  },
  {
    q: "Why don't doorbells ever get tired?",
    a: "They're always getting rung up!",
  },
  { q: "What do you call a sleeping accountant?", a: "Out for the count!" },
  {
    q: "How do you make a washing machine happy?",
    a: "Give it a load of fun!",
  },
  { q: "What did the scissors say to the paper?", a: "Cut it out!" },
  {
    q: "Why don't glasses ever see eye to eye?",
    a: "They're too focused on different things!",
  },
  { q: "What do you call a nervous clock?", a: "A watch out!" },
  { q: "How do you make a calendar laugh?", a: "Tell it a date joke!" },
  { q: "What did the towel say to the bath?", a: "You're so refreshing!" },
  {
    q: "Why don't curtains ever hide their feelings?",
    a: "They're too transparent!",
  },
  { q: "What do you call a sleeping carpenter?", a: "Out for the count!" },
  { q: "How do you make a blender happy?", a: "Give it something to mix!" },
  { q: "What did the oven say to the cake?", a: "You're baking me crazy!" },
  {
    q: "Why don't cushions ever feel uncomfortable?",
    a: "They're always padding their answers!",
  },
  { q: "What do you call a nervous pilot?", a: "Plain scared!" },
  { q: "How do you make a fan cool?", a: "Tell it a chill joke!" },
  { q: "What did the broom say to the vacuum?", a: "You suck at this!" },
  {
    q: "Why don't bottles ever spill secrets?",
    a: "They keep things bottled up!",
  },
  { q: "What do you call a sleeping baker?", a: "Bread in bed!" },
  {
    q: "How do you make a scale happy?",
    a: "Give it something to weigh in on!",
  },
  { q: "What did the carpet say to the floor?", a: "I've got you covered!" },
  { q: "Why don't wheels ever stop rolling?", a: "They're always on a roll!" },
  { q: "What do you call a nervous dentist?", a: "Tooth-ache!" },
  { q: "How do you make a thermostat laugh?", a: "Tell it a hot joke!" },
  { q: "What did the door say to the wall?", a: "I'm feeling un-hinged!" },
  {
    q: "Why don't shelves ever feel empty?",
    a: "They're always supporting something!",
  },
  { q: "What do you call a sleeping plumber?", a: "Drain-ing his energy!" },
  { q: "How do you make a refrigerator cool?", a: "Tell it an ice joke!" },
  {
    q: "What did the mirror say to the person?",
    a: "I reflect your greatness!",
  },
  { q: "Why don't locks ever open up?", a: "They keep things secure!" },
  { q: "What do you call a nervous chef?", a: "Cook-oo!" },
  { q: "How do you make a light switch happy?", a: "Turn on the charm!" },
  { q: "What did the soap say to the water?", a: "You make me bubbly!" },
  {
    q: "Why don't hangers ever let things drop?",
    a: "They're always hanging in there!",
  },
  { q: "What do you call a sleeping firefighter?", a: "Dead tired!" },
  { q: "How do you make a telephone laugh?", a: "Ring its bell!" },
  {
    q: "What did the toothbrush say to the toothpaste?",
    a: "You complete me!",
  },
  {
    q: "Why don't cabinets ever reveal secrets?",
    a: "They keep things under wraps!",
  },
  { q: "What do you call a nervous teacher?", a: "Class-trophobic!" },
  { q: "How do you make a doormat happy?", a: "Step up your game!" },
  { q: "What did the fan say to the air?", a: "You blow me away!" },
  { q: "Why don't drawers ever feel pulled apart?", a: "They stick together!" },
  { q: "What do you call a sleeping mechanic?", a: "Exhausted!" },
  { q: "How do you make a radiator warm?", a: "Tell it a heated joke!" },
  { q: "What did the sponge say to the dish?", a: "You're spotless!" },
  { q: "Why don't hooks ever let go?", a: "They're always catching on!" },
  { q: "What do you call a nervous librarian?", a: "Booked solid!" },
  { q: "How do you make a kettle happy?", a: "Get it steamed up!" },
  { q: "What did the mop say to the bucket?", a: "We make a clean team!" },
  {
    q: "Why don't hinges ever crack under pressure?",
    a: "They're well-oiled!",
  },
  {
    q: "What do you call a sleeping electrician?",
    a: "Currently unavailable!",
  },
  { q: "How do you make a garden hose laugh?", a: "Turn on the water works!" },
  {
    q: "What did the dustpan say to the broom?",
    a: "You sweep me off my feet!",
  },
  {
    q: "Why don't screws ever come undone?",
    a: "They're always screwing around!",
  },
  { q: "What do you call a nervous surgeon?", a: "Cut up about it!" },
  { q: "How do you make a drain happy?", a: "Give it something to sink into!" },
  { q: "What did the ladder say to the roof?", a: "I'll get you up there!" },
  { q: "Why don't bolts ever feel loose?", a: "They're always tightening up!" },
  { q: "What do you call a sleeping gardener?", a: "Bed-ding plants!" },
  { q: "How do you make a wrench laugh?", a: "Give it a twist!" },
  { q: "What did the nail say to the screw?", a: "You're screwed!" },
  { q: "Why don't nuts ever crack jokes?", a: "They're too serious!" },
  { q: "What do you call a nervous architect?", a: "Building anxiety!" },
  { q: "How do you make a drill happy?", a: "Give it something to bore into!" },
  { q: "What did the saw say to the wood?", a: "Let me cut to the chase!" },
  { q: "Why don't pliers ever let go?", a: "They have a grip on reality!" },
  { q: "What do you call a sleeping contractor?", a: "Con-dozed!" },
  { q: "How do you make a level laugh?", a: "Make sure it's balanced!" },
  { q: "What did the tape measure say to the ruler?", a: "You rule!" },
  { q: "Why don't screwdrivers ever get twisted?", a: "They stay on point!" },
  { q: "What do you call a nervous engineer?", a: "Bridge-t about it!" },
  {
    q: "How do you make a chisel happy?",
    a: "Give it something to chip away at!",
  },
  { q: "What did the glue say to the paper?", a: "We stick together!" },
  { q: "Why don't clamps ever feel pressured?", a: "They can handle it!" },
  { q: "What do you call a sleeping woodworker?", a: "Saw-ing logs!" },
  { q: "How do you make a sander smooth?", a: "Rub it the right way!" },
  { q: "What did the paint brush say to the paint?", a: "You color my world!" },
  { q: "Why don't vises ever let go?", a: "They have a tight grip!" },
  { q: "What do you call a nervous mason?", a: "Brick-ing up!" },
  { q: "How do you make a plane happy?", a: "Keep it on the level!" },
  {
    q: "What did the sandpaper say to the wood?",
    a: "I'm rough around the edges!",
  },
  { q: "Why don't files ever get dull?", a: "They stay sharp!" },
  { q: "What do you call a sleeping welder?", a: "Burning out!" },
  { q: "How do you make a square laugh?", a: "Make it right!" },
  { q: "What did the trowel say to the cement?", a: "Let's stick together!" },
  { q: "Why don't mallets ever get mad?", a: "They just pound it out!" },
  { q: "What do you call a nervous plumber?", a: "Pipe-ing down!" },
  { q: "How do you make a spirit level happy?", a: "Keep it balanced!" },
  { q: "What did the wire say to the pliers?", a: "You've got me twisted!" },
  { q: "Why don't chisels ever back down?", a: "They stay sharp!" },
  {
    q: "What do you call a sleeping roofer?",
    a: "Shingle and ready to mingle!",
  },
  {
    q: "How do you make a compass laugh?",
    a: "Point it in the right direction!",
  },
  { q: "What did the putty say to the knife?", a: "Spread the word!" },
  { q: "Why don't awls ever get bored?", a: "They're always making points!" },
  { q: "What do you call a nervous electrician?", a: "Wired!" },
  { q: "How do you make a chalk line happy?", a: "Keep it straight!" },
  { q: "What did the rasp say to the file?", a: "You're so refined!" },
  { q: "Why don't tin snips ever cut corners?", a: "They go straight!" },
  { q: "What do you call a sleeping painter?", a: "Out like a light!" },
  { q: "How do you make a crowbar laugh?", a: "Pry open its funny bone!" },
  {
    q: "What did the cement mixer say to the concrete?",
    a: "Let's get mixed up!",
  },
  { q: "Why don't pipe wrenches ever slip up?", a: "They have a good grip!" },
  { q: "What do you call a nervous carpenter?", a: "Board stiff!" },
  {
    q: "How do you make a utility knife happy?",
    a: "Give it something to cut into!",
  },
  { q: "What did the caulk gun say to the caulk?", a: "Squeeze the day!" },
  { q: "Why don't Allen wrenches ever get lost?", a: "They stick together!" },
  { q: "What do you call a sleeping HVAC tech?", a: "Air-ing it out!" },
  { q: "How do you make a socket wrench laugh?", a: "Turn its sockets!" },
  { q: "What did the tile cutter say to the tile?", a: "Let's break up!" },
  { q: "Why don't adjustable wrenches ever argue?", a: "They're flexible!" },
  { q: "What do you call a nervous landscaper?", a: "Grass-ing out!" },
  { q: "How do you make a pry bar happy?", a: "Give it leverage!" },
  {
    q: "What did the concrete saw say to the concrete?",
    a: "Let's cut to the chase!",
  },
  {
    q: "Why don't wire strippers ever feel naked?",
    a: "They're comfortable in their own skin!",
  },
  { q: "What do you call a sleeping mason?", a: "Laying low!" },
  { q: "How do you make a voltmeter laugh?", a: "Give it a charge!" },
  { q: "What did the PVC pipe say to the cutter?", a: "You cut me deep!" },
  {
    q: "Why don't torque wrenches ever overdo it?",
    a: "They know their limits!",
  },
  { q: "What do you call a nervous glazier?", a: "Pane-ful!" },
  {
    q: "How do you make a multimeter happy?",
    a: "Give it something to measure!",
  },
  { q: "What did the drywall saw say to the drywall?", a: "Let's hang out!" },
  { q: "Why don't conduit benders ever break?", a: "They're flexible!" },
  { q: "What do you call a sleeping tiler?", a: "Grouting about!" },
  { q: "How do you make a fish tape laugh?", a: "Reel it in!" },
  { q: "What did the circular saw say to the wood?", a: "I'm board!" },
  { q: "Why don't cable cutters ever hesitate?", a: "They make clean cuts!" },
  { q: "What do you call a nervous flooring installer?", a: "Laid back!" },
];

export default function DadJokesPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const currentJoke = dadJokes[currentIndex];

  const handleNextJoke = () => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: [
        "#fbbf24",
        "#f472b6",
        "#a78bfa",
        "#34d399",
        "#60a5fa",
        "#fb923c",
      ],
    });

    const nextIndex = Math.floor(Math.random() * dadJokes.length);
    setCurrentIndex(nextIndex);
    setShowAnswer(false);
  };

  return (
    <>
      <Head>
        <title>
          Dad Jokes Unlimited 😂 | {dadJokes.length} Classic Groaners
        </title>
        <meta
          name="description"
          content="The complete collection of over 300 legendary dad jokes. Click 'What?' to reveal the punchline and prepare for maximum eye-rolling!"
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-100 to-rose-100 relative overflow-hidden">
        {/* Floating dad-themed background */}
        <div className="absolute inset-0 pointer-events-none opacity-25">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute text-5xl animate-float-slow"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.4}s`,
                animationDuration: `${20 + Math.random() * 25}s`,
              }}
            >
              {i % 4 === 0
                ? "👨"
                : i % 4 === 1
                ? "😆"
                : i % 4 === 2
                ? "😂"
                : "🤦"}
            </div>
          ))}
        </div>

        {/* Main Card */}
        <section className="relative flex items-center justify-center min-h-screen py-20 px-6">
          <div className="max-w-5xl w-full">
            <DadJokeCard currentJoke={currentJoke} onNext={handleNextJoke} />

            {/* Joke Counter */}
            <div className="text-center mt-16 text-gray-700">
              <p className="text-2xl font-semibold">
                Joke #{currentIndex + 1} of{" "}
                <span className="text-amber-600 font-black text-3xl">
                  {dadJokes.length}
                </span>{" "}
                ultimate dad jokes
              </p>
              <p className="mt-4 text-lg italic">
                Warning: Excessive groaning may occur
              </p>
            </div>
          </div>
        </section>

        <style jsx>{`
          @keyframes float-slow {
            0% {
              transform: translateY(100vh) rotate(0deg);
              opacity: 0;
            }
            10% {
              opacity: 0.9;
            }
            90% {
              opacity: 0.9;
            }
            100% {
              transform: translateY(-100px) rotate(360deg);
              opacity: 0;
            }
          }
          .animate-float-slow {
            animation: float-slow linear infinite;
          }
          @keyframes fade-in {
            from {
              opacity: 0;
              transform: translateY(40px) scale(0.9);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          .animate-fade-in {
            animation: fade-in 0.9s ease-out;
          }
        `}</style>
      </div>
    </>
  );
}
