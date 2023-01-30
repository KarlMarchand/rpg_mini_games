import { Outlet } from "react-router-dom";

const TerminalLayout = () => {
	return (
		<div className="terminal green">
			<div className="terminal-interior">
				<div className="noise"></div>
				<div className="overlay green"></div>
				<div className="terminal-content">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default TerminalLayout;
