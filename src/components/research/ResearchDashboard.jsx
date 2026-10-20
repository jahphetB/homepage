import { useState } from "react";
import { configurations, getRecordPrograms, getRuntimeOutputRows, getSummaryRows, RESEARCH_SOURCE } from "../../data/research/researchData";
import MetricChart from "./MetricChart";
import RuntimeOutputChart from "./RuntimeOutputChart";
import ClassificationChart from "./ClassificationChart";
import MemoryOutcomeChart from "./MemoryOutcomeChart";
import "../../styles/research/ResearchDashboard.css";

const SUMMARY_SOURCE = `${RESEARCH_SOURCE}/blob/main/data/analysis/v1/summary.csv`;
const RUNTIME_SOURCE = `${RESEARCH_SOURCE}/blob/main/data/analysis/v1/runtime-output.csv`;

export default function ResearchDashboard({ onExploreProgram }) {
	const [configurationId, setConfigurationId] = useState("primary-4096");
	const [selectedLengths, setSelectedLengths] = useState([1, 2, 3, 4, 5, 6]);
	const configuration = configurations.find((entry) => entry.id === configurationId);
	const available = getSummaryRows(configurationId);
	const rows = available.filter((row) => selectedLengths.includes(row.length));
	const scatterRows = getRuntimeOutputRows(configurationId).filter((row) => selectedLengths.includes(row.length));
	const records = getRecordPrograms(configurationId).filter((entry) => selectedLengths.includes(entry.length));
	function toggleLength(length) {
		setSelectedLengths((current) => current.includes(length) ? current.filter((item) => item !== length) : [...current, length].sort());
	}
	return (
		<section className="research-dashboard" id="research-dashboard" aria-labelledby="research-dashboard-title">
			<div className="research-dashboard__heading"><p className="research-dashboard__eyebrow">02 / Interactive evidence</p><h2 className="research-dashboard__title" id="research-dashboard-title">Data dashboard</h2><p className="research-dashboard__lead">Filter the published census. Every plotted value comes from the versioned research dataset; the plots do not infer unobserved executions.</p></div>
			<div className="research-dashboard__controls">
				<label className="research-dashboard__config-label" htmlFor="research-config">Experiment configuration</label>
				<select className="research-dashboard__config" id="research-config" value={configurationId} onChange={(event) => setConfigurationId(event.target.value)}>{configurations.map((entry) => <option className="research-dashboard__config-option" key={entry.id} value={entry.id}>{entry.label}</option>)}</select>
				<fieldset className="research-dashboard__lengths"><legend className="research-dashboard__lengths-title">Program length</legend>{available.map((row) => <label className="research-dashboard__length-option" key={row.length}><input className="research-dashboard__length-checkbox" type="checkbox" checked={selectedLengths.includes(row.length)} onChange={() => toggleLength(row.length)} /><span className="research-dashboard__length-label">{row.length}</span></label>)}</fieldset>
			</div>
			<p className="research-dashboard__scope" aria-live="polite">{configuration.label} · {rows.length} selected length{rows.length === 1 ? "" : "s"} · {configuration.semantics}. Filled points are fully resolved within the run; outlined points are observed lower bounds where runner-unresolved cases remain.</p>
			{rows.length === 0 ? <p className="research-dashboard__empty">Select at least one length to display the charts.</p> : (
				<>
					<div className="research-dashboard__chart-grid">
						<MetricChart title="Maximum observed halting time" rows={rows} metric="T" unit="executed steps" sourceUrl={SUMMARY_SOURCE} />
						<MetricChart title="Maximum observed output" rows={rows} metric="O" unit="output bytes" sourceUrl={SUMMARY_SOURCE} />
						<RuntimeOutputChart rows={scatterRows} sourceUrl={RUNTIME_SOURCE} />
						<ClassificationChart rows={rows} sourceUrl={SUMMARY_SOURCE} />
					</div>
					<MemoryOutcomeChart rows={rows} sourceUrl={SUMMARY_SOURCE} />
					<div className="research-dashboard__witnesses"><h3 className="research-dashboard__witness-title">Replayed record witnesses</h3><p className="research-dashboard__witness-description">These programs are published witnesses, not unique maximizers. Select one to inspect it in the simulator.</p><div className="research-dashboard__witness-list">{records.map((record) => <button className="research-dashboard__witness" type="button" key={record.program} onClick={() => onExploreProgram(record.program)}><code className="research-dashboard__witness-code">{record.program}</code><span className="research-dashboard__witness-meta">n={record.length} · {record.steps} steps · {record.output} bytes</span></button>)}</div></div>
				</>
			)}
		</section>
	);
}
