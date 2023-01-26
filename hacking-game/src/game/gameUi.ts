import { GameUI } from "./types/hacking";

// ! Not finished converting it from python
// ! Will eventually be replaced entirely by react

class CursesUI extends GameUI {
	// dot: string;

	constructor() {
		super();
		// init_colorama()
		// this.screen = wrapper(.init_screen)
		// this.dot = '⬤ '
		// this.empire_logo = "empire.jpg"
	}

	// Apply settings to a curses window.
	// Black Screen, Blinking Cursor, Green Text
	init_screen = () => {
		// screen.clear()
		// curses.start_color()
		// curses.init_pair(1, curses.COLOR_GREEN, curses.COLOR_BLACK)
		// curses.init_pair(2, curses.COLOR_BLUE, curses.COLOR_BLACK)
		// this.GREEN_BLACK = curses.color_pair(1)
		// this.BLUE_BLACK = curses.color_pair(2)
		// curses.curs_set(2)
		// screen.refresh()
		// return screen
	};

	write = (text: string) => {
		// for char in text:
		//     this.screen.addstr(char)
		//     this.screen.refresh()
		//     curses.napms(100)
	};

	// Prompt the player to enter their skill bonus and return the bonus
	promptSkillBonus = (): number => {
		// this.screen.clear()
		// this.write("Enter your skill bonus and press enter: ")
		// this.screen.refresh()
		// skill_bonus = this.screen.getstr().decode()
		// this.screen.clear()
		// return number(skill_bonus)
		return 0;
	};

	showInstructions(password_length: number, password_values: string[]): void {}

	newGuess = (history: object[]): string => {
		// this.screen.clear()
		// for index, result in enumerate(history):
		//     guess, hint = result["guess"], result["hint"]
		//     this.write(f"Guess {index} : {guess} \t\t {Fore.GREEN + (hint['Right']*this.dot)} {Fore.YELLOW + (hint['Almost']*this.dot)} {Fore.RED + (hint['Wrong']*this.dot)}\n\n")
		// this.write("Enter the combination and press enter: ")
		// this.screen.refresh()
		// password = this.screen.getstr().decode()
		// return password
		return "";
	};

	victoryScreen = (): void => {
		// this.screen.clear()
		// this.screen.addstr("Password confirmed, welcome back agent. Press any key to close the terminal...")
		// curses.curs_set(0)
		// this.screen.refresh()
		// this.quit_app()
	};

	files_explorer = (): void => {};

	failureScreen = (): void => {
		// this.screen.clear()
		// this.screen.addstr("Too many failed attempts! You are now locked out of the system. Press any key to close the terminal...")
		// curses.curs_set(0)
		// this.screen.refresh()
		// this.quit_app()
	};

	// Wait for the player to enter a key and then quit the app
	quitApp = (): void => {
		// this.screen.getch()
		// curses.endwin()
	};
}

export default CursesUI;
