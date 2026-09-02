export interface LandmarkDetail {
  name: string;
  description: string;
  image: string;
  tag: string;
}

export interface CityInfo {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  continent: string;
  flag: string;
  lat: number;
  lon: number;
  description: string;
  highlights: string[];
  bestTimeToVisit: string;
  weather: string;
  rating: number;
  image: string;
  heroImage?: string;
  famousFor: string;
  landmarksDetail?: LandmarkDetail[];
  cuisineImage?: string;
}

export const WORLD_CITIES: CityInfo[] = [
  // =========================================================================
  // 🇮🇳 INDIA (7 Top Famous Holiday / Visited Places)
  // =========================================================================
  {
    id: 'hyderabad-in',
    name: 'Hyderabad',
    country: 'India',
    countryCode: 'IN',
    continent: 'Asia',
    flag: '🇮🇳',
    lat: 17.3850,
    lon: 78.4867,
    description: 'The historic City of Pearls and Nizams, where centuries of royal Qutb Shahi heritage meet the buzzing cyber metropolis. Famous for the 400-year-old Charminar, Golconda diamonds, and world-renowned authentic Hyderabadi Dum Biryani.',
    highlights: ['Charminar & Laad Bazaar Pearl Street', 'Golconda Fort Acoustic & Light Spectacle', 'Chowmahalla & Taj Falaknuma Royal Palaces', 'Hussain Sagar Lake & Monolithic Buddha'],
    bestTimeToVisit: 'Oct – Mar',
    weather: 'Pleasant & Breezy • 27°C',
    rating: 4.97,
    image: '/images/charminar.jpg',
    heroImage: '/images/charminar.jpg',
    famousFor: 'Charminar, Golconda Fort & Royal Nizami Biryani',
    cuisineImage: '/images/biryani.jpg',
    landmarksDetail: [
      {
        name: 'Charminar & Laad Bazaar',
        description: 'The 400-year-old iconic four-minaret monument built in 1591, surrounded by the dazzling heritage pearl and lac-bangle street markets of old Hyderabad.',
        image: '/images/charminar.jpg',
        tag: 'Architectural Wonder'
      },
      {
        name: 'Golconda Fort & Acoustic Whispering Gallery',
        description: 'The legendary medieval citadel and diamond capital where the Koh-i-Noor and Hope diamonds originated, famous for ingenious acoustics and sweeping hilltop vistas.',
        image: 'https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=800&q=80',
        tag: 'Diamond Fort Heritage'
      },
      {
        name: 'Qutb Shahi Royal Tombs',
        description: 'The majestic domed mausoleums set amidst manicured Persian gardens, honoring the founding royal dynasty of Hyderabad.',
        image: 'https://images.unsplash.com/photo-1626544827763-d516dce335e2?auto=format&fit=crop&w=800&q=80',
        tag: 'Royal Dynastic Tombs'
      },
      {
        name: 'Chowmahalla & Taj Falaknuma Palaces',
        description: 'Opulent Asaf Jahi palaces adorned with crystal chandeliers, vintage royal car collections, and grand Durbar halls of the Nizams.',
        image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
        tag: 'Nizam Royal Palace'
      }
    ]
  },
  {
    id: 'agra-in',
    name: 'Agra',
    country: 'India',
    countryCode: 'IN',
    continent: 'Asia',
    flag: '🇮🇳',
    lat: 27.1751,
    lon: 78.0421,
    description: 'Home to the iconic Taj Mahal, one of the Seven Wonders of the World. Agra is bathed in rich Mughal architectural heritage, white marble craftsmanship, and grand fortresses along the Yamuna River.',
    highlights: ['Taj Mahal Sunrise View', 'Agra Fort Red Sandstone Palaces', 'Mehtab Bagh Moonlight Garden', 'Fatehpur Sikri Royal Complex'],
    bestTimeToVisit: 'Oct – Mar',
    weather: 'Warm & Pleasant • 25°C',
    rating: 4.99,
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'Taj Mahal & Mughal Splendor',
    landmarksDetail: [
      {
            name: "Taj Mahal Sunrise View",
            description: "The world-renowned white marble mausoleum built by Mughal Emperor Shah Jahan, glowing in ethereal pink and gold hues during sunrise.",
            image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80",
            tag: "World Wonder"
      },
      {
            name: "Agra Fort Red Sandstone Palaces",
            description: "The colossal 16th-century Mughal fortress of red sandstone, featuring the Jahangiri Mahal, Diwan-i-Khas, and marble pavilions overlooking the Yamuna.",
            image: "https://images.unsplash.com/photo-1592635196078-9fdc757f27f4?auto=format&fit=crop&w=800&q=80",
            tag: "Imperial Fortress"
      },
      {
            name: "Mehtab Bagh Moonlight Garden",
            description: "The historic Charbagh complex situated directly across the Yamuna River, offering the ultimate mirror reflection and sunset silhouettes of the Taj Mahal.",
            image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
            tag: "Sunset Viewpoint"
      },
      {
            name: "Fatehpur Sikri Royal Complex",
            description: "Emperor Akbar’s preserved red sandstone ghost city, home to the towering Buland Darwaza gate and the white marble Tomb of Salim Chishti.",
            image: "https://images.unsplash.com/photo-1585136917631-5079633c7f99?auto=format&fit=crop&w=800&q=80",
            tag: "Mughal Capital"
      }
]
  },
  {
    id: 'jaipur-in',
    name: 'Jaipur',
    country: 'India',
    countryCode: 'IN',
    continent: 'Asia',
    flag: '🇮🇳',
    lat: 26.9124,
    lon: 75.7873,
    description: 'The legendary "Pink City" of Rajasthan, famous for opulent hilltop palaces, geometric astronomical observatories, and vibrant handloom bazaars.',
    highlights: ['Hawa Mahal Palace of Winds', 'Amber Fort Elephant Ridge', 'City Palace Royal Quarters', 'Jantar Mantar Observatory'],
    bestTimeToVisit: 'Oct – Mar',
    weather: 'Pleasant & Sunny • 24°C',
    rating: 4.96,
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'Royal Palaces & Pink Sandstone Forts',
    landmarksDetail: [
      {
            name: "Hawa Mahal Palace of Winds",
            description: "The iconic 5-story pink sandstone facade with 953 intricately carved jharokha windows built in 1799 for royal women to observe street festivals.",
            image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
            tag: "Architectural Icon"
      },
      {
            name: "Amber Fort & Maota Lake",
            description: "Majestic hilltop fortress blending Rajput and Mughal architecture, featuring the dazzling Sheesh Mahal (Mirror Palace) and elephant pathways.",
            image: "https://images.unsplash.com/photo-1609766418204-94aae0ecfddc?auto=format&fit=crop&w=800&q=80",
            tag: "Hilltop Fortress"
      },
      {
            name: "City Palace Royal Quarters",
            description: "Opulent palace complex with peacock courtyards, royal armory museums, and the stunning Chandra Mahal still inhabited by the Jaipur royal family.",
            image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
            tag: "Royal Residence"
      },
      {
            name: "Jantar Mantar Astronomical Marvel",
            description: "UNESCO World Heritage observatory boasting nineteen architectural astronomical instruments, including the world’s largest stone sundial.",
            image: "https://images.unsplash.com/photo-1600100397608-f010f4438342?auto=format&fit=crop&w=800&q=80",
            tag: "Ancient Astronomy"
      }
]
  },
  {
    id: 'goa-in',
    name: 'Goa',
    country: 'India',
    countryCode: 'IN',
    continent: 'Asia',
    flag: '🇮🇳',
    lat: 15.2993,
    lon: 74.1240,
    description: 'India’s tropical coastal paradise celebrated for golden sun-drenched beaches, Portuguese colonial cathedrals, seaside spice plantations, and vibrant nightlife.',
    highlights: ['Palolem & Anjuna Beaches', 'Basilica of Bom Jesus', 'Dudhsagar Waterfalls', 'Sunset Catamaran Cruises'],
    bestTimeToVisit: 'Nov – Mar',
    weather: 'Tropical Warmth • 30°C',
    rating: 4.95,
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'Golden Beaches & Portuguese Heritage',
    landmarksDetail: [
      {
            name: "Palolem & Anjuna Golden Beaches",
            description: "Palm-fringed crescent bays with golden sands, turquoise Arabian Sea waters, beach shacks, and world-famous flea markets.",
            image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
            tag: "Golden Beach"
      },
      {
            name: "Basilica of Bom Jesus",
            description: "UNESCO World Heritage 16th-century Baroque church holding the sacred relics of St. Francis Xavier in Old Goa.",
            image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
            tag: "Portuguese Heritage"
      },
      {
            name: "Dudhsagar Four-Tiered Waterfalls",
            description: "Majestic 310-meter white cascade resembling a sea of milk rushing through the lush Western Ghats forest.",
            image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
            tag: "Jungle Waterfall"
      },
      {
            name: "Sunset Catamaran Yacht Cruise",
            description: "Luxury catamaran sailing along the Mandovi River with live Goan music, dolphins spotting, and sunset horizons.",
            image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
            tag: "Sunset Cruise"
      }
]
  },
  {
    id: 'delhi-in',
    name: 'New Delhi',
    country: 'India',
    countryCode: 'IN',
    continent: 'Asia',
    flag: '🇮🇳',
    lat: 28.6139,
    lon: 77.2090,
    description: 'The pulsating capital of India blending historic centuries-old Mughal bazaars with broad tree-lined avenues, ancient monuments, and world-class culinary streets.',
    highlights: ['Qutub Minar Complex', 'India Gate & Kartavya Path', 'Humayun’s Tomb', 'Chandni Chowk Food Trail'],
    bestTimeToVisit: 'Oct – Mar',
    weather: 'Sunny & Clear • 26°C',
    rating: 4.92,
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'Historical Monuments & Culinary Heritage',
    landmarksDetail: [
      {
            name: "Qutub Minar Red Sandstone Tower",
            description: "The world’s tallest brick minaret standing at 72.5 meters, surrounded by ancient 4th-century iron pillars and intricate calligraphy.",
            image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80",
            tag: "UNESCO Minaret"
      },
      {
            name: "India Gate & Kartavya Path",
            description: "The monumental 42-meter triumphal arch war memorial standing at the heart of New Delhi, illuminated with fountains at night.",
            image: "https://images.unsplash.com/photo-1592635196078-9fdc757f27f4?auto=format&fit=crop&w=800&q=80",
            tag: "National Memorial"
      },
      {
            name: "Humayun’s Tomb Persian Garden",
            description: "The grand red sandstone garden tomb of Emperor Humayun that served as the primary architectural inspiration for the Taj Mahal.",
            image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
            tag: "Mughal Architecture"
      },
      {
            name: "Chandni Chowk & Red Fort",
            description: "Centuries-old Mughal bazaar bustling with spice scents, heritage street food parathas, and the majestic Red Fort ramparts.",
            image: "https://images.unsplash.com/photo-1585136917631-5079633c7f99?auto=format&fit=crop&w=800&q=80",
            tag: "Historic Bazaars"
      }
]
  },
  {
    id: 'mumbai-in',
    name: 'Mumbai',
    country: 'India',
    countryCode: 'IN',
    continent: 'Asia',
    flag: '🇮🇳',
    lat: 19.0760,
    lon: 72.8777,
    description: 'The City of Dreams along the Arabian Sea coast, known for Bollywood glamour, Victorian Gothic architecture, and the legendary Marine Drive Queen’s Necklace.',
    highlights: ['Gateway of India', 'Marine Drive Sunset', 'Elephanta Caves', 'Chhatrapati Shivaji Terminus'],
    bestTimeToVisit: 'Nov – Feb',
    weather: 'Tropical Breeze • 29°C',
    rating: 4.93,
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'Coastal Glamour, Bollywood & Architecture',
    landmarksDetail: [
      {
            name: "Gateway of India",
            description: "The grand Indo-Saracenic basalt arch overlooking Mumbai Harbour, standing proudly opposite the iconic Taj Mahal Palace Hotel.",
            image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80",
            tag: "Harbour Monument"
      },
      {
            name: "Marine Drive Queen’s Necklace",
            description: "The 3.6-kilometer sweeping Arabian Sea promenade offering spectacular sunset vistas and illuminated night street lamps.",
            image: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&w=800&q=80",
            tag: "Sunset Promenade"
      },
      {
            name: "Elephanta Island Rock Caves",
            description: "UNESCO rock-cut cave temples dating to the 5th century featuring the colossal three-headed Maheshmurti sculpture of Shiva.",
            image: "https://images.unsplash.com/photo-1600100397608-f010f4438342?auto=format&fit=crop&w=800&q=80",
            tag: "Rock-Cut Temples"
      },
      {
            name: "Chhatrapati Shivaji Maharaj Terminus",
            description: "UNESCO Victorian Gothic masterpiece blending traditional Indian palace motifs with stone arches, stained glass, and turrets.",
            image: "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=800&q=80",
            tag: "Victorian Gothic"
      }
]
  },
  {
    id: 'bengaluru-in',
    name: 'Bengaluru',
    country: 'India',
    countryCode: 'IN',
    continent: 'Asia',
    flag: '🇮🇳',
    lat: 12.9716,
    lon: 77.5946,
    description: 'The vibrant Silicon Valley of India and historic Garden City, famed for the grand Neo-Dravidian Vidhana Soudha, royal Tudor-style Bangalore Palace, misty Nandi Hills cloud valleys, lush Lalbagh Botanical Gardens, and pioneering craft microbreweries.',
    highlights: ['Vidhana Soudha Neo-Dravidian Marvel', 'Bangalore Royal Palace & Durbar Hall', 'Nandi Hills Misty Sunrise Viewpoint', 'Lalbagh Botanical Gardens & 1889 Glass House', 'Cubbon Park & UB City Luxury Promenade'],
    bestTimeToVisit: 'Oct – Mar',
    weather: 'Pleasant & Breezy • 24°C',
    rating: 4.96,
    image: '/images/bengaluru_lake.png',
    heroImage: '/images/bengaluru_lake.png',
    famousFor: 'Lalbagh Lake, Vidhana Soudha, Royal Palace & Nandi Hills',
    landmarksDetail: [
      {
        name: 'Lalbagh Lake & Botanical Sanctuary',
        description: 'The scenic freshwater lake commissioned in 1760 with lush tree-lined embankments, migratory waterbird sanctuaries, and lotus ponds at the heart of the Garden City.',
        image: '/images/bengaluru_lake.png',
        tag: 'Garden Lake Sanctuary'
      },
      {
        name: 'Vidhana Soudha & Attara Kacheri',
        description: 'The monumental seat of Karnataka legislature built in 1956, constructed from pure Bangalore granite in magnificent Neo-Dravidian style and illuminated brilliantly at night.',
        image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80',
        tag: 'Architectural Wonder'
      },
      {
        name: 'Bangalore Royal Palace',
        description: 'The 19th-century royal residence inspired by England’s Windsor Castle, featuring Tudor revival turrets, wood carvings, stained glass, and historic royal Durbar hall.',
        image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80',
        tag: 'Royal Heritage'
      },
      {
        name: 'Nandi Hills Sunrise Fortress',
        description: 'The ancient 1,478-meter hilltop citadel perched above misty cloud inversions, celebrated for breathtaking sunrise vistas, Tipu’s Drop cliff face, and 1,000-year-old historic temples.',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        tag: 'Sunrise Cloud Valley'
      },
      {
        name: 'Lalbagh Botanical Gardens & Glass House',
        description: 'A 240-acre botanical haven commissioned by Hyder Ali in 1760, famous for ancient bonsai trees, lotus ponds, and the iconic London Crystal Palace-inspired 1889 Glass House.',
        image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
        tag: 'Botanical Sanctuary'
      },
      {
        name: 'Cubbon Park & UB City Promenade',
        description: 'The green lung of the city spanning 300 acres of bamboo groves, leading into the high-end open-air luxury retail and sky-lounge towers of UB City.',
        image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80',
        tag: 'Garden Metropolis'
      }
    ]
  },
  {
    id: 'kerala-in',
    name: 'Kerala & Kochi',
    country: 'India',
    countryCode: 'IN',
    continent: 'Asia',
    flag: '🇮🇳',
    lat: 9.9312,
    lon: 76.2673,
    description: 'God’s Own Country, globally acclaimed for tranquil palm-fringed backwaters, traditional luxury houseboats, Ayurvedic retreats, and fragrant spice hills of Munnar.',
    highlights: ['Alleppey Houseboat Backwaters', 'Munnar Tea Plantations', 'Fort Kochi Chinese Fishing Nets', 'Kathakali Classical Performance'],
    bestTimeToVisit: 'Sep – Mar',
    weather: 'Tropical Lush • 28°C',
    rating: 4.98,
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'Emerald Backwaters, Houseboats & Tea Valleys',
    landmarksDetail: [
      {
            name: "Alleppey Backwaters Houseboat",
            description: "Drifting gently through palm-fringed canals on a traditional thatched-roof Kettuvallam houseboat with fresh coastal meals.",
            image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
            tag: "Backwaters Luxury"
      },
      {
            name: "Munnar Emerald Tea Plantations",
            description: "Sprawling rolling hills blanketed in velvety green tea bushes, misty mountain valleys, and endangered Nilgiri Tahr wildlife.",
            image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=800&q=80",
            tag: "Tea Valleys"
      },
      {
            name: "Fort Kochi Chinese Fishing Nets",
            description: "Centuries-old cantilevered shoreline fishing nets silhouetted against glowing Arabian Sea sunsets, next to colonial spice warehouses.",
            image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
            tag: "Maritime Heritage"
      },
      {
            name: "Kathakali Classical Drama",
            description: "Vibrant classical dance performance with elaborate facial makeup, grand headdresses, and storytelling of ancient epics.",
            image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
            tag: "Classical Performing Art"
      }
]
  },
  {
    id: 'varanasi-in',
    name: 'Varanasi',
    country: 'India',
    countryCode: 'IN',
    continent: 'Asia',
    flag: '🇮🇳',
    lat: 25.3176,
    lon: 82.9739,
    description: 'The world’s oldest continuously inhabited city and spiritual heartbeat of India on the banks of the sacred River Ganga, famous for mesmerizing evening Ganga Aarti, sunrise boat rituals, and Banarasi silk.',
    highlights: ['Dashashwamedh Ghat Grand Ganga Aarti', 'Sunrise Boat Ride on Holy River Ganga', 'Kashi Vishwanath Golden Temple', 'Sarnath Sacred Buddhist Stupa'],
    bestTimeToVisit: 'Oct – Mar',
    weather: 'Pleasant & Spiritual • 24°C',
    rating: 4.98,
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'Sacred Ganga Ghats, Evening Aarti & Banarasi Silk',
    landmarksDetail: [
      {
            name: "Dashashwamedh Ghat Ganga Aarti",
            description: "The spectacular daily evening worship ceremony on the holy Ganga with synchronized flaming brass lamps, chanting, and incense.",
            image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80",
            tag: "Sacred Ritual"
      },
      {
            name: "Sunrise Boat Ride on Holy River Ganga",
            description: "Peaceful dawn boat cruise witnessing morning prayers, cremation ghats, centuries-old palaces, and golden reflections on the sacred river.",
            image: "https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=800&q=80",
            tag: "Dawn Cruise"
      },
      {
            name: "Kashi Vishwanath Golden Temple",
            description: "One of the twelve sacred Jyotirlingas, crowned by a 15.5-meter pure gold spire on the bank of the Ganges.",
            image: "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=800&q=80",
            tag: "Spiritual Center"
      },
      {
            name: "Sarnath Sacred Buddhist Stupa",
            description: "The sacred deer park where Lord Buddha preached his first sermon after attaining enlightenment, featuring the ancient Dhamek Stupa.",
            image: "https://images.unsplash.com/photo-1600100397608-f010f4438342?auto=format&fit=crop&w=800&q=80",
            tag: "Buddhist Heritage"
      }
]
  },
  {
    id: 'kashmir-in',
    name: 'Kashmir & Srinagar',
    country: 'India',
    countryCode: 'IN',
    continent: 'Asia',
    flag: '🇮🇳',
    lat: 34.0837,
    lon: 74.7973,
    description: 'The Paradise on Earth, celebrated for tranquil Shikara rides on Dal Lake, floating lotus gardens, snow-covered pine slopes of Gulmarg, and saffron valleys of Pahalgam.',
    highlights: ['Dal Lake Traditional Wooden Shikara Ride', 'Gulmarg World’s Highest Gondola & Ski Slopes', 'Pahalgam Betaab & Aru Valley Meadows', 'Mughal Gardens Shalimar & Nishat'],
    bestTimeToVisit: 'Apr – Oct (Gardens) & Dec – Mar (Snow Ski)',
    weather: 'Crisp Mountain Breeze • 16°C',
    rating: 4.99,
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'Dal Lake Shikara, Gulmarg Snow & Saffron Valleys',
    landmarksDetail: [
      {
            name: "Dal Lake Traditional Shikara Ride",
            description: "Cruising through mirror-calm waters beneath snow peaks, visiting floating vegetable markets and hand-carved cedarwood houseboats.",
            image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80",
            tag: "Dal Lake Jewel"
      },
      {
            name: "Gulmarg Gondola & Ski Slopes",
            description: "World’s highest operating cable car ascending to 3,980m at Apharwat Peak, offering premier powder snow skiing and Himalayan panoramas.",
            image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
            tag: "Snow Peaks"
      },
      {
            name: "Pahalgam Betaab Valley",
            description: "Pristine pine-flanked meadows and crystal Lidder river streams set against dramatic Himalayan mountain peaks.",
            image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=800&q=80",
            tag: "Alpine Valley"
      },
      {
            name: "Mughal Gardens Shalimar & Nishat",
            description: "Terraced Persian pleasure gardens built by Emperor Jahangir with cascading fountains, chinar trees, and Dal Lake vistas.",
            image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=800&q=80",
            tag: "Royal Gardens"
      }
]
  },
  {
    id: 'ladakh-in',
    name: 'Ladakh & Leh',
    country: 'India',
    countryCode: 'IN',
    continent: 'Asia',
    flag: '🇮🇳',
    lat: 34.1526,
    lon: 77.5771,
    description: 'The Land of High Passes, renowned for crystal blue high-altitude Pangong Tso lake, dramatic white sand dunes of Nubra Valley with double-humped camels, and ancient cliffside Buddhist monasteries.',
    highlights: ['Pangong Tso Crystal Blue Lake', 'Nubra Valley Hunder Sand Dunes & Bactrian Camels', 'Khardung La World’s Highest Motorable Pass', 'Thiksey & Hemis Ancient Monasteries'],
    bestTimeToVisit: 'May – Sep',
    weather: 'Sunny & Crisp High Altitude • 18°C',
    rating: 4.99,
    image: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'Pangong Lake, High Mountain Passes & Monasteries',
    landmarksDetail: [
      {
            name: "Pangong Tso Crystal Blue Lake",
            description: "World’s highest saltwater lake at 4,225 meters, changing colors from turquoise to deep indigo, surrounded by barren Himalayan ridges.",
            image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=800&q=80",
            tag: "High Altitude Lake"
      },
      {
            name: "Nubra Valley Hunder Sand Dunes",
            description: "High-altitude cold desert dunes famous for rides on rare double-humped Bactrian camels along the ancient Silk Road route.",
            image: "https://images.unsplash.com/photo-1585136917631-5079633c7f99?auto=format&fit=crop&w=800&q=80",
            tag: "Cold Desert"
      },
      {
            name: "Khardung La Mountain Pass",
            description: "Legendary mountain pass at 5,359 meters offering exhilarating views of the Karakoram and Zanskar mountain ranges.",
            image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80",
            tag: "High Mountain Pass"
      },
      {
            name: "Thiksey & Hemis Monasteries",
            description: "Twelve-story cliffside Tibetan Buddhist monastery resembling Lhasa’s Potala Palace, housing a colossal 15-meter Maitreya Buddha.",
            image: "https://images.unsplash.com/photo-1600100397608-f010f4438342?auto=format&fit=crop&w=800&q=80",
            tag: "Sacred Monastery"
      }
]
  },
  {
    id: 'udaipur-in',
    name: 'Udaipur',
    country: 'India',
    countryCode: 'IN',
    continent: 'Asia',
    flag: '🇮🇳',
    lat: 24.5854,
    lon: 73.7125,
    description: 'The Venice of the East and City of Lakes, acclaimed for romantic white marble palaces rising directly from Lake Pichola, intricate Rajput artwork, and royal sunset boat cruises.',
    highlights: ['City Palace Grand Rajput Royal Museum', 'Lake Pichola Sunset Boat Cruise & Jag Mandir', 'Taj Lake Palace Floating Marble Marvel', 'Saheliyon-ki-Bari Royal Courtyards'],
    bestTimeToVisit: 'Oct – Mar',
    weather: 'Pleasant & Royal • 25°C',
    rating: 4.97,
    image: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'Lake Pichola, City Palace & Romantic Lakeside Dining',
    landmarksDetail: [
      {
            name: "City Palace Grand Museum",
            description: "Rajasthan’s largest palace complex perched on the banks of Lake Pichola, featuring mirror-inlaid galleries, peacock mosaics, and royal courtyards.",
            image: "https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=800&q=80",
            tag: "Royal Palace"
      },
      {
            name: "Lake Pichola Sunset Boat Cruise",
            description: "Tranquil evening boat ride across serene waters with panoramic views of the illuminated City Palace and Jag Mandir island pavilion.",
            image: "https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=800&q=80",
            tag: "Lake Voyage"
      },
      {
            name: "Taj Lake Palace Floating Marvel",
            description: "The 18th-century white marble royal summer palace that appears to float magically on Lake Pichola, featured in James Bond’s Octopussy.",
            image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=800&q=80",
            tag: "Floating Wonder"
      },
      {
            name: "Saheliyon-ki-Bari Fountains",
            description: "Lush historic garden built for royal maidens, featuring marble elephant fountains, lotus pools, and scented rose pavilions.",
            image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
            tag: "Royal Gardens"
      }
]
  },
  {
    id: 'amritsar-in',
    name: 'Amritsar',
    country: 'India',
    countryCode: 'IN',
    continent: 'Asia',
    flag: '🇮🇳',
    lat: 31.6340,
    lon: 74.8723,
    description: 'Home to the glorious Harmandir Sahib (Golden Temple) bathed in pure gold leaf, the patriotic Wagah Border retreat ceremony, and legendary Amritsari Kulcha culinary heritage.',
    highlights: ['Harmandir Sahib Golden Temple & Sarovar', 'Wagah Border Patriotic Beating Retreat', 'Jallianwala Bagh Historic Memorial', 'Guru ka Langar 24/7 Community Kitchen'],
    bestTimeToVisit: 'Oct – Mar',
    weather: 'Pleasant & Bright • 23°C',
    rating: 4.98,
    image: 'https://images.unsplash.com/photo-1593181629936-11c609b8db9b?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1593181629936-11c609b8db9b?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'Golden Temple, Wagah Border & Punjabi Gastronomy',
    landmarksDetail: [
      {
            name: "Harmandir Sahib (Golden Temple)",
            description: "The sanctum sanctorum of Sikhism covered in 500 kg of pure gold leaf, reflected in the sacred Amrit Sarovar holy water.",
            image: "https://images.unsplash.com/photo-1593181629936-11c609b8db9b?auto=format&fit=crop&w=800&q=80",
            tag: "Golden Temple"
      },
      {
            name: "Wagah Border Beating Retreat",
            description: "The electrifying military drill and flag-lowering ceremony conducted daily by Indian BSF and Pakistan Rangers with patriotic fervor.",
            image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80",
            tag: "Border Ceremony"
      },
      {
            name: "Jallianwala Bagh Historic Memorial",
            description: "Historic public garden memorial commemorating the martyrs of 1919, preserving bullet marks and the historic martyrs’ well.",
            image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
            tag: "Historic Memorial"
      },
      {
            name: "Guru ka Langar Mega Kitchen",
            description: "The world’s largest community kitchen serving over 100,000 free hot meals daily to all visitors regardless of faith or background.",
            image: "https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=800&q=80",
            tag: "Community Langar"
      }
]
  },
  {
    id: 'manali-in',
    name: 'Manali & Shimla',
    country: 'India',
    countryCode: 'IN',
    continent: 'Asia',
    flag: '🇮🇳',
    lat: 32.2432,
    lon: 77.1892,
    description: 'Himachal Pradesh’s beloved mountain haven, surrounded by towering deodar pine forests, snow-clad Rohtang Pass, paragliding over Solang Valley, and apple orchards.',
    highlights: ['Rohtang Pass & Atal Tunnel Snow Valleys', 'Solang Valley Paragliding & Adventure', 'Old Manali Bohemian Cafes & Hidimba Temple', 'Shimla Mall Road & British Colonial Heritage'],
    bestTimeToVisit: 'Mar – Jun (Spring) & Dec – Feb (Snowfall)',
    weather: 'Crisp Pine Mountain Air • 15°C',
    rating: 4.95,
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'Snow Valleys, Solang Paragliding & Pine Forests'
  },
  {
    id: 'rishikesh-in',
    name: 'Rishikesh & Haridwar',
    country: 'India',
    countryCode: 'IN',
    continent: 'Asia',
    flag: '🇮🇳',
    lat: 30.0869,
    lon: 78.2676,
    description: 'The Yoga Capital of the World at the foothills of the Himalayas, famed for thrilling white-water river rafting on the emerald Ganga, suspension bridges, and evening Ganga Aarti.',
    highlights: ['White Water Rafting on Holy Ganga', 'Triveni Ghat Evening Maha Aarti', 'Lakshman Jhula & Ram Jhula Bridges', 'Beatles Ashram Yoga & Meditation Retrets'],
    bestTimeToVisit: 'Sep – Apr',
    weather: 'Refreshing Mountain River • 22°C',
    rating: 4.96,
    image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'Yoga Capital, River Rafting & Ganga Aarti'
  },
  {
    id: 'kolkata-in',
    name: 'Kolkata',
    country: 'India',
    countryCode: 'IN',
    continent: 'Asia',
    flag: '🇮🇳',
    lat: 22.5726,
    lon: 88.3639,
    description: 'The City of Joy and cultural capital of India, famous for the magnificent white marble Victoria Memorial, Howrah Bridge over the Hooghly River, historic tramways, and world-class sweets.',
    highlights: ['Victoria Memorial Hall & Gardens', 'Howrah Bridge Architectural Wonder', 'Dakshineswar Kali & Belur Math Temples', 'Park Street Food Trail & Bengali Sweets'],
    bestTimeToVisit: 'Oct – Mar (Durga Puja Festival)',
    weather: 'Cultural Warmth • 26°C',
    rating: 4.93,
    image: 'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'Victoria Memorial, Howrah Bridge & Durga Puja'
  },
  {
    id: 'bengaluru-in',
    name: 'Bengaluru',
    country: 'India',
    countryCode: 'IN',
    continent: 'Asia',
    flag: '🇮🇳',
    lat: 12.9716,
    lon: 77.5946,
    description: 'India’s lush Garden City and Silicon Valley, celebrated for leafy Lalbagh botanical gardens, colonial heritage microbreweries, and Tudor-style royal palaces.',
    highlights: ['Bangalore Palace & Tudor Towers', 'Lalbagh Glass House Botanical Gardens', 'Cubbon Park Green Canopy', 'Indiranagar Craft Microbreweries'],
    bestTimeToVisit: 'Sep – Mar',
    weather: 'Pleasant Spring Air • 24°C',
    rating: 4.92,
    image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'Garden City, Palaces & Craft Culture'
  },
  {
    id: 'hampi-in',
    name: 'Hampi',
    country: 'India',
    countryCode: 'IN',
    continent: 'Asia',
    flag: '🇮🇳',
    lat: 15.3350,
    lon: 76.4600,
    description: 'The surreal UNESCO boulder-strewn landscape of the ancient 14th-century Vijayanagara Empire, featuring the iconic Stone Chariot, musical pillars, and sunset points.',
    highlights: ['Stone Chariot at Vittala Temple Complex', 'Virupaksha Ancient Sacred Temple', 'Matanga Hill 360° Sunset Viewpoint', 'Tungabhadra River Coracle Boat Ride'],
    bestTimeToVisit: 'Oct – Mar',
    weather: 'Sunny & Historic • 26°C',
    rating: 4.97,
    image: 'https://images.unsplash.com/photo-1600100397608-f010f4438342?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1600100397608-f010f4438342?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'UNESCO Ancient Empire Ruins, Stone Chariot & Boulders'
  },
  {
    id: 'ooty-in',
    name: 'Ooty & Nilgiris',
    country: 'India',
    countryCode: 'IN',
    continent: 'Asia',
    flag: '🇮🇳',
    lat: 11.4102,
    lon: 76.6950,
    description: 'The Queen of Hill Stations nestled in the Blue Nilgiri Mountains, famed for the UNESCO steam toy train, sprawling emerald tea estates, and misty Doddabetta Peak.',
    highlights: ['Nilgiri Mountain Railway Heritage Steam Train', 'Doddabetta Highest Mountain Peak', 'Ooty Botanical & Rose Gardens', 'Pykara Lake & Waterfalls Speedboating'],
    bestTimeToVisit: 'Oct – Jun',
    weather: 'Cool Mountain Mist • 17°C',
    rating: 4.94,
    image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'Nilgiri Toy Train, Tea Plantations & Misty Hills'
  },
  {
    id: 'darjeeling-in',
    name: 'Darjeeling & Sikkim',
    country: 'India',
    countryCode: 'IN',
    continent: 'Asia',
    flag: '🇮🇳',
    lat: 27.0410,
    lon: 88.2663,
    description: 'The Queen of the Hills in the Eastern Himalayas, world-famous for panoramic sunrise views of Mount Kanchenjunga from Tiger Hill, aromatic black tea, and the Himalayan Toy Train.',
    highlights: ['Tiger Hill Kanchenjunga Golden Sunrise', 'Darjeeling Himalayan UNESCO Toy Train', 'Happy Valley Organic Tea Estate Tour', 'Peace Pagoda & Buddhist Monasteries'],
    bestTimeToVisit: 'Mar – May & Oct – Dec',
    weather: 'Crisp Himalayan Air • 14°C',
    rating: 4.97,
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'Kanchenjunga Sunrise, World-Famous Tea & Toy Train'
  },
  {
    id: 'andaman-in',
    name: 'Andaman & Nicobar',
    country: 'India',
    countryCode: 'IN',
    continent: 'Asia',
    flag: '🇮🇳',
    lat: 11.9761,
    lon: 92.9876,
    description: 'India’s tropical island paradise in the Bay of Bengal, home to Radhanagar Beach (one of Asia’s best beaches), bioluminescent night kayaking, and vibrant coral reef scuba diving.',
    highlights: ['Radhanagar Beach Havelock Island Sunset', 'Elephant Beach Scuba Diving & Sea Walk', 'Cellular Jail Historic Light & Sound Show', 'Baratang Limestone Caves & Mangrove Boat Tour'],
    bestTimeToVisit: 'Oct – May',
    weather: 'Tropical Island Sunshine • 29°C',
    rating: 4.99,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'Radhanagar Beach, Scuba Diving & Coral Islands'
  },

  // =========================================================================
  // 🇮🇹 ITALY (7 Top Famous Holiday / Visited Places)
  // =========================================================================
  {
    id: 'rome-it',
    name: 'Rome',
    country: 'Italy',
    countryCode: 'IT',
    continent: 'Europe',
    flag: '🇮🇹',
    lat: 41.8902,
    lon: 12.4922,
    description: 'The Eternal City where ancient imperial ruins blend with Baroque fountains, Renaissance art masterpieces, and vibrant Mediterranean street cafés.',
    highlights: ['Colosseum & Roman Forum VIP', 'Trevi Fountain & Spanish Steps', 'Vatican Museums & Sistine Chapel', 'Pantheon Classical Dome'],
    bestTimeToVisit: 'Apr – Jun & Sep – Oct',
    weather: 'Mediterranean Sun • 24°C',
    rating: 4.99,
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'Imperial History, Colosseum & Vatican Wonders',
    landmarksDetail: [
      {
            name: "Colosseum & Roman Forum",
            description: "The world’s largest ancient amphitheatre where gladiators once fought, standing alongside the triumphal arches of the Roman Forum.",
            image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80",
            tag: "Ancient Wonder"
      },
      {
            name: "Trevi Fountain Baroque Marvel",
            description: "The monumental Baroque fountain where tossing a coin over your left shoulder guarantees your return to the Eternal City.",
            image: "https://images.unsplash.com/photo-1525874684015-58379d421a52?auto=format&fit=crop&w=800&q=80",
            tag: "Baroque Masterpiece"
      },
      {
            name: "Vatican Museums & Sistine Chapel",
            description: "The artistic treasury of the Catholic Church crowned by Michelangelo’s immortal ceiling frescoes and The Creation of Adam.",
            image: "https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=800&q=80",
            tag: "Vatican Splendor"
      },
      {
            name: "Pantheon Classical Dome",
            description: "The 2,000-year-old intact Roman temple featuring the world’s largest unreinforced concrete dome and central open oculus.",
            image: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=800&q=80",
            tag: "Roman Architecture"
      }
]
  },
  {
    id: 'florence-it',
    name: 'Florence',
    country: 'Italy',
    countryCode: 'IT',
    continent: 'Europe',
    flag: '🇮🇹',
    lat: 43.7696,
    lon: 11.2558,
    description: 'The cradle of the Renaissance, renowned for Brunelleschi’s terracotta-tiled Duomo, the Uffizi Gallery, Michelangelo’s David, and romantic Arno river views.',
    highlights: ['Duomo di Firenze & Campanile', 'Uffizi Gallery Renaissance Tour', 'Ponte Vecchio Gold Bridges', 'Piazzale Michelangelo Sunset'],
    bestTimeToVisit: 'May – Sep',
    weather: 'Warm & Radiant • 25°C',
    rating: 4.97,
    image: 'https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'Renaissance Art & Tuscan Gastronomy'
  },
  {
    id: 'venice-it',
    name: 'Venice',
    country: 'Italy',
    countryCode: 'IT',
    continent: 'Europe',
    flag: '🇮🇹',
    lat: 45.4408,
    lon: 12.3155,
    description: 'The floating city built across 118 islands, connected by picturesque bridges, ornate Venetian Gothic palaces, and romantic gondola waterways.',
    highlights: ['Grand Canal Private Gondola', 'St. Mark’s Basilica & Campanile', 'Doge’s Palace Secret Passages', 'Rialto Bridge Artisan Stalls'],
    bestTimeToVisit: 'Apr – Oct',
    weather: 'Lagoon Breeze • 23°C',
    rating: 4.96,
    image: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'Canals, Gondolas & Venetian Architecture'
  },
  {
    id: 'amalfi-it',
    name: 'Amalfi Coast',
    country: 'Italy',
    countryCode: 'IT',
    continent: 'Europe',
    flag: '🇮🇹',
    lat: 40.6340,
    lon: 14.6027,
    description: 'A 50-kilometer stretch of dramatic cliffside pastel villages, terraced lemon groves, turquoise waters, and luxury Mediterranean yachting.',
    highlights: ['Positano Cliffside Walk', 'Ravello Villa Rufolo Gardens', 'Capri Island Blue Grotto Cruise', 'Path of the Gods Hike'],
    bestTimeToVisit: 'May – Sep',
    weather: 'Coastal Sun • 26°C',
    rating: 4.98,
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'Cliffside Villages & Limoncello Coastline'
  },
  {
    id: 'milan-it',
    name: 'Milan',
    country: 'Italy',
    countryCode: 'IT',
    continent: 'Europe',
    flag: '🇮🇹',
    lat: 45.4642,
    lon: 9.1900,
    description: 'Italy’s fashion and design capital, crowned by the Gothic Duomo di Milano, Galleria Vittorio Emanuele II, and Leonardo da Vinci’s The Last Supper.',
    highlights: ['Duomo di Milano Rooftop Walk', 'Galleria Vittorio Emanuele II', 'Teatro alla Scala Opera', 'Santa Maria delle Grazie Last Supper'],
    bestTimeToVisit: 'Apr – Jun & Sep – Oct',
    weather: 'Pleasant & Stylish • 22°C',
    rating: 4.93,
    image: 'https://images.unsplash.com/photo-1513581166391-887a96ddeafd?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1513581166391-887a96ddeafd?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'Duomo di Milano, Haute Couture & Opera'
  },
  {
    id: 'lake-como-it',
    name: 'Lake Como',
    country: 'Italy',
    countryCode: 'IT',
    continent: 'Europe',
    flag: '🇮🇹',
    lat: 45.9860,
    lon: 9.2570,
    description: 'The premier luxury Alpine lake surrounded by aristocratic neoclassical villas, lush botanical gardens, and charming waterfront villages like Bellagio and Varenna.',
    highlights: ['Villa del Balbianello Gardens', 'Bellagio Waterfront Promenade', 'Private Wooden Riva Speedboat Cruise', 'Varenna Old Town Lanes'],
    bestTimeToVisit: 'May – Sep',
    weather: 'Alpine Lakeside Sun • 24°C',
    rating: 4.97,
    image: 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'Luxury Villas, Bellagio & Alpine Waterways'
  },
  {
    id: 'sicily-it',
    name: 'Sicily & Taormina',
    country: 'Italy',
    countryCode: 'IT',
    continent: 'Europe',
    flag: '🇮🇹',
    lat: 37.8516,
    lon: 15.2853,
    description: 'The sun-drenched Mediterranean jewel featuring ancient Greco-Roman amphitheatres overlooking smoking Mount Etna, crystal coves of Isola Bella, and Sicilian cannoli.',
    highlights: ['Greek Theatre of Taormina', 'Mount Etna Active Volcano Trek', 'Isola Bella Nature Reserve & Beach', 'Valley of the Temples Agrigento'],
    bestTimeToVisit: 'Apr – Oct',
    weather: 'Mediterranean Warmth • 27°C',
    rating: 4.95,
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'Mount Etna, Greek Theatres & Coastal Palaces'
  },

  // =========================================================================
  // 🇯🇵 JAPAN (7 Top Famous Holiday / Visited Places)
  // =========================================================================
  {
    id: 'tokyo-jp',
    name: 'Tokyo',
    country: 'Japan',
    countryCode: 'JP',
    continent: 'Asia',
    flag: '🇯🇵',
    lat: 35.6762,
    lon: 139.6503,
    description: 'The ultramodern metropolis combining futuristic neon skyscrapers and robotics with historic Shinto shrines, Michelin dining, and anime culture.',
    highlights: ['Shibuya Scramble Crossing', 'Senso-ji Ancient Temple Asakusa', 'Shinjuku Neon Skyline & Omoide Yokocho', 'TeamLab Borderless Digital Art'],
    bestTimeToVisit: 'Mar – May & Oct – Nov',
    weather: 'Crisp & Clear • 20°C',
    rating: 4.98,
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'Futuristic Tech, Neon City & Gastronomy',
    landmarksDetail: [
      {
            name: "Shibuya Scramble Crossing",
            description: "The world’s busiest pedestrian intersection surrounded by giant neon video screens, bustling izakayas, and high fashion.",
            image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
            tag: "Cyberpunk Metropolis"
      },
      {
            name: "Senso-ji Ancient Asakusa Temple",
            description: "Tokyo’s oldest Buddhist temple founded in 628 AD, famous for the giant red Kaminarimon Thunder Gate lantern and Nakamise shopping street.",
            image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
            tag: "Ancient Temple"
      },
      {
            name: "Shinjuku Neon Skyline",
            description: "Futuristic skyscraper towers, Godzilla road, atmospheric Omoide Yokocho alleys, and Golden Gai retro micro-bars.",
            image: "https://images.unsplash.com/photo-1590559899731-a382839e5549?auto=format&fit=crop&w=800&q=80",
            tag: "Neon Nightlife"
      },
      {
            name: "TeamLab Borderless Digital Art",
            description: "Mind-bending interactive digital art museum where fluid light installations respond to human touch in infinite mirror rooms.",
            image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=800&q=80",
            tag: "Digital Wonder"
      }
]
  },
  {
    id: 'kyoto-jp',
    name: 'Kyoto',
    country: 'Japan',
    countryCode: 'JP',
    continent: 'Asia',
    flag: '🇯🇵',
    lat: 35.0116,
    lon: 135.7681,
    description: 'The cultural heart of Japan with over 2,000 Buddhist temples, tranquil Zen rock gardens, Geisha teahouses in Gion, and towering Arashiyama bamboo forests.',
    highlights: ['Fushimi Inari 10,000 Torii Gates', 'Kinkaku-ji Golden Pavilion', 'Arashiyama Bamboo Forest', 'Gion Historic Geisha District'],
    bestTimeToVisit: 'Mar – Apr & Oct – Nov',
    weather: 'Temperate & Serene • 21°C',
    rating: 4.99,
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'Historic Temples, Bamboo Groves & Geisha Culture'
  },
  {
    id: 'osaka-jp',
    name: 'Osaka',
    country: 'Japan',
    countryCode: 'JP',
    continent: 'Asia',
    flag: '🇯🇵',
    lat: 34.6937,
    lon: 135.5023,
    description: 'The nation’s kitchen and energetic street food capital, celebrated for Dotonbori neon riverwalks, Takoyaki street stalls, and historic Osaka Castle.',
    highlights: ['Dotonbori Glico Man Neon Canal', 'Osaka Castle & Moat Park', 'Universal Studios Japan Super Nintendo', 'Shinsekai Retro Food District'],
    bestTimeToVisit: 'Mar – May & Sep – Nov',
    weather: 'Lively & Bright • 22°C',
    rating: 4.95,
    image: 'https://images.unsplash.com/photo-1590559899731-a382839e5549?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1590559899731-a382839e5549?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'Dotonbori Street Food, Osaka Castle & Nightlife'
  },
  {
    id: 'fuji-jp',
    name: 'Mount Fuji & Hakone',
    country: 'Japan',
    countryCode: 'JP',
    continent: 'Asia',
    flag: '🇯🇵',
    lat: 35.3606,
    lon: 138.7274,
    description: 'The sacred symmetrical snow-capped volcanic cone rising above Lake Kawaguchiko, surrounded by traditional hot spring onsens and Shinto shrines.',
    highlights: ['Chureito Pagoda Fuji View', 'Lake Kawaguchiko Swan Boats', 'Hakone Ropeway & Owakudani Valley', 'Open Air Hot Spring Onsen Ryokan'],
    bestTimeToVisit: 'Apr – May & Oct – Nov',
    weather: 'Crisp Mountain Air • 17°C',
    rating: 4.99,
    image: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'Mount Fuji Summit, Pagodas & Hot Springs'
  },
  {
    id: 'nara-jp',
    name: 'Nara',
    country: 'Japan',
    countryCode: 'JP',
    continent: 'Asia',
    flag: '🇯🇵',
    lat: 34.6851,
    lon: 135.8048,
    description: 'Japan’s first permanent capital where over 1,200 friendly sacred sika deer roam freely in parklands surrounding the giant bronze Buddha at Todai-ji Temple.',
    highlights: ['Todai-ji Great Bronze Buddha Hall', 'Nara Deer Park Friendly Feeding', 'Kasuga Taisha 3,000 Stone Lanterns', 'Naramachi Historic Merchant Quarter'],
    bestTimeToVisit: 'Mar – May & Oct – Nov',
    weather: 'Peaceful & Mild • 20°C',
    rating: 4.96,
    image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'Sacred Free-Roaming Deer & Great Buddha Temple'
  },
  {
    id: 'sapporo-jp',
    name: 'Hokkaido & Sapporo',
    country: 'Japan',
    countryCode: 'JP',
    continent: 'Asia',
    flag: '🇯🇵',
    lat: 43.0618,
    lon: 141.3545,
    description: 'Japan’s northern winter wonderland famed for champagne powder ski slopes in Niseko, Odori Park snow sculptures, and fresh sea urchin and ramen cuisine.',
    highlights: ['Niseko Grand Hirafu Ski Resort', 'Sapporo Snow Festival Sculptures', 'Otaru Romantic Canal Gas Lamps', 'Furano Summer Lavender Fields'],
    bestTimeToVisit: 'Dec – Mar (Snow) & Jun – Aug (Summer Flowers)',
    weather: 'Crisp Alpine Snow • 4°C',
    rating: 4.97,
    image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'Powder Skiing, Snow Festivals & Fresh Seafood'
  },
  {
    id: 'okinawa-jp',
    name: 'Okinawa Islands',
    country: 'Japan',
    countryCode: 'JP',
    continent: 'Asia',
    flag: '🇯🇵',
    lat: 26.2124,
    lon: 127.6809,
    description: 'Japan’s subtropical island paradise celebrated for crystal-clear turquoise waters, vibrant coral reefs, Ryukyu kingdom castles, and the world’s longest lifespan culture.',
    highlights: ['Miyakojima White Sand Beaches', 'Kerama Islands Sea Turtle Snorkeling', 'Shuri Castle Ryukyu Heritage', 'Churaumi Aquarium Giant Manta Rays'],
    bestTimeToVisit: 'Apr – Oct',
    weather: 'Subtropical Warmth • 28°C',
    rating: 4.94,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'Tropical Coral Reefs, Turquoise Lagoons & Longevity'
  },

  // =========================================================================
  // 🇫🇷 FRANCE (7 Top Famous Holiday / Visited Places)
  // =========================================================================
  {
    id: 'paris-fr',
    name: 'Paris',
    country: 'France',
    countryCode: 'FR',
    continent: 'Europe',
    flag: '🇫🇷',
    lat: 48.8566,
    lon: 2.3522,
    description: 'The City of Light and global capital of high fashion, gastronomy, and art. Iconic for the Eiffel Tower, Seine River riverbanks, and legendary haute couture.',
    highlights: ['Eiffel Tower Summit VIP', 'Louvre Museum Mona Lisa Access', 'Notre-Dame & Sainte-Chapelle Stained Glass', 'Montmartre & Sacré-Cœur'],
    bestTimeToVisit: 'Apr – Jun & Sep – Oct',
    weather: 'Mild & Romantic • 22°C',
    rating: 4.97,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'Eiffel Tower, Fashion & Art Masterpieces',
    landmarksDetail: [
      {
            name: "Eiffel Tower Summit VIP",
            description: "The iconic 330-meter wrought-iron lattice monument offering breathtaking 360° panoramas over the Seine River and Parisian boulevards.",
            image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
            tag: "Global Icon"
      },
      {
            name: "Louvre Museum Mona Lisa Access",
            description: "The world’s largest art museum inside a former royal palace, housing the Mona Lisa, Venus de Milo, and Winged Victory.",
            image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80",
            tag: "Art Treasure"
      },
      {
            name: "Notre-Dame & Sainte-Chapelle",
            description: "Gothic architectural treasures famous for dramatic gargoyles, flying buttresses, and 1,113 radiant stained-glass biblical windows.",
            image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
            tag: "Gothic Masterpiece"
      },
      {
            name: "Montmartre & Sacré-Cœur Basilica",
            description: "The bohemian hilltop artists’ quarter with cobblestone streets, cabarets, and the gleaming white domes of Sacré-Cœur.",
            image: "https://images.unsplash.com/photo-1513581166391-887a96ddeafd?auto=format&fit=crop&w=800&q=80",
            tag: "Bohemian Hilltop"
      }
]
  },
  {
    id: 'nice-fr',
    name: 'Nice & French Riviera',
    country: 'France',
    countryCode: 'FR',
    continent: 'Europe',
    flag: '🇫🇷',
    lat: 43.7102,
    lon: 7.2620,
    description: 'The jewel of the Côte d’Azur, famous for the palm-lined Promenade des Anglais, Mediterranean azure waters, Belle Époque architecture, and luxury Monaco yachting.',
    highlights: ['Promenade des Anglais Coastal Walk', 'Castle Hill Panoramic Bay of Angels', 'Monaco & Monte Carlo Casino Day Trip', 'Old Town Cours Saleya Flower Market'],
    bestTimeToVisit: 'May – Sep',
    weather: 'Riviera Sun • 26°C',
    rating: 4.96,
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'French Riviera Glamour, Azure Waters & Promenade'
  },
  {
    id: 'bordeaux-fr',
    name: 'Bordeaux & Wine Country',
    country: 'France',
    countryCode: 'FR',
    continent: 'Europe',
    flag: '🇫🇷',
    lat: 44.8378,
    lon: -0.5792,
    description: 'The world capital of wine, featuring 18th-century grand neoclassical boulevards, the Water Mirror on Place de la Bourse, and legendary Saint-Émilion châteaux.',
    highlights: ['Saint-Émilion Grand Cru Vineyard Tasting', 'Place de la Bourse & Miroir d’eau', 'La Cité du Vin Wine Museum', 'Dune of Pilat Giant Sand Ridge'],
    bestTimeToVisit: 'May – Oct',
    weather: 'Sun-drenched Vineyards • 24°C',
    rating: 4.95,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'Premier Cru Vineyards, Châteaux & Architecture'
  },
  {
    id: 'chamonix-fr',
    name: 'Chamonix & Mont Blanc',
    country: 'France',
    countryCode: 'FR',
    continent: 'Europe',
    flag: '🇫🇷',
    lat: 45.9237,
    lon: 6.8694,
    description: 'The world-famous alpine haven nestled beneath Western Europe’s highest peak Mont Blanc, famed for glacier cableways, world-class skiing, and mountain fondue.',
    highlights: ['Aiguille du Midi 3,842m Skywalk', 'Mer de Glace Ice Cave Railway', 'Mont Blanc Panoramic Helicopter Tour', 'Alpine Skiing Vallée Blanche'],
    bestTimeToVisit: 'Dec – Apr (Ski) & Jun – Sep (Hiking)',
    weather: 'Crisp Alpine Peak • 12°C',
    rating: 4.98,
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'Mont Blanc Summit, Glaciers & Alpine Skiing'
  },
  {
    id: 'provence-fr',
    name: 'Provence & Marseille',
    country: 'France',
    countryCode: 'FR',
    continent: 'Europe',
    flag: '🇫🇷',
    lat: 43.2965,
    lon: 5.3698,
    description: 'Enchanting lavender fields, hilltop stone villages of the Luberon, the dramatic limestone Calanques national park, and historic Old Port of Marseille.',
    highlights: ['Valensole Blooming Lavender Plateaus', 'Calanques National Park Fjord Kayaking', 'Gordes Hilltop Medieval Village', 'Marseille Vieux-Port Seafood Feast'],
    bestTimeToVisit: 'Jun – Aug (Lavender) & May – Oct',
    weather: 'Warm Mediterranean Breeze • 26°C',
    rating: 4.96,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'Purple Lavender Fields, Calanques & Olive Groves'
  },
  {
    id: 'mont-saint-michel-fr',
    name: 'Mont Saint-Michel',
    country: 'France',
    countryCode: 'FR',
    continent: 'Europe',
    flag: '🇫🇷',
    lat: 48.6360,
    lon: -1.5115,
    description: 'A magical UNESCO Gothic abbey perched atop a rocky tidal island in Normandy, surrounded by dramatic surging Atlantic tides and medieval ramparts.',
    highlights: ['Abbey of Mont-Saint-Michel Ramparts', 'Tidal Bay Guided Quicksand Walk', 'Grande Rue Medieval Cobblestone Lane', 'Panoramic Atlantic Sunset Overlook'],
    bestTimeToVisit: 'May – Sep',
    weather: 'Ocean Breeze • 20°C',
    rating: 4.97,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'Fairytale Tidal Island Abbey & Medieval Fortress'
  },
  {
    id: 'lyon-fr',
    name: 'Lyon',
    country: 'France',
    countryCode: 'FR',
    continent: 'Europe',
    flag: '🇫🇷',
    lat: 45.7640,
    lon: 4.8357,
    description: 'The gastronomic capital of the world, celebrated for secret Renaissance traboule passageways, UNESCO Vieux Lyon, and legendary Paul Bocuse culinary feasts.',
    highlights: ['Vieux Lyon Renaissance Secret Traboules', 'Basilique Notre-Dame de Fourvière', 'Les Halles de Lyon Paul Bocuse Gourmet Market', 'Presqu’île Place Bellecour'],
    bestTimeToVisit: 'May – Oct',
    weather: 'Pleasant & Culinary • 23°C',
    rating: 4.94,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'World Gastronomy Capital, Traboules & Silk History'
  },

  // =========================================================================
  // 🇺🇸 UNITED STATES (7 Top Famous Holiday / Visited Places)
  // =========================================================================
  {
    id: 'new-york-us',
    name: 'New York City',
    country: 'United States',
    countryCode: 'US',
    continent: 'Americas',
    flag: '🇺🇸',
    lat: 40.7128,
    lon: -74.0060,
    description: 'The city that never sleeps, boasting iconic art deco skyscrapers, world-famous Broadway theatre productions, Central Park, and the Statue of Liberty.',
    highlights: ['Times Square & Broadway Theatres', 'Central Park Horse Carriage Tour', 'Statue of Liberty & Ellis Island', 'Empire State Building Observatory'],
    bestTimeToVisit: 'Sep – Nov & Apr – Jun',
    weather: 'Vibrant & Clear • 21°C',
    rating: 4.96,
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'Skyline Architecture, Broadway & Central Park'
  },
  {
    id: 'los-angeles-us',
    name: 'Los Angeles',
    country: 'United States',
    countryCode: 'US',
    continent: 'Americas',
    flag: '🇺🇸',
    lat: 34.0522,
    lon: -118.2437,
    description: 'The global entertainment capital, famous for Hollywood Walk of Fame, palm-lined Beverly Hills mansions, Santa Monica Pier sunsets, and Pacific surf.',
    highlights: ['Hollywood Sign & Walk of Fame', 'Santa Monica Pier & Venice Boardwalk', 'Universal Studios Hollywood VIP', 'Rodeo Drive Luxury Shopping'],
    bestTimeToVisit: 'Year-Round (Best Mar – May & Sep – Nov)',
    weather: 'California Sunshine • 25°C',
    rating: 4.94,
    image: 'https://images.unsplash.com/photo-1580655653885-65763b2597d0?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1580655653885-65763b2597d0?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'Hollywood Film Studios, Beverly Hills & Beaches'
  },
  {
    id: 'san-francisco-us',
    name: 'San Francisco',
    country: 'United States',
    countryCode: 'US',
    continent: 'Americas',
    flag: '🇺🇸',
    lat: 37.7749,
    lon: -122.4194,
    description: 'Famous for the majestic Golden Gate Bridge, historic cable cars, Victorian Painted Ladies, and panoramic Pacific bay vistas.',
    highlights: ['Golden Gate Bridge Walk & Cruise', 'Alcatraz Island Historic Tour', 'Fisherman’s Wharf & Pier 39', 'Chinatown Culinary Secrets'],
    bestTimeToVisit: 'Sep – Nov',
    weather: 'Cool Bay Mist • 19°C',
    rating: 4.93,
    image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'Golden Gate Bridge & Cable Cars'
  },
  {
    id: 'las-vegas-us',
    name: 'Las Vegas',
    country: 'United States',
    countryCode: 'US',
    continent: 'Americas',
    flag: '🇺🇸',
    lat: 36.1699,
    lon: -115.1398,
    description: 'The Entertainment Capital of the World along the neon Las Vegas Strip, renowned for extravagant luxury casino resorts, Cirque du Soleil shows, and world-class nightlife.',
    highlights: ['The Strip & Bellagio Fountains', 'High Roller Observation Wheel', 'Cirque du Soleil World-Class Show', 'Helicopter Night Flight over the Strip'],
    bestTimeToVisit: 'Mar – May & Sep – Nov',
    weather: 'Desert Electric • 28°C',
    rating: 4.95,
    image: 'https://images.unsplash.com/photo-1581351123004-757df051db8e?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1581351123004-757df051db8e?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'The Strip, Mega Resorts & Entertainment'
  },
  {
    id: 'miami-us',
    name: 'Miami & South Beach',
    country: 'United States',
    countryCode: 'US',
    continent: 'Americas',
    flag: '🇺🇸',
    lat: 25.7617,
    lon: -80.1918,
    description: 'The Magic City where pastel Art Deco architecture meets turquoise Atlantic beaches, Latin rhythms in Little Havana, and vibrant luxury yacht culture.',
    highlights: ['South Beach Ocean Drive Art Deco', 'Wynwood Walls Graffiti Art District', 'Biscayne Bay Private Yacht Cruise', 'Little Havana Calle Ocho Salsa'],
    bestTimeToVisit: 'Nov – Apr',
    weather: 'Tropical Coastal Sun • 29°C',
    rating: 4.95,
    image: 'https://images.unsplash.com/photo-1535498730771-e735b998cd64?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1535498730771-e735b998cd64?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'South Beach, Art Deco & Tropical Nightlife'
  },
  {
    id: 'hawaii-us',
    name: 'Honolulu & Hawaii',
    country: 'United States',
    countryCode: 'US',
    continent: 'Americas',
    flag: '🇺🇸',
    lat: 21.3069,
    lon: -157.8583,
    description: 'The Polynesian tropical paradise of Oahu, famous for world-renowned Waikiki surfing breaks, the Diamond Head crater ridge, and traditional Aloha luaus.',
    highlights: ['Waikiki Beach Golden Sands & Surf', 'Diamond Head Crater Summit Hike', 'Pearl Harbor National Memorial', 'Polynesian Luau & Fire Dance'],
    bestTimeToVisit: 'Apr – Oct',
    weather: 'Tropical Ocean Breeze • 28°C',
    rating: 4.99,
    image: 'https://images.unsplash.com/photo-1542259009477-d625272157b7?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1542259009477-d625272157b7?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'Waikiki Beach, Diamond Head & Volcanoes'
  },
  {
    id: 'grand-canyon-us',
    name: 'Grand Canyon',
    country: 'United States',
    countryCode: 'US',
    continent: 'Americas',
    flag: '🇺🇸',
    lat: 36.0544,
    lon: -112.1401,
    description: 'One of the Seven Natural Wonders of the World, a colossal 277-mile gorge carved over millions of years by the Colorado River with breathtaking red rock vistas.',
    highlights: ['South Rim Mather Point Sunrise', 'Helicopter Canyon Floor Landing', 'Bright Angel Trail Descent', 'Grand Canyon Skywalk Glass Bridge'],
    bestTimeToVisit: 'Mar – May & Sep – Nov',
    weather: 'Clear Canyon Sun • 22°C',
    rating: 4.99,
    image: 'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'Natural Wonder, Red Rock Gorges & Sunrises'
  },

  // =========================================================================
  // 🇬🇧 UNITED KINGDOM (7 Top Famous Holiday / Visited Places)
  // =========================================================================
  {
    id: 'london-gb',
    name: 'London',
    country: 'United Kingdom',
    countryCode: 'GB',
    continent: 'Europe',
    flag: '🇬🇧',
    lat: 51.5074,
    lon: -0.1278,
    description: 'A 2,000-year-old royal metropolis on the River Thames, featuring the historic Tower of London, Big Ben, Westminster Abbey, and world-leading West End shows.',
    highlights: ['Tower of London & Crown Jewels', 'Big Ben & Houses of Parliament', 'Buckingham Palace Royal Guard', 'British Museum Antiquities'],
    bestTimeToVisit: 'May – Sep',
    weather: 'Temperate • 20°C',
    rating: 4.95,
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'Royal Landmarks, Big Ben & West End Theatre'
  },
  {
    id: 'edinburgh-gb',
    name: 'Edinburgh',
    country: 'United Kingdom',
    countryCode: 'GB',
    continent: 'Europe',
    flag: '🇬🇧',
    lat: 55.9533,
    lon: -3.1883,
    description: 'Scotland’s majestic hilltop capital crowned by Edinburgh Castle atop an extinct volcanic crag, the medieval Royal Mile, and Arthur’s Seat skyline.',
    highlights: ['Edinburgh Castle & Crown Jewels', 'Royal Mile Medieval Closes', 'Arthur’s Seat Volcanic Summit Hike', 'Palace of Holyroodhouse Royal Tour'],
    bestTimeToVisit: 'May – Sep (Aug Fringe Festival)',
    weather: 'Crisp & Atmospheric • 18°C',
    rating: 4.97,
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'Edinburgh Castle, Royal Mile & Highlands Gateway'
  },
  {
    id: 'highlands-gb',
    name: 'Scottish Highlands & Skye',
    country: 'United Kingdom',
    countryCode: 'GB',
    continent: 'Europe',
    flag: '🇬🇧',
    lat: 57.3818,
    lon: -6.1950,
    description: 'Dramatic misty glens, towering volcanic peaks on the Isle of Skye, legendary Loch Ness, and the Jacobite Steam Train over the Glenfinnan Viaduct.',
    highlights: ['Isle of Skye Fairy Pools & Old Man of Storr', 'Glenfinnan Viaduct Steam Train', 'Eilean Donan Iconic Loch Castle', 'Loch Ness Monster Cruise'],
    bestTimeToVisit: 'May – Sep',
    weather: 'Mystical Glens & Cool Breeze • 16°C',
    rating: 4.99,
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'Isle of Skye, Glenfinnan Viaduct & Loch Ness'
  },
  {
    id: 'bath-gb',
    name: 'Bath',
    country: 'United Kingdom',
    countryCode: 'GB',
    continent: 'Europe',
    flag: '🇬🇧',
    lat: 51.3811,
    lon: -2.3590,
    description: 'The UNESCO Georgian city celebrated for ancient steaming Roman thermal baths, honey-colored limestone Royal Crescent architecture, and Jane Austen heritage.',
    highlights: ['Ancient Roman Baths & Great Bath', 'Royal Crescent & Circus Georgian Curves', 'Bath Abbey Fan Vaulting', 'Thermae Bath Spa Rooftop Pool'],
    bestTimeToVisit: 'May – Sep',
    weather: 'Pleasant & Mild • 19°C',
    rating: 4.94,
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'Roman Baths, Georgian Architecture & Jane Austen'
  },
  {
    id: 'oxford-gb',
    name: 'Oxford',
    country: 'United Kingdom',
    countryCode: 'GB',
    continent: 'Europe',
    flag: '🇬🇧',
    lat: 51.7520,
    lon: -1.2577,
    description: 'The City of Dreaming Spires, home to the oldest university in the English-speaking world, Christ Church Great Hall, and peaceful River Cherwell punting.',
    highlights: ['Bodleian Library & Radcliffe Camera', 'Christ Church College & Harry Potter Dining Hall', 'River Cherwell Traditional Wooden Punting', 'Ashmolean Museum Treasures'],
    bestTimeToVisit: 'Apr – Oct',
    weather: 'Classic English Sun • 19°C',
    rating: 4.95,
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'Dreaming Spires, Historic Colleges & Punting'
  },
  {
    id: 'cornwall-gb',
    name: 'Cornwall & St. Ives',
    country: 'United Kingdom',
    countryCode: 'GB',
    continent: 'Europe',
    flag: '🇬🇧',
    lat: 50.2660,
    lon: -5.0527,
    description: 'Britain’s scenic southwest peninsula boasting rugged Atlantic surf beaches, dramatic St. Michael’s Mount tidal castle, and open-air Minack Theatre on sea cliffs.',
    highlights: ['St. Michael’s Mount Tidal Island', 'Minack Open-Air Sea Cliff Theatre', 'St. Ives Artists Haven & Porthmeor Beach', 'Land’s End Atlantic Ocean Bluffs'],
    bestTimeToVisit: 'Jun – Sep',
    weather: 'Coastal Breeze & Sun • 21°C',
    rating: 4.96,
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'Rugged Coastlines, Surfing Beaches & St. Michael’s Mount'
  },
  {
    id: 'lake-district-gb',
    name: 'Lake District',
    country: 'United Kingdom',
    countryCode: 'GB',
    continent: 'Europe',
    flag: '🇬🇧',
    lat: 54.4609,
    lon: -3.0886,
    description: 'England’s premier national park featuring glacial lakes, picturesque fells, romantic poetry heritage of William Wordsworth, and traditional cozy stone pubs.',
    highlights: ['Lake Windermere Scenic Steamboat Cruise', 'Scafell Pike Highest Mountain Trail', 'Castlerigg Prehistoric Stone Circle', 'Grasmere Gingerbread & Wordsworth Cottage'],
    bestTimeToVisit: 'May – Sep',
    weather: 'Fresh Mountain Breeze • 17°C',
    rating: 4.97,
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'Glacial Lakes, Mountain Fells & Wordsworth Country'
  },

  // =========================================================================
  // 🇦🇪 UNITED ARAB EMIRATES (7 Top Famous Holiday / Visited Places)
  // =========================================================================
  {
    id: 'dubai-ae',
    name: 'Dubai',
    country: 'United Arab Emirates',
    countryCode: 'AE',
    continent: 'Asia',
    flag: '🇦🇪',
    lat: 25.2048,
    lon: 55.2708,
    description: 'The futuristic desert oasis celebrated for record-breaking skyscrapers, the Burj Khalifa, man-made Palm islands, and luxury golden souks.',
    highlights: ['Burj Khalifa At the Top Sky Deck', 'Desert Safari & Bedouin Camp', 'Palm Jumeirah Helicopter Tour', 'Dubai Mall & Dancing Fountains'],
    bestTimeToVisit: 'Nov – Mar',
    weather: 'Sunny & Warm • 28°C',
    rating: 4.96,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'Burj Khalifa, Desert Safaris & Modern Luxury',
    landmarksDetail: [
      {
            name: "Burj Khalifa Sky Deck",
            description: "The world’s tallest skyscraper standing at 828 meters, offering views across the Persian Gulf and desert sands from level 148.",
            image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
            tag: "World’s Tallest Tower"
      },
      {
            name: "Desert Safari & Red Dunes",
            description: "Thrilling 4x4 dune bashing across golden Arabian desert ridges, camel rides, falconry, and starry Bedouin dinner feasts.",
            image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80",
            tag: "Desert Adventure"
      },
      {
            name: "Palm Jumeirah & Atlantis",
            description: "The palm tree-shaped archipelago featuring luxury beachfront resorts, Aquaventure waterpark, and The View at The Palm.",
            image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=800&q=80",
            tag: "Man-Made Wonder"
      },
      {
            name: "Dubai Mall & Dancing Fountains",
            description: "World’s largest retail entertainment hub featuring a giant indoor aquarium and synchronized dancing water jets choreographed to music.",
            image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80",
            tag: "Luxury Entertainment"
      }
]
  },
  {
    id: 'abu-dhabi-ae',
    name: 'Abu Dhabi',
    country: 'United Arab Emirates',
    countryCode: 'AE',
    continent: 'Asia',
    flag: '🇦🇪',
    lat: 24.4539,
    lon: 54.3773,
    description: 'The capital of the UAE, renowned for the gleaming white marble Sheikh Zayed Grand Mosque, the Louvre Abu Dhabi dome on the sea, and Ferrari World.',
    highlights: ['Sheikh Zayed Grand Mosque VIP', 'Louvre Abu Dhabi Floating Museum', 'Emirates Palace Gold Leaf Coffee', 'Yas Island Ferrari World'],
    bestTimeToVisit: 'Nov – Mar',
    weather: 'Sunny & Pleasant • 27°C',
    rating: 4.97,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'Sheikh Zayed Grand Mosque & Louvre Abu Dhabi'
  },
  {
    id: 'ras-al-khaimah-ae',
    name: 'Ras Al Khaimah',
    country: 'United Arab Emirates',
    countryCode: 'AE',
    continent: 'Asia',
    flag: '🇦🇪',
    lat: 25.6741,
    lon: 55.9804,
    description: 'The UAE’s adventure capital, home to Jebel Jais (the world’s longest zipline) across dramatic Hajar mountain peaks and pristine terracotta desert dunes.',
    highlights: ['Jebel Jais World’s Longest Zipline', 'Dhayah Fort Mountain Viewpoint', 'Al Wadi Desert Oasis Resort', 'Suwaidi Pearl Farm Boat Tour'],
    bestTimeToVisit: 'Oct – Apr',
    weather: 'Cool Mountain Air • 24°C',
    rating: 4.93,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'Jebel Jais Mountains, Ziplines & Desert Luxury'
  },
  {
    id: 'al-ain-ae',
    name: 'Al Ain',
    country: 'United Arab Emirates',
    countryCode: 'AE',
    continent: 'Asia',
    flag: '🇦🇪',
    lat: 24.2075,
    lon: 55.7447,
    description: 'The Garden City of the UAE and a UNESCO World Heritage site, famous for ancient date palm oases, Qasr Al Muwaiji palace, and Jebel Hafeet mountain summit.',
    highlights: ['Al Ain UNESCO Date Palm Oasis', 'Jebel Hafeet Panoramic Mountain Drive', 'Qasr Al Muwaiji Royal Fortress', 'Al Jahili Historic Sandstone Fort'],
    bestTimeToVisit: 'Nov – Mar',
    weather: 'Sunny & Mild • 26°C',
    rating: 4.92,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'Ancient Palm Oases, Jebel Hafeet & Heritage Forts'
  },
  {
    id: 'sharjah-ae',
    name: 'Sharjah',
    country: 'United Arab Emirates',
    countryCode: 'AE',
    continent: 'Asia',
    flag: '🇦🇪',
    lat: 25.3463,
    lon: 55.4209,
    description: 'The cultural capital of the Arab world, acclaimed for the Sharjah Art Museum, the Rain Room installation, and historic souks in the Heart of Sharjah.',
    highlights: ['Sharjah Art Foundation & Rain Room', 'Heart of Sharjah Heritage District', 'Museum of Islamic Civilization', 'Al Noor Mosque & Island'],
    bestTimeToVisit: 'Nov – Mar',
    weather: 'Pleasant & Warm • 27°C',
    rating: 4.91,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'Islamic Civilization, Art Biennales & Heritage Souks'
  },
  {
    id: 'fujairah-ae',
    name: 'Fujairah',
    country: 'United Arab Emirates',
    countryCode: 'AE',
    continent: 'Asia',
    flag: '🇦🇪',
    lat: 25.1288,
    lon: 56.3265,
    description: 'The UAE’s Indian Ocean jewel, famous for snorkeling with sea turtles around Snoopy Island, Sandy Beach resorts, and the historic 17th-century Fujairah Fort.',
    highlights: ['Snoopy Island Snorkeling & Scuba', 'Fujairah Fort & Heritage Village', 'Al Bidyah Oldest UAE Mosque', 'Sandy Beach Oceanfront Resorts'],
    bestTimeToVisit: 'Oct – Apr',
    weather: 'Ocean Breeze • 28°C',
    rating: 4.94,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'Indian Ocean Beaches, Coral Reefs & Snoopy Island'
  },
  {
    id: 'hatta-ae',
    name: 'Hatta',
    country: 'United Arab Emirates',
    countryCode: 'AE',
    continent: 'Asia',
    flag: '🇦🇪',
    lat: 24.8164,
    lon: 56.1260,
    description: 'An idyllic mountain exclave surrounded by rugged Hajar peaks, featuring the famous turquoise waters of Hatta Dam for kayaking and glamping domes under starry skies.',
    highlights: ['Hatta Dam Turquoise Kayaking', 'Hatta Wadi Hub Mountain Biking', 'Hatta Heritage Village Centuries Old', 'Luxury Stargazing Glamping Pods'],
    bestTimeToVisit: 'Oct – Apr',
    weather: 'Crisp Mountain Air • 23°C',
    rating: 4.96,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'Turquoise Mountain Dam, Kayaking & Glamping'
  },

  // =========================================================================
  // 🇪🇬 EGYPT (7 Top Famous Holiday / Visited Places)
  // =========================================================================
  {
    id: 'cairo-eg',
    name: 'Cairo & Giza',
    country: 'Egypt',
    countryCode: 'EG',
    continent: 'Africa',
    flag: '🇪🇬',
    lat: 29.9792,
    lon: 31.1342,
    description: 'The ancient gateway to the Pharaohs, standing at the foot of the Great Pyramids of Giza, the Great Sphinx, and the treasures of King Tutankhamun.',
    highlights: ['Great Pyramid of Giza & Sphinx', 'Grand Egyptian Museum Treasures', 'Nile River Private Felucca Sunset', 'Khan el-Khalili Ancient Bazaar'],
    bestTimeToVisit: 'Oct – Apr',
    weather: 'Warm Desert Breeze • 28°C',
    rating: 4.98,
    image: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'Great Pyramids of Giza & Nile Treasures'
  },
  {
    id: 'luxor-eg',
    name: 'Luxor',
    country: 'Egypt',
    countryCode: 'EG',
    continent: 'Africa',
    flag: '🇪🇬',
    lat: 25.6872,
    lon: 32.6396,
    description: 'The world’s greatest open-air museum, home to the tomb of Tutankhamun in the Valley of the Kings, Karnak Temple’s giant Hypostyle Hall, and hot air balloon rides.',
    highlights: ['Valley of the Kings Pharaoh Tombs', 'Karnak Temple Giant Pillars', 'Sunrise Hot Air Balloon Nile Flight', 'Temple of Hatshepsut Terraces'],
    bestTimeToVisit: 'Oct – Apr',
    weather: 'Sunny & Clear • 29°C',
    rating: 4.99,
    image: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'Valley of the Kings, Karnak & Hot Air Balloons'
  },
  {
    id: 'aswan-eg',
    name: 'Aswan & Abu Simbel',
    country: 'Egypt',
    countryCode: 'EG',
    continent: 'Africa',
    flag: '🇪🇬',
    lat: 24.0889,
    lon: 32.8998,
    description: 'Where the Nile flows peaceful amidst granite boulders and Nubian villages, gateway to the colossal rock-cut temples of Ramesses II at Abu Simbel.',
    highlights: ['Abu Simbel Colossal Sun Temples', 'Philae Temple on Isis Island', 'Traditional Nubian Village Walk', 'Sunset Felucca Sail Around Elephantine'],
    bestTimeToVisit: 'Nov – Mar',
    weather: 'Pleasant & Warm • 28°C',
    rating: 4.97,
    image: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'Abu Simbel, Philae Temple & Nubian Nile'
  },
  {
    id: 'sharm-eg',
    name: 'Sharm El Sheikh',
    country: 'Egypt',
    countryCode: 'EG',
    continent: 'Africa',
    flag: '🇪🇬',
    lat: 27.9158,
    lon: 34.3299,
    description: 'The Red Sea resort capital acclaimed for world-class coral reef diving in Ras Mohammed National Park, Naama Bay promenades, and Mount Sinai sunrise pilgrimages.',
    highlights: ['Ras Mohammed National Marine Park', 'Tiran Island Scuba Diving', 'Mount Sinai Sunrise Trek & St. Catherine', 'Naama Bay Luxury Beach Resorts'],
    bestTimeToVisit: 'Oct – May',
    weather: 'Red Sea Sunshine • 28°C',
    rating: 4.95,
    image: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'Red Sea Coral Reefs, Scuba Diving & Resorts'
  },
  {
    id: 'hurghada-eg',
    name: 'Hurghada',
    country: 'Egypt',
    countryCode: 'EG',
    continent: 'Africa',
    flag: '🇪🇬',
    lat: 27.2579,
    lon: 33.8116,
    description: 'A 40-kilometer stretch of crystal turquoise coastline, famed for Giftun Island white sands, dolphin swims, windsurfing, and Sahara desert quad safaris.',
    highlights: ['Giftun Island Paradise Beach Day', 'Dolphin House Snorkeling Safari', 'Sahara Desert ATV Quad Bike & Bedouin Dinner', 'Hurghada Marina Promenade'],
    bestTimeToVisit: 'Oct – May',
    weather: 'Beach Sunshine • 27°C',
    rating: 4.94,
    image: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'Giftun Island, Dolphin Encounters & Desert Quads'
  },
  {
    id: 'alexandria-eg',
    name: 'Alexandria',
    country: 'Egypt',
    countryCode: 'EG',
    continent: 'Africa',
    flag: '🇪🇬',
    lat: 31.2001,
    lon: 29.9187,
    description: 'The legendary Mediterranean pearl founded by Alexander the Great, home to the modern Bibliotheca Alexandrina, Qaitbay maritime fortress, and seafood promenades.',
    highlights: ['Citadel of Qaitbay Mediterranean Fortress', 'Bibliotheca Alexandrina Library', 'Catacombs of Kom El Shoqafa', 'Corniche Waterfront Stroll'],
    bestTimeToVisit: 'Mar – Jun & Sep – Nov',
    weather: 'Mediterranean Breeze • 24°C',
    rating: 4.92,
    image: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'Citadel of Qaitbay, Bibliotheca & Coastal History'
  },
  {
    id: 'siwa-eg',
    name: 'Siwa Oasis',
    country: 'Egypt',
    countryCode: 'EG',
    continent: 'Africa',
    flag: '🇪🇬',
    lat: 29.2032,
    lon: 25.5195,
    description: 'An enchanting desert oasis near the Libyan border, famous for natural turquoise salt lakes where you float effortlessly, the Temple of the Oracle, and date palms.',
    highlights: ['Turquoise Salt Lakes Floating Experience', 'Cleopatra’s Natural Spring Pool', 'Shali Medieval Mud-Brick Fortress', 'Great Sand Sea Desert 4x4 Safari'],
    bestTimeToVisit: 'Oct – Apr',
    weather: 'Clear Desert Air • 26°C',
    rating: 4.97,
    image: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1920&q=85',
    famousFor: 'Turquoise Salt Lakes, Desert Oasis & Cleopatra Springs'
  }
];

