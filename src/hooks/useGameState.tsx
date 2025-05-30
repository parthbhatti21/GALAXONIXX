import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { PlanetData } from '@/components/Planet';
import { toast } from 'sonner';

export interface GameState {
  credits: number;
  fuel: number;
  maxFuel: number;
  currentPlanet: string;
  explorations: Record<string, number>;
  totalDiscoveries: number;
  lastFreeCreditsDate?: string;
}

export interface PlanetData {
  id: string;
  name: string;
  description: string;
  travelCost: number;
  refuelCost: number;
  maxDiscoveries: number;
  color: string;
  gradient: string;
  environment: string;
  gaese: string[];
  moons: { id: string; name: string; description: string; color: string; gradient: string }[];
}

export const PLANETS: PlanetData[] = [
  {
    id: 'mercury',
    name: 'Mercury',
    description: `Mercury, the smallest and innermost planet in our solar system, presents a world of extremes and fascinating geological features. With a diameter of just 4,879 kilometers, it's only slightly larger than Earth's Moon. Its surface is heavily cratered, resembling our Moon's appearance, but with unique features that tell the story of its violent past.

The planet's proximity to the Sun results in extreme temperature variations, ranging from 430°C (800°F) during the day to -180°C (-290°F) at night. This dramatic temperature swing is the most extreme in our solar system. Despite its small size, Mercury has a surprisingly strong magnetic field, about 1% of Earth's, suggesting a partially molten core that continues to generate this field.

Mercury's thin exosphere contains traces of hydrogen, helium, oxygen, sodium, calcium, and potassium, but offers no protection from solar radiation. The planet's slow rotation and lack of atmosphere create unique conditions where one side can face the Sun for extended periods, leading to the formation of water ice in permanently shadowed craters near the poles.

The planet's surface features include vast plains, impact basins, and volcanic deposits. The Caloris Basin, one of the largest impact craters in the solar system, spans 1,550 kilometers in diameter. Surrounding this basin is a series of concentric rings and radial fractures, evidence of the massive impact that created it.

Mercury's geological history is marked by several distinct periods. The pre-Tolstojan period saw the formation of the planet's oldest terrain, heavily cratered and ancient. The Tolstojan period followed, characterized by the formation of the Caloris Basin and other large impact features. The Calorian period brought extensive volcanic activity, filling many impact basins with smooth plains of lava.

The planet's surface is also marked by unique features called "scarps" or "rupes" - long, steep cliffs that can be hundreds of kilometers long and up to 3 kilometers high. These features formed as the planet's core cooled and contracted, causing the crust to wrinkle like a dried apple.

Mercury's orbit is highly elliptical, with a perihelion (closest approach to the Sun) of 46 million kilometers and an aphelion (furthest distance) of 70 million kilometers. This eccentric orbit, combined with its slow rotation, creates a unique day-night cycle where the Sun appears to move in a complex pattern across the sky.

The planet's surface composition is rich in metals, particularly iron, which makes up about 70% of its mass. This high metal content, combined with its small size, gives Mercury the second-highest density of any planet in our solar system, after Earth.

Mercury's exploration history began with NASA's Mariner 10 mission in 1974-75, which mapped about 45% of the planet's surface. The MESSENGER mission (2011-2015) provided much more detailed information, mapping the entire surface and studying the planet's composition, magnetic field, and exosphere in detail.

The planet's surface is also marked by "hollows"—shallow, irregular depressions that appear to be formed by the sublimation of volatile materials. These features are unique to Mercury and provide insights into the planet's composition and geological processes.

Mercury's interaction with the solar wind creates a unique magnetosphere, with a bow shock and magnetotail similar to Earth's but much smaller. The planet's magnetic field, though weak, is sufficient to create a small magnetosphere that protects the surface from some solar radiation.

The planet's surface temperature variations are so extreme that they create unique thermal conditions. During the day, the surface can become hot enough to melt lead, while at night, temperatures drop low enough to freeze water. This extreme thermal cycling has likely contributed to the planet's unique surface features and geological history.

Mercury's exploration continues to provide valuable insights into the formation and evolution of terrestrial planets. Its unique characteristics, from its extreme temperatures to its unusual magnetic field, make it a fascinating subject for planetary science.`,
    travelCost: 150,
    refuelCost: 25,
    maxDiscoveries: 3,
    color: 'bg-gray-500',
    gradient: 'bg-gradient-to-br from-gray-400 to-gray-600',
    environment: 'Rocky with no atmosphere',
    gaese: ['Iron Core', 'Silicate Minerals', 'Frozen Water Ice'],
    moons: []
  },
  {
    id: 'venus',
    name: 'Venus',
    description: `Venus, often called Earth's "sister planet" due to its similar size and mass, is a world of extreme conditions and fascinating mysteries. With a diameter of 12,104 kilometers, it's the second planet from the Sun and the hottest planet in our solar system, with surface temperatures reaching 462°C (864°F).

The planet's extreme heat is due to a runaway greenhouse effect caused by its thick atmosphere, composed primarily of carbon dioxide with clouds of sulfuric acid. The atmospheric pressure at the surface is 90 times that of Earth's, equivalent to being 900 meters underwater. This dense atmosphere creates a permanent layer of clouds that completely obscures the surface from view.

Venus rotates in the opposite direction to most planets, with a day lasting 243 Earth days, longer than its year of 225 Earth days. This retrograde rotation is one of the planet's many unique characteristics. The planet's surface is dominated by volcanic plains, with over 1,600 major volcanoes, some of which may still be active.

The planet's surface features two major highland regions: Ishtar Terra in the north and Aphrodite Terra near the equator. Ishtar Terra, about the size of Australia, contains Maxwell Montes, the highest point on Venus, rising 11 kilometers above the surrounding plains. Aphrodite Terra, about the size of South America, is marked by complex tectonic features and volcanic structures.

Despite its harsh conditions, Venus has a complex atmospheric circulation system, with winds reaching speeds of 360 kilometers per hour in the upper atmosphere. The planet's atmosphere shows evidence of a super-rotation, where the atmosphere rotates much faster than the planet itself.

The planet's surface shows evidence of extensive volcanic activity and tectonic deformation, suggesting a geologically active past. The surface is relatively young, with an estimated age of 300–500 million years, indicating a global resurfacing event in the planet's history.

Venus's atmosphere is composed of 96.5% carbon dioxide, 3.5% nitrogen, and trace amounts of other gases. The thick atmosphere creates a strong greenhouse effect, trapping heat and maintaining the planet's extreme surface temperatures. The clouds are composed of sulfuric acid droplets, creating a permanent layer that reflects about 75% of incoming sunlight.

The planet's surface is marked by various geological features, including coronae (circular features formed by upwelling of hot material from the mantle), tesserae (complex, highly deformed terrain), lava flows (extensive plains of solidified lava), impact craters (relatively few due to the thick atmosphere), and volcanic features such as shield volcanoes and calderas.

Venus's exploration history began with the Soviet Venera program in the 1960s and 1970s, which successfully landed several probes on the surface. NASA's Magellan mission in the 1990s mapped 98% of the planet's surface using radar, revealing its complex geology.

The planet's atmosphere shows evidence of past water, with deuterium-to-hydrogen ratios suggesting it once had significant amounts of water that were lost to space. This loss of water may have contributed to the planet's current extreme conditions.

Venus's surface temperature is hot enough to melt lead, and the atmospheric pressure is equivalent to being 900 meters underwater on Earth. These extreme conditions make it one of the most challenging environments in our solar system to explore.

The planet's clouds are arranged in three main layers: upper cloud layer (65–70 km altitude), middle cloud layer (50–65 km), and lower cloud layer (30–50 km). Each layer has different characteristics and compositions, creating a complex atmospheric structure.

Venus's magnetic field is very weak compared to Earth's, as the planet lacks a global magnetic field. Instead, it has an induced magnetosphere created by the interaction of the solar wind with the planet's atmosphere.

The planet's surface shows evidence of both ancient and recent geological activity. Some features, such as the coronae and tesserae, suggest ongoing geological processes, while the relatively young surface age indicates a major resurfacing event in the planet's history.

Venus's exploration continues to provide valuable insights into planetary evolution and the effects of greenhouse gases on climate.`,
    travelCost: 180,
    refuelCost: 35,
    maxDiscoveries: 4,
    color: 'bg-yellow-600',
    gradient: 'bg-gradient-to-br from-yellow-500 to-orange-600',
    environment: 'Thick toxic atmosphere',
    gaese: ['Sulfuric Acid Clouds', 'Carbon Dioxide', 'Heat-resistant Minerals', 'Volcanic Glass'],
    moons: []
  },
  {
    id: 'earth',
    name: 'Earth',
    description: `Earth, our home planet, is the third planet from the Sun and the only known planet to harbor life. With a diameter of 12,742 kilometers, it's the largest of the terrestrial planets. Earth's surface is unique in our solar system, with 71% covered by water oceans that contain 97% of the planet's water.

The remaining 29% consists of continents and islands, featuring diverse landscapes from towering mountains to vast plains. Earth's atmosphere is composed of 78% nitrogen, 21% oxygen, and trace amounts of other gases, creating the perfect conditions for life as we know it.

The planet's magnetic field, generated by its molten iron core, protects life from harmful solar radiation. Earth's climate system is complex, driven by solar radiation, ocean currents, and atmospheric circulation, creating diverse climate zones from tropical rainforests to polar ice caps.

Earth's geology is constantly changing through plate tectonics, with the crust divided into several major and minor plates that move relative to each other. This movement creates mountains, ocean basins, and volcanic activity. The planet's biosphere is incredibly diverse, with millions of species of plants, animals, and microorganisms, all interconnected in complex ecosystems.

The planet's rotation period of 24 hours and orbital period of 365.25 days create the day-night cycle and seasons that are fundamental to life on Earth. The Moon, Earth's only natural satellite, plays a crucial role in stabilizing the planet's rotation and creating ocean tides.

Earth's atmosphere is divided into several layers: troposphere (where weather occurs), stratosphere (contains the ozone layer), mesosphere (where meteors burn up), thermosphere (where auroras occur), and exosphere (the outermost layer, merging with space).

The planet's water cycle is a complex system of evaporation, condensation, and precipitation that distributes water across the globe. This cycle is essential for life and helps regulate the planet's temperature.

Earth's climate is influenced by various factors: solar radiation, atmospheric composition, ocean currents, land distribution, and human activities. The planet's biodiversity is organized into biomes—tropical rainforests, deserts, grasslands, temperate forests, tundra, and oceans—each with distinct climate, vegetation, and animal life.

Earth's geological history is divided into eons, eras, periods, and epochs, marking significant changes in the planet's development. The current era, the Cenozoic, began 66 million years ago after the extinction of the dinosaurs.

The planet's core is divided into inner core (solid iron and nickel), outer core (liquid iron and nickel), mantle (semi-solid rock), and crust (solid rock). Earth's magnetic field is generated by the movement of molten iron in the outer core, creating a protective shield against solar radiation that extends into space as the magnetosphere.

The planet's oceans are divided into Pacific, Atlantic, Indian, Southern, and Arctic Oceans. Each ocean has unique characteristics and plays a vital role in Earth's climate system, containing 97% of the planet's water and hosting diverse ecosystems.

Earth's atmosphere has evolved over billions of years from a reducing atmosphere to the current oxidizing atmosphere. This evolution was crucial for the development of life, particularly the rise in oxygen levels.

Human activities have significantly impacted Earth's environment, leading to climate change, biodiversity loss, pollution, resource depletion, and habitat destruction. Earth's future depends on our ability to address these challenges and maintain the planet's delicate balance.

The study of Earth science encompasses geology, oceanography, meteorology, astronomy, biology, chemistry, and physics. These disciplines work together to understand our planet's past, present, and future, making Earth a fascinating subject for scientific study and a precious home for all life.`,
    travelCost: 0,
    refuelCost: 30,
    maxDiscoveries: 5,
    color: 'bg-blue-500',
    gradient: 'bg-gradient-to-br from-blue-400 to-green-500',
    environment: 'Terrestrial with oceans',
    gaese: ['Humans', 'Dolphins', 'Eagles', 'Tigers', 'Coral'],
    moons: [
      {
        id: 'moon',
        name: 'Moon',
        description: "Earth's only natural satellite",
        color: 'bg-gray-300',
        gradient: 'bg-gradient-to-br from-gray-200 to-gray-400'
      }
    ]
  },
  {
    id: 'mars',
    name: 'Mars',
    description: `Mars, often called the “Red Planet,” is the fourth planet from the Sun and one of the most studied worlds in our solar system. With a diameter of approximately 6,779 kilometers—about half that of Earth—Mars presents a landscape at once familiar and alien. Its reddish hue arises from iron oxide (rust) coating much of its surface. Although smaller than Earth, Mars has about the same amount of dry land area owing to its lack of oceans.

Geologically, Mars is a world of extremes. The planet boasts the tallest volcano in the solar system, Olympus Mons, soaring some 22 kilometers above the surrounding plains—nearly three times the height of Mount Everest. Equally impressive is Valles Marineris, a canyon system over 4,000 kilometers long and up to 7 kilometers deep, dwarfing Earth’s Grand Canyon. These colossal features hint at a dynamic past marked by volcanic eruptions, tectonic stresses, and surface erosion.

Mars’s surface is sculpted by ancient water flows. Channels and valley networks, some stretching thousands of kilometers, bear witness to precipitation and runoff in Mars’s distant past. Impact craters, like the 1,100-kilometer-wide Hellas Basin, are infilled in places by sediments and volcanic lava flows. The polar regions feature layered deposits of ice and dust; the north polar cap spans roughly 1,000 kilometers across and undergoes seasonal growth and retreat as carbon dioxide and water ice accumulate and sublimate.

The Martian atmosphere is thin—only about 1% of Earth’s surface pressure—and is composed mostly of carbon dioxide, with traces of nitrogen and argon. Despite its tenuous nature, this atmosphere drives weather: global dust storms can envelop the planet for weeks, while local storms carve dunes and deposit dust across vast plains. Daytime highs near the equator can reach 20°C, but nights plunge to –73°C or colder, and winter at the poles can see temperatures below –120°C.

Seasons on Mars, caused by its axial tilt of 25.2° (similar to Earth’s 23.5°), bring changes in atmospheric circulation and frost deposition. During spring in each hemisphere, dry ice (frozen CO₂) at the poles sublimates, feeding dust-laden winds. In summer, sublimation exposes underlying water ice. Recurring slope lineae—dark streaks that appear on steep slopes—raise intriguing questions about transient liquid water or brines, although their exact mechanism remains debated.

Beneath the surface, Mars’s internal structure includes a crust estimated 50–125 kilometers thick, a silicate mantle, and a core of iron, nickel, and sulfur roughly 1,500–2,000 kilometers in radius. Unlike Earth, Mars lacks a global magnetic field, but crustal magnetism detected by orbiters points to an ancient dynamo that shut down over 4 billion years ago.

Water ice persists today in mid-latitude glaciers and under shallow regolith. The Phoenix lander confirmed subsurface water ice in the north polar region in 2008, and radar probing by orbiters has revealed extensive buried ice deposits. These reservoirs, alongside hydrated minerals such as phyllosilicates and sulfates found in ancient terrains, underscore Mars’s wetter history and present opportunities for future human exploration and in-situ resource utilization.

Mars’s exploration history spans six decades. NASA’s Mariner 4 returned the first close-up images in 1965, revealing cratered highlands. The twin Viking landers in 1976 conducted the first surface biology experiments and weather observations. Mars Global Surveyor (1997–2006) mapped topography and magnetism. Mars Odyssey (2001–present) detected hydrogen-rich subsurface ice, while the Mars Exploration Rovers, Spirit and Opportunity (2004–2010/2018), discovered evidence of past water in sedimentary rocks and hematite “blueberries.”

In 2008, the Phoenix lander studied soil chemistry and confirmed water ice. The Mars Reconnaissance Orbiter (2006–present) has imaged potential landing sites and tracked seasonal changes. More recently, the Curiosity rover (2012–present) ascended Mount Sharp in Gale Crater, uncovering ancient lakebeds and organic molecules, and the Perseverance rover (2021–present) is caching samples in Jezero Crater for eventual return to Earth. Ingenuity, the first powered rotorcraft on another planet, has demonstrated aerial scouting capabilities, opening a new dimension in planetary exploration.

Mars’s moons, Phobos and Deimos, are small, irregularly shaped bodies likely captured asteroids. Phobos orbits just 6,000 kilometers above the Martian surface, rising and setting twice each Martian day, and is gradually spiraling inward. Its surface is scarred by the massive Stickney crater. Deimos is smaller and farther out, orbiting every 30 hours, and features smoother regolith that may mask underlying craters.

Scientific interest in Mars extends beyond geology into astrobiology. Methane detections in the atmosphere—varying both seasonally and spatially—spark debate over microbial or geochemical sources. The search for biosignatures in ancient fluvial and lacustrine sediments is a prime objective of current and future missions, including the ESA-Roscosmos ExoMars rover (planned for 2028) and potential sample-return campaigns.

Human missions to Mars are the next frontier. Proposed architectures include orbital staging, surface habitats utilizing local ice, and nuclear or solar electric propulsion. Challenges such as radiation exposure, life support, dust mitigation, and entry, descent, and landing of large payloads are active areas of research. Robotic precursors continue to scout water-ice deposits, while analog missions on Earth refine habitat designs and crew operations.  
`,
    travelCost: 200,
    refuelCost: 40,
    maxDiscoveries: 8,
    color: 'bg-red-500',
    gradient: 'bg-gradient-to-br from-red-500 to-orange-600',
    environment: 'Desert with ice caps',
    gaese: ['Martian Bacteria', 'Cave Crystals', 'Dust Devils', 'Ice Worms', 'Rock Lichens', 'Subsurface Microbes', 'Mineral Formations', 'Frozen Organics'],
    moons: [
      {
        id: 'phobos',
        name: 'Phobos',
        description: 'The larger and closer moon of Mars, heavily cratered and gradually spiraling inward.',
        color: 'bg-red-800',
        gradient: 'bg-gradient-to-br from-red-700 to-red-900'
      },
      {
        id: 'deimos',
        name: 'Deimos',
        description: 'The smaller and more distant Martian moon, featuring smoother regolith and a 30-hour orbital period.',
        color: 'bg-red-700',
        gradient: 'bg-gradient-to-br from-red-600 to-red-800'
      }
    ]
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    description: `Jupiter, the largest planet in our solar system, is a gas giant of immense proportions and dynamic weather systems. With a diameter of 142,984 kilometers—more than 11 times that of Earth—it dominates the outer solar system, possessing more mass than all the other planets combined. Its composition is primarily hydrogen and helium, with trace amounts of methane, water vapor, ammonia, and other compounds.

The planet's most iconic feature is the Great Red Spot, a persistent high-pressure storm larger than Earth that has raged for at least 350 years. Surrounding the Red Spot are alternating bands of lighter zones and darker belts, driven by powerful zonal jet streams that can exceed speeds of 500 kilometers per hour. These bands exhibit complex wave interactions, vortices, and eddies that create ever-shifting patterns in Jupiter's cloud tops.

Beneath the cloud layers, hydrogen transitions from a molecular gas to a liquid metallic state under immense pressure—creating a conducting layer that, together with the planet’s rapid rotation (about 9.9 hours per day), generates Jupiter’s strong magnetic field. This field is the strongest of any planet in the solar system, extending up to 7 million kilometers toward the Sun and nearly reaching the orbit of Saturn on the night side.

Jupiter radiates more heat than it receives from the Sun, a remnant of its ongoing slow gravitational contraction (the Kelvin–Helmholtz mechanism). Heat-driven convection in the deep atmosphere drives weather systems that manifest as colorful cloud features at different altitudes: ammonia ice crystals in the upper clouds, ammonium hydrosulfide in the middle, and water clouds deeper down.

The planet’s interior likely consists of a dense core of rock and metal—5–15 Earth masses—surrounded by layers of metallic and molecular hydrogen. Understanding Jupiter’s core composition and size is a key goal of current missions, as it holds clues to the planet's formation history and the processes that led to gas giant formation in our solar system.

Jupiter’s ring system, though faint compared to Saturn’s, comprises three main components: the halo ring, the main ring, and the gossamer rings, formed from dust ejected by micrometeoroid impacts on its small inner moons (Metis, Adrastea, Amalthea, and Thebe).

Jupiter’s magnetosphere traps charged particles in intense radiation belts, posing hazards to spacecraft and potentially to life on its moons. The magnetosphere interacts with the solar wind to produce auroras at the poles, which have been observed in ultraviolet and infrared wavelengths.

Jupiter has an extensive satellite system of 95 known moons (as of 2025), including:
- Io: the most volcanically active body in the solar system, driven by tidal heating.
- Europa: an icy moon with a subsurface ocean beneath its fractured ice crust, a prime target in the search for extraterrestrial life.
- Ganymede: the largest moon in the solar system, possessing its own intrinsic magnetic field and a differentiated interior.
- Callisto: a heavily cratered world that may harbor a subsurface ocean and has one of the oldest surfaces in the solar system.

Smaller moons include Amalthea, Thebe, and many irregular satellites captured from the Kuiper Belt or asteroid populations.

Juno, currently orbiting Jupiter, is mapping its gravity and magnetic fields and probing deep into the atmosphere to understand the planet’s internal structure, composition, and weather-layer dynamics. Past missions—Pioneer, Voyager, Galileo, and New Horizons—provided flyby data on atmospheric composition, ring structure, magnetosphere, and moons.

Jupiter’s role in the solar system extends beyond its own characteristics. Its strong gravity influences the orbits of other bodies, directing many comets into the inner solar system while also shielding Earth from some impacts. Jupiter’s formation and migration likely played a crucial role in shaping the early architecture of the solar system.

Studying Jupiter informs our understanding of exoplanetary systems, where “hot Jupiters” orbit close to their stars. Comparing these with our own Jupiter helps unravel the diversity of planetary formation pathways and migration processes.

With upcoming missions like the European Space Agency’s JUICE (JUpiter ICy moons Explorer) and potential future probes to the deeper atmosphere, Jupiter will remain a focal point for planetary science, revealing secrets about planetary formation, atmospheric physics, magnetospheric science, and the potential habitability of icy moons.`,
    travelCost: 400,
    refuelCost: 70,
    maxDiscoveries: 15,
    color: 'bg-orange-500',
    gradient: 'bg-gradient-to-br from-orange-400 to-red-600',
    environment: 'Gas giant with storms',
    gaese: [
      'Gas Dwellers', 'Storm Riders', 'Atmospheric Jellies', 'Hydrogen Crystals',
      'Pressure Adapted Life', 'Magnetic Field Entities', 'Cloud Cities Microbes',
      'Lightning Bacteria', 'Helium Swimmers', 'Great Red Spot Organisms',
      'Radiation Resistant Species', 'Metallic Hydrogen Formations',
      'Gravitational Anomalies', 'Aurora Particles', 'Cyclonic Life Forms'
    ],
    moons: [
      {
        id: 'io',
        name: 'Io',
        description: 'The most volcanically active body in the solar system, driven by tidal heating.',
        color: 'bg-yellow-500',
        gradient: 'bg-gradient-to-br from-yellow-400 to-orange-500'
      },
      {
        id: 'europa',
        name: 'Europa',
        description: 'Jupiter’s icy moon with a subsurface ocean beneath its fractured ice crust.',
        color: 'bg-cyan-400',
        gradient: 'bg-gradient-to-br from-cyan-300 to-blue-600'
      },
      {
        id: 'ganymede',
        name: 'Ganymede',
        description: 'The largest moon in the solar system, with its own magnetic field.',
        color: 'bg-gray-500',
        gradient: 'bg-gradient-to-br from-gray-400 to-gray-600'
      },
      {
        id: 'callisto',
        name: 'Callisto',
        description: 'The most heavily cratered object in the solar system, possibly with a subsurface ocean.',
        color: 'bg-gray-600',
        gradient: 'bg-gradient-to-br from-gray-500 to-gray-700'
      }
    ]
  },
  {
    id: 'saturn',
    name: 'Saturn',
    description: `Saturn, famous for its spectacular ring system, is the second-largest planet in our solar system and a gas giant composed primarily of hydrogen and helium. With a diameter of 120,536 kilometers—about nine times that of Earth—Saturn’s low density (it would float in water) and intricate rings make it a standout world.

Saturn’s rings stretch over 270,000 kilometers from the planet but are typically less than a kilometer thick. They are composed of countless ice and rock particles ranging in size from micrometers to meters. The rings are divided into seven main groups named alphabetically in the order of their discovery (D, C, B, A, F, G, and E). Gaps between these rings, such as the Cassini Division and the Encke Gap, are maintained by the gravitational effects of Saturn’s “shepherd” moons, including Prometheus, Pandora, Pan, and Daphnis.

Saturn’s atmosphere exhibits banded cloud patterns similar to Jupiter’s but more subdued. High-speed jet streams—reaching up to 1,800 kilometers per hour—shape these bands. The upper atmosphere contains ammonia ice clouds, while deeper layers hold ammonium hydrosulfide and water clouds. Storms on Saturn can erupt as colossal white ovals, some visible from Earth. The Great White Spot, a periodic storm cycle occurring roughly every 30 Earth years, has been observed by amateur astronomers and spacecraft alike.

Saturn’s interior likely features a small solid core of rock and metal (about 9–22 Earth masses) surrounded by metallic hydrogen and molecular hydrogen layers. Helium “rain” may occur in the deep interior, where helium condenses and falls toward the core, releasing heat and affecting the planet’s thermal evolution.

Saturn radiates more energy than it receives from the Sun, a consequence of ongoing helium differentiation and core contraction. Its rapid rotation—about 10.7 hours per day—causes an oblate shape, with the equatorial diameter about 10% larger than the polar diameter.

Saturn’s magnetic field is weaker than Jupiter’s but still significant, shaped by metallic hydrogen currents in its interior. The magnetosphere extends millions of kilometers and interacts with the solar wind to generate auroras near the poles, observed in ultraviolet and infrared emissions.

Saturn has 83 confirmed moons as of 2025, ranging from tiny moonlets within the rings to large satellites such as:
- Titan: the second-largest moon in the solar system, with a thick nitrogen-rich atmosphere and hydrocarbon lakes and seas on its surface.
- Enceladus: a small, icy moon that ejects water vapor and ice grains through cryovolcanic geysers, creating Saturn’s E ring.
- Mimas: known for the huge Herschel crater, giving it a Death Star–like appearance.
- Rhea, Tethys, Dione, Iapetus: mid-sized icy moons with unique surface features like wispy terrain (Dione) and equatorial ridges (Iapetus).

Cassini–Huygens, the flagship mission studying Saturn from 2004 to 2017, revolutionized our understanding of the planet, its rings, magnetosphere, and moons. Highlights include discovery of active geysers on Enceladus, the rich organic chemistry and methane cycle on Titan, and detailed ring structure dynamics.

Future missions aim to probe Titan’s seas and Enceladus’s subsurface ocean for potential habitability. Saturn’s complex system continues to be a natural laboratory for studying planetary ring dynamics, gas giant atmospheres, magnetic environments, and ocean worlds beyond Earth.`,
    travelCost: 600,
    refuelCost: 90,
    maxDiscoveries: 18,
    color: 'bg-yellow-400',
    gradient: 'bg-gradient-to-br from-yellow-300 to-amber-600',
    environment: 'Gas giant with rings',
    gaese: [
      'Ring Particles', 'Hexagonal Storm Dwellers', 'Methane Rain Creatures', 'Ring Shepherd Organisms',
      'Atmospheric Diamonds', 'Ice Crystal Life', 'Magnetic Resonance Entities', 'Seasonal Migrants',
      'Polar Aurora Beings', 'Ring Spokes Phenomena', 'Cassini Division Inhabitants',
      'Density Wave Riders', 'Shepherd Moon Colonies', 'Hydrocarbon Lakes Life',
      'Enceladus Geysers', 'Titan Atmosphere Floaters', 'Ring Material Processors', 'Gravitational Harmonics'
    ],
    moons: [
      {
        id: 'titan',
        name: 'Titan',
        description: 'Saturn’s largest moon with a thick nitrogen-rich atmosphere and hydrocarbon lakes.',
        color: 'bg-amber-600',
        gradient: 'bg-gradient-to-br from-amber-500 to-orange-700'
      },
      {
        id: 'enceladus',
        name: 'Enceladus',
        description: 'An icy moon with active geysers ejecting water vapor and ice grains into space.',
        color: 'bg-blue-200',
        gradient: 'bg-gradient-to-br from-blue-100 to-blue-300'
      },
      {
        id: 'mimas',
        name: 'Mimas',
        description: 'Known for the massive Herschel crater that dominates its surface.',
        color: 'bg-gray-400',
        gradient: 'bg-gradient-to-br from-gray-300 to-gray-500'
      }
    ]
  },
  {
    id: 'uranus',
    name: 'Uranus',
    description: `Uranus is an ice giant with a unique sideways rotation, tilted at 98 degrees relative to its orbit. This extreme tilt causes dramatic seasonal variations, with each pole experiencing 42 years of continuous sunlight followed by 42 years of darkness. Discovered in 1781 by William Herschel, Uranus has a diameter of 50,724 kilometers, about four times that of Earth.

The planet’s atmosphere is composed mainly of hydrogen and helium with a higher proportion of “ices” such as water, ammonia, and methane. Methane in the upper atmosphere absorbs red light, giving Uranus its pale blue-green color. The atmosphere exhibits faint banding and occasional storm activity, though less pronounced than on Jupiter or Saturn.

Beneath the atmosphere, Uranus’s interior consists of a rocky core, an icy mantle of water-ammonia ocean, and an outer envelope of hydrogen and helium. Pressures and temperatures within the mantle reach extremes where exotic forms of ice (superionic water) may exist.

Uranus’s magnetic field is both offset from its center and tilted by 59 degrees from its rotation axis, creating a complex and lopsided magnetosphere. This unusual field is likely generated in the conductive icy mantle rather than a metallic core.

Uranus has a set of narrow, dark rings discovered in 1977, composed of large particles up to meters in size. The rings are designated by letters (main rings: 6, 5, 4, alpha, beta, eta, gamma, delta, lambda, epsilon). Shepherd moons like Cordelia and Ophelia help maintain some ring edges, while others are shaped by gravitational interactions.

Uranus has 27 known moons, grouped into inner, classical, and irregular satellites. Major moons include:
- Miranda: a small moon with extreme geological features—cliffs, canyons, and chaotically jumbled plains—likely from crustal uplifting.
- Ariel: bright and relatively young surface with extensive faulting and fault valleys.
- Umbriel: dark and heavily cratered, showing fewer signs of geological activity.
- Titania: the largest, with canyons and fault systems indicating past tectonic processes.
- Oberon: the second largest, featuring large impact basins and ridged terrain.

The Voyager 2 flyby in 1986 remains the only close encounter with Uranus, revealing its ring structure, moons, magnetic environment, and atmosphere. Future mission concepts include orbiters to map its interior, study seasonal atmospheric dynamics, and explore ocean-bearing moons.

Uranus’s sideways orientation and ice-rich composition offer a contrasting perspective to the hydrogen-helium gas giants Jupiter and Saturn, making it a key target for understanding ice giant formation, ocean worlds, and the diversity of planetary systems in our galaxy.`,
    travelCost: 800,
    refuelCost: 110,
    maxDiscoveries: 12,
    color: 'bg-cyan-500',
    gradient: 'bg-gradient-to-br from-cyan-400 to-blue-600',
    environment: 'Ice giant with methane atmosphere',
    gaese: [
      'Methane Ice Crystals', 'Tilted Magnetic Field Entities', 'Sideways Rotation Adapters',
      'Diamond Rain Phenomena', 'Extreme Pressure Life', 'Ice Giant Core Dwellers',
      'Helium-Hydrogen Mixers', 'Retrograde Moon Organisms', 'Ring System Inhabitants',
      'Polar Night Survivors', 'Magnetosphere Anomalies', 'Seasonal Extreme Adapters'
    ],
    moons: [
      {
        id: 'miranda',
        name: 'Miranda',
        description: 'A small moon with extreme geological features—cliffs, canyons, and chaotic terrain.',
        color: 'bg-gray-500',
        gradient: 'bg-gradient-to-br from-gray-400 to-gray-600'
      },
      {
        id: 'ariel',
        name: 'Ariel',
        description: 'Ariel is bright with fault valleys and signs of past geological activity.',
        color: 'bg-blue-300',
        gradient: 'bg-gradient-to-br from-blue-200 to-blue-400'
      },
      {
        id: 'umbriel',
        name: 'Umbriel',
        description: 'A heavily cratered, dark moon with few signs of recent activity.',
        color: 'bg-gray-700',
        gradient: 'bg-gradient-to-br from-gray-600 to-gray-800'
      },
      {
        id: 'titania',
        name: 'Titania',
        description: 'The largest moon of Uranus, featuring canyons and fault systems.',
        color: 'bg-cyan-600',
        gradient: 'bg-gradient-to-br from-cyan-500 to-cyan-700'
      },
      {
        id: 'oberon',
        name: 'Oberon',
        description: 'The second-largest moon, marked by large impact basins and ridged terrain.',
        color: 'bg-cyan-700',
        gradient: 'bg-gradient-to-br from-cyan-600 to-cyan-800'
      }
    ]
  }
];


