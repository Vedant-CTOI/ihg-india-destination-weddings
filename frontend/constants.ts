import { Destination, HotelProperty, RealWeddingCase, VisualiseFunctionData, WeddingGenreInfo } from './types';

export const WEDDING_GENRES_DATA: WeddingGenreInfo[] = [
  {
    id: 'royal-wedding',
    genre: 'Royal Wedding',
    tagline: 'Palatial Splendor, Torchlit Ramparts & Grand Pageantry',
    vibe: 'Imperial Majesty & Feudal Court Protocol',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    heroSnippet: 'Centuries-old stone stepwells, ceremonial elephant entries, and heraldic dholis beneath torchlit arches.',
    editorial: 'A regal celebration curated around timeless chivalric traditions. From grand processional Baraats led by vintage motorcades and caparisoned horses, to 4-hour sacred Vedic Havans framed by carved stone amphitheaters and starlit banquets with royal maestros.',
    weddingAtmosphere: 'Dignified feudal grandeur with antique brass filigree, cascading marigold arches, velvet diwan floor seating, and torchlit ramparts overlooking ancient valleys.',
    signatureRituals: ['Stepwell Sunset Pheras', 'Grand Processional Baraat with Live Dholis', 'Royal Starlit Gala Feast', 'Zanana Torchlit Mehendi'],
    recommendedSeason: 'Autumn & Winter (Crisp evenings and temperate ceremonial hours)',
    idealScale: 'Mid to Monumental (150 – 1,500+ guests)',
    readiness: {
      havanFireSpace: {
        title: 'Consecrated Open-Air Stone Hearth',
        detail: 'Engineered stone courtyards certified for 4-hour sacred Vedic fire rituals with wind dampers.',
        verified: true
      },
      baraatRoute: {
        title: 'Grand Processional Avenue',
        detail: 'Wide, ascending 800-meter paved roadway suited for vintage motorcades, horses, and percussion ensembles.',
        verified: true
      },
      dietarySegregation: {
        title: 'Dedicated Sattvic & Royal Jain Kitchens',
        detail: 'Physically walled-off satellite kitchens with independent dishwashing lines and zero onion/garlic pantry lines.',
        verified: true
      },
      lateNightAcoustics: {
        title: 'Acoustically Insulated Pillarless Ballrooms',
        detail: 'Acoustic treatment engineered up to 98dB for sunrise-facing Sangeet celebrations without curfew interruption.',
        verified: true
      },
      vipSuites: {
        title: 'Private Family Sanctuary Villas',
        detail: 'Multi-room sprawling suites with private courtyards for intimate pre-ceremony blessings and styling.',
        verified: true
      }
    }
  },
  {
    id: 'beachside',
    genre: 'Beachside',
    tagline: 'Barefoot Luxury, Ocean-Breeze Mandaps & Golden Hour Vows',
    vibe: 'Sun-Drenched Coastal Ease & Barefoot Romance',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    heroSnippet: 'Swaying coconut palm canopies, crashing surf, and minimalist driftwood altars facing golden horizons.',
    editorial: 'An effortless, soul-calming celebration where ceremonial grandeur harmonizes with relaxed seaside elegance. Exchange solemn vows on pristine sands with gentle tide rhythms, followed by lantern-lit beach banquets and starlit coastal afterparties.',
    weddingAtmosphere: 'Organic bohemian minimalism: bleached driftwood pillars, fresh local jasmine garlands, macramé lanterns, linen attire, and candlelit shoreline paths.',
    signatureRituals: ['Barefoot Sunset Mandap Vows', 'Tropical Poolside Haldi Carnival', 'Open-Air Seafood & Coconut Grill Soiree', 'Starlit Beach Club Sangeet'],
    recommendedSeason: 'Winter & Early Spring (Clear blue skies, balmy sea breezes and golden sunsets)',
    idealScale: 'Intimate to Grand (100 – 650 guests)',
    readiness: {
      havanFireSpace: {
        title: 'Wind-Shielded Shoreline Mandap Deck',
        detail: 'Marine-grade transparent glass windscreens protecting sacred Havan flames from coastal breezes.',
        verified: true
      },
      baraatRoute: {
        title: 'Palm-Fringed Coastal Boulevard',
        detail: 'Paved ocean-facing driveway accommodating open-top classic jeeps, floral buggies, and brass bands.',
        verified: true
      },
      dietarySegregation: {
        title: 'Dual Coastal & Vegetarian Galleys',
        detail: 'Simultaneous execution of pure vegetarian regional thalis alongside world-class coastal seafood counters.',
        verified: true
      },
      lateNightAcoustics: {
        title: 'Indoor Sea Club & Soundproof Ballrooms',
        detail: 'State-licensed sound-insulated indoor venues enabling uninterrupted celebrations beyond outdoor curfew hours.',
        verified: true
      },
      vipSuites: {
        title: 'Sea-Facing Bridal Pavilions',
        detail: 'Direct private beach lawn access for golden-hour portraits and serene pre-wedding tranquility.',
        verified: true
      }
    }
  },
  {
    id: 'mountain-wilderness',
    genre: 'Mountain & Wilderness',
    tagline: 'Alpine Riverbeds, Pine Valleys & Himalayan Clean Air',
    vibe: 'Crisp Foothills Air & Riverside Quietude',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    heroSnippet: 'Rushing mountain streams, pebble riverbanks, and open forest clearings framed by alpine ridges.',
    editorial: 'Intimate, grounding, and soul-stirring. Designed for couples seeking sanctuary in nature. Exchange vows next to flowing holy waters beneath tall pines, followed by bonfire dinners with acoustic guitars and crisp mountain evenings.',
    weddingAtmosphere: 'Understated organic luxury: natural river-stone accents, wild pine foliage, warm open hearths, hand-woven shawls for guests, and fairy lights woven through ancient trees.',
    signatureRituals: ['Riverside Pebble Deck Muhurtham', 'Pine Forest Welcome High-Tea', 'Lantern-Lit Meadow Reception', 'Campfire Acoustic Sangeet'],
    recommendedSeason: 'Autumn & Spring (Pleasant crisp mountain days with cool starry nights)',
    idealScale: 'Boutique to Mid-Sized (80 – 350 guests)',
    readiness: {
      havanFireSpace: {
        title: 'Riverside Stone Altar Hearth',
        detail: 'Engineered stone platform set along flowing waters certified for traditional morning mantras and Vedic fires.',
        verified: true
      },
      baraatRoute: {
        title: 'Pine-Fringed Wilderness Drive',
        detail: '1-kilometer scenic mountain road welcoming traditional Dhol ensembles and folk percussionists.',
        verified: true
      },
      dietarySegregation: {
        title: 'Organic Farm-to-Table & Jain Pantries',
        detail: 'Fresh seasonal mountain produce paired with strictly quarantined pure vegetarian and Sattvic kitchens.',
        verified: true
      },
      lateNightAcoustics: {
        title: 'Sound-Isolated Timber Lodge',
        detail: 'Acoustically buffered indoor hall allowing late-night celebration without disturbing forest tranquility.',
        verified: true
      },
      vipSuites: {
        title: 'Private River-View Chalets',
        detail: 'Secluded luxury cottages providing calm wellness spaces and Ayurvedic styling prep.',
        verified: true
      }
    }
  },
  {
    id: 'temple-shoreline',
    genre: 'Temple Shoreline',
    tagline: 'Granite Temple Kulam, Carved Pillars & Sacred Waters',
    vibe: 'Sacred Dravidian Architecture & Spiritual Calm',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    heroSnippet: 'Granite stone pillar courtyards, sacred lotus reflection ponds, and gentle ocean mist.',
    editorial: 'Steeped in classical temple aesthetics and spiritual serenity. Crafted around sacred water kulams and Dravidian granite architecture, offering early-morning Nadaswaram Muhurthams followed by authentic banana-leaf feasts.',
    weddingAtmosphere: 'Reverent spiritual beauty: heavy brass temple lamps, lotus-strewn water ponds, pure silk draping, sacred stone pavilions, and fragrant tuberose garlands.',
    signatureRituals: ['Lotus Pond Sunrise Muhurtham', 'Traditional 28-Course Banana Leaf Sadya', 'Classical Nadaswaram & Carnatic High-Tea', 'Pillarless Ballroom Gala'],
    recommendedSeason: 'Winter (Pleasant morning sea mist and temperate coastal warmth)',
    idealScale: 'Mid to Grand (150 – 600 guests)',
    readiness: {
      havanFireSpace: {
        title: 'Granite Stone Temple Kulam Platform',
        detail: 'Authentic stone platform engineered specifically for traditional early-morning Muhurthams.',
        verified: true
      },
      baraatRoute: {
        title: 'Bougainvillea Ceremonial Driveway',
        detail: 'Spacious paved boulevard suitable for regal elephant, horse, or vintage motorcade processions.',
        verified: true
      },
      dietarySegregation: {
        title: 'Traditional Plantain Leaf Kitchen Galleys',
        detail: 'Pure brass service setups with specialized chefs flown in for authentic regional and Jain banquets.',
        verified: true
      },
      lateNightAcoustics: {
        title: 'Dual Pillarless Banquet Halls',
        detail: 'Sound dampening engineered to accommodate vibrant percussion bands and high-fidelity DJ sets.',
        verified: true
      },
      vipSuites: {
        title: 'Bay-View Presidential Pool Villas',
        detail: 'Spacious drawing rooms ideal for traditional Kanyadaan blessings and multi-family gatherings.',
        verified: true
      }
    }
  },
  {
    id: 'backwater-serenity',
    genre: 'Backwater Serenity',
    tagline: 'Emerald Waterways, Flotilla Baraats & Spice Groves',
    vibe: 'Tropical Sanctuary & Unhurried Waterways',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
    heroSnippet: 'Floating mandap decks on tranquil waters, ceremonial boat flotillas, and spice-scented lawns.',
    editorial: 'A serene celebration woven along peaceful tropical waterways. Arrive for your vows via ceremonial floral Shikaras, exchange promises on floating piers enveloped by palms, and celebrate with organic coastal cuisine.',
    weddingAtmosphere: 'Lush tropical serenity: water lilies, natural teak wood furniture, earthen clay lamps, flowing natural linens, and rhythmic Chenda Melam drum processions.',
    signatureRituals: ['Waterway Shikara Boat Baraat', 'Floating Pier Sunset Mandap', 'Royal Sadya with Organically Farmed Spices', 'Lakeside Lantern Banquet'],
    recommendedSeason: 'Autumn & Winter (Calm waters, balmy tropical warmth and gentle breezes)',
    idealScale: 'Intimate to Mid-Sized (100 – 500 guests)',
    readiness: {
      havanFireSpace: {
        title: 'Waterfront Floating Mandap Pier',
        detail: 'Timber pier with 360-degree water views and integrated fire-safe ceremonial hearths.',
        verified: true
      },
      baraatRoute: {
        title: 'Ceremonial Waterway Flotilla Baraat',
        detail: 'Decorated floral Shikara flotillas escorting groom and family with traditional Chenda Melam drummers.',
        verified: true
      },
      dietarySegregation: {
        title: 'Authentic Regional & Global Kitchens',
        detail: 'Traditional multi-course feasts prepared with organically farmed spices alongside international counters.',
        verified: true
      },
      lateNightAcoustics: {
        title: 'Sound-Insulated Lagoon Ballrooms',
        detail: 'State-regulated indoor entertainment zones allowing celebratory acoustic and electronic music.',
        verified: true
      },
      vipSuites: {
        title: 'Private Plunge Pool Heritage Cottages',
        detail: 'Dedicated wellness specialists offering pre-wedding Ayurvedic treatments for the bridal entourage.',
        verified: true
      }
    }
  }
];

