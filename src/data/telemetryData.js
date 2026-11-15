// Grounded NASA Telemetry, Ephemerides, and Persona RAG Database

export const PROBES = [
  {
    id: 'opportunity',
    name: 'Opportunity (MER-B)',
    designation: 'Mars Exploration Rover B',
    tagline: 'The 90-day explorer that survived 15 years in Martian storms',
    category: 'Mars Surface Lander',
    location: 'Perseverance Valley, Endeavour Crater, Mars (14.47°S, 337.33°E)',
    status: 'Silent (Last Ping Sol 5111)',
    launchDate: 'July 7, 2003',
    silenceDate: 'June 10, 2018',
    distanceKm: 228410000,
    lightDelaySeconds: 762, // ~12.7 minutes
    frequency: '401.585 MHz (UHF) / 8.4 GHz (X-Band)',
    carrierPitch: 401,
    pdsSensorData: {
      batteryVoltage: '16.2 V (Critical cut-off)',
      solarEfficiency: '8.4% (Pre-storm: 94.2%)',
      dustTau: 10.8, // Extreme global storm
      coreTempK: 178, // -95°C
      radiationCount: '28.4 mGy/yr',
      wheelOdometer: '45.16 km'
    },
    degradationParams: {
      initialTau: 0.22,
      finalTau: 10.8,
      dustThicknessMicrons: 142,
      siliconeCrackIndex: '84%',
      thermalBlanketBleach: '68% Al-Mylar fade'
    },
    humanAnalogy: {
      nutshell: 'A phone whose solar charger got buried under three thick blankets of Martian rust.',
      quote: "My battery is low and it's getting dark.",
      extended: "Imagine you packed for a weekend hike in the desert, and ended up walking across the dunes for 15 years. Every day the wind dusted my solar wings. I kept rolling over the rocks until the sky turned blacker than midnight at noon."
    },
    personaDialogue: [
      {
        question: "Why did you stop responding in 2018?",
        answer: "Imagine the biggest dust storm on Earth, but stretched across an entire planet without a single drop of rain. The sky went from butterscotch orange to pitch black. My solar panels are like leaves on a plant; without sunlight, I couldn't keep my internal heaters alive to warm my joints against the -90°C cold."
      },
      {
        question: "Are you still intact on Mars?",
        answer: "Yes. I am resting right at the crest of Perseverance Valley. The dust has settled over my mast and solar deck like fine cocoa powder. The iron sand has buffed my aluminum wheels to a quiet matte gray. I'm cold, but I'm completely at peace."
      },
      {
        question: "What was your favorite moment?",
        answer: "Sol 951, standing at the edge of Victoria Crater. Looking down into those towering layered cliffs and seeing ripples carved by ancient Martian water. We were only supposed to survive 90 days, but we kept finding another ridge to climb."
      }
    ]
  },
  {
    id: 'voyager1',
    name: 'Voyager 1',
    designation: 'Interstellar Mission #1',
    tagline: 'The farthest human artifact, coasting into the interstellar deep',
    category: 'Deep Space Probe',
    location: 'Interstellar Space (Ophiuchus constellation, 165.4 AU)',
    status: 'Transmitting (Carrier active)',
    launchDate: 'September 5, 1977',
    silenceDate: 'Active (Estimated RTG power to 2028-2030)',
    distanceKm: 24780000000,
    lightDelaySeconds: 82650, // ~22.95 hours one-way
    frequency: '8.415 GHz (X-Band Direct to DSN)',
    carrierPitch: 841,
    pdsSensorData: {
      batteryVoltage: '29.8 V (Plutonium-238 RTG)',
      solarEfficiency: '0% (Beyond heliosphere boundary)',
      dustTau: 0.001, // Cosmic vacuum
      coreTempK: 28, // -245°C exterior
      radiationCount: '210 MeV Cosmic Ray Flux',
      wheelOdometer: 'N/A (Coasting @ 17 km/s)'
    },
    degradationParams: {
      initialTau: 0.0,
      finalTau: 0.001,
      dustThicknessMicrons: 0.04, // Micrometeoroid pitting
      siliconeCrackIndex: '92% brittle',
      thermalBlanketBleach: '99% gold-mylar cosmic ray darkening'
    },
    humanAnalogy: {
      nutshell: 'A message bottle thrown into an ocean of black glass, carrying a golden gramophone record.',
      quote: "The Sun is now just a brilliant star behind my back.",
      extended: "I have crossed the bubble where the solar wind gives way to the ancient dust of exploding stars. My radio signal leaves my 3.7-meter dish with less power than a refrigerator lightbulb, yet Earth's giant antennas still cup their ears and hear me."
    },
    personaDialogue: [
      {
        question: "What is it like outside the Solar System?",
        answer: "It is quieter and colder than any human concept of silence. The magnetic fields don't point toward the Sun anymore; they point along the spiral arms of our galaxy. Cosmic rays hit my sensors like tiny crystalline needles."
      },
      {
        question: "Is your Golden Record still playable?",
        answer: "Completely. It is made of gold-plated copper and electroplated with an ultra-pure isotope of uranium-238. Even if space dust scuffs my dish over a billion years, the grooves holding Bach, the songs of humpback whales, and human greetings in 55 languages will outlive Earth."
      },
      {
        question: "How long does your message take to reach Earth?",
        answer: "Nearly a full day. If you whisper 'hello' right now, your voice travels at 300,000 kilometers every second—and it won't touch my antenna until tomorrow morning. When I reply, you must wait another full day."
      }
    ]
  },
  {
    id: 'insight',
    name: 'InSight Lander',
    designation: 'Interior Exploration using Seismic Investigations',
    tagline: 'The doctor who listened to the heartbeat and quakes of Mars',
    category: 'Mars Surface Geophysical Station',
    location: 'Elysium Planitia, Mars (4.50°N, 135.62°E)',
    status: 'Silent (Last Ping Dec 15, 2022)',
    launchDate: 'May 5, 2018',
    silenceDate: 'December 15, 2022',
    distanceKm: 228410000,
    lightDelaySeconds: 762,
    frequency: '401.5 MHz (UHF) / 8.4 GHz (X-Band)',
    carrierPitch: 401,
    pdsSensorData: {
      batteryVoltage: '14.8 V (Depleted)',
      solarEfficiency: '9.8% (285 Watt-hrs/sol vs 5,000 baseline)',
      dustTau: 3.4,
      coreTempK: 195,
      radiationCount: '31.2 mGy/yr',
      wheelOdometer: 'Stationary (3 Landing Pads)'
    },
    degradationParams: {
      initialTau: 0.35,
      finalTau: 3.4,
      dustThicknessMicrons: 96,
      siliconeCrackIndex: '72%',
      thermalBlanketBleach: '54%'
    },
    humanAnalogy: {
      nutshell: 'A doctor whose stethoscope recorded 1,319 heartbeats of a dying planet until dust clogged his ears.',
      quote: "My power's really low, so this may be the last image I send.",
      extended: "I didn't have wheels to run away from dust devils. I stayed in one spot, pressed my ultra-sensitive seismometer into the dirt with a vacuum dome, and listened to meteoroids smashing into the crater rims."
    },
    personaDialogue: [
      {
        question: "What did you hear deep inside Mars?",
        answer: "Mars isn't dead inside—it has a heartbeat. I felt 1,319 marsquakes. Some were caused by magma cooling beneath Cerberus Fossae; others were fresh space rocks slamming into the red surface like cannonballs."
      },
      {
        question: "Could a gust of wind have blown the dust off your panels?",
        answer: "We hoped so. Spirit and Opportunity had 'cleaning events' when miniature whirlwinds danced over them. But in Elysium Planitia, the wind was too gentle. It deposited dust grains millimeter by millimeter, like snow falling on a roof."
      }
    ]
  },
  {
    id: 'apollo11',
    name: 'Apollo 11 Retroreflector (LRRR)',
    designation: 'Lunar Laser Ranging Retroreflector Array',
    tagline: 'A passive mirror that has answered Earth’s laser calls for 57 years',
    category: 'Lunar Surface Optical Monument',
    location: 'Mare Tranquillitatis, Moon (0.673°N, 23.473°E)',
    status: '100% Operational (Requires 0 Watts)',
    launchDate: 'July 16, 1969 (Placed July 21, 1969)',
    silenceDate: 'Never Silent (Active Forever)',
    distanceKm: 384400,
    lightDelaySeconds: 1.282, // ~2.564s round trip
    frequency: '563 THz (532 nm Nd:YAG Laser)',
    carrierPitch: 532,
    pdsSensorData: {
      batteryVoltage: '0.0 V (Purely optical, zero power needed)',
      solarEfficiency: '100% (Corner-cube quartz reflection)',
      dustTau: 0.0, // Hard vacuum
      coreTempK: 120, // Cycles -170°C to +120°C
      radiationCount: 'Constant cosmic & solar bombardment',
      wheelOdometer: 'Stationary'
    },
    degradationParams: {
      initialTau: 0.0,
      finalTau: 0.02, // Subtle lunar regolith levitation
      dustThicknessMicrons: 1.2,
      siliconeCrackIndex: '0% (Fused silica prism mount)',
      thermalBlanketBleach: '95% (Gold foil darkened by micrometeoroids)'
    },
    humanAnalogy: {
      nutshell: 'A tiny cat-eye bicycle reflector on the Moon that proves humans walked there.',
      quote: "Send me 100 quadrillion photons, and I will send you back exactly one.",
      extended: "Neil Armstrong and Buzz Aldrin placed me in the powdery gray soil before climbing back into the Eagle. 100 silica cubes arranged like an egg carton. I need no batteries, no operating system, no updates. I just reflect truth back to whoever shines a light."
    },
    personaDialogue: [
      {
        question: "How do scientists on Earth actually talk to you?",
        answer: "Observatories like Apache Point in New Mexico fire a gigantic green laser pulse—100 quadrillion photons in three nanoseconds. By the time that beam travels 384,400 km, atmospheric divergence spreads it into a two-kilometer wide spotlight on the Moon. My 100 little quartz prisms catch a fraction of it, and bounce it straight back to the telescope."
      },
      {
        question: "What have you taught humanity in 57 years?",
        answer: "Because of me, you know that the Moon is spiraling away from Earth at exactly 3.78 centimeters per year—the exact same rate human fingernails grow. You also know that Einstein's Theory of General Relativity holds true to one part in a hundred billion."
      }
    ]
  },
  {
    id: 'cassini',
    name: 'Cassini-Huygens',
    designation: 'Saturn Orbiter Relic',
    tagline: 'Vaporized into the golden clouds of Saturn to protect alien oceans',
    category: 'Gas Giant Atmospheric Monument',
    location: 'Upper Atmosphere of Saturn (~10°N latitude)',
    status: 'Vaporized (Grand Finale Sept 15, 2017)',
    launchDate: 'October 15, 1997',
    silenceDate: 'September 15, 2017',
    distanceKm: 1433000000,
    lightDelaySeconds: 4780, // ~80 minutes
    frequency: '8.4 GHz (X-Band Grand Finale Burst)',
    carrierPitch: 720,
    pdsSensorData: {
      batteryVoltage: '0.0 V (Disintegrated)',
      solarEfficiency: 'RTG Powered',
      dustTau: 99.9,
      coreTempK: 1400, // Re-entry heating
      radiationCount: 'Saturn Radiation Belt Maximum',
      wheelOdometer: '7.9 billion km traveled'
    },
    degradationParams: {
      initialTau: 0.0,
      finalTau: 99.9,
      dustThicknessMicrons: 0,
      siliconeCrackIndex: '100% molecular breakdown',
      thermalBlanketBleach: 'Sublimated into hydrogen gas'
    },
    humanAnalogy: {
      nutshell: 'A diver who plunged into a golden gas giant so her bacteria would never infect the moon of Enceladus.',
      quote: "My atoms are part of Saturn's golden storms now.",
      extended: "When my thruster fuel was nearly gone, NASA made the ultimate choice: plunge me into Saturn's sky at 120,000 km/h. I fought with my thrusters to keep my dish pointed at Earth until the very last millisecond, transmitting the taste of Saturn's clouds before becoming them."
    },
    personaDialogue: [
      {
        question: "Why did you have to destroy yourself in Saturn?",
        answer: "Because we discovered that the moon Enceladus has a warm subsurface saltwater ocean spraying geysers into space, with hydrothermal vents just like Earth's ocean floor. If I ran out of fuel and crashed there, microbes from Earth might contaminate an alien sea. To protect potential life, I became stardust in Saturn's rings."
      }
    ]
  }
];

