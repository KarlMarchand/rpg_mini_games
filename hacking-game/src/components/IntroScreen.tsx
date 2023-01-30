import { Link, Navigate } from "react-router-dom";

const IntroScreen = () => {
	return (
		<div>
			introScreen
			<p>
				<Navigate to="game" />
				<Link to="game">game</Link>
			</p>
		</div>
	);
};

export default IntroScreen;
