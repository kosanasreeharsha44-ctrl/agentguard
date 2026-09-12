import React from "react";
import { Sparkles, RefreshCcw, AlertTriangle, Globe, Calculator, Zap } from "lucide-react";
import { DataSourceMode } from "../types";

interface GoalBarProps {
  goal: string;
  setGoal: (val: string) => void;
  isRunning: boolean;
  onRun: () => void;
  onStop: () => void;
  forceFailAttempt1: boolean;
  setForceFailAttempt1: (val: boolean) => void;
  dataSource: DataSourceMode;
  setDataSource: (mode: DataSourceMode) => void;
}

const PRESETS = [
  {
    label: "Google Data: Alphabet Earnings",
    prompt: "Use Google data to retrieve Alphabet's latest reported quarterly revenue, net income, and Google Cloud growth. Verify all metrics against official sources.",
    forceFail: false,
    mode: "google" as DataSourceMode,
  },
  {
    label: "Math: 17% Discount Stress-Test",
    prompt: "Calculate a 17% discount on ₹2450 and give the final price. Verify the arithmetic before returning the answer.",
    forceFail: true,
    mode: "math" as DataSourceMode,
  },
  {
    label: "Code: Python Binary Search",
    prompt: "Write a clean Python function for binary search with input validation, time complexity analysis, and edge case test cases.",
    forceFail: false,
    mode: "auto" as DataSourceMode,
  },
  {
    label: "Reasoning: SQL vs NoSQL",
    prompt: "Compare SQL and NoSQL database architectures across ACID compliance, horizontal scaling, and optimal production use cases.",
    forceFail: false,
    mode: "auto" as DataSourceMode,
  },
  {
    label: "Google Data: Artemis Mission",
    prompt: "Use Google data to retrieve the latest scheduled launch date and crew status for NASA's Artemis II mission. Verify with verified news sources.",
    forceFail: false,
    mode: "google" as DataSourceMode,
  },
];

export const GoalBar: React.FC<GoalBarProps> = ({
  goal,
  setGoal,
  isRunning,
  onRun,
  onStop,
  forceFailAttempt1,
  setForceFailAttempt1,
  dataSource,
  setDataSource,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isRunning && goal.trim()) {
      onRun();
    }
  };

  return (
    <div className="flex flex-col gap-2.5 mb-7">
      <div className="goal-bar" id="goal-bar">
        <div className="goal-input-group flex-1">
          <div className="flex items-center justify-between mb-1.5 flex-wrap gap-1">
            <label htmlFor="goalInput" className="text-xs text-[#948655] font-medium">
              Goal Statement
            </label>
            
            {/* Mode selection pills */}
            <div className="flex items-center gap-1 text-[11px] font-mono-code">
              <span className="text-[#948655] mr-1">Data Source:</span>
              <button
                type="button"
                disabled={isRunning}
                onClick={() => setDataSource("google")}
                className={`flex items-center gap-1 px-2 py-0.5 rounded transition-all ${
                  dataSource === "google"
                    ? "bg-[#ffd400] text-[#3a2a00] font-bold shadow-xs"
                    : "bg-[#fff6d8] text-[#948655] hover:text-[#1c1c1c]"
                }`}
                title="Force Google Search Grounding data retrieval"
              >
                <Globe className="w-3 h-3 text-[#b8860b]" />
                <span>Google Data</span>
              </button>

              <button
                type="button"
                disabled={isRunning}
                onClick={() => setDataSource("math")}
                className={`flex items-center gap-1 px-2 py-0.5 rounded transition-all ${
                  dataSource === "math"
                    ? "bg-[#ffd400] text-[#3a2a00] font-bold shadow-xs"
                    : "bg-[#fff6d8] text-[#948655] hover:text-[#1c1c1c]"
                }`}
                title="Force Precision Calculator tool"
              >
                <Calculator className="w-3 h-3 text-[#b8860b]" />
                <span>Math Tool</span>
              </button>

              <button
                type="button"
                disabled={isRunning}
                onClick={() => setDataSource("auto")}
                className={`flex items-center gap-1 px-2 py-0.5 rounded transition-all ${
                  dataSource === "auto"
                    ? "bg-[#ffd400] text-[#3a2a00] font-bold shadow-xs"
                    : "bg-[#fff6d8] text-[#948655] hover:text-[#1c1c1c]"
                }`}
                title="Automatically determine optimal tool from goal statement"
              >
                <Zap className="w-3 h-3 text-[#b8860b]" />
                <span>Auto</span>
              </button>
            </div>
          </div>

          <input
            id="goalInput"
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isRunning}
            placeholder="Enter any goal: arithmetic, Google data search, code writing, translation, reasoning..."
          />
        </div>

        {isRunning ? (
          <button
            className="run-btn bg-[#d32f2f] text-white hover:brightness-110 active:scale-95"
            id="stopBtn"
            onClick={onStop}
            type="button"
          >
            Stop run
          </button>
        ) : (
          <button
            className="run-btn"
            id="runBtn"
            onClick={onRun}
            disabled={!goal.trim()}
            type="button"
          >
            Run agent
          </button>
        )}
      </div>

      {/* Preset pills and Stress-Test Switch */}
      <div className="flex items-center justify-between gap-3 flex-wrap px-1 text-xs text-[#948655]">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="font-mono-code text-[11px] uppercase tracking-wider text-[#b8860b]">
            Presets:
          </span>
          {PRESETS.map((p, idx) => (
            <button
              key={idx}
              type="button"
              disabled={isRunning}
              onClick={() => {
                setGoal(p.prompt);
                setForceFailAttempt1(p.forceFail);
                setDataSource(p.mode);
              }}
              className={`px-2.5 py-1 rounded-md text-xs font-mono-code border transition-all ${
                goal === p.prompt
                  ? "bg-[#fff3bf] border-[#b8860b] text-[#1c1c1c] font-semibold"
                  : "bg-white border-[#f0dfa0] text-[#948655] hover:bg-[#fff6d8] hover:text-[#1c1c1c]"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <label
          className="flex items-center gap-2 cursor-pointer select-none text-xs font-mono-code text-[#948655] hover:text-[#1c1c1c]"
          title="When enabled, Attempt 1 intentional failure is detected, triggering autonomous Replan and recovery on Attempt 2"
        >
          <input
            type="checkbox"
            checked={forceFailAttempt1}
            onChange={(e) => setForceFailAttempt1(e.target.checked)}
            disabled={isRunning}
            className="rounded border-[#f0dfa0] text-[#b8860b] focus:ring-[#ffd400]"
          />
          <span className="flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5 text-[#e07b00]" />
            Recovery stress-test
          </span>
        </label>
      </div>
    </div>
  );
};
