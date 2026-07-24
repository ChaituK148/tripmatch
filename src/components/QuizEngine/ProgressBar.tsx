'use client';

interface ProgressBarProps {
  progress: number;
  currentIndex: number;
  total: number;
}

export default function ProgressBar({ progress, currentIndex, total }: ProgressBarProps) {
  return (
    <div className="w-full mb-2">
      {/* Step dots */}
      <div className="flex items-center gap-1 mb-3 justify-center flex-wrap">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i < currentIndex
                ? 'bg-blue-500 w-5'
                : i === currentIndex
                ? 'bg-gold-400 w-6'
                : 'bg-white/15 w-3'
            }`}
          />
        ))}
      </div>

      {/* Track bar */}
      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-gradient rounded-full progress-bar-fill"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={currentIndex}
          aria-valuemin={0}
          aria-valuemax={total}
        />
      </div>
    </div>
  );
}
