
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Globe, Atom, Zap, Thermometer, Mountain, Droplets, Wind, Star } from 'lucide-react';
import { PlanetData } from './Planet';

interface PlanetInformationProps {
  planet: PlanetData;
}

const planetDetailedData = {
  earth: {
    overview: "Earth, our home planet, is the third planet from the Sun and the only known planet harboring life. With a diameter of approximately 12,742 kilometers, Earth is a terrestrial planet with a diverse range of environments from vast oceans covering 71% of its surface to towering mountain ranges and sprawling continents.",
    atmosphere: {
      composition: "Earth's atmosphere is composed primarily of nitrogen (78%) and oxygen (21%), with trace amounts of argon, carbon dioxide, and other gases. This unique composition allows for the existence of liquid water and supports a wide variety of life forms.",
      pressure: "1 atmosphere (101.3 kPa at sea level)",
      temperature: "Average surface temperature: 15°C (59°F)"
    },
    gases: [
      { name: "Nitrogen", percentage: 78, description: "Essential for protein synthesis in living organisms" },
      { name: "Oxygen", percentage: 21, description: "Vital for respiration and combustion processes" },
      { name: "Argon", percentage: 0.93, description: "Noble gas used in various industrial applications" },
      { name: "Carbon Dioxide", percentage: 0.04, description: "Greenhouse gas essential for photosynthesis" }
    ],
    animals: [
      { name: "Blue Whale", habitat: "Oceans", description: "Largest animal on Earth, can reach lengths of 30 meters" },
      { name: "Siberian Tiger", habitat: "Forests", description: "Apex predator with distinctive orange coat and black stripes" },
      { name: "Emperor Penguin", habitat: "Antarctica", description: "Largest penguin species, excellent swimmer and diver" },
      { name: "African Elephant", habitat: "Savannas", description: "Largest land mammal with complex social structures" }
    ],
    geology: {
      crust: "Continental and oceanic crust averaging 35-40 km thickness",
      mantle: "Silicate rock layer extending to 2,890 km depth",
      core: "Iron-nickel core generating Earth's magnetic field"
    },
    climate: "Earth experiences diverse climate zones from tropical rainforests to polar ice caps, driven by solar radiation, ocean currents, and atmospheric circulation patterns."
  },
  mars: {
    overview: "Mars, known as the Red Planet due to iron oxide on its surface, is the fourth planet from the Sun. With a diameter of 6,779 kilometers, Mars has fascinated humans for centuries and remains a primary target for space exploration and potential colonization.",
    atmosphere: {
      composition: "Mars has a thin atmosphere composed primarily of carbon dioxide (95.3%) with small amounts of nitrogen and argon. The atmospheric pressure is less than 1% of Earth's.",
      pressure: "0.6% of Earth's atmospheric pressure",
      temperature: "Average surface temperature: -80°C (-112°F)"
    },
    gases: [
      { name: "Carbon Dioxide", percentage: 95.3, description: "Dominant atmospheric component creating greenhouse effect" },
      { name: "Nitrogen", percentage: 2.7, description: "Secondary atmospheric component" },
      { name: "Argon", percentage: 1.6, description: "Noble gas present in trace amounts" },
      { name: "Oxygen", percentage: 0.13, description: "Minimal oxygen present, not breathable for humans" }
    ],
    animals: [
      { name: "Hypothetical Subsurface Microbes", habitat: "Underground", description: "Potential microbial life in subsurface water reservoirs" },
      { name: "Extremophile Bacteria", habitat: "Soil", description: "Hardy bacteria adapted to extreme cold and radiation" },
      { name: "Cryptobiotic Organisms", habitat: "Polar Regions", description: "Organisms capable of surviving in dormant states" }
    ],
    geology: {
      surface: "Iron oxide-rich regolith creating the characteristic red appearance",
      features: "Massive volcanoes including Olympus Mons, vast canyon systems like Valles Marineris",
      poles: "Water ice and dry ice caps at both poles"
    },
    climate: "Mars experiences extreme temperature variations, dust storms that can cover the entire planet, and seasonal changes due to its elliptical orbit and axial tilt."
  },
  europa: {
    overview: "Europa, one of Jupiter's largest moons, is considered one of the most promising places to search for extraterrestrial life. Beneath its icy surface lies a vast subsurface ocean that may contain more water than all of Earth's oceans combined.",
    atmosphere: {
      composition: "Europa has a very thin atmosphere composed primarily of oxygen produced by radiation splitting water molecules on its surface.",
      pressure: "0.1 micropascals (extremely thin)",
      temperature: "Surface temperature: -160°C (-260°F)"
    },
    gases: [
      { name: "Oxygen", percentage: 100, description: "Pure oxygen atmosphere created by radiolysis of surface ice" }
    ],
    animals: [
      { name: "Hydrothermal Vent Organisms", habitat: "Ocean Floor", description: "Potential chemosynthetic life around underwater vents" },
      { name: "Planktonic Life Forms", habitat: "Subsurface Ocean", description: "Microscopic organisms adapted to high-pressure environments" },
      { name: "Ice-Shell Microbes", habitat: "Ice Crust", description: "Organisms living within the ice shell structure" },
      { name: "Deep Ocean Swimmers", habitat: "Ocean Depths", description: "Larger organisms adapted to perpetual darkness" }
    ],
    geology: {
      surface: "Smooth ice shell 15-25 kilometers thick with complex crack patterns",
      ocean: "Subsurface ocean 60-150 kilometers deep",
      core: "Rocky core with possible interaction with ocean"
    },
    climate: "Europa experiences extreme cold on its surface with potential hydrothermal activity in its subsurface ocean, creating unique conditions for life."
  },
  titan: {
    overview: "Titan, Saturn's largest moon, is unique in the solar system with its thick atmosphere and liquid methane lakes. It's the only moon known to have a substantial atmosphere and the only celestial body besides Earth with stable bodies of surface liquid.",
    atmosphere: {
      composition: "Dense atmosphere primarily composed of nitrogen with methane clouds and complex organic chemistry.",
      pressure: "1.45 times Earth's atmospheric pressure",
      temperature: "Surface temperature: -179°C (-290°F)"
    },
    gases: [
      { name: "Nitrogen", percentage: 94, description: "Primary atmospheric component similar to early Earth" },
      { name: "Methane", percentage: 5, description: "Creates weather patterns and seasonal cycles" },
      { name: "Hydrogen", percentage: 0.1, description: "Trace amounts in upper atmosphere" }
    ],
    animals: [
      { name: "Methanogenic Organisms", habitat: "Methane Lakes", description: "Hypothetical life forms using methane as a solvent" },
      { name: "Atmospheric Floaters", habitat: "Dense Atmosphere", description: "Aerial organisms adapted to thick atmospheric conditions" },
      { name: "Cryogenic Bacteria", habitat: "Surface", description: "Cold-adapted microorganisms" },
      { name: "Hydrocarbon Swimmers", habitat: "Liquid Methane", description: "Organisms adapted to liquid hydrocarbon environments" }
    ],
    geology: {
      surface: "Complex landscape with methane lakes, rivers, and dunes",
      subsurface: "Possible subsurface water ocean beneath ice shell",
      composition: "Water ice with hydrocarbon deposits"
    },
    climate: "Titan has a complex methane cycle similar to Earth's water cycle, with methane rain, rivers, and seasonal weather patterns."
  },
  "proxima-b": {
    overview: "Proxima Centauri b is an exoplanet orbiting within the habitable zone of Proxima Centauri, the closest star to our solar system. This potentially rocky planet represents one of our best opportunities to study a potentially habitable world beyond our solar system.",
    atmosphere: {
      composition: "Unknown, but models suggest possible thin atmosphere with potential for water vapor if conditions are right.",
      pressure: "Unknown, estimates range from negligible to Earth-like",
      temperature: "Estimated surface temperature: -39°C to 30°C depending on atmospheric conditions"
    },
    gases: [
      { name: "Theoretical Oxygen", percentage: 0, description: "Possible oxygen if photosynthetic processes exist" },
      { name: "Theoretical Water Vapor", percentage: 0, description: "Potential water vapor in habitable regions" },
      { name: "Theoretical Carbon Dioxide", percentage: 0, description: "Possible greenhouse gases for temperature regulation" }
    ],
    animals: [
      { name: "Extremophile Microbes", habitat: "Surface", description: "Radiation-resistant microorganisms" },
      { name: "Twilight Zone Dwellers", habitat: "Terminator Zone", description: "Organisms adapted to perpetual twilight conditions" },
      { name: "Subsurface Life", habitat: "Underground", description: "Protected life forms beneath the surface" },
      { name: "Stellar Wind Surfers", habitat: "Upper Atmosphere", description: "Hypothetical organisms using stellar energy" }
    ],
    geology: {
      surface: "Potentially rocky with possible water ice at poles",
      structure: "Likely terrestrial with iron core and silicate mantle",
      features: "Tidally locked with permanent day and night sides"
    },
    climate: "Proxima b is tidally locked, creating extreme temperature differences between day and night sides, with potential for a temperate zone at the terminator line."
  }
};

