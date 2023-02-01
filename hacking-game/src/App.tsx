import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import TerminalLayout from "./components/TerminalLayout";
import IntroScreen from "./pages/IntroScreen";
import HackingGame from "./pages/HackingGame";
import FileExplorer from "./pages/FileExplorer";
import FailureScreen from "./pages/FailureScreen";

export enum GameResult {
	Unresolved = 0,
	Win = 1,
	Lose = 2,
}

const App: React.FC = () => {
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
};

export default App;
