import React from "react";
import { Link } from "react-router-dom";
import { Moon, Shield, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

const LandingHeader: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <header className="sticky top-0 z-20 border-b border-white/40 bg-white/70 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/70">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-blue-200/80 bg-white shadow-[0_10px_30px_rgba(37,99,235,0.15)] dark:border-slate-700 dark:bg-slate-900">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-cyan-400/10 to-transparent" />
            <Shield className="relative h-5 w-5 text-blue-700 dark:text-cyan-300" />
          </div>
          <div>
            <p className="text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-50">
              AI Agent Assurance
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Runtime governance now, preflight QA next
            </p>
          </div>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          <a href="#today" className="text-sm text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
            Today
          </a>
          <a href="#coming-next" className="text-sm text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
            Coming Next
          </a>
          <a href="#footer" className="text-sm text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
            Contact
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-700 dark:hover:text-cyan-300"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <Button asChild className="hidden sm:inline-flex">
            <Link to="/dashboard">Open dashboard</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;
