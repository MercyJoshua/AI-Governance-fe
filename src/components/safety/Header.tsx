import React from 'react';
import { Shield, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';

const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-md border border-slate-200 dark:border-slate-800 flex items-center justify-center bg-slate-50 dark:bg-slate-900">
            <Shield className="h-4 w-4 text-slate-700 dark:text-slate-300" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
              AI Governance Layer
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Mediate and enforce agent execution policy
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono text-slate-600 dark:text-slate-400">
              governance.online
            </span>
          </div>
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="h-9 w-9 rounded-md border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="h-4 w-4 text-slate-300" />
            ) : (
              <Moon className="h-4 w-4 text-slate-700" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
