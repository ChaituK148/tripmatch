'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Compass } from 'lucide-react';
import Link from 'next/link';

import { questions, QUESTION_WEIGHTS } from '@/data/questions';
import { QuizAnswer, TraitScores } from '@/types';

import ProgressBar from '@/components/QuizEngine/ProgressBar';
import ImageSelectQuestion from '@/components/QuizEngine/ImageSelectQuestion';
import SliderQuestion from '@/components/QuizEngine/SliderQuestion';
import MultipleChoiceQuestion from '@/components/QuizEngine/MultipleChoiceQuestion';
import MultiSelectQuestion from '@/components/QuizEngine/MultiSelectQuestion';

// Slide transition variants
const variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? '60%' : '-60%',
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: [0.25, 1, 0.5, 1] },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? '-60%' : '60%',
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.35, ease: [0.25, 1, 0.5, 1] },
  }),
};

// Stars background (lightweight)
function MiniStars() {
  const stars = Array.from({ length: 40 }, (_, i) => ({
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
            width: s.size,
            height: s.size,
            left: `${s.x}%`,
            top: `${s.y}%`,
            '--duration': `${s.duration}s`,
            '--delay': `${s.delay}s`,
            '--opacity': s.opacity,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

export default function QuizPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState<Partial<TraitScores> | null>(null);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;
  const isLastQuestion = currentIndex === questions.length - 1;

  const handleAnswer = useCallback((traits: Partial<TraitScores>) => {
    setCurrentAnswer(traits);
  }, []);

  const handleNext = useCallback(async () => {
    if (!currentAnswer) return;

    const newAnswer: QuizAnswer = {
      questionId: currentQuestion.id,
      traits: currentAnswer,
      weight: QUESTION_WEIGHTS[currentQuestion.id] ?? 1.0,
    };

    const newAnswers = [...answers];
    const existingIdx = newAnswers.findIndex((a) => a.questionId === currentQuestion.id);
    if (existingIdx >= 0) {
      newAnswers[existingIdx] = newAnswer;
    } else {
      newAnswers.push(newAnswer);
    }

    setAnswers(newAnswers);

    if (isLastQuestion) {
      setIsSubmitting(true);
      try {
        const res = await fetch('/api/match', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answers: newAnswers, moodMode: 'default', topN: 3 }),
        });
        const result = await res.json();
        sessionStorage.setItem('tripmatch_result', JSON.stringify(result));
        sessionStorage.setItem('tripmatch_answers', JSON.stringify(newAnswers));
        router.push('/results');
      } catch (e) {
        console.error('Match API error:', e);
        setIsSubmitting(false);
      }
      return;
    }

    setDirection(1);
    setCurrentAnswer(null);
    setCurrentIndex((i) => i + 1);
  }, [currentAnswer, currentQuestion, answers, isLastQuestion, router]);

  const handleBack = useCallback(() => {
    if (currentIndex === 0) return;
    setDirection(-1);
    setCurrentAnswer(null);
    setCurrentIndex((i) => i - 1);
  }, [currentIndex]);

  // Category color map
  const categoryColor: Record<string, string> = {
    'Personality': 'text-purple-400',
    'Travel Style': 'text-blue-400',
    'Interests': 'text-emerald-400',
  };

  if (isSubmitting) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
        <MiniStars />
        <div className="pointer-events-none fixed inset-0" aria-hidden="true">
          <div className="orb" style={{ width: 500, height: 500, background: '#3B82F6', top: '-10%', left: '-5%', '--duration': '25s' } as React.CSSProperties} />
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center z-10 px-6"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-20 h-20 rounded-full bg-blue-gradient flex items-center justify-center mx-auto mb-6"
          >
            <Compass size={36} className="text-white" />
          </motion.div>
          <h2 className="font-display text-3xl text-white font-bold mb-3">
            Analyzing your personality…
          </h2>
          <p className="text-slate-400 text-lg">Matching you with the world&apos;s best destinations</p>
          <div className="flex justify-center gap-2 mt-6">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-blue-400 rounded-full"
                animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.3 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <MiniStars />

      {/* Background orbs */}
      <div className="pointer-events-none fixed inset-0" aria-hidden="true">
        <div className="orb" style={{ width: 600, height: 600, background: '#3B82F6', top: '-20%', right: '-10%', '--duration': '30s' } as React.CSSProperties} />
        <div className="orb" style={{ width: 400, height: 400, background: '#F59E0B', bottom: '-10%', left: '-10%', '--duration': '25s' } as React.CSSProperties} />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
          <Compass size={20} className="text-blue-400" />
          <span className="font-display font-bold text-lg">TripMatch</span>
        </Link>
        <span className="text-slate-400 text-sm font-medium">
          {currentIndex + 1} of {questions.length}
        </span>
      </header>

      {/* Progress */}
      <div className="relative z-10 px-6">
        <ProgressBar progress={progress} currentIndex={currentIndex} total={questions.length} />
      </div>

      {/* Question Area */}
      <main className="relative z-10 flex-1 flex items-start justify-center px-4 py-8">
        <div className="w-full max-w-3xl">

          {/* Category badge */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`cat-${currentIndex}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center mb-4"
            >
              <span className={`text-xs font-semibold uppercase tracking-widest ${categoryColor[currentQuestion.category] ?? 'text-blue-400'}`}>
                {currentQuestion.category}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Question card with slide transition */}
          <div className="relative overflow-hidden" style={{ minHeight: '420px' }}>
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={currentQuestion.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                {currentQuestion.type === 'image-select' && (
                  <ImageSelectQuestion
                    question={currentQuestion}
                    onAnswer={handleAnswer}
                    selectedId={null}
                  />
                )}
                {currentQuestion.type === 'slider' && (
                  <SliderQuestion
                    question={currentQuestion}
                    onAnswer={handleAnswer}
                  />
                )}
                {currentQuestion.type === 'multiple-choice' && (
                  <MultipleChoiceQuestion
                    question={currentQuestion}
                    onAnswer={handleAnswer}
                  />
                )}
                {currentQuestion.type === 'multi-select' && (
                  <MultiSelectQuestion
                    question={currentQuestion}
                    onAnswer={handleAnswer}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between mt-8 gap-4">
            <button
              onClick={handleBack}
              disabled={currentIndex === 0}
              className="px-6 py-3 rounded-full glass text-slate-300 hover:text-white hover:bg-white/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed font-medium"
              aria-label="Previous question"
            >
              ← Back
            </button>

            <button
              onClick={handleNext}
              disabled={!currentAnswer}
              id="next-question-btn"
              className={`px-8 py-3 rounded-full font-semibold text-white transition-all ${
                currentAnswer
                  ? 'bg-blue-gradient btn-glow hover:scale-105'
                  : 'bg-white/10 text-slate-500 cursor-not-allowed'
              }`}
              aria-label={isLastQuestion ? 'See my results' : 'Next question'}
            >
              {isLastQuestion ? '✨ See My Results' : 'Next →'}
            </button>
          </div>

          {/* Skip hint */}
          <p className="text-center text-slate-500 text-xs mt-4">
            Answer to continue · Progress is saved as you go
          </p>
        </div>
      </main>
    </div>
  );
}
