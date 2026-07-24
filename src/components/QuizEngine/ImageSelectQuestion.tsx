'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ImageSelectQuestion as IImageSelectQuestion, TraitScores } from '@/types';

interface Props {
  question: IImageSelectQuestion;
  onAnswer: (traits: Partial<TraitScores>) => void;
  selectedId: string | null;
}

export default function ImageSelectQuestion({ question, onAnswer }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (optionId: string, traits: Partial<TraitScores>) => {
    setSelected(optionId);
    onAnswer(traits);
  };

  return (
    <div className="glass rounded-3xl p-6 sm:p-8">
      <h2 className="font-display text-2xl sm:text-3xl font-bold text-white text-center mb-2">
        {question.question}
      </h2>
      {question.subtitle && (
        <p className="text-slate-400 text-center mb-6 text-sm">{question.subtitle}</p>
      )}

      <div className={`grid gap-4 ${question.options.length === 4 ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-3'}`}>
        {question.options.map((option, i) => (
          <motion.button
            key={option.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            onClick={() => handleSelect(option.id, option.traits)}
            className={`relative rounded-2xl overflow-hidden aspect-square flex flex-col items-center justify-center gap-2 p-4 transition-all cursor-pointer border-2 ${
              selected === option.id
                ? 'border-blue-400 scale-[0.98]'
                : 'border-transparent hover:border-white/30 hover:scale-[1.02]'
            }`}
            style={{ background: option.gradient }}
            aria-label={option.label}
            aria-pressed={selected === option.id}
          >
            {/* Overlay */}
            <div
              className={`absolute inset-0 transition-all duration-200 ${
                selected === option.id ? 'bg-black/20' : 'bg-black/30 hover:bg-black/20'
              }`}
            />

            {/* Selected ring */}
            {selected === option.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-3 right-3 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center z-20"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
            )}

            <span className="text-4xl z-10 relative drop-shadow-lg">{option.emoji}</span>
            <span className="text-white font-semibold text-sm text-center z-10 relative drop-shadow leading-tight">
              {option.label}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
