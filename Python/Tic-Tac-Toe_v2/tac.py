import sys  # Need for blinkung
import time  # Need for blinkung


def game_board(gamemarker):
    print(f" {gamemarker[0]} | {gamemarker[1]} | {gamemarker[2]}")
    print("---+---+---")
    print(f" {gamemarker[3]} | {gamemarker[4]} | {gamemarker[5]}")
    print("---+---+---")
    print(f" {gamemarker[6]} | {gamemarker[7]} | {gamemarker[8]}")


def check_win(winner_game, draw_game, gamemarker):
    if winner_game(gamemarker):
        return 1
    if draw_game(gamemarker):
        return 2
    return 0


def get_next_player(playernumber):
    if playernumber == 1:
        return 2
    return 1


def player_symbol(playernumber):
    if playernumber % 2 == 0:
        return 'O'
    return 'X'


def blink_once():  # Need for blink on win
    sys.stdout.write(f'\rCongrats to player {currentPlayer}, You won!!!')
    time.sleep(0.5)
    sys.stdout.write('\r                                      ')
    time.sleep(0.5)
    return True


def blink(number):
    for i in range(0, number):
        blink_once()


def draw_game(gamemarker):
    return (gamemarker[0] != '1'
            and gamemarker[1] != '2'
            and gamemarker[2] != '3'
            and gamemarker[3] != '4'
            and gamemarker[4] != '5'
            and gamemarker[5] != '6'
            and gamemarker[6] != '7'
            and gamemarker[7] != '8'
            and gamemarker[8] != '9')


def game_marker_same(gamemarker, pos1, pos2, pos3):
    return gamemarker[pos1] == gamemarker[pos2] and gamemarker[pos2] == gamemarker[pos3]


def winner_game(gamemarker):
    if (game_marker_same(gamemarker, 0, 1, 2)
        or game_marker_same(gamemarker, 3, 4, 5)
        or game_marker_same(gamemarker, 6, 7, 8)
        or game_marker_same(gamemarker, 0, 3, 6)
        or game_marker_same(gamemarker, 1, 4, 7)
        or game_marker_same(gamemarker, 2, 5, 8)
        or game_marker_same(gamemarker, 0, 4, 8)
            or game_marker_same(gamemarker, 2, 4, 6)):
        return True
    return False


def game_inner_works(get_next_player, gamemarker, currentplayer):
    notValidNumber = True

    while notValidNumber:
        userNumber = input("Please enter a number:")
        if (userNumber.strip().isdigit() and userNumber == "1"
            or userNumber == "2"
            or userNumber == "3"
            or userNumber == "4"
            or userNumber == "5"
            or userNumber == "6"
            or userNumber == "7"
            or userNumber == "8"
                or userNumber == "9"):
            gamePlacementMarker = int(userNumber)

            currentMarker = gamemarker[gamePlacementMarker - 1]

            if currentMarker == 'X' or currentMarker == 'O':
                print("This spot is already taken! Please try again")
            else:
                gamemarker[gamePlacementMarker -
                           1] = player_symbol(currentplayer)
                notValidNumber = False
        else:
            print("Please select values in range.")


def isAplpha(name):
    for letter in name:
        if letter.isalpha() == True:
            return True
        return False


def upper_words(currentplayer, name1, name2):
    print("\t Slither-Tac-Toe!")
    print(f"{name1}, you are player 1! You're: X\n{name2}, you are player 2! You're: O\n")
    print(
        f"Player {currentplayer}, you're up. Use number pad and select 1 through 9 on the game board.")
    print()


runApp = True
name1Check = True
name2Check = True
name1 = ""
name2 = ""
nameCheckValidation = False
while runApp:
    gameStatus = 0
    currentPlayer = -1
    gameMarker = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
    print("welcome!")
    name1 = input("player 1 name:").upper()
    name2 = input("player 2 name:").upper()
    while gameStatus == 0:
        currentPlayer = get_next_player(currentPlayer)
        upper_words(currentPlayer, name1, name2)
        game_board(gameMarker)
        game_inner_works(get_next_player, gameMarker, currentPlayer)
        gameStatus = check_win(winner_game, draw_game, gameMarker)

    upper_words(currentPlayer, name1, name2)
    draw_game(gameMarker)
    if gameStatus == 1:
        blink(5)
        print("Congratulations!! Player {currentPlayer} is the winner")

    elif gameStatus == 2:
        blink(5)
        print(f"Shucks, the game is a draw!")
    continuing = input(
        "Press (E) to exit or any other button to continue: ").lower()
    if continuing == 'e':
        runApp = False

game_board(gameMarker)
