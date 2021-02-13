import itertools #needed to cycle between player 1 & 2

# for horizontal wins
def win(current_game): 

    def all_same(l):
        if l.count(l[0]) == len(l) and l[0] != 0:
            return True
        else:
            return False

        #Horizontal win
    for row in game:
        print(row)
        if all_same(row):
            print(f"Player {row[0]}, You won horizontally! ")
            return True

#for diagnol winners
    diags = [] 
    for col, row in enumerate(reversed(range(len(game)))):
        diags.append(game[row][col])
    if all_same(diags):
        print(f"Player {diags[0]}, You won diagnally! (/)")
        return True

#for diagnol winners
    diags = [] 
    for ix in range(len(game)):
        diags.append(game[ix][ix])
    if all_same(diags):
        print(f"Player {diags[0]}, You won diagnally! (\\)")
        return True

#for vertical wins
    for col in range(len(game)):  
        check = []

        for row in game:
            check.append(row[col])
        if all_same(check):
             print(f"Player {check[0]}, you won vertically!")
             return True
    return False

    #This is the function that will pass the numbers on the board
def game_board(game_map, player=0, row=0, column=0, just_display=False): 
    try: 
        if game_map[row][column] !=0:
            print("Posistion taken! Select a different spot.")
            return game_map, False
        print("   " + "  ".join([str(i) for i in range(len(game_map))]))
        if not just_display:
            game_map[row][column] = player
        for count, row in enumerate(game_map):
            print(count, row)
        return game_map, True
    #this is to handle out of range errors
    except IndexError as e: 
        print("Error: Please input row/column as 0, 1, or 2?", e)
        return game_map, False
    except Exception as e:
        print("Error: Something is very wrong!", e)
        return game_map, False
   #The game board
play = True
players = [1, 2]
while play:
    game = [[0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],]
    
     #To make the board dynamic
    #game_size = int(input("What dimensions do you want the board to be by?"))
    #[] game = [[0 for i in range(game_size)] for i in range(game_size)]

    game_won = False
    game, _ = game_board(game, just_display=True)
    player_choice = itertools.cycle([1, 2])

    while not game_won:
        current_player = next(player_choice)
        print(f"Player {current_player} it's your turn.")
        played = False

        while not played:
           
            column_choice = int(input("What Column do you want to play? (0, 1, 2):"))
            row_choice = int(input("What Row do you want to play? (0, 1, 2):"))
            game, played = game_board(game, current_player, row_choice, column_choice)
            #allows us to choose to play again or exit if the game is done
        if win(game):
            game_won = True
            again = input("Would you like another go? (y/n) ")
            if again.lower() == "y":
                print("Restarting")
            elif again.lower() == "n":
                print("Thanks for playing")
                play = False
            else: 
                print("Not a valid answer, Later!")
                play = False
