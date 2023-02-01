import { Result } from "../types/hacking";

export enum PasswordStyles {
	DIGITS,
	LETTERS,
	ALPHANUMERICAL,
	CUSTOM,
}

export enum Difficulty {
	EASY = 3,
	MEDIUM = 5,
	HARD = 7,
}

class PasswordManager {
	passwordStyle: PasswordStyles;
	passwordValues: string[];
	passwordLength: number;
	password: string;

	constructor(
		passwordDifficulty: Difficulty = Difficulty.MEDIUM,
		passwordStyle: PasswordStyles = PasswordStyles.DIGITS,
		passwordValues: string[] = []
	) {
		this.passwordStyle = passwordStyle;
		this.passwordValues =
			passwordStyle === PasswordStyles.CUSTOM
				? passwordValues
				: PasswordManager.passwordContent[this.passwordStyle];
		this.passwordLength = passwordDifficulty;
		this.password = "";
		this.generateNewPassword();
	}

	static lettersArray = Array.from("abcdefghijklmnopqrstuvwxyz".split(""));
	static numbersArray = Array.from(Array(10).keys()).map((k) => k.toString());

	static passwordContent = {
		[PasswordStyles.DIGITS]: PasswordManager.numbersArray,
		[PasswordStyles.LETTERS]: PasswordManager.lettersArray,
		[PasswordStyles.ALPHANUMERICAL]: Array.from(PasswordManager.numbersArray.concat(PasswordManager.lettersArray)),
		[PasswordStyles.CUSTOM]: [],
	};

	generateNewPassword = (): void => {
		this.password = Array(this.passwordLength)
			.fill("*")
			.map(() => this.passwordValues[Math.floor(Math.random() * this.passwordValues.length)])
			.join("");
	};

	// Make sure the guess isn't shorter or longer than the supposed length of the password allowed and trims the white spaces.
	#formatGuess = (guess: string): string => {
		return guess.trim().slice(0, this.passwordLength).padStart(this.passwordLength, " ");
	};

	// Each character in the right position is "Right", if the password contains that character but in another position it's "Almost" else it is "Wrong".
	// Each character is only counted once.
	checkPassword = (guess: string): Result => {
		const result = {
			Right: 0,
			Almost: 0,
			Wrong: 0,
		};
		const guess_list = Array.from(this.#formatGuess(guess));
		const password_list = Array.from(this.password);
		password_list.forEach((char, pos) => {
			if (guess_list[pos] === char) {
				result.Right += 1;
				guess_list[pos] = "?";
				password_list[pos] = "?";
			}
		});
		guess_list.forEach((char) => {
			if (char === "?") return;
			if (password_list.indexOf(char) !== -1) {
				result.Almost += 1;
				password_list.splice(password_list.indexOf(char), 1);
			} else {
				result.Wrong += 1;
			}
		});
		return result;
	};

	// Check if if the result given is 100% a match or not
	confirmPassword = (result: Result): boolean => {
		return result.Right == this.passwordLength;
	};
}

export default PasswordManager;
