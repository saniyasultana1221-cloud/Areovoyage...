import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "What's your dream morning waking up on vacation?",
    subtitle: "Choose the vibe that immediately brings a smile to your face",
    options: [
      {
        id: 'q1-beach',
        text: 'Ocean breeze & tropical smoothie bowl in a pool villa',
        subtext: 'Barefoot luxury and gentle waves',
        emoji: '🥥',
        vibeMatch: 'Tropical Beach',
        destinationMatchId: 'bali-indonesia',
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'q1-adventure',
        text: 'Crisp mountain air & sunrise peak hike',
        subtext: 'High-altitude thrills and panoramic vistas',
        emoji: '🏔️',
        vibeMatch: 'Adventure & Peaks',
        destinationMatchId: 'swiss-alps',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'q1-city',
        text: 'Espresso in a vibrant alley & bustling neon streets',
        subtext: 'Sensory overload and cultural discoveries',
        emoji: '⚡',
        vibeMatch: 'Neon City & Culture',
        destinationMatchId: 'tokyo-kyoto-japan',
        image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'q1-romance',
        text: 'Balcony croissant overlooking azure cliffs',
        subtext: 'Sun-drenched romance and sweet dolce vita',
        emoji: '🍋',
        vibeMatch: 'Romantic Escape',
        destinationMatchId: 'amalfi-italy',
        image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80'
      }
    ]
  },
  {
    id: 2,
    question: "What's the #1 must-pack item in your suitcase?",
    subtitle: "Your travel essentials reveal your explorer soul",
    options: [
      {
        id: 'q2-swim',
        text: 'Colorful swimsuits, reef-safe sunscreen & sunglasses',
        subtext: 'Ready to dive into azure waters 24/7',
        emoji: '🤿',
        vibeMatch: 'Tropical Beach',
        destinationMatchId: 'tulum-mexico',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'q2-camera',
        text: 'High-end mirrorless camera & wide angle lenses',
        subtext: 'Capturing unforgettable wildlife and architecture',
        emoji: '📸',
        vibeMatch: 'Foodie Safari',
        destinationMatchId: 'serengeti-safari',
        image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'q2-sneakers',
        text: 'Comfortable walking kicks & streetwear fits',
        subtext: 'Clocking 25,000 steps through hidden markets',
        emoji: '👟',
        vibeMatch: 'Neon City & Culture',
        destinationMatchId: 'tokyo-kyoto-japan',
        image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'q2-glam',
        text: 'Linen outfits, sunset dress & dancing shoes',
        subtext: 'From golden hour yacht cruises to midnight samba',
        emoji: '💃',
        vibeMatch: 'Party & Festivals',
        destinationMatchId: 'rio-brazil',
        image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=600&q=80'
      }
    ]
  },
  {
    id: 3,
    question: "Pick your ideal travel soundtrack right now:",
    subtitle: "Music sets the tone for your dream escape",
    options: [
      {
        id: 'q3-chill',
        text: 'Tropical Lo-fi & Crashing Ocean Surf',
        subtext: 'Pure peace, hammock swaying, and coconut sips',
        emoji: '🎧',
        vibeMatch: 'Tropical Beach',
        destinationMatchId: 'bali-indonesia',
        image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'q3-samba',
        text: 'Upbeat Samba Drums, Latin Brass & Festival Beats',
        subtext: 'High-octane energy, smiling crowds, and dancing',
        emoji: '🎺',
        vibeMatch: 'Party & Festivals',
        destinationMatchId: 'rio-brazil',
        image: 'https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'q3-synth',
        text: 'Electro-Synthwave & Tokyo Subway Chimes',
        subtext: 'Futuristic vibes, ramen steam, and neon reflections',
        emoji: '🌆',
        vibeMatch: 'Neon City & Culture',
        destinationMatchId: 'tokyo-kyoto-japan',
        image: 'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'q3-nature',
        text: 'Acoustic Guitar & Mountain Breeze Whispers',
        subtext: 'Fireside stargazing and alpine grandeur',
        emoji: '🔥',
        vibeMatch: 'Adventure & Peaks',
        destinationMatchId: 'swiss-alps',
        image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=80'
      }
    ]
  },
  {
    id: 4,
    question: "Who is in your ideal adventure squad?",
    subtitle: "Great travel stories are made with the right company",
    options: [
      {
        id: 'q4-romantic',
        text: 'My special someone (Ultimate couple getaway)',
        subtext: 'Unforgettable candlelit sunsets and quiet moments',
        emoji: '🥂',
        vibeMatch: 'Romantic Escape',
        destinationMatchId: 'santorini-greece',
        image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'q4-wild',
        text: 'My chaotic besties (Non-stop fun & memories)',
        subtext: 'From sunrise excursions to all-night beach fiestas',
        emoji: '🎉',
        vibeMatch: 'Party & Festivals',
        destinationMatchId: 'rio-brazil',
        image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'q4-solo',
        text: 'Solo explorer (Total freedom & self-discovery)',
        subtext: 'Meeting fellow nomads and setting my own pace',
        emoji: '🧭',
        vibeMatch: 'Adventure & Peaks',
        destinationMatchId: 'bali-indonesia',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'q4-family',
        text: 'Family or close circle of explorers',
        subtext: 'Shared wonder across breathtaking nature wonders',
        emoji: '🦁',
        vibeMatch: 'Foodie Safari',
        destinationMatchId: 'serengeti-safari',
        image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=600&q=80'
      }
    ]
  }
];
