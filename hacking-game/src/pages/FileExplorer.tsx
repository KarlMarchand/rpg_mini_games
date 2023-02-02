const FileExplorer: React.FC<{ files: File[] }> = ({ files }) => {
	return (
		<>
			<h1>FileExplorer</h1>
			<div className="files-explorer">
				{files.map((file) => (
					<p key={file.name}>{file.name}</p>
				))}
			</div>
		</>
	);
};

export default FileExplorer;
