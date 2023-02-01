import { useEffect, useState, useCallback } from "react";

type Props = {
	label: string;
	numbersOnly?: boolean;
	maxLength?: number;
	onSubmit: (value: string) => void;
};

const TerminalInput: React.FC<Props> = ({ label, numbersOnly, maxLength, onSubmit }) => {
	const [inputValue, setInputValue] = useState<string>("");

	const numbers: string[] = [...Array(10).keys()].map((n) => n.toString());

	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (event.key === "Enter") {
				let finalValue = inputValue.trim();
				if (maxLength) {
					finalValue = finalValue.slice(0, maxLength);
				}
				onSubmit(finalValue);
			} else if (event.key === "Backspace") {
				setInputValue((value: string) => value.slice(0, -1));
			} else if (event.key.length === 1 || event.key === "Space") {
				if (maxLength && inputValue.length < maxLength) {
					if (numbersOnly && !numbers.includes(event.key)) {
						return;
					}
					setInputValue((value: string) => value + event.key);
				}
			}
		},
		[inputValue, onSubmit]
	);

	useEffect(() => {
		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [handleKeyDown]);

	return (
		<div className="terminal-input">
			<span className="label">{label}</span>
			<span className="current-value">{inputValue}</span>
			<span className="blinking-cursor">_</span>
		</div>
	);
};

export default TerminalInput;
