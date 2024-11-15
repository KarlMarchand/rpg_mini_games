from typing import Dict
import re

class WordLengthFinder:
    """
    The goal of this class is to find the words in a text that are of a given length and order them by occurences.
    I created this small program to help me find a good word to use as a password for an rpg puzzle based on the
    lore text of the game.
    """
    __word_length: int
    __file_path: str
    __words_of_given_length: Dict[str, int]
    
    def __init__(self, file_path: str, length: int):
        self.__word_length = length
        self.__file_path = file_path
        self.__words_of_given_length = {}

    def run(self):
        self.__analyse_file()
        self.__order_words_by_occurences()
        self.__print_results_to_file()

    def __analyse_file(self):
        with open(self.__file_path, "r", errors="ignore") as file:
            for line in file:
                for word in line.split():
                    cleaned_word = re.sub(r'\W+', '', word).lower()
                    if len(cleaned_word) == self.__word_length:
                        self.__words_of_given_length[cleaned_word] = self.__words_of_given_length.get(cleaned_word, 0) + 1

    def __order_words_by_occurences(self):
        self.__words_of_given_length = dict(sorted(self.__words_of_given_length.items(), key=lambda item: item[1], reverse=True))
    
    def __print_results_to_file(self):
        with open("output.txt", "w") as file:
            for word, occurences in self.__words_of_given_length.items():
                if occurences > 1:
                    file.write(f"{word} : {occurences}\n")

def main() -> int:
    WordLengthFinder("./input.txt", 6).run()
    return 0

if __name__ == "__main__":
    quit(main())