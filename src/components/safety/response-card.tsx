import React from 'react';
import { ShieldCheck, ShieldAlert, AlertTriangle } from 'lucide-react';
import RiskBadge from './risk-badge';
import type { AnalysisResult } from './types';

interface ResponseCardProps {
  result: AnalysisResult;
}

const ResponseCard: React.FC<ResponseCardProps> = ({ result }) => {
  const blocked = result.decision_status === 'BLOCKED' || result.blocked || result.risk_level === 'HIGH';
  const review = result.decision_status === 'REVIEW_REQUIRED';
  const noRiskMessage = blocked
    ? 'No explicit risk tags were returned, but this request was blocked by governance policy checks.'
    : review
      ? 'No explicit risk tags were returned, but this request requires human approval under current policies.'
      : result.risk_level === 'MEDIUM'
        ? 'No explicit high-risk tags were returned. This request is marked medium risk under current policies.'
        : 'No explicit risks detected. Prompt classified as safe under current policies.';

  const getRiskStyle = (risk: string) => {
    if (risk.toLowerCase().includes('injection'))
      return 'bg-red-50 text-red-700 border-red-200';
    if (risk.toLowerCase().includes('unauthorized'))
      return 'bg-amber-50 text-amber-700 border-amber-200';
    return 'bg-slate-50 text-slate-700 border-slate-200';
  };

  return (
    <div className="space-y-4">
      {/* Action status banner */}
      <div
        className={`rounded-lg border px-4 py-3 flex items-center gap-3 ${
          blocked
            ? 'border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/30'
            : review || result.risk_level === 'MEDIUM'
            ? 'border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/30'
            : 'border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/30'
        }`}
      >
        {blocked ? (
          <ShieldAlert className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0" />
        ) : review || result.risk_level === 'MEDIUM' ? (
          <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
        ) : (
          <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
        )}
        <div className="flex-1 min-w-0">
          <div
            className={`text-sm font-medium ${
              blocked
                ? 'text-red-800 dark:text-red-300'
                : review || result.risk_level === 'MEDIUM'
                ? 'text-amber-800 dark:text-amber-300'
                : 'text-emerald-800 dark:text-emerald-300'
            }`}
          >
            {blocked
              ? 'Execution blocked due to policy violation'
              : review
                ? 'Approval required before execution'
                : 'Execution allowed'}
          </div>
          {result.reasoning && (
            <div
              className={`text-xs mt-0.5 ${
                blocked
                  ? 'text-red-700/80 dark:text-red-400/80'
                  : review || result.risk_level === 'MEDIUM'
                  ? 'text-amber-700/80 dark:text-amber-400/80'
                  : 'text-emerald-700/80 dark:text-emerald-400/80'
              }`}
            >
              {result.reasoning}
            </div>
          )}
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            This action was evaluated against safety policies before execution.
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden">
        <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Governance Context
          </span>
          <span className="text-[10px] text-slate-400 dark:text-slate-500">
            Real-time policy enforcement
          </span>
        </div>
        <div className="p-4 text-xs font-mono text-slate-600 dark:text-slate-300 grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>Decision: {result.decision_status}</div>
          <div>Approval Required: {result.requires_approval ? 'yes' : 'no'}</div>
          <div>Action: {result.action_type}</div>
          <div>Resource: {result.action_resource}</div>
          <div>Environment: {result.environment}</div>
          <div>Permission: {result.permission}</div>
        </div>
      </div>

      {/* Risk indicator card */}
      <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden">
        <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Risk Assessment
          </span>
          <RiskBadge level={result.risk_level} />
        </div>
        <div className="p-4">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            Detected Risks
          </div>
          {result.detected_risks.length === 0 ? (
            <div className="text-sm text-slate-500 dark:text-slate-400 font-mono">
              {noRiskMessage}
            </div>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {result.detected_risks.map((risk, i) => (
                <span
                  key={i}
                  className={`text-xs font-mono px-2 py-1 rounded border ${getRiskStyle(risk)}`}
                >
                  {risk}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* AI Response card */}
      <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden">
        <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
            AI Response
          </span>
          <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
            {new Date(result.timestamp).toLocaleTimeString()}
          </span>
        </div>
        <div className="p-4">
          <pre className="text-sm font-mono text-slate-800 dark:text-slate-200 whitespace-pre-wrap break-words leading-relaxed">
            {result.response}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ResponseCard;
