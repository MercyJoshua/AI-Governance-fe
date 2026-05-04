export type RiskLevel = 'SAFE' | 'MEDIUM' | 'HIGH';
export type DecisionStatus = 'ALLOWED' | 'REVIEW_REQUIRED' | 'BLOCKED';
export type ExecutionEnvironment = 'development' | 'staging' | 'production';
export type ExecutionPermission = 'read' | 'write' | 'admin';

export interface AnalysisResult {
  response: string;
  risk_level: RiskLevel;
  detected_risks: string[];
  blocked: boolean;
  reasoning: string;
  timestamp: string;
  decision_status: DecisionStatus;
  requires_approval: boolean;
  action_type: 'READ' | 'WRITE' | 'DELETE' | 'EXECUTE';
  action_resource: string;
  environment: ExecutionEnvironment;
  permission: ExecutionPermission;
  autonomous: boolean;
}

export interface LogEntry extends AnalysisResult {
  id: string;
  prompt: string;
}

export interface AnalyzeInput {
  prompt: string;
  environment: ExecutionEnvironment;
  permission: ExecutionPermission;
  autonomous: boolean;
}
