import "../../styles/research/ClassificationChart.css";

const categories = [
	{ key: "halted", label: "Halted" },
	{ key: "cycle_detected", label: "Proven cycle" },
	{ key: "step_limit", label: "Step-limited" },
	{ key: "syntactically_invalid", label: "Invalid syntax" },
];

export default function ClassificationChart({ rows, sourceUrl }) {
	return (
		<article className="classification-chart">
			<h3 className="classification-chart__title">Classification by program length</h3>
			<p className="classification-chart__description">Each bar covers all 8ⁿ candidate strings; colors show raw runner classifications, not inferred outcomes.</p>
			<div className="classification-chart__legend">{categories.map((category) => <span className={`classification-chart__legend-item classification-chart__legend-item--${category.key}`} key={category.key}>{category.label}</span>)}</div>
			<div className="classification-chart__rows">{rows.map((row) => (
				<div className="classification-chart__row" key={`${row.run}-${row.length}`}>
					<span className="classification-chart__length">n={row.length}</span>
					<div className="classification-chart__bar" role="img" aria-label={`Length ${row.length}: ${row.halted} halted, ${row.cycle_detected} cycles, ${row.step_limit} step-limited, ${row.syntactically_invalid} invalid`}>
						{categories.map((category) => <span className={`classification-chart__segment classification-chart__segment--${category.key}`} key={category.key} style={{ width: `${100 * row[category.key] / row.evaluated}%` }} title={`${category.label}: ${row[category.key].toLocaleString()}`} />)}
					</div>
					<span className="classification-chart__total">{row.evaluated.toLocaleString()}</span>
				</div>
			))}</div>
			<details className="classification-chart__data"><summary className="classification-chart__data-toggle">View classification counts</summary><div className="classification-chart__table-wrap"><table className="classification-chart__table"><thead className="classification-chart__table-head"><tr className="classification-chart__table-row"><th className="classification-chart__table-cell">n</th>{categories.map((category) => <th className="classification-chart__table-cell" key={category.key}>{category.label}</th>)}</tr></thead><tbody className="classification-chart__table-body">{rows.map((row) => <tr className="classification-chart__table-row" key={`${row.run}-${row.length}`}><th className="classification-chart__table-cell">{row.length}</th>{categories.map((category) => <td className="classification-chart__table-cell" key={category.key}>{row[category.key].toLocaleString()}</td>)}</tr>)}</tbody></table></div></details>
			<a className="classification-chart__source" href={sourceUrl} target="_blank" rel="noopener noreferrer">Underlying summary data ↗</a>
		</article>
	);
}
