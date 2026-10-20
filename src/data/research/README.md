# Research data snapshot

The research page uses published files from [BrainF_busy_beaver-simulator](https://github.com/jahphetB/BrainF_busy_beaver-simulator) at commit `ac2d7aac21fb49218764cc8022e03b504b947735` (analysis version `v1`). These are copied data, not hand-entered chart values.

| Local file | Upstream file |
| --- | --- |
| `summary.json` | `data/analysis/v1/summary.json` |
| `runtime-output.csv` | `data/analysis/v1/runtime-output.csv` |
| `witnesses.json` | `data/analysis/v1/witnesses.json` |
| `semantics.json` | `tests/fixtures/semantics.json` |
| `public/research/brainfuck-productivity.pdf` | `paper/brainfuck-productivity.pdf` |

The live dashboard filters these static files. Raw compressed per-program datasets stay in the research repository and are linked from the page. To update the page, copy the new versioned artifacts, update `RESEARCH_COMMIT` in `researchData.js`, review any changed field semantics, then run `npm test` and `npm run build`. Do not replace unresolved classifications with inferred results.

The browser simulator is a separate, capped implementation in `src/features/research/brainfuckMachine.js`. Its tests consume the same hand-derived fixture cases as the Python interpreter. Browser-only resource stops must remain labeled unresolved.
