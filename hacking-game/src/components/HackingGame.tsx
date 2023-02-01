import { useState, useEffect, useRef } from "react";
import { GameResult } from "../types/hacking";
import PasswordManager, { PasswordStyles } from "@/game/passwordManager";
import { Result } from "../types/hacking";
import TerminalInput from "./TerminalInput";

type Props = {
	tries: number;
	passwordManager: PasswordManager;
	symbol: string;
	onResolve: (result: GameResult) => void;
};

const HackingGame: React.FC<Props> = ({ tries, passwordManager, symbol, onResolve }) => {
	const [attempts, setAttempts] = useState<number>(tries);
	const [guessHistory, setGuessHistory] = useState<{ guess: string; hint: Result }[]>([]);
	const containerRef = useRef<HTMLDivElement>(null);

	// If the player has no attempts left, they loose
	useEffect(() => {
		if (attempts === 0) {
			onResolve(GameResult.Lose);
		}
	}, [attempts]);

	// Generate a new password when the component is mounted
	useEffect(() => {
		passwordManager.generateNewPassword();
		console.log(passwordManager.password);
	}, []);

	const makeGuess = (answer: string) => {
		// Check against the password and get feedback.
		const result: Result = passwordManager.checkPassword(answer);
		// Check if there's enough right answers to win.
		const success: boolean = passwordManager.confirmPassword(result);
		if (success) {
			onResolve(GameResult.Win);
		} else {
			// Then it reduces the amount of attempts left if the game isn't over and add the attempted guest to the list
			setAttempts(attempts - 1);
			setGuessHistory((current) => [...current, { guess: answer, hint: result }]);
		}
	};

	// Keep the text always scrolled down for small screen
	useEffect(() => {
		if (containerRef.current) {
			containerRef.current.scrollTop = containerRef.current.scrollHeight;
		}
	}, [guessHistory]);

	return (
		<div className="scrollDown" ref={containerRef}>
			<h1>Sarlacc Hacking</h1>
			<p>Attempts Remaining: {attempts}</p>
			<div className="guess-history">
				{guessHistory.map((guess, index) => {
					return (
						<p key={index + guess.guess}>
							{guess.guess + " : "}
							{[...Array(guess.hint.Almost)].map((e, i) => (
								<span key={`almost-${i}`} className="almost-guest">
									{symbol}
								</span>
							))}
							{[...Array(guess.hint.Wrong)].map((e, i) => (
								<span key={`wrong-${i}`} className="wrong-guest">
									{symbol}
								</span>
							))}
							{[...Array(guess.hint.Right)].map((e, i) => (
								<span key={`right-${i}`} className="right-guest">
									{symbol}
								</span>
							))}
						</p>
					);
				})}
			</div>
			<TerminalInput
				label={"Enter the password:"}
				onSubmit={makeGuess}
				numbersOnly={passwordManager.passwordStyle === PasswordStyles.DIGITS ? true : false}
				maxLength={passwordManager.passwordLength}
			/>
		</div>
	);
};

export default HackingGame;
