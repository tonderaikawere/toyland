import React from 'react';

export const KidsBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-40 select-none">
      {/* Floating Soft Cloud 1 */}
      <svg className="absolute top-12 left-8 w-32 h-20 text-sky-200 fill-current animate-pulse" viewBox="0 0 100 60">
        <path d="M20 40 a20 20 0 0 1 30 -15 a25 25 0 0 1 40 5 a15 15 0 0 1 -10 25 h-60 a15 15 0 0 1 0 -15 z" />
      </svg>

      {/* Floating Soft Cloud 2 */}
      <svg className="absolute top-48 right-12 w-40 h-24 text-indigo-100 fill-current" viewBox="0 0 100 60">
        <path d="M20 40 a20 20 0 0 1 30 -15 a25 25 0 0 1 40 5 a15 15 0 0 1 -10 25 h-60 a15 15 0 0 1 0 -15 z" />
      </svg>

      {/* Colorful Floating Toy Star 1 */}
      <svg className="absolute top-1/4 left-1/6 w-8 h-8 text-amber-300 fill-current opacity-70" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>

      {/* Colorful Floating Toy Star 2 */}
      <svg className="absolute top-2/3 right-1/4 w-10 h-10 text-rose-300 fill-current opacity-60" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>

      {/* Playful Circle Dots */}
      <div className="absolute top-1/3 right-10 w-12 h-12 rounded-full bg-emerald-200/40" />
      <div className="absolute bottom-1/4 left-12 w-16 h-16 rounded-full bg-purple-200/40" />
      <div className="absolute top-2/3 left-1/3 w-8 h-8 rounded-full bg-pink-200/50" />

      {/* Floating Balloon */}
      <svg className="absolute bottom-32 right-1/6 w-12 h-16 text-rose-400 fill-current opacity-50" viewBox="0 0 50 70">
        <ellipse cx="25" cy="25" rx="20" ry="25" />
        <polygon points="25,50 20,55 30,55" />
        <path d="M25,55 Q20,62 25,70" stroke="currentColor" strokeWidth="2" fill="none" />
      </svg>
    </div>
  );
};
