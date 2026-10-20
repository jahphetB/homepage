import { useEffect, useMemo, useState } from "react";
import { getRecordPrograms, RESEARCH_SOURCE } from "../../data/research/researchData";
import { BROWSER_LIMITS, createMachine, parseHexInput, stepMachine } from "../../features/research/brainfuckMachine";
import "../../styles/research/BrainfuckSimulator.css";

const examples = [
	{ program: "++[>+<-]", label: "Transfer two values across the tape" },
	{ program: ",.,.", label: "Read and echo two input bytes" },
	{ program: "+[.]", label: "Output-producing proven cycle" },
	...getRecordPrograms("primary-4096").map((item) => ({ program: item.program, label: `Record witness: ${item.program}` })),
];
const uniqueExamples = [...new Map(examples.map((item) => [item.program, item])).values()];
const speeds = [
	{ steps: 1, label: "1 step / tick" },
	{ steps: 5, label: "5 steps / tick" },
	{ steps: 25, label: "25 steps / tick" },
	{ steps: 100, label: "100 steps / tick" },
];
const statusLabels = {
	ready: "Ready",
	halted: "Halted",
	cycle_detected: "Proven cycle",
	step_limit: "Step limit — unresolved",
	resource_limit: "Resource limit — unresolved",
	syntactically_invalid: "Invalid program",
};

