/* eslint-disable @typescript-eslint/no-explicit-any */
// Big JSON of major world history events (1900–2025)
const historyEvents = [
  // Ancient & Classical Era
  { year: -753, month: 4, day: 21, event: "Founding of Rome 🏛️" },
  { year: -509, month: 1, day: 1, event: "Roman Republic Established 🏛️" },
  { year: -323, month: 6, day: 11, event: "Death of Alexander the Great ⚔️" },
  { year: -221, month: 1, day: 1, event: "Qin Shi Huang Unifies China 🇨🇳" },
  {
    year: -44,
    month: 3,
    day: 15,
    event: "Assassination of Julius Caesar 🗡️",
  },
  {
    year: 79,
    month: 8,
    day: 24,
    event: "Mount Vesuvius Destroys Pompeii 🌋",
  },
  { year: 476, month: 9, day: 4, event: "Fall of Western Roman Empire 🏛️⬇️" },

  // Medieval Period
  { year: 622, month: 9, day: 24, event: "Muhammad's Hijra to Medina ☪️" },
  {
    year: 800,
    month: 12,
    day: 25,
    event: "Charlemagne Crowned Holy Roman Emperor 👑",
  },
  {
    year: 1066,
    month: 10,
    day: 14,
    event: "Battle of Hastings - Norman Conquest ⚔️🇬🇧",
  },
  { year: 1096, month: 11, day: 27, event: "First Crusade Begins ⚔️✝️" },
  { year: 1215, month: 6, day: 15, event: "Magna Carta Signed 📜" },
  {
    year: 1271,
    month: 1,
    day: 1,
    event: "Marco Polo Begins Journey to China 🧭",
  },
  { year: 1337, month: 1, day: 1, event: "Hundred Years' War Begins ⚔️🇫🇷🇬🇧" },
  {
    year: 1347,
    month: 10,
    day: 1,
    event: "Black Death Arrives in Europe 💀🦠",
  },
  { year: 1453, month: 5, day: 29, event: "Fall of Constantinople 🏰" },
  { year: 1455, month: 1, day: 1, event: "Gutenberg Prints First Bible 📖" },

  // Age of Discovery
  {
    year: 1492,
    month: 10,
    day: 12,
    event: "Columbus Reaches the Americas 🌍⛵",
  },
  {
    year: 1497,
    month: 5,
    day: 20,
    event: "Vasco da Gama Reaches India 🇮🇳⛵",
  },
  {
    year: 1517,
    month: 10,
    day: 31,
    event: "Martin Luther's 95 Theses - Protestant Reformation ✝️",
  },
  {
    year: 1519,
    month: 9,
    day: 20,
    event: "Magellan Begins First Circumnavigation 🌍⛵",
  },
  {
    year: 1521,
    month: 8,
    day: 13,
    event: "Fall of Tenochtitlan - Aztec Empire Ends 🇲🇽",
  },
  {
    year: 1533,
    month: 1,
    day: 1,
    event: "Spanish Conquest of Inca Empire 🇵🇪",
  },

  // 17th & 18th Century
  {
    year: 1603,
    month: 3,
    day: 24,
    event: "Tokugawa Shogunate Begins in Japan 🇯🇵",
  },
  { year: 1618, month: 5, day: 23, event: "Thirty Years' War Begins ⚔️" },
  {
    year: 1620,
    month: 11,
    day: 21,
    event: "Mayflower Pilgrims Land at Plymouth Rock 🇺🇸⛵",
  },
  { year: 1642, month: 8, day: 22, event: "English Civil War Begins ⚔️👑" },
  {
    year: 1649,
    month: 1,
    day: 30,
    event: "Execution of King Charles I 🗡️👑",
  },
  {
    year: 1687,
    month: 7,
    day: 5,
    event: "Newton Publishes Principia Mathematica 📐",
  },
  {
    year: 1707,
    month: 5,
    day: 1,
    event: "Act of Union - United Kingdom Formed 🇬🇧",
  },
  { year: 1756, month: 1, day: 1, event: "Seven Years' War Begins ⚔️🌍" },
  {
    year: 1769,
    month: 1,
    day: 1,
    event: "James Watt Patents Steam Engine 🚂",
  },
  { year: 1773, month: 12, day: 16, event: "Boston Tea Party ☕🇺🇸" },
  {
    year: 1776,
    month: 7,
    day: 4,
    event: "US Declaration of Independence 🇺🇸📜",
  },
  {
    year: 1783,
    month: 9,
    day: 3,
    event: "Treaty of Paris - US Independence Recognized 🇺🇸",
  },
  {
    year: 1789,
    month: 7,
    day: 14,
    event: "Storming of the Bastille - French Revolution 🇫🇷⚔️",
  },
  {
    year: 1793,
    month: 1,
    day: 21,
    event: "Execution of King Louis XVI 🗡️👑",
  },

  // 19th Century
  { year: 1804, month: 12, day: 2, event: "Napoleon Crowned Emperor 👑🇫🇷" },
  {
    year: 1815,
    month: 6,
    day: 18,
    event: "Battle of Waterloo - Napoleon Defeated ⚔️",
  },
  { year: 1821, month: 5, day: 5, event: "Napoleon Dies in Exile ⚰️" },
  { year: 1822, month: 9, day: 7, event: "Brazil Declares Independence 🇧🇷" },
  {
    year: 1825,
    month: 9,
    day: 27,
    event: "First Passenger Railway Opens 🚂",
  },
  {
    year: 1837,
    month: 6,
    day: 20,
    event: "Queen Victoria Begins Reign 👑🇬🇧",
  },
  {
    year: 1848,
    month: 2,
    day: 24,
    event: "Communist Manifesto Published 📕",
  },
  { year: 1853, month: 7, day: 8, event: "Commodore Perry Opens Japan ⛵🇯🇵" },
  {
    year: 1857,
    month: 5,
    day: 10,
    event: "Indian Rebellion Against British Rule 🇮🇳",
  },
  {
    year: 1859,
    month: 11,
    day: 24,
    event: "Darwin Publishes Origin of Species 🦍📖",
  },
  { year: 1861, month: 4, day: 12, event: "American Civil War Begins ⚔️🇺🇸" },
  { year: 1863, month: 1, day: 1, event: "Emancipation Proclamation 🇺🇸⛓️" },
  { year: 1865, month: 4, day: 14, event: "Abraham Lincoln Assassinated 🇺🇸" },
  { year: 1867, month: 7, day: 1, event: "Canada Becomes Dominion 🇨🇦" },
  { year: 1869, month: 11, day: 17, event: "Suez Canal Opens 🚢" },
  { year: 1871, month: 1, day: 18, event: "German Empire Proclaimed 🇩🇪" },
  {
    year: 1876,
    month: 3,
    day: 10,
    event: "First Telephone Call by Alexander Graham Bell ☎️",
  },
  { year: 1879, month: 10, day: 21, event: "Edison Invents Light Bulb 💡" },
  { year: 1886, month: 10, day: 28, event: "Statue of Liberty Dedicated 🗽" },
  { year: 1889, month: 3, day: 31, event: "Eiffel Tower Completed 🗼" },
  {
    year: 1895,
    month: 12,
    day: 28,
    event: "First Public Film Screening by Lumière Brothers 🎬",
  },
  {
    year: 1896,
    month: 4,
    day: 6,
    event: "First Modern Olympic Games in Athens 🏅",
  },
  {
    year: 1898,
    month: 4,
    day: 25,
    event: "Spanish-American War Begins 🇪🇸🇺🇸",
  },

  // Early 20th Century
  {
    year: 1901,
    month: 1,
    day: 22,
    event: "Queen Victoria Dies - End of Era 👑⚰️",
  },
  {
    year: 1903,
    month: 12,
    day: 17,
    event: "Wright Brothers' First Powered Flight ✈️",
  },
  {
    year: 1905,
    month: 1,
    day: 22,
    event: "Bloody Sunday in Russia - 1905 Revolution 🇷🇺",
  },
  {
    year: 1905,
    month: 6,
    day: 30,
    event: "Einstein Publishes Theory of Relativity 🧑‍🔬",
  },
  {
    year: 1911,
    month: 10,
    day: 10,
    event: "Chinese Revolution - End of Qing Dynasty 🇨🇳",
  },
  { year: 1912, month: 4, day: 15, event: "Sinking of the Titanic 🚢💔" },
  {
    year: 1914,
    month: 6,
    day: 28,
    event: "Assassination of Archduke Franz Ferdinand 🔫",
  },
  { year: 1914, month: 7, day: 28, event: "Start of World War I 🌍💥" },
  { year: 1917, month: 4, day: 6, event: "United States Enters WWI 🇺🇸" },
  { year: 1917, month: 11, day: 7, event: "Russian October Revolution ☭" },
  {
    year: 1918,
    month: 11,
    day: 11,
    event: "World War I Ends - Armistice Day 🕊️",
  },
  { year: 1919, month: 6, day: 28, event: "Treaty of Versailles Signed 📜" },
  {
    year: 1920,
    month: 8,
    day: 26,
    event: "19th Amendment - Women's Suffrage in US 🗳️♀️",
  },
  {
    year: 1922,
    month: 10,
    day: 28,
    event: "Mussolini's March on Rome - Fascism Rises 🇮🇹",
  },
  {
    year: 1922,
    month: 12,
    day: 30,
    event: "Soviet Union Officially Formed 🚩",
  },
  {
    year: 1923,
    month: 11,
    day: 8,
    event: "Beer Hall Putsch - Hitler's Failed Coup 🇩🇪",
  },
  {
    year: 1927,
    month: 5,
    day: 21,
    event: "Lindbergh Completes First Solo Transatlantic Flight ✈️🌊",
  },
  { year: 1928, month: 9, day: 28, event: "Fleming Discovers Penicillin 💊" },
  {
    year: 1929,
    month: 10,
    day: 29,
    event: "Wall Street Crash - Great Depression Begins 📉💔",
  },
  {
    year: 1933,
    month: 1,
    day: 30,
    event: "Hitler Becomes Chancellor of Germany 🇩🇪",
  },
  { year: 1936, month: 7, day: 17, event: "Spanish Civil War Begins ⚔️🇪🇸" },
  { year: 1937, month: 12, day: 13, event: "Rape of Nanking 💔🇨🇳" },
  {
    year: 1939,
    month: 9,
    day: 1,
    event: "Germany Invades Poland - Start of WWII ⚡🇵🇱",
  },
  {
    year: 1940,
    month: 5,
    day: 10,
    event: "Churchill Becomes British Prime Minister 🇬🇧",
  },
  {
    year: 1940,
    month: 6,
    day: 22,
    event: "France Surrenders to Germany 🇫🇷🏳️",
  },
  { year: 1940, month: 7, day: 10, event: "Battle of Britain Begins ✈️🇬🇧" },
  {
    year: 1941,
    month: 6,
    day: 22,
    event: "Germany Invades Soviet Union - Operation Barbarossa ❄️🇩🇪🇷🇺",
  },
  { year: 1941, month: 12, day: 7, event: "Pearl Harbor Attack 🇯🇵💣🇺🇸" },
  {
    year: 1942,
    month: 6,
    day: 4,
    event: "Battle of Midway - Turning Point in Pacific ⚓",
  },
  {
    year: 1942,
    month: 8,
    day: 23,
    event: "Battle of Stalingrad Begins ❄️⚔️",
  },
  { year: 1943, month: 2, day: 2, event: "German Defeat at Stalingrad 🇷🇺⚔️" },
  {
    year: 1944,
    month: 6,
    day: 6,
    event: "D-Day - Allied Invasion of Normandy 🌊⚔️",
  },
  { year: 1945, month: 4, day: 30, event: "Hitler Commits Suicide 🇩🇪⚰️" },
  {
    year: 1945,
    month: 5,
    day: 8,
    event: "Victory in Europe Day - VE Day 🇪🇺🎉",
  },
  {
    year: 1945,
    month: 8,
    day: 6,
    event: "Atomic Bomb Dropped on Hiroshima 💣☢️",
  },
  {
    year: 1945,
    month: 8,
    day: 9,
    event: "Atomic Bomb Dropped on Nagasaki 💣☢️",
  },
  {
    year: 1945,
    month: 8,
    day: 15,
    event: "Japan Surrenders - End of WWII 🕊️🇯🇵",
  },
  { year: 1945, month: 10, day: 24, event: "United Nations Founded 🇺🇳" },

  // Post-War & Cold War Era
  {
    year: 1947,
    month: 8,
    day: 15,
    event: "India Gains Independence from Britain 🇮🇳",
  },
  { year: 1947, month: 8, day: 14, event: "Pakistan Gains Independence 🇵🇰" },
  { year: 1948, month: 5, day: 14, event: "State of Israel Declared 🇮🇱" },
  {
    year: 1948,
    month: 6,
    day: 24,
    event: "Berlin Blockade Begins - Cold War Intensifies ✈️🧱",
  },
  { year: 1949, month: 4, day: 4, event: "NATO Founded 🛡️" },
  {
    year: 1949,
    month: 8,
    day: 29,
    event: "Soviet Union Tests First Atomic Bomb ☢️🇷🇺",
  },
  {
    year: 1949,
    month: 10,
    day: 1,
    event: "People's Republic of China Founded 🇨🇳☭",
  },
  { year: 1950, month: 6, day: 25, event: "Korean War Begins ⚔️🇰🇷🇰🇵" },
  { year: 1953, month: 3, day: 5, event: "Stalin Dies 🇷🇺⚰️" },
  { year: 1953, month: 7, day: 27, event: "Korean War Armistice 🇰🇷🇰🇵" },
  {
    year: 1954,
    month: 5,
    day: 7,
    event: "Fall of Dien Bien Phu - French Defeat in Vietnam 🇻🇳",
  },
  {
    year: 1954,
    month: 5,
    day: 17,
    event: "Brown v. Board of Education - School Desegregation 🏫🇺🇸",
  },
  {
    year: 1955,
    month: 12,
    day: 1,
    event: "Rosa Parks' Bus Boycott Begins 🚌✊",
  },
  {
    year: 1956,
    month: 10,
    day: 23,
    event: "Hungarian Revolution Against Soviet Rule 🇭🇺",
  },
  {
    year: 1957,
    month: 3,
    day: 25,
    event: "Treaty of Rome - European Economic Community 🇪🇺",
  },
  {
    year: 1957,
    month: 10,
    day: 4,
    event: "Sputnik Launched - Space Age Begins 🛰️🚀",
  },
  {
    year: 1959,
    month: 1,
    day: 1,
    event: "Cuban Revolution - Castro Takes Power 🇨🇺☭",
  },
  {
    year: 1960,
    month: 2,
    day: 1,
    event: "Greensboro Sit-ins - Civil Rights Movement 🪑✊",
  },
  {
    year: 1961,
    month: 4,
    day: 12,
    event: "Yuri Gagarin - First Human in Space 🚀👨‍🚀",
  },
  { year: 1961, month: 4, day: 17, event: "Bay of Pigs Invasion 🇨🇺🇺🇸" },
  {
    year: 1961,
    month: 8,
    day: 13,
    event: "Berlin Wall Construction Begins 🧱🇩🇪",
  },
  {
    year: 1962,
    month: 10,
    day: 16,
    event: "Cuban Missile Crisis Begins ☢️🇨🇺🇺🇸",
  },
  {
    year: 1963,
    month: 6,
    day: 16,
    event: "Valentina Tereshkova - First Woman in Space 🚀👩‍🚀",
  },
  {
    year: 1963,
    month: 8,
    day: 28,
    event: "Martin Luther King Jr.'s 'I Have a Dream' Speech ✊🎤",
  },
  { year: 1963, month: 11, day: 22, event: "JFK Assassination 🇺🇸💔" },
  {
    year: 1964,
    month: 8,
    day: 2,
    event: "Gulf of Tonkin Incident - Vietnam War Escalates 🇻🇳",
  },
  {
    year: 1965,
    month: 3,
    day: 7,
    event: "Bloody Sunday - Selma to Montgomery March ✊",
  },
  {
    year: 1966,
    month: 5,
    day: 16,
    event: "Cultural Revolution Begins in China 🇨🇳",
  },
  { year: 1967, month: 6, day: 5, event: "Six-Day War 🇮🇱⚔️" },
  { year: 1968, month: 1, day: 30, event: "Tet Offensive in Vietnam 🇻🇳⚔️" },
  {
    year: 1968,
    month: 4,
    day: 4,
    event: "Martin Luther King Jr. Assassinated ✊💔",
  },
  {
    year: 1968,
    month: 6,
    day: 5,
    event: "Robert F. Kennedy Assassinated 🇺🇸💔",
  },
  {
    year: 1968,
    month: 8,
    day: 20,
    event: "Soviet Invasion of Czechoslovakia 🇨🇿🇷🇺",
  },
  { year: 1969, month: 7, day: 20, event: "Apollo 11 Moon Landing 👨‍🚀🌕🚀" },
  { year: 1969, month: 8, day: 15, event: "Woodstock Music Festival 🎸🎶" },

  // 1970s
  { year: 1971, month: 12, day: 16, event: "Bangladesh Independence 🇧🇩" },
  {
    year: 1972,
    month: 2,
    day: 21,
    event: "Nixon Visits China - Diplomatic Breakthrough 🇺🇸🇨🇳",
  },
  { year: 1972, month: 9, day: 5, event: "Munich Olympics Massacre 🏅💔" },
  {
    year: 1973,
    month: 1,
    day: 27,
    event: "Paris Peace Accords - Vietnam War Ends 🇻🇳",
  },
  { year: 1973, month: 10, day: 6, event: "Yom Kippur War Begins 🇮🇱⚔️" },
  { year: 1973, month: 10, day: 17, event: "OPEC Oil Embargo Begins ⛽📉" },
  {
    year: 1974,
    month: 8,
    day: 8,
    event: "Nixon Resigns - Watergate Scandal 🇺🇸",
  },
  {
    year: 1975,
    month: 4,
    day: 30,
    event: "Fall of Saigon - End of Vietnam War 🇻🇳🚁",
  },
  { year: 1976, month: 9, day: 9, event: "Mao Zedong Dies 🇨🇳⚰️" },
  { year: 1978, month: 11, day: 18, event: "Jonestown Mass Suicide 💔" },
  {
    year: 1979,
    month: 1,
    day: 16,
    event: "Iranian Revolution - Shah Flees 🇮🇷",
  },
  {
    year: 1979,
    month: 2,
    day: 11,
    event: "Ayatollah Khomeini Returns to Iran ☪️🇮🇷",
  },
  {
    year: 1979,
    month: 3,
    day: 28,
    event: "Three Mile Island Nuclear Accident ☢️🇺🇸",
  },
  { year: 1979, month: 11, day: 4, event: "Iran Hostage Crisis Begins 🇮🇷🇺🇸" },
  {
    year: 1979,
    month: 12,
    day: 25,
    event: "Soviet Invasion of Afghanistan 🇦🇫🇷🇺",
  },

  // 1980s
  {
    year: 1980,
    month: 8,
    day: 14,
    event: "Gdańsk Shipyard Strike - Solidarity Movement Begins 🇵🇱✊",
  },
  { year: 1981, month: 3, day: 30, event: "Reagan Assassination Attempt 🇺🇸" },
  { year: 1981, month: 10, day: 6, event: "Anwar Sadat Assassinated 🇪🇬" },
  { year: 1982, month: 4, day: 2, event: "Falklands War Begins 🇦🇷🇬🇧" },
  {
    year: 1983,
    month: 9,
    day: 1,
    event: "Korean Air Flight 007 Shot Down 🇰🇷✈️",
  },
  { year: 1984, month: 10, day: 31, event: "Indira Gandhi Assassinated 🇮🇳" },
  { year: 1984, month: 12, day: 3, event: "Bhopal Gas Disaster 🇮🇳💨" },
  {
    year: 1985,
    month: 3,
    day: 11,
    event: "Gorbachev Becomes Soviet Leader 🇷🇺",
  },
  {
    year: 1986,
    month: 1,
    day: 28,
    event: "Space Shuttle Challenger Disaster 🚀💔",
  },
  { year: 1986, month: 4, day: 26, event: "Chernobyl Nuclear Disaster ☢️🇺🇦" },
  {
    year: 1987,
    month: 10,
    day: 19,
    event: "Black Monday Stock Market Crash 📉",
  },
  { year: 1987, month: 12, day: 8, event: "First Intifada Begins 🇵🇸🇮🇱" },
  { year: 1989, month: 6, day: 4, event: "Tiananmen Square Massacre 🇨🇳💔" },
  { year: 1989, month: 11, day: 9, event: "Fall of the Berlin Wall 🧱⬇️🎉" },
  {
    year: 1989,
    month: 12,
    day: 25,
    event: "Execution of Ceaușescu in Romania 🇷🇴",
  },

  // 1990s
  {
    year: 1990,
    month: 2,
    day: 11,
    event: "Nelson Mandela Released from Prison 🇿🇦✊",
  },
  { year: 1990, month: 8, day: 2, event: "Iraq Invades Kuwait 🇮🇶🇰🇼" },
  { year: 1990, month: 10, day: 3, event: "German Reunification 🇩🇪🎉" },
  {
    year: 1991,
    month: 1,
    day: 17,
    event: "Gulf War Begins - Operation Desert Storm ⚔️🇮🇶",
  },
  {
    year: 1991,
    month: 6,
    day: 25,
    event: "Croatia and Slovenia Declare Independence 🇭🇷🇸🇮",
  },
  { year: 1991, month: 8, day: 19, event: "Soviet Coup Attempt Fails 🇷🇺" },
  {
    year: 1991,
    month: 12,
    day: 26,
    event: "Soviet Union Officially Dissolves 🇷🇺➡️15 countries",
  },
  { year: 1992, month: 4, day: 29, event: "Los Angeles Riots 🇺🇸🔥" },
  { year: 1992, month: 8, day: 1, event: "Bosnian War Begins 🇧🇦⚔️" },
  {
    year: 1993,
    month: 2,
    day: 26,
    event: "First World Trade Center Bombing 🇺🇸💣",
  },
  { year: 1994, month: 4, day: 6, event: "Rwandan Genocide Begins 🇷🇼💔" },
  {
    year: 1994,
    month: 4,
    day: 27,
    event:
      "Nelson Mandela Elected - First Democratic South African Election 🗳️🇿🇦",
  },
  { year: 1994, month: 12, day: 11, event: "First Chechen War Begins 🇷🇺" },
  {
    year: 1995,
    month: 3,
    day: 20,
    event: "Tokyo Subway Sarin Gas Attack 🇯🇵☣️",
  },
  { year: 1995, month: 4, day: 19, event: "Oklahoma City Bombing 🇺🇸💣" },
  { year: 1995, month: 7, day: 11, event: "Srebrenica Massacre 🇧🇦💔" },
  { year: 1995, month: 11, day: 4, event: "Yitzhak Rabin Assassinated 🇮🇱" },
  { year: 1997, month: 7, day: 1, event: "Hong Kong Handover to China 🇭🇰🇨🇳" },
  {
    year: 1997,
    month: 8,
    day: 31,
    event: "Princess Diana Dies in Car Crash 💔🇬🇧",
  },
  {
    year: 1998,
    month: 8,
    day: 7,
    event: "US Embassy Bombings in Kenya & Tanzania 🇰🇪🇹🇿💣",
  },
  {
    year: 1999,
    month: 3,
    day: 24,
    event: "NATO Bombing of Yugoslavia Begins 🇷🇸✈️",
  },
  {
    year: 1999,
    month: 12,
    day: 31,
    event: "Boris Yeltsin Resigns - Putin Takes Over 🇷🇺",
  },

  // 2000s
  { year: 2000, month: 9, day: 28, event: "Second Intifada Begins 🇵🇸🇮🇱" },
  { year: 2001, month: 9, day: 11, event: "9/11 Terrorist Attacks 🗽✈️💔" },
  { year: 2001, month: 10, day: 7, event: "War in Afghanistan Begins 🇦🇫⚔️" },
  { year: 2002, month: 10, day: 12, event: "Bali Bombings 🇮🇩💣" },
  {
    year: 2003,
    month: 2,
    day: 1,
    event: "Space Shuttle Columbia Disaster 🚀💔",
  },
  {
    year: 2003,
    month: 3,
    day: 20,
    event: "Iraq War Begins - US Invasion 🇮🇶⚔️",
  },
  { year: 2004, month: 3, day: 11, event: "Madrid Train Bombings 🇪🇸💣" },
  { year: 2004, month: 12, day: 26, event: "Indian Ocean Tsunami 🌊💔" },
  { year: 2005, month: 7, day: 7, event: "London Bombings - 7/7 🇬🇧💣" },
  {
    year: 2005,
    month: 8,
    day: 29,
    event: "Hurricane Katrina Hits New Orleans 🌀🇺🇸",
  },
  { year: 2006, month: 7, day: 12, event: "Israel-Lebanon War Begins 🇮🇱🇱🇧" },
  { year: 2006, month: 12, day: 30, event: "Saddam Hussein Executed 🇮🇶" },
  {
    year: 2007,
    month: 6,
    day: 29,
    event: "iPhone Released - Smartphone Revolution 📱",
  },
  { year: 2007, month: 12, day: 27, event: "Benazir Bhutto Assassinated 🇵🇰" },
  { year: 2008, month: 8, day: 8, event: "Russia-Georgia War 🇬🇪🇷🇺" },
  {
    year: 2008,
    month: 9,
    day: 15,
    event: "Lehman Brothers Collapse - Financial Crisis Peaks 💰📉",
  },
  {
    year: 2008,
    month: 11,
    day: 4,
    event: "Barack Obama Elected First Black US President 🇺🇸",
  },
  {
    year: 2009,
    month: 1,
    day: 20,
    event: "Barack Obama Inaugurated as US President 🇺🇸",
  },

  // 2010s
  {
    year: 2010,
    month: 1,
    day: 12,
    event: "Haiti Earthquake - Over 200,000 Dead 🇭🇹💔",
  },
  {
    year: 2010,
    month: 4,
    day: 20,
    event: "Deepwater Horizon Oil Spill 🛢️🌊",
  },
  {
    year: 2010,
    month: 12,
    day: 17,
    event: "Arab Spring Begins in Tunisia 🇹🇳✊",
  },
  { year: 2011, month: 1, day: 25, event: "Egyptian Revolution Begins 🇪🇬✊" },
  { year: 2011, month: 2, day: 11, event: "Mubarak Resigns in Egypt 🇪🇬" },
  {
    year: 2011,
    month: 3,
    day: 11,
    event: "Fukushima Nuclear Disaster 🌊☢️🇯🇵",
  },
  { year: 2011, month: 3, day: 15, event: "Syrian Civil War Begins 🇸🇾⚔️" },
  {
    year: 2011,
    month: 5,
    day: 2,
    event: "Osama bin Laden Killed in Pakistan 🇵🇰",
  },
  {
    year: 2011,
    month: 10,
    day: 20,
    event: "Muammar Gaddafi Killed in Libya 🇱🇾",
  },
  {
    year: 2012,
    month: 10,
    day: 29,
    event: "Hurricane Sandy Hits US East Coast 🌀🇺🇸",
  },
  {
    year: 2012,
    month: 12,
    day: 14,
    event: "Sandy Hook School Shooting 🇺🇸💔",
  },
  { year: 2013, month: 2, day: 11, event: "Pope Benedict XVI Resigns 🇻🇦" },
  { year: 2013, month: 3, day: 13, event: "Pope Francis Elected 🇻🇦" },
  { year: 2013, month: 6, day: 6, event: "Edward Snowden NSA Leaks 🇺🇸💻" },
  { year: 2014, month: 3, day: 18, event: "Russia Annexes Crimea 🇷🇺🇺🇦" },
  {
    year: 2014,
    month: 6,
    day: 29,
    event: "ISIS Declares Caliphate in Iraq & Syria ☪️⚔️",
  },
  {
    year: 2014,
    month: 7,
    day: 17,
    event: "Malaysia Airlines MH17 Shot Down Over Ukraine ✈️💔",
  },
  {
    year: 2014,
    month: 8,
    day: 9,
    event: "Ferguson Protests Begin - Black Lives Matter Movement 🇺🇸✊",
  },
  { year: 2014, month: 12, day: 16, event: "Peshawar School Massacre 🇵🇰💔" },
  {
    year: 2015,
    month: 1,
    day: 7,
    event: "Charlie Hebdo Attack in Paris 🇫🇷💔",
  },
  {
    year: 2015,
    month: 4,
    day: 25,
    event: "Nepal Earthquake - Nearly 9,000 Dead 🇳🇵💔",
  },
  { year: 2015, month: 7, day: 14, event: "Iran Nuclear Deal Signed 🇮🇷☢️" },
  {
    year: 2015,
    month: 9,
    day: 30,
    event: "Russia Begins Military Intervention in Syria 🇷🇺🇸🇾",
  },
  {
    year: 2015,
    month: 11,
    day: 13,
    event: "Paris Terrorist Attacks - Bataclan Theatre 🇫🇷💔",
  },
  { year: 2016, month: 6, day: 12, event: "Orlando Nightclub Shooting 🇺🇸💔" },
  {
    year: 2016,
    month: 6,
    day: 23,
    event: "Brexit Referendum - UK Votes to Leave EU 🇬🇧🇪🇺",
  },
  { year: 2016, month: 7, day: 15, event: "Turkey Coup Attempt Fails 🇹🇷" },
  {
    year: 2016,
    month: 11,
    day: 8,
    event: "Donald Trump Elected US President 🇺🇸",
  },
  { year: 2016, month: 11, day: 26, event: "Fidel Castro Dies 🇨🇺⚰️" },
  {
    year: 2017,
    month: 1,
    day: 20,
    event: "Donald Trump Inaugurated as US President 🇺🇸",
  },
  { year: 2017, month: 10, day: 1, event: "Las Vegas Mass Shooting 🇺🇸💔" },
  { year: 2017, month: 10, day: 5, event: "#MeToo Movement Goes Viral 📱✊" },
  {
    year: 2017,
    month: 10,
    day: 27,
    event: "Catalonia Declares Independence from Spain 🇪🇸",
  },
  {
    year: 2017,
    month: 12,
    day: 6,
    event: "US Recognizes Jerusalem as Israel's Capital 🇮🇱🇺🇸",
  },
  { year: 2018, month: 2, day: 14, event: "Parkland School Shooting 🇺🇸💔" },
  {
    year: 2018,
    month: 3,
    day: 4,
    event: "Sergei Skripal Poisoning in UK 🇬🇧🇷🇺",
  },
  {
    year: 2018,
    month: 6,
    day: 12,
    event: "Trump-Kim Summit in Singapore 🇺🇸🇰🇵",
  },
  { year: 2018, month: 10, day: 2, event: "Jamal Khashoggi Murdered 🇸🇦💔" },
  {
    year: 2019,
    month: 3,
    day: 15,
    event: "Christchurch Mosque Shootings 🇳🇿💔",
  },
  { year: 2019, month: 4, day: 15, event: "Notre-Dame Cathedral Fire 🇫🇷🔥" },
  { year: 2019, month: 6, day: 9, event: "Hong Kong Protests Begin 🇭🇰✊" },
  { year: 2019, month: 8, day: 3, event: "El Paso Walmart Shooting 🇺🇸💔" },
  {
    year: 2019,
    month: 9,
    day: 23,
    event: "Greta Thunberg UN Climate Speech 🌍",
  },
  {
    year: 2019,
    month: 12,
    day: 31,
    event: "First COVID-19 Cases Reported in Wuhan 🇨🇳🦠",
  },

  // 2020s
  {
    year: 2020,
    month: 1,
    day: 3,
    event: "US Kills Iranian General Qasem Soleimani 🇺🇸🇮🇷",
  },
  {
    year: 2020,
    month: 1,
    day: 11,
    event: "WHO Declares COVID-19 Global Pandemic 🦠🌍",
  },
  {
    year: 2020,
    month: 3,
    day: 11,
    event: "WHO Declares COVID-19 Pandemic 🦠",
  },
  {
    year: 2020,
    month: 5,
    day: 25,
    event: "George Floyd Killed - Global BLM Protests ✊🇺🇸",
  },
  { year: 2020, month: 8, day: 4, event: "Beirut Explosion 🇱🇧💥" },
  {
    year: 2020,
    month: 11,
    day: 3,
    event: "US Presidential Election - Biden vs Trump 🇺🇸🗳️",
  },
  {
    year: 2020,
    month: 12,
    day: 8,
    event: "First COVID-19 Vaccines Administered 💉",
  },
  { year: 2021, month: 1, day: 6, event: "US Capitol Riot 🇺🇸🏛️" },
  {
    year: 2021,
    month: 1,
    day: 20,
    event: "Joe Biden Inaugurated as US President 🇺🇸",
  },
  { year: 2021, month: 2, day: 1, event: "Myanmar Military Coup 🇲🇲" },
  {
    year: 2021,
    month: 3,
    day: 23,
    event: "Suez Canal Blocked by Ever Given Ship 🚢",
  },
  {
    year: 2021,
    month: 4,
    day: 20,
    event: "Derek Chauvin Found Guilty of George Floyd Murder ⚖️",
  },
  {
    year: 2021,
    month: 8,
    day: 15,
    event: "Taliban Takes Control of Afghanistan 🇦🇫",
  },
  { year: 2021, month: 9, day: 8, event: "Queen Elizabeth II Dies 👑🇬🇧⚰️" },
  {
    year: 2021,
    month: 11,
    day: 5,
    event: "Travis Scott Astroworld Festival Tragedy 🇺🇸💔",
  },
  {
    year: 2022,
    month: 2,
    day: 4,
    event: "Beijing Winter Olympics Begin 🇨🇳⛷️",
  },
  {
    year: 2022,
    month: 2,
    day: 24,
    event: "Russia Invades Ukraine - Full-Scale War Begins 🇺🇦🇷🇺💥",
  },
  { year: 2022, month: 5, day: 24, event: "Uvalde School Shooting 🇺🇸💔" },
  {
    year: 2022,
    month: 6,
    day: 24,
    event: "Roe v. Wade Overturned by US Supreme Court 🇺🇸⚖️",
  },
  {
    year: 2022,
    month: 9,
    day: 8,
    event: "Queen Elizabeth II Dies at Age 96 👑🇬🇧⚰️",
  },
  {
    year: 2022,
    month: 9,
    day: 16,
    event: "Mahsa Amini Dies - Iran Protests Begin 🇮🇷✊",
  },
  {
    year: 2022,
    month: 11,
    day: 30,
    event: "ChatGPT Released by OpenAI 🤖💬",
  },
  {
    year: 2022,
    month: 12,
    day: 18,
    event: "Argentina Wins FIFA World Cup 🇦🇷⚽🏆",
  },
  { year: 2023, month: 1, day: 6, event: "Brazil Congress Riots 🇧🇷" },
  {
    year: 2023,
    month: 2,
    day: 6,
    event: "Turkey-Syria Earthquake - Over 50,000 Dead 🇹🇷🇸🇾💔",
  },
  {
    year: 2023,
    month: 6,
    day: 18,
    event: "Titan Submersible Implosion 🌊💔",
  },
  {
    year: 2023,
    month: 6,
    day: 23,
    event: "Wagner Group Mutiny in Russia 🇷🇺",
  },
  {
    year: 2023,
    month: 8,
    day: 8,
    event: "Maui Wildfires - Lahaina Destroyed 🇺🇸🔥",
  },
  {
    year: 2023,
    month: 10,
    day: 7,
    event: "Hamas Attacks Israel - Gaza War Begins 🇮🇱🇵🇸⚔️",
  },
  {
    year: 2023,
    month: 11,
    day: 17,
    event: "Sam Altman Fired then Reinstated at OpenAI 🤖",
  },
  {
    year: 2024,
    month: 1,
    day: 1,
    event: "Japan Earthquake - Noto Peninsula 🇯🇵💔",
  },
  { year: 2024, month: 3, day: 22, event: "Moscow Concert Hall Attack 🇷🇺💔" },
  {
    year: 2024,
    month: 4,
    day: 3,
    event: "Israel Strikes Iranian Consulate in Syria 🇮🇱🇮🇷",
  },
  {
    year: 2024,
    month: 4,
    day: 13,
    event: "Iran Attacks Israel with Drones and Missiles 🇮🇷🇮🇱",
  },
  {
    year: 2024,
    month: 5,
    day: 19,
    event: "Iranian President Raisi Dies in Helicopter Crash 🇮🇷⚰️",
  },
  {
    year: 2024,
    month: 7,
    day: 13,
    event: "Trump Assassination Attempt at Rally 🇺🇸",
  },
  {
    year: 2024,
    month: 7,
    day: 21,
    event: "Biden Withdraws from 2024 Presidential Race 🇺🇸",
  },
  {
    year: 2024,
    month: 7,
    day: 26,
    event: "Paris Summer Olympics Begin 🇫🇷🏅",
  },
  { year: 2024, month: 9, day: 17, event: "Lebanon Pager Explosions 🇱🇧💥" },
  {
    year: 2024,
    month: 10,
    day: 1,
    event: "Iran Launches Missile Barrage at Israel 🇮🇷🇮🇱",
  },
  {
    year: 2024,
    month: 10,
    day: 7,
    event: "One Year Anniversary of Gaza War 🇮🇱🇵🇸",
  },
  {
    year: 2024,
    month: 11,
    day: 5,
    event: "Donald Trump Elected 47th US President 🇺🇸",
  },
  {
    year: 2024,
    month: 12,
    day: 8,
    event: "Assad Regime Falls in Syria - Rebels Take Damascus 🇸🇾",
  },
  { year: 2025, month: 1, day: 1, event: "New Year 2025 🎆" },
  {
    year: 2025,
    month: 1,
    day: 20,
    event: "Donald Trump Inaugurated as 47th US President 🇺🇸",
  },
];

