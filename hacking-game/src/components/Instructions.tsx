import { useEffect } from "react";

type Props = {
	tries: string;
	charSet: string;
	passLength: string;
	symbol: string;
	onClose: () => void;
};

const Instructions: React.FC<Props> = ({ tries, charSet, passLength, symbol, onClose }) => {
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === " ") {
				onClose();
			}
		};
		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	return (
		<>
			<p>
				To hack the password you must enter a valid <span className="param">{passLength}</span> characters
				combination among the following available ones:
			</p>
			<p>
				<span className="param">{charSet}</span>
			</p>
			<p>
				You have <span className="param">{tries}</span> guess available before you're kicked from the terminal.
				Each time you try a new combination, your laptop will give you feedback on your guess. For each
				character in the combination, it will show one of the three following symbols:
			</p>
			<p>
				<span className="right-guest">{symbol}</span> : This means a full match.
			</p>
			<p>
				<span className="almost-guest">{symbol}</span> : This means a character is right but not at the right
				place in the combination.
			</p>
			<p>
				<span className="wrong-guest">{symbol}</span> : This means a wrong character.
			</p>
			<p>
				Please note that the feedback won't be in the same order as your combination. The symbols are grouped by
				level of success.
			</p>
			<p>Press space whenever you're ready to play...</p>
		</>
	);
};

export default Instructions;
