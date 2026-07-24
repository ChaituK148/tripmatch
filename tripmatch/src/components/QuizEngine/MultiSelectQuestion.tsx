'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MultiSelectQuestion as IMultiSelectQuestion, TraitScores } from '@/types';

interface Props {
  question: IMultiSelectQuestion;
  onAnswer: (traits: Partial<TraitScores>) => void;
}

export default function MultiSelectQuestion({ question, onAnswer }: Props) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const computeTraits = (selections: Set<string>): Partial<TraitScores> => {
    const merged: Partial<TraitScores> = {};
    const selectedOptions = question.options.filter((o) => selections.has(o.id));

    for (const opt of selectedOptions) {
      for (const [key, val] of Object.entries(opt.traits)) {
        const k = key as keyof TraitScores;
        merged[k] = Math.min(1, (merged[k] ?? 0) + (val ?? 0) / selectedOptions.length);
      }
    }
    return merged;
  };

  const handleToggle = (optionId: string) => {
    const next = new Set(selected);
    if (next.has(optionId)) {
      next.delete(optionId);
    } else {
      if (next.size >= question.maxSelections) {
        // Remove the oldest selection (first one in set order)
        const first = next.values().next().value as string;
        next.delete(first);
      }
      next.add(optionId);
    }
    setSelected(next);
    if (next.size > 0) {
      onAnswer(computeTraits(next));
    }
  };

  return (
    <div className="glass rounded-3xl p-6 sm:p-8">
      <h2 className="font-display text-2xl sm:text-3xl font-bold text-white text-center mb-2">
        {question.question}
      </h2>
      {question.subtitle && (
        <p className="text-slate-400 text-center mb-2 text-sm">{question.subtitle}</p>
      )}

      {/* Selection count */}
      <div className="text-center mb-5">
        <span className="text-xs text-slate-400">
          {selected.size} / {question.maxSelections} selected
        </span>
        <div className="flex justify-center gap-1 mt-1">
          {Array.from({ length: question.maxSelections }, (_, i) => (
            <div
              key={i}
              className={`h-1 w-4 rounded-full transition-all duration-200 ${
                i < selected.size ? 'bg-gold-400' : 'bg-white/15'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        {question.options.map((option, i) => {
          const isSelected = selected.has(option.id);
          return (
            <motion.button
              key={option.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              onClick={() => handleToggle(option.id)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full border-2 transition-all font-medium text-sm cursor-pointer ${
                isSelected
                  ? 'border-gold-400 bg-gold-400/20 text-gold-300 scale-105'
                  : 'border-white/15 bg-white/5 text-slate-300 hover:border-white/30 hover:bg-white/10 hover:scale-105'
              }`}
              aria-pressed={isSelected}
            >
              <span className="text-lg">{option.emoji}</span>
              <span>{option.label}</span>
              {isSelected && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-4 h-4 bg-gold-400 rounded-full flex items-center justify-center"
                >
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M1.5 4l2 2 3-3" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
