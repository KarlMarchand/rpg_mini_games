import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import TerminalLayout from "./components/TerminalLayout";
import IntroScreen from "./components/IntroScreen";
import HackingGame from "./components/HackingGame";
import FileExplorer from "./components/FileExplorer";
import FailureScreen from "./components/FailureScreen";

/*SVG inclusion example <img src={EmpireLogo} /> */
// import EmpireLogo from "./assets/empire.svg";

export enum GameResult {
	Unresolved = 0,
	Win = 1,
	Lose = 2,
}

function App() {
	const [gameResult, setGameResult] = useState<GameResult>(GameResult.Unresolved);

	const handleGameResult = (result: GameResult) => {
		setGameResult(result);
	};

	return (
		<Routes>
			<Route path="/*" element={<TerminalLayout />}>
				<Route path="game" element={<HackingGame onResult={handleGameResult} />} />
				<Route path="files" element={gameResult === GameResult.Win ? <FileExplorer /> : <Navigate to="/" />} />
				<Route path="failure" element={<FailureScreen />} />
				<Route path="" element={<IntroScreen />} />
			</Route>
		</Routes>
	);
}

export default App;
