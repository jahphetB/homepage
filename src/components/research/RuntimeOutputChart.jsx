import { useState } from "react";
import "../../styles/research/RuntimeOutputChart.css";

const WIDTH = 560;
const HEIGHT = 260;
const PAD = { left: 50, right: 24, top: 24, bottom: 44 };

export default function RuntimeOutputChart({ rows, sourceUrl }) {
	const [focused, setFocused] = useState(null);
	const maxSteps = Math.max(1, ...rows.map((row) => row.steps));
	const maxOutput = Math.max(1, ...rows.map((row) => row.output_bytes));
	const maxCount = Math.max(1, ...rows.map((row) => row.halted_programs));
	const x = (value) => PAD.left + Math.log10(value + 1) / Math.log10(maxSteps + 1) * (WIDTH - PAD.left - PAD.right);
	const y = (value) => HEIGHT - PAD.bottom - Math.log10(value + 1) / Math.log10(maxOutput + 1) * (HEIGHT - PAD.top - PAD.bottom);
	return (
		<article className="runtime-chart">
			<div className="runtime-chart__heading"><h3 className="runtime-chart__title">Runtime versus output</h3><span className="runtime-chart__scale">log₁₀(value + 1) on both axes</span></div>
			<svg className="runtime-chart__svg" viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label="Aggregated halted-program counts by runtime and output bytes">
				<line className="runtime-chart__axis" x1={PAD.left} y1={HEIGHT - PAD.bottom} x2={WIDTH - PAD.right} y2={HEIGHT - PAD.bottom} />
				<line className="runtime-chart__axis" x1={PAD.left} y1={PAD.top} x2={PAD.left} y2={HEIGHT - PAD.bottom} />
				{rows.map((row) => (
					<circle className={`runtime-chart__point ${row.output_bytes >= 100 ? "runtime-chart__point--productive" : "runtime-chart__point--ordinary"}`} key={`${row.run}-${row.length}-${row.steps}-${row.output_bytes}`} cx={x(row.steps)} cy={y(row.output_bytes)} r={3 + 6 * Math.log10(row.halted_programs + 1) / Math.log10(maxCount + 1)} tabIndex="0" onMouseEnter={() => setFocused(row)} onMouseLeave={() => setFocused(null)} onFocus={() => setFocused(row)} onBlur={() => setFocused(null)}>
						<title>{`Length ${row.length}: ${row.halted_programs} halted programs at ${row.steps} steps and ${row.output_bytes} output bytes.`}</title>
					</circle>
				))}
				<text className="runtime-chart__axis-label" x={WIDTH / 2} y={HEIGHT - 3} textAnchor="middle">executed steps</text>
				<text className="runtime-chart__axis-label" x="15" y={HEIGHT / 2} textAnchor="middle" transform={`rotate(-90 15 ${HEIGHT / 2})`}>output bytes</text>
			</svg>
			<p className="runtime-chart__detail" aria-live="polite">{focused ? `n=${focused.length} · ${focused.steps} steps · ${focused.output_bytes} bytes · ${focused.halted_programs.toLocaleString()} halted program(s)` : "Focus or hover a dot to inspect its aggregated count. Dot size encodes count."}</p>
			<div className="runtime-chart__legend"><span className="runtime-chart__legend-item runtime-chart__legend-item--ordinary">0–99 bytes</span><span className="runtime-chart__legend-item runtime-chart__legend-item--productive">100+ bytes (visual highlight)</span></div>
			<p className="runtime-chart__caveat">Only observed halted programs appear here. Dots aggregate programs sharing the same runtime/output pair; unresolved runs are excluded.</p>
			<a className="runtime-chart__source" href={sourceUrl} target="_blank" rel="noopener noreferrer">Underlying aggregated data ↗</a>
		</article>
	);
}
