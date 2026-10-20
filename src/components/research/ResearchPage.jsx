import { useState } from "react";
import ResearchIntro from "./ResearchIntro";
import ResearchMethodology from "./ResearchMethodology";
import ResearchDashboard from "./ResearchDashboard";
import BrainfuckSimulator from "./BrainfuckSimulator";
import ResearchFindings from "./ResearchFindings";
import ResearchReproducibility from "./ResearchReproducibility";
import "../../styles/research/ResearchPage.css";

export default function ResearchPage() {
	const [selectedProgram, setSelectedProgram] = useState(null);
	const sections = [
		{ id: "research-methodology", label: "Method" },
		{ id: "research-dashboard", label: "Data dashboard" },
		{ id: "research-simulator", label: "Simulator" },
		{ id: "research-findings", label: "Findings" },
		{ id: "research-reproducibility", label: "Reproduce" },
	];
	function exploreProgram(program) {
		setSelectedProgram(program);
		document.getElementById("research-simulator")?.scrollIntoView({ behavior: "smooth" });
	}

	return (
		<div className="research-page">
			<ResearchIntro />
			<nav className="research-page__toc" aria-label="Research page sections">
				{sections.map(({ id, label }) => (
					<button className="research-page__toc-link" type="button" key={id} onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}>{label}</button>
				))}
			</nav>
			<ResearchMethodology />
			<ResearchDashboard onExploreProgram={exploreProgram} />
			<BrainfuckSimulator selectedProgram={selectedProgram} />
			<ResearchFindings />
			<ResearchReproducibility />
		</div>
	);
}
