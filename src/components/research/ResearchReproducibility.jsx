import { RESEARCH_COMMIT, RESEARCH_PAPER, RESEARCH_SOURCE } from "../../data/research/researchData";
import "../../styles/research/ResearchReproducibility.css";

const resources = [
	{ title: "Research paper", detail: "Eight-page PDF with methods, figures, results, limitations, and references.", href: RESEARCH_PAPER, label: "Open PDF" },
	{ title: "Source code", detail: "Python interpreter, enumerator, dataset tools, and tests.", href: RESEARCH_SOURCE, label: "Open repository" },
	{ title: "Versioned datasets", detail: "Compressed per-program CSV/JSONL, run summaries, manifests, and analysis tables.", href: `${RESEARCH_SOURCE}/tree/main/data`, label: "Browse data" },
	{ title: "Download raw CSV", detail: "Length 4–6, 8-bit, 4,096-step per-program records (compressed).", href: `https://raw.githubusercontent.com/jahphetB/BrainF_busy_beaver-simulator/${RESEARCH_COMMIT}/data/runs/v1/steps4096-n4-6/programs.csv.gz`, label: "Download CSV.gz" },
	{ title: "Download raw JSONL", detail: "The same versioned per-program records in compressed JSON Lines format.", href: `https://raw.githubusercontent.com/jahphetB/BrainF_busy_beaver-simulator/${RESEARCH_COMMIT}/data/runs/v1/steps4096-n4-6/programs.jsonl.gz`, label: "Download JSONL.gz" },
	{ title: "Experiment configurations", detail: "Exact budgets, semantics, and run parameters for each saved census.", href: `${RESEARCH_SOURCE}/tree/main/experiments/configs`, label: "View configurations" },
	{ title: "Reproduction instructions", detail: "Commands to verify datasets and reproduce selected runs and figures.", href: `${RESEARCH_SOURCE}/blob/main/docs/PHASE_3_REPRODUCIBILITY.md`, label: "Read guide" },
	{ title: "Bibliography", detail: "Verified citations and a comparison with related work.", href: `${RESEARCH_SOURCE}/blob/main/paper/references.bib`, label: "View references" },
];

export default function ResearchReproducibility() {
	return (
		<section className="research-repro" id="research-reproducibility" aria-labelledby="research-repro-title">
			<div className="research-repro__heading"><p className="research-repro__eyebrow">05 / Open research</p><h2 className="research-repro__title" id="research-repro-title">Inspect and reproduce the evidence</h2><p className="research-repro__lead">The plots above use static copies of the source repository's versioned analysis files. The full raw records, configurations, and verification tools remain available in that repository.</p></div>
			<div className="research-repro__resources">{resources.map((resource) => <article className="research-repro__resource" key={resource.title}><h3 className="research-repro__resource-title">{resource.title}</h3><p className="research-repro__resource-detail">{resource.detail}</p><a className="research-repro__resource-link" href={resource.href} target="_blank" rel="noopener noreferrer">{resource.label} ↗</a></article>)}</div>
			<div className="research-repro__steps"><h3 className="research-repro__steps-title">Start from a clean research checkout</h3><pre className="research-repro__commands"><code className="research-repro__code">git clone https://github.com/jahphetB/BrainF_busy_beaver-simulator.git{"\n"}cd BrainF_busy_beaver-simulator{"\n"}python -B -m unittest discover -s tests -v{"\n"}python generate.py dataset verify data/runs/v1/primary-n1-5-s512</code></pre><p className="research-repro__provenance">Dashboard source snapshot: <code className="research-repro__commit">{RESEARCH_COMMIT.slice(0, 12)}</code> · analysis version v1 · browser simulator checked against the same hand-derived semantic fixtures used by the Python repository.</p></div>
		</section>
	);
}
