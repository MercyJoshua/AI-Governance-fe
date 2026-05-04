import React from 'react';
import type { LogEntry } from './types';

interface StatsBarProps {
  logs: LogEntry[];
}

const StatsBar: React.FC<StatsBarProps> = ({ logs }) => {
  const total = logs.length;
  const safe = logs.filter((l) => l.risk_level === 'SAFE').length;
  const medium = logs.filter((l) => l.risk_level === 'MEDIUM').length;
  const high = logs.filter((l) => l.risk_level === 'HIGH').length;
  const blocked = logs.filter((l) => l.blocked).length;

  const stats = [
    { label: 'Total', value: total, color: 'text-slate-700 dark:text-slate-300' },
    { label: 'Safe', value: safe, color: 'text-emerald-600 dark:text-emerald-400' },
    { label: 'Medium', value: medium, color: 'text-amber-600 dark:text-amber-400' },
    { label: 'High', value: high, color: 'text-red-600 dark:text-red-400' },
    { label: 'Blocked', value: blocked, color: 'text-slate-700 dark:text-slate-300' },
  ];

  return (
    <div className="grid grid-cols-5 gap-2">
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 py-2.5"
        >
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {s.label}
          </div>
          <div className={`text-xl font-mono font-semibold tabular-nums mt-0.5 ${s.color}`}>
            {s.value}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsBar;
