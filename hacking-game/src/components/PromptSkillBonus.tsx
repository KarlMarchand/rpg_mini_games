import TerminalInput from "./TerminalInput";

type Props = {
	setSkill: (bonus: number) => void;
};

const PromptSkillBonus: React.FC<Props> = ({ setSkill }) => {
	// Make sure the string is a number else put 0
	const handleSubmit = (value: string) => {
		let number = Number(value);
		if (Number.isNaN(number)) {
			number = 0;
		}
		setSkill(number);
	};

	return (
		<div className="skill-prompt">
			Welcome back Sarlacc User! We're ready for this new challenge but will first need to know what your skill
			bonus is with this kind of tool.
			<TerminalInput label={"Enter your skill bonus:"} onSubmit={handleSubmit} numbersOnly={true} maxLength={4} />
		</div>
	);
};

export default PromptSkillBonus;
