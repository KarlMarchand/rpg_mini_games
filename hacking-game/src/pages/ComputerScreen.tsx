import { useState, useCallback, useEffect } from "react";
import { SlFolderAlt } from "react-icons/sl";
import { ipcRenderer } from "electron";
import { FilesDetails } from "../types/hacking";
import ComputerHomeScreen from "../components/ComputerHomeScreen";
import FileExplorerItem from "../components/FileExplorerItem";
import EmpireLogo from "../assets/empire.svg";

const ComputerScreen: React.FC = () => {
	const [files, setFiles] = useState<FilesDetails[]>([]);
	const [showHomeScreen, setShowHomeScreen] = useState<boolean>(true);
	const [currentDirectory, setCurrentDirectory] = useState<FilesDetails[]>([]);
	const [parentDirectory, setParentDirectory] = useState<FilesDetails[][]>([]);

	// Asynchronously get file explorer data
	const getFiles = useCallback(() => {
		ipcRenderer.invoke("get-file-tree").then((result: FilesDetails[]) => {
			setFiles([...result]);
		});
	}, []);

	useEffect(() => {
		getFiles();
	}, []);

	const sortFiles = useCallback<(filesList: FilesDetails[]) => FilesDetails[]>(
		(filesList) => {
			const sortedFiles = filesList.sort((a, b) => {
				if (a.isDirectory === b.isDirectory) return 0;
				return a.isDirectory ? -1 : 1;
			});
			return sortedFiles;
		},
		[files]
	);

	const openFile = useCallback(
		(file: FilesDetails) => {
			if (file.isDirectory) {
				setParentDirectory((current) => [...current, currentDirectory]);
				setCurrentDirectory(file.children as FilesDetails[]);
			} else {
				ipcRenderer.invoke("open-file", file.path);
			}
		},
		[currentDirectory]
	);

	useEffect(() => {
		setCurrentDirectory(files);
		setParentDirectory([files]);
	}, [files]);

	const changeScreen = useCallback(() => {
		setTimeout(() => {
			setShowHomeScreen(false);
		}, 5000);
	}, []);

	return (
		<>
			{showHomeScreen && <ComputerHomeScreen onFinish={changeScreen} />}
			{!showHomeScreen && (
				<>
					<h1 style={{ display: "flex", justifyContent: "space-between" }}>
						<span className="aurebesh">Files Explorer</span>
						<img src={EmpireLogo} className="empire-logo mini" />
					</h1>
					<div className="files-explorer">
						{currentDirectory !== files && currentDirectory.length > 0 && (
							<p
								onClick={() =>
									setCurrentDirectory(
										parentDirectory.length > 1 ? (parentDirectory.pop() as FilesDetails[]) : files
									)
								}
							>
								<SlFolderAlt />
								<span>parent..</span>
							</p>
						)}
						{sortFiles(currentDirectory).map((file) => (
							<FileExplorerItem key={file.name} file={file} openFile={openFile} />
						))}
					</div>
				</>
			)}
		</>
	);
};

export default ComputerScreen;
