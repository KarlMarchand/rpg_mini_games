# rpg_mini_games

Repo to regroup a few mini-games I'm making for my players in our Star Wars rpg campaigns

## Hacking Mini-Game

The goal is to provide the players a more immersive experience when they have to hack into a computer. The mini-game is based on the mastermind boardgame and the player has to make guesses until they find the right combination. For more details, see the Hacking Mini-Game's readme.

## Documents Generator

The actual version of this script creates around 460 documents. Each of those is a very basic bill of lading to represent a randomly generated shipment made between two planets. The details fits with the context so a mining planet will ship its ores to a foundry while a foundry will ship to a warehouse etc. The number of documents generated depends on the number of month included in the main function. At the moment, it generates 50 shipment per month (1 bill per shipment) and then a it creates a shipment logs for the month.

## Cryptex Password Finder

The goal of this class is to find the words in a text that are of a given length and order them by occurences. I created this small program to help me find a good word to use as a password for an rpg puzzle based on the lore text of the game using a cryptex. This way I could pass the book as a txt file, make the app reads it and give me a list of all the words of a given length in that text ordered by number of occurence.
