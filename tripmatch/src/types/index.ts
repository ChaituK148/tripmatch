// ──────────────────────────────────────────────
// Trait Dimensions
// ──────────────────────────────────────────────
export type TraitKey =
  | 'adventure'
  | 'social'
  | 'luxury'
  | 'nature'
  | 'culture'
  | 'urban'
  | 'romance'
  | 'spirituality';

export type TraitScores = Record<TraitKey, number>;

// ──────────────────────────────────────────────
// Quiz Questions
// ──────────────────────────────────────────────
export type QuestionType = 'image-select' | 'slider' | 'multiple-choice' | 'multi-select';

export interface ImageOption {
  id: string;
  label: string;
  emoji: string;
  gradient: string; // CSS gradient string for card background
  traits: Partial<TraitScores>;
}

export interface SliderQuestion {
  id: string;
  type: 'slider';
  category: string;
  question: string;
  leftLabel: string;
  rightLabel: string;
  leftEmoji: string;
  rightEmoji: string;
  leftTraits: Partial<TraitScores>;
  rightTraits: Partial<TraitScores>;
}

export interface ImageSelectQuestion {
  id: string;
  type: 'image-select';
  category: string;
  question: string;
  subtitle?: string;
  options: ImageOption[];
}

export interface ChoiceOption {
  id: string;
  label: string;
  emoji: string;
  traits: Partial<TraitScores>;
}

export interface MultipleChoiceQuestion {
  id: string;
  type: 'multiple-choice';
  category: string;
  question: string;
  subtitle?: string;
  options: ChoiceOption[];
}

export interface MultiSelectQuestion {
  id: string;
  type: 'multi-select';
  category: string;
  question: string;
  subtitle?: string;
  maxSelections: number;
  options: ChoiceOption[];
}

export type Question =
  | SliderQuestion
  | ImageSelectQuestion
  | MultipleChoiceQuestion
  | MultiSelectQuestion;

// ──────────────────────────────────────────────
// Answer Storage
// ──────────────────────────────────────────────
export interface QuizAnswer {
  questionId: string;
  traits: Partial<TraitScores>;
  weight: number; // 0–1 importance multiplier
}

// ──────────────────────────────────────────────
// Destinations
// ──────────────────────────────────────────────
export interface Activity {
  name: string;
  emoji: string;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  tagline: string;
  emotionalDescription: string;
  heroGradient: string; // CSS gradient for hero background
  accentColor: string;  // hex for trait bars
  traits: TraitScores;
  activities: Activity[];
  bestTimeToVisit: string;
  budgetLevel: 'Budget' | 'Mid-range' | 'Luxury' | 'Ultra-luxury';
  budgetRange: string;
  personalityTypes: string[];
  highlights: string[];
}

// ──────────────────────────────────────────────
// Matching Results
// ──────────────────────────────────────────────
export interface DestinationMatch {
  destination: Destination;
  score: number;        // 0–100
  traitBreakdown: Record<TraitKey, number>; // 0–100 per trait
  whyItFits: string;
}

export interface MatchResult {
  personalityType: string;
  personalityEmoji: string;
  personalityDescription: string;
  topMatches: DestinationMatch[];
  dominantTraits: TraitKey[];
}

// ──────────────────────────────────────────────
// Mood Modes
// ──────────────────────────────────────────────
export type MoodMode = 'default' | 'relax' | 'adventure' | 'luxury';

export interface MoodConfig {
  id: MoodMode;
  label: string;
  emoji: string;
  traitBoosts: Partial<TraitScores>;
}