const PlanetInformation = ({ planet }: PlanetInformationProps) => {
  const data = planetDetailedData[planet.id as keyof typeof planetDetailedData];
  
  if (!data) {
    return <div>No detailed information available for this planet.</div>;
  }

  return (
    <div className="space-y-6">
      <Card className="bg-slate-900/90 backdrop-blur-sm border-purple-400">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Globe className="w-6 h-6" />
            {planet.name} - Detailed Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-300 leading-relaxed">{data.overview}</p>
        </CardContent>
      </Card>

      <Tabs defaultValue="atmosphere" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800">
          <TabsTrigger value="atmosphere" className="text-white">Atmosphere</TabsTrigger>
          <TabsTrigger value="gases" className="text-white">Gases</TabsTrigger>
          <TabsTrigger value="life" className="text-white">Life Forms</TabsTrigger>
          <TabsTrigger value="geology" className="text-white">Geology</TabsTrigger>
        </TabsList>

        <TabsContent value="atmosphere" className="space-y-4">
          <Card className="bg-slate-900/90 backdrop-blur-sm border-blue-400">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <Wind className="w-5 h-5" />
                Atmospheric Conditions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-white mb-2">Composition</h4>
                <p className="text-slate-300">{data.atmosphere.composition}</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Pressure</h4>
                <p className="text-slate-300">{data.atmosphere.pressure}</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Temperature</h4>
                <p className="text-slate-300">{data.atmosphere.temperature}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gases" className="space-y-4">
          <div className="grid gap-3">
            {data.gases.map((gas, index) => (
              <Card key={index} className="bg-slate-900/90 backdrop-blur-sm border-green-400">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Atom className="w-4 h-4 text-green-400" />
                      <span className="font-semibold text-white">{gas.name}</span>
                    </div>
                    <Badge variant="outline" className="text-green-400 border-green-400">
                      {gas.percentage}%
                    </Badge>
                  </div>
                  <p className="text-slate-300 text-sm">{gas.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="life" className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            {data.animals.map((animal, index) => (
              <AccordionItem key={index} value={`animal-${index}`} className="border-purple-400">
                <AccordionTrigger className="text-white hover:text-purple-400">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-purple-400" />
                    {animal.name}
                    <Badge variant="outline" className="ml-2 text-purple-400 border-purple-400">
                      {animal.habitat}
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-slate-300">
                  {animal.description}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>

        <TabsContent value="geology" className="space-y-4">
          <Card className="bg-slate-900/90 backdrop-blur-sm border-orange-400">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-400">
                <Mountain className="w-5 h-5" />
                Geological Features
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(data.geology).map(([key, value]) => (
                <div key={key}>
                  <h4 className="font-semibold text-white mb-2 capitalize">{key}</h4>
                  <p className="text-slate-300">{value}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="bg-slate-900/90 backdrop-blur-sm border-cyan-400">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-cyan-400">
            <Thermometer className="w-5 h-5" />
            Climate Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-300 leading-relaxed">{data.climate}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlanetInformation;
