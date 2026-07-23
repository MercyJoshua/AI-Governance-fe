import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const metrics = [
  ["Policy checks", "Approval-first"],
  ["Audit trail", "Always on"],
  ["Control surface", "Environment-aware"],
];

const checkpoints = [
  "Policy mediation before execution",
  "Approval gates for high-risk actions",
  "Audit logs for every decision",
  "Environment-aware controls at runtime",
];

const LandingHero: React.FC = () => {
  return (
    <section className="mx-auto grid w-full max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-28">
      <div className="space-y-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/70 bg-white/80 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-blue-700 shadow-[0_8px_30px_rgba(37,99,235,0.08)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/70 dark:text-cyan-300 animate-fade-up">
          <Sparkles className="h-3.5 w-3.5" />
          AI Agent Assurance
        </div>

        <div className="space-y-5">
          <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl dark:text-white animate-fade-up" style={{ animationDelay: "90ms" }}>
           Prevent AI agents from becoming production risk.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl dark:text-slate-300 animate-fade-up" style={{ animationDelay: "180ms" }}>
            Build trustworthy AI agents with pre-deployment evaluation and runtime controls. Today, we provide policy mediation, approval workflows, audit trails, and environment-aware governance. Preflight QA is the next step toward complete agent reliability assurance.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row animate-fade-up" style={{ animationDelay: "260ms" }}>
          <Button asChild size="lg" className="group">
            <Link to="/dashboard">
              Enter dashboard
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-white/75 dark:bg-slate-900/75">
            <a href="#today">See today&apos;s scope</a>
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 animate-fade-up" style={{ animationDelay: "340ms" }}>
          {metrics.map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-[0_12px_40px_rgba(15,23,42,0.06)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
              <p className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">{value}</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative">
        <div className="absolute -left-10 top-10 h-32 w-32 rounded-full bg-cyan-400/20 blur-3xl animate-pulse" />
        <div className="absolute -right-8 bottom-12 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl animate-pulse" />

        <div className="relative rounded-[2rem] border border-white/70 bg-white/80 p-5 shadow-[0_30px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80 animate-float-slow">
          <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900/80">
            <div className="space-y-4">
              {checkpoints.map((step, index) => (
                <div
                  key={step}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-950/80 animate-fade-up"
                  style={{ animationDelay: `${index * 90}ms` }}
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm text-slate-600 dark:text-slate-300">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
