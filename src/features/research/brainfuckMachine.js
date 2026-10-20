// Browser limits protect the interface; they do not redefine the research model.
export const BROWSER_LIMITS = Object.freeze({
	maxProgramLength: 128,
	maxSteps: 4096,
	maxTapeCells: 128,
	maxOutputBytes: 1024,
	maxSeenStates: 8192,
	maxStateBytes: 1_048_576,
});

const COMMANDS = new Set("><+-.,[]");

function parseProgram(program) {
	if (typeof program !== "string") return { error: "Program must be text." };
	const brackets = new Map();
	const stack = [];
	for (let index = 0; index < program.length; index += 1) {
		const command = program[index];
		if (!COMMANDS.has(command)) return { error: `Non-command character at position ${index}.` };
		if (command === "[") stack.push(index);
		if (command === "]") {
			if (stack.length === 0) return { error: `Unmatched ] at position ${index}.` };
			const opening = stack.pop();
			brackets.set(opening, index);
			brackets.set(index, opening);
		}
	}
	if (stack.length > 0) return { error: `Unmatched [ at position ${stack.at(-1)}.` };
	return { brackets };
}

function statusAfterInstruction(machine) {
	if (machine.ip >= machine.program.length) return "halted";
	if (machine.steps >= machine.maxSteps) return "step_limit";
	return "ready";
}

export function parseHexInput(value) {
	const compact = value.replace(/\s+/g, "");
	if (compact.length % 2 !== 0 || !/^[\da-f]*$/i.test(compact)) {
		return { error: "Enter an even number of hexadecimal digits (for example, FF41)." };
	}
	if (compact.length > 256) return { error: "Input is limited to 128 bytes." };
	return { bytes: compact.match(/.{2}/g)?.map((pair) => Number.parseInt(pair, 16)) ?? [] };
}

export function createMachine(program, options = {}) {
	const maxSteps = options.maxSteps ?? BROWSER_LIMITS.maxSteps;
	const inputBytes = options.inputBytes ?? [];
	const limits = { ...BROWSER_LIMITS, ...options.limits };
	const syntax = parseProgram(program);
	let error = syntax.error ?? null;
	if (!error && program.length > limits.maxProgramLength) error = `Program length exceeds ${limits.maxProgramLength} commands.`;
	if (!error && (!Number.isInteger(maxSteps) || maxSteps < 0 || maxSteps > limits.maxSteps)) error = "Invalid step budget.";
	if (!error && (!Array.isArray(inputBytes) || inputBytes.length > 128 || inputBytes.some((byte) => !Number.isInteger(byte) || byte < 0 || byte > 255))) error = "Input must contain at most 128 bytes.";
	return {
		program,
		brackets: syntax.brackets ?? new Map(),
		inputBytes: error ? [] : inputBytes,
		maxSteps,
		limits,
		ip: 0,
		pointer: 0,
		tape: [0],
		inputPos: 0,
		outputBytes: [],
		steps: 0,
		seen: new Map(),
		stateBytes: 0,
		status: error ? "syntactically_invalid" : program.length === 0 ? "halted" : maxSteps === 0 ? "step_limit" : "ready",
		error,
		resourceReason: null,
		cycleStart: null,
		cyclePeriod: null,
	};
}

export function stepMachine(machine) {
	if (machine.status !== "ready") return machine;
	const next = { ...machine, tape: [...machine.tape], outputBytes: [...machine.outputBytes], seen: new Map(machine.seen) };
	const trackStates = next.brackets.size > 0;
	const key = trackStates ? JSON.stringify([next.ip, next.pointer, next.tape, next.inputPos]) : null;
	if (trackStates && next.seen.has(key)) {
		next.status = "cycle_detected";
		next.cycleStart = next.seen.get(key);
		next.cyclePeriod = next.steps - next.cycleStart;
		return next;
	}
	const command = next.program[next.ip];
	if (command === ">" && next.pointer + 1 === next.tape.length && next.tape.length >= next.limits.maxTapeCells) next.resourceReason = "tape_cells";
	else if (command === "." && next.outputBytes.length >= next.limits.maxOutputBytes) next.resourceReason = "output_bytes";
	else if (trackStates && next.seen.size >= next.limits.maxSeenStates) next.resourceReason = "seen_states";
	else if (trackStates && next.stateBytes + next.tape.length > next.limits.maxStateBytes) next.resourceReason = "state_bytes";
	if (next.resourceReason) {
		next.status = "resource_limit";
		return next;
	}
	if (trackStates) {
		next.seen.set(key, next.steps);
		next.stateBytes += next.tape.length;
	}
	if (command === ">") {
		next.pointer += 1;
		if (next.pointer === next.tape.length) next.tape.push(0);
	} else if (command === "<") next.pointer = Math.max(0, next.pointer - 1);
	else if (command === "+") next.tape[next.pointer] = (next.tape[next.pointer] + 1) % 256;
	else if (command === "-") next.tape[next.pointer] = (next.tape[next.pointer] + 255) % 256;
	else if (command === ".") next.outputBytes.push(next.tape[next.pointer]);
	else if (command === ",") {
		if (next.inputPos < next.inputBytes.length) {
			next.tape[next.pointer] = next.inputBytes[next.inputPos];
			next.inputPos += 1;
		} else next.tape[next.pointer] = 0;
	} else if (command === "[" && next.tape[next.pointer] === 0) next.ip = next.brackets.get(next.ip);
	else if (command === "]" && next.tape[next.pointer] !== 0) next.ip = next.brackets.get(next.ip);
	next.ip += 1;
	next.steps += 1;
	next.status = statusAfterInstruction(next);
	return next;
}

export function runMachine(program, options = {}) {
	let machine = createMachine(program, options);
	while (machine.status === "ready") machine = stepMachine(machine);
	return machine;
}
