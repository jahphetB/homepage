import { getSummaryRows, RESEARCH_SOURCE } from "../../data/research/researchData";
import "../../styles/research/ResearchFindings.css";

export default function ResearchFindings() {
	const shortRun = getSummaryRows("primary-512").find((row) => row.length === 6);
	const longRun = getSummaryRows("primary-4096").find((row) => row.length === 6);
	const narrowRun = getSummaryRows("cell4-4096").find((row) => row.length === 6);
	return (
		<section className="research-findings" id="research-findings" aria-labelledby="research-findings-title">
			<div className="research-findings__heading"><p className="research-findings__eyebrow">04 / Interpretation</p><h2 className="research-findings__title" id="research-findings-title">What the experiments actually show</h2><p className="research-findings__lead">Small programs can amplify execution time or output—but the records depend on what the experiment can observe.</p></div>
			<div className="research-findings__grid">
				<article className="research-findings__card"><span className="research-findings__card-index">01</span><h3 className="research-findings__card-title">Cutoffs can hide records</h3><p className="research-findings__card-text">At length six, a {shortRun.max_steps.toLocaleString()}-step cutoff observed at most {shortRun.T} halted steps and {shortRun.O} output bytes. Raising it to {longRun.max_steps.toLocaleString()} revealed {longRun.T.toLocaleString()} steps and {longRun.O} bytes. These are measured halted values, not a general maximum theorem.</p></article>
				<article className="research-findings__card"><span className="research-findings__card-index">02</span><h3 className="research-findings__card-title">Runtime and output diverge</h3><p className="research-findings__card-text"><code className="research-findings__code">+[&lt;&gt;+]</code> reaches the length-six runtime record without emitting bytes. <code className="research-findings__code">+[+..]</code> emits {longRun.O} bytes in 1,022 steps. More execution does not necessarily mean more output.</p></article>
				<article className="research-findings__card"><span className="research-findings__card-index">03</span><h3 className="research-findings__card-title">Semantics matter</h3><p className="research-findings__card-text">At the same cutoff, 4-bit cells reduce the length-six observed records to {narrowRun.T} steps and {narrowRun.O} output bytes. The matched raw classifications agree, but numerical productivity does not.</p></article>
				<article className="research-findings__card"><span className="research-findings__card-index">04</span><h3 className="research-findings__card-title">Uncertainty remains visible</h3><p className="research-findings__card-text">The runner retains {longRun.U} unresolved length-six cases. Four length-five growing-tape loops have separate structural nontermination arguments; a step limit alone never proves a loop. Length-six records remain observed lower bounds.</p></article>
			</div>
			<div className="research-findings__boundary"><h3 className="research-findings__boundary-title">Contribution and limits</h3><p className="research-findings__boundary-text">This is a reproducible, semantics-explicit empirical artifact. Exhaustive enumeration, Brainfuck wrapping loops, and Busy Beaver-style questions are previously studied; the paper does not establish priority, new classical Busy Beaver records, or exact Kolmogorov complexity. Results cover command lengths through six, empty-input experiments, two cell widths, and the documented model.</p><a className="research-findings__boundary-link" href={`${RESEARCH_SOURCE}/blob/main/paper/LITERATURE_AUDIT.md`} target="_blank" rel="noopener noreferrer">Read the literature comparison ↗</a></div>
		</section>
	);
}
