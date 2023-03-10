import { useState, useEffect, useRef } from "react";

type Props = {
	text: string;
	speed: number;
	customKey?: string;
	onFinish?: () => void;
	scroll?: () => void;
};

const TypeWriter: React.FC<Props> = ({ text, speed, customKey, onFinish, scroll }) => {
	const index: React.MutableRefObject<number> = useRef(0);
	const [currentText, setCurrentText] = useState<string>("");

	useEffect(() => {
		index.current = 0;
		setCurrentText("");
	}, [text]);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setCurrentText((value: string) => value + text.charAt(index.current));
			index.current += 1;
			if (index.current === text.length - 1) {
				if (onFinish) {
					onFinish();
				}
			}
			if (scroll) {
				scroll();
			}
		}, speed);
		return () => {
			clearTimeout(timeoutId);
		};
	}, [currentText, text]);

	return <p>{currentText}</p>;
};

export default TypeWriter;