/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { format, differenceInYears, isAfter } from "date-fns";
import Link from "next/link";

interface PageProps {
  seo: {
    title: string;
    description: string;
    keywords: string;
    ogTitle: string;
    ogDescription: string;
    canonical: string;
  };
  jsonLd: object;
}

export default function HistoryOnYourBirthday({ seo, jsonLd }: PageProps) {
  const [birthdate, setBirthdate] = useState("");
  const [events, setEvents] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const calculateEvents = () => {
    if (!birthdate) return;
    const birthDate = new Date(birthdate);
    if (isNaN(birthDate.getTime())) return;

    const filtered = historyEvents
      .filter((ev) => {
        const eventDate = new Date(ev.year, ev.month - 1, ev.day);
        return isAfter(eventDate, birthDate);
      })
      .map((ev) => {
        const eventDate = new Date(ev.year, ev.month - 1, ev.day);
        return {
          ...ev,
          ageAtEvent: differenceInYears(eventDate, birthDate),
          formattedDate: format(eventDate, "MMMM d, yyyy"),
        };
      })
      .slice(0, 30);

    setEvents(filtered);
    setShowResults(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateEvents();
  };

  useEffect(() => {
    if (showResults && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showResults]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-purple-200 pb-20">
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={seo.canonical} />
        <meta property="og:title" content={seo.ogTitle} />
        <meta property="og:description" content={seo.ogDescription} />
        <meta
          property="og:image"
          content="https://www.imborednow.com/banner.png"
        />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={seo.ogTitle} />
        <meta property="twitter:description" content={seo.ogDescription} />

        <link rel="canonical" href={seo.canonical} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      {/* --- 1. HERO SECTION --- */}
      <section className="relative pt-20 pb-24 px-4 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,_var(--tw-gradient-stops))] from-purple-600/40 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 backdrop-blur-xl rounded-full text-purple-300 text-[9px] font-black uppercase tracking-[0.3em] mb-8 border border-white/10">
            📜 The History Lab
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.85]">
            WORLD HISTORY <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">
              SINCE YOU.
            </span>
          </h1>

          <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative flex flex-col sm:flex-row gap-2 bg-slate-900 p-2 rounded-2xl border border-white/10">
              <input
                type="date"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                required
                className="flex-grow bg-transparent px-4 py-3 text-white focus:outline-none font-bold"
              />
              <button
                type="submit"
                className="bg-white text-slate-950 px-6 py-3 rounded-xl font-black text-sm hover:bg-yellow-400 transition-all active:scale-95"
              >
                UNFOLD 📜
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* --- 2. TIMELINE RESULTS --- */}
      {showResults && (
        <main
          ref={resultsRef}
          className="max-w-4xl mx-auto px-4 mt-16 animate-in fade-in slide-in-from-bottom-8 duration-700"
        >
          <div className="mb-12 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              Your Historical Journey
            </h2>
            <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mt-2">
              Events that shaped the world while you grew up
            </p>
          </div>

          <div className="relative border-l-2 border-slate-100 ml-4 md:ml-8 pl-8 space-y-8">
            {events.map((ev, i) => (
              <div key={i} className="group relative">
                <div className="absolute -left-[41px] top-6 w-4 h-4 rounded-full bg-white border-4 border-slate-900 z-10 group-hover:scale-125 transition-transform" />
                <div className="bg-white rounded-[2rem] border border-slate-100 shadow-lg hover:shadow-xl transition-all duration-500 p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest text-white bg-slate-900">
                        {ev.year}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {ev.formattedDate}
                      </span>
                    </div>
                    <h3 className="text-lg md:text-xl font-black text-slate-800 leading-tight">
                      {ev.event}
                    </h3>
                  </div>
                  <div className="flex-shrink-0 flex items-center gap-3 bg-slate-50 px-4 py-3 rounded-2xl border border-slate-100">
                    <span className="text-2xl">🎂</span>
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black text-slate-400 uppercase leading-none">
                        Your Age
                      </span>
                      <span className="text-lg font-black text-slate-900 leading-none">
                        {ev.ageAtEvent === 0
                          ? "Birth Year"
                          : `${ev.ageAtEvent} yrs`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <button
              onClick={() => setShowResults(false)}
              className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 transition-colors"
            >
              ✕ Reset Timeline
            </button>
          </div>
        </main>
      )}

      {/* --- 3. 1500+ WORD SEO CONTENT SECTION --- */}
      <article className="max-w-5xl mx-auto px-6 mt-24 text-slate-700 leading-relaxed">
        <h2 className="text-4xl font-black text-slate-900 mb-8 tracking-tighter">
          Uncovering Your Personal History: A History Timeline Since Birth
        </h2>

        <p className="mb-6 text-lg font-medium">
          Have you ever wondered about the{" "}
          <strong>historical events since I was born</strong>? We often view
          history as something that happened long ago, in dusty textbooks or
          black-and-white documentaries. But the truth is, your life is a{" "}
          <strong>personal historical timeline</strong> that runs parallel to
          the most defining moments of the modern era.
        </p>

        <h3 className="text-2xl font-black text-slate-900 mt-12 mb-4 uppercase tracking-tight">
          What Happened Since My Birth?
        </h3>
        <p className="mb-6">
          Our <strong>life timeline generator</strong> is designed to answer the
          fundamental question: <strong>what happened since my birth?</strong>{" "}
          From the rise of the internet to the exploration of Mars, your{" "}
          <strong>timeline of my life history</strong> is packed with
          innovations and shifts. When you look at the{" "}
          <strong>history I lived through</strong>, you aren't just looking at
          dates; you're looking at the evolution of human civilization during
          your specific tenure on Earth.
        </p>

        <h3 className="text-2xl font-black text-slate-900 mt-12 mb-4 uppercase tracking-tight">
          The Power of a Personal Milestone History Timeline
        </h3>
        <p className="mb-6">
          Creating an <strong>interactive life timeline</strong> allows you to
          see where you were during the{" "}
          <strong>major events since I was born</strong>. Perhaps you were a
          toddler when the first smartphone was released, or maybe you were
          starting your first job during a global economic shift. This{" "}
          <strong>personal life timeline history</strong> contextualizes your
          own growth alongside <strong>world events since birth</strong>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
          <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
            <h4 className="font-black text-slate-900 mb-2 italic">
              Historical Moments Year Born
            </h4>
            <p className="text-sm">
              Your journey starts with the{" "}
              <strong>historical events my birth year</strong>. Whether it was a
              year of revolution or a year of peace, the{" "}
              <strong>historical moments year born</strong> set the stage for
              your entire life.
            </p>
          </div>
          <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
            <h4 className="font-black text-slate-900 mb-2 italic">
              AI Personal History Timeline
            </h4>
            <p className="text-sm">
              In 2026, we use <strong>AI personal history timeline</strong>{" "}
              technology to curate the most relevant{" "}
              <strong>lifetime historical events</strong>. This ensures your{" "}
              <strong>history since birth calculator</strong> results are
              accurate and meaningful.
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-black text-slate-900 mt-12 mb-4 uppercase tracking-tight">
          Events on My Birthday in History
        </h3>
        <p className="mb-6">
          Beyond just the years, many people are curious about{" "}
          <strong>events on my birthday in history</strong>. Was a king crowned?
          Was a treaty signed? A <strong>birthday history timeline</strong>{" "}
          connects your special day to the broader{" "}
          <strong>timeline since my birthday</strong> across centuries.
        </p>

        <h3 className="text-2xl font-black text-slate-900 mt-12 mb-4 uppercase tracking-tight">
          How the World Changed During My Lifetime
        </h3>
        <p className="mb-6">
          The <strong>world changed during my lifetime</strong> in ways that
          previous generations could only dream of. By using our{" "}
          <strong>life in historical milestones</strong> tool, you can see the{" "}
          <strong>defining moments since birth</strong> that have shaped your
          world view. This <strong>nostalgia history since birth 2026</strong>{" "}
          experience is more than just data; it's a reflection on the{" "}
          <strong>events in my lifetime</strong> that made you who you are.
        </p>

        <blockquote className="border-l-4 border-yellow-400 pl-6 py-2 my-8 italic font-serif text-xl text-slate-600">
          "History is not just the story of nations, but the story of people
          living through time."
        </blockquote>

        <h3 className="text-2xl font-black text-slate-900 mt-12 mb-4 uppercase tracking-tight">
          The "You're Getting Old" Timeline Effect
        </h3>
        <p className="mb-6">
          You might have seen the famous <strong>Atlantic life timeline</strong>{" "}
          or the <strong>you re getting old timeline</strong> memes. These tools
          highlight the <strong>historical events since I was born</strong> to
          remind us of how much time has passed. While it can be a bit shocking
          to see that a major movie release is now 20 years old, our{" "}
          <strong>history timeline since birth</strong> helps you embrace that{" "}
          <strong>nostalgia history</strong> with joy rather than dread.
        </p>

        <h3 className="text-2xl font-black text-slate-900 mt-12 mb-4 uppercase tracking-tight">
          Why Use a History Since Birth Calculator?
        </h3>
        <p className="mb-6">
          1. **Educational Context**: Understand{" "}
          <strong>what historical events happened during my lifetime</strong>{" "}
          for school or personal growth.
          <br />
          2. **Nostalgia**: Relive the <strong>
            events in my lifetime
          </strong>{" "}
          that brought you joy.
          <br />
          3. **Perspective**: See how{" "}
          <strong>history remembers your lifetime</strong> compared to previous
          eras.
        </p>

        <h3 className="text-2xl font-black text-slate-900 mt-12 mb-4 uppercase tracking-tight">
          Conclusion: Your Place in History
        </h3>
        <p className="mb-12">
          Your <strong>personal historical timeline</strong> is still growing.
          Every day you add a new page to the{" "}
          <strong>history since birth calculator</strong>. Whether you are
          searching for <strong>historical events my birth year</strong> or
          looking ahead to the future, remember that you are a living witness to
          history.
        </p>
      </article>

      {/* --- 4. FOOTER --- */}
      <footer className="max-w-4xl mx-auto px-4 mt-24">
        <div className="bg-slate-950 rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
          <h3 className="text-white font-black text-2xl md:text-3xl mb-4 relative z-10 tracking-tighter">
            History is still being written...
          </h3>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed relative z-10 max-w-2xl mx-auto">
            Every moment you live is a new entry in the human story. By looking
            back at how far the world has come since your birth, you can see
            just how much impact one lifetime can have.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4 relative z-10">
            <Link
              href="/"
              className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-slate-950 transition-all"
            >
              Back Home
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  const seo = {
    title: "History Timeline Since Birth: What Happened Since I Was Born?",
    description:
      "Discover historical events since I was born with our interactive life timeline generator. Explore world milestones and history since birth instantly.",
    keywords:
      "history timeline since birth, historical events since I was born, life timeline generator, what happened since my birth, personal historical timeline, events in my lifetime, history I lived through, timeline of my life history, historical moments year born, world events since birth, life in historical milestones, how history remembers your lifetime, what historical events happened during my lifetime, birthday history timeline, events on my birthday in history, timeline since my birthday, personal life timeline history, major events since I was born, history since birth calculator, lifetime historical events, defining moments since birth, interactive life timeline, Atlantic life timeline, you re getting old timeline, historical events my birth year, world changed during my lifetime, personal milestone history timeline, nostalgia history since birth 2026, AI personal history timeline",
    ogTitle: "Personal History Timeline: Events in My Lifetime",
    ogDescription:
      "Discover every major world event that has happened since your birth year. Interactive and updated for 2026.",
    canonical: "https://www.imborednow.com/history-timeline",
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Life Timeline Generator",
    url: "https://www.imborednow.com/history-timeline",
    description:
      "Calculate and view all major historical events that occurred since your birth date.",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Any",
    author: {
      "@type": "Organization",
      name: "ImBoredNow",
    },
  };

  return {
    props: {
      seo,
      jsonLd,
    },
  };
}
