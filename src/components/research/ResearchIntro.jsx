import { getSummaryRows, RESEARCH_PAPER, RESEARCH_SOURCE } from "../../data/research/researchData";
import "../../styles/research/ResearchIntro.css";

export default function ResearchIntro() {
	const lengthSix = getSummaryRows("primary-4096").find((row) => row.length === 6);
	return (
		<section className="research-intro" aria-labelledby="research-title">
			<div className="research-intro__content">
				<p className="research-intro__eyebrow">Computational research · 2026</p>
				<h1 className="research-intro__title" id="research-title">Computational Limits of Short Programs</h1>
				<p className="research-intro__subtitle">From short programs to complex computation: an empirical study of Brainfuck program length, runtime, and output productivity.</p>
				<p className="research-intro__goal">How much can a few commands do—and how much of what we observe depends on the interpreter and the cutoff? This study exhaustively enumerates short programs under explicit semantics, preserves uncertain cases, and publishes the resulting evidence.</p>
				<div className="research-intro__actions">
					<button className="research-intro__action research-intro__action--primary" type="button" onClick={() => document.getElementById("research-dashboard")?.scrollIntoView({ behavior: "smooth" })}>Explore the data</button>
					<a className="research-intro__action" href={RESEARCH_PAPER} target="_blank" rel="noopener noreferrer">Read the paper</a>
					<a className="research-intro__action" href={RESEARCH_SOURCE} target="_blank" rel="noopener noreferrer">Source on GitHub</a>
				</div>
			</div>
			<div className="research-intro__evidence" aria-label="Selected measured results">
				<div className="research-intro__stat"><strong className="research-intro__stat-number">1–6</strong><span className="research-intro__stat-label">command lengths enumerated</span></div>
				<div className="research-intro__stat"><strong className="research-intro__stat-number">{lengthSix.T.toLocaleString()}</strong><span className="research-intro__stat-label">maximum observed halted steps at length 6</span></div>
				<div className="research-intro__stat"><strong className="research-intro__stat-number">{lengthSix.O.toLocaleString()}</strong><span className="research-intro__stat-label">maximum observed output bytes at length 6</span></div>
				<p className="research-intro__qualification">8-bit cells · 4,096-step cutoff. {lengthSix.U} length-six executions remain unresolved by the runner; these maxima are observed lower bounds, not exact unrestricted maxima.</p>
			</div>
		</section>
	);
}
