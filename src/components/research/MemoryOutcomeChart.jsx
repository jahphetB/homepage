import "../../styles/research/MemoryOutcomeChart.css";

export default function MemoryOutcomeChart({ rows, sourceUrl }) {
	const maxMemory = Math.max(1, ...rows.map((row) => row.M));
	const maxOutcomes = Math.max(1, ...rows.map((row) => row.D));
	return (
		<article className="memory-chart">
			<h3 className="memory-chart__title">Memory and outcome equivalence</h3>
			<p className="memory-chart__description">Memory is the maximum allocated tape cells among observed halted programs. A distinct outcome includes emitted bytes, final pointer, and every allocated cell—even trailing zeros.</p>
			<div className="memory-chart__legend"><span className="memory-chart__legend-item memory-chart__legend-item--cells">Max visited cells</span><span className="memory-chart__legend-item memory-chart__legend-item--outcomes">Distinct halted outcomes</span></div>
			<div className="memory-chart__rows">{rows.map((row) => (
				<div className="memory-chart__row" key={`${row.run}-${row.length}`}>
					<span className="memory-chart__length">n={row.length}</span>
					<div className="memory-chart__measures">
						<div className="memory-chart__track" title={`${row.M} maximum visited cells`}><span className="memory-chart__bar memory-chart__bar--cells" style={{ width: `${100 * row.M / maxMemory}%` }} /></div>
						<div className="memory-chart__track" title={`${row.D} distinct halted outcomes`}><span className="memory-chart__bar memory-chart__bar--outcomes" style={{ width: `${100 * row.D / maxOutcomes}%` }} /></div>
					</div>
					<span className="memory-chart__values">{row.M} cells · {row.D.toLocaleString()} outcomes</span>
				</div>
			))}</div>
			<p className="memory-chart__qualification">The bars use separate scales. Halted programs per outcome range from {rows.length ? (rows[0].halted / rows[0].D).toFixed(2) : "—"} at the first shown length to {rows.length ? (rows.at(-1).halted / rows.at(-1).D).toFixed(2) : "—"} at the last. This aggregate ratio does not imply equal group sizes. Unresolved programs can change the observed totals.</p>
			<a className="memory-chart__source" href={sourceUrl} target="_blank" rel="noopener noreferrer">Underlying summary data ↗</a>
		</article>
	);
}
