import React from 'react';

export type RiskLevel = 'SAFE' | 'MEDIUM' | 'HIGH';

interface RiskBadgeProps {
  level: RiskLevel;
  size?: 'sm' | 'md';
}

const RiskBadge: React.FC<RiskBadgeProps> = ({ level, size = 'md' }) => {
  const styles: Record<RiskLevel, string> = {
    SAFE: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900',
    MEDIUM: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900',
    HIGH: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-900',
  };

  const dot: Record<RiskLevel, string> = {
    SAFE: 'bg-emerald-500',
    MEDIUM: 'bg-amber-500',
    HIGH: 'bg-red-500',
  };

  const sizing = size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-mono font-medium tracking-wider ${sizing} ${styles[level]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot[level]}`} />
      {level}
    </span>
  );
};

export default RiskBadge;