export default function BrainfuckSimulator({ selectedProgram }) {
	const [program, setProgram] = useState("+[+..]");
	const [inputHex, setInputHex] = useState("");
	const [stepBudget, setStepBudget] = useState(4096);
	const [speed, setSpeed] = useState(5);
	const [machine, setMachine] = useState(() => createMachine("+[+..]"));
	const [inputError, setInputError] = useState("");
	const [playing, setPlaying] = useState(false);
	const input = useMemo(() => parseHexInput(inputHex), [inputHex]);

	useEffect(() => {
		if (selectedProgram === null) return;
		setPlaying(false);
		setProgram(selectedProgram);
		setMachine(createMachine(selectedProgram, { maxSteps: stepBudget, inputBytes: input.bytes ?? [] }));
	}, [selectedProgram]);

	useEffect(() => {
		if (!playing || machine.status !== "ready") return undefined;
		const timer = window.setInterval(() => {
			setMachine((current) => {
				let next = current;
				for (let index = 0; index < speed && next.status === "ready"; index += 1) next = stepMachine(next);
				return next;
			});
		}, 120);
		return () => window.clearInterval(timer);
	}, [playing, speed, machine.status]);

	useEffect(() => {
		if (machine.status !== "ready") setPlaying(false);
	}, [machine.status]);

	function reset(nextProgram = program, nextInput = inputHex, nextBudget = stepBudget) {
		setPlaying(false);
		const parsed = parseHexInput(nextInput);
		if (parsed.error) {
			setInputError(parsed.error);
			return;
		}
		setInputError("");
		setMachine(createMachine(nextProgram, { maxSteps: nextBudget, inputBytes: parsed.bytes }));
	}

	function updateProgram(nextProgram) {
		setProgram(nextProgram);
		reset(nextProgram);
	}

	const outputHex = machine.outputBytes.map((byte) => byte.toString(16).padStart(2, "0").toUpperCase()).join(" ");
	const outputText = machine.outputBytes.map((byte) => byte >= 32 && byte <= 126 ? String.fromCharCode(byte) : "·").join("");
	return (
		<section className="research-simulator" id="research-simulator" aria-labelledby="research-simulator-title">
			<div className="research-simulator__heading"><p className="research-simulator__eyebrow">03 / Program explorer</p><h2 className="research-simulator__title" id="research-simulator-title">Run the model, one instruction at a time</h2><p className="research-simulator__lead">This browser interpreter follows the documented 8-bit research semantics. It uses stricter interface caps to stay responsive; a resource stop is not a mathematical conclusion.</p></div>
			<div className="research-simulator__workspace">
				<div className="research-simulator__editor">
					<label className="research-simulator__label" htmlFor="research-example">Example or published record</label>
					<select className="research-simulator__select" id="research-example" value={uniqueExamples.some((item) => item.program === program) ? program : ""} onChange={(event) => updateProgram(event.target.value)}><option className="research-simulator__option" value="">Custom program</option>{uniqueExamples.map((item) => <option className="research-simulator__option" key={item.program} value={item.program}>{item.label}</option>)}</select>
					<label className="research-simulator__label" htmlFor="research-code">Brainfuck source · commands only</label>
					<textarea className="research-simulator__textarea" id="research-code" value={program} onChange={(event) => updateProgram(event.target.value)} spellCheck="false" rows="4" maxLength={BROWSER_LIMITS.maxProgramLength + 1} />
					<label className="research-simulator__label" htmlFor="research-input">Input bytes in hexadecimal (optional)</label>
					<input className="research-simulator__input" id="research-input" value={inputHex} onChange={(event) => { setInputHex(event.target.value); reset(program, event.target.value); }} placeholder="FF41" spellCheck="false" />
					{inputError && <p className="research-simulator__error" role="alert">{inputError}</p>}
					<div className="research-simulator__settings"><label className="research-simulator__setting-label" htmlFor="research-budget">Step budget</label><select className="research-simulator__setting" id="research-budget" value={stepBudget} onChange={(event) => { const next = Number(event.target.value); setStepBudget(next); reset(program, inputHex, next); }}><option className="research-simulator__option" value="128">128</option><option className="research-simulator__option" value="512">512</option><option className="research-simulator__option" value="4096">4,096</option></select><label className="research-simulator__setting-label" htmlFor="research-speed">Playback speed</label><select className="research-simulator__setting" id="research-speed" value={speed} onChange={(event) => setSpeed(Number(event.target.value))}>{speeds.map((item) => <option className="research-simulator__option" key={item.steps} value={item.steps}>{item.label}</option>)}</select></div>
					<div className="research-simulator__controls"><button className="research-simulator__button research-simulator__button--primary" type="button" onClick={() => setMachine((current) => stepMachine(current))} disabled={machine.status !== "ready" || !!inputError}>Step</button><button className="research-simulator__button" type="button" onClick={() => setPlaying((current) => !current)} disabled={machine.status !== "ready" || !!inputError}>{playing ? "Pause" : "Play"}</button><button className="research-simulator__button" type="button" onClick={() => reset()}>Reset</button></div>
					<p className="research-simulator__limits">Limits: {BROWSER_LIMITS.maxProgramLength} commands · {BROWSER_LIMITS.maxSteps.toLocaleString()} steps · {BROWSER_LIMITS.maxTapeCells} cells · {BROWSER_LIMITS.maxOutputBytes.toLocaleString()} output bytes.</p>
				</div>
				<div className="research-simulator__inspection">
					<div className="research-simulator__status-row"><span className={`research-simulator__status research-simulator__status--${machine.status}`}>{statusLabels[machine.status]}</span><span className="research-simulator__status-detail" aria-live="polite">{machine.error ?? (machine.resourceReason ? `Stopped at ${machine.resourceReason} cap.` : machine.cyclePeriod ? `Repeated state; period ${machine.cyclePeriod} steps.` : "")}</span></div>
					<div className="research-simulator__metrics"><div className="research-simulator__metric"><strong className="research-simulator__metric-value">{machine.steps}</strong><span className="research-simulator__metric-label">executed steps</span></div><div className="research-simulator__metric"><strong className="research-simulator__metric-value">{machine.ip}</strong><span className="research-simulator__metric-label">instruction pointer</span></div><div className="research-simulator__metric"><strong className="research-simulator__metric-value">{machine.tape.length}</strong><span className="research-simulator__metric-label">visited cells</span></div><div className="research-simulator__metric"><strong className="research-simulator__metric-value">{machine.outputBytes.length}</strong><span className="research-simulator__metric-label">output bytes</span></div></div>
					<div className="research-simulator__panel"><h3 className="research-simulator__panel-title">Instruction pointer</h3><div className="research-simulator__instructions" aria-label={`Next instruction at position ${machine.ip}`}><span className="research-simulator__index-label">index</span>{machine.program.split("").map((command, index) => <span className={`research-simulator__instruction ${machine.ip === index && machine.status === "ready" ? "research-simulator__instruction--current" : ""}`} key={index} title={`Instruction ${index}: ${command}`}><span className="research-simulator__instruction-index">{index}</span><span className="research-simulator__instruction-command">{command}</span></span>)}</div></div>
					<div className="research-simulator__panel"><h3 className="research-simulator__panel-title">Memory tape · pointer at cell {machine.pointer}</h3><div className="research-simulator__tape" aria-label="Memory cell values">{machine.tape.map((value, index) => <div className={`research-simulator__cell ${index === machine.pointer ? "research-simulator__cell--active" : ""}`} key={index}><span className="research-simulator__cell-index">{index}</span><strong className="research-simulator__cell-value">{value}</strong></div>)}</div></div>
					<div className="research-simulator__panel"><h3 className="research-simulator__panel-title">Output</h3><p className="research-simulator__output-label">Bytes (hex)</p><output className="research-simulator__output">{outputHex || "No output yet"}</output><p className="research-simulator__output-label">Printable ASCII preview · nonprintable bytes shown as ·</p><output className="research-simulator__output">{outputText || "No output yet"}</output></div>
				</div>
			</div>
			<a className="research-simulator__semantics-link" href={`${RESEARCH_SOURCE}/blob/main/docs/SEMANTICS.md`} target="_blank" rel="noopener noreferrer">Compare with the documented Python interpreter ↗</a>
		</section>
	);
}
