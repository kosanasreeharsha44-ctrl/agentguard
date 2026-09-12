import React, { useEffect, useRef, useState } from "react";
import { Copy, Check, Filter, Trash2 } from "lucide-react";
import { LogLineItem } from "../types";

interface ExecutionLogProps {
  logs: LogLineItem[];
  onClear?: () => void;
  isRunning?: boolean;
}

export const ExecutionLog: React.FC<ExecutionLogProps> = ({ logs, onClear, isRunning }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<string>("ALL");
  const [copied, setCopied] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);

  useEffect(() => {
    if (autoScroll && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, autoScroll]);

  const filteredLogs = logs.filter((log) => {
    if (filter === "ALL") return true;
    if (filter === "VERIFY") return log.tag === "VERIFY";
    if (filter === "EXECUTE") return log.tag === "EXECUTE" || log.tag === "TOOL" || log.tag === "WEB_SEARCH";
    if (filter === "REPLAN") return log.tag === "REPLAN" || log.tagClass?.includes("fail");
    return true;
  });

  const handleCopyLogs = () => {
    const text = logs
      .map((l) => {
        const cleanMsg = l.html.replace(/<[^>]*>?/gm, "");
        return `[${l.time}] [${l.tag}] ${cleanMsg}`;
      })
      .join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="panel log-panel" id="log-panel">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h2 className="!mb-0">Execution log</h2>

        <div className="flex items-center gap-2">
          {/* Tag filter pills */}
          <div className="flex items-center gap-1 bg-[#fff6d8] p-0.5 rounded-md border border-[#f0dfa0] text-[11px] font-mono-code">
            {(["ALL", "EXECUTE", "VERIFY", "REPLAN"] as const).map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setFilter(tag)}
                className={`px-2 py-0.5 rounded transition-colors ${
                  filter === tag
                    ? "bg-[#ffd400] text-[#3a2a00] font-semibold"
                    : "text-[#948655] hover:text-[#1c1c1c]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {logs.length > 0 && (
            <button
              onClick={handleCopyLogs}
              title="Copy execution log"
              className="p-1 rounded text-[#948655] hover:text-[#1c1c1c] hover:bg-[#fff6d8]"
              type="button"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#b8860b]" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          )}

          {logs.length > 0 && !isRunning && onClear && (
            <button
              onClick={onClear}
              title="Clear log"
              className="p-1 rounded text-[#948655] hover:text-[#d32f2f] hover:bg-[#fdecea]"
              type="button"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      <div className="log-scroll" id="logScroll" ref={scrollRef}>
        {filteredLogs.length === 0 ? (
          <div className="empty-log" id="emptyLog">
            {logs.length === 0
              ? "No run yet — press \"Run agent\" to start."
              : "No log entries match the selected filter."}
          </div>
        ) : (
          filteredLogs.map((item) => {
            const tagClassName = `log-tag ${item.tagClass || item.tag}`.trim();
            return (
              <div className="log-line" key={item.id}>
                <span className="log-time">{item.time}</span>
                <span className={tagClassName}>{item.tag}</span>
                <span
                  className="log-msg"
                  dangerouslySetInnerHTML={{ __html: item.html }}
                />
              </div>
            );
          })
        )}
      </div>

      <div className="flex justify-between items-center pt-2 mt-2 border-t border-[#f0dfa0] text-[11px] font-mono-code text-[#948655]">
        <span>
          {logs.length} events logged {isRunning ? "· streaming live" : ""}
        </span>
        <label className="flex items-center gap-1 cursor-pointer">
          <input
            type="checkbox"
            checked={autoScroll}
            onChange={(e) => setAutoScroll(e.target.checked)}
            className="w-3 h-3 rounded text-[#b8860b] focus:ring-[#ffd400]"
          />
          <span>auto-scroll</span>
        </label>
      </div>
    </div>
  );
};
