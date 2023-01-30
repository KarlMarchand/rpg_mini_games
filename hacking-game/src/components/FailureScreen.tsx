import { useCallback } from "react";

const FailureScreen = () => {
	const handleCloseApp = useCallback(() => {
		window.close();
	}, []);

	return (
		<>
			<h1>
				<span className="errorcode">ERROR CODE: 0x80070057</span>
			</h1>
			<p>Password decryption failed. System lock-out initiated.</p>
			<button onClick={handleCloseApp}>Exit Program</button>
		</>
	);
};

export default FailureScreen;
