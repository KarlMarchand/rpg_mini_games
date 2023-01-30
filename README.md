# rpg_mini_games
Repo to regroup a few mini-games I'm making for my players in our Star Wars rpg campaigns

## Hacking Mini-Game
The goal is to provide the players a more immersive experience when they have to hack into a computer. The mini-game offers the player to enter their skill bonus which will give them a difficulty level in accordance to their skill level. The more the player is an expert and the easier it will be. If the player doesn't have a good bonus, it will make it more difficult to hack. Basically the game's mechanics are based on the mastermind boardgame. The player have to enter a combination which can be easy, medium or hard (change the length of the combination) and contains letters, numbers or both (depending on the GM's settings). They will have multiple guess but each time, the game will tell them if they have a correct character, an almost character (right char but wrong position) or a simply wrong character. With the feedback and a bit of thinking, the player can eventually guess the combination and then they have access to the files inside the computer. Otherwise, they get kicked out of the application.

### Install and run the project
At the moment the project can be run by cloning, downloading or forking the repo and opening the hacking subfolder. The settings must be changed in the code directly and you can change the content of computer by changing the content of the "computerContent" subfolder in the electron folder before building.

- If you want to work on it, you can use the command: 
`npm run dev`.

- If you want to build it you can use the command:
`npm run build`

- Once it's built, you can run by going in the newly created "release" folder and using the executable.

<div>
  <img title="JavaScript" alt="JavaScript" width="40" height="40" src="https://github.com/devicons/devicon/blob/master/icons/javascript/javascript-original.svg"/>&nbsp;
  <img title="Typescript" alt="Typescript" with="40" height="40" src="https://github.com/devicons/devicon/blob/master/icons/typescript/typescript-original.svg"/>&nbsp;
  <img title="NodeJS" alt="NodeJS" width="40" height="40" src="https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-original-wordmark.svg"/>&nbsp;
  <img title="React" alt="React" width="40" height="40" src="https://github.com/devicons/devicon/blob/master/icons/react/react-original-wordmark.svg"/>&nbsp;
  <img title="Electron" alt="Electron" width="40" height="40" src="https://github.com/devicons/devicon/blob/master/icons/electron/electron-original.svg"/>&nbsp;
</div>
