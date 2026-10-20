import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createMachine, parseHexInput, runMachine, stepMachine } from "./brainfuckMachine.js";

const fixtures = JSON.parse(readFileSync(new URL("../../data/research/semantics.json", import.meta.url), "utf8"));

test("browser interpreter matches the Python research interpreter's shared fixtures", () => {
	assert.equal(fixtures.semantics_id, "legacy-u8-right-v1");
	for (const { name, program, max_steps, input_bytes, expected } of fixtures.cases) {
		const result = runMachine(program, { maxSteps: max_steps, inputBytes: input_bytes });
		for (const [key, value] of Object.entries({
			status: result.status,
			steps: result.steps,
			ip: result.ip,
			pointer: result.pointer,
			tape: result.tape,
			output_bytes: result.outputBytes,
			input_pos: result.inputPos,
			cycle_start: result.cycleStart,
			cycle_period: result.cyclePeriod,
		})) {
			if (Object.hasOwn(expected, key)) assert.deepEqual(value, expected[key], `${name}: ${key}`);
		}
	}
});

test("stepping exposes state and halts at the exact cutoff", () => {
	const first = createMachine("+[+]", { maxSteps: 511 });
	const afterOne = stepMachine(first);
	assert.equal(first.steps, 0);
	assert.equal(afterOne.steps, 1);
	assert.equal(afterOne.tape[0], 1);
	assert.equal(runMachine("+[+]", { maxSteps: 511 }).status, "step_limit");
	assert.equal(runMachine("+[+]", { maxSteps: 512 }).status, "halted");
});

test("browser resource caps stop execution before an over-budget operation", () => {
	const result = runMachine(">>>", { limits: { maxTapeCells: 2 } });
	assert.equal(result.status, "resource_limit");
	assert.equal(result.resourceReason, "tape_cells");
	assert.equal(result.steps, 1);
});

test("input parser accepts bytes and rejects malformed input", () => {
	assert.deepEqual(parseHexInput("ff 41").bytes, [255, 65]);
	assert.match(parseHexInput("f").error, /even number/);
});
