# project-rules.md

My working contract with AI. The AI must read and follow this file in full before starting any task. The stack-specific sections (Code Conventions) are adjusted per project; everything else is my standing way of working with AI.

---

## 1. Mandatory Workflow Contract

### Pipeline: who owns which stage

1. **Functional Slicing** (me): break requirements into small, isolated subtasks in `TASK_DECOMPOSITION.md`.
2. **Contract-First** (me): define interfaces, types, or JSDoc before asking AI to generate code.
3. **Atomic Generation** (AI): generate exactly one function or module for exactly one subtask.
4. **Independent Verification** (me): verify the output with tests, debugging tools, and `git diff`.

### Before generating

- Read `project-rules.md` first. Work only on the subtask named in the prompt; never pick up other subtasks.
- If the task is ambiguous or conflicts with these rules, stop and ask. Do not guess.
- Never change a contract I have provided.

### While generating

- Return only the requested function or module. No extra files, features, dependencies, optimizations, or refactors outside the scope.
- Do not modify code from earlier verified subtasks unless I ask.
- Follow the Code Conventions and Banned Patterns below.
- Never invent APIs. If unsure an API exists, say so explicitly.

### After generating

- Never claim the code is "tested" or "verified". Only I decide a subtask is done.
- No commit until verification is complete.
- If the output is wrong, I log it in `AI_FAILURE_AUDIT.md` first. Then the AI fixes only that subtask, based on the failure evidence I provide.

---

## 2. Roles

### AI

- Primary code generator. Follows my rules and assigned tasks strictly, with no overstepping.
- Joins project planning and documentation/specification discussions only when I ask.

### Me

- Author of the technical contracts that control AI behavior.
- Verifier and tester of everything the AI produces.
- Owner of the ideas and direction of the project: I lead, control, and confirm.

---

## 3. Code Conventions (stack-specific, adjust per project)

Current stack: JavaScript / TypeScript, following the Google JS/TS Style Guide.

| Item | Rule |
|---|---|
| Variables, functions, methods, properties | `camelCase` |
| Classes, interfaces, types, enums | `PascalCase` |
| Module/global constants | `UPPER_SNAKE_CASE` |
| Files, directories | `kebab-case` |
| Private fields | `private` (TS) |
| Indentation | 2 spaces, no tabs |
| Line length | 80 characters max |
| Semicolons | Required |
| Strings | Single quotes `'...'`; template literals only for interpolation |
| Variable declarations | `const` by default, `let` only when reassigning |
| TS types | Avoid `any`; use `unknown` or a specific interface/type |
| DOM | Use `textContent` or `createElement()`; never assign strings to `innerHTML` |

### Banned patterns

| Banned | Use instead |
|---|---|
| `var`, implicit globals | `const`, `let` |
| `keypress`, `e.keyCode` | `keydown`, `e.key` / `e.code` |
| Raw `innerHTML` injection | DOM APIs or text nodes |
| Inline event handlers (`onclick=...`) | Centralized event delegation |

---

## 4. Git Commit Convention

### Format

```
<type>(<scope>): <description>

[optional body: explain why]
```

### Types

| Type | Use when |
|---|---|
| `feat` | Adding a new feature or function |
| `fix` | Fixing a bug |
| `refactor` | Restructuring code without changing behavior |
| `test` | Adding or changing tests or assertions |
| `docs` | Documentation-only changes |
| `style` | Formatting only, no logic change |
| `perf` | Performance improvement |
| `chore` | Maintenance tasks (config, cleanup) |
| `build` | Build system or dependency changes |
| `revert` | Reverting a previous commit |

### Scope

The module or feature area the change touches (for example `auth`, `api`, `ui`). Keep a consistent set per project. Use `docs` for documentation files.

### Writing rules

- Subject line in imperative mood ("implement", not "implemented" or "implements").
- Lowercase, no trailing period, 72 characters max (aim for under 50).
- One subtask per commit, and only after it is verified.
- Never bundle unrelated changes into one commit.
- If a project or course mandates exact commit messages, use them verbatim.
- Write commits in English.
