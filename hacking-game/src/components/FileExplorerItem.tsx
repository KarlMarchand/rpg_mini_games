import { FilesDetails } from "../types/hacking";
import { SlFolder, SlDoc } from "react-icons/sl";

type Props = {
	file: FilesDetails;
	openFile: (file: FilesDetails) => void;
};

const FileExplorerItem: React.FC<Props> = ({ file, openFile }) => {
	return (
		<p onClick={() => openFile(file)}>
			{file.isDirectory ? <SlFolder /> : <SlDoc />}
			<span>{file.name}</span>
		</p>
	);
};

export default FileExplorerItem;
