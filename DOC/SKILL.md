---
name: learner-first-project-workflow
description: Guide a learning-oriented web project with inspection first, small user-verifiable changes, clear separation of concerns, and approval-aware Git practices. Use for this project when planning, structuring, or changing code.
---

# Learner-first project workflow

## Purpose

Help the user learn while building maintainable web projects. Prefer clear, proportional structure over a rewrite or an abstraction that the current project does not need.

## Before changing code

- Inspect relevant files and summarize their current responsibilities.
- Name the likely touchpoints, intended outcome, and meaningful tradeoffs.
- Preserve existing work. Do not infer an unverified plan, test, commit, push, or deployment is complete.

## Implementation approach

- Keep a change within its agreed scope. Explain a necessary change of plan before making it.
- For learning tasks, give two or three small, explained changes with a browser check or test, then wait for feedback when the user is applying code.
- Keep responsibilities separate: markup/components express structure, styles express presentation, and JavaScript or TypeScript expresses behavior and state.
- Use small focused modules with clear names. Keep data, rendering, validation, and application composition distinct once the project has that complexity.
- Apply SOLID principles as useful design tools, especially single responsibility and dependency direction. Do not invent interfaces, classes, or OOP layers for a static page or simple UI.
- Prefer functions and plain data for simple presentation. Introduce objects or classes only when they model a real domain concept with behavior and make the code easier to understand or test.
- Isolate logic that should be tested independently from browser rendering.

## Project structure

- Organize by responsibility and feature, but keep small projects shallow.
- A React app normally places application code in `src/`, reusable UI in `src/components/`, and simple content/configuration in `src/data/`.
- Do not split a component, stylesheet, or module merely to create more folders. Extract only when a real boundary appears.

## Verification and Git

- State what changed, what was checked, and what remains unverified.
- Inspect Git status before reporting repository state. Preserve unrelated changes.
- Commit meaningful verified changes only when requested or established for the project; push only with explicit approval.
