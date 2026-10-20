import summaries from "./summary.json";
import witnesses from "./witnesses.json";
import runtimeOutputCsv from "./runtime-output.csv?raw";

export const RESEARCH_SOURCE = "https://github.com/jahphetB/BrainF_busy_beaver-simulator";
export const RESEARCH_COMMIT = "ac2d7aac21fb49218764cc8022e03b504b947735";
export const RESEARCH_PAPER = "/research/brainfuck-productivity.pdf";

export const configurations = [
	{ id: "primary-512", label: "8-bit cells · 512-step cutoff", semantics: "legacy-u8-right-v1", cutoff: 512 },
	{ id: "primary-4096", label: "8-bit cells · 4,096-step cutoff", semantics: "legacy-u8-right-v1", cutoff: 4096 },
	{ id: "cell4-4096", label: "4-bit cells · 4,096-step cutoff", semantics: "u4-right-v1", cutoff: 4096 },
];

function belongsToConfiguration(row, configurationId) {
	if (configurationId === "primary-512") {
		return row.run === "primary-n1-5-s512" || row.run === "primary-n6-s512";
	}
	if (configurationId === "primary-4096") return row.run === "steps4096-n4-6";
	return row.run === "cell4-n4-6-s4096";
}

export function getSummaryRows(configurationId) {
	return summaries.filter((row) => belongsToConfiguration(row, configurationId));
}

const [runtimeHeader, ...runtimeLines] = runtimeOutputCsv.trim().split(/\r?\n/);
const runtimeKeys = runtimeHeader.split(",");
export const runtimeOutputRows = runtimeLines.map((line) => {
	const values = line.split(",");
	return Object.fromEntries(runtimeKeys.map((key, index) => [
		key,
		key === "run" ? values[index] : Number(values[index]),
	]));
});

export function getRuntimeOutputRows(configurationId) {
	return runtimeOutputRows.filter((row) => belongsToConfiguration(row, configurationId));
}

export function getRecordPrograms(configurationId) {
	const programs = witnesses
		.filter((entry) => belongsToConfiguration(entry, configurationId))
		.filter((entry) => entry.metrics.some((metric) => metric === "T" || metric === "O"))
		.map((entry) => ({
			program: entry.record.program,
			length: entry.record.metrics.program_length,
			steps: entry.record.steps,
			output: entry.record.metrics.output_bytes,
			metrics: entry.metrics,
		}));
	return [...new Map(programs.map((item) => [item.program, item])).values()];
}