export const DESTINATIONS_DATA: Destination[] = [
  {
    id: 'rajasthan',
    name: 'Rajasthan',
    genre: 'Royal Wedding',
    tagline: 'Palaces, Fortresses & Heritage Citadels',
    vibe: 'Royal Heritage Grandeur',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    heroSnippet: '14th-century stepwells, torchlit ramparts, and ceremonial courtyards beneath starlit skies.',
    editorial: 'Restored royal citadels blending medieval Rajputana stone craft with bespoke bridal sanctuaries, private plunge pools, and consecrated open-air havan platforms.',
    signatureVenues: ['Royal Stepwell Amphitheater', 'Zanana Mahal Courtyard', 'Aravalli Hilltop Terraces'],
    climateWindow: 'Oct – Mar (18°C – 26°C)',
    readiness: {
      havanFireSpace: {
        title: 'Consecrated Open-Air Havan',
        detail: 'Engineered stone courtyards certified for 4-hour sacred Vedic fire rituals.',
        verified: true
      },
      baraatRoute: {
        title: 'Grand Processional Route',
        detail: '800m stone driveway for vintage motorcades and live percussion.',
        verified: true
      },
      dietarySegregation: {
        title: 'Dedicated Sattvic & Jain Kitchens',
        detail: 'Isolated culinary lines with strict zero onion/garlic pantry protocols.',
        verified: true
      },
      lateNightAcoustics: {
        title: 'Sound-Insulated Ballrooms',
        detail: 'Pillarless halls engineered for high-energy Sangeets until late hours.',
        verified: true
      },
      vipSuites: {
        title: 'Private Family Villas',
        detail: 'Expansive multi-room sanctuaries for private family rituals.',
        verified: true
      }
    }
  },
  {
    id: 'goa',
    name: 'Goa',
    genre: 'Beachside',
    tagline: 'Barefoot Luxury & Oceanfront Lawns',
    vibe: 'Barefoot Coastal Elegance',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    heroSnippet: 'Oceanfront lawns fringed by palms, where sunset mandaps meet golden Arabian shores.',
    editorial: 'Seaside ease harmonized with understated luxury. Seamlessly transition from a sun-dappled pool brunch to an oceanfront sunset Phera and barefoot starlit banquets.',
    signatureVenues: ['Horizon Beach Lawn', 'Portuguese Manor Hall', 'Palm Grove Deck'],
    climateWindow: 'Nov – Feb (24°C – 29°C)',
    readiness: {
      havanFireSpace: {
        title: 'Wind-Shielded Mandap Deck',
        detail: 'Marine-grade glass windscreens protecting sacred flames on the coast.',
        verified: true
      },
      baraatRoute: {
        title: 'Palm-Lined Entry Avenue',
        detail: 'Wide ocean-breeze boulevard welcoming open-top vintage entries.',
        verified: true
      },
      dietarySegregation: {
        title: 'Dual Regional Kitchen Galleys',
        detail: 'Pure vegetarian regional thalis alongside coastal seafood stations.',
        verified: true
      },
      lateNightAcoustics: {
        title: 'Indoor Sea Club Space',
        detail: 'Licensed indoor party venues for after-hours celebrations.',
        verified: true
      },
      vipSuites: {
        title: 'Sea-Facing Bridal Pavilions',
        detail: 'Direct beach access for private golden-hour portraits.',
        verified: true
      }
    }
  },
  {
    id: 'ncr-corbett',
    name: 'Corbett & Foothills',
    genre: 'Mountain & Wilderness',
    tagline: 'Forest Valleys, Riverbeds & Himalayan Foothills',
    vibe: 'Wilderness & Riverside Serenity',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    heroSnippet: 'Pristine mountain streams, pebble riverbanks, and open forest canopies framed by mountain peaks.',
    editorial: 'Quiet, secluded luxury in the Himalayan foothills. Clean crisp air, riverside pebble decks for sunrise mantras, and lantern-lit meadow receptions with mountain acoustics.',
    signatureVenues: ['River Kosi Pebble Meadow', 'Foothill Forest Canopy', 'Glasshouse Wilderness Pavilion'],
    climateWindow: 'Oct – Apr (14°C – 24°C)',
    readiness: {
      havanFireSpace: {
        title: 'Open Sky Riverfront Platform',
        detail: 'Natural stone hearth built alongside flowing waters for consecrated rituals.',
        verified: true
      },
      baraatRoute: {
        title: 'Riverbank Forest Drive',
        detail: 'Scenic 1-kilometer pine-fringed route welcoming folk percussion.',
        verified: true
      },
      dietarySegregation: {
        title: 'Mountain Organic & Jain Pantries',
        detail: 'Fresh seasonal mountain produce paired with strictly quarantined pure vegetarian and Sattvic kitchens.',
        verified: true
      },
      lateNightAcoustics: {
        title: 'Sound-Isolated Alpine Lodge',
        detail: 'Acoustically buffered indoor hall allowing celebrations without forest disturbance.',
        verified: true
      },
      vipSuites: {
        title: 'Private Forest Chalets',
        detail: 'River-view secluded cottages offering bridal entourage calm.',
        verified: true
      }
    }
  },
  {
    id: 'mahabalipuram',
    name: 'Mahabalipuram',
    genre: 'Temple Shoreline',
    tagline: 'Granite Temple Pillars & Ocean Lotus Waters',
    vibe: 'Dravidian Shoreline Serenity',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    heroSnippet: 'Granite temple accents, lotus reflection ponds, and gentle sea mist along the Bay of Bengal.',
    editorial: 'Just 45 minutes from Chennai, featuring stone pillar courtyards, traditional Dravidian temple kulams, and manicured lawns directly overlooking the Bay of Bengal.',
    signatureVenues: ['Lotus Pond Courtyard', 'Oceanfront Sagar Lawn', 'Coromandel Ballroom'],
    climateWindow: 'Dec – Feb (22°C – 28°C)',
    readiness: {
      havanFireSpace: {
        title: 'Granite Temple Kulam',
        detail: 'Stone platforms built for traditional sunrise Vedic Muhurthams.',
        verified: true
      },
      baraatRoute: {
        title: 'Bougainvillea Driveway',
        detail: 'Spacious avenue suited for ceremonial horse-drawn entries.',
        verified: true
      },
      dietarySegregation: {
        title: 'Traditional South Indian Galleys',
        detail: 'Authentic plantain leaf setups and dedicated pure vegetarian pantries.',
        verified: true
      },
      lateNightAcoustics: {
        title: 'Acoustic Pillarless Hall',
        detail: 'High-fidelity acoustic isolation for vibrant percussion and DJ sets.',
        verified: true
      },
      vipSuites: {
        title: 'Ocean Pool Pavilions',
        detail: 'Private drawing rooms for intimate Kanyadaan blessings.',
        verified: true
      }
    }
  },
  {
    id: 'kerala',
    name: 'Kerala',
    genre: 'Backwater Serenity',
    tagline: 'Emerald Waterways & Coconut Palms',
    vibe: 'Tropical Backwater Calm',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
    heroSnippet: 'Spice-scented waterways, wooden boat flotillas, and tranquil island vows wrapped in lush greenery.',
    editorial: 'For couples seeking quiet soulfulness. Gentle backwaters, coconut groves, and heritage colonial design for an unhurried, multi-day restorative celebration.',
    signatureVenues: ['Island Mandap Pier', 'Colonial Courtyard', 'Sunset Water Amphitheater'],
    climateWindow: 'Oct – Mar (23°C – 29°C)',
    readiness: {
      havanFireSpace: {
        title: 'Waterfront Floating Mandap Pier',
        detail: 'Timber pier with 360-degree water views and integrated fire-safe ceremonial hearths.',
        verified: true
      },
      baraatRoute: {
        title: 'Ceremonial Boat Flotilla',
        detail: 'Decorated floral Shikara boats escorting the groom with Chenda Melam.',
        verified: true
      },
      dietarySegregation: {
        title: 'Royal Sadya & Global Menus',
        detail: '24-item traditional Sadya prepared alongside continental live stations.',
        verified: true
      },
      lateNightAcoustics: {
        title: 'Sound-Treated Ballrooms',
        detail: 'Indoor halls allowing late-night celebration without exterior noise.',
        verified: true
      },
      vipSuites: {
        title: 'Heritage Water Cottages',
        detail: 'Ayurvedic wellness suites for bridal entourage preparation.',
        verified: true
      }
    }
  }
];

