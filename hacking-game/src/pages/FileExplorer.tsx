import { useState } from "react";
import { FilesDetails } from "@/types/hacking";
import ComputerHomeScreen from "@/components/ComputerHomeScreen";

const FileExplorer: React.FC<{ files: FilesDetails[] }> = ({ files }) => {
	const [showHomeScreen, setShowHomeScreen] = useState<boolean>(true);

	const changeScreen = () => {
		setTimeout(() => {
			setShowHomeScreen(false);
		}, 5000);
	};

	return (
		<>
			{showHomeScreen && <ComputerHomeScreen onFinish={changeScreen} />}
			{!showHomeScreen && (
				<>
					<h1>Files Explorer</h1>
					<div className="files-explorer">
						{files.map((file) => (
							<p key={file.name}>{file.name}</p>
						))}
					</div>
				</>
			)}
		</>
	);
};

export default FileExplorer;
