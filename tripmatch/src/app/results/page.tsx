'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  MapPin,
  Calendar,
  DollarSign,
  RefreshCw,
  Share2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { MatchResult, TraitKey, MoodMode } from '@/types';
import { moodModes } from '@/data/moods';

const TRAIT_LABELS: Record<TraitKey, string> = {
  adventure: 'Adventure',
  social: 'Social Energy',
  luxury: 'Luxury',
  nature: 'Love of Nature',
  culture: 'Cultural Depth',
  urban: 'Urban Spirit',
  romance: 'Romance',
  spirituality: 'Spirituality',
};

const TRAIT_EMOJIS: Record<TraitKey, string> = {
  adventure: '🔥',
  social: '🦋',
  luxury: '💎',
  nature: '🌿',
  culture: '🎭',
  urban: '🌆',
  romance: '💕',
  spirituality: '🧘',
};

const BUDGET_COLORS: Record<string, string> = {
  Budget: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  'Mid-range': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  Luxury: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  'Ultra-luxury': 'bg-gold-500/20 text-gold-300 border-gold-500/30',
};

function MiniStars() {
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    size: Math.random() * 2 + 0.5,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 4,
    opacity: Math.random() * 0.4 + 0.1,
  }));
  return (
    <div className="stars-bg" aria-hidden="true">
      {stars.map((s) => (
        <div
          key={s.id}
          className="star"
          style={{
            width: s.size, height: s.size,
            left: `${s.x}%`, top: `${s.y}%`,
            '--duration': `${s.duration}s`,
            '--delay': `${s.delay}s`,
            '--opacity': s.opacity,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

function TraitBar({
  label, emoji, value, color, delay,
}: {
  label: string; emoji: string; value: number; color: string; delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="flex items-center gap-3"
    >
      <span className="text-lg w-6 flex-shrink-0">{emoji}</span>
      <div className="flex-1">
        <div className="flex justify-between mb-1">
          <span className="text-xs text-slate-300 font-medium">{label}</span>
          <span className="text-xs font-bold" style={{ color }}>{value}%</span>
        </div>
        <div className="trait-bar">
          <motion.div
            className="trait-bar-fill"
            style={{
              width: `${value}%`,
              background: `linear-gradient(90deg, ${color}88, ${color})`,
            }}
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ delay: delay + 0.2, duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          />
        </div>
      </div>
    </motion.div>
  );
}

function DestinationCard({
  match,
  rank,
  isExpanded,
  onToggle,
}: {
  match: MatchResult['topMatches'][0];
  rank: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const { destination: dest, score, traitBreakdown, whyItFits } = match;

  const rankLabel = ['🥇 #1 Match', '🥈 #2 Match', '🥉 #3 Match'][rank] ?? `#${rank + 1}`;

  // Top 4 traits for this destination
  const topTraits = (Object.entries(traitBreakdown) as [TraitKey, number][])
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: rank * 0.15, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
      className="destination-card glass-strong rounded-3xl overflow-hidden"
    >
      {/* Hero banner */}
      <div
        className="relative h-52 sm:h-64 flex flex-col justify-between p-6"
        style={{ background: dest.heroGradient }}
      >
        {/* Overlay shimmer */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Rank badge */}
        <div className="relative z-10 flex items-start justify-between">
          <div className="glass rounded-full px-3 py-1.5 text-xs font-semibold text-white">
            {rankLabel}
          </div>
          <div className="glass rounded-full px-4 py-2 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-white font-bold text-lg">{score}%</span>
            <span className="text-slate-300 text-xs">match</span>
          </div>
        </div>

        {/* Destination name */}
        <div className="relative z-10">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
            {dest.name}
          </h2>
          <div className="flex items-center gap-1.5 mt-1">
            <MapPin size={14} className="text-white/70" />
            <span className="text-white/80 text-sm">{dest.country}</span>
          </div>
          <p className="text-white/70 text-sm mt-2 italic">&ldquo;{dest.tagline}&rdquo;</p>
        </div>
      </div>

      {/* Card body */}
      <div className="p-6">
        {/* Why it fits */}
        <p className="text-slate-300 text-sm leading-relaxed mb-5">
          {dest.emotionalDescription}
        </p>

        {/* Key info */}
        <div className="flex flex-wrap gap-2 mb-5">
          <div className="flex items-center gap-1.5 glass rounded-full px-3 py-1.5">
            <Calendar size={12} className="text-blue-400" />
            <span className="text-slate-300 text-xs">{dest.bestTimeToVisit}</span>
          </div>
          <div className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 border text-xs ${BUDGET_COLORS[dest.budgetLevel] ?? ''}`}>
            <DollarSign size={12} />
            <span>{dest.budgetLevel} · {dest.budgetRange}</span>
          </div>
        </div>

        {/* Trait breakdown (top 4) */}
        <div className="space-y-3 mb-5">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Trait Match</h3>
          {topTraits.map(([trait, value], i) => (
            <TraitBar
              key={trait}
              label={TRAIT_LABELS[trait]}
              emoji={TRAIT_EMOJIS[trait]}
              value={value}
              color={dest.accentColor}
              delay={rank * 0.15 + i * 0.08}
            />
          ))}
        </div>

        {/* Expand/collapse activities */}
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between py-3 border-t border-white/10 text-sm text-slate-400 hover:text-white transition-colors"
          aria-expanded={isExpanded}
          id={`activities-toggle-${dest.id}`}
        >
          <span className="font-medium">Top Activities</span>
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <ul className="space-y-2 pt-2">
                {dest.activities.map((activity, i) => (
                  <motion.li
                    key={activity.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center gap-3 text-sm text-slate-300"
                  >
                    <span className="text-lg">{activity.emoji}</span>
                    <span>{activity.name}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function ResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<MatchResult | null>(null);
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set([0]));
  const [selectedMood, setSelectedMood] = useState<MoodMode>('default');
  const [isRefetching, setIsRefetching] = useState(false);
  const [copied, setCopied] = useState(false);

  const isInitialLoad = useRef(true);

  useEffect(() => {
    const stored = sessionStorage.getItem('tripmatch_result');
    if (!stored) {
      router.push('/quiz');
      return;
    }
    try {
      setResult(JSON.parse(stored));
    } catch {
      router.push('/quiz');
    }
  }, [router]);

  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }

    const storedAnswers = sessionStorage.getItem('tripmatch_answers');
    if (!storedAnswers) return;

    let active = true;

    const refetchMatches = async () => {
      setIsRefetching(true);
      try {
        const answers = JSON.parse(storedAnswers);
        const res = await fetch('/api/match', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answers, moodMode: selectedMood, topN: 3 }),
        });
        if (res.ok && active) {
          const newResult = await res.json();
          setResult(newResult);
        }
      } catch (e) {
        console.error('Error fetching mood-specific matches:', e);
      } finally {
        if (active) {
          setIsRefetching(false);
        }
      }
    };

    refetchMatches();

    return () => {
      active = false;
    };
  }, [selectedMood]);

  const toggleCard = (i: number) => {
    setExpandedCards((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const handleShare = async () => {
    const text = result
      ? `🌍 My TripMatch result: "${result.personalityType}" ${result.personalityEmoji}\n` +
        `Top match: ${result.topMatches[0]?.destination.name} (${result.topMatches[0]?.score}%)!\n` +
        `Find your destination → tripmatch.app`
      : 'Check out TripMatch!';

    if (navigator.share) {
      try {
        await navigator.share({ title: 'My TripMatch Result', text });
      } catch {/* cancelled */}
    } else {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden pb-20">
      <MiniStars />

      {/* Background */}
      <div className="pointer-events-none fixed inset-0" aria-hidden="true">
        <div className="orb" style={{ width: 600, height: 600, background: '#F59E0B', top: '-20%', right: '-15%', '--duration': '30s' } as React.CSSProperties} />
        <div className="orb" style={{ width: 500, height: 500, background: '#3B82F6', bottom: '-15%', left: '-10%', '--duration': '25s' } as React.CSSProperties} />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-5 max-w-5xl mx-auto">
        <Link href="/" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
          <Compass size={20} className="text-blue-400" />
          <span className="font-display font-bold text-lg">TripMatch</span>
        </Link>
        <div className="flex gap-2">
          <button
            onClick={handleShare}
            id="share-btn"
            className="flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-slate-300 hover:text-white hover:bg-white/10 transition-all"
          >
            <Share2 size={14} />
            {copied ? 'Copied!' : 'Share'}
          </button>
          <Link
            href="/quiz"
            id="try-again-btn"
            className="flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-slate-300 hover:text-white hover:bg-white/10 transition-all"
          >
            <RefreshCw size={14} />
            Try Again
          </Link>
        </div>
      </header>

      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">

        {/* Personality Type Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong rounded-3xl p-8 text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="text-6xl mb-4"
          >
            {result.personalityEmoji}
          </motion.div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-2">
            You are{' '}
            <span className="gradient-text-gold">{result.personalityType}</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
            {result.personalityDescription}
          </p>

          {/* Dominant traits */}
          <div className="flex flex-wrap gap-2 justify-center mt-5">
            {result.dominantTraits.map((trait) => (
              <span
                key={trait}
                className="inline-flex items-center gap-1.5 glass rounded-full px-3 py-1.5 text-sm text-slate-200"
              >
                {TRAIT_EMOJIS[trait]} {TRAIT_LABELS[trait]}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Mood mode selector */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <p className="text-center text-slate-400 text-sm mb-3">
            🌀 Adjust your mood mode to refine results
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {moodModes.map((mood) => (
              <button
                key={mood.id}
                onClick={() => setSelectedMood(mood.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                  selectedMood === mood.id
                    ? 'border-gold-400 bg-gold-400/20 text-gold-300'
                    : 'border-white/15 text-slate-400 hover:border-white/30 hover:text-slate-200'
                }`}
                aria-pressed={selectedMood === mood.id}
              >
                <span>{mood.emoji}</span>
                <span>{mood.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-6"
        >
          <h2 className="font-display text-2xl text-white font-bold">Your Top 3 Destinations</h2>
          <p className="text-slate-400 text-sm mt-1">Based on your unique personality profile</p>
        </motion.div>

        {/* Destination Cards */}
        <div className={`space-y-6 transition-all duration-300 ${isRefetching ? 'opacity-40 pointer-events-none blur-[1px]' : 'opacity-100'}`}>
          {result.topMatches.map((match, i) => (
            <DestinationCard
              key={match.destination.id}
              match={match}
              rank={i}
              isExpanded={expandedCards.has(i)}
              onToggle={() => toggleCard(i)}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <div className="glass-strong rounded-3xl p-8 inline-block w-full max-w-lg">
            <p className="text-white font-display text-xl font-bold mb-2">Ready for your next adventure?</p>
            <p className="text-slate-400 text-sm mb-5">
              Share your results or explore a different personality side of you.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleShare}
                className="btn-glow flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-blue-gradient text-white font-semibold transition-all hover:scale-105"
              >
                <Share2 size={16} />
                Share My Results
              </button>
              <Link
                href="/quiz"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-full glass text-slate-200 font-semibold hover:bg-white/10 transition-all"
              >
                <RefreshCw size={16} />
                Retake Quiz
              </Link>
            </div>
          </div>
        </motion.div>

      </main>
    </div>
  );
}
