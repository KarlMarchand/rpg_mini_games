import { useEffect, useState, useCallback } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import TerminalLayout from "./components/TerminalLayout";
import IntroScreen from "./pages/IntroScreen";
import HackingScreen from "./pages/HackingScreen";
import FileExplorer from "./pages/FileExplorer";
import FailureScreen from "./pages/FailureScreen";
import { GameResult, FilesDetails } from "./types/hacking";
import { ipcRenderer } from "electron";

const App: React.FC = () => {
	const navigate = useNavigate();
	// TODO: Don't forget to switch it back to Unresolved
	const [gameResult, setGameResult] = useState<GameResult>(GameResult.Win);
	const [files, setFiles] = useState<FilesDetails[]>([]);

	// A game's result is managed at this level to redirect if necessary
	useEffect(() => {
		if (gameResult !== GameResult.Unresolved) {
			navigate("/content");
		}
	}, [gameResult]);

	// Asynchronously get file explorer data
	const getFiles = useCallback(() => {
		ipcRenderer.invoke("get-file-tree").then((result: FilesDetails[]) => {
			setFiles([...result]);
		});
	}, []);

	useEffect(() => {
		getFiles();
	}, []);

	return (
		<Routes>
			<Route path="/*" element={<TerminalLayout />}>
				<Route path="game" element={<HackingScreen onResult={setGameResult} />} />
				<Route
					path="content"
					element={gameResult === GameResult.Win ? <FileExplorer files={files} /> : <FailureScreen />}
				/>
				<Route path="" element={<IntroScreen />} />
			</Route>
		</Routes>
	);
};

export default App;
