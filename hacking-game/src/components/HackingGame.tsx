import { GameResult } from "../App";
import { Link } from "react-router-dom";

const HackingGame: React.FC<{ onResult: (result: GameResult) => void }> = ({ onResult }) => {
	return (
		<div>
			HackingGame
			<p>
				<Link to="/files">files</Link>
			</p>
			<p>{/* <Link to="/failure">failure</Link> */}</p>
		</div>
	);
};

export default HackingGame;