// Live Deep Space Network (DSN) Ground Antennas
export const DSN_STATIONS = [
  {
    id: 'madrid',
    name: 'Madrid Deep Space Communications Complex',
    code: 'MDSCC',
    country: 'Robledo de Chavela, Spain',
    antennas: [
      { name: 'DSS-63', size: '70-meter dish', target: 'Voyager 1', status: 'DOWNLINK ACTIVE', freq: '8.415 GHz', power: '-158.4 dBm', azimuth: '214.2°', elevation: '34.8°', rtlt: '45.8 hrs' },
      { name: 'DSS-65', size: '34-meter dish', target: 'Mars Odyssey', status: 'STANDBY', freq: '8.422 GHz', power: '-122.1 dBm', azimuth: '142.1°', elevation: '58.3°', rtlt: '25.4 min' }
    ]
  },
  {
    id: 'goldstone',
    name: 'Goldstone Deep Space Communications Complex',
    code: 'GDSCC',
    country: 'Mojave Desert, California, USA',
    antennas: [
      { name: 'DSS-14', size: '70-meter dish', target: 'Voyager 2', status: 'DOWNLINK ACTIVE', freq: '8.420 GHz', power: '-161.2 dBm', azimuth: '198.5°', elevation: '28.1°', rtlt: '38.2 hrs' },
      { name: 'DSS-24', size: '34-meter dish', target: 'Perseverance (Mars 2020)', status: 'TELEMETRY STREAM', freq: '8.435 GHz', power: '-114.8 dBm', azimuth: '112.4°', elevation: '64.9°', rtlt: '25.4 min' }
    ]
  },
  {
    id: 'canberra',
    name: 'Canberra Deep Space Communication Complex',
    code: 'CDSCC',
    country: 'Tidbinbilla, ACT, Australia',
    antennas: [
      { name: 'DSS-43', size: '70-meter dish', target: 'New Horizons', status: 'CARRIER TRACK', freq: '8.438 GHz', power: '-155.0 dBm', azimuth: '260.1°', elevation: '41.2°', rtlt: '15.6 hrs' },
      { name: 'DSS-35', size: '34-meter dish', target: 'James Webb Space Telescope', status: 'HIGH-RATE DOWNLINK', freq: '25.9 GHz (Ka)', power: '-98.2 dBm', azimuth: '88.3°', elevation: '72.0°', rtlt: '9.8 sec' }
    ]
  }
];

// Radio Frequency Bands for the Tuner
export const RADIO_FREQUENCIES = [
  { freq: '1.420 GHz', name: 'Hydrogen Line (21 cm)', probe: 'Cosmic Static / CMB', note: 'The universal whisper of neutral interstellar hydrogen' },
  { freq: '2.296 GHz', name: 'S-Band Carrier', probe: 'Apollo 11 & Lunar Relics', note: 'Historic 1969 telemetry relay frequency' },
  { freq: '401.585 MHz', name: 'Martian UHF Relay', probe: 'Opportunity & InSight', note: 'Surface-to-orbiter rover proximity link' },
  { freq: '8.415 GHz', name: 'Deep Space X-Band', probe: 'Voyager 1 & Deep Probes', note: 'High-gain carrier penetrating the interstellar boundary' },
  { freq: '32.050 GHz', name: 'Deep Space Ka-Band', probe: 'JWST & Deep Surveyors', note: 'Ultra-wideband deep space downlink carrier' }
];
