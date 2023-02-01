import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import TerminalLayout from "./components/TerminalLayout";
import IntroScreen from "./pages/IntroScreen";
import HackingScreen from "./pages/HackingScreen";
import FileExplorer from "./pages/FileExplorer";
import FailureScreen from "./pages/FailureScreen";
import { GameResult } from "./types/hacking";

const App: React.FC = () => {
	const navigate = useNavigate();
	const [gameResult, setGameResult] = useState<GameResult>(GameResult.Unresolved);

	useEffect(() => {
		if (gameResult !== GameResult.Unresolved) {
			navigate("/files");
		}
	}, [gameResult]);

	return (
		<Routes>
			<Route path="/*" element={<TerminalLayout />}>
				<Route path="game" element={<HackingScreen onResult={setGameResult} />} />
				<Route path="files" element={gameResult === GameResult.Win ? <FileExplorer /> : <FailureScreen />} />
				<Route path="" element={<IntroScreen />} />
			</Route>
		</Routes>
	);
};

export default App;
