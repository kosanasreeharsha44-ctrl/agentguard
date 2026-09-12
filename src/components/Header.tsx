import React, { useEffect, useState } from "react";
import { ShieldCheck, Activity } from "lucide-react";

interface HeaderProps {
  onOpenHistory?: () => void;
  historyCount?: number;
}

export const Header: React.FC<HeaderProps> = ({ onOpenHistory, historyCount = 0 }) => {
  const [healthStatus, setHealthStatus] = useState<string>("checking...");
  const [geminiActive, setGeminiActive] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    fetch("/api/health")
      .then((r) => r.json())
      .then((data) => {
        if (isMounted) {
          setHealthStatus(data.status === "ok" ? "agent runtime online" : "degraded");
          setGeminiActive(Boolean(data.geminiConfigured));
        }
      })
      .catch(() => {
        if (isMounted) {
          setHealthStatus("local sandbox mode");
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <header id="agentguard-header">
      <div className="brand">
        <div className="brand-mark" id="brand-mark">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="AgentGuard Shield">
            <path
              d="M12 2L4 5V11C4 16 7.5 20.5 12 22C16.5 20.5 20 16 20 11V5L12 2Z"
              stroke="#b8860b"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            <path
              d="M9 12L11 14L15.5 9.5"
              stroke="#b8860b"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          <h1 className="text-[19px] font-semibold tracking-[0.2px] m-0 text-[#1c1c1c]">AgentGuard</h1>
          <p className="m-0 text-[13px] text-[#948655] font-mono-code">
            verify every action · recover from every failure
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        {onOpenHistory && (
          <button
            id="open-history-btn"
            onClick={onOpenHistory}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono-code bg-[#fff6d8] border border-[#f0dfa0] text-[#b8860b] hover:bg-[#ffe066]/30 transition-colors"
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Audit History ({historyCount})</span>
          </button>
        )}

        <div className="status-pill" id="runtime-status-pill">
          <span className="dot" />
          <span>{healthStatus}</span>
          {geminiActive && (
            <span className="ml-1 text-[11px] text-[#b8860b] font-medium opacity-80" title="Gemini 3 Connected">
              · AI Grounded
            </span>
          )}
        </div>
      </div>
    </header>
  );
};
