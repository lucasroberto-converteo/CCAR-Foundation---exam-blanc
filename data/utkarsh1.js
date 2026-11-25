(window.EXAMS = window.EXAMS || []).push({
 "id": "utkarsh-1",
 "title": "Utkarsh 1 · 6 scénarios",
 "note": "60 questions, 10 par scénario officiel.",
 "source": "https://github.com/utkarsh1agarwal/claude-architect-exam-guide/blob/main/mock-exam/exam-1-questions.md",
 "author": "Utkarsh Agarwal (MIT)",
 "questions": [
  {
   "n": 1,
   "scenario": "Customer Support Resolution Agent",
   "domain": "D1",
   "situation": "Your resolution agent occasionally calls `process_refund` before `get_customer` has returned a verified identity, even though the system prompt says identity verification is mandatory first. What is the most reliable fix?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Rewrite the system prompt in bold, capitalized text"
    },
    {
     "id": "B",
     "text": "Add a programmatic prerequisite that blocks `process_refund` until `get_customer` returns a verified ID"
    },
    {
     "id": "C",
     "text": "Lower the model's temperature"
    },
    {
     "id": "D",
     "text": "Add five few-shot examples showing correct ordering"
    }
   ],
   "correct": "B",
   "explanation": "Deterministic ordering guarantees for high-stakes operations (money, identity) need programmatic enforcement, not stronger prompt wording. This is the exam's single most-repeated lesson."
  },
  {
   "n": 2,
   "scenario": "Customer Support Resolution Agent",
   "domain": "D2",
   "situation": "`get_account_status` and `get_account_details` have nearly identical one-line descriptions. The agent frequently calls the wrong one for billing questions. What's the most effective first step?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Merge the two tools into one"
    },
    {
     "id": "B",
     "text": "Expand both descriptions with input formats, example queries, and explicit \"use this vs. that\" boundaries"
    },
    {
     "id": "C",
     "text": "Add a keyword pre-router in front of the agent"
    },
    {
     "id": "D",
     "text": "Force `tool_choice` to a single named tool"
    }
   ],
   "correct": "B",
   "explanation": "Tool description quality is the primary, lowest-effort lever for fixing tool-selection confusion. Always fix descriptions before reaching for few-shot examples or architectural changes."
  },
  {
   "n": 3,
   "scenario": "Customer Support Resolution Agent",
   "domain": "D5",
   "situation": "A lookup for \"Utkarsh Agarwal\" returns three matching customer records. What should the agent do?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Pick the most recently active account"
    },
    {
     "id": "B",
     "text": "Pick the account with the most orders"
    },
    {
     "id": "C",
     "text": "Ask the customer for an additional identifier (email, order number, zip code)"
    },
    {
     "id": "D",
     "text": "Process the request against all three accounts and let the customer confirm afterward"
    }
   ],
   "correct": "C",
   "explanation": "Multiple ambiguous matches should never be resolved heuristically; ask for another identifier to disambiguate safely."
  },
  {
   "n": 4,
   "scenario": "Customer Support Resolution Agent",
   "domain": "D5",
   "situation": "A customer says, \"I want to speak to a human right now,\" about a routine, easily resolvable issue. What should the agent do?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Attempt to resolve the issue first, and escalate only if the customer repeats the request"
    },
    {
     "id": "B",
     "text": "Escalate immediately, honoring the explicit request"
    },
    {
     "id": "C",
     "text": "Explain why a human isn't necessary and continue autonomously"
    },
    {
     "id": "D",
     "text": "Ask the customer to describe the issue in more detail before deciding"
    }
   ],
   "correct": "B",
   "explanation": "An explicit request for a human should be honored immediately, not investigated around. Offering to resolve first is correct only when the customer *hasn't* explicitly demanded escalation."
  },
  {
   "n": 5,
   "scenario": "Customer Support Resolution Agent",
   "domain": "D1",
   "situation": "A case is escalated to a human agent who cannot see the prior conversation. The handoff contains only a ticket number and the words \"customer upset.\" What's missing?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "A sentiment classification score"
    },
    {
     "id": "B",
     "text": "A structured summary: customer details, root cause, recommended action"
    },
    {
     "id": "C",
     "text": "The full unedited transcript"
    },
    {
     "id": "D",
     "text": "A timestamp of when escalation occurred"
    }
   ],
   "correct": "B",
   "explanation": "A structured handoff (customer details, root cause, recommended action) lets a human act without re-investigating from zero; a sentiment score or bare transcript don't solve that gap."
  },
  {
   "n": 6,
   "scenario": "Customer Support Resolution Agent",
   "domain": "D1",
   "situation": "Your team wants to block any refund over $500 from being auto-approved, regardless of what the model decides. What's the most reliable mechanism?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "A system prompt clause stating the $500 limit"
    },
    {
     "id": "B",
     "text": "A pre-call tool-interception hook that blocks `process_refund` above $500 and redirects to escalation"
    },
    {
     "id": "C",
     "text": "A few-shot example showing a refund being denied at $501"
    },
    {
     "id": "D",
     "text": "Reducing `max_tokens` so large numbers can't be generated"
    }
   ],
   "correct": "B",
   "explanation": "A pre-call tool-interception hook gives a deterministic guarantee. Prompt clauses and few-shot examples are probabilistic and can fail."
  },
  {
   "n": 7,
   "scenario": "Customer Support Resolution Agent",
   "domain": "D1",
   "situation": "Multiple heterogeneous MCP tools return dates in different formats (Unix timestamps, ISO-8601, and localized strings). This is causing the agent to misinterpret order age. What's the best fix?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "A `PostToolUse` hook that normalizes all date formats before the model sees them"
    },
    {
     "id": "B",
     "text": "A system prompt instructing the model to \"convert dates carefully\""
    },
    {
     "id": "C",
     "text": "Removing date fields from tool responses entirely"
    },
    {
     "id": "D",
     "text": "Asking the customer to always state dates in ISO-8601 format"
    }
   ],
   "correct": "A",
   "explanation": "A `PostToolUse` hook normalizes heterogeneous data formats before the model reasons over them — a hook problem, not a prompting problem."
  },
  {
   "n": 8,
   "scenario": "Customer Support Resolution Agent",
   "domain": "D1",
   "situation": "A customer has two unrelated concerns in one message: a billing dispute and a shipping delay. What's the best approach?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Address only the first concern mentioned and ask the customer to submit the second separately"
    },
    {
     "id": "B",
     "text": "Decompose into distinct concerns, investigate each with shared context, then synthesize one unified response"
    },
    {
     "id": "C",
     "text": "Escalate immediately since multi-concern messages are inherently too complex"
    },
    {
     "id": "D",
     "text": "Pick whichever concern seems more urgent and ignore the other"
    }
   ],
   "correct": "B",
   "explanation": "Multi-concern requests should be decomposed into distinct items, investigated with shared context, then synthesized into one unified response."
  },
  {
   "n": 9,
   "scenario": "Customer Support Resolution Agent",
   "domain": "D5",
   "situation": "Your team currently escalates cases when the model's self-reported confidence score falls below 6/10. First-contact resolution remains far below target, with easy cases escalated and hard cases handled autonomously. What's wrong with this design?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "The threshold is set too high and should be lowered"
    },
    {
     "id": "B",
     "text": "Self-reported confidence is poorly calibrated — the model is often confidently wrong on exactly the hardest cases"
    },
    {
     "id": "C",
     "text": "Confidence scores should be averaged over the whole conversation, not per-turn"
    },
    {
     "id": "D",
     "text": "The threshold should instead be based on the number of tool calls made"
    }
   ],
   "correct": "B",
   "explanation": "Self-reported model confidence is a poorly calibrated proxy for actual case complexity; it fails precisely on the hardest cases, which is what's happening here."
  },
  {
   "n": 10,
   "scenario": "Customer Support Resolution Agent",
   "domain": "D2",
   "situation": "An MCP tool returns `{\"isError\": true, \"message\": \"Operation failed\"}` for every kind of failure — timeouts, invalid input, and policy violations alike. What's the problem, and the fix?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "No problem; `isError: true` is sufficient signal"
    },
    {
     "id": "B",
     "text": "The agent can't distinguish retryable from non-retryable failures; add `errorCategory` and `isRetryable` fields"
    },
    {
     "id": "C",
     "text": "Replace `isError` with an HTTP status code instead"
    },
    {
     "id": "D",
     "text": "Log the error server-side only, since the agent doesn't need to see it"
    }
   ],
   "correct": "B",
   "explanation": "Generic error responses hide information the agent needs to react correctly. Structured fields (`errorCategory`, `isRetryable`) let it distinguish retryable, validation, and business-rule failures."
  },
  {
   "n": 11,
   "scenario": "Code Generation with Claude Code",
   "domain": "D3",
   "situation": "A new engineer joins the team and doesn't seem to follow the team's established code style, even though it's documented. Investigation shows the conventions live in `~/.claude/CLAUDE.md` on the tech lead's machine. What's the fix?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Ask the new engineer to manually copy the file"
    },
    {
     "id": "B",
     "text": "Move the conventions to a project-level `CLAUDE.md` committed to the repo"
    },
    {
     "id": "C",
     "text": "Repeat the conventions verbally in stand-up each day"
    },
    {
     "id": "D",
     "text": "Add the conventions to the README instead"
    }
   ],
   "correct": "B",
   "explanation": "User-level `CLAUDE.md` files are personal and not shared via version control. Team-wide conventions belong in a project-level file."
  },
  {
   "n": 12,
   "scenario": "Code Generation with Claude Code",
   "domain": "D3",
   "situation": "Testing conventions need to apply to every `*.test.tsx` file in a large monorepo, regardless of which directory it lives in. What's the most maintainable approach?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "A `CLAUDE.md` file in every directory containing tests"
    },
    {
     "id": "B",
     "text": "A `.claude/rules/testing.md` file with `paths: [\"**/*.test.tsx\"]` frontmatter"
    },
    {
     "id": "C",
     "text": "One giant root `CLAUDE.md` with a \"Testing\" section"
    },
    {
     "id": "D",
     "text": "A skill that must be manually invoked before writing any test"
    }
   ],
   "correct": "B",
   "explanation": "Glob-scoped `.claude/rules/` apply based on file path pattern, independent of directory — exactly the \"convention tied to file type, not location\" problem."
  },
  {
   "n": 13,
   "scenario": "Code Generation with Claude Code",
   "domain": "D3",
   "situation": "You're building a skill that performs deep dependency tracing and produces very long, noisy output. You don't want this output cluttering the main conversation. Which `SKILL.md` frontmatter option addresses this?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "`argument-hint`"
    },
    {
     "id": "B",
     "text": "`allowed-tools`"
    },
    {
     "id": "C",
     "text": "`context: fork`"
    },
    {
     "id": "D",
     "text": "`paths`"
    }
   ],
   "correct": "C",
   "explanation": "`context: fork` runs a skill in an isolated sub-agent context so verbose output doesn't pollute the main conversation."
  },
  {
   "n": 14,
   "scenario": "Code Generation with Claude Code",
   "domain": "D3",
   "situation": "A task involves restructuring a monolithic service into 3 microservices, touching 50+ files, with multiple valid ways to draw service boundaries. What's the right approach?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Direct execution, refining the boundary as you go"
    },
    {
     "id": "B",
     "text": "Plan mode, to explore and design boundaries before committing to changes"
    },
    {
     "id": "C",
     "text": "A single, extremely detailed upfront prompt specifying every file change"
    },
    {
     "id": "D",
     "text": "Direct execution, switching to plan mode only if something unexpected comes up"
    }
   ],
   "correct": "B",
   "explanation": "Multi-file architectural decisions with several valid approaches are exactly plan mode's use case — explore and design before committing."
  },
  {
   "n": 15,
   "scenario": "Code Generation with Claude Code",
   "domain": "D3",
   "situation": "A developer asks Claude to \"clean up this data transformation function,\" and across three attempts, the definition of \"cleaned up\" varies each time (sometimes renaming variables, sometimes restructuring logic, sometimes both). What's the most effective fix?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Repeat the same instruction more forcefully"
    },
    {
     "id": "B",
     "text": "Provide 2–3 concrete before/after examples that pin down what \"cleaned up\" means here"
    },
    {
     "id": "C",
     "text": "Lower `max_tokens`"
    },
    {
     "id": "D",
     "text": "Request five attempts and pick the best one manually"
    }
   ],
   "correct": "B",
   "explanation": "Inconsistent interpretation of a prose instruction is fixed with concrete before/after examples, not stronger wording."
  },
  {
   "n": 16,
   "scenario": "Code Generation with Claude Code",
   "domain": "D3",
   "situation": "A code review surfaces three interacting bugs in a module — fixing bug 1 changes what the correct fix for bug 2 should be. How should this be communicated to Claude?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "One bug per message, sequentially"
    },
    {
     "id": "B",
     "text": "All three interacting issues together in one detailed message"
    },
    {
     "id": "C",
     "text": "Only the most severe bug; let Claude find the rest"
    },
    {
     "id": "D",
     "text": "A summary count of bugs without describing any of them"
    }
   ],
   "correct": "B",
   "explanation": "Interacting issues need to be described together in one message; sequencing them risks contradictory or wasted fixes."
  },
  {
   "n": 17,
   "scenario": "Code Generation with Claude Code",
   "domain": "D3",
   "situation": "Before implementing a rate-limiting layer in an unfamiliar service, a developer wants Claude to first surface design questions (burst handling, per-user vs. global limits, failure behavior) rather than jump straight to code. What technique fits best?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Test-driven iteration"
    },
    {
     "id": "B",
     "text": "The interview pattern"
    },
    {
     "id": "C",
     "text": "Prompt chaining"
    },
    {
     "id": "D",
     "text": "Direct execution with a longer prompt"
    }
   ],
   "correct": "B",
   "explanation": "The interview pattern surfaces design considerations before implementation — well-suited to unfamiliar domains where not every consideration has been anticipated."
  },
  {
   "n": 18,
   "scenario": "Code Generation with Claude Code",
   "domain": "D3",
   "situation": "A project-scoped `/deploy-checklist` command should be available to every developer who clones the repo. Where should it live?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "`.claude/commands/`"
    },
    {
     "id": "B",
     "text": "`~/.claude/commands/`"
    },
    {
     "id": "C",
     "text": "`CLAUDE.md`"
    },
    {
     "id": "D",
     "text": "`.claude/config.json`"
    }
   ],
   "correct": "A",
   "explanation": "Project-scoped commands in `.claude/commands/` are version-controlled and shared with everyone who clones the repo."
  },
  {
   "n": 19,
   "scenario": "Code Generation with Claude Code",
   "domain": "D3",
   "situation": "You want Claude to write a test suite, then iteratively improve an implementation based on which tests fail. What should you feed back after each attempt?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Only the original instructions, repeated"
    },
    {
     "id": "B",
     "text": "The actual test failures from that attempt"
    },
    {
     "id": "C",
     "text": "A new, unrelated set of instructions each time"
    },
    {
     "id": "D",
     "text": "Nothing — Claude should be able to infer failures without being told"
    }
   ],
   "correct": "B",
   "explanation": "Test-driven iteration works by sharing actual test *failures* after each attempt, not just the original test suite once."
  },
  {
   "n": 20,
   "scenario": "Code Generation with Claude Code",
   "domain": "D3",
   "situation": "A developer is unsure whether to use `.claude/rules/` or a subdirectory `CLAUDE.md` for a convention that applies to all files under `src/api/`. Which favors `.claude/rules/`?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "The convention only ever applies within that one directory"
    },
    {
     "id": "B",
     "text": "The convention needs to apply based on file path patterns that might extend beyond one directory in the future"
    },
    {
     "id": "C",
     "text": "The convention is short enough to fit in one line"
    },
    {
     "id": "D",
     "text": "There's no meaningful difference between the two options"
    }
   ],
   "correct": "B",
   "explanation": "`.claude/rules/` with glob `paths` scales to conventions that might extend across directories; a subdirectory `CLAUDE.md` is bound to one location."
  },
  {
   "n": 21,
   "scenario": "Multi-Agent Research System",
   "domain": "D1",
   "situation": "A coordinator decomposes \"renewable energy policy trends\" into three subtasks, all focused on solar policy in a single country. Each subagent executes its assigned task correctly, but the final report is extremely narrow. Where's the defect?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "The synthesis agent's summarization quality"
    },
    {
     "id": "B",
     "text": "The coordinator's task decomposition"
    },
    {
     "id": "C",
     "text": "The web search agent's query construction"
    },
    {
     "id": "D",
     "text": "The document analysis agent's relevance filtering"
    }
   ],
   "correct": "B",
   "explanation": "Every subagent executed correctly; the narrow coverage comes from how the coordinator decomposed the topic in the first place."
  },
  {
   "n": 22,
   "scenario": "Multi-Agent Research System",
   "domain": "D1",
   "situation": "Which statement about subagent context is correct?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Subagents automatically inherit the coordinator's full conversation history"
    },
    {
     "id": "B",
     "text": "Subagents share memory across invocations by default"
    },
    {
     "id": "C",
     "text": "Subagents require context to be explicitly included in their invocation prompt"
    },
    {
     "id": "D",
     "text": "Subagents inherit context if invoked within the same API call"
    }
   ],
   "correct": "C",
   "explanation": "Subagents do not automatically inherit context; it must be explicitly included in their invocation prompt."
  },
  {
   "n": 23,
   "scenario": "Multi-Agent Research System",
   "domain": "D1",
   "situation": "A coordinator needs both a web search subagent and a document analysis subagent to run concurrently rather than one after another. How should the coordinator invoke them?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Two separate Task tool calls made in two separate coordinator turns"
    },
    {
     "id": "B",
     "text": "Multiple Task tool calls emitted in a single coordinator response"
    },
    {
     "id": "C",
     "text": "One combined subagent that does both jobs"
    },
    {
     "id": "D",
     "text": "Sequential invocation is the only supported pattern"
    }
   ],
   "correct": "B",
   "explanation": "Emitting multiple Task tool calls in a single coordinator response runs subagents concurrently rather than sequentially."
  },
  {
   "n": 24,
   "scenario": "Multi-Agent Research System",
   "domain": "D2, D5",
   "situation": "A search subagent times out. What should it report back to the coordinator?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "An empty result set marked as a success"
    },
    {
     "id": "B",
     "text": "Structured error context: failure type, what was attempted, any partial results, possible alternatives"
    },
    {
     "id": "C",
     "text": "A generic \"search unavailable\" string"
    },
    {
     "id": "D",
     "text": "Nothing — silently retry indefinitely without reporting"
    }
   ],
   "correct": "B",
   "explanation": "Structured error context (failure type, attempted action, partial results, alternatives) lets the coordinator make an informed recovery decision. Silently succeeding (A) or vague strings (C) hide information; runaway retries (D) risk resource exhaustion without reporting."
  },
  {
   "n": 25,
   "scenario": "Multi-Agent Research System",
   "domain": "D2",
   "situation": "The synthesis subagent needs to verify simple facts (dates, names, statistics) very frequently — 85% of verification needs are simple, 15% require deep investigation. Routing every check through the coordinator adds significant latency. What's the best fix?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Give the synthesis agent full access to all search tools"
    },
    {
     "id": "B",
     "text": "Give the synthesis agent one scoped `verify_fact` tool for the common case; keep coordinator routing for complex cases"
    },
    {
     "id": "C",
     "text": "Batch all verifications to run at the very end of the pipeline"
    },
    {
     "id": "D",
     "text": "Remove verification entirely to save time"
    }
   ],
   "correct": "B",
   "explanation": "Giving the synthesis agent one scoped tool for the common, simple case follows least-privilege while avoiding unnecessary coordinator round-trips; the rare complex case still routes through the coordinator."
  },
  {
   "n": 26,
   "scenario": "Multi-Agent Research System",
   "domain": "D5",
   "situation": "Two credible sources report different figures for the same statistic. What should the synthesis output do?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Use whichever source is more recent, silently"
    },
    {
     "id": "B",
     "text": "Average the two figures"
    },
    {
     "id": "C",
     "text": "Preserve both values with source attribution and flag the discrepancy"
    },
    {
     "id": "D",
     "text": "Omit the statistic entirely"
    }
   ],
   "correct": "C",
   "explanation": "Conflicting credible sources should be preserved with attribution and flagged, never silently reconciled by picking or averaging one value."
  },
  {
   "n": 27,
   "scenario": "Multi-Agent Research System",
   "domain": "D5",
   "situation": "A subagent's findings are passed to the synthesis agent as a single block of unstructured prose, and the final report loses track of which claim came from which source. What's the fix?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Have the coordinator manually re-attribute claims after the fact"
    },
    {
     "id": "B",
     "text": "Require subagents to output structured claim-source mappings (claim, excerpt, source, date) that synthesis preserves"
    },
    {
     "id": "C",
     "text": "Reduce the number of subagents to avoid attribution complexity"
    },
    {
     "id": "D",
     "text": "Have the synthesis agent guess the most likely source based on writing style"
    }
   ],
   "correct": "B",
   "explanation": "Structured claim-source mappings preserve provenance through synthesis; unstructured prose loses which claim came from which source."
  },
  {
   "n": 28,
   "scenario": "Multi-Agent Research System",
   "domain": "D1",
   "situation": "A coordinator's `allowedTools` list does not include `\"Task\"`. What happens when it tries to delegate to a subagent?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "It works normally; `Task` is always available"
    },
    {
     "id": "B",
     "text": "It cannot spawn subagents at all"
    },
    {
     "id": "C",
     "text": "It spawns subagents but without passing context"
    },
    {
     "id": "D",
     "text": "It falls back to a built-in tool automatically"
    }
   ],
   "correct": "B",
   "explanation": "The `Task` tool must be in `allowedTools` for a coordinator to spawn subagents at all."
  },
  {
   "n": 29,
   "scenario": "Multi-Agent Research System",
   "domain": "D5",
   "situation": "After a subagent crash mid-run, the coordinator needs to resume without losing prior progress. What's the recommended pattern?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Restart the entire pipeline from scratch every time"
    },
    {
     "id": "B",
     "text": "Each agent exports state to a known location; the coordinator loads a manifest on resume and re-injects it"
    },
    {
     "id": "C",
     "text": "Rely on the model's memory of the prior session"
    },
    {
     "id": "D",
     "text": "Manually re-type a summary of progress into the next prompt"
    }
   ],
   "correct": "B",
   "explanation": "Structured state exports plus a coordinator-loaded manifest on resume is the recommended crash-recovery pattern."
  },
  {
   "n": 30,
   "scenario": "Multi-Agent Research System",
   "domain": "D5",
   "situation": "A report needs to include findings from sources published a decade apart, describing what appear to be conflicting figures. What should the synthesis output require to avoid misinterpreting a genuine trend as a contradiction?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Publication or data-collection dates on each finding"
    },
    {
     "id": "B",
     "text": "A single averaged figure across all sources"
    },
    {
     "id": "C",
     "text": "Removal of the older sources entirely"
    },
    {
     "id": "D",
     "text": "A confidence score attached to the more recent figure only"
    }
   ],
   "correct": "A",
   "explanation": "Publication/collection dates let genuine change over time be distinguished from an apparent contradiction between sources."
  },
  {
   "n": 31,
   "scenario": "Developer Productivity with Claude",
   "domain": "D2",
   "situation": "A developer needs to find every file matching `**/*.config.ts` across a large repository. Which built-in tool is correct?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "`Grep`"
    },
    {
     "id": "B",
     "text": "`Glob`"
    },
    {
     "id": "C",
     "text": "`Read`"
    },
    {
     "id": "D",
     "text": "`Edit`"
    }
   ],
   "correct": "B",
   "explanation": "`Glob` matches file paths/names by pattern."
  },
  {
   "n": 32,
   "scenario": "Developer Productivity with Claude",
   "domain": "D2",
   "situation": "A developer needs to find every place in the codebase that calls a specific function by name. Which built-in tool is correct?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "`Grep`"
    },
    {
     "id": "B",
     "text": "`Glob`"
    },
    {
     "id": "C",
     "text": "`Write`"
    },
    {
     "id": "D",
     "text": "`Bash` with no arguments"
    }
   ],
   "correct": "A",
   "explanation": "`Grep` searches file *contents*, which is what's needed to find function callers."
  },
  {
   "n": 33,
   "scenario": "Developer Productivity with Claude",
   "domain": "D2",
   "situation": "A connected MCP server exposes a `trace_dependencies` tool that's meaningfully more capable than manually chaining `Grep` and `Read`, but the agent keeps using `Grep` instead. What's the most likely cause?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "MCP tools are always deprioritized versus built-ins and this can't be changed"
    },
    {
     "id": "B",
     "text": "The MCP tool's description doesn't make a strong enough case for its capability relative to the familiar built-in"
    },
    {
     "id": "C",
     "text": "The MCP server is misconfigured at the network level"
    },
    {
     "id": "D",
     "text": "`Grep` needs to be removed from the tool list entirely"
    }
   ],
   "correct": "B",
   "explanation": "A thin MCP tool description loses to a familiar built-in by default; enhancing the description (not removing the built-in) is the fix."
  },
  {
   "n": 34,
   "scenario": "Developer Productivity with Claude",
   "domain": "D2",
   "situation": "An `Edit` call fails because the anchor text it's trying to match appears more than once in the file. What's the reliable fallback?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Retry `Edit` with the exact same input"
    },
    {
     "id": "B",
     "text": "Use `Read` to load the full file, then `Write` the corrected version"
    },
    {
     "id": "C",
     "text": "Use `Grep` to force a unique match"
    },
    {
     "id": "D",
     "text": "Skip the edit and ask the user to do it manually"
    }
   ],
   "correct": "B",
   "explanation": "When `Edit`'s anchor text isn't unique, `Read` + `Write` is the reliable fallback for a full-file rewrite."
  },
  {
   "n": 35,
   "scenario": "Developer Productivity with Claude",
   "domain": "D2",
   "situation": "A productivity agent needs credentials for a shared, team-wide MCP server, and the token must never be committed to git. Where should this be configured?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "`~/.claude.json` with the token hardcoded"
    },
    {
     "id": "B",
     "text": "`.mcp.json` with `${TOKEN_NAME}` environment variable expansion"
    },
    {
     "id": "C",
     "text": "Directly inside `CLAUDE.md`"
    },
    {
     "id": "D",
     "text": "A comment at the top of the relevant source file"
    }
   ],
   "correct": "B",
   "explanation": "Project-scoped `.mcp.json` with environment-variable expansion keeps credentials out of version control while remaining shared team config."
  },
  {
   "n": 36,
   "scenario": "Developer Productivity with Claude",
   "domain": "D2",
   "situation": "A developer wants a personal, experimental MCP server that only they use, without affecting teammates. Where should it be configured?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "`.mcp.json` in the repo"
    },
    {
     "id": "B",
     "text": "`~/.claude.json`"
    },
    {
     "id": "C",
     "text": "`.claude/rules/`"
    },
    {
     "id": "D",
     "text": "A shared team wiki page"
    }
   ],
   "correct": "B",
   "explanation": "`~/.claude.json` is the user-scoped location for personal/experimental servers."
  },
  {
   "n": 37,
   "scenario": "Developer Productivity with Claude",
   "domain": "D5",
   "situation": "After several hours of exploring a large, unfamiliar codebase, Claude starts giving vague answers about \"typical patterns\" instead of referencing the specific classes it found earlier. What's the most direct fix?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Restart with no context"
    },
    {
     "id": "B",
     "text": "Maintain a scratchpad file recording key findings for the agent to reference"
    },
    {
     "id": "C",
     "text": "Switch to a different model mid-session"
    },
    {
     "id": "D",
     "text": "Increase `max_tokens`"
    }
   ],
   "correct": "B",
   "explanation": "A scratchpad file persisting key findings counters context degradation in long exploration sessions."
  },
  {
   "n": 38,
   "scenario": "Developer Productivity with Claude",
   "domain": "D2",
   "situation": "A developer wants to build understanding of an unfamiliar codebase efficiently, without reading every file upfront. What's the recommended exploration pattern?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Use `Read` on every file in the repository first"
    },
    {
     "id": "B",
     "text": "Start with `Grep` to find entry points, then `Read` to follow imports and trace flow"
    },
    {
     "id": "C",
     "text": "Use `Bash` to `cat` the entire repo into one context block"
    },
    {
     "id": "D",
     "text": "Ask the user to describe the codebase verbally instead of exploring it"
    }
   ],
   "correct": "B",
   "explanation": "Starting with `Grep` for entry points, then `Read` to follow imports, builds understanding incrementally without reading everything upfront."
  },
  {
   "n": 39,
   "scenario": "Developer Productivity with Claude",
   "domain": "D2",
   "situation": "A generic tool named `process_data` is used for three very different jobs: extracting data points, summarizing content, and verifying claims — and the agent frequently uses it incorrectly. After improving the description doesn't fully resolve the confusion, what's the next step on the fix ladder?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Add ten few-shot examples immediately, skipping other options"
    },
    {
     "id": "B",
     "text": "Split `process_data` into purpose-specific tools: `extract_data_points`, `summarize_content`, `verify_claim`"
    },
    {
     "id": "C",
     "text": "Remove the tool entirely"
    },
    {
     "id": "D",
     "text": "Rename it without changing its scope"
    }
   ],
   "correct": "B",
   "explanation": "Splitting an overly generic tool into purpose-specific tools is the next rung on the fix ladder once description improvements alone haven't fully resolved confusion."
  },
  {
   "n": 40,
   "scenario": "Developer Productivity with Claude",
   "domain": "D2",
   "situation": "A team wants to give a productivity agent both `Read`/`Write`/`Bash` and 15 additional MCP tools for various integrations, all available at once. Recent logs show increasing tool misuse. What's the likely cause and fix?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "The model needs a larger context window"
    },
    {
     "id": "B",
     "text": "Too many available tools increases decision complexity and misuse risk; scope tools per task/role instead"
    },
    {
     "id": "C",
     "text": "`Bash` should be removed since it's the most dangerous tool"
    },
    {
     "id": "D",
     "text": "The system prompt needs to list all 18 tools more explicitly"
    }
   ],
   "correct": "B",
   "explanation": "Too many available tools increases selection complexity and misuse; scoping tools per task/role is the fix, not a bigger context window or removing a single tool."
  },
  {
   "n": 41,
   "scenario": "Claude Code for Continuous Integration",
   "domain": "D3",
   "situation": "A CI job runs `claude \"Summarize the diff and flag risky changes\"` and hangs indefinitely, waiting for input. What's the fix?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Add the `-p` (or `--print`) flag"
    },
    {
     "id": "B",
     "text": "Set an environment variable to disable interactivity"
    },
    {
     "id": "C",
     "text": "Pipe an empty file into the command as a workaround"
    },
    {
     "id": "D",
     "text": "Add a `--ci` flag"
    }
   ],
   "correct": "A",
   "explanation": "`-p` / `--print` runs Claude Code non-interactively, which is required in automated pipelines. (B and D describe flags/variables that don't exist — a common distractor pattern.)"
  },
  {
   "n": 42,
   "scenario": "Claude Code for Continuous Integration",
   "domain": "D3",
   "situation": "You want automated PR review findings posted as machine-parseable inline comments. What CLI options should you use?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "`--verbose` and `--debug`"
    },
    {
     "id": "B",
     "text": "`--output-format json` combined with `--json-schema`"
    },
    {
     "id": "C",
     "text": "`--print` alone is sufficient"
    },
    {
     "id": "D",
     "text": "`--format text`"
    }
   ],
   "correct": "B",
   "explanation": "`--output-format json` with `--json-schema` produces machine-parseable structured findings suitable for automated PR comments."
  },
  {
   "n": 43,
   "scenario": "Claude Code for Continuous Integration",
   "domain": "D3",
   "situation": "The same Claude Code session that generated a bug fix is also used to review that fix before merge, and subtle logic issues are consistently missed. Why?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "The context window is too small"
    },
    {
     "id": "B",
     "text": "The same session retains its generation reasoning, making it less likely to challenge its own prior decisions"
    },
    {
     "id": "C",
     "text": "`--output-format json` wasn't set"
    },
    {
     "id": "D",
     "text": "The model needs more few-shot examples of \"good reviews\""
    }
   ],
   "correct": "B",
   "explanation": "A session that generated code retains its own reasoning and is less likely to challenge its own decisions; an independent instance reviews more effectively."
  },
  {
   "n": 44,
   "scenario": "Claude Code for Continuous Integration",
   "domain": "D4",
   "situation": "Automated code review is producing a 40% false-positive rate concentrated in one finding category. The prompt already instructs the model to \"only report high-confidence issues.\" What's the most effective next step?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Add \"be even more careful\" to the prompt"
    },
    {
     "id": "B",
     "text": "Define explicit, categorical criteria for that finding type, and consider temporarily disabling the category while iterating"
    },
    {
     "id": "C",
     "text": "Lower the sampling temperature"
    },
    {
     "id": "D",
     "text": "Permanently disable all review categories"
    }
   ],
   "correct": "B",
   "explanation": "Vague instructions like \"be conservative\" don't meaningfully reduce false positives; explicit categorical criteria do, and temporarily disabling a high-false-positive category protects trust while iterating."
  },
  {
   "n": 45,
   "scenario": "Claude Code for Continuous Integration",
   "domain": "D3",
   "situation": "A team wants Claude Code's automated review to avoid duplicate comments across re-runs after new commits are pushed to a PR. What should be included in context on re-runs?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Nothing — each run should be fully independent"
    },
    {
     "id": "B",
     "text": "The prior review's findings, with instructions to report only new or still-unaddressed issues"
    },
    {
     "id": "C",
     "text": "The full git history of the repository"
    },
    {
     "id": "D",
     "text": "A count of how many times the PR has been reviewed"
    }
   ],
   "correct": "B",
   "explanation": "Including prior findings and instructing the model to report only new/unaddressed issues avoids duplicate PR comments across re-runs."
  },
  {
   "n": 46,
   "scenario": "Claude Code for Continuous Integration",
   "domain": "D1, D4",
   "situation": "A single-pass review across a 15-file PR produces inconsistent depth — some files get thorough feedback, others get superficial comments, and the same pattern is flagged in one file but approved in another. What's the fix?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Use a model with a larger context window"
    },
    {
     "id": "B",
     "text": "Split into per-file local-analysis passes, plus a separate cross-file integration pass"
    },
    {
     "id": "C",
     "text": "Require developers to submit smaller PRs"
    },
    {
     "id": "D",
     "text": "Run the same single pass three times and vote on findings"
    }
   ],
   "correct": "B",
   "explanation": "Splitting into per-file passes plus a separate cross-file integration pass avoids the attention dilution causing inconsistent, contradictory findings."
  },
  {
   "n": 47,
   "scenario": "Claude Code for Continuous Integration",
   "domain": "D4",
   "situation": "A team wants to reduce API costs on two workflows: (1) a blocking pre-merge check developers wait on, and (2) an overnight technical-debt report. Which should move to the Message Batches API?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Both"
    },
    {
     "id": "B",
     "text": "Only the overnight report; keep the pre-merge check synchronous"
    },
    {
     "id": "C",
     "text": "Only the pre-merge check"
    },
    {
     "id": "D",
     "text": "Neither, since batch API doesn't support any CI use case"
    }
   ],
   "correct": "B",
   "explanation": "The Batch API's lack of a latency SLA makes it unsuitable for blocking workflows; it's appropriate only for the latency-tolerant overnight report."
  },
  {
   "n": 48,
   "scenario": "Claude Code for Continuous Integration",
   "domain": "D3",
   "situation": "Test generation is producing many low-value, duplicate tests that already exist in the suite. What's the most direct fix?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Increase `max_tokens` for the generation call"
    },
    {
     "id": "B",
     "text": "Provide existing test files in context, and document testing standards/fixtures in `CLAUDE.md`"
    },
    {
     "id": "C",
     "text": "Disable test generation entirely"
    },
    {
     "id": "D",
     "text": "Ask developers to write all tests manually going forward"
    }
   ],
   "correct": "B",
   "explanation": "Providing existing test files in context and documenting standards/fixtures in `CLAUDE.md` reduces duplicate, low-value test generation."
  },
  {
   "n": 49,
   "scenario": "Claude Code for Continuous Integration",
   "domain": "D3, D4",
   "situation": "A CI review pipeline needs its findings to be reliably parseable by a downstream bot that posts PR comments. Which is the most robust approach?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Ask the model nicely in the prompt to \"format your response as JSON\""
    },
    {
     "id": "B",
     "text": "Use `--output-format json` with a `--json-schema` to enforce structure"
    },
    {
     "id": "C",
     "text": "Parse the model's free-text output with regular expressions"
    },
    {
     "id": "D",
     "text": "Manually reformat the output after each run"
    }
   ],
   "correct": "B",
   "explanation": "Enforced structured output via CLI flags is far more reliable than asking nicely in a prompt or parsing free text with regex."
  },
  {
   "n": 50,
   "scenario": "Claude Code for Continuous Integration",
   "domain": "D3",
   "situation": "Documented testing standards live only in a senior engineer's head and aren't written anywhere the CI pipeline's Claude Code invocation can access. What's the fix?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Rely on the model's general knowledge of \"good tests\""
    },
    {
     "id": "B",
     "text": "Document testing standards, valuable test criteria, and available fixtures in `CLAUDE.md`"
    },
    {
     "id": "C",
     "text": "Ask the senior engineer to review every PR manually instead"
    },
    {
     "id": "D",
     "text": "Add the standards to a Slack channel pinned message"
    }
   ],
   "correct": "B",
   "explanation": "Documenting standards in `CLAUDE.md` makes them available to every Claude Code invocation, including CI, instead of living only in one person's head."
  },
  {
   "n": 51,
   "scenario": "Structured Data Extraction",
   "domain": "D4",
   "situation": "An extraction pipeline using `tool_use` with a strict JSON schema never produces malformed JSON, but sometimes produces line items that don't sum to the stated total. What does this indicate, and what's the fix?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "The schema itself is broken; add more `required` fields"
    },
    {
     "id": "B",
     "text": "This is a semantic error, not a syntax error; add a `calculated_total` field to compare against `stated_total`"
    },
    {
     "id": "C",
     "text": "Switch away from `tool_use` to plain text JSON"
    },
    {
     "id": "D",
     "text": "Reduce `max_tokens` to force shorter output"
    }
   ],
   "correct": "B",
   "explanation": "`tool_use` with a schema eliminates syntax errors but not semantic ones; comparing a calculated total against the stated total catches this class of mismatch."
  },
  {
   "n": 52,
   "scenario": "Structured Data Extraction",
   "domain": "D4",
   "situation": "You have three separate extraction schemas (invoice, receipt, contract) and don't know the document type in advance, but want to guarantee some structured extraction occurs. Which `tool_choice` setting is correct?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "`\"auto\"`"
    },
    {
     "id": "B",
     "text": "`\"any\"`"
    },
    {
     "id": "C",
     "text": "A forced call to one specific schema's tool"
    },
    {
     "id": "D",
     "text": "Omitting `tool_choice`"
    }
   ],
   "correct": "B",
   "explanation": "`tool_choice: \"any\"` guarantees a tool call happens while still letting the model choose which of several schemas fits."
  },
  {
   "n": 53,
   "scenario": "Structured Data Extraction",
   "domain": "D4",
   "situation": "A required field, `purchase_order_number`, keeps failing validation because the source document genuinely never contains a PO number anywhere. What should you do?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Keep retrying with the same prompt"
    },
    {
     "id": "B",
     "text": "Make the field nullable/optional instead of required"
    },
    {
     "id": "C",
     "text": "Fabricate a placeholder value so validation passes"
    },
    {
     "id": "D",
     "text": "Increase `max_tokens` and try again"
    }
   ],
   "correct": "B",
   "explanation": "When information is genuinely absent from the source, no amount of retrying will produce it; the field should be nullable instead of required."
  },
  {
   "n": 54,
   "scenario": "Structured Data Extraction",
   "domain": "D4",
   "situation": "A retry is needed because a nested array of line items was incorrectly flattened into a single string on the first extraction attempt. What should the retry prompt include?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Only a repeated instruction to \"format correctly this time\""
    },
    {
     "id": "B",
     "text": "The original document, the failed extraction, and the specific validation error describing the flattening problem"
    },
    {
     "id": "C",
     "text": "A completely different, unrelated example document"
    },
    {
     "id": "D",
     "text": "Nothing further — the model should self-correct silently"
    }
   ],
   "correct": "B",
   "explanation": "This is a structural, retry-fixable error — the retry needs the specific validation error to correct against."
  },
  {
   "n": 55,
   "scenario": "Structured Data Extraction",
   "domain": "D2, D4",
   "situation": "Two tools have nearly identical descriptions, causing selection confusion, and you've already rewritten both descriptions with clear boundaries — but genuinely ambiguous edge cases still cause mistakes. What's the next lever?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "2–4 few-shot examples showing correct selection with reasoning for the ambiguous cases"
    },
    {
     "id": "B",
     "text": "Force `tool_choice` to always pick one tool"
    },
    {
     "id": "C",
     "text": "Merge the tools into one"
    },
    {
     "id": "D",
     "text": "Increase `max_tokens`"
    }
   ],
   "correct": "A",
   "explanation": "Once description improvements are exhausted, few-shot examples with reasoning are the next lever for genuinely ambiguous residual cases."
  },
  {
   "n": 56,
   "scenario": "Structured Data Extraction",
   "domain": "D5",
   "situation": "An extraction pipeline reports 97% overall field accuracy. A stakeholder wants to reduce human review before fully trusting this number. What should happen first?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Immediately reduce human review across the board, since 97% is high"
    },
    {
     "id": "B",
     "text": "Validate accuracy broken down by document type and field, since aggregate accuracy can mask segment-level failure"
    },
    {
     "id": "C",
     "text": "Round the accuracy up to 100% for reporting purposes"
    },
    {
     "id": "D",
     "text": "Stop measuring accuracy since it's already high enough"
    }
   ],
   "correct": "B",
   "explanation": "Aggregate accuracy can mask segment-level failure; validating by document type and field is required before reducing review."
  },
  {
   "n": 57,
   "scenario": "Structured Data Extraction",
   "domain": "D5",
   "situation": "You want to catch novel extraction error patterns that wouldn't normally be reviewed, since your review process currently only samples low-confidence extractions. What should you add?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Stratified random sampling of high-confidence extractions"
    },
    {
     "id": "B",
     "text": "A rule to never review high-confidence extractions"
    },
    {
     "id": "C",
     "text": "A fixed weekly quota of 10 reviews regardless of confidence"
    },
    {
     "id": "D",
     "text": "Removing confidence scoring entirely"
    }
   ],
   "correct": "A",
   "explanation": "Stratified random sampling of high-confidence extractions is specifically designed to catch novel error patterns that a confidence-based review process would otherwise never see."
  },
  {
   "n": 58,
   "scenario": "Structured Data Extraction",
   "domain": "D4",
   "situation": "Your team wants to move a blocking, pre-merge invoice-validation workflow to the Message Batches API to save 50% on cost. Is this appropriate?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "Yes, always — batch API should be used wherever possible for cost savings"
    },
    {
     "id": "B",
     "text": "No — batch processing has no latency SLA and can take up to 24 hours, making it unsuitable for a blocking workflow"
    },
    {
     "id": "C",
     "text": "Yes, as long as `custom_id` is set correctly"
    },
    {
     "id": "D",
     "text": "Only if the invoices are small in size"
    }
   ],
   "correct": "B",
   "explanation": "The Batch API's lack of a latency SLA (up to 24 hours) makes it unsuitable for any blocking, pre-merge/pre-approval workflow."
  },
  {
   "n": 59,
   "scenario": "Structured Data Extraction",
   "domain": "D4",
   "situation": "An extraction schema needs to categorize expenses, but the fixed set of categories won't cover every real-world case that will eventually appear. What schema design pattern handles this best?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "A required `category` string field with no constraints"
    },
    {
     "id": "B",
     "text": "An `enum` field with a defined set of categories plus an `\"other\"` value and a `category_detail` string field"
    },
    {
     "id": "C",
     "text": "A free-text field parsed later with regular expressions"
    },
    {
     "id": "D",
     "text": "Omitting the category field entirely"
    }
   ],
   "correct": "B",
   "explanation": "An `enum` plus `\"other\"` and a detail string handles extensibility without over-fitting to a fixed list or silently misclassifying novel cases."
  },
  {
   "n": 60,
   "scenario": "Structured Data Extraction",
   "domain": "D4",
   "situation": "After several extraction pipeline iterations, the team wants to systematically analyze which document patterns most often trigger validation errors or get dismissed as false positives by downstream reviewers. What should be added to each structured finding?",
   "question": "",
   "select": 1,
   "options": [
    {
     "id": "A",
     "text": "A random UUID per finding"
    },
    {
     "id": "B",
     "text": "A `detected_pattern` field describing what triggered the finding"
    },
    {
     "id": "C",
     "text": "A free-text comment box with no structure"
    },
    {
     "id": "D",
     "text": "Nothing — this requires a separate ML model to analyze"
    }
   ],
   "correct": "B",
   "explanation": "A `detected_pattern` field enables systematic, aggregate analysis of which patterns trigger errors or get dismissed as false positives over time."
  }
 ]
});
