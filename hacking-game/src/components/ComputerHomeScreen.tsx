import { useEffect, useState } from "react";
import EmpireLogo from "../assets/empire.svg";
import TypeWriter from "./TypeWriter";

const ComputerHomeScreen: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [showUsername, setShowUsername] = useState<boolean>(false);

	useEffect(() => {
		setTimeout(() => {
			setShowUsername(true);
		}, 2000);
	}, []);

	return (
		<div
			id="loginScreen"
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				width: "100%",
				height: "100%",
				justifyContent: "space-evenly",
			}}
		>
			<img src={EmpireLogo} className="empire-logo" />
			<h1 className="aurebesh">Welcome Back Agent!</h1>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					width: "30%",
					alignItems: "left",
					justifyContent: "space-between",
				}}
			>
				<div style={{ display: "flex", alignItems: "space-between" }}>
					<p style={{ marginRight: "1rem", alignSelf: "center" }}>Username:</p>
					{showUsername && (
						<TypeWriter
							text={"   admin"}
							speed={100}
							customKey={"username"}
							onFinish={() => setShowPassword(true)}
						/>
					)}
				</div>
				<div style={{ display: "flex", alignItems: "space-between" }}>
					<p style={{ marginRight: "1rem", alignSelf: "center" }}>Password:</p>
					{showPassword && (
						<TypeWriter text={"*************"} speed={100} customKey={"password"} onFinish={onFinish} />
					)}
				</div>
			</div>
		</div>
	);
};

export default ComputerHomeScreen;
