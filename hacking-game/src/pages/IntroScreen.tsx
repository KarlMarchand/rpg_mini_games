import TypeWriter from "@/components/TypeWriter";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

type Inputs = {
	name: string;
	text: string;
};

const IntroScreen = () => {
	const navigate = useNavigate();
	const [currentContent, setCurrentContent] = useState<JSX.Element[]>([]);
	const [typingSpeed, setTypingSpeed] = useState<number>(50);
	const containerRef = useRef<HTMLDivElement>(null);
	const index: React.MutableRefObject<number> = useRef(0);
	const input = useRef<Inputs[]>([
		{ name: "nmap", text: "$ nmap -p 1-65535 -T4 local" },
		{ name: "nikto", text: "$ nikto -host empire-secure-terminal" },
		{ name: "sarlacc", text: "$ sarlacc -l admin -P password_list empire-secure-terminal ssh" },
	]);
	const output = useRef<JSX.Element[]>([
		<p key="output-nmap">
			Scan report for empire-secure-terminal
			<br />
			PORT: 22
			<br />
			STATE: Open
			<br />
			SERVICE: ssh
			<br />
		</p>,
		<p key="output-nikto">
			Running nikto on port 22...
			<br />
			+ Server: Running
			<br />
			+ Login page found
			<br />
			+ 1 vulnerability found
			<br />
		</p>,
		<p key="output-sarlacc">Connection established. Brute Force Attack starting...</p>,
	]);

	// Gets called everytime the virtual user finish entering a command.
	// It will show the fake result and start typing a new command until it finishes and navigates to the game page
	const nextInput = () => {
		setTimeout(() => {
			setCurrentContent((value) => [...value, output.current[index.current]]);
			setTimeout(() => {
				index.current += 1;
				if (index.current < input.current.length) {
					setCurrentContent((value) => [
						...value,
						<TypeWriter
							text={input.current[index.current].text}
							customKey={input.current[index.current].name}
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

	// Keep the text always scrolled down for small screen
	const scrollDown = () => {
		if (containerRef.current) {
			containerRef.current.scrollTop = containerRef.current.scrollHeight;
		}
	};

	useEffect(() => {
		setCurrentContent([
			<TypeWriter
				text={input.current[index.current].text}
				speed={typingSpeed}
				customKey={input.current[index.current].name}
				onFinish={nextInput}
				scroll={scrollDown}
			/>,
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
			{currentContent.map((line, key) => {
				return <div key={key}>{line}</div>;
			})}
		</div>
	);
};

export default IntroScreen;
