'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MultipleChoiceQuestion as IMultipleChoiceQuestion, TraitScores } from '@/types';

interface Props {
  question: IMultipleChoiceQuestion;
  onAnswer: (traits: Partial<TraitScores>) => void;
}

export default function MultipleChoiceQuestion({ question, onAnswer }: Props) {
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

      <div className="space-y-3 mt-6">
        {question.options.map((option, i) => (
          <motion.button
            key={option.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07, duration: 0.35 }}
            onClick={() => handleSelect(option.id, option.traits)}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left cursor-pointer ${
              selected === option.id
                ? 'border-blue-400 bg-blue-500/20 scale-[0.99]'
                : 'border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/10 hover:scale-[1.01]'
            }`}
            aria-pressed={selected === option.id}
          >
            {/* Selection indicator */}
            <div
              className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                selected === option.id
                  ? 'border-blue-400 bg-blue-400'
                  : 'border-white/30'
              }`}
            >
              {selected === option.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-2 h-2 rounded-full bg-white"
                />
              )}
            </div>

            <span className="text-2xl">{option.emoji}</span>

            <span className={`font-medium transition-colors ${
              selected === option.id ? 'text-white' : 'text-slate-200'
            }`}>
              {option.label}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