export const HOTELS_DATA: HotelProperty[] = [
  {
    id: 'six-senses-fort-barwara',
    name: 'Six Senses Fort Barwara',
    brand: 'Six Senses',
    location: 'Ranthambore, Rajasthan',
    city: 'Ranthambore',
    region: 'Rajasthan',
    genre: 'Royal Wedding',
    capacityMin: 80,
    capacityMax: 300,
    roomsCount: 48,
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
    priceBand: 'Ultra Luxury Heritage',
    keyHighlights: ['14th-century royal fortress', 'Ancient stepwell ceremony site', 'Dedicated guest butlers'],
    mandapType: 'Heritage Stepwell with Floating Candles',
    airportDistance: '2.5 hrs from Jaipur International Airport',
    aboutUs: 'Sensitively transformed from a 14th-century fort originally owned by the Rajasthani Royal Family. Six Senses Fort Barwara features two ancient palaces, two consecrated original temples, and 48 suites overlooking the tranquil Aravalli hills. Every celebration here is steeped in royal conservation, Rajputana stone craft, and consecrated sacred rituals.',
    overview: 'Sensitively transformed from a 14th-century fort originally owned by the Rajasthani Royal Family. Features two ancient palaces, two original temples, and 48 suites overlooking the Aravalli hills.',
    curatedSpaces: [
      {
        name: 'Venue 1: Barwara Stepwell Amphitheater',
        capacity: '180 Guests (Ceremonial Mandap)',
        type: 'Open-Air Sacred Stepwell',
        description: 'An ancient carved stone stepwell tier surrounded by hand-carved jali stone arches and candlelit reflecting pools. Designed specifically for sacred Vedic Pheras and sunrise havan rituals under open skies.',
        amenities: ['Floating lotus hearth', 'Acoustic dampers for mantras', 'Discrete royal bridal entry bridge', 'Underground cool air ducts'],
        draftLayoutTitle: 'Venue 1: Draft Drawing Layout & Seating Blueprint',
        draftLayoutImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        layoutNotes: 'Tiered radial amphitheater seating centered around the 14th-century sacred stone hearth with 360-degree guest sightlines.',
        gallery: [
          'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80'
        ]
      },
      {
        name: 'Venue 2: Zanana Palace Torchlit Courtyard',
        capacity: '260 Guests (Seated Banquet)',
        type: 'Imperial Palace Courtyard',
        description: 'The historic women’s palace courtyard surrounded by hand-chiseled sandstone walls and flickering flaming braziers. Ideal for torchlit Sangeets, Mehendi brunches, and fine-dining royal feasts.',
        amenities: ['Flame braziers & candle niches', 'Acoustic sound-shell stage', 'Dedicated satellite royal pantry', 'Covered marble verandahs'],
        draftLayoutTitle: 'Venue 2: Draft Drawing Layout & Seating Blueprint',
        draftLayoutImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
        layoutNotes: 'Dual arcade banquet layout with central royal runway, live folk orchestra stage, and peripheral satellite dining pantries.',
        gallery: [
          'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80'
        ]
      },
      {
        name: 'Venue 3: Aravalli Hilltop Ramparts Lawn',
        capacity: '320 Guests (Sunset Reception)',
        type: 'Fortress Panoramic Terraces',
        description: 'Perched high on the fort ramparts with 360-degree panoramic views of Ranthambore wilderness and Aravalli mountain ranges. Perfect for sunset cocktail receptions and starlit banquets.',
        amenities: ['High-elevation valley panorama', 'Bespoke Sommelier cocktail bar', 'Starlit banquet staging', 'Dedicated guest transit buggies'],
        draftLayoutTitle: 'Venue 3: Draft Drawing Layout & Seating Blueprint',
        draftLayoutImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=1200&q=80',
        layoutNotes: 'Curved terrace cocktail layout with elevated sommelier bar stations, panoramic cliff-edge glass safety rails, and central dining cluster.',
        gallery: [
          'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1000&q=80'
        ]
      }
    ],
    culinaryHighlights: ['Farm-to-table organic Rajasthani thalis', 'Certified segregated Sattvic & Jain kitchens', 'Bespoke Sommelier-paired courtyard dinners']
  },
  {
    id: 'crowne-plaza-greater-noida',
    name: 'Crowne Plaza Greater Noida',
    brand: 'Crowne Plaza',
    location: 'Delhi NCR',
    city: 'Delhi NCR',
    region: 'NCR / Corbett',
    genre: 'Royal Wedding',
    capacityMin: 250,
    capacityMax: 1500,
    roomsCount: 398,
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80',
    priceBand: 'Grand Scale Royal',
    keyHighlights: ['51,000 sq.ft banquet spaces', 'Pillarless mega hall', 'Dedicated satellite kitchens'],
    mandapType: 'All-Weather Monumental Glasshouse Pavilion',
    airportDistance: '60 mins from Indira Gandhi International Airport, New Delhi',
    aboutUs: 'The flagship mega-celebration destination in North India. Crowne Plaza Greater Noida houses 51,000 sq.ft of banquet grounds, 398 luxury keys, and three physically isolated culinary wings. Built to execute large-scale multi-thousand wedding productions with zero logistical bottleneck.',
    overview: 'The largest luxury convention and celebration address in Delhi NCR, capable of hosting grand productions, palatial Baraats, and extensive royal setups with ease.',
    curatedSpaces: [
      {
        name: 'Venue 1: Grand Crystal Pillarless Arena',
        capacity: '1,400 Guests (Mega Gala)',
        type: 'Monumental Pillarless Hall',
        description: 'North India’s most monumental pillarless ballroom with 28-foot ceiling clearance, heavy rigging points for kinetic stage productions, and direct multi-door motorcade entry.',
        amenities: ['28-ft ceiling rigging grids', 'Full acoustic sound isolation', 'Simultaneous banquet service corridors', 'VIP dignitary private holding rooms'],
        draftLayoutTitle: 'Venue 1: Draft Drawing Layout & Seating Blueprint',
        draftLayoutImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        layoutNotes: 'Pillarless rectilinear grid plan featuring a monumental 60-ft concert stage, wide central ceremonial aisle, and four dedicated banquet galleys.',
        gallery: [
          'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80'
        ]
      },
      {
        name: 'Venue 2: All-Weather Glasshouse Pavilion',
        capacity: '600 Guests (Daytime Pheras)',
        type: 'Climate-Controlled Glass Atrium',
        description: 'An architectural glasshouse providing 360-degree garden vistas while fully sealed with high-capacity climate conditioning. Seamless for day-time Vedic ceremonies.',
        amenities: ['100% weather-proof glass dome', 'Temperature regulated', 'Natural daylight photography', 'Integrated sacred fire ventilation'],
        draftLayoutTitle: 'Venue 2: Draft Drawing Layout & Seating Blueprint',
        draftLayoutImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
        layoutNotes: 'Circular glasshouse layout with elevated central mandap dais, tiered concentric guest seating, and dedicated smoke ventilation dampers.',
        gallery: [
          'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=1000&q=80'
        ]
      },
      {
        name: 'Venue 3: Central Verdant Lawns & Amphitheater',
        capacity: '1,200 Guests (Baraat & Reception)',
        type: 'Manicured Celebration Meadows',
        description: 'Expansive open-sky lawns flanked by water fountains, offering a 1-kilometer private avenue for grand motorcade Baraats and monumental evening wedding receptions.',
        amenities: ['1-km processional avenue', 'Tiered amphitheater seating', 'Outdoor live culinary islands', 'Heavy power load grid connections'],
        draftLayoutTitle: 'Venue 3: Draft Drawing Layout & Seating Blueprint',
        draftLayoutImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=1200&q=80',
        layoutNotes: 'Sprawling outdoor lawn plan with twin peripheral buffet corridors, central elevated couple stage, and dedicated brass band arrival plaza.',
        gallery: [
          'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1000&q=80'
        ]
      }
    ],
    culinaryHighlights: ['Triple-isolated kitchens: Pure Jain, Halal, and Continental', '24-hour celebration catering', 'Master sweet-makers on site']
  },
  {
    id: 'crowne-plaza-resort-goa',
    name: 'Crowne Plaza Resort Goa',
    brand: 'Crowne Plaza',
    location: 'Arossim Beach, South Goa',
    city: 'Goa',
    region: 'Goa',
    genre: 'Beachside',
    capacityMin: 120,
    capacityMax: 650,
    roomsCount: 185,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    priceBand: 'Coastal Luxury',
    keyHighlights: ['30-acre landscaped beachfront', 'Tropical tiered lagoons', 'Private beach lawn'],
    mandapType: 'Ocean-Breeze Floral Canopy with Sunset Horizon',
    airportDistance: '20 mins from Dabolim International Airport',
    aboutUs: 'A pristine 30-acre coastal estate along the untouched white sands of Arossim in South Goa. Crowne Plaza Resort Goa merges traditional Portuguese-Goan manor architecture with sprawling oceanfront lawns, coconut groves, and multi-tier lagoon pools, providing a calm sanctuary for multi-day seaside celebrations.',
    overview: 'A sprawling 30-acre coastal estate along pristine white sands of Arossim, fusing Portuguese-Goan heritage with modern event infrastructure and beachfront intimacy.',
    curatedSpaces: [
      {
        name: 'Venue 1: Arossim Oceanfront Beach Deck',
        capacity: '500 Guests (Sunset Vows)',
        type: 'Barefoot Beachfront Setting',
        description: 'Direct shoreline wooden deck with marine-grade glass windscreens ensuring undisturbed sacred Havan flames while listening to the rhythm of Arabian Sea waves.',
        amenities: ['Direct white sand access', 'Marine wind-shields for havan', 'Sunset golden hour orientation', 'Acoustic sitar staging platform'],
        draftLayoutTitle: 'Venue 1: Draft Drawing Layout & Seating Blueprint',
        draftLayoutImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        layoutNotes: 'Direct beachfront timber deck layout with west-facing sunset mandap orientation, transparent wind barriers, and bamboo guest lounge rows.',
        gallery: [
          'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1000&q=80'
        ]
      },
      {
        name: 'Venue 2: Tropical Palm Grove Lawn',
        capacity: '650 Guests (Grand Sangeet / Reception)',
        type: 'Landscaped Coconut Grove',
        description: 'Shaded by towering coconut palms with landscaped manicured turf, ideal for high-energy tropical Garba, colorful Mehendi carnivals, and grand starlit wedding receptions.',
        amenities: ['Natural palm canopy coverage', 'Integrated fairy light rigging', 'Cocktail bar gazebos', 'Spacious buffet lawn walkways'],
        draftLayoutTitle: 'Venue 2: Draft Drawing Layout & Seating Blueprint',
        draftLayoutImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
        layoutNotes: 'Meandering tropical lawn scheme with central performance dance floor, four corner cocktail cabanas, and perimeter food street bazaar.',
        gallery: [
          'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1000&q=80'
        ]
      },
      {
        name: 'Venue 3: Portuguese Manor Pillarless Hall',
        capacity: '380 Guests (Soundproof Afterparty)',
        type: 'Indoor Acoustic Ballroom',
        description: 'Designed with heritage Goan-Portuguese arches and certified acoustic insulation up to 98dB, allowing midnight DJ parties and energetic Sangeets without outdoor disturbance.',
        amenities: ['98dB acoustic soundproofing', 'Club lighting rig & LED wall', 'Dedicated spirits bar zone', 'Private VIP entrance'],
        draftLayoutTitle: 'Venue 3: Draft Drawing Layout & Seating Blueprint',
        draftLayoutImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=1200&q=80',
        layoutNotes: 'Indoor clubbing blueprint with elevated DJ booth, sunken illuminated dance floor, and acoustic buffer corridors ensuring sound containment.',
        gallery: [
          'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80'
        ]
      }
    ],
    culinaryHighlights: ['Goan Portuguese fusion catering', 'Midnight street-food bazaar counters', 'Multi-regional live vegetarian chaat galleys']
  },
  {
    id: 'holiday-inn-resort-goa',
    name: 'Holiday Inn Resort Goa',
    brand: 'Holiday Inn Resort',
    location: 'Mobor Beach, Goa',
    city: 'Goa',
    region: 'Goa',
    genre: 'Beachside',
    capacityMin: 150,
    capacityMax: 550,
    roomsCount: 205,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
    priceBand: 'Seaside Resort Luxury',
    keyHighlights: ['Direct Mobor beach access', 'Goan-Portuguese architecture', 'Expansive 20,000 sq.ft lawn'],
    mandapType: 'Minimalist Driftwood & Marigold Mandap',
    airportDistance: '60 mins from Dabolim International Airport',
    aboutUs: 'Situated on the idyllic southern tip of Mobor Beach, Holiday Inn Resort Goa offers direct beach access, sprawling 20,000 sq.ft private lawns, and warm hospitality for relaxed multi-generational celebrations.',
    overview: 'Prime location at Mobor Beach with endless ocean frontage, sweeping lawns, and warm hospitality for relaxed multi-generational seaside celebrations.',
    curatedSpaces: [
      {
        name: 'Venue 1: Mobor Beachfront Lawn',
        capacity: '550 Guests (Wedding Vows)',
        type: 'Expansive Sea Lawn',
        description: 'Overlooking pristine Mobor sands with unobstructed views of the sunset horizon. Perfect for floral driftwood mandap ceremonies.',
        amenities: ['Direct beach boardwalk', 'Fire-safe mandap perimeter', 'Illuminated palm pathways', 'Outdoor live grills'],
        draftLayoutTitle: 'Venue 1: Draft Drawing Layout & Seating Blueprint',
        draftLayoutImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        layoutNotes: 'Direct beachfront grass expanse arrangement with central floral mandap platform and parallel dining marquees.',
        gallery: [
          'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1000&q=80'
        ]
      },
      {
        name: 'Venue 2: The Figueiredo Ballroom',
        capacity: '350 Guests (Indoor Banqueting)',
        type: 'Colonial Pillarless Hall',
        description: 'Graceful colonial hall with timber ceiling details and modern acoustic dampening for indoor dinners, Sangeets, and bad-weather backup.',
        amenities: ['Pillarless sightlines', 'Acoustically insulated', 'Pre-function cocktail foyer', 'Dedicated service kitchen'],
        draftLayoutTitle: 'Venue 2: Draft Drawing Layout & Seating Blueprint',
        draftLayoutImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
        layoutNotes: 'Formal indoor banquet scheme with 10-seater round table arrangements and elevated bridal family head table.',
        gallery: [
          'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1000&q=80'
        ]
      },
      {
        name: 'Venue 3: Sunset Sand Dune Deck',
        capacity: '200 Guests (Intimate Cocktails)',
        type: 'Elevated Beachfront Terrace',
        description: 'An elevated wooden deck nestled among sea dunes, designed for welcome high-teas, intimate mehendi circles, and evening jazz cocktails.',
        amenities: ['Elevated ocean panorama', 'Custom bar gazebos', 'Lounge cabana seating', 'Barefoot access ramp'],
        draftLayoutTitle: 'Venue 3: Draft Drawing Layout & Seating Blueprint',
        draftLayoutImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=1200&q=80',
        layoutNotes: 'Cocktail lounge layout with perimeter high-top tables, shaded daybed cabanas, and centralized circular bar counter.',
        gallery: [
          'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=1000&q=80'
        ]
      }
    ],
    culinaryHighlights: ['Beachfront BBQ and tandoor grills', 'Authentic North Indian halwai counters', 'Tropical cocktail bars']
  },
  {
    id: 'corbett-riverside-resort',
    name: 'Crowne Plaza Corbett Foothills Lodge',
    brand: 'Crowne Plaza',
    location: 'Jim Corbett, Uttarakhand',
    city: 'Jim Corbett',
    region: 'NCR / Corbett',
    genre: 'Mountain & Wilderness',
    capacityMin: 80,
    capacityMax: 350,
    roomsCount: 120,
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    priceBand: 'Wilderness Luxury',
    keyHighlights: ['Direct River Kosi frontage', 'Himalayan mountain backdrop', 'Lantern-lit forest amphitheater'],
    mandapType: 'Riverside Pebble Deck with Pine Needle Canopy',
    airportDistance: '2.5 hrs from Pantnagar Airport / 4.5 hrs from New Delhi',
    aboutUs: 'Enclosed between the pristine waters of River Kosi and dense Himalayan Sal pine forests. Crowne Plaza Corbett Foothills Lodge is designed for nature-immersed ceremonies where pure mountain air, flowing river mantras, and quiet luxury form the celebration core.',
    overview: 'Nestled between the gushing Kosi River and dense Sal forests, offering a serene alpine sanctuary for intimate ceremonies immersed in mountain quietude.',
    curatedSpaces: [
      {
        name: 'Venue 1: River Kosi Pebble Bank',
        capacity: '250 Guests (Sacred Riverside Vows)',
        type: 'Flowing Riverfront Stone Platform',
        description: 'A natural pebble stone platform right on the edge of River Kosi. Perfect for sunrise Vedic Muhurthams with sacred water chanting and pine garlands.',
        amenities: ['Direct river soundscape', 'Stone fire hearth', 'Natural pebble amphitheater', 'Mountain backdrop vista'],
        draftLayoutTitle: 'Venue 1: Draft Drawing Layout & Seating Blueprint',
        draftLayoutImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        layoutNotes: 'Riverbank amphitheater layout following the natural pebble curve, with water-level sacred fire altar and wooden log seating.',
        gallery: [
          'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1000&q=80'
        ]
      },
      {
        name: 'Venue 2: Pine View Forest Amphitheater',
        capacity: '300 Guests (Lantern Meadow Reception)',
        type: 'Open Forest Clearing',
        description: 'A verdant grass clearing surrounded by hundred-year-old Sal trees. Accommodates bonfire dinners, live Sufi concerts, and lantern-lit feasts.',
        amenities: ['Central fire pits & braziers', 'Fairy light forest canopies', 'Outdoor tandoor galleys', 'Hand-woven blanket stations'],
        draftLayoutTitle: 'Venue 2: Draft Drawing Layout & Seating Blueprint',
        draftLayoutImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
        layoutNotes: 'Forest glade setup featuring central stone bonfire circle, perimeter live tandoor stations, and rustic banquet trestle tables.',
        gallery: [
          'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80'
        ]
      },
      {
        name: 'Venue 3: Himalayan Cedar Hall',
        capacity: '280 Guests (Alpine Sangeet)',
        type: 'Sound-Isolated Timber Ballroom',
        description: 'Constructed from natural cedar wood and stone, offering a warm alpine environment fully soundproofed for lively evening entertainment.',
        amenities: ['Stone wood-burning fireplaces', 'Timber acoustic paneling', 'Full sound insulation', 'Heated indoor climate'],
        draftLayoutTitle: 'Venue 3: Draft Drawing Layout & Seating Blueprint',
        draftLayoutImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=1200&q=80',
        layoutNotes: 'Alpine wooden hall arrangement with acoustic buffer corridors, raised wooden stage, and integrated fireplace lounge clusters.',
        gallery: [
          'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80'
        ]
      }
    ],
    culinaryHighlights: ['Organic Kumaoni regional delicacies', 'Riverside live coal braziers and tandoors', 'Certified pure Sattvic kitchen lines']
  },
  {
    id: 'intercon-chennai-mahabalipuram',
    name: 'InterContinental Chennai Mahabalipuram',
    brand: 'InterContinental',
    location: 'Mahabalipuram, Tamil Nadu',
    city: 'Mahabalipuram',
    region: 'Mahabalipuram',
    genre: 'Temple Shoreline',
    capacityMin: 150,
    capacityMax: 600,
    roomsCount: 105,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    priceBand: 'Luxury Flagship',
    keyHighlights: ['Direct beachfront lawns', 'Central lotus reflection pond', 'Grand 600-guest ballroom'],
    mandapType: 'Lotus Pond Open-Sky Mandap with Shoreline Views',
    airportDistance: '45 mins from Chennai International Airport',
    aboutUs: 'An architectural tribute to the Dravidian temple architecture of the 7th century, set amidst 15 acres of casuarina groves fronting the Bay of Bengal. InterContinental Chennai Mahabalipuram blends sacred granite reflection ponds with beachfront lawns and authentic regional dining mastery.',
    overview: 'An architectural tribute to the Dravidian temple architecture of the 7th century, set amidst 15 acres of casuarina groves fronting the Bay of Bengal.',
    curatedSpaces: [
      {
        name: 'Venue 1: The Lotus Pond Kulam Courtyard',
        capacity: '350 Guests (Sacred Muhurtham)',
        type: 'Granite Temple Reflection Pond',
        description: 'Centered around a temple-style open water kulam filled with blooming water lilies and floating brass lamps. Purpose-built for sunrise Vedic ceremonies and Nadaswaram ensembles.',
        amenities: ['Stone kulam water altar', 'Plantain leaf seating pavilions', 'Heavy brass lamp fixtures', 'Acoustic stone colonnades'],
        draftLayoutTitle: 'Venue 1: Draft Drawing Layout & Seating Blueprint',
        draftLayoutImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        layoutNotes: 'Temple courtyard water pavilion layout with lotus pool walkways, perimeter stone colonnade seating, and pure plantain leaf banquet lines.',
        gallery: [
          'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80'
        ]
      },
      {
        name: 'Venue 2: Sagar Oceanfront Lawn',
        capacity: '600 Guests (Coastal Reception)',
        type: 'Casuarina Grove Ocean Lawn',
        description: 'Fronting the Bay of Bengal and surrounded by casuarina groves, providing space for grand evening receptions and open-air multi-course banquets.',
        amenities: ['Direct ocean shoreline frontage', 'Sea breeze airflow design', 'Dedicated live seafood & grill setups', 'Illuminated stone pillars'],
        draftLayoutTitle: 'Venue 2: Draft Drawing Layout & Seating Blueprint',
        draftLayoutImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
        layoutNotes: 'Beachfront lawn arrangement with coastal stage oriented towards sea breeze, dual beverage galleys, and separate Sattvic dining marquee.',
        gallery: [
          'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80'
        ]
      },
      {
        name: 'Venue 3: Coromandel Grand Ballroom',
        capacity: '450 Guests (Gala Sangeet)',
        type: 'Pillarless Indoor Hall',
        description: 'A pillarless hall featuring high acoustic dampening, custom crystal chandeliers, and expansive pre-function spaces for indoor gala events.',
        amenities: ['Pillarless sightlines', 'Acoustic isolation', 'Dual banquet galleys', 'Attached bridal glam suite'],
        draftLayoutTitle: 'Venue 3: Draft Drawing Layout & Seating Blueprint',
        draftLayoutImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=1200&q=80',
        layoutNotes: 'Pillarless grand ballroom floorplan with integrated audio-visual rigging, performance stage with green rooms, and direct foyer access.',
        gallery: [
          'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1000&q=80'
        ]
      }
    ],
    culinaryHighlights: ['Authentic 28-course Elai Sadya on banana leaves', 'Dedicated Coastal Seafood live grills', 'Separate pure vegetarian banquet line']
  },
  {
    id: 'crowne-plaza-kochi',
    name: 'Crowne Plaza Kochi',
    brand: 'Crowne Plaza',
    location: 'Kochi, Kerala',
    city: 'Kochi',
    region: 'Kerala',
    genre: 'Backwater Serenity',
    capacityMin: 100,
    capacityMax: 500,
    roomsCount: 269,
    image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80',
    priceBand: 'Waterfront Luxury',
    keyHighlights: ['Panoramic backwater views', 'Private boat jetty for Baraat', 'Authentic Sadya master chefs'],
    mandapType: 'Floating Backwater Island Mandap',
    airportDistance: '40 mins from Cochin International Airport',
    aboutUs: 'Commanding uninterrupted views of tranquil Vembanad waters with a private boat jetty. Crowne Plaza Kochi offers a slow, restorative backwater sanctuary for couples seeking floating pier mandaps and authentic Kerala ceremonial feasts.',
    overview: 'Overlooking tranquil Vembanad waters with dedicated private boat jetties, ideal for water-borne baraats and soul-calming rituals.',
    curatedSpaces: [
      {
        name: 'Venue 1: Backwater Floating Island Pier',
        capacity: '300 Guests (Floating Mandap)',
        type: 'Waterfront Timber Pier',
        description: 'An open-air wooden pier extending into the backwaters, allowing couples to exchange vows completely surrounded by gentle waters and coconut groves.',
        amenities: ['360-degree water views', 'Private boat arrival jetty', 'Integrated fire-safe hearth', 'Acoustic wind baffling'],
        draftLayoutTitle: 'Venue 1: Draft Drawing Layout & Seating Blueprint',
        draftLayoutImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        layoutNotes: 'Waterfront pier scheme featuring boat embarkation docks, central fire-safe floating mandap platform, and teak lounge benches.',
        gallery: [
          'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80'
        ]
      },
      {
        name: 'Venue 2: Travancore Grand Hall',
        capacity: '500 Guests (Water-Facing Ballroom)',
        type: 'Panoramic Water Ballroom',
        description: 'Floor-to-ceiling glass windows facing the backwaters, blending indoor luxury with scenic lagoon panoramas for banquets and celebrations.',
        amenities: ['Waterfront floor-to-ceiling glass', 'Acoustically treated ballroom', 'Independent banquet galleys', 'Sound-isolated dance floor'],
        draftLayoutTitle: 'Venue 2: Draft Drawing Layout & Seating Blueprint',
        draftLayoutImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
        layoutNotes: 'Lagoon-facing hall layout with floor-to-ceiling panoramic glass facade, modular partition wings, and independent banquet galleys.',
        gallery: [
          'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80'
        ]
      },
      {
        name: 'Venue 3: Spice Route Botanical Garden',
        capacity: '250 Guests (Garden Mehendi)',
        type: 'Lush Botanical Courtyard',
        description: 'Fragrant with natural cinnamon and pepper vines, offering a relaxed courtyard for shaded henna afternoons, high-teas, and cocktail gatherings.',
        amenities: ['Botanical spice garden canopy', 'Traditional brass oil lamps', 'Live fresh coconut bar', 'Ayurvedic tea lounge'],
        draftLayoutTitle: 'Venue 3: Draft Drawing Layout & Seating Blueprint',
        draftLayoutImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=1200&q=80',
        layoutNotes: 'Botanical garden plan with shaded canopy cabanas for bridal henna, natural stone walkways, and Ayurvedic tea tasting counters.',
        gallery: [
          'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1000&q=80'
        ]
      }
    ],
    culinaryHighlights: ['Royal Syrian Christian and Kerala Hindu authentic menus', 'Fresh backwater seafood live griddle', 'Traditional brass lamp high-tea']
  }
];

