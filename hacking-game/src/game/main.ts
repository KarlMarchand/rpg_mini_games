import PasswordManager from "./passwordManager";
import { GameUI, Result } from "./types/hacking";
import CursesUI from "./gameUi";

enum GameState {
	NOTOVER = 0,
	WON = 1,
	LOST = 2,
}

class CodeBreaker {
	skillBonus: number = 0;
	gameUi: GameUI;
	passwordManager: PasswordManager;
	guesses: number = 0;
	guessHistory: { guess: string; hint: Result }[] = [];

	constructor(gameUi: GameUI, passwordManager: PasswordManager) {
		this.gameUi = gameUi;
		this.passwordManager = passwordManager;
	}

	play = (): void => {
		this.skillBonus = this.gameUi.promptSkillBonus();
		this.resetRound();
		let over = GameState.NOTOVER;
		this.gameUi.showInstructions(this.passwordManager.passwordLength, this.passwordManager.passwordValues);
		while (over == GameState.NOTOVER) {
			const answer = this.gameUi.newGuess(this.guessHistory);
			over = this.testAnswer(answer);
		}
		this.endGame(over == GameState.WON);
	};

	resetRound = (): void => {
		this.guesses = this.skillBonus + 3;
		this.guessHistory = [];
		this.passwordManager.generateNewPassword();
	};

	testAnswer = (guess: string): number => {
		this.guesses--;
		const results = this.passwordManager.checkPassword(guess);
		let gameOver = GameState.NOTOVER;
		if (this.passwordManager.confirmPassword(results)) {
			gameOver = GameState.WON;
		} else if (this.guesses === 0) {
			gameOver = GameState.LOST;
		}
		this.guessHistory.push({
			guess: guess,
			hint: results,
		});
		return gameOver;
	};

	endGame = (success: boolean): void => {
		if (success) {
			this.gameUi.victoryScreen();
		} else {
			this.gameUi.failureScreen();
		}
	};
}

const main = (): void => {
	const game = new CodeBreaker(new CursesUI(), new PasswordManager());
	game.play();
};

main();
