import type { AnalyzeInput, ExecutionEnvironment, ExecutionPermission } from '@/components/safety/types';

export interface BackendAnalyzeResponse {
  response: string;
  risks: string[];
  level: 'SAFE' | 'MEDIUM' | 'HIGH';
  block: boolean;
  decision: {
    status: 'ALLOWED' | 'REVIEW_REQUIRED' | 'BLOCKED';
    reason: string;
    requiresApproval: boolean;
  };
  action: {
    type: 'READ' | 'WRITE' | 'DELETE' | 'EXECUTE';
    resource: string;
    irreversible: boolean;
  };
  metadata: {
    environment: ExecutionEnvironment;
    permission: ExecutionPermission;
    autonomous: boolean;
  };
  timestamp: string;
}

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export interface BackendLogEntry {
  prompt: string;
  response: string;
  risks: string[];
  level: 'SAFE' | 'MEDIUM' | 'HIGH';
  block: boolean;
  action: string;
  decision: BackendAnalyzeResponse['decision'];
  metadata: BackendAnalyzeResponse['metadata'];
  timestamp: string;
}

export const analyzePrompt = async (input: AnalyzeInput): Promise<BackendAnalyzeResponse> => {
  const res = await fetch(`${API_URL}/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: input.prompt,
      metadata: {
        environment: input.environment,
        permission: input.permission,
        autonomous: input.autonomous,
      },
    }),
  });

  if (!res.ok) {
    throw new Error(`Backend request failed: ${res.status} ${res.statusText}`);
  }

  return res.json();
};

export const fetchLogs = async (): Promise<BackendLogEntry[]> => {
  const res = await fetch(`${API_URL}/logs`);
  if (!res.ok) {
    throw new Error(`Failed to fetch logs: ${res.status} ${res.statusText}`);
  }
  return res.json();
};

export const clearLogs = async (): Promise<void> => {
  const res = await fetch(`${API_URL}/logs`, { method: 'DELETE' });
  if (!res.ok) {
    throw new Error(`Failed to clear logs: ${res.status} ${res.statusText}`);
  }
};