export const REAL_WEDDINGS_DATA: RealWeddingCase[] = [
  {
    id: 'ananya-karthik',
    couple: 'Ananya & Karthik',
    title: 'The Coromandel Confluence',
    location: 'Mahabalipuram, Tamil Nadu',
    property: 'InterContinental Chennai Mahabalipuram',
    genre: 'Temple Shoreline',
    guestCount: 380,
    coverImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80'
    ],
    culturalConfluence: 'Tamil Brahmin Vedic Muhurtham & Punjabi Sangeet',
    resolutionStory: 'Two parallel experiences: an alcohol-free, certified Sattvic dining wing for the sunrise Muhurtham, followed by a soundproofed glasshouse ballroom transformation for the midnight Sangeet.',
    timelineHighlights: [
      { time: '06:15 AM', ritual: 'Sunrise Muhurtham & Vedic Havan', space: 'Temple Courtyard' },
      { time: '12:30 PM', ritual: '28-Course Elai Sadya Banquet', space: 'Sagar Pavilion' },
      { time: '08:30 PM', ritual: 'Coromandel Sangeet & Live Percussion', space: 'Ballroom' }
    ],
    coupleTestimonial: '“Both our families had their heritage honored without a single logistical clash.”'
  },
  {
    id: 'rohan-elena',
    couple: 'Rohan & Elena',
    title: 'Rajputana Meets French Provence',
    location: 'Ranthambore, Rajasthan',
    property: 'Six Senses Fort Barwara',
    genre: 'Royal Wedding',
    guestCount: 160,
    coverImage: 'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=80'
    ],
    culturalConfluence: 'Marwari Protocol & European Minimalist Dining',
    resolutionStory: 'An understated desert-flora mandap paired with a dual-course banquet serving French seasonal plates and traditional Rajasthani dishes side by side.',
    timelineHighlights: [
      { time: '05:00 PM', ritual: 'Stepwell Candlelight Cocktails', space: 'Fort Stepwell' },
      { time: '04:30 PM', ritual: 'Sunset Pheras', space: 'Zenana Courtyard' },
      { time: '08:00 PM', ritual: 'Starlit Banquet with Folk Maestros', space: 'Palace Terrace' }
    ],
    coupleTestimonial: '“Authentic palace grandeur with effortless elegance and dietary comfort for all.”'
  },
  {
    id: 'priya-sid',
    couple: 'Priya & Siddharth',
    title: 'Barefoot Coastal Euphoria',
    location: 'Arossim Beach, Goa',
    property: 'Crowne Plaza Resort Goa',
    genre: 'Beachside',
    guestCount: 290,
    coverImage: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80'
    ],
    culturalConfluence: 'Gujarati Dandiya Garba & Barefoot Beach Vows',
    resolutionStory: 'An acoustically contained lawn tent for night-one Garba, transitioning to a serene ocean-facing bamboo mandap at sunset with acoustic sitar.',
    timelineHighlights: [
      { time: '07:30 PM', ritual: 'Coastal Garba & Street Bazaar', space: 'Grand Lawn' },
      { time: '10:30 AM', ritual: 'Poolside Haldi Splash', space: 'Lagoon Deck' },
      { time: '05:15 PM', ritual: 'Sunset Beach Vows & Pheras', space: 'Private Beach' }
    ],
    coupleTestimonial: '“A joyous holiday wrapped into the most romantic celebration of our lives.”'
  },
  {
    id: 'kabir-meera',
    couple: 'Kabir & Meera',
    title: 'Himalayan Foothills Sanctuary',
    location: 'Jim Corbett, Uttarakhand',
    property: 'Crowne Plaza Corbett Foothills Lodge',
    genre: 'Mountain & Wilderness',
    guestCount: 180,
    coverImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80'
    ],
    culturalConfluence: 'Kashmiri Pandit Rituals & Punjabi Anand Karaj Traditions',
    resolutionStory: 'A morning riverside ceremony along the Kosi River with pine garlands and traditional Dejhor blessings, followed by an evening cedar hall celebration with live sufiyana qawwali under warm lanterns.',
    timelineHighlights: [
      { time: '07:00 AM', ritual: 'Pebble Bank Sunrise Mantras & Pheras', space: 'River Kosi Deck' },
      { time: '01:00 PM', ritual: 'Traditional Kashmiri Wazwan Feast', space: 'Pine Forest Lawn' },
      { time: '08:00 PM', ritual: 'Alpine Fireplace Sangeet Soirée', space: 'Cedar Hall' }
    ],
    coupleTestimonial: '“The mountain silence and flowing river created a sacred energy that felt deeply eternal.”'
  },
  {
    id: 'vikram-sunaina',
    couple: 'Vikram & Sunaina',
    title: 'Vembanad Waterway Flotilla',
    location: 'Kochi Backwaters, Kerala',
    property: 'Crowne Plaza Kochi',
    genre: 'Backwater Serenity',
    guestCount: 220,
    coverImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80'
    ],
    culturalConfluence: 'Kerala Nair Muhurtham & European Black-Tie Waterfront Reception',
    resolutionStory: 'Groom and entourage arrived via a fleet of 6 decorated wooden Shikaras accompanied by traditional Chenda Melam percussion, culminating in a floating island mandap vows exchange at golden hour.',
    timelineHighlights: [
      { time: '04:00 PM', ritual: 'Waterway Flotilla Baraat Arrival', space: 'Private Boat Jetty' },
      { time: '05:30 PM', ritual: 'Floating Island Mandap Sunset Vows', space: 'Island Pier' },
      { time: '08:00 PM', ritual: 'Grand Backwater Gala Dinner', space: 'Travancore Hall' }
    ],
    coupleTestimonial: '“Gliding into our vows across the silent backwaters was the most breathtaking moment of our lives.”'
  },
  {
    id: 'dev-natasha',
    couple: 'Dev & Natasha',
    title: 'The Monumental Capital Gala',
    location: 'Delhi NCR',
    property: 'Crowne Plaza Greater Noida',
    genre: 'Royal Wedding',
    guestCount: 1100,
    coverImage: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80'
    ],
    culturalConfluence: 'High-Society Grand Rajput Pageantry & Global NRI Confluence',
    resolutionStory: 'A monumental 1,100-guest celebration spanning 51,000 sq.ft of banquet grounds with simultaneous segregated Jain, Halal, and continental confectionery lines, featuring a 1-km Baraat avenue and 24-hr sound isolation.',
    timelineHighlights: [
      { time: '06:00 PM', ritual: 'Grand 1-Km Motorcade Baraat', space: 'Central Driveway' },
      { time: '07:30 PM', ritual: 'All-Weather Glasshouse Pheras', space: 'Glasshouse Pavilion' },
      { time: '09:30 PM', ritual: 'Monumental Arena Banquet & Concert', space: 'Crystal Arena' }
    ],
    coupleTestimonial: '“Executing a wedding of over a thousand guests without a single queue or dietary hitch was pure mastery.”'
  },
  {
    id: 'tara-neil',
    couple: 'Tara & Neil',
    title: 'Mobor Sands Sunset Vows',
    location: 'Mobor Beach, Goa',
    property: 'Holiday Inn Resort Goa',
    genre: 'Beachside',
    guestCount: 340,
    coverImage: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80'
    ],
    culturalConfluence: 'Parsi Wedding Blessings & Goan Seaside Reception',
    resolutionStory: 'A traditional evening Achu Michu ceremony on ocean lawns with fragrant white rose and jasmine garlands, transitioning into a coastal feast with vintage Goan live music under palm canopies.',
    timelineHighlights: [
      { time: '05:00 PM', ritual: 'Sunset Parsi Wedding Blessings', space: 'Mobor Ocean Lawn' },
      { time: '07:00 PM', ritual: 'Beachfront Cocktail & Coastal Grill', space: 'Beach Deck' },
      { time: '09:00 PM', ritual: 'Grand Starlit Banquet', space: 'Figueiredo Ballroom' }
    ],
    coupleTestimonial: '“The relaxed warmth of Mobor Beach made both our families feel completely at home.”'
  },
  {
    id: 'aditi-samir',
    couple: 'Aditi & Samir',
    title: 'The Aravalli Fortress Vows',
    location: 'Ranthambore, Rajasthan',
    property: 'Six Senses Fort Barwara',
    genre: 'Royal Wedding',
    guestCount: 210,
    coverImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=1200&q=80'
    ],
    culturalConfluence: 'Bengali Biye Traditions & Rajasthani Royal Hospitality',
    resolutionStory: 'Subho Drishti and Saat Paake Ghaura performed on a heritage stone stepwell surrounded by hundreds of floating clay lamps, followed by a royal banquet featuring both authentic Bengali mustard fish and Rajasthani Dal Baati.',
    timelineHighlights: [
      { time: '06:00 PM', ritual: 'Stepwell Subho Drishti & Pheras', space: 'Barwara Stepwell' },
      { time: '08:30 PM', ritual: 'Zanana Mahal Torchlit Feast', space: 'Zanana Courtyard' },
      { time: '11:00 PM', ritual: 'Rooftop Acoustic Folk Soirée', space: 'Palace Terrace' }
    ],
    coupleTestimonial: '“Our guests are still talking about the magical glow of the stepwell at night.”'
  }
];

