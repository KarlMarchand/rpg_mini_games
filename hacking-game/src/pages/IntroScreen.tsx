import TypeWriter from "@/components/TypeWriter";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const IntroScreen = () => {
	const [currentContent, setCurrentContent] = useState<JSX.Element[]>([]);
	const containerRef = useRef<HTMLDivElement>(null);
	const navigate = useNavigate();
	const index: React.MutableRefObject<number> = useRef(0);
	const input: string[] = [
		"$ nmap -p 1-65535 -T4 local",
		"$ nikto -host empire-secure-terminal",
		"$ sarlacc -l admin -P password_list empire-secure-terminal ssh",
	];
	const output: JSX.Element[] = [
		<p>
			Scan report for empire-secure-terminal
			<br />
			PORT: 22
			<br />
			STATE: Open
			<br />
			SERVICE: ssh
			<br />
		</p>,
		<p>
			Running nikto on port 22... <br />
			+ Server: Running <br />
			+ Login page found <br />
			+ 1 vulnerability found <br />
		</p>,
		<p>Connection established. Brute Force Attack starting...</p>,
	];

	const typingSpeed = 50;

	const nextInput = () => {
		setTimeout(() => {
			setCurrentContent((value) => [...value, output[index.current]]);
			setTimeout(() => {
				index.current += 1;
				if (index.current < input.length) {
					setCurrentContent((value) => [
						...value,
						<TypeWriter
							text={input[index.current]}
							speed={typingSpeed}
							onFinish={nextInput}
							scroll={scrollDown}
						/>,
					]);
				} else {
					setTimeout(() => {
						goToNextPage();
					}, 1000);
				}
			}, 2000);
		}, 1000);
	};

	const goToNextPage = () => {
		navigate("/game");
	};

	const scrollDown = () => {
		if (containerRef.current) {
			containerRef.current.scrollTop = containerRef.current.scrollHeight;
		}
	};

	useEffect(() => {
		setCurrentContent([
			<TypeWriter text={input[index.current]} speed={typingSpeed} onFinish={nextInput} scroll={scrollDown} />,
		]);

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === " ") {
				goToNextPage();
			}
		};
		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	useEffect(() => {
		scrollDown();
	}, [currentContent]);

	return (
		<div className="scrollDown" ref={containerRef}>
			{currentContent.map((line) => line)}
		</div>
	);
};

export default IntroScreen;
