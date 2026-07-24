import { Question } from '@/types';

export const questions: Question[] = [
  // ── Q1: Weekend vibe (Image select)
  {
    id: 'q1',
    type: 'image-select',
    category: 'Personality',
    question: 'Your perfect weekend looks like…',
    subtitle: 'Pick the vibe that speaks to you',
    options: [
      {
        id: 'q1-a',
        label: 'Exploring a new city',
        emoji: '🌆',
        gradient: 'linear-gradient(135deg, #0f0c29, #302b63)',
        traits: { urban: 0.9, social: 0.7, adventure: 0.5, culture: 0.6 },
      },
      {
        id: 'q1-b',
        label: 'Lost in nature',
        emoji: '🌲',
        gradient: 'linear-gradient(135deg, #134e5e, #71b280)',
        traits: { nature: 1.0, spirituality: 0.7, adventure: 0.6 },
      },
      {
        id: 'q1-c',
        label: 'Lounging at a luxury spa',
        emoji: '🛁',
        gradient: 'linear-gradient(135deg, #c9728a, #ffd89b)',
        traits: { luxury: 1.0, romance: 0.6, spirituality: 0.5 },
      },
      {
        id: 'q1-d',
        label: 'A packed festival or event',
        emoji: '🎉',
        gradient: 'linear-gradient(135deg, #f21183, #7b2ff7)',
        traits: { social: 1.0, urban: 0.6, culture: 0.5 },
      },
    ],
  },

  // ── Q2: Introvert ↔ Extrovert (Slider)
  {
    id: 'q2',
    type: 'slider',
    category: 'Personality',
    question: 'How do you recharge after a long day?',
    leftLabel: 'Alone with a book',
    rightLabel: 'Out with friends',
    leftEmoji: '📖',
    rightEmoji: '🥂',
    leftTraits: { spirituality: 0.6, nature: 0.4, romance: 0.5 },
    rightTraits: { social: 1.0, urban: 0.5, culture: 0.4 },
  },

  // ── Q3: Planning style (Multiple choice)
  {
    id: 'q3',
    type: 'multiple-choice',
    category: 'Personality',
    question: 'How do you plan your travels?',
    options: [
      {
        id: 'q3-a',
        label: 'Every hour is scheduled',
        emoji: '📋',
        traits: { culture: 0.5, urban: 0.5 },
      },
      {
        id: 'q3-b',
        label: 'A rough outline — details sorted on arrival',
        emoji: '🗺️',
        traits: { adventure: 0.6, social: 0.4, culture: 0.4 },
      },
      {
        id: 'q3-c',
        label: 'I just book flights and figure it out',
        emoji: '✈️',
        traits: { adventure: 0.9, social: 0.5, spirituality: 0.3 },
      },
      {
        id: 'q3-d',
        label: 'What plan? I go where the mood takes me',
        emoji: '🌀',
        traits: { adventure: 1.0, social: 0.6, spirituality: 0.5, nature: 0.3 },
      },
    ],
  },

  // ── Q4: Dream landscape (Image select)
  {
    id: 'q4',
    type: 'image-select',
    category: 'Travel Style',
    question: 'Which landscape makes your heart race?',
    options: [
      {
        id: 'q4-a',
        label: 'Snow-capped mountains',
        emoji: '🏔️',
        gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)',
        traits: { adventure: 1.0, nature: 0.9, spirituality: 0.5 },
      },
      {
        id: 'q4-b',
        label: 'Tropical ocean & beach',
        emoji: '🏖️',
        gradient: 'linear-gradient(135deg, #0093E9, #80D0C7)',
        traits: { nature: 0.7, romance: 0.8, luxury: 0.5 },
      },
      {
        id: 'q4-c',
        label: 'Dazzling city skyline',
        emoji: '🌃',
        gradient: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
        traits: { urban: 1.0, social: 0.7, culture: 0.5 },
      },
      {
        id: 'q4-d',
        label: 'Ancient jungle ruins',
        emoji: '🌿',
        gradient: 'linear-gradient(135deg, #1a472a, #52b788)',
        traits: { adventure: 0.8, culture: 0.9, spirituality: 0.7, nature: 0.6 },
      },
    ],
  },

  // ── Q5: Budget ↔ Luxury (Slider)
  {
    id: 'q5',
    type: 'slider',
    category: 'Travel Style',
    question: 'What\'s your travel spending philosophy?',
    leftLabel: 'Hostels & street food',
    rightLabel: 'Suites & fine dining',
    leftEmoji: '🎒',
    rightEmoji: '💎',
    leftTraits: { adventure: 0.6, social: 0.5, spirituality: 0.4 },
    rightTraits: { luxury: 1.0, romance: 0.5, urban: 0.3 },
  },

  // ── Q6: Interests multi-select
  {
    id: 'q6',
    type: 'multi-select',
    category: 'Interests',
    question: 'Pick your top travel passions',
    subtitle: 'Choose up to 4',
    maxSelections: 4,
    options: [
      { id: 'q6-food', label: 'Food & Cuisine', emoji: '🍜', traits: { culture: 0.8, social: 0.5 } },
      { id: 'q6-history', label: 'History & Ruins', emoji: '🏛️', traits: { culture: 0.9, spirituality: 0.4 } },
      { id: 'q6-adventure', label: 'Extreme Adventure', emoji: '🪂', traits: { adventure: 1.0 } },
      { id: 'q6-art', label: 'Art & Design', emoji: '🎨', traits: { culture: 0.9, urban: 0.4 } },
      { id: 'q6-shopping', label: 'Shopping & Fashion', emoji: '🛍️', traits: { urban: 0.7, luxury: 0.6 } },
      { id: 'q6-beaches', label: 'Beaches & Water', emoji: '🌊', traits: { nature: 0.8, romance: 0.5 } },
      { id: 'q6-wildlife', label: 'Wildlife & Nature', emoji: '🦁', traits: { nature: 1.0, adventure: 0.5 } },
      { id: 'q6-nightlife', label: 'Nightlife & Music', emoji: '🎶', traits: { social: 1.0, urban: 0.6 } },
      { id: 'q6-wellness', label: 'Wellness & Yoga', emoji: '🧘', traits: { spirituality: 1.0, nature: 0.5 } },
      { id: 'q6-romance', label: 'Romance & Couples', emoji: '💑', traits: { romance: 1.0, luxury: 0.4 } },
    ],
  },

  // ── Q7: Risk-taking ↔ Play-it-safe (Slider)
  {
    id: 'q7',
    type: 'slider',
    category: 'Personality',
    question: 'How adventurous are you, really?',
    leftLabel: 'Comfort is non-negotiable',
    rightLabel: 'The riskier the better',
    leftEmoji: '🛡️',
    rightEmoji: '🔥',
    leftTraits: { luxury: 0.5, romance: 0.4 },
    rightTraits: { adventure: 1.0, social: 0.4, spirituality: 0.3 },
  },

  // ── Q8: Travel pace (Multiple choice)
  {
    id: 'q8',
    type: 'multiple-choice',
    category: 'Travel Style',
    question: 'What\'s your ideal travel pace?',
    options: [
      {
        id: 'q8-a',
        label: '5 cities, 10 days — maximum coverage',
        emoji: '⚡',
        traits: { urban: 0.8, social: 0.6, adventure: 0.5 },
      },
      {
        id: 'q8-b',
        label: 'One city, fully explored in depth',
        emoji: '🔍',
        traits: { culture: 0.8, urban: 0.5, spirituality: 0.3 },
      },
      {
        id: 'q8-c',
        label: 'One region, slow and wandering',
        emoji: '🌿',
        traits: { nature: 0.7, spirituality: 0.7, romance: 0.5 },
      },
      {
        id: 'q8-d',
        label: 'One resort — beach, pool, repeat',
        emoji: '🌴',
        traits: { luxury: 0.8, romance: 0.7, nature: 0.4 },
      },
    ],
  },

  // ── Q9: Cuisine scene (Image select)
  {
    id: 'q9',
    type: 'image-select',
    category: 'Interests',
    question: 'Which food scene excites you most?',
    options: [
      {
        id: 'q9-a',
        label: 'Michelin-starred tasting menus',
        emoji: '⭐',
        gradient: 'linear-gradient(135deg, #2c1654, #6a3093, #c9728a)',
        traits: { luxury: 0.9, culture: 0.5, urban: 0.4 },
      },
      {
        id: 'q9-b',
        label: 'Chaotic street food markets',
        emoji: '🌶️',
        gradient: 'linear-gradient(135deg, #b5451b, #e2703a, #f4a32c)',
        traits: { culture: 0.9, adventure: 0.6, social: 0.5 },
      },
      {
        id: 'q9-c',
        label: 'Farmers markets & fresh local produce',
        emoji: '🥬',
        gradient: 'linear-gradient(135deg, #134e5e, #71b280)',
        traits: { nature: 0.6, spirituality: 0.5, culture: 0.5 },
      },
      {
        id: 'q9-d',
        label: 'Beachside seafood with a view',
        emoji: '🦞',
        gradient: 'linear-gradient(135deg, #0093E9, #80D0C7)',
        traits: { romance: 0.7, nature: 0.5, luxury: 0.4 },
      },
    ],
  },

  // ── Q10: Urban ↔ Nature (Slider)
  {
    id: 'q10',
    type: 'slider',
    category: 'Travel Style',
    question: 'Where does your soul belong?',
    leftLabel: 'Concrete jungle',
    rightLabel: 'Wild wilderness',
    leftEmoji: '🏙️',
    rightEmoji: '🌿',
    leftTraits: { urban: 1.0, social: 0.5, culture: 0.4 },
    rightTraits: { nature: 1.0, spirituality: 0.7, adventure: 0.5 },
  },

  // ── Q11: Decision making (Multiple choice)
  {
    id: 'q11',
    type: 'multiple-choice',
    category: 'Personality',
    question: 'When you\'re at a crossroads, you…',
    options: [
      {
        id: 'q11-a',
        label: 'Research everything, then decide logically',
        emoji: '📊',
        traits: { culture: 0.5, urban: 0.4 },
      },
      {
        id: 'q11-b',
        label: 'Ask friends for opinions, go with consensus',
        emoji: '👥',
        traits: { social: 0.9, culture: 0.4 },
      },
      {
        id: 'q11-c',
        label: 'Trust your gut — always',
        emoji: '💫',
        traits: { adventure: 0.8, spirituality: 0.6 },
      },
      {
        id: 'q11-d',
        label: 'Try both — why choose?',
        emoji: '🔀',
        traits: { adventure: 0.7, social: 0.5, culture: 0.4 },
      },
    ],
  },

  // ── Q12: Activities bucket list (Multi-select)
  {
    id: 'q12',
    type: 'multi-select',
    category: 'Interests',
    question: 'Which activities are on your bucket list?',
    subtitle: 'Choose up to 5',
    maxSelections: 5,
    options: [
      { id: 'q12-bungee', label: 'Bungee jumping', emoji: '🪢', traits: { adventure: 1.0 } },
      { id: 'q12-temple', label: 'Temple pilgrimage', emoji: '⛩️', traits: { spirituality: 1.0, culture: 0.6 } },
      { id: 'q12-northern', label: 'See northern lights', emoji: '🌌', traits: { nature: 0.9, romance: 0.5 } },
      { id: 'q12-cooking', label: 'Cooking class abroad', emoji: '👨‍🍳', traits: { culture: 0.9, social: 0.5 } },
      { id: 'q12-concert', label: 'Concert in a foreign city', emoji: '🎸', traits: { social: 0.8, urban: 0.5 } },
      { id: 'q12-luxury', label: 'Stay in a 5-star resort', emoji: '🏨', traits: { luxury: 1.0, romance: 0.4 } },
      { id: 'q12-trek', label: 'Multi-day trekking', emoji: '🥾', traits: { adventure: 0.9, nature: 0.8 } },
      { id: 'q12-diving', label: 'Scuba diving / snorkeling', emoji: '🤿', traits: { adventure: 0.7, nature: 0.8 } },
    ],
  },

  // ── Q13: Travel companion (Image select)
  {
    id: 'q13',
    type: 'image-select',
    category: 'Personality',
    question: 'Your ideal travel companion is…',
    options: [
      {
        id: 'q13-a',
        label: 'My partner / soulmate',
        emoji: '💑',
        gradient: 'linear-gradient(135deg, #c9728a, #ffd89b)',
        traits: { romance: 1.0, luxury: 0.4, spirituality: 0.3 },
      },
      {
        id: 'q13-b',
        label: 'A wild group of friends',
        emoji: '🎉',
        gradient: 'linear-gradient(135deg, #f21183, #7b2ff7)',
        traits: { social: 1.0, adventure: 0.5, urban: 0.4 },
      },
      {
        id: 'q13-c',
        label: 'Just me, myself, and I',
        emoji: '🧳',
        gradient: 'linear-gradient(135deg, #0f0c29, #302b63)',
        traits: { spirituality: 0.8, adventure: 0.6, nature: 0.4 },
      },
      {
        id: 'q13-d',
        label: 'New people I meet along the way',
        emoji: '🌍',
        gradient: 'linear-gradient(135deg, #134e5e, #71b280)',
        traits: { social: 0.8, adventure: 0.7, culture: 0.6 },
      },
    ],
  },

  // ── Q14: Accommodation style (Multiple choice)
  {
    id: 'q14',
    type: 'multiple-choice',
    category: 'Travel Style',
    question: 'Where do you want to sleep?',
    options: [
      {
        id: 'q14-a',
        label: 'Overwater bungalow or penthouse suite',
        emoji: '🏝️',
        traits: { luxury: 1.0, romance: 0.7 },
      },
      {
        id: 'q14-b',
        label: 'Boutique guesthouse or ryokan',
        emoji: '🏡',
        traits: { culture: 0.7, romance: 0.5, spirituality: 0.4 },
      },
      {
        id: 'q14-c',
        label: 'Hostel dorm — best way to meet people',
        emoji: '🏠',
        traits: { social: 0.9, adventure: 0.6 },
      },
      {
        id: 'q14-d',
        label: 'Eco-lodge or campsite under stars',
        emoji: '🏕️',
        traits: { nature: 1.0, adventure: 0.7, spirituality: 0.5 },
      },
    ],
  },

  // ── Q15: Final vibe check (Image select)
  {
    id: 'q15',
    type: 'image-select',
    category: 'Travel Style',
    question: 'Close your eyes. Where do you feel most alive?',
    subtitle: 'Trust your gut on this one',
    options: [
      {
        id: 'q15-a',
        label: 'On a rooftop at golden hour',
        emoji: '🌇',
        gradient: 'linear-gradient(135deg, #f7971e, #ffd200)',
        traits: { urban: 0.7, romance: 0.7, luxury: 0.5, social: 0.5 },
      },
      {
        id: 'q15-b',
        label: 'At a mountain summit, breathless',
        emoji: '🏔️',
        gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)',
        traits: { adventure: 1.0, nature: 0.9, spirituality: 0.6 },
      },
      {
        id: 'q15-c',
        label: 'Floating in a crystal clear ocean',
        emoji: '🌊',
        gradient: 'linear-gradient(135deg, #0093E9, #80D0C7)',
        traits: { nature: 0.8, romance: 0.7, luxury: 0.4, spirituality: 0.5 },
      },
      {
        id: 'q15-d',
        label: 'Lost in an ancient market',
        emoji: '🏛️',
        gradient: 'linear-gradient(135deg, #b5451b, #f4a32c)',
        traits: { culture: 1.0, adventure: 0.5, social: 0.5, spirituality: 0.4 },
      },
    ],
  },
];

export const QUESTION_WEIGHTS: Record<string, number> = {
  q1: 1.0,
  q2: 0.9,
  q3: 0.7,
  q4: 1.0,
  q5: 1.0,
  q6: 1.1, // interests are core
  q7: 0.9,
  q8: 0.8,
  q9: 0.8,
  q10: 1.1, // urban vs nature is very important
  q11: 0.6,
  q12: 1.0,
  q13: 0.8,
  q14: 0.9,
  q15: 1.0,
};
