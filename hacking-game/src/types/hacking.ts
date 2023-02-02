// Results are used to give the player hints on its past guesses
export type Result = {
	Right: number;
	Almost: number;
	Wrong: number;
};

// Result of the game, determines if the player can have access to the file explorer
export enum GameResult {
	Unresolved = 0,
	Win = 1,
	Lose = 2,
}

export type FilesDetails = {
	isDirectory: boolean;
	name: string;
	path: string;
};
