import React, { useState } from "react";
import { ExternalLink, Copy, Check, Globe } from "lucide-react";
import { WebSourceItem } from "../types";

interface ResultPanelProps {
  resultValue: string;
  isPending: boolean;
  label?: string;
  sources?: WebSourceItem[];
  searchQueries?: string[];
  isGoogleData?: boolean;
}

export const ResultPanel: React.FC<ResultPanelProps> = ({
  resultValue,
  isPending,
  label = "final price",
  sources = [],
  searchQueries = [],
  isGoogleData = false,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (isPending) return;
    navigator.clipboard.writeText(resultValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const dynamicLabel = isGoogleData
    ? "verified google data insight"
    : label;

  return (
    <div className="panel" id="result-panel">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="!mb-0">Result</h2>
          {isGoogleData && (
            <span className="text-[10px] font-mono-code px-1.5 py-0.5 rounded bg-[#fff3bf] text-[#b8860b] border border-[#f0dfa0]">
              Google Grounded
            </span>
          )}
        </div>
        {!isPending && resultValue !== "awaiting run" && (
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-xs font-mono-code text-[#948655] hover:text-[#1c1c1c]"
            title="Copy verified result"
            type="button"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#b8860b]" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        )}
      </div>

      <div className="result-box" id="result-box">
        <div className="rlabel">{dynamicLabel}</div>
        {isPending ? (
          <div className="rvalue pending text-base font-mono-code text-[#948655] py-2" id="resultValue">
            awaiting run
          </div>
        ) : resultValue.length > 80 || resultValue.includes("\n") ? (
          <div
            className="text-left text-sm font-mono-code text-[#1c1c1c] bg-[#fffdf5] p-3 rounded border border-[#f0dfa0] whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto"
            id="resultValue"
          >
            {resultValue}
          </div>
        ) : (
          <div className="rvalue" id="resultValue">
            {resultValue}
          </div>
        )}
      </div>

      <div className="badge-row">
        <span className="badge">planner</span>
        <span className="badge">executor</span>
        <span className="badge">verifier</span>
        <span className="badge">replanner</span>
        {sources.length > 0 && (
          <span className="badge flex items-center gap-1 bg-[#ffd400]/20 text-[#b8860b]">
            <Globe className="w-3 h-3" />
            <span>{sources.length} live sources</span>
          </span>
        )}
      </div>

      {/* Google Search Queries if Grounding was active */}
      {searchQueries.length > 0 && (
        <div className="mt-3.5 pt-3 border-t border-[#f0dfa0]">
          <div className="text-[11px] font-mono-code uppercase tracking-wider text-[#948655] mb-1.5 flex items-center gap-1.5">
            <Globe className="w-3 h-3 text-[#b8860b]" />
            <span>Google Search Queries Executed</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {searchQueries.map((q, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded bg-[#fff6d8] border border-[#f0dfa0] text-[11px] font-mono-code text-[#1c1c1c]"
              >
                &ldquo;{q}&rdquo;
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Real-time Knowledge Sources & Grounding Citations */}
      {sources.length > 0 && (
        <div className="mt-3.5 pt-3 border-t border-[#f0dfa0]">
          <div className="text-[11px] font-mono-code uppercase tracking-wider text-[#948655] mb-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Globe className="w-3 h-3 text-[#b8860b]" />
              <span>Verified Google Data Sources</span>
            </div>
            <span className="text-[10px] text-[#b8860b] font-mono-code font-semibold">
              {sources.length} citations
            </span>
          </div>
          <div className="flex flex-col gap-1.5 max-h-40 overflow-y-auto pr-1">
            {sources.map((src, i) => (
              <a
                key={i}
                href={src.url}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center justify-between gap-2 p-1.5 rounded bg-[#fff6d8] hover:bg-[#ffe066]/30 border border-[#f0dfa0] text-xs transition-colors group"
              >
                <div className="truncate flex-1">
                  <div className="font-medium text-[#1c1c1c] truncate text-[11px] group-hover:text-[#b8860b]">
                    {src.title}
                  </div>
                  <div className="text-[10px] text-[#948655] font-mono-code">
                    {src.domain} {src.freshness ? `· ${src.freshness}` : ""}
                  </div>
                </div>
                <ExternalLink className="w-3 h-3 text-[#948655] flex-shrink-0 group-hover:text-[#b8860b]" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
