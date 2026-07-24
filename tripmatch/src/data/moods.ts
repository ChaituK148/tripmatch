import { MoodConfig } from '@/types';

export const moodModes: MoodConfig[] = [
  {
    id: 'default',
    label: 'Any Mood',
    emoji: '🌍',
    traitBoosts: {},
  },
  {
    id: 'relax',
    label: 'Relaxation Mode',
    emoji: '🛁',
    traitBoosts: {
      luxury: 0.3,
      romance: 0.2,
      spirituality: 0.2,
      adventure: -0.2,
      urban: -0.1,
    },
  },
  {
    id: 'adventure',
    label: 'Adventure Mode',
    emoji: '🔥',
    traitBoosts: {
      adventure: 0.4,
      nature: 0.2,
      social: 0.1,
      luxury: -0.2,
      romance: -0.1,
    },
  },
  {
    id: 'luxury',
    label: 'Luxury Mode',
    emoji: '💎',
    traitBoosts: {
      luxury: 0.4,
      romance: 0.2,
      urban: 0.1,
      adventure: -0.2,
      spirituality: -0.1,
    },
  },
];
