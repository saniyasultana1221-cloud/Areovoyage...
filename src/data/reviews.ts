import { Review, SpinPrize } from '../types';

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Dr. Michael & Sarah Vance',
    authorLocation: 'Boston, MA',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: '2 days ago',
    destination: 'Bali & Nusa Islands',
    comment: 'The private pool villa overlooking Uluwatu and our helicopter tour were executed with exceptional professionalism. The concierge handled every transit effortlessly.',
    photoUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80',
    likes: 142
  },
  {
    id: 'rev-2',
    author: 'Carlos & Sofia Morales',
    authorLocation: 'Madrid, Spain',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: '1 week ago',
    destination: 'Tokyo & Kyoto',
    comment: 'Our stay at the traditional luxury ryokan with private onsen was serene and top-tier. Booking was seamless and the customer support was prompt and respectful.',
    photoUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80',
    likes: 118
  },
  {
    id: 'rev-3',
    author: 'Elena Rostova',
    authorLocation: 'London, UK',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: '3 weeks ago',
    destination: 'Amalfi Coast, Italy',
    comment: 'The private Riva yacht excursion to Capri was exquisite. First-class coordination, pristine accommodations, and zero stress from start to finish.',
    photoUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80',
    likes: 245
  },
  {
    id: 'rev-4',
    author: 'David & Amanda Sterling',
    authorLocation: 'Sydney, Australia',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: '1 month ago',
    destination: 'Swiss Alps & Matterhorn',
    comment: 'The panoramic Glacier Express journey and chalet fondue dinner were unforgettable. Premium quality curation with true attention to detail.',
    photoUrl: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=80',
    likes: 167
  }
];

export const SPIN_PRIZES: SpinPrize[] = [
  { id: '1', name: '20% OFF Luxury Itinerary', description: 'Applicable to any verified booking', code: 'VOYAGE20', discountValue: '20% OFF', color: '#1D4ED8', textColor: '#FFFFFF' },
  { id: '2', name: '$150 Executive Airfare Credit', description: 'Direct deduction on international flights', code: 'FLY150', discountValue: '$150 CREDIT', color: '#FACC15', textColor: '#0F172A' },
  { id: '3', name: 'Complimentary Sunset Cruise', description: 'Private yacht charter inclusion', code: 'CRUISEPASS', discountValue: 'FREE YACHT', color: '#0F172A', textColor: '#FFFFFF' },
  { id: '4', name: 'VIP Airport Lounge Pass', description: 'Unlimited premium lounge access', code: 'LOUNGEVIP', discountValue: 'VIP LOUNGE', color: '#2563EB', textColor: '#FFFFFF' },
  { id: '5', name: '15% Off Suite Upgrade', description: 'Upgrade to 5-star villa or executive suite', code: 'SUITE15', discountValue: '15% SUITE', color: '#CA8A04', textColor: '#FFFFFF' },
  { id: '6', name: 'Complimentary Michelin Dining', description: 'Gourmet dinner experience voucher', code: 'GOURMET', discountValue: 'DINING PASS', color: '#0284C7', textColor: '#FFFFFF' },
];
