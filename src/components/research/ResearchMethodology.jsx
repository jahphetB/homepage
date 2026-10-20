import { RESEARCH_SOURCE } from "../../data/research/researchData";
import "../../styles/research/ResearchMethodology.css";

const stages = [
	{ number: "01", title: "Enumerate", text: "Generate every string of lengths 1–6 over eight Brainfuck commands. Check command-only syntax and balanced brackets before execution." },
	{ number: "02", title: "Execute", text: "Run valid programs on a zero-initialized, right-growing tape with wrapping 8-bit cells, a clamped left edge, byte I/O, and a fixed instruction budget." },
	{ number: "03", title: "Classify", text: "Separate halted runs, exact repeated-state cycles, syntax errors, step-limited runs, and other resource stops. A timeout is not a nontermination proof." },
	{ number: "04", title: "Measure", text: "For halted programs, record executed steps, emitted bytes, visited cells, and distinct final outcomes: output, final pointer, and the full allocated tape." },
];

export default function ResearchMethodology() {
	return (
		<section className="research-method" id="research-methodology" aria-labelledby="research-method-title">
			<div className="research-method__heading">
				<p className="research-method__eyebrow">01 / Methodology</p>
				<h2 className="research-method__title" id="research-method-title">From source string to evidence</h2>
				<p className="research-method__lead">The experiment is a finite census under a named execution model—not a claim about every Brainfuck dialect or the classical Busy Beaver function.</p>
			</div>
			<ol className="research-method__flow" aria-label="Research processing flow">
				{stages.map((stage) => (
					<li className={`research-method__stage research-method__stage--${stage.number}`} key={stage.number}>
						<span className="research-method__stage-number">{stage.number}</span>
						<h3 className="research-method__stage-title">{stage.title}</h3>
						<p className="research-method__stage-text">{stage.text}</p>
					</li>
				))}
			</ol>
			<div className="research-method__notes">
				<p className="research-method__note"><strong className="research-method__note-label">Control-state proof:</strong> An exact repeat of instruction pointer, data pointer, entire allocated tape, and input position proves a cycle for fixed input. Output is append-only and not part of the control state.</p>
				<p className="research-method__note"><strong className="research-method__note-label">Observation limit:</strong> The 512- and 4,096-step runs expose how cutoff censoring changes observed records. The 4-bit run probes sensitivity to cell width.</p>
			</div>
			<a className="research-method__source" href={`${RESEARCH_SOURCE}/blob/main/docs/SEMANTICS.md`} target="_blank" rel="noopener noreferrer">Read the complete interpreter semantics ↗</a>
		</section>
	);
}
