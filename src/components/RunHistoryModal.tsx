import React from "react";
import { X, CheckCircle, AlertTriangle, Clock, ArrowRight, Globe } from "lucide-react";

export interface RunHistoryItem {
  id: string;
  goal: string;
  timestamp: string;
  status: "completed" | "failed";
  resultValue: string;
  durationMs: number;
  verifier: {
    status: string;
    reason: string;
    confidence: string;
    attempt: string;
  };
  sourcesCount: number;
  isGoogleData?: boolean;
}

interface RunHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  runs: RunHistoryItem[];
  onSelectGoal: (goal: string) => void;
}

export const RunHistoryModal: React.FC<RunHistoryModalProps> = ({
  isOpen,
  onClose,
  runs,
  onSelectGoal,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="bg-white border border-[#f0dfa0] rounded-xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-[#f0dfa0]">
          <div>
            <h3 className="font-semibold text-base text-[#1c1c1c] m-0">
              Agent Execution Audit History
            </h3>
            <p className="text-xs text-[#948655] font-mono-code m-0 mt-0.5">
              Persistent log of completed and verified agent runs
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-[#948655] hover:text-[#1c1c1c] hover:bg-[#fff6d8]"
            type="button"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto flex-1 flex flex-col gap-2.5">
          {runs.length === 0 ? (
            <div className="py-12 text-center text-sm font-mono-code text-[#948655]">
              No runs recorded in this session yet. Run an agent task to record an audit trail.
            </div>
          ) : (
            runs.map((r) => (
              <div
                key={r.id}
                className="p-3.5 rounded-lg border border-[#f0dfa0] bg-[#fff6d8]/40 hover:bg-[#fff6d8] transition-all flex flex-col gap-2"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs font-semibold text-[#1c1c1c]">{r.goal}</span>
                      {r.isGoogleData && (
                        <span className="text-[9px] font-mono-code px-1.5 py-0.5 rounded bg-[#fff3bf] text-[#b8860b] border border-[#f0dfa0] flex items-center gap-0.5">
                          <Globe className="w-2.5 h-2.5" />
                          Google Grounded
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-[11px] font-mono-code text-[#948655]">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {r.timestamp} ({(r.durationMs / 1000).toFixed(1)}s)
                      </span>
                      <span>·</span>
                      <span className="text-[#b8860b] font-medium truncate max-w-xs">
                        Result: {r.resultValue}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onSelectGoal(r.goal);
                      onClose();
                    }}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs font-mono-code rounded bg-white border border-[#f0dfa0] text-[#b8860b] hover:bg-[#ffe066]/30 transition-colors flex-shrink-0"
                    type="button"
                  >
                    <span>Load</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-[#f0dfa0]/60 text-[11px] font-mono-code">
                  <span className="flex items-center gap-1 text-[#b8860b]">
                    <CheckCircle className="w-3 h-3" />
                    Verifier: {r.verifier.status} ({r.verifier.confidence})
                  </span>
                  <span>·</span>
                  <span className="text-[#948655] truncate">{r.verifier.reason}</span>
                  {r.sourcesCount > 0 && (
                    <>
                      <span>·</span>
                      <span className="text-[#948655]">{r.sourcesCount} web sources</span>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-3 border-t border-[#f0dfa0] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold rounded-md bg-[#ffd400] text-[#3a2a00] hover:brightness-105"
            type="button"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
