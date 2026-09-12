import React from "react";
import { PipelineStepKey, StepState } from "../types";

export interface PipelineStepDef {
  key: PipelineStepKey;
  name: string;
  sub: string;
}

export const PIPELINE_STEPS: PipelineStepDef[] = [
  { key: "observe", name: "Observe", sub: "understand goal" },
  { key: "plan", name: "Plan", sub: "break into steps" },
  { key: "execute1", name: "Execute", sub: "calculator tool" },
  { key: "verify1", name: "Verify", sub: "independent check" },
  { key: "replan", name: "Replan", sub: "correct the approach" },
  { key: "execute2", name: "Execute", sub: "retry calculation" },
  { key: "verify2", name: "Verify", sub: "independent check" },
  { key: "complete", name: "Complete", sub: "return verified result" },
];

interface PipelineViewProps {
  stepsState: Record<PipelineStepKey, StepState>;
  isGoogleData?: boolean;
  activeToolName?: string;
}

export const PipelineView: React.FC<PipelineViewProps> = ({
  stepsState,
  isGoogleData = false,
  activeToolName,
}) => {
  const defaultSub = isGoogleData
    ? "Google Search Grounding"
    : activeToolName || "precision tool execution";

  const steps: PipelineStepDef[] = [
    { key: "observe", name: "Observe", sub: "parse & classify goal" },
    { key: "plan", name: "Plan", sub: "break into steps" },
    {
      key: "execute1",
      name: "Execute",
      sub: defaultSub,
    },
    {
      key: "verify1",
      name: "Verify",
      sub: isGoogleData ? "source & citation check" : "independent assertion check",
    },
    { key: "replan", name: "Replan", sub: "correct the approach" },
    {
      key: "execute2",
      name: "Execute",
      sub: isGoogleData ? "filtered source retry" : "constrained re-execution",
    },
    {
      key: "verify2",
      name: "Verify",
      sub: isGoogleData ? "citation re-check" : "independent assertion check",
    },
    { key: "complete", name: "Complete", sub: "return verified result" },
  ];

  return (
    <div className="panel" id="pipeline-panel">
      <div className="flex items-center justify-between mb-4">
        <h2 className="!mb-0">Pipeline</h2>
        {isGoogleData && (
          <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-[#fff3bf] border border-[#b8860b]/40 text-[#b8860b] font-semibold">
            Google Data
          </span>
        )}
      </div>
      <div id="pipeline">
        {steps.map((step, index) => {
          const state = stepsState[step.key] || null;
          const stepClass = `pipeline-step ${state || ""}`.trim();

          return (
            <div className={stepClass} id={`step-${step.key}`} key={step.key}>
              <div className="rail">
                <div className="node" id={`node-${step.key}`}>
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className="stem" id={`stem-${step.key}`} />
                )}
              </div>
              <div className="label">
                <div className="name">{step.name}</div>
                <div className="sub">{step.sub}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
