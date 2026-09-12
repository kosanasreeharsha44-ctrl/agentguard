import React from "react";
import { VerifierState } from "../types";

interface VerifierPanelProps {
  verifier: VerifierState;
}

export const VerifierPanel: React.FC<VerifierPanelProps> = ({ verifier }) => {
  const getStatusClass = () => {
    if (verifier.status === "PASSED") return "v pass";
    if (verifier.status === "FAILED") return "v fail";
    return "v";
  };

  return (
    <div className="panel verifier-card" id="verifier-card">
      <h2>Verifier output</h2>
      <div className="field">
        <span className="k">status</span>
        <span className={getStatusClass()} id="vStatus">
          {verifier.status}
        </span>
      </div>
      <div className="field">
        <span className="k">reason</span>
        <span className="v text-right max-w-[170px] truncate" id="vReason" title={verifier.reason}>
          {verifier.reason}
        </span>
      </div>
      <div className="field">
        <span className="k">confidence</span>
        <span className="v" id="vConf">
          {verifier.confidence}
        </span>
      </div>
      <div className="field">
        <span className="k">attempt</span>
        <span className="v" id="vAttempt">
          {verifier.attempt}
        </span>
      </div>
    </div>
  );
};
