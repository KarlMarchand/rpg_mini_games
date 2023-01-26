// Results are used to give the player hints on its past guesses
export type Result = {
	Right: number;
	Almost: number;
	Wrong: number;
};

// The goal of this abstract class is to make it easy later on to change it from a cli game to another library like PYQT or a web based interface if I want something more fancy
export abstract class GameUI {
	abstract promptSkillBonus(): number;

	abstract showInstructions(password_length: number, password_values: string[]): void;

	abstract newGuess(history: object[]): string;

	abstract failureScreen(): void;

	abstract victoryScreen(): void;
}
