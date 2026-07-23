import React from "react";
import { Link } from "react-router-dom";
import { Layers3 } from "lucide-react";
import { Button } from "@/components/ui/button";

const LandingFooter: React.FC = () => {
  return (
    <footer id="footer" className="border-t border-white/50 bg-white/60 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/70">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <div>
          <p className="font-medium text-slate-700 dark:text-slate-300">
            AI Agent Assurance
          </p>
          <p className="mt-1">
            Runtime governance today, preflight QA on the roadmap.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button asChild variant="outline" className="bg-white/80 dark:bg-slate-900/80">
            <Link to="/dashboard">
              Open dashboard
              <Layers3 className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
