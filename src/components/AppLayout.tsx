import React, { useEffect, useState } from 'react';
import { Activity } from 'lucide-react';
import { toast } from 'sonner';
import Header from '@/components/safety/Header';
import InputForm from '@/components/safety/InputForm';
import ResponseCard from '@/components/safety/ResponseCard';
import LogsTable from '@/components/safety/LogsTable';
import StatsBar from '@/components/safety/StatsBar';
import { analyzePrompt, clearLogs, fetchLogs } from '@/lib/api';
import type { AnalysisResult, AnalyzeInput, LogEntry } from '@/components/safety/types';

const mapAnalyzeResult = (prompt: string, data: Awaited<ReturnType<typeof analyzePrompt>>): LogEntry => ({
  id: crypto.randomUUID(),
  prompt,
  response: data.response,
  risk_level: data.level,
  detected_risks: data.risks || [],
  blocked: data.block,
  reasoning: data.decision.reason,
  timestamp: data.timestamp || new Date().toISOString(),
  decision_status: data.decision.status,
  requires_approval: data.decision.requiresApproval,
  action_type: data.action.type,
  action_resource: data.action.resource,
  environment: data.metadata.environment,
  permission: data.metadata.permission,
  autonomous: data.metadata.autonomous,
});

const mapLogResult = (data: Awaited<ReturnType<typeof fetchLogs>>[number], idx: number): LogEntry => ({
  id: `${data.timestamp}-${idx}`,
  prompt: data.prompt,
  response: data.response,
  risk_level: data.level,
  detected_risks: data.risks || [],
  blocked: data.block,
  reasoning: data.decision?.reason || '',
  timestamp: data.timestamp,
  decision_status: data.decision?.status || (data.block ? 'BLOCKED' : 'ALLOWED'),
  requires_approval: data.decision?.requiresApproval || false,
  action_type: data.action?.includes('DELETE')
    ? 'DELETE'
    : data.action?.includes('WRITE')
      ? 'WRITE'
      : data.action?.includes('EXECUTE')
        ? 'EXECUTE'
        : 'READ',
  action_resource: data.action || 'unknown',
  environment: data.metadata?.environment || 'development',
  permission: data.metadata?.permission || 'write',
  autonomous: data.metadata?.autonomous ?? true,
});

const AppLayout: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(null);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    const loadLogs = async () => {
      try {
        const data = await fetchLogs();
        setLogs(data.map(mapLogResult).reverse().slice(0, 50));
      } catch (error) {
        console.error('Failed to load backend logs:', error);
      }
    };
    loadLogs();
  }, []);

  const handleAnalyze = async (input: AnalyzeInput) => {
    setLoading(true);
    try {
      const data = await analyzePrompt(input);
      const entry = mapAnalyzeResult(input.prompt, data);

      setCurrentResult(entry);
      setCurrentPrompt(input.prompt);
      setLogs((prev) => [entry, ...prev].slice(0, 50));

      if (entry.decision_status === 'BLOCKED') {
        toast.error('Execution blocked by governance policy', { description: entry.reasoning });
      } else if (entry.decision_status === 'REVIEW_REQUIRED') {
        toast.warning('Human approval required', { description: entry.reasoning });
      } else {
        toast.success('Execution approved');
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      toast.error('Execution mediation failed', { description: msg });
    } finally {
      setLoading(false);
    }
  };

  const handleSelectLog = (log: LogEntry) => {
    setCurrentResult(log);
    setCurrentPrompt(log.prompt);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearLogs = async () => {
    try {
      await clearLogs();
      setLogs([]);
      toast.success('Execution logs cleared');
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Unknown error';
      toast.error('Failed to clear logs', { description: msg });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Header />

      <main className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        <section className="text-center py-6 border-b border-slate-200 dark:border-slate-800">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 mb-4">
            <Activity className="h-3 w-3 text-slate-500 dark:text-slate-400" />
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400">
              v2.0 - Governance Mediation
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            Govern agent execution with policy mediation
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-xl mx-auto">
            Enforce environment-aware policies, permission checks, and human approval gates for irreversible AI actions.
          </p>
        </section>

        {logs.length > 0 && <StatsBar logs={logs} />}

        <section>
          <InputForm onAnalyze={handleAnalyze} loading={loading} />
        </section>

        {currentResult && (
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Latest Mediation Decision
              </span>
              <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
            </div>

            <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 px-4 py-3">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Requested Prompt
              </div>
              <div className="text-sm font-mono text-slate-700 dark:text-slate-300 break-words">
                {currentPrompt}
              </div>
            </div>

            <ResponseCard result={currentResult} />
          </section>
        )}

        <section>
          <LogsTable logs={logs} onClear={handleClearLogs} onSelect={handleSelectLog} />
        </section>
      </main>
    </div>
  );
};

export default AppLayout;
