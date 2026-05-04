import React from 'react';
import { Trash2, Database } from 'lucide-react';
import RiskBadge from './RiskBadge';
import type { LogEntry } from './types';

interface LogsTableProps {
  logs: LogEntry[];
  onClear: () => void;
  onSelect: (log: LogEntry) => void;
}

const truncate = (s: string, n: number) => (s.length > n ? s.slice(0, n) + '…' : s);

const formatTime = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
};

const LogsTable: React.FC<LogsTableProps> = ({ logs, onClear, onSelect }) => {
  return (
    <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden">
      <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Database className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400" />
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Mediation Log
          </span>
          <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
            ({logs.length})
          </span>
        </div>
        {logs.length > 0 && (
          <button
            onClick={onClear}
            className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
          >
            <Trash2 className="h-3 w-3" />
            Clear
          </button>
        )}
      </div>

      {logs.length === 0 ? (
        <div className="px-4 py-8 text-center">
          <div className="text-xs font-mono text-slate-400 dark:text-slate-600">
            No mediated requests yet. Submit an execution request to begin.
          </div>
        </div>
      ) : (
        <div className="max-h-80 overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-900/50 sticky top-0">
              <tr className="text-left">
                <th className="px-4 py-2 text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">
                  Prompt
                </th>
                <th className="px-4 py-2 text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium w-24">
                  Decision
                </th>
                <th className="px-4 py-2 text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium w-24 text-right">
                  Time
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-900">
              {logs.map((log) => (
                <tr
                  key={log.id}
                  onClick={() => onSelect(log)}
                  className="hover:bg-slate-50 dark:hover:bg-slate-900/50 cursor-pointer transition-colors"
                >
                  <td className="px-4 py-2.5 font-mono text-xs text-slate-700 dark:text-slate-300">
                    {truncate(log.prompt, 60)}
                  </td>
                  <td className="px-4 py-2.5">
                    <RiskBadge level={log.risk_level} size="sm" />
                  </td>
                  <td className="px-4 py-2.5 font-mono text-[11px] text-slate-500 dark:text-slate-400 text-right tabular-nums">
                    {formatTime(log.timestamp)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LogsTable;
