(window.EXAMS = window.EXAMS || []).push({
 "id": "utkarsh-2",
 "title": "Utkarsh 2 · tirage 4 scénarios (D1/D5)",
 "note": "4 des 6 scénarios, comme au vrai tirage ; penche vers D1/D5.",
 "source": "https://github.com/utkarsh1agarwal/claude-architect-exam-guide/blob/main/mock-exam/exam-2-questions.md",
 "author": "Utkarsh Agarwal (MIT)",
 "questions": [
  {
   "n": 1,
   "scenario": "Customer Support Resolution Agent",
   "domain": "D5",
   "situation": "Your support agent has tools `get_customer`, `lookup_order`, `process_refund`, and `escalate_to_human`. A customer says \"I want to speak to a manager right now\" partway through a routine return. What should the agent do?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Offer a discount to de-escalate before considering a transfer"
    },
    {
     "id": "B",
     "text": "Ask one clarifying question to see if the issue can still be resolved"
    },
    {
     "id": "C",
     "text": "Escalate immediately, without attempting further investigation"
    },
    {
     "id": "D",
     "text": "Continue investigating the return since it's already 80% resolved"
    }
   ],
   "correct": "C",
   "explanation": "An explicit request to escalate must be honored immediately, without further investigation, since customer-requested escalation overrides progress-based reasoning. Continuing to investigate because the return is \"80% done\" (D) ignores the customer's stated preference."
  },
  {
   "n": 2,
   "scenario": "Customer Support Resolution Agent",
   "domain": "D5",
   "situation": "`lookup_order` returns three possible matches for the identifiers provided. What is the correct handling?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Select the most recently placed order"
    },
    {
     "id": "B",
     "text": "Select the order with the highest dollar value, since it's likely the one in dispute"
    },
    {
     "id": "C",
     "text": "Process against all three and let the customer confirm afterward"
    },
    {
     "id": "D",
     "text": "Ask the customer for an additional identifier to disambiguate"
    }
   ],
   "correct": "D",
   "explanation": "Multiple ambiguous matches should never be resolved by a heuristic guess like recency or dollar value; the safe move is asking for one more identifier to disambiguate. Picking heuristically risks acting on the wrong customer's order entirely."
  },
  {
   "n": 3,
   "scenario": "Customer Support Resolution Agent",
   "domain": "D1",
   "situation": "A refund-authorization hook blocks `process_refund` for amounts over $500 and redirects to `escalate_to_human`. An engineer proposes removing the hook and instead adding \"never approve refunds over $500 without escalation\" to the system prompt, arguing it's simpler to maintain. What is the main risk?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Prompt instructions have a non-zero failure rate; the guarantee becomes probabilistic instead of deterministic"
    },
    {
     "id": "B",
     "text": "Removing the hook would violate the MCP specification"
    },
    {
     "id": "C",
     "text": "None — a clear instruction is just as reliable as a hook"
    },
    {
     "id": "D",
     "text": "The system prompt has a hard character limit that would be exceeded"
    }
   ],
   "correct": "A",
   "explanation": "Prompt instructions carry a non-zero, probabilistic failure rate, so removing the hook trades a deterministic $500 threshold guarantee for something the model can occasionally ignore. Neither MCP compliance nor prompt length is actually at issue here."
  },
  {
   "n": 4,
   "scenario": "Customer Support Resolution Agent",
   "domain": "D1",
   "situation": "A customer's message covers two unrelated concerns: a billing dispute and a shipping delay. What is the best decomposition strategy?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Escalate immediately since multi-concern messages are inherently too complex"
    },
    {
     "id": "B",
     "text": "Ask the customer to restate their message as two separate, single-issue messages"
    },
    {
     "id": "C",
     "text": "Resolve only the first concern mentioned and ask the customer to open a second ticket for the other"
    },
    {
     "id": "D",
     "text": "Decompose into the two distinct items, investigate each using shared context, then synthesize one unified response"
    }
   ],
   "correct": "D",
   "explanation": "Decomposing into the two distinct concerns, investigating each with shared context, then synthesizing one reply mirrors the exam's decomposition pattern (like per-file-then-cross-file review). Deferring one concern to a separate ticket (C) needlessly fragments the interaction when the agent already has what it needs to handle both."
  },
  {
   "n": 5,
   "scenario": "Customer Support Resolution Agent",
   "domain": "D1",
   "situation": "When escalating a case the agent cannot resolve, what should the handoff to the human agent include?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Just the customer's most recent message, since the human can read the full transcript"
    },
    {
     "id": "B",
     "text": "A confidence score representing how hard the case is"
    },
    {
     "id": "C",
     "text": "A structured summary: customer details, root cause analysis, and a recommended action"
    },
    {
     "id": "D",
     "text": "Only the customer ID, so the human starts the investigation fresh"
    }
   ],
   "correct": "C",
   "explanation": "Since the human has no transcript access, the handoff must substitute for that missing context with customer details, root-cause analysis, and a recommended action. A bare customer ID or last message (A/D) forces the human to re-investigate from zero."
  },
  {
   "n": 6,
   "scenario": "Customer Support Resolution Agent",
   "domain": "D2",
   "situation": "`get_customer` and `lookup_order` are frequently confused by the model when a customer says \"check on order #12345.\" Descriptions are minimal (\"Retrieves customer information\" / \"Retrieves order details\"). What should you try first?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Expand each description with input formats, example queries, and explicit \"use this vs. that\" boundaries"
    },
    {
     "id": "B",
     "text": "Add 8–10 few-shot examples of correct routing"
    },
    {
     "id": "C",
     "text": "Merge the two tools into one generic `lookup` tool"
    },
    {
     "id": "D",
     "text": "Build a keyword pre-router that inspects the message before the model sees it"
    }
   ],
   "correct": "A",
   "explanation": "Description quality is always the lowest-effort, highest-leverage first fix for tool-selection confusion — before few-shot examples or structural changes. Merging the tools (C) would erase the very signal that lets the model discriminate between customer and order lookups."
  },
  {
   "n": 7,
   "scenario": "Customer Support Resolution Agent",
   "domain": "D5",
   "situation": "After a 20-turn conversation about a $215 refund on order #4471, the conversation is summarized to save tokens. The summary says \"customer wants a refund,\" and the agent later asks the customer to repeat the amount and order number. What's the most direct fix?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Maintain a persistent \"case facts\" block (amount, order ID, dates) carried in every prompt outside the narrative summary"
    },
    {
     "id": "B",
     "text": "Disable summarization entirely for all conversations"
    },
    {
     "id": "C",
     "text": "Ask the customer to always begin messages with their order number"
    },
    {
     "id": "D",
     "text": "Switch to a model with a larger context window"
    }
   ],
   "correct": "A",
   "explanation": "A persistent case-facts block for the amount and order ID, carried outside the narrative summary, survives compression that plain-prose summarization won't. Disabling summarization outright (B) is a blunt fix that reintroduces the token-bloat problem it was solving."
  },
  {
   "n": 8,
   "scenario": "Customer Support Resolution Agent",
   "domain": "D5",
   "situation": "Your team wants the agent to self-report a 1–10 confidence score and auto-escalate anything below 6, replacing explicit escalation criteria. What is the concern with this approach?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Confidence scores require a separate fine-tuned model to produce"
    },
    {
     "id": "B",
     "text": "This approach violates MCP resource specifications"
    },
    {
     "id": "C",
     "text": "Self-reported confidence is poorly calibrated — the model is often confidently wrong on exactly the hardest cases"
    },
    {
     "id": "D",
     "text": "Confidence scores can only be produced when using extended thinking"
    }
   ],
   "correct": "C",
   "explanation": "Self-reported confidence scores are poorly calibrated, and models tend to be most confidently wrong on exactly the hardest cases — the opposite of what an auto-escalation gate needs. This is a calibration problem inherent to self-assessment, not a tooling or fine-tuning limitation (A, D)."
  },
  {
   "n": 9,
   "scenario": "Customer Support Resolution Agent",
   "domain": "D2",
   "situation": "Which two error-reporting practices should an MCP tool AVOID when `lookup_order` fails due to a backend timeout?",
   "question": "",
   "select": 2,
   "options": [
    {
     "id": "A",
     "text": "Returning an empty result set marked as a successful, valid query"
    },
    {
     "id": "B",
     "text": "Returning `isError: true` with `errorCategory: \"transient\"` and `isRetryable: true`"
    },
    {
     "id": "C",
     "text": "Returning a generic \"Operation failed\" string with no other metadata"
    },
    {
     "id": "D",
     "text": "Returning the timeout duration and the specific query attempted"
    }
   ],
   "correct": [
    "A",
    "C"
   ],
   "explanation": "Masking a timeout as a successful empty result (A) hides a real failure from the caller, and a bare \"Operation failed\" string (C) strips away the category and retryability info needed to react. B and D are the recommended structured practices (categorized retryable errors, useful diagnostic detail), not things to avoid."
  },
  {
   "n": 10,
   "scenario": "Customer Support Resolution Agent",
   "domain": "D2",
   "situation": "The agent has grown to 18 available tools across support, billing, and shipping functions, and tool-selection accuracy has degraded noticeably. What is the most appropriate fix?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Force `tool_choice` to a single always-used tool"
    },
    {
     "id": "B",
     "text": "Add a 20-example few-shot block covering every tool combination"
    },
    {
     "id": "C",
     "text": "Scope each agent/role to only the 4–6 tools relevant to it"
    },
    {
     "id": "D",
     "text": "Increase `max_tokens` so the model has more room to reason about tool choice"
    }
   ],
   "correct": "C",
   "explanation": "Scoping each agent/role to the 4–6 tools it actually needs directly reduces the decision surface causing misselection. Forcing a single tool (A) or adding more few-shot coverage (B) doesn't address the root cause of too many overlapping options in one place."
  },
  {
   "n": 11,
   "scenario": "Customer Support Resolution Agent",
   "domain": "D1",
   "situation": "Which best describes why a programmatic prerequisite (blocking `process_refund` until `get_customer` returns a verified ID) is preferred over prompt wording for identity verification?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "It provides a deterministic guarantee instead of relying on probabilistic model compliance"
    },
    {
     "id": "B",
     "text": "It's the only way to satisfy MCP's `isError` requirement"
    },
    {
     "id": "C",
     "text": "It is required by the Message Batches API"
    },
    {
     "id": "D",
     "text": "It reduces the number of tokens used per turn"
    }
   ],
   "correct": "A",
   "explanation": "A hard prerequisite gives a deterministic guarantee that refunds can never fire before identity is verified, whereas any prompt-based rule is only probabilistically followed. This is the exam's central \"structural fix beats prompt fix\" lesson, not an MCP or token-budget issue (B, D)."
  },
  {
   "n": 12,
   "scenario": "Customer Support Resolution Agent",
   "domain": "D5",
   "situation": "A customer explicitly states policy allows price matching only against the company's own past sales, but asks for a price match against a competitor — a case the policy doesn't address either way. What should the agent do?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Offer a partial discount as a compromise"
    },
    {
     "id": "B",
     "text": "Escalate, since the policy is silent/ambiguous on this specific request"
    },
    {
     "id": "C",
     "text": "Deny the request, since it wasn't explicitly permitted"
    },
    {
     "id": "D",
     "text": "Approve the request, since it wasn't explicitly denied"
    }
   ],
   "correct": "B",
   "explanation": "Silence in policy is treated the same as ambiguity: escalate rather than let the agent invent a resolution either way. Approving (D) or denying (C) both assume an answer the policy doesn't actually give."
  },
  {
   "n": 13,
   "scenario": "Customer Support Resolution Agent",
   "domain": "D1",
   "situation": "Which is the correct interpretation of a `PostToolUse` hook's role, given `lookup_order` returns Unix timestamps and `get_customer` returns ISO 8601 dates?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "It's used to route the request to a different subagent"
    },
    {
     "id": "B",
     "text": "It's used to normalize the two different date formats into one consistent format before the model reasons over them"
    },
    {
     "id": "C",
     "text": "It's used to cache results across sessions"
    },
    {
     "id": "D",
     "text": "It's used to block a tool call before it executes"
    }
   ],
   "correct": "B",
   "explanation": "A PostToolUse hook is the right place to normalize disparate tool output formats (Unix timestamps vs. ISO 8601) into one consistent representation before the model reasons over them. It doesn't block calls before execution (D) — that's a pre-call/interception hook's job."
  },
  {
   "n": 14,
   "scenario": "Customer Support Resolution Agent",
   "domain": "D5",
   "situation": "Sentiment analysis is added to detect customer frustration and auto-escalate above a threshold. Escalation rates go up sharply, but first-contact resolution doesn't improve, and some genuinely simple cases now escalate unnecessarily just because the customer sounded annoyed. What does this indicate?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "The sentiment threshold was simply set too low"
    },
    {
     "id": "B",
     "text": "The agent needs more few-shot examples of angry customers"
    },
    {
     "id": "C",
     "text": "Sentiment doesn't reliably correlate with actual case complexity, so it's a poor escalation signal on its own"
    },
    {
     "id": "D",
     "text": "Sentiment analysis should be paired with a larger model"
    }
   ],
   "correct": "C",
   "explanation": "Rising escalations without improved resolution, plus simple cases escalating just for sounding annoyed, is the signature of a signal that doesn't track actual complexity. Retuning the threshold (A) or adding more examples (B) would just move the same unreliable signal around rather than fix the mismatch."
  },
  {
   "n": 15,
   "scenario": "Customer Support Resolution Agent",
   "domain": "D5",
   "situation": "A customer says \"I already tried this, just send me to a person,\" after the agent offers to help resolve a straightforward issue. What's the appropriate next step?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Honor the reiterated request and escalate"
    },
    {
     "id": "B",
     "text": "Continue offering the same resolution path, since the issue is within the agent's capability"
    },
    {
     "id": "C",
     "text": "Provide a partial refund automatically without further discussion"
    },
    {
     "id": "D",
     "text": "Ask one more diagnostic question to confirm the issue is really unresolved"
    }
   ],
   "correct": "A",
   "explanation": "A reiterated, explicit request for a human takes priority over the agent's belief that the issue is simple; explicit requests get honored immediately rather than re-litigated. Asking one more diagnostic question (D) directly contradicts the customer's stated preference."
  },
  {
   "n": 16,
   "scenario": "Multi-Agent Research System",
   "domain": "D1",
   "situation": "A coordinator delegates to a web-search subagent and a document-analysis subagent. For the coordinator to invoke either one, what must be true?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Both subagents must share the coordinator's full conversation history automatically"
    },
    {
     "id": "B",
     "text": "The subagents must be configured with `context: fork`"
    },
    {
     "id": "C",
     "text": "The coordinator must run in plan mode"
    },
    {
     "id": "D",
     "text": "The coordinator's `allowedTools` must include `\"Task\"`"
    }
   ],
   "correct": "D",
   "explanation": "The coordinator can only invoke subagents through the Task tool, so it must appear in `allowedTools`; nothing about shared history, fork context, or plan mode is a real prerequisite for delegation."
  },
  {
   "n": 17,
   "scenario": "Multi-Agent Research System",
   "domain": "D1",
   "situation": "All subagents in a research pipeline complete successfully and report no errors, yet the final report covers only 30% of the requested topic. Where should you look first?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "The web-search subagent's result ranking"
    },
    {
     "id": "B",
     "text": "The document-analysis subagent's summarization fidelity"
    },
    {
     "id": "C",
     "text": "The coordinator's task decomposition logs"
    },
    {
     "id": "D",
     "text": "The synthesis subagent's writing quality"
    }
   ],
   "correct": "C",
   "explanation": "When every subagent succeeds at its assigned slice but overall coverage is narrow, the defect lives upstream in what the coordinator chose to assign, not in how well any individual subagent executed its own task."
  },
  {
   "n": 18,
   "scenario": "Multi-Agent Research System",
   "domain": "D1",
   "situation": "The synthesis subagent needs the findings gathered by the web-search and document-analysis subagents. What must happen for it to have that information?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Nothing — subagents automatically share a session-scoped memory pool"
    },
    {
     "id": "B",
     "text": "The synthesis subagent must call `fork_session` to inherit prior context"
    },
    {
     "id": "C",
     "text": "The coordinator must explicitly include the complete findings in the synthesis subagent's prompt"
    },
    {
     "id": "D",
     "text": "The findings are inherited automatically as long as all subagents share the same `AgentDefinition`"
    }
   ],
   "correct": "C",
   "explanation": "Subagents don't automatically inherit the coordinator's history, so findings must be explicitly written into the synthesis subagent's prompt; there's no automatic memory pool (A, D), and `fork_session` branches a session's own context rather than transferring another subagent's output (B)."
  },
  {
   "n": 19,
   "scenario": "Multi-Agent Research System",
   "domain": "D1",
   "situation": "The coordinator needs to run a web-search subtask and a document-analysis subtask concurrently rather than one after another. How should it do this?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Send both subtasks in separate turns but with the same `tool_use_id`"
    },
    {
     "id": "B",
     "text": "Use `fork_session` to duplicate the coordinator into two parallel coordinators"
    },
    {
     "id": "C",
     "text": "Set `tool_choice: \"any\"` on the coordinator's next call"
    },
    {
     "id": "D",
     "text": "Emit both `Task` tool calls within a single coordinator response"
    }
   ],
   "correct": "D",
   "explanation": "Real concurrency requires the coordinator to emit both Task calls within one response so they execute in parallel; reusing a `tool_use_id` (A) is invalid, `fork_session` (B) duplicates a session rather than dispatching two subtasks, and `tool_choice: \"any\"` (C) only forces some tool call, not simultaneity."
  },
  {
   "n": 20,
   "scenario": "Multi-Agent Research System",
   "domain": "D5",
   "situation": "Two credible sources report different figures for the same statistic during synthesis. What should the final report do?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Preserve both values with source attribution, distinguishing well-established from contested findings"
    },
    {
     "id": "B",
     "text": "Average the two figures and report the average as the value"
    },
    {
     "id": "C",
     "text": "Silently prefer whichever source was retrieved most recently"
    },
    {
     "id": "D",
     "text": "Omit the statistic entirely since it can't be verified"
    }
   ],
   "correct": "A",
   "explanation": "Preserving both values with attribution keeps the reader informed of a genuine disagreement; averaging (B) invents a number neither source reported, and recency bias (C) or omission (D) both discard real information."
  },
  {
   "n": 21,
   "scenario": "Multi-Agent Research System",
   "domain": "D5",
   "situation": "During synthesis, a claim's supporting excerpt is compressed for brevity, and the source URL originally attached to it is dropped in the process. What principle was violated?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "The excerpt should have been translated into a different content type"
    },
    {
     "id": "B",
     "text": "Structured claim-source mappings must be preserved and merged through synthesis, not summarized away"
    },
    {
     "id": "C",
     "text": "The claim should have been paraphrased more aggressively, not less"
    },
    {
     "id": "D",
     "text": "The claim needed a confidence score instead of a source"
    }
   ],
   "correct": "B",
   "explanation": "The source-to-claim mapping is exactly the provenance information synthesis must carry forward intact, not compress away in the name of brevity."
  },
  {
   "n": 22,
   "scenario": "Multi-Agent Research System",
   "domain": "D5/D2",
   "situation": "A web-search subagent times out mid-query. What should it return to the coordinator?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "An empty result set marked as a successful query"
    },
    {
     "id": "B",
     "text": "A retry loop that continues indefinitely until it succeeds"
    },
    {
     "id": "C",
     "text": "Nothing — the coordinator should assume failure from a lack of response"
    },
    {
     "id": "D",
     "text": "Structured error context: failure type, what was attempted, any partial results, and possible alternatives"
    }
   ],
   "correct": "D",
   "explanation": "Structured failure context (failure type, what was attempted, partial results, alternatives) lets the coordinator make an informed recovery decision; masking it as success (A), retrying forever (B), or going silent (C) all destroy that information."
  },
  {
   "n": 23,
   "scenario": "Multi-Agent Research System",
   "domain": "D5",
   "situation": "A statistic in one subagent's findings comes from a report published two years ago, while another subagent's finding on the same metric is from last month. Synthesis treats these as contradictory. What was missing from the subagents' structured output?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "A `retryable` boolean"
    },
    {
     "id": "B",
     "text": "A `confidence` field"
    },
    {
     "id": "C",
     "text": "An `errorCategory` field"
    },
    {
     "id": "D",
     "text": "Publication or data-collection dates, which would show this is a change over time rather than a contradiction"
    }
   ],
   "correct": "D",
   "explanation": "Without publication or data-collection dates, synthesis has no way to distinguish a genuine change over time from a contradiction between two sources measuring the same thing at different times."
  },
  {
   "n": 24,
   "scenario": "Multi-Agent Research System",
   "domain": "D2",
   "situation": "The synthesis subagent frequently needs simple fact-checks (dates, names, statistics) — 85% of verification needs are simple, 15% require deep investigation. Routing every check through the coordinator to the web-search agent adds significant latency. What is the most balanced fix?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Batch all verification requests to run once at the end of the pipeline"
    },
    {
     "id": "B",
     "text": "Have the web-search subagent pre-cache anything it speculates might later be needed"
    },
    {
     "id": "C",
     "text": "Give the synthesis subagent full, unrestricted access to all search tools"
    },
    {
     "id": "D",
     "text": "Give the synthesis subagent one scoped `verify_fact` tool for the simple 85%, keep coordinator-routed delegation for the complex 15%"
    }
   ],
   "correct": "D",
   "explanation": "A narrowly scoped `verify_fact` tool handles the high-frequency simple case without ballooning the synthesis agent's tool surface (unlike C), while the rarer complex 15% still routes through the coordinator as before; batching (A) or speculative caching (B) don't fix the routing overhead itself."
  },
  {
   "n": 25,
   "scenario": "Multi-Agent Research System",
   "domain": "D1",
   "situation": "A coordinator decomposes \"impact of remote work on urban commercial real estate\" into three subtasks: \"office vacancy rates downtown,\" \"office vacancy rates in suburbs,\" and \"office leasing trends.\" The resulting report never touches retail or residential conversion angles. What is the root cause?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "The coordinator's task decomposition was too narrow, missing entire relevant sub-domains of the topic"
    },
    {
     "id": "B",
     "text": "The web-search subagent didn't search broadly enough"
    },
    {
     "id": "C",
     "text": "The document-analysis subagent filtered out irrelevant sources"
    },
    {
     "id": "D",
     "text": "The synthesis subagent lacked writing guidance on breadth"
    }
   ],
   "correct": "A",
   "explanation": "All three subtasks are narrow slices of the same angle (vacancy/leasing), so no subagent was ever asked to look at retail or residential conversion — the gap originates in decomposition, not execution."
  },
  {
   "n": 26,
   "scenario": "Multi-Agent Research System",
   "domain": "D1",
   "situation": "After reviewing a first-pass synthesis output, the coordinator identifies that the \"counterarguments\" section is thin. What is the appropriate next action, consistent with iterative refinement of multi-agent research?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Publish the report as-is; thoroughness is the synthesis agent's sole responsibility"
    },
    {
     "id": "B",
     "text": "Lower the temperature and regenerate synthesis from the same inputs"
    },
    {
     "id": "C",
     "text": "Ask the user to manually supply counterarguments"
    },
    {
     "id": "D",
     "text": "Re-delegate to search/analysis subagents with targeted follow-up queries, then re-invoke synthesis"
    }
   ],
   "correct": "D",
   "explanation": "A thin section reflects missing evidence, not bad prose, so the fix is gathering more findings via targeted follow-up delegation and re-synthesizing; regenerating at a different temperature (B) can't manufacture counterarguments that were never collected."
  },
  {
   "n": 27,
   "scenario": "Multi-Agent Research System",
   "domain": "D1",
   "situation": "Which best distinguishes a subagent's isolated context from the coordinator's context?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Subagents inherit context only during the first invocation of a session"
    },
    {
     "id": "B",
     "text": "Subagents do not automatically inherit the coordinator's conversation history; relevant context must be explicitly passed in"
    },
    {
     "id": "C",
     "text": "Subagents share the coordinator's memory but not its tool access"
    },
    {
     "id": "D",
     "text": "Subagents inherit context if and only if they use the same underlying model"
    }
   ],
   "correct": "B",
   "explanation": "Isolation is the default behavior; relevant context must be explicitly passed in, not automatically shared via memory (C) or matched via model identity (D)."
  },
  {
   "n": 28,
   "scenario": "Multi-Agent Research System",
   "domain": "D5",
   "situation": "A research pipeline crashes mid-run due to an infrastructure failure. What design allows the coordinator to resume cleanly?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Each agent exporting state to a known location; the coordinator loads a manifest on resume and re-injects it"
    },
    {
     "id": "B",
     "text": "Relying on the model to recall its own prior progress from training data"
    },
    {
     "id": "C",
     "text": "Restarting from scratch and re-running every subagent regardless of prior progress"
    },
    {
     "id": "D",
     "text": "Keeping all state only in the coordinator's in-memory variables"
    }
   ],
   "correct": "A",
   "explanation": "Externalized per-agent state plus a coordinator-read manifest is what makes clean resume possible after an infrastructure crash; relying on model recall (B) or blind full restarts (C) can't actually recover prior progress."
  },
  {
   "n": 29,
   "scenario": "Multi-Agent Research System",
   "domain": "D2",
   "situation": "The synthesis subagent is given tools for web search, document parsing, and fact verification \"just in case it needs them for edge cases.\" What risk does this create?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "It requires `fork_session` to function correctly"
    },
    {
     "id": "B",
     "text": "It has no real downside since unused tools cost nothing"
    },
    {
     "id": "C",
     "text": "Agents with tools outside their specialization tend to misuse them (e.g., a synthesis agent attempting its own web searches)"
    },
    {
     "id": "D",
     "text": "It will always outperform a narrowly-scoped agent"
    }
   ],
   "correct": "C",
   "explanation": "Tools outside an agent's specialization invite misuse (a synthesis agent wandering into its own web searches), which is the real cost — \"unused tools cost nothing\" (B) ignores exactly this selection risk."
  },
  {
   "n": 30,
   "scenario": "Multi-Agent Research System",
   "domain": "D1/D5",
   "situation": "Structured findings from subagents should separate content from metadata. Which of these best exemplifies that separation?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Separate fields for `claim`, `evidence_excerpt`, `source_url`, and `publication_date`"
    },
    {
     "id": "B",
     "text": "A markdown-formatted paragraph with inline citations"
    },
    {
     "id": "C",
     "text": "A single string like `\"Retail vacancy hit 18% (Source: CBRE, March 2026, cbre.com/report-2026)\"`"
    },
    {
     "id": "D",
     "text": "A raw dump of the source webpage's HTML"
    }
   ],
   "correct": "A",
   "explanation": "Separate fields for claim, excerpt, source, and date keep content and provenance metadata independently addressable through further processing; a formatted string (C) or prose paragraph (B) bakes metadata into content where it's easily lost or mis-parsed."
  },
  {
   "n": 31,
   "scenario": "Developer Productivity with Claude",
   "domain": "D2",
   "situation": "A developer wants to find every file that calls a specific exported function across a large codebase. Which built-in tool is the right starting point?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "`Read`, applied to every file in the repo"
    },
    {
     "id": "B",
     "text": "`Bash` with no specific command needed"
    },
    {
     "id": "C",
     "text": "`Grep`, since it searches file contents for the function name"
    },
    {
     "id": "D",
     "text": "`Glob`, since it searches by pattern"
    }
   ],
   "correct": "C",
   "explanation": "Grep searches file contents for the function name, which is exactly what's needed to find every call site; Glob only matches file paths/names, not the code inside them."
  },
  {
   "n": 32,
   "scenario": "Developer Productivity with Claude",
   "domain": "D2",
   "situation": "A developer wants to locate every test file in a monorepo matching `**/*.test.tsx` regardless of directory. Which tool is correct?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "`Write`"
    },
    {
     "id": "B",
     "text": "`Grep`"
    },
    {
     "id": "C",
     "text": "`Glob`"
    },
    {
     "id": "D",
     "text": "`Edit`"
    }
   ],
   "correct": "C",
   "explanation": "Glob does file-path pattern matching, which is precisely suited to a glob pattern like `**/*.test.tsx`; Grep searches file contents, not paths."
  },
  {
   "n": 33,
   "scenario": "Developer Productivity with Claude",
   "domain": "D2",
   "situation": "`Edit` repeatedly fails on a file because the anchor text it's trying to match appears multiple times. What is the recommended fallback?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Switch to `Bash` with `sed` exclusively"
    },
    {
     "id": "B",
     "text": "Use `Read` to load the full file, then `Write` the corrected full content"
    },
    {
     "id": "C",
     "text": "Split the file into smaller files first"
    },
    {
     "id": "D",
     "text": "Increase `max_tokens` and retry `Edit`"
    }
   ],
   "correct": "B",
   "explanation": "When an anchor string isn't unique, Edit can't reliably target the right occurrence, so loading the full file with Read and rewriting it with Write sidesteps the ambiguity entirely; switching to sed loses the model's understanding of context and isn't the documented fallback."
  },
  {
   "n": 34,
   "scenario": "Developer Productivity with Claude",
   "domain": "D2",
   "situation": "A team keeps a company-wide MCP server for Jira in `.mcp.json`, using `${JIRA_TOKEN}` for the credential. A developer also wants to experiment with a personal, unreleased MCP server without affecting teammates. Where should the personal server be configured?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "It cannot be done without modifying the shared repo config"
    },
    {
     "id": "B",
     "text": "In `CLAUDE.md` as a code block"
    },
    {
     "id": "C",
     "text": "In `.mcp.json` with a different key"
    },
    {
     "id": "D",
     "text": "In `~/.claude.json`"
    }
   ],
   "correct": "D",
   "explanation": "Personal/experimental MCP servers belong in the user-scoped `~/.claude.json`, keeping them invisible to teammates; putting it in `.mcp.json` (even under a different key) would land in the shared, version-controlled team config."
  },
  {
   "n": 35,
   "scenario": "Developer Productivity with Claude",
   "domain": "D2",
   "situation": "Claude Code keeps preferring `Grep` over a connected MCP server's more powerful `search_codebase` tool, even though the MCP tool would give better results for the developer's query. What is the most likely cause and fix?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "MCP tools always lose to built-in tools by design and this can't be changed"
    },
    {
     "id": "B",
     "text": "The MCP tool is broken; disable `Grep` entirely"
    },
    {
     "id": "C",
     "text": "The MCP tool's description under-sells its capability relative to the well-known built-in tool; improve the description to clarify when and why to prefer it"
    },
    {
     "id": "D",
     "text": "Switch the MCP server from project scope to user scope"
    }
   ],
   "correct": "C",
   "explanation": "Claude has a strong prior toward familiar built-ins like Grep, so an under-described MCP tool loses out by default; the fix is enhancing the description to make the capability advantage explicit, not disabling Grep or changing server scope."
  },
  {
   "n": 36,
   "scenario": "Developer Productivity with Claude",
   "domain": "D3",
   "situation": "A developer wants a \"codebase exploration\" skill whose verbose dependency-tracing output shouldn't clutter the main conversation. Which SKILL.md frontmatter option addresses this?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "`argument-hint`"
    },
    {
     "id": "B",
     "text": "`paths`"
    },
    {
     "id": "C",
     "text": "`allowed-tools`"
    },
    {
     "id": "D",
     "text": "`context: fork`"
    }
   ],
   "correct": "D",
   "explanation": "`context: fork` runs the skill in an isolated sub-agent context so its verbose dependency-tracing output never pollutes the main conversation; `allowed-tools` restricts tool access, not output visibility."
  },
  {
   "n": 37,
   "scenario": "Developer Productivity with Claude",
   "domain": "D3",
   "situation": "A skill should be limited to file-write operations only, with no ability to run destructive `Bash` commands. Which frontmatter option enforces this?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "There is no way to restrict a skill's tool access"
    },
    {
     "id": "B",
     "text": "`allowed-tools`"
    },
    {
     "id": "C",
     "text": "`argument-hint`"
    },
    {
     "id": "D",
     "text": "`context: fork`"
    }
   ],
   "correct": "B",
   "explanation": "`allowed-tools` directly restricts which tools a skill can invoke, letting it be scoped to file-write only; `context: fork` isolates context/output, not tool permissions."
  },
  {
   "n": 38,
   "scenario": "Developer Productivity with Claude",
   "domain": "D3",
   "situation": "A new hire isn't receiving the team's established coding conventions, even though a senior engineer insists \"it's all in CLAUDE.md.\" What is the most likely cause?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "The conventions live in the senior engineer's user-level `~/.claude/CLAUDE.md`, which isn't shared via version control"
    },
    {
     "id": "B",
     "text": "CLAUDE.md files are cached and require a manual cache clear"
    },
    {
     "id": "C",
     "text": "The new hire's IDE isn't configured to load CLAUDE.md"
    },
    {
     "id": "D",
     "text": "The conventions are correctly placed in the project-level CLAUDE.md, and the new hire simply hasn't read it"
    }
   ],
   "correct": "A",
   "explanation": "The classic failure mode is conventions living in the senior engineer's personal `~/.claude/CLAUDE.md`, which never gets committed, so new hires cloning the repo never see them; this fits better than assuming the new hire simply skipped a file that was in fact correctly placed and shared."
  },
  {
   "n": 39,
   "scenario": "Developer Productivity with Claude",
   "domain": "D3",
   "situation": "A monorepo has React, API, and database-model layers, each with different conventions, plus test files scattered throughout every layer. What is the most maintainable way to apply testing conventions specifically, regardless of file location?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "A `.claude/rules/testing.md` file with `paths: [\"**/*.test.*\"]` frontmatter"
    },
    {
     "id": "B",
     "text": "A skill that must be manually invoked before writing any test"
    },
    {
     "id": "C",
     "text": "Put a \"Testing\" section in the root CLAUDE.md and hope Claude infers when it applies"
    },
    {
     "id": "D",
     "text": "Add a CLAUDE.md to every directory that happens to contain a test file"
    }
   ],
   "correct": "A",
   "explanation": "`.claude/rules/*.md` with `paths` frontmatter applies conventions by glob pattern regardless of directory, exactly matching test files scattered across layers; per-directory CLAUDE.md files don't scale and don't follow files that move."
  },
  {
   "n": 40,
   "scenario": "Developer Productivity with Claude",
   "domain": "D1/D3",
   "situation": "A developer is asked to add comprehensive tests to a legacy codebase with no existing test coverage and unclear module boundaries. What task-decomposition approach fits best?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Map the codebase structure first, identify high-impact areas, then build a prioritized plan that adapts as dependencies are discovered"
    },
    {
     "id": "B",
     "text": "A fixed, fully pre-specified sequential checklist decided before any exploration"
    },
    {
     "id": "C",
     "text": "Escalate to a human immediately since the task is too undefined for an agent"
    },
    {
     "id": "D",
     "text": "Write tests for every file in alphabetical order"
    }
   ],
   "correct": "A",
   "explanation": "This is the textbook adaptive-decomposition case: with unclear module boundaries, mapping structure and prioritizing as dependencies are discovered beats any fixed upfront checklist, which can't account for what hasn't been explored yet."
  },
  {
   "n": 41,
   "scenario": "Developer Productivity with Claude",
   "domain": "D3",
   "situation": "A developer is debugging a single failing test with a clear stack trace pointing to one function. What's the appropriate mode?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Plan mode, to explore alternative architectures first"
    },
    {
     "id": "B",
     "text": "Fork the session to explore two different fixes in parallel"
    },
    {
     "id": "C",
     "text": "Direct execution, since the change is small and well-understood"
    },
    {
     "id": "D",
     "text": "Escalate to a second Claude instance for independent review before touching any code"
    }
   ],
   "correct": "C",
   "explanation": "A clear stack trace pointing to one function is a well-understood, single-file fix, which is exactly when direct execution is appropriate; plan mode or parallel forking would be needless overhead for a task with no real ambiguity."
  },
  {
   "n": 42,
   "scenario": "Developer Productivity with Claude",
   "domain": "D3",
   "situation": "A developer describes a desired data-transformation function in prose, but Claude's implementation is inconsistent across attempts — sometimes handling edge cases differently. What is the most effective way to tighten the specification?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Lower `max_tokens` to force a more concise implementation"
    },
    {
     "id": "B",
     "text": "Provide 2–3 concrete input/output examples that pin down the exact expected transformation"
    },
    {
     "id": "C",
     "text": "Repeat the same prose instructions with more emphatic wording"
    },
    {
     "id": "D",
     "text": "Switch to a different model without changing the instructions"
    }
   ],
   "correct": "B",
   "explanation": "Inconsistent handling across attempts signals genuine ambiguity in the prose spec, and concrete input/output examples pin down the exact expected behavior; repeating the same instructions more emphatically doesn't resolve ambiguity, it just restates it."
  },
  {
   "n": 43,
   "scenario": "Developer Productivity with Claude",
   "domain": "D3",
   "situation": "Before implementing a caching layer in an unfamiliar part of the codebase, a developer wants Claude to surface considerations they might not have thought of — invalidation strategy, failure modes, TTL choices — before writing any code. What technique does this describe?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Plan mode is not applicable here since this is a single feature, not an architecture-wide task"
    },
    {
     "id": "B",
     "text": "The interview pattern — having Claude ask clarifying questions before implementation"
    },
    {
     "id": "C",
     "text": "Test-driven iteration"
    },
    {
     "id": "D",
     "text": "Prompt chaining"
    }
   ],
   "correct": "B",
   "explanation": "The interview pattern — having Claude surface open design questions before implementing — is designed for exactly this kind of unfamiliar-domain uncertainty; test-driven iteration assumes you can already specify expected behavior, which is what's missing here."
  },
  {
   "n": 44,
   "scenario": "Developer Productivity with Claude",
   "domain": "D3",
   "situation": "A code-review request surfaces three findings that interact with each other (fixing one changes the correct fix for another). What's the better way to communicate them to Claude?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Ignore the interactions and let Claude discover them on its own"
    },
    {
     "id": "B",
     "text": "Provide all three interacting issues together in a single detailed message"
    },
    {
     "id": "C",
     "text": "Fix them one at a time in separate messages, waiting for each fix before mentioning the next"
    },
    {
     "id": "D",
     "text": "Ask Claude to pick which one to fix first"
    }
   ],
   "correct": "B",
   "explanation": "Because the three findings interact, fixing one changes the correct fix for another, so they must be communicated together in one message; addressing them sequentially risks rework when an earlier \"fix\" is invalidated by a later one."
  },
  {
   "n": 45,
   "scenario": "Developer Productivity with Claude",
   "domain": "D3",
   "situation": "A team is restructuring a monolith into microservices — changes will span 45+ files, and there are multiple valid ways to draw service boundaries. What's the correct approach, and which subagent helps avoid exhausting context during the investigation phase?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Direct execution; no subagent is needed since this is primarily a refactor"
    },
    {
     "id": "B",
     "text": "Plan mode to explore and decide on an approach first, using the Explore subagent to isolate verbose discovery output"
    },
    {
     "id": "C",
     "text": "Direct execution with an extremely long, fully-detailed upfront prompt describing every service boundary"
    },
    {
     "id": "D",
     "text": "Plan mode, but skip subagents entirely to keep everything in one context"
    }
   ],
   "correct": "B",
   "explanation": "Dozens of files with multiple valid service-boundary designs is squarely plan mode's use case, and the Explore subagent isolates the noisy discovery phase so it doesn't burn the main session's context; skipping subagents (D) forfeits that context-isolation benefit for no real gain."
  },
  {
   "n": 46,
   "scenario": "Structured Data Extraction",
   "domain": "D4",
   "situation": "An extraction schema marks `contract_end_date` as a required field, but many contracts in the corpus are open-ended with no end date. What happens, and what's the fix?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Switch from `tool_use` to plain-text JSON output to avoid the issue"
    },
    {
     "id": "B",
     "text": "This is expected behavior and requires no change"
    },
    {
     "id": "C",
     "text": "The model may fabricate a plausible end date to satisfy the required constraint; make the field nullable/optional instead"
    },
    {
     "id": "D",
     "text": "Extraction will simply fail validation every time; the schema is unusable"
    }
   ],
   "correct": "C",
   "explanation": "With no end date anywhere in many source contracts, forcing `contract_end_date` as required pressures the model to invent a plausible-looking date rather than admit absence; making it nullable/optional removes that pressure. D overstates the failure mode (validation wouldn't fail \"every time\" — it would silently succeed with fabricated data, which is the more dangerous outcome)."
  },
  {
   "n": 47,
   "scenario": "Structured Data Extraction",
   "domain": "D4",
   "situation": "An extraction pipeline using `tool_use` with a strict JSON schema never produces malformed JSON, but sometimes produces line items that don't sum to the stated total. What does this indicate?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "This is a semantic error, not a syntax error — add a `calculated_total` field to compare against `stated_total` and flag mismatches"
    },
    {
     "id": "B",
     "text": "Lowering `max_tokens` will resolve the inconsistency"
    },
    {
     "id": "C",
     "text": "The schema itself is broken and needs stricter typing"
    },
    {
     "id": "D",
     "text": "`tool_use` cannot guarantee numeric fields and should be abandoned for this use case"
    }
   ],
   "correct": "A",
   "explanation": "`tool_use` with a schema guarantees syntactic validity but not semantic correctness, so line items can still fail to sum correctly; adding a `calculated_total` field to diff against `stated_total` catches exactly this class of error downstream. D is the tempting-but-wrong take — the tool is working as designed, so abandoning it throws out a mechanism that's already solving the syntax problem."
  },
  {
   "n": 48,
   "scenario": "Structured Data Extraction",
   "domain": "D4",
   "situation": "You have three extraction schemas (invoice, receipt, contract) and don't know in advance which document type will arrive, but you want to guarantee some structured extraction occurs. Which `tool_choice` setting is correct?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "`\"auto\"`"
    },
    {
     "id": "B",
     "text": "Omitting `tool_choice`"
    },
    {
     "id": "C",
     "text": "`{\"type\": \"tool\", \"name\": \"extract_invoice\"}`"
    },
    {
     "id": "D",
     "text": "`\"any\"`"
    }
   ],
   "correct": "D",
   "explanation": "`\"any\"` forces the model to call some tool (guaranteeing structured output) while still letting it pick which of the three schemas fits the incoming document. `\"auto\"` (the tempting alternative) would let the model bail out with plain text on an ambiguous document, defeating the stated goal of guaranteeing extraction."
  },
  {
   "n": 49,
   "scenario": "Structured Data Extraction",
   "domain": "D4",
   "situation": "An extraction validated against a JSON schema fails because a required field, `vendor_tax_id`, is missing. On investigation, the source document never contained a tax ID anywhere. What should happen next?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Recognize that retrying is unlikely to help since the information is genuinely absent from the source; the field should have been optional"
    },
    {
     "id": "B",
     "text": "Fabricate a placeholder value so the schema validates"
    },
    {
     "id": "C",
     "text": "Increase `max_tokens` and retry"
    },
    {
     "id": "D",
     "text": "Retry the extraction with the same prompt; retries usually resolve missing-field errors"
    }
   ],
   "correct": "A",
   "explanation": "Since the tax ID is confirmed absent from the source document, no retry can manufacture data that was never there; the correct move is to accept the gap and make the field optional going forward. D is the trap: it assumes missing-field errors are generically retry-fixable, but that's only true for structural/formatting mistakes, not genuine source-data absence."
  },
  {
   "n": 50,
   "scenario": "Structured Data Extraction",
   "domain": "D4",
   "situation": "A validation-retry loop for extraction failures should include which of the following in the follow-up request?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "The original document, the failed extraction, and the specific validation error(s) that occurred"
    },
    {
     "id": "B",
     "text": "Only the original document, without reference to the prior failed attempt"
    },
    {
     "id": "C",
     "text": "A completely new document as a substitute"
    },
    {
     "id": "D",
     "text": "Only a generic instruction to \"try again more carefully\""
    }
   ],
   "correct": "A",
   "explanation": "An effective retry needs the original document, the prior failed output, and the specific validation error so the model has something concrete to correct against. A bare \"try again\" (D) or a fresh document with no error context (B, C) gives the model no signal about what actually went wrong."
  },
  {
   "n": 51,
   "scenario": "Structured Data Extraction",
   "domain": "D4",
   "situation": "A finding-tracking system for a review pipeline adds a `detected_pattern` field to every flagged issue. What is this field's purpose?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "To determine `isRetryable` status"
    },
    {
     "id": "B",
     "text": "To enable systematic analysis of which code constructs trigger findings, useful for spotting false-positive patterns developers repeatedly dismiss"
    },
    {
     "id": "C",
     "text": "To select which `tool_choice` mode to use next"
    },
    {
     "id": "D",
     "text": "To store the model's confidence score"
    }
   ],
   "correct": "B",
   "explanation": "Tagging findings with `detected_pattern` turns individual fixes into aggregate data, letting you spot which constructs or patterns developers repeatedly dismiss as false positives and target prompt fixes at them. It's a tracking/analytics field, not a routing or scoring mechanism, so A/C/D misattribute its purpose."
  },
  {
   "n": 52,
   "scenario": "Structured Data Extraction",
   "domain": "D4",
   "situation": "A code-review prompt already says \"only report high-confidence findings,\" yet developers report 40% of flagged issues in the \"style consistency\" category are false positives. What's the most effective next step?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Lower the model's temperature setting"
    },
    {
     "id": "B",
     "text": "Permanently remove the category so it never generates findings again"
    },
    {
     "id": "C",
     "text": "Add \"be even more conservative\" to the prompt"
    },
    {
     "id": "D",
     "text": "Define explicit, categorical criteria for what specifically counts as a style issue vs. what doesn't, and consider temporarily disabling the category while iterating"
    }
   ],
   "correct": "D",
   "explanation": "\"Only report high-confidence findings\" is already vague, and 40% false positives shows vague conservatism instructions don't work; the fix is explicit categorical criteria for what counts as a style issue, with temporary category suppression while iterating. C repeats the same failed pattern (more vague conservatism language) rather than fixing the underlying ambiguity."
  },
  {
   "n": 53,
   "scenario": "Structured Data Extraction",
   "domain": "D4",
   "situation": "Few-shot examples are added to help a model select between two visually similar tools in ambiguous cases. What makes few-shot effective here, beyond simply showing input/output pairs?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Few-shot examples eliminate the need for good tool descriptions entirely"
    },
    {
     "id": "B",
     "text": "Showing the reasoning for why one tool was chosen over a plausible alternative helps the model generalize judgment to novel, unseen cases"
    },
    {
     "id": "C",
     "text": "Few-shot examples work only because they increase total prompt length"
    },
    {
     "id": "D",
     "text": "Few-shot examples are only useful for formatting, not for judgment calls"
    }
   ],
   "correct": "B",
   "explanation": "Showing the reasoning behind choosing one tool over a plausible-but-wrong alternative teaches the model the underlying judgment, so it generalizes to new ambiguous cases rather than just memorizing the shown pairs. A overreaches — few-shot supplements good descriptions, it doesn't make them unnecessary."
  },
  {
   "n": 54,
   "scenario": "Structured Data Extraction",
   "domain": "D4",
   "situation": "Your organization wants to move two workloads to the Message Batches API for its 50% cost savings: (a) an overnight technical-debt report and (b) a blocking pre-merge security gate that developers actively wait on. What's the correct call?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Batch both, with a real-time fallback triggered if the batch takes too long"
    },
    {
     "id": "B",
     "text": "Keep both synchronous, since batch correlation via `custom_id` is too error-prone"
    },
    {
     "id": "C",
     "text": "Batch both workloads"
    },
    {
     "id": "D",
     "text": "Batch only the overnight report; keep the pre-merge gate on synchronous calls"
    }
   ],
   "correct": "D",
   "explanation": "The overnight report is latency-tolerant and fits batch's non-blocking, no-SLA processing window, but a pre-merge gate developers are actively waiting on needs real-time responsiveness batch can't guarantee. A's \"real-time fallback\" is tempting but adds complexity for a workflow that should never have been batched in the first place."
  },
  {
   "n": 55,
   "scenario": "Structured Data Extraction",
   "domain": "D4",
   "situation": "A batch submission of 200 documents returns some failures. What's the correct remediation approach?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Switch failed documents to a completely different extraction schema"
    },
    {
     "id": "B",
     "text": "Identify the failed documents by `custom_id`, and resubmit only those, adjusting for the specific cause (e.g., chunking oversized documents)"
    },
    {
     "id": "C",
     "text": "Resubmit the entire batch of 200 documents from scratch"
    },
    {
     "id": "D",
     "text": "Discard the failed documents permanently since batch jobs cannot be retried"
    }
   ],
   "correct": "B",
   "explanation": "Batch failures should be triaged individually via `custom_id`, with the specific cause addressed (e.g., splitting an oversized document) before resubmitting just those items. C wastes cost/time reprocessing 198 documents that already succeeded, which defeats the point of batch's cost savings."
  },
  {
   "n": 56,
   "scenario": "Structured Data Extraction",
   "domain": "D5",
   "situation": "An extraction system reports 97% aggregate accuracy across all processed documents. A stakeholder asks whether this is sufficient to reduce human review. What should you check before answering?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Whether the model used `tool_choice: \"auto\"` or `\"any\"`"
    },
    {
     "id": "B",
     "text": "Only the accuracy of the single most common document type"
    },
    {
     "id": "C",
     "text": "Nothing further — 97% aggregate accuracy is sufficient on its own"
    },
    {
     "id": "D",
     "text": "Accuracy broken down by document type and by field, since aggregate metrics can mask poor performance on specific segments"
    }
   ],
   "correct": "D",
   "explanation": "A 97% aggregate can mask a document type or field with much worse accuracy, so the honest answer requires breaking the metric down before making a review-reduction call. B is the near-miss — checking only the most common type still hides poor performance on rarer-but-consequential types/fields."
  },
  {
   "n": 57,
   "scenario": "Structured Data Extraction",
   "domain": "D5",
   "situation": "To catch novel extraction error patterns that wouldn't normally be caught by reviewing low-confidence outputs, what technique should be applied to high-confidence extractions?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Re-run the same extraction twice and average the two outputs"
    },
    {
     "id": "B",
     "text": "Stratified random sampling of high-confidence extractions for ongoing error-rate measurement"
    },
    {
     "id": "C",
     "text": "Apply a stricter required-fields schema only to high-confidence cases"
    },
    {
     "id": "D",
     "text": "Skip reviewing them entirely, since they're already high-confidence"
    }
   ],
   "correct": "B",
   "explanation": "Since low-confidence outputs get reviewed by default, novel error patterns hiding in *high*-confidence outputs are only caught by proactively sampling them (stratified random sampling) for ongoing measurement. D is the failure mode this technique exists to prevent — skipping high-confidence review entirely is exactly how these errors go undetected."
  },
  {
   "n": 58,
   "scenario": "Structured Data Extraction",
   "domain": "D5",
   "situation": "Field-level confidence scores are being used to route extractions to human review. What should calibrate the routing thresholds?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "An arbitrary fixed cutoff, e.g., always exactly 80%"
    },
    {
     "id": "B",
     "text": "The number of fields in the schema"
    },
    {
     "id": "C",
     "text": "Thresholds calibrated using labeled validation sets, so the confidence score maps to actual accuracy"
    },
    {
     "id": "D",
     "text": "The document's file size"
    }
   ],
   "correct": "C",
   "explanation": "Thresholds are only meaningful if calibrated against labeled validation data so a given confidence score actually corresponds to a known accuracy rate; otherwise the score is just an arbitrary number. A's fixed 80% cutoff is the tempting-but-ungrounded choice — with no calibration, 80% could mean anything from 60% to 99% real accuracy."
  },
  {
   "n": 59,
   "scenario": "Structured Data Extraction",
   "domain": "D4",
   "situation": "The same Claude session that generated a code fix is also used to review that fix before merge, and subtle logic errors are consistently missed. What's the underlying cause and the fix?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "`--output-format json` needs to be enabled for accurate review"
    },
    {
     "id": "B",
     "text": "The session retains its generation reasoning and is less likely to challenge its own decisions; use an independent review instance without that prior context"
    },
    {
     "id": "C",
     "text": "The context window is too small for review tasks; use a larger model"
    },
    {
     "id": "D",
     "text": "The prompt lacks a sufficient number of few-shot examples of bugs"
    }
   ],
   "correct": "B",
   "explanation": "The session carries its own generation-time reasoning, so it's biased toward defending its prior work rather than genuinely scrutinizing it — fresh independent instances lack that baggage and catch subtle issues more reliably. A stronger self-critical prompt can't overcome context the model already holds, since the bias is structural, not a wording problem."
  },
  {
   "n": 60,
   "scenario": "Structured Data Extraction",
   "domain": "D4",
   "situation": "Which two practices are appropriate when reviewing a 16-file pull request to avoid the attention dilution seen in single giant review passes?",
   "question": "",
   "select": 2,
   "options": [
    {
     "id": "A",
     "text": "Run one single-pass review across all 16 files simultaneously for maximum context"
    },
    {
     "id": "B",
     "text": "Split into focused per-file passes for local issues"
    },
    {
     "id": "C",
     "text": "Require exactly three independent full-PR passes and keep only majority-vote findings"
    },
    {
     "id": "D",
     "text": "Run a separate cross-file integration pass for data-flow issues spanning files"
    }
   ],
   "correct": [
    "B",
    "D"
   ],
   "explanation": "Per-file passes give each file focused attention for local issues, while a separate cross-file pass specifically targets data-flow/integration issues that span files — together avoiding the attention dilution of one monolithic pass. A is the exact anti-pattern being guarded against, and C substitutes brute-force repetition and majority voting for a structurally sound decomposition."
  }
 ]
});
