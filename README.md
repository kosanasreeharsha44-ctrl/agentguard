🛡️ AgentGuard

Verify Every Action. Recover From Every Failure.

AgentGuard is an Agentic AI Verification and Recovery System that makes autonomous AI agents more reliable, transparent, safe, and recoverable.

Instead of:
Think → Act → Result

AgentGuard uses:
Observe → Plan → Act → Verify → Replan → Act → Verify → Complete

If an action or result is incorrect, AgentGuard detects the failure, creates a corrected plan, retries the task, and verifies the result before returning it.

🎯 Problem

AI agents can:

Make incorrect decisions
Use tools incorrectly
Produce wrong calculations
Misinterpret information
Continue after failed actions
Return incorrect results

The key problem is that an AI agent can act confidently even when its result is wrong.

💡 Solution

AgentGuard adds an independent verification and recovery layer:

Observe → Plan → Act → Verify

PASS → Complete

FAIL → Replan → Retry → Verify → Complete

Only verified results are returned to the user.

⭐ Core Innovation

Independent Verification + Automatic Recovery

AgentGuard:

Understands the goal
Creates a plan
Executes the action
Independently verifies the result
Detects failures
Identifies the cause
Creates a corrected plan
Retries the action
Verifies again
Returns the verified result

USP: AgentGuard doesn't just let AI act—it checks whether the action actually worked.

🏗️ Architecture
User
 ↓
Observer
 ↓
Planner
 ↓
Executor
 ↓
Tools
 ↓
Verifier
 ├── PASS → Final Result
 └── FAIL → Replanner
              ↓
           Executor
              ↓
           Verifier
              ↓
          Final Result
🤖 AI Agents
Planner

Understands the goal, breaks it into steps, selects tools, and creates the execution plan.

Executor

Performs the planned actions using tools such as calculators, search, APIs, databases, and files.

Verifier

Independently checks:

Tool selection
Input correctness
Calculations
API responses
Task completion
Final output

Example:

{
  "status": "PASSED",
  "reason": "Calculation independently verified",
  "confidence": 0.99
}
Replanner

Analyzes verification failures and creates a corrected execution plan.

🔀 Multi-Model AI

AgentGuard is designed to be AI-provider independent.

Supported/planned providers:

Google AI Studio / Gemini
OpenAI / GPT
Anthropic / Claude
Other compatible LLM APIs

Different agents can use different models:

Planner    → Gemini
Executor   → Tools
Verifier   → Claude
Replanner  → GPT/Gemini

This allows models to be selected based on accuracy, speed, cost, context, and reasoning requirements.

🛠️ Tools

The MVP can use:

🧮 Calculator
🔎 Google Search / Search grounding
🌐 External APIs
🗄️ Databases
📁 File-processing tools
🔄 Execution Flow
OBSERVE
   ↓
PLAN
   ↓
ACT
   ↓
VERIFY
   ↓
PASS ─────→ COMPLETE
   │
  FAIL
   ↓
REPLAN
   ↓
ACT AGAIN
   ↓
VERIFY
📊 Real-Time Dashboard

The dashboard shows the complete execution process:

AGENTGUARD

Goal: Calculate 17% discount on ₹2450

● Observing
✓ Planning
✓ Executing
❌ Verification Failed
↻ Replanning
✓ Executing Again
✓ Verification Passed
✓ Completed

AgentGuard uses Server-Sent Events (SSE) to stream execution updates to the dashboard in real time.

📝 Execution State
Goal
 ↓
Current Plan
 ↓
Action History
 ↓
Tool Used
 ↓
Tool Result
 ↓
Verification Result
 ↓
Failure Reason
 ↓
Replanning Decision
 ↓
Retry Result

MVP: In-memory state / JSON

Future: SQLite / PostgreSQL / Persistent memory / Audit logs

🎯 Killer Demo

Input:

Calculate a 17% discount on ₹2450
and verify the arithmetic.

Correct result:

17% of ₹2450 = ₹416.50
₹2450 - ₹416.50 = ₹2033.50

Demo flow:

User Goal
 ↓
Planner
 ↓
Executor
 ↓
Incorrect Calculation
 ↓
Verifier ❌
 ↓
Replanner
 ↓
Executor
 ↓
Correct Calculation
 ↓
Verifier ✅
 ↓
₹2033.50

This demonstrates that AgentGuard can detect a wrong result and recover automatically.

💻 Technology Stack

Frontend

HTML
CSS
JavaScript / React
Responsive dashboard

Backend

Node.js
Express.js
REST APIs
Server-Sent Events (SSE)

AI

Google AI Studio / Gemini
@google/genai
OpenAI / GPT
Anthropic / Claude

Tools

Calculator
Google Search grounding
External APIs

State

In-memory state
JSON
SQLite/PostgreSQL for future versions

Deployment

Google AI Studio
Google Cloud Run
GitHub
Other cloud platforms
🔐 Security

API keys must remain on the backend.

Browser
 ↓
Frontend
 ↓
Node.js Backend
 ├── Gemini
 ├── OpenAI
 └── Claude

Never expose API keys in frontend JavaScript.

Use environment variables:

GEMINI_API_KEY=your_key
OPENAI_API_KEY=your_key
ANTHROPIC_API_KEY=your_key

Future security features:

Tool permissions
Action limits
Sandboxing
Human approval
Policy checking
Audit logs
Risk scoring
🌎 Use Cases
Research Agent: Search → Verify → Correct
Coding Agent: Generate → Test → Verify → Fix
Data Agent: Fetch → Analyze → Verify → Report
Business Automation: Plan → API Action → Verify → Recover
Financial Calculations: Calculate → Verify → Correct
🏆 Advantages
Independent verification
Automatic recovery
Real-time monitoring
Tool-based execution
Transparent execution logs
Reduced incorrect outputs
Multi-model support
Modular architecture
Provider-independent design
Safety-oriented workflow
⚠️ Limitations
AI-based verification can still make mistakes
External APIs can fail
LLM APIs may have cost and rate limits
Complex real-world actions need stronger safety controls
High-impact actions may require human approval
🔮 Future Scope

Version 2

More tools
Persistent memory
Authentication
Agent analytics
Advanced verification
Human approval workflows

Version 3

Multi-agent orchestration
Custom verification rules
Enterprise audit logs
Agent risk scoring
Sandboxed execution
Policy enforcement
Cross-model verification

Long-term vision: AgentGuard can become a verification and safety infrastructure layer for autonomous AI agents.

📁 Project Structure
AgentGuard/
├── server.js
├── package.json
├── .env.example
├── .gitignore
├── README.md
├── public/
│   ├── index.html
│   ├── app.js
│   └── styles.css
├── agents/
│   ├── planner.js
│   ├── executor.js
│   ├── verifier.js
│   └── replanner.js
├── models/
│   ├── gemini.js
│   ├── openai.js
│   ├── claude.js
│   └── model-manager.js
├── tools/
│   ├── calculator.js
│   └── search.js
└── state/
    └── state-manager.js
⚙️ Installation
git clone <your-repository-url>
cd AgentGuard
npm install

Create .env:

PORT=3000
GEMINI_API_KEY=your_gemini_api_key
OPENAI_API_KEY=your_openai_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key