export const VISUALISE_FUNCTIONS: VisualiseFunctionData[] = [
  {
    id: 'wedding',
    label: 'Wedding (Pheras)',
    tagline: 'Sacred Mandap Transformation',
    venueName: 'Barwara Heritage Stepwell Amphitheater',
    property: 'Six Senses Fort Barwara, Rajasthan',
    rawImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1400&q=80',
    transformedImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80',
    decorTheme: 'Royal Vedic Mandap with Cascading Tuberose & Terracotta Diyas',
    lightingMood: 'Warm Amber Candlelight & Architectural Up-lights',
    keyElements: [
      'Floating lotus mandap on ancient stone tier',
      'Wind-shielded havan hearth certified for 4-hour rituals',
      'Pure brass bell installations and fresh marigold torans'
    ],
    guestLayout: 'Tiered stepwell seating with velvet bolsters (240 guests)'
  },
  {
    id: 'sangeet',
    label: 'Sangeet Night',
    tagline: 'High-Energy Sound & Glamour',
    venueName: 'Coromandel Grand Ballroom & Glass Atrium',
    property: 'InterContinental Chennai Mahabalipuram',
    rawImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=80',
    transformedImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1400&q=80',
    decorTheme: 'Kinetic Mirror Tunnel & Starlit Ceiling Canopy',
    lightingMood: 'Concert Moving Heads & Subdued Midnight Indigo',
    keyElements: [
      'Pillarless 360-degree LED performance stage',
      'Acoustically isolated dance arena (certified up to 98dB)',
      'Dual island cocktail bars flanking the main performance deck'
    ],
    guestLayout: 'Cabaret-style lounge seating with central dance floor (450 guests)'
  },
  {
    id: 'mehendi',
    label: 'Mehendi Brunch',
    tagline: 'Sun-Drenched Garden Festivities',
    venueName: 'Arossim Tropical Palm Grove',
    property: 'Crowne Plaza Resort Goa',
    rawImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1400&q=80',
    transformedImage: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1400&q=80',
    decorTheme: 'Artisanal Block-Print Canopies & Citrus Botanical Bazaars',
    lightingMood: 'Natural Coastal Daylight & Macramé Lanterns',
    keyElements: [
      'Shaded cane cabanas for bespoke bridal henna artists',
      'Live coconut water cart & cold-pressed regional mocktail bar',
      'Acoustic folk acoustic instrumental seating'
    ],
    guestLayout: 'Bespoke low-seating bohemian floor spreads (320 guests)'
  },
  {
    id: 'cocktail',
    label: 'Cocktail Night',
    tagline: 'Twilight Chic & Jazz Lounge',
    venueName: 'Zenana Palace Torchlit Ramparts',
    property: 'Six Senses Fort Barwara, Rajasthan',
    rawImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1400&q=80',
    transformedImage: 'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=1400&q=80',
    decorTheme: 'Monochrome Velvet Lounges with Minimalist Glass Pillars',
    lightingMood: 'Muted Flame Torches & Warm Filament Glow',
    keyElements: [
      'Elevated jazz band acoustic shell facing the valley',
      'Smoked single-malt tasting counter with bespoke ice carvings',
      'Heated outdoor braziers and stone terrace cocktail tables'
    ],
    guestLayout: 'High-top cocktail tables & intimate private pods (280 guests)'
  },
  {
    id: 'reception',
    label: 'Grand Reception',
    tagline: 'Regal Banqueting Splendor',
    venueName: 'Grand Crystal Pillarless Arena',
    property: 'Crowne Plaza Greater Noida, Delhi NCR',
    rawImage: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1400&q=80',
    transformedImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1400&q=80',
    decorTheme: 'Symphony in White & Gold Crystal Chandelier Forest',
    lightingMood: 'Architectural Pin-Spots & Champagne Perimeter Wash',
    keyElements: [
      'Curved royal presidential dining tables with brass chargers',
      'Four dedicated satellite live kitchens for multi-course service',
      'Grand orchestral acoustic platform'
    ],
    guestLayout: 'Formal round-table banquet arrangement (850 guests)'
  }
];
