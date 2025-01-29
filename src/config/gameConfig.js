export const gameConfig = {
  // Waypoint appearance
  waypoint: {
    size: 26, // radius of hexagon
    spacing: {
      horizontal: 3.8, // multiplier of size
      vertical: 1.6, // multiplier of size
    },
    style: {
      strokeColor: "#2c3e50",
      strokeWidth: 3,
      gradient: {
        inner: "#4a90e2",
        outer: "#357abd",
      },
      fontSize: 24,
      fontColor: "#fff",
      fontFamily: "Monospace",
      opacity: 1, // Add opacity setting (0 to 1)
    },
    defaultBackground: "waypoints/default.webp",
  },

  // Combined waypoint information
  waypoints: [
    {
      id: 0,
      coordinates: { x: 290, y: 200 },
      background: "waypoints/shire.webp",
      locationName: "The Shire",
      locationType: "good",
      locationDescription: `
        The Shire is described as a small but beautiful and fruitful land, beloved by its inhabitants. The Hobbits had an extensive agricultural system in the Shire, but did not proceed with industrialisation. Various supplies could be found in the Shire, including cereals, fruit, wood and pipe-weed (a favourite treat of Hobbits).

        The Shire was quite densely populated in parts with many villages and a few towns, but it still was open enough to allow for wide forested areas and marshes. There were green, rolling hills and freshly tilled earth, along with gardens and flower boxes on window sills.

        Thanks to the protective presence of the Rangers of the North in the lands of the former Arnor, the Shire for centuries ignored the wide world outside, despite being traversed by the East Road.

        From the west to the east, the Shire originally measured 40 leagues (120 miles) from the Far Downs to the Brandywine Bridge. From the north to the south, it measured 50 leagues (150 miles) from the northern moors to the marshes in the south.[1] The total area of the Shire must have extended roughly about 20,000 square miles.[note 1]

        In S.R. 1452, King Elessar gave the Westmarch to the Shire-hobbits as a gift. This extended the western boundaries of the Shire to the Tower Hills.[3] Buckland, to the east of the Brandywine, remained an independent region occupied by Hobbits.
      `,
    },
    {
      id: 1,
      coordinates: { x: 340, y: 190 },
      background: "waypoints/barrow-downs.webp",
      locationName: "Barrow-downs",
      locationType: "evil",
      locationDescription: `
        The Barrow-downs or Tyrn Gorthad were a series of treeless hills east of the Shire, behind the Old Forest, and south-west of the village of Bree. They were called the Barrow-downs, because many of the hills were crowned with barrows (burial mounds). Standing stones stood on some of the green mounds. The Barrow-downs were a treeless country that was covered with grass and turf.
        The Barrow-wights were a kind of undead-like creatures, dead bones animated by evil spirits. 
        They were the guardians of the Barrow-downs.
      `,
    },
    {
      id: 2,
      coordinates: { x: 385, y: 195 },
      background: "waypoints/bree-village.webp",
      locationName: "Bree",
      locationType: "good",
      locationDescription: `
        Bree was the chief village of Bree-land, a small wooded region near the intersection of the main north-south and east-west routes through Eriador. Bree-land was the only part of Middle-earth where Men and hobbits dwelt side by side and Bree had a large population of Hobbits.
      `,
    },
    {
      id: 3,
      coordinates: { x: 460, y: 180 },
      background: "waypoints/trollshaws.webp",
      locationName: "Trollshaws",
      locationType: "evil",
      locationDescription: `
        The Trollshaws were the upland woods, consisting at least partly of beech trees, that lay to the west of Rivendell between the Rivers Hoarwell and Loudwater.
        On the hills of the Trollshaws were shallow caves, such as the Trolls' lair, and Mannish castles and towers.
        The Men of Rhudaur built castles and towers on the top of some of its hills. They were the haunt of Trolls, especially after the fall of Arnor
      `,
    },
    {
      id: 4,
      coordinates: { x: 540, y: 190 },
      background: "waypoints/rivendell.webp",
      locationName: "Rivendell",
      locationType: "good",
      locationDescription: `
        Rivendell, or Imladris, was an Elven outpost in the Misty Mountains on the eastern edge of Eriador.
        Due to its location, it was called the Last Homely House from the point of view of a traveller going to the Misty Mountains and Wilderland; and also the First Homely House from the point of view of someone coming from these lands to the civilised lands of Eriador to the west.
      `,
    },
    {
      id: 5,
      coordinates: { x: 510, y: 280 },
      background: "waypoints/moria.webp",
      locationName: "Moria (Khazad-dûm)",
      locationType: "evil",
      locationDescription: `
        Khazad-dûm was the grandest and most famous of the mansions of the Dwarves. There, for many thousands of years, a thriving Dwarvish community created the greatest city ever known.
        Most of its great wealth was based on the rare Mithril that was found in its mines, and as the centuries passed, the Dwarves mined deeper and deeper for the precious metal. 
        In the year T.A. 1980, their deep digging unleashed a nameless terror, a Balrog from the Elder Days, that wreaked dreadful destruction, and in slaying the King, Durin VI, became known as Durin's Bane. 
        In the following year, Durin's son, Náin I, was also lost, and the Dwarves fled their ancient home.
      `,
    },
    {
      id: 6,
      coordinates: { x: 510, y: 374 },
      background: "waypoints/fangorn.webp",
      locationName: "Fangorn Forest",
      locationType: "good",
      locationDescription: `
        Fangorn Forest or the Forest of Fangorn was a deep, dark woodland that grew beneath the southern Misty Mountains, under the eastern flanks of that range. 
        According to a legend the King of the Galadhrim had met the oldest Ent Fangorn in ancient days. 
        As a consequence, it is possible that Fangorn Forest was named after the the Ent Fangorn.
        During the War of the Ring, in 29 February T.A. 3019 he discovered Meriadoc Brandybuck ("Merry") and Peregrin Took ("Pippin") after they escaped from Orcs. He welcomed them to the Wellinghall. The hobbits brought news of the Wizard Saruman's treachery and his Orcs damaging the trees, but Treebeard already knew of these disasters.
        After lengthy deliberation Treebeard led them marching on Saruman's fortress at Isengard in March 3, accompanied by the two Hobbits: the last march of the Ents. In the Battle of Isengard they destroyed the valley and trapped Saruman in the tower of Orthanc.
      `,
    },
    {
      id: 7,
      coordinates: { x: 440, y: 400 },
      background: "waypoints/isengard.webp",
      locationName: "Isengard",
      locationType: "evil",
      locationDescription: `
        Isengard was one of the three major fortresses of Gondor, and held within it one of the realm's palantíri. 
        In the latter half of the Third Age, the stronghold came into the possession of Saruman, becoming his home and personal domain until his defeat in the War of the Ring.
      `,
    },
    {
      id: 8,
      coordinates: { x: 480, y: 540 },
      background: "waypoints/path-of-dead.webp",
      locationName: "Paths of the Dead",
      locationType: "common",
      locationDescription: `
        The Paths of the Dead was a haunted underground passage through the White Mountains that led from Harrowdale in Rohan to Blackroot Vale in Gondor.

        In S.A. 3320 the realm of Gondor was founded. At that time Isildur set upon the crown of the hill of Erech a black stone and called upon the King of the Mountains to swear allegiance to him, which he did. However, when Sauron attacked Gondor in S.A. 3429 and Isildur called upon the Men of the Mountains to honour their oath, they refused. Isildur then cursed them and their king, proclaiming that they would have no rest until the oath was fulfilled.
        
        The Men of the Mountains fled before Isildur's wrath, hid in the mountains away from other men, and dwindled away. Thereafter their haunts, the hill of Erech and the Paths of the Dead, became places of terror to living men. After the migration of the Rohirrim from the vales of Anduin to Rohan the living no longer used the Paths of the Dead.
      `,
    },
    {
      id: 9,
      coordinates: { x: 710, y: 480 },
      background: "waypoints/dead-marshes.webp",
      locationName: "Dead Marshes",
      locationType: "common",
      locationDescription: `
        The Dead Marshes were reeking wetlands that lay north-west of the Dagorlad and south-east of the Emyn Muil. The marshes were an endless network of pools and soft mires filled with water-courses, and in the dark waters could be seen the dead from battles of long ago
      `,
    },
    {
      id: 10,
      coordinates: { x: 770, y: 660 },
      background: "waypoints/shelob-lair.webp",
      locationName: "Shelob Lair",
      locationType: "common",
      locationDescription: `
        Shelob was a great spider-like creature akin to those of Nan Dungortheb in Beleriand, the last offspring of Ungoliant.

        Shelob had an out-thrust head with two great clusters of many-windowed eyes and great horns and a short stalk-like neck. 
        Her head had a beak that dribbled venom. 
        She had a huge body that looked like a bloated bag. 
        Her body was black and blotched with livid marks with a pale and luminous belly. 
        She had bent legs with great knobbed joints that were located high above her back. 
        Her legs had hairs that stuck out like steel spines and had a claw at each of their lower ends. 
        Shelob also had a sting. Her skin was so thick that it could not be penetrated with the strength of a man, Elf or Dwarf, because it consisted of many layers of growth. 
        It's still possible to make her impale or injure herself by making her apply her own weight on especially strong blades – a feat Sam accomplished with the sword Sting. 
        Her eyes were the only softer spot, also very sensitive to light.
      `,
    },
    {
      id: 11,
      coordinates: { x: 870, y: 560 },
      background: "waypoints/mount-doom.webp",
      locationName: "Mount Doom",
      locationType: "common",
      locationDescription: `
        Mount Doom, or Orodruin, was a volcano in Mordor.

        Melkor created Mount Doom in the First Age, and the name "Mordor" may have been given to the surrounding land before Sauron settled there because of its eruptions. When Sauron chose the land of Mordor as his dwelling-place in the Second Age, Orodruin was the reason for his choice. He "used the fire that welled there from the heart of the earth in his sorceries and his forging." The most famous result of his forging, and in fact the only one we know of for sure, was the One Ring.

        The mountain erupted in S.A. 3429, signalling Sauron's attack on Gondor and it took the name Amon Amarth, "Mount Doom".

        In T.A. 2954, Mount Doom reawakened and the last inhabitants of Ithilien terrified fled over Anduin. From then on it erupted sporadically until the end of the Age.

        The Fellowship of the Ring's quest in the War of the Ring was to destroy the Ring at Mount Doom
      `,
    },
  ],

  // Canvas settings
  canvas: {
    width: 1105,
    height: 795,
    backgroundColor: "#ffffff",
    padding: 50,
    background: {
      image: "background/board-map-bg-cut-version.jpg",
      opacity: 0.8, // 0 to 1
      scale: "stretch", // 'cover', 'contain', or 'stretch'
    },
  },

  // Player marker settings
  player: {
    size: 15, // Reduced size for better fit
    offset: 45, // Distance above waypoint
    style: {
      strokeColor: "#fff",
      strokeWidth: 2,
      fontSize: 14, // Reduced font size
      fontFamily: "Arial",
      fontColor: "#fff",
    },
  },

  // Connection line style
  connectionLine: {
    color: "#666",
    width: 3,
  },
}; 