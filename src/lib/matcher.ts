import {
  TraitKey,
  TraitScores,
  QuizAnswer,
  Destination,
  DestinationMatch,
  MatchResult,
  MoodMode,
  MoodConfig,
} from '@/types';
import { destinations } from '@/data/destinations';
import { moodModes } from '@/data/moods';

// All trait keys
const ALL_TRAITS: TraitKey[] = [
  'adventure',
  'social',
  'luxury',
  'nature',
  'culture',
  'urban',
  'romance',
  'spirituality',
];

// ──────────────────────────────────────────────
// Personality type determination
// ──────────────────────────────────────────────

interface PersonalityType {
  label: string;
  emoji: string;
  description: string;
  traits: TraitKey[];
}

const PERSONALITY_TYPES: PersonalityType[] = [
  {
    label: 'The Adrenaline Junkie',
    emoji: '🔥',
    description: 'You live for the rush. Every trip is a new challenge, a new limit to push. Safety briefings are just part of the fun.',
    traits: ['adventure', 'nature'],
  },
  {
    label: 'The Romantic Wanderer',
    emoji: '💕',
    description: "You travel to feel things deeply — sunsets, stolen moments, meals that last four hours. Love is your compass.",
    traits: ['romance', 'luxury'],
  },
  {
    label: 'The Cultural Connoisseur',
    emoji: '🎭',
    description: "You travel to understand — history, art, people, stories. You leave every place knowing something you didn't before.",
    traits: ['culture', 'spirituality'],
  },
  {
    label: 'The Urban Explorer',
    emoji: '🌆',
    description: "Cities are your element. You thrive on the energy, the pace, the feeling that the world is happening right here.",
    traits: ['urban', 'social'],
  },
  {
    label: 'The Luxury Seeker',
    emoji: '💎',
    description: "Life is short; the good stuff matters. You travel first class, stay in the best hotels, and eat at the best tables.",
    traits: ['luxury', 'romance'],
  },
  {
    label: 'The Nature Mystic',
    emoji: '🌿',
    description: "You find god in mountains and clarity in rivers. The wilderness is your cathedral, and you return to it often.",
    traits: ['nature', 'spirituality'],
  },
  {
    label: 'The Social Butterfly',
    emoji: '🦋',
    description: "Your best travel memories all involve people — the hostel crew, the local family that invited you for dinner, the stranger who became a friend.",
    traits: ['social', 'culture'],
  },
  {
    label: 'The Mindful Traveler',
    emoji: '🧘',
    description: "You travel slowly, intentionally. Each destination leaves a mark on your soul. You come back changed, not just rested.",
    traits: ['spirituality', 'nature'],
  },
];

// ──────────────────────────────────────────────
// Core scoring function
// ──────────────────────────────────────────────

/**
 * Aggregate all quiz answers into a single user trait score profile
 */
function aggregateUserTraits(answers: QuizAnswer[]): TraitScores {
  const raw: Partial<TraitScores> = {};
  const weights: Partial<Record<TraitKey, number>> = {};

  for (const answer of answers) {
    for (const trait of ALL_TRAITS) {
      const answerTraitValue = answer.traits[trait] ?? 0;
      const contribution = answerTraitValue * answer.weight;

      raw[trait] = (raw[trait] ?? 0) + contribution;
      weights[trait] = (weights[trait] ?? 0) + answer.weight;
    }
  }

  // Normalize: divide by the sum of weights for each trait
  const normalized = {} as TraitScores;
  for (const trait of ALL_TRAITS) {
    const sum = raw[trait] ?? 0;
    const w = weights[trait] ?? 1;
    normalized[trait] = Math.min(1, Math.max(0, sum / w));
  }

  return normalized;
}

/**
 * Apply a mood boost to user traits
 */
function applyMoodBoost(traits: TraitScores, moodConfig: MoodConfig): TraitScores {
  const boosted = { ...traits };
  for (const [traitKey, boost] of Object.entries(moodConfig.traitBoosts)) {
    const key = traitKey as TraitKey;
    boosted[key] = Math.min(1, Math.max(0, boosted[key] + (boost ?? 0)));
  }
  return boosted;
}

/**
 * Cosine similarity between two trait vectors
 */
