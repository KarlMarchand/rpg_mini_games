import TypeWriter from "@/components/TypeWriter";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const IntroScreen = () => {
	const [currentContent, setCurrentContent] = useState<JSX.Element[]>([]);
	const containerRef = useRef<HTMLDivElement>(null);
	const navigate = useNavigate();
	const index: React.MutableRefObject<number> = useRef(0);
	const input = [
		"$ nmap -p 1-65535 -T4 10.0.0.0/8",
		"$ nikto -host 10.0.0.1",
		"$ sarlacc -l admin -P password_list 10.0.0.1 ssh",
	];
	const output = [
		`Starting Nmap
        Nmap scan report for empire-secure.gov (10.0.0.1)
        Host is up (0.000089s latency).
        Not shown: 997 closed ports
        PORT     STATE SERVICE
        22/tcp   open  ssh
        80/tcp   open  http
        443/tcp  open  https
        8080/tcp open  http-proxy

        Nmap done: 1 IP address (1 host up) scanned in 0.03 seconds`,
		`Running nikto on port 22...

        + Target IP: xxx.xxx.xxx.xxx
        + Target Hostname: empire-secure.gov
        + Target Port: 22

        + Server: Apache
        + Web root: /var/www/html

        + /admin/login.php  - Login page found
        + /index.php?page=secret - Sensitive file found

        + 2 vulnerability found`,
		`Connection established. Force brute attack starting...`,
	];

	const nextInput = () => {
		setTimeout(() => {
			setCurrentContent((value) => [...value, <p>{output[index.current]}</p>]);
			setTimeout(() => {
				index.current += 1;
				if (index.current < input.length) {
					setCurrentContent((value) => [
						...value,
						<TypeWriter text={input[index.current]} speed={100} onFinish={nextInput} scroll={scrollDown} />,
					]);
				} else {
					setTimeout(() => {
						goToNextPage();
					}, 2000);
				}
			}, 5000);
		}, 2000);
	};

	const goToNextPage = () => {
		navigate("/instructions");
	};

	const scrollDown = () => {
		if (containerRef.current) {
			containerRef.current.scrollTop = containerRef.current.scrollHeight;
		}
	};

	useEffect(() => {
		setCurrentContent([
			<TypeWriter text={input[index.current]} speed={100} onFinish={nextInput} scroll={scrollDown} />,
		]);

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Space") {
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
