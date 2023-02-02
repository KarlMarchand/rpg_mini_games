import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import TerminalLayout from "./components/TerminalLayout";
import IntroScreen from "./pages/IntroScreen";
import HackingScreen from "./pages/HackingScreen";
import FileExplorer from "./pages/FileExplorer";
import FailureScreen from "./pages/FailureScreen";
import { GameResult } from "./types/hacking";
import { ipcRenderer } from "electron";

const App: React.FC = () => {
	const navigate = useNavigate();
	const [gameResult, setGameResult] = useState<GameResult>(GameResult.Unresolved);
	const [files, setFiles] = useState<File[]>([]);

	// A game's result is managed at this level to redirect if necessary
	useEffect(() => {
		if (gameResult !== GameResult.Unresolved) {
			navigate("/files");
		}
	}, [gameResult]);

	useEffect(() => {
		// Asynchronously get file explorer data
		(async () => {
			const response: File[] = await ipcRenderer.invoke("get-file-tree");
			setFiles(response);
			response.map((file) => console.log(file));
		})();
	}, []);

	return (
		<Routes>
			<Route path="/*" element={<TerminalLayout />}>
				<Route path="game" element={<HackingScreen onResult={setGameResult} />} />
				<Route
					path="files"
					element={gameResult === GameResult.Win ? <FileExplorer files={files} /> : <FailureScreen />}
				/>
				<Route path="" element={<IntroScreen />} />
			</Route>
		</Routes>
	);
};

export default App;