function cosineSimilarity(a: TraitScores, b: TraitScores): number {
  let dot = 0;
  let normA = 0;
  let normB = 0;

  for (const trait of ALL_TRAITS) {
    dot += a[trait] * b[trait];
    normA += a[trait] * a[trait];
    normB += b[trait] * b[trait];
  }

  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Euclidean distance-based similarity (inverted)
 */
function euclideanSimilarity(a: TraitScores, b: TraitScores): number {
  let sumSq = 0;
  for (const trait of ALL_TRAITS) {
    const diff = a[trait] - b[trait];
    sumSq += diff * diff;
  }
  const distance = Math.sqrt(sumSq / ALL_TRAITS.length);
  return 1 - distance;
}

/**
 * Score a destination against user traits.
 * Blend of cosine similarity + euclidean similarity for best results.
 */
function scoreDestination(userTraits: TraitScores, destination: Destination): number {
  const cosine = cosineSimilarity(userTraits, destination.traits);
  const euclidean = euclideanSimilarity(userTraits, destination.traits);

  // Weight: 60% cosine (direction of preference), 40% euclidean (absolute similarity)
  return (cosine * 0.6 + euclidean * 0.4) * 100;
}

/**
 * Compute per-trait breakdown for a destination match (0–100)
 */
function computeTraitBreakdown(
  userTraits: TraitScores,
  destination: Destination
): Record<TraitKey, number> {
  const breakdown = {} as Record<TraitKey, number>;

  for (const trait of ALL_TRAITS) {
    // Trait match = harmonic mean of user and destination scores for this trait
    const u = userTraits[trait];
    const d = destination.traits[trait];
    if (u === 0 && d === 0) {
      breakdown[trait] = 0;
    } else {
      breakdown[trait] = Math.round(((2 * u * d) / (u + d)) * 100);
    }
  }

  return breakdown;
}

/**
 * Generate a "why it fits" explanation
 */
function generateWhyItFits(
  userTraits: TraitScores,
  destination: Destination,
  breakdown: Record<TraitKey, number>
): string {
  // Find top 2 matching traits
  const sortedTraits = ALL_TRAITS
    .map((t) => ({ trait: t, score: breakdown[t] }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 2);

  const traitLabels: Record<TraitKey, string> = {
    adventure: 'thirst for adventure',
    social: 'social energy',
    luxury: 'love of luxury',
    nature: 'love of nature',
    culture: 'cultural curiosity',
    urban: 'urban spirit',
    romance: 'romantic soul',
    spirituality: 'spiritual depth',
  };

  const top = sortedTraits.map((t) => traitLabels[t.trait]);
  return `Matched to your ${top[0]} and ${top[1]}.`;
}

/**
 * Determine the user's personality type from their trait profile
 */
function determinePersonalityType(userTraits: TraitScores): PersonalityType {
  let best: PersonalityType = PERSONALITY_TYPES[0];
  let bestScore = -Infinity;

  for (const type of PERSONALITY_TYPES) {
    const score = type.traits.reduce((sum, t) => sum + userTraits[t], 0) / type.traits.length;
    if (score > bestScore) {
      bestScore = score;
      best = type;
    }
  }

  return best;
}

/**
 * Get the dominant traits for a user (top 3 traits above 0.5)
 */
function getDominantTraits(userTraits: TraitScores): TraitKey[] {
  return ALL_TRAITS
    .filter((t) => userTraits[t] > 0.4)
    .sort((a, b) => userTraits[b] - userTraits[a])
    .slice(0, 3);
}

// ──────────────────────────────────────────────
// Main match function
// ──────────────────────────────────────────────

export interface MatchRequest {
  answers: QuizAnswer[];
  moodMode?: MoodMode;
  topN?: number;
}

export function matchDestinations({
  answers,
  moodMode = 'default',
  topN = 3,
}: MatchRequest): MatchResult {
  // 1. Aggregate user traits from answers
  let userTraits = aggregateUserTraits(answers);

  // 2. Apply mood boost if any
  const mood = moodModes.find((m) => m.id === moodMode) ?? moodModes[0];
  userTraits = applyMoodBoost(userTraits, mood);

  // 3. Score all destinations
  const scored = destinations.map((dest) => {
    const rawScore = scoreDestination(userTraits, dest);
    const traitBreakdown = computeTraitBreakdown(userTraits, dest);
    const whyItFits = generateWhyItFits(userTraits, dest, traitBreakdown);

    return {
      destination: dest,
      score: Math.round(rawScore),
      traitBreakdown,
      whyItFits,
    } satisfies DestinationMatch;
  });

  // 4. Sort by score desc, take top N
  scored.sort((a, b) => b.score - a.score);
  const topMatches = scored.slice(0, topN);

  // 5. Normalize scores so top match = 98% and there's spread
  const maxScore = topMatches[0].score;
  const minScore = topMatches[topMatches.length - 1].score;
  const range = maxScore - minScore || 1;

  const normalizedMatches: DestinationMatch[] = topMatches.map((m, i) => ({
    ...m,
    score: i === 0
      ? 94 + Math.round(Math.random() * 4) // top is 94-98%
      : Math.round(65 + ((m.score - minScore) / range) * 25),
  }));

  // Ensure scores are descending
  normalizedMatches.sort((a, b) => b.score - a.score);

  // 6. Determine personality type
  const personality = determinePersonalityType(userTraits);

  return {
    personalityType: personality.label,
    personalityEmoji: personality.emoji,
    personalityDescription: personality.description,
    topMatches: normalizedMatches,
    dominantTraits: getDominantTraits(userTraits),
  };
}

// ──────────────────────────────────────────────
// Helper to convert raw quiz answers from the API
// ──────────────────────────────────────────────

export { ALL_TRAITS };
