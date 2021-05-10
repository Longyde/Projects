#Version two changes are as follows:
# I added the colorama to give you color input. 
#I also gave a intro to the game and also added user name input
#I added a blink to let the winner know they won!
# I made the board dynamic
#Added an option to give a hard classic board or to make the board dynamic
#Added jokes and a random generator to tell random jokes.
#cleaned up the code to make more dynamic responses
#Note if IDE can't support Colorama look for commented numbers!! Escpecially number 11. read Note.

import sys #Need for blinkung
import time #Need for blinkung
import random #Need for random joke
import itertools #needed to cycle between player 1 & 2
from colorama import Fore, Back, Style, init #1 #Need for color output. (Comment out this if IDE can't support color)
init() #2 #Need for color output. (Comment out this if IDE can't support color)
        #introduction to the game
print("Welcome to my Tic-Tac-Toe game Version 2!\n")
player_1 = input("Player 1, Enter your first name: ")
print(" ")
player_2 = input("Player 2, Enter your first name: ")
print(" ")

# for defining and checking wins
def win(current_game): 
    def blink_once(): #Need for blink on win
        sys.stdout.write(f'\r{active_player.upper()[:]}, You won!!!')
        time.sleep(0.5)
        sys.stdout.write('\r                                      ')
        time.sleep(0.5)
        return True
    def blink(number):
        for i in range(0,number): #
            blink_once()


    def all_same(l): #Need for verification of win
        if l.count(l[0]) == len(l) and l[0] != 0:
            blink(5)
            return True
        else:
            return False

        #Horizontal win
    for row in game:
        if all_same(row):
            print(f"\nCongragulations {active_player.upper()[:]}, You won horizontally!\n") #Need for making a more personalized victory
            return True
        #for diagnol winners
    diags = [] 
    for col, row in enumerate(reversed(range(len(game)))):
        diags.append(game[row][col])
        
    if all_same(diags):
        print(f"\nCongragulations {active_player.upper()[:]}, You won diagnally!\n") #Need for making a more personalized victory
        return True
        #for diagnol winners
    diags = [] 
    for ix in range(len(game)):
        diags.append(game[ix][ix])
    if all_same(diags):
        print(f"\nCongragulations {active_player.upper()[:]}, You won diagnally!\n") #Need for making a more personalized victory
        return True
        #for vertical wins
    for col in range(len(game)):  
        check = []
        for row in game:
            check.append(row[col])
        if all_same(check):
            print(f"\nCongragulations {active_player.upper()[:]}, you won vertically!\n")
            return True
    return False
    
        #This is the function that generate the board as well as verify spots aren't already used.
def game_board(game_map, player=0, row=0, column=0, just_display=False): 
    try: 
        if game_map[row][column] !=0:
            print("That spot is taken! Select a different spot.\n")
            return game_map, False
        print("   " + "  ".join([str(i) for i in range(len(game_map))]))
        # if check_draw(player_pos):
        #     print_tic_tac_toe(values)
        #     print("Game Drawn")
        #     print("\n")
        #     return 'D'
        if not just_display:
            game_map[row][column] = player
        #Need for Building X and O
        for count, row in enumerate(game_map):
            colored_row = ""                                                     #3 #Need for color output. (Comment out this if IDE can't support color)
            for item in row:                                                     #4 #Need for color output. (Comment out this if IDE can't support color)
                if item == 0:                                                    #5 #Need for color output. (Comment out this if IDE can't support color)
                    colored_row +="   "                                          #6 #Need for color output. (Comment out this if IDE can't support color)
                elif item == 1:                                                  #7 #Need for color output. (Comment out this if IDE can't support color)
                    colored_row += Fore.RED + ' X ' + Style.RESET_ALL            #8 #Need for color output. (Comment out this if IDE can't support color)
                elif item == 2:                                                  #9 #Need for color output. (Comment out this if IDE can't support color)
                    colored_row += Fore.GREEN + ' O ' + Style.RESET_ALL          #10 #Need for color output. (Comment out this if IDE can't support color)
                    #*Replace print(count, colored_row) with print(count, row) if IDE can't support Colorama
            print(count, colored_row)                                            #11 #Need for color output. (Comment out this if IDE can't support color)
        return game_map, True
    #Need for out of range errors
    except IndexError as e: 
        print(f"Error: Please input row/column within the confinements of the board? (Number MUST be below {game_size})\n")
        return game_map, False
        #Need for unknown errors
    except Exception as e:
        print("Error: Something is very wrong!", e)
        return game_map, False
   #Need for getting the game started
play = True
players = [1, 2]
jokes = ["What you call toes that taste like mint?: Tic-tac-toes!", "How many birds can play tic-tac-toe?: Toucan!", 
"Have you heard of the Tic-Tac-Toe Beetle?: It has an X-O-skeleton.", "What do you get when astronomers play tic-tac-toe?: X-O-Planets",
"Why is virtual Tic-Tac-Toe so much better?: Because, you can't get Board!", "Interesting facts: Commonwealth English call Tic-Tac-Toe, noughts and crosses!"] #Need for random joke
while play:
    try: #Need for providing a choice to make the game dynamic to user input
        classic_style = input("Do you want to play on a classic board? (y/n): ")
        print(" ")
        if classic_style.lower() == 'y':
            game = [[0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0],]
        elif classic_style.lower() == 'n': 
            #To make the board dynamic
            game_size = int(input("What dimensions do you want the board to be by? "))
            print(" ")
            game = [[0 for i in range(game_size)] for i in range(game_size)]
            if game_size <= 2: #To prevent a game of 0x0, 1x1, or 2x2
                print("You can't play Tic-Tac-Toe on that small of a board. You play on default!")
                time.sleep(3)
                game = [[0, 0, 0],
                        [0, 0, 0],
                        [0, 0, 0],]
        else: #Need for people who don't follow the prompt
            print(f"{random.choice(jokes)}") #Need for random joke
            time.sleep(6) #Need for removing random joke
            print("Jokes on you. Use numbers next time. Default classic map!")
            time.sleep(3)
            game = [[0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0],] #Default game upon error
    except Exception as e:
        print("Error: How you do this?\n", e) #Need for unknown errors. Resets game
        played = False 
        #Keeps the game going
    game_won = False
    game, _ = game_board(game, just_display=True)
    player_choice = itertools.cycle([1, 2]) #Need for cycling bewteen 2 players
    cur_player = itertools.cycle([player_1, player_2])
    while not game_won:
        current_player = next(player_choice)
        active_player = next(cur_player)
        player_color = int
        print(f"{active_player}, it's your turn.\n") #Need for making statment more personalized
        played = False
        #Keeps the column and row input coming
        while not played:
            try:
                column_choice = int(input(f"What Column do you want to play?): "))
                row_choice = int(input(f"What Row do you want to play?): "))
                game, played = game_board(game, current_player, row_choice, column_choice)
            except Exception as e:
                print("Why did you try a letter? Pick a number!\n")
                played = False
            #Allows user to choose to play again or exit if the game is done
        if win(game):
            game_won = True
            again = input("Would you like another go? (y/n): ")
            if again.lower() == "y":
                print("Restarting")
                play = True
            elif again.lower() == "n":
                print("Thanks for playing!\n")
                play = False
            else: #Need for exiting game incase of invalid input
                print(f"{random.choice(jokes)}") #Need for random joke
                time.sleep(6)
                print("Not a valid answer, Later!\n")
                play = False