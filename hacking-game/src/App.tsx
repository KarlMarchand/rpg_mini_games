import {} from "react-router-dom";
import EmpireLogo from "./assets/empire.svg";

function App() {
	return (
		<>
			{/*SVG inclusion example <img src={EmpireLogo} /> */}
			<div className="terminal green">
				<div className="terminal-interior">
					<div className="noise"></div>
					<div className="overlay green"></div>
					<div className="terminal-content">
						<h1>
							Error <span className="errorcode">404</span>
						</h1>
						<p className="output">
							The page you are looking for might have been removed, had its name changed or is temporarily
							unavailable.
						</p>
						<p className="output">
							Please try to <a href="#1">go back</a> or <a href="#2">return to the homepage</a>.
						</p>
						<p className="output">Good luck.</p>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
