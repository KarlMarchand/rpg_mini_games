import { useState, useEffect, useRef } from "react";
import { GameResult } from "../types/hacking";
import Instructions from "@/components/Instructions";
import PromptSkillBonus from "@/components/PromptSkillBonus";
import PasswordManager from "@/game/passwordManager";
import HackingGame from "@/components/HackingGame";

const HackingScreen: React.FC<{ onResult: (result: GameResult) => void }> = ({ onResult }) => {
	const [skillBonus, setSkillBonus] = useState<number | null>(null);
	const [showInstructions, setShowInstructions] = useState<boolean>(true);
	const [tries, setTries] = useState<number>(0);
	const passwordManager = useRef<PasswordManager>(new PasswordManager());
	const symbol = useRef<string>("\u2B24");

	useEffect(() => {
		if (skillBonus != null) {
			setTries(skillBonus + 5);
		}
	}, [skillBonus]);

	return (
		<>
			{skillBonus == null && <PromptSkillBonus setSkill={setSkillBonus} />}
			{tries > 0 && showInstructions && (
				<Instructions
					tries={tries.toString()}
					charSet={passwordManager.current.passwordValues.toString()}
					passLength={passwordManager.current.passwordLength.toString()}
					symbol={symbol.current}
					onClose={() => setShowInstructions(false)}
				/>
			)}
			{!showInstructions && (
				<HackingGame
					tries={tries}
					passwordManager={passwordManager.current}
					symbol={symbol.current}
					onResolve={(result: GameResult) => onResult(result)}
				/>
			)}
		</>
	);
};

export default HackingScreen;