export const useGameState = (userId: string | undefined) => {
  const [gameState, setGameState] = useState<GameState>({
    credits: 1000,
    fuel: 100,
    maxFuel: 100,
    currentPlanet: 'earth',
    explorations: {},
    totalDiscoveries: 0,
    lastFreeCreditsDate: undefined
  });

  const [isLoading, setIsLoading] = useState(true);

  // Load game state from Supabase
  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    const loadGameState = async () => {
      try {
        setIsLoading(true);
        
        // Load profile data first
        let { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('current_credits, current_fuel, total_discoveries, current_planet')
          .eq('id', userId)
          .single();

        // If profile doesn't exist, create it
        if (profileError && profileError.code === 'PGRST116') {
          const initialProfile = {
            id: userId,
            current_credits: 1000,
            current_fuel: 100,
            total_discoveries: 0,
            current_planet: 'earth',
            updated_at: new Date().toISOString()
          };

          const { error: createProfileError } = await supabase
            .from('profiles')
            .insert(initialProfile);

          if (createProfileError) {
            console.error('Error creating profile:', createProfileError);
            toast.error('Failed to create profile');
            return;
          }

          // Set initial profile data
          profileData = initialProfile;
        } else if (profileError) {
          console.error('Error loading profile:', profileError);
          toast.error('Failed to load profile data');
          return;
        }

        // Load game state
        let { data: gameStateData, error: gameStateError } = await supabase
          .from('game_states')
          .select('*')
          .eq('user_id', userId)
          .single();

        // If game state doesn't exist, create it
        if (gameStateError && gameStateError.code === 'PGRST116') {
          const initialGameState = {
            user_id: userId,
            credits: profileData?.current_credits ?? 1000,
            fuel: profileData?.current_fuel ?? 100,
            max_fuel: 100,
            current_planet: profileData?.current_planet ?? 'earth',
            total_discoveries: profileData?.total_discoveries ?? 0,
            updated_at: new Date().toISOString()
          };

          const { error: createGameStateError } = await supabase
            .from('game_states')
            .insert(initialGameState);

          if (createGameStateError) {
            console.error('Error creating game state:', createGameStateError);
            toast.error('Failed to create game state');
            return;
          }

          gameStateData = initialGameState;
        } else if (gameStateError) {
          console.error('Error loading game state:', gameStateError);
          toast.error('Failed to load game state');
          return;
        }

        // Load explorations
        const { data: explorationsData, error: explorationsError } = await supabase
          .from('explorations')
          .select('*')
          .eq('user_id', userId);

        if (explorationsError) {
          console.error('Error loading explorations:', explorationsError);
          toast.error('Failed to load exploration data');
          return;
        }

        // Convert explorations array to object
        const explorationsObj: Record<string, number> = {};
        explorationsData?.forEach(exp => {
          explorationsObj[exp.planet_id] = exp.discoveries_count;
        });

        // Use profile data if available, otherwise use game state data
        const credits = profileData?.current_credits ?? gameStateData?.credits ?? 1000;
        const fuel = profileData?.current_fuel ?? gameStateData?.fuel ?? 100;
        const totalDiscoveries = profileData?.total_discoveries ?? gameStateData?.total_discoveries ?? 0;
        const currentPlanet = profileData?.current_planet ?? gameStateData?.current_planet ?? 'earth';

          setGameState({
          credits,
          fuel,
          maxFuel: gameStateData?.max_fuel ?? 100,
          currentPlanet,
            explorations: explorationsObj,
          totalDiscoveries,
          lastFreeCreditsDate: gameStateData?.last_free_credits_date
          });
      } catch (error) {
        console.error('Error loading game data:', error);
        toast.error('An error occurred while loading game data');
      } finally {
        setIsLoading(false);
      }
    };

    loadGameState();
  }, [userId]);

  // Save game state to Supabase
  const saveGameState = useCallback(async (newState: GameState) => {
    if (!userId) {
      console.error('No user ID available for saving game state');
      return false;
    }

    try {
      // First ensure the profile exists
      const { error: profileCheckError } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', userId)
        .single();

      if (profileCheckError && profileCheckError.code === 'PGRST116') {
        // Profile doesn't exist, create it
        const { error: createProfileError } = await supabase
          .from('profiles')
          .insert({
            id: userId,
            current_credits: newState.credits,
            current_fuel: newState.fuel,
            total_discoveries: newState.totalDiscoveries,
            updated_at: new Date().toISOString()
          });

        if (createProfileError) {
          console.error('Error creating profile:', createProfileError);
          toast.error('Failed to create profile');
          return false;
        }
      } else if (profileCheckError) {
        console.error('Error checking profile:', profileCheckError);
        toast.error('Failed to verify profile');
        return false;
      }

      // Update profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          current_credits: newState.credits,
          current_fuel: newState.fuel,
          total_discoveries: newState.totalDiscoveries,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);

      if (profileError) {
        console.error('Error updating profile:', profileError);
        toast.error('Failed to update profile');
        return false;
      }

      // Check if game state exists
      const { error: gameStateCheckError } = await supabase
        .from('game_states')
        .select('user_id')
        .eq('user_id', userId)
        .single();

      const gameStateData = {
          user_id: userId,
          credits: newState.credits,
          fuel: newState.fuel,
          max_fuel: newState.maxFuel,
          current_planet: newState.currentPlanet,
          total_discoveries: newState.totalDiscoveries,
        last_free_credits_date: newState.lastFreeCreditsDate,
          updated_at: new Date().toISOString()
      };

      if (gameStateCheckError && gameStateCheckError.code === 'PGRST116') {
        // Game state doesn't exist, create it
        const { error: createGameStateError } = await supabase
          .from('game_states')
          .insert(gameStateData);

        if (createGameStateError) {
          console.error('Error creating game state:', createGameStateError);
          toast.error('Failed to create game state');
          return false;
        }
      } else if (gameStateCheckError) {
        console.error('Error checking game state:', gameStateCheckError);
        toast.error('Failed to verify game state');
        return false;
      } else {
        // Update existing game state
        const { error: updateGameStateError } = await supabase
          .from('game_states')
          .update(gameStateData)
          .eq('user_id', userId);

        if (updateGameStateError) {
          console.error('Error updating game state:', updateGameStateError);
          toast.error('Failed to update game state');
          return false;
        }
      }

      return true;
    } catch (error) {
      console.error('Error in saveGameState:', error);
      toast.error('An unexpected error occurred while saving game state');
      return false;
    }
  }, [userId]);

  const updateGameState = useCallback(async (newState: Partial<GameState>) => {
    try {
      const updatedState = { ...gameState, ...newState };
      
      // Validate the new state
      if (updatedState.credits < 0) {
        toast.error('Credits cannot be negative');
        return false;
      }
      if (updatedState.fuel < 0) {
        toast.error('Fuel cannot be negative');
        return false;
      }
      if (updatedState.fuel > updatedState.maxFuel) {
        updatedState.fuel = updatedState.maxFuel;
      }

      // Optimistically update UI
      setGameState(updatedState);
      
      // Save to database
      const success = await saveGameState(updatedState);
      
      if (!success) {
        // Revert state if save failed
        setGameState(gameState);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error updating game state:', error);
      // Revert state on error
      setGameState(gameState);
      toast.error('An error occurred while updating game state');
      return false;
    }
  }, [gameState, saveGameState]);

  const travelToPlanet = useCallback((planet: PlanetData) => {
    setIsLoading(true);
    
    setTimeout(async () => {
      // Calculate credits earned from discovery (50-150)
      const creditsEarned = Math.floor(Math.random() * 100) + 50;
      
      const newState = {
        ...gameState,
        credits: gameState.credits - planet.travelCost + creditsEarned, // Subtract travel cost and add earned credits
        fuel: Math.max(0, gameState.fuel - 20),
        currentPlanet: planet.id,
        totalDiscoveries: gameState.totalDiscoveries + 1,
        explorations: {
          ...gameState.explorations,
          [planet.id]: (gameState.explorations[planet.id] || 0) + 1
        }
      };

      // Update profile with new planet position and credits
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          current_planet: planet.id,
          current_credits: newState.credits,
          current_fuel: newState.fuel,
          total_discoveries: newState.totalDiscoveries,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);

      if (profileError) {
        console.error('Error updating profile:', profileError);
        toast.error('Failed to update profile');
        return;
      }

      // Update game state
      const success = await updateGameState(newState);
      if (!success) {
        console.error('Failed to update game state');
        return;
      }

      // Save exploration to database
      try {
        const { error: explorationError } = await supabase
          .from('explorations')
          .upsert({
            user_id: userId,
            planet_id: planet.id,
            discoveries_count: newState.explorations[planet.id],
            updated_at: new Date().toISOString()
          });

        if (explorationError) {
          console.error('Error saving exploration:', explorationError);
          toast.error('Failed to save exploration progress');
        } else {
          // Show success message with credits earned
          toast.success(`Discovered new species! Earned ${creditsEarned} credits`);
        }
      } catch (error) {
        console.error('Error saving exploration:', error);
        toast.error('Failed to save exploration progress');
      }

      setIsLoading(false);
    }, 2000);
  }, [gameState, updateGameState, userId]);

  const explorePlanet = useCallback(async (planet: PlanetData) => {
    if (!userId) return { success: false, creditsEarned: 0, discovery: '' };

    const currentExplorations = gameState.explorations[planet.id] || 0;
    
    if (currentExplorations < planet.maxDiscoveries) {
      const creditsEarned = Math.floor(Math.random() * 100) + 50;
      
      const newState = {
        ...gameState,
        credits: gameState.credits + creditsEarned,
        explorations: {
          ...gameState.explorations,
          [planet.id]: currentExplorations + 1
        },
        totalDiscoveries: gameState.totalDiscoveries + 1
      };

      await updateGameState(newState);

      // Save exploration to database
      try {
        const { error } = await supabase
          .from('explorations')
          .upsert({
            user_id: userId,
            planet_id: planet.id,
            discoveries_count: currentExplorations + 1,
            updated_at: new Date().toISOString()
          });

        if (error) {
        console.error('Error saving exploration:', error);
          toast.error('Failed to save exploration progress');
          return { success: false, creditsEarned: 0, discovery: '' };
      }

      return {
        success: true,
        creditsEarned,
        discovery: planet.gaese[currentExplorations] || 'Unknown Species'
      };
      } catch (error) {
        console.error('Error saving exploration:', error);
        toast.error('Failed to save exploration progress');
        return { success: false, creditsEarned: 0, discovery: '' };
      }
    }
    
    return { success: false, creditsEarned: 0, discovery: '' };
  }, [gameState, userId, updateGameState]);

  const refuelShip = useCallback(async (planet: PlanetData) => {
    if (gameState.credits < planet.refuelCost) {
      toast.error('Insufficient credits for refueling');
      return false;
    }

    if (gameState.fuel >= gameState.maxFuel) {
      toast.info('Fuel tank is already full');
      return false;
    }

      const newState = {
        ...gameState,
        credits: gameState.credits - planet.refuelCost,
        fuel: gameState.maxFuel
      };
    
    const success = await updateGameState(newState);
    if (success) {
      toast.success('Ship successfully refueled');
    }
    return success;
  }, [gameState, updateGameState]);

  const canClaimFreeCredits = useCallback(() => {
    if (!gameState.lastFreeCreditsDate) return true;
    
    const lastDate = new Date(gameState.lastFreeCreditsDate);
    const currentDate = new Date();
    
    // Check if the last claim was on a different day
    return lastDate.getDate() !== currentDate.getDate() ||
           lastDate.getMonth() !== currentDate.getMonth() ||
           lastDate.getFullYear() !== currentDate.getFullYear();
  }, [gameState.lastFreeCreditsDate]);

  const claimFreeCredits = useCallback(async () => {
    if (!userId) {
      console.error('No user ID available');
      toast.error('User not authenticated');
      return false;
    }

    try {
      console.log('Starting free credits claim process...');
      
      // First check the profile's last claim date
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('last_free_credits_date, current_credits')
        .eq('id', userId)
        .single();

      console.log('Profile check result:', { profileData, profileError });

      if (profileError) {
        console.error('Error checking profile:', profileError);
        toast.error('Failed to verify profile');
        return false;
      }

      // Check if can claim based on profile's last claim date
      const lastClaimDate = profileData?.last_free_credits_date ? new Date(profileData.last_free_credits_date) : null;
      const currentDate = new Date();
      
      if (lastClaimDate) {
        // Format dates to compare only the date part (ignoring time)
        const lastClaimDateStr = lastClaimDate.toISOString().split('T')[0];
        const currentDateStr = currentDate.toISOString().split('T')[0];
        
        if (lastClaimDateStr === currentDateStr) {
          toast.error('You have already claimed your free credits today. Please try again tomorrow!');
          return false;
        }
      }

      const newCredits = (profileData?.current_credits || 0) + 100;
      const now = new Date().toISOString();

      // Update profile first
      console.log('Updating profile with new credits and claim date...');
      const { error: updateProfileError } = await supabase
        .from('profiles')
        .update({
          current_credits: newCredits,
          last_free_credits_date: now,
          updated_at: now
        })
        .eq('id', userId);

      if (updateProfileError) {
        console.error('Error updating profile:', updateProfileError);
        toast.error('Failed to update profile');
        return false;
      }
      console.log('Profile updated successfully');

      // Now handle game state
      let gameStateUpdated = false;
      
      // Try to update existing game state first
      const { error: updateError } = await supabase
        .from('game_states')
        .update({
          credits: newCredits,
          last_free_credits_date: now,
          updated_at: now
        })
        .eq('user_id', userId);

      if (updateError) {
        console.log('Update failed, trying to create new game state...');
        // If update fails, try to create new game state
        const { error: createError } = await supabase
          .from('game_states')
          .insert({
            user_id: userId,
            credits: newCredits,
            fuel: gameState.fuel,
            max_fuel: gameState.maxFuel,
            current_planet: gameState.currentPlanet,
            total_discoveries: gameState.totalDiscoveries,
            last_free_credits_date: now,
            updated_at: now
          });

        if (createError) {
          console.error('Error creating game state:', createError);
          console.error('Error details:', {
            code: createError.code,
            message: createError.message,
            details: createError.details
          });
          // Don't show error to user since profile was updated successfully
          console.log('Game state creation failed but profile was updated');
        } else {
          console.log('New game state created successfully');
          gameStateUpdated = true;
        }
      } else {
        console.log('Game state updated successfully');
        gameStateUpdated = true;
      }

      // Update local state
      setGameState(prev => ({
        ...prev,
        credits: newCredits,
        lastFreeCreditsDate: now
      }));
      
      // Show success message since profile was updated
      toast.success('Successfully claimed 100 free credits');
      return true;
    } catch (error) {
      console.error('Error claiming free credits:', error);
      if (error instanceof Error) {
        console.error('Error details:', {
          name: error.name,
          message: error.message,
          stack: error.stack
        });
      }
      toast.error('Failed to claim free credits');
      return false;
    }
  }, [gameState, userId]);

  const purchaseCredits = useCallback(async (amount: number) => {
    if (amount <= 0) {
      toast.error('Invalid credit amount');
    return false;
    }

    try {
    const newState = {
      ...gameState,
      credits: gameState.credits + amount
    };
      
      const success = await updateGameState(newState);
      if (success) {
        toast.success(`Successfully purchased ${amount} credits`);
      }
      return success;
    } catch (error) {
      console.error('Error purchasing credits:', error);
      toast.error('Failed to purchase credits');
      return false;
    }
  }, [gameState, updateGameState]);

  const purchaseFuel = useCallback(async (amount: number) => {
    if (amount <= 0) {
      toast.error('Invalid fuel amount');
      return false;
    }

    try {
    const newState = {
      ...gameState,
      fuel: Math.min(gameState.maxFuel, gameState.fuel + amount)
    };
      
      const success = await updateGameState(newState);
      if (success) {
        toast.success(`Successfully purchased ${amount} fuel`);
      }
      return success;
    } catch (error) {
      console.error('Error purchasing fuel:', error);
      toast.error('Failed to purchase fuel');
      return false;
    }
  }, [gameState, updateGameState]);

  return {
    gameState,
    planets: PLANETS,
    isLoading,
    travelToPlanet,
    explorePlanet,
    refuelShip,
    purchaseCredits,
    purchaseFuel,
    claimFreeCredits,
    canClaimFreeCredits
  };
};
