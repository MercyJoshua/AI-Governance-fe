import React from "react";
import { BadgeCheck, FlaskConical } from "lucide-react";

const todayItems = [
  "Policy mediation",
  "Approval gates",
  "Audit logs",
  "Environment-aware controls",
];

const nextItems = [
  "Automated agent testing",
  "Adversarial evaluations",
  "Reliability scoring",
  "Deployment readiness reports",
];

const LandingRoadmap: React.FC = () => {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 pb-16 lg:px-8">
      <div className="grid gap-5 lg:grid-cols-2">
        <article
          id="today"
          className="rounded-[2rem] border border-white/70 bg-white/80 p-7 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/70 animate-fade-up"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/25">
              <BadgeCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-blue-700 dark:text-cyan-300">
                Today
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
                Runtime Governance
              </h2>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {todayItems.map((item) => (
              <div key={item} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950/80 dark:text-slate-300">
                {item}
              </div>
            ))}
          </div>
        </article>

        <article
          id="coming-next"
          className="rounded-[2rem] border border-white/70 bg-white/80 p-7 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/70 animate-fade-up"
          style={{ animationDelay: "100ms" }}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white shadow-lg shadow-violet-500/25">
              <FlaskConical className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-violet-700 dark:text-fuchsia-300">
                Coming Next
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
                Preflight QA
              </h2>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {nextItems.map((item) => (
              <div key={item} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950/80 dark:text-slate-300">
                {item}
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
};

export default LandingRoadmap;
