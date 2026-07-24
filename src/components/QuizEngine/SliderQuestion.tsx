'use client';

import { useState, useEffect, useRef } from 'react';
import { SliderQuestion as ISliderQuestion, TraitScores } from '@/types';

interface Props {
  question: ISliderQuestion;
  onAnswer: (traits: Partial<TraitScores>) => void;
}

export default function SliderQuestion({ question, onAnswer }: Props) {
  const [value, setValue] = useState<number>(50);
  const hasInteracted = useRef(false);

  // Notify parent whenever slider changes
  useEffect(() => {
    if (!hasInteracted.current) {
      // Auto-emit at 50% so user doesn't need to touch it
      emitTraits(50);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function emitTraits(val: number) {
    const t = val / 100; // 0–1
    const merged: Partial<TraitScores> = {};

    // Interpolate between leftTraits (0) and rightTraits (1)
    const allKeys = Array.from(
      new Set([
        ...Object.keys(question.leftTraits),
        ...Object.keys(question.rightTraits),
      ])
    ) as (keyof TraitScores)[];

    for (const key of allKeys) {
      const left = (question.leftTraits[key] ?? 0) * (1 - t);
      const right = (question.rightTraits[key] ?? 0) * t;
      merged[key] = Math.min(1, left + right);
    }

    onAnswer(merged);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    hasInteracted.current = true;
    const val = Number(e.target.value);
    setValue(val);
    emitTraits(val);
  }

  // Dynamic label based on position
  const pos = value / 100;
  const activeLabel =
    pos < 0.3 ? question.leftLabel : pos > 0.7 ? question.rightLabel : 'Balanced';
  const activeEmoji =
    pos < 0.3 ? question.leftEmoji : pos > 0.7 ? question.rightEmoji : '⚖️';

  return (
    <div className="glass rounded-3xl p-6 sm:p-8">
      <h2 className="font-display text-2xl sm:text-3xl font-bold text-white text-center mb-8">
        {question.question}
      </h2>

      {/* Current answer indicator */}
      <div className="text-center mb-8 min-h-[72px] flex flex-col items-center justify-center">
        <div className="text-4xl mb-2 transition-all duration-200">{activeEmoji}</div>
        <div className="text-white font-semibold text-lg transition-all duration-200">
          {activeLabel}
        </div>
      </div>

      {/* Slider */}
      <div className="px-4 mb-6">
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={handleChange}
          className="quiz-slider w-full"
          style={{ '--slider-pct': `${value}%` } as React.CSSProperties}
          aria-label={question.question}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={value}
        />
      </div>

      {/* Endpoint labels */}
      <div className="flex justify-between items-center px-4">
        <div className="text-center max-w-[120px]">
          <div className="text-2xl mb-1">{question.leftEmoji}</div>
          <p className="text-slate-400 text-xs leading-tight">{question.leftLabel}</p>
        </div>

        {/* Tick marks */}
        <div className="flex gap-1 items-center">
          {[0,1,2,3,4].map((i) => (
            <div
              key={i}
              className={`h-2 w-px transition-colors ${
                i * 25 <= value ? 'bg-blue-400' : 'bg-white/20'
              }`}
            />
          ))}
        </div>

        <div className="text-center max-w-[120px]">
          <div className="text-2xl mb-1">{question.rightEmoji}</div>
          <p className="text-slate-400 text-xs leading-tight">{question.rightLabel}</p>
        </div>
      </div>
    </div>
  );
}
