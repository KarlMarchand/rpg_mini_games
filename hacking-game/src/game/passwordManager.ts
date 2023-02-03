import { Result } from "../types/hacking";

export enum PasswordStyles {
	DIGITS,
	LETTERS,
	ALPHANUMERICAL,
	CUSTOM,
}

export enum Difficulty {
	EASY = 3,
	MEDIUM = 4,
	HARD = 5,
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
	}

	static lettersArray = Array.from("abcdefghijklmnopqrstuvwxyz".split(""));
	static numbersArray = Array.from(Array(10).keys()).map((k) => k.toString());

	static passwordContent = {
		[PasswordStyles.DIGITS]: PasswordManager.numbersArray,
		[PasswordStyles.LETTERS]: PasswordManager.lettersArray,
		[PasswordStyles.ALPHANUMERICAL]: Array.from(PasswordManager.numbersArray.concat(PasswordManager.lettersArray)),
		[PasswordStyles.CUSTOM]: [],
	};

	// Generate a password with a length of n where each character can only appears once
	generateNewPassword = (): void => {
		const valuesLeft = Array.from(this.passwordValues);
		this.password = Array(this.passwordLength)
			.fill("*")
			.map(() => {
				const index: number = Math.floor(Math.random() * valuesLeft.length);
				const chosenValue: string = valuesLeft.splice(index, 1)[0];
				return chosenValue;
			})
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