// Helper to look up city or country info
export function findLocationInfo(query: string): CityInfo | null {
  if (!query || !query.trim()) return null;
  const q = query.trim().toLowerCase();

  // Alias check (e.g. Bangalore -> Bengaluru)
  if (q.includes('bangalore') || q.includes('bengaluru')) {
    const b = WORLD_CITIES.find((c) => c.id === 'bengaluru-in');
    if (b) return b;
  }

  // 1. Direct match on city name
  const cityMatch = WORLD_CITIES.find(
    (c) => c.name.toLowerCase() === q || c.name.toLowerCase().includes(q) || q.includes(c.name.toLowerCase())
  );
  if (cityMatch) return cityMatch;

  // 2. Direct match on country name (returns primary city of that country)
  const countryMatch = WORLD_CITIES.find(
    (c) => c.country.toLowerCase() === q || c.country.toLowerCase().includes(q) || q.includes(c.country.toLowerCase())
  );
  if (countryMatch) return countryMatch;

  // 3. Highlight / landmark match
  const highlightMatch = WORLD_CITIES.find((c) =>
    c.highlights.some((h) => h.toLowerCase().includes(q) || q.includes(h.toLowerCase()))
  );
  if (highlightMatch) return highlightMatch;

  return null;
}

export function resolveLocationCoordinates(query: string): { lat: number; lon: number; name: string; country: string } | null {
  const info = findLocationInfo(query);
  if (info) {
    return { lat: info.lat, lon: info.lon, name: info.name, country: info.country };
  }
  return null;
}

