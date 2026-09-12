export type PipelineStepKey =
  | 'observe'
  | 'plan'
  | 'execute1'
  | 'verify1'
  | 'replan'
  | 'execute2'
  | 'verify2'
  | 'complete';

export type StepState = 'done' | 'active' | 'fail' | 'warn' | null;

export type DataSourceMode = 'auto' | 'google' | 'math';

export interface PipelineStep {
  key: PipelineStepKey;
  name: string;
  sub: string;
  state?: StepState;
}

export type LogTag =
  | 'OBSERVE'
  | 'PLAN'
  | 'EXECUTE'
  | 'TOOL'
  | 'WEB_SEARCH'
  | 'GOOGLE_DATA'
  | 'VERIFY'
  | 'REPLAN'
  | 'COMPLETE';

export interface LogLineItem {
  id: string;
  time: string;
  tag: LogTag;
  tagClass?: string;
  html: string;
  detail?: string;
  toolName?: string;
}

export interface VerifierState {
  status: '—' | 'PASSED' | 'FAILED' | 'CHECKING';
  reason: string;
  confidence: string;
  attempt: string;
  checks?: Array<{
    name: string;
    passed: boolean;
    detail: string;
  }>;
}

export interface WebSourceItem {
  title: string;
  url: string;
  domain: string;
  snippet?: string;
  freshness?: string;
}

export interface AgentRunResponse {
  id: string;
  goal: string;
  timestamp: string;
  status: 'completed' | 'failed' | 'running';
  resultValue: string;
  verifier: VerifierState;
  logs: LogLineItem[];
  sources: WebSourceItem[];
  searchQueries?: string[];
  dataSource?: DataSourceMode;
  steps: Record<PipelineStepKey, StepState>;
  durationMs: number;
}
