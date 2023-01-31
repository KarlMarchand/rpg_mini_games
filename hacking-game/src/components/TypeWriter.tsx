import { useState, useEffect, useRef } from "react";

const TypeWriter: React.FC<{ text: string; speed: number }> = ({ text, speed }) => {
	const index: React.MutableRefObject<number> = useRef(0);

	const [currentText, setCurrentText] = useState<string>("> ");

	useEffect(() => {
		index.current = 0;
		setCurrentText("> ");
	}, [text]);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setCurrentText((value: string) => value + text.charAt(index.current));
			index.current += 1;
		}, speed);
		return () => {
			clearTimeout(timeoutId);
		};
	}, [currentText, text]);

	return <p>{currentText}</p>;
};

export default TypeWriter;
