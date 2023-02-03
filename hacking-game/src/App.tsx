import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import TerminalLayout from "./components/TerminalLayout";
import IntroScreen from "./pages/IntroScreen";
import HackingScreen from "./pages/HackingScreen";
import ComputerScreen from "./pages/ComputerScreen";
import FailureScreen from "./pages/FailureScreen";
import { GameResult } from "./types/hacking";

const App: React.FC = () => {
	const navigate = useNavigate();
	const [gameResult, setGameResult] = useState<GameResult>(GameResult.Unresolved);

	// A game's result is managed at this level to redirect if necessary
	useEffect(() => {
		if (gameResult !== GameResult.Unresolved) {
			navigate("/content");
		}
	}, [gameResult]);

	return (
		<Routes>
			<Route path="/*" element={<TerminalLayout />}>
				<Route path="game" element={<HackingScreen onResult={setGameResult} />} />
				<Route
					path="content"
					element={gameResult === GameResult.Win ? <ComputerScreen /> : <FailureScreen />}
				/>
				<Route path="" element={<IntroScreen />} />
			</Route>
		</Routes>
	);
};

export default App;
