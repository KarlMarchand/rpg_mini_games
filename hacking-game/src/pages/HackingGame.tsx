import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { GameResult } from "../App";
import Instructions from "@/components/Instructions";
import PromptSkillBonus from "@/components/PromptSkillBonus";

const HackingGame: React.FC<{ onResult: (result: GameResult) => void }> = ({ onResult }) => {
	const [skillBonus, setSkillBonus] = useState<number | null>(null);
	const [showInstructions, setShowInstructions] = useState<boolean>(true);
	const [result, setResult] = useState(GameResult.Unresolved);
	const [tries, setTries] = useState(0);
	const charSet = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
	const passLength = 5;
	const symbol = "\u2B24";

	useEffect(() => {
		if (skillBonus) {
			setTries(skillBonus + 3);
		}
	}, [skillBonus]);

	useEffect(() => {
		onResult(result);
	}, [result]);

	return (
		<>
			{skillBonus == null && <PromptSkillBonus setSkill={setSkillBonus} />}
			{skillBonus != null && showInstructions && (
				<Instructions
					tries={tries.toString()}
					charSet={charSet.toString()}
					passLength={passLength.toString()}
					symbol={symbol}
					onClose={() => setShowInstructions(false)}
				/>
			)}
			{skillBonus && !showInstructions && (
				<div>
					<p>
						<Link to="/files">files</Link>
					</p>
					<p>{/* <Link to="/failure">failure</Link> */}</p>
				</div>
			)}
		</>
	);
};

export default HackingGame;
