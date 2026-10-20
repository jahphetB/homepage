import { useState } from "react";
import "../../styles/research/MetricChart.css";

const WIDTH = 560;
const HEIGHT = 260;
const PADDING = { left: 52, right: 22, top: 24, bottom: 42 };

export default function MetricChart({ title, rows, metric, unit, sourceUrl }) {
	const [focused, setFocused] = useState(null);
	const values = rows.map((row) => row[metric]);
	const maxValue = Math.max(1, ...values);
	const useLog = maxValue > 100;
	const vertical = (value) => useLog ? Math.log10(value + 1) / Math.log10(maxValue + 1) : value / maxValue;
	const x = (index) => PADDING.left + (rows.length === 1 ? (WIDTH - PADDING.left - PADDING.right) / 2 : index * (WIDTH - PADDING.left - PADDING.right) / (rows.length - 1));
	const y = (value) => HEIGHT - PADDING.bottom - vertical(value) * (HEIGHT - PADDING.top - PADDING.bottom);
	const path = rows.map((row, index) => `${index === 0 ? "M" : "L"}${x(index)},${y(row[metric])}`).join(" ");
	return (
		<article className="metric-chart">
			<div className="metric-chart__heading"><h3 className="metric-chart__title">{title}</h3><span className="metric-chart__scale">{useLog ? "log₁₀(value + 1)" : "linear"} scale</span></div>
			<svg className="metric-chart__svg" viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label={`${title} by program length`}>
				<line className="metric-chart__axis" x1={PADDING.left} y1={HEIGHT - PADDING.bottom} x2={WIDTH - PADDING.right} y2={HEIGHT - PADDING.bottom} />
				<line className="metric-chart__axis" x1={PADDING.left} y1={PADDING.top} x2={PADDING.left} y2={HEIGHT - PADDING.bottom} />
				<path className="metric-chart__line" d={path} />
				{rows.map((row, index) => (
					<g className="metric-chart__point-group" key={`${row.run}-${row.length}`} onMouseEnter={() => setFocused(row)} onMouseLeave={() => setFocused(null)}>
						<circle className={`metric-chart__point ${row.fully_resolved ? "metric-chart__point--resolved" : "metric-chart__point--bounded"}`} cx={x(index)} cy={y(row[metric])} r="7" tabIndex="0" onFocus={() => setFocused(row)} onBlur={() => setFocused(null)}>
							<title>{`Length ${row.length}: ${row[metric]} ${unit}. ${row.fully_resolved ? "Fully resolved run" : `${row.U} runner-unresolved cases; observed lower bound`}. Witness: ${row[metric === "T" ? "T_program" : "O_program"]}`}</title>
						</circle>
						<text className="metric-chart__tick" x={x(index)} y={HEIGHT - 14} textAnchor="middle">{row.length}</text>
					</g>
				))}
				<text className="metric-chart__axis-label" x={WIDTH / 2} y={HEIGHT - 1} textAnchor="middle">program length</text>
			</svg>
			<p className="metric-chart__detail" aria-live="polite">{focused ? `n=${focused.length}: ${focused[metric].toLocaleString()} ${unit} · witness ${focused[metric === "T" ? "T_program" : "O_program"]} · ${focused.fully_resolved ? "fully resolved" : `at least this much; ${focused.U} unresolved`}` : "Focus or hover a point for its witness and evidence status."}</p>
			<div className="metric-chart__legend"><span className="metric-chart__legend-item metric-chart__legend-item--resolved">Fully resolved</span><span className="metric-chart__legend-item metric-chart__legend-item--bounded">Observed lower bound</span></div>
			<details className="metric-chart__data"><summary className="metric-chart__data-toggle">View values as a table</summary><table className="metric-chart__table"><thead className="metric-chart__table-head"><tr className="metric-chart__table-row"><th className="metric-chart__table-cell">Length</th><th className="metric-chart__table-cell">{unit}</th><th className="metric-chart__table-cell">Unresolved</th><th className="metric-chart__table-cell">Witness</th></tr></thead><tbody className="metric-chart__table-body">{rows.map((row) => <tr className="metric-chart__table-row" key={`${row.run}-${row.length}`}><td className="metric-chart__table-cell">{row.length}</td><td className="metric-chart__table-cell">{row[metric]}</td><td className="metric-chart__table-cell">{row.U}</td><td className="metric-chart__table-cell"><code className="metric-chart__code">{row[metric === "T" ? "T_program" : "O_program"]}</code></td></tr>)}</tbody></table></details>
			<a className="metric-chart__source" href={sourceUrl} target="_blank" rel="noopener noreferrer">Underlying summary data ↗</a>
		</article>
	);
}
