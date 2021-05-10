using System;
using System.Collections.Generic;
using System.Text;

namespace final
{
    class GameMeat
    {
        public static int CheckWinner(char[] gameMarker) //itterate between player 1 and 2
        {
            if (IsGameWinner(gameMarker))
            {
                return 1;
            }
            if (IsGameDraw(gameMarker))
            {
                return 2;
            }
            return 0;
        }
        public static bool IsGameDraw(char[] gameMarker)// These are the numbers that are used to mark with either X or O
        {
            return gameMarker[0] != '1' &&
                   gameMarker[1] != '2' &&
                   gameMarker[2] != '3' &&
                   gameMarker[3] != '4' &&
                   gameMarker[4] != '5' &&
                   gameMarker[5] != '6' &&
                   gameMarker[6] != '7' &&
                   gameMarker[7] != '8' &&
                   gameMarker[8] != '9';
        }
        public static bool IsGameWinner(char[] gameMarker) // all winning combo's
        {
            if (IsGameMarkerTheSame(gameMarker, 0, 1, 2))
            {
                return true;
            }
            if (IsGameMarkerTheSame(gameMarker, 3, 4, 5))
            {
                return true;
            }
            if (IsGameMarkerTheSame(gameMarker, 6, 7, 8))
            {
                return true;
            }
            if (IsGameMarkerTheSame(gameMarker, 0, 3, 6))
            {
                return true;
            }
            if (IsGameMarkerTheSame(gameMarker, 1, 4, 7))
            {
                return true;
            }
            if (IsGameMarkerTheSame(gameMarker, 2, 5, 8))
            {
                return true;
            }
            if (IsGameMarkerTheSame(gameMarker, 0, 4, 8))
            {
                return true;
            }
            if (IsGameMarkerTheSame(gameMarker, 2, 4, 6))
            {
                return true;
            }
            return false;
        }
        public static bool IsGameMarkerTheSame(char[] testGameMarkers, int pos1, int pos2, int pos3)// This is to tell if a spot is taken by a player
        {
            return testGameMarkers[pos1].Equals(testGameMarkers[pos2]) && testGameMarkers[pos2].Equals(testGameMarkers[pos3]);
        }
        public static void GameEngine(char[] gameMarker, int currentPlayer) //The meat and potatoes of how the Tic-tac-toe works
        {
            bool notvalidMove = true;
            do
            {//add text looking for input
                Console.Write("Please Enter a number: ");
                
                    string userInput = Console.ReadLine();
                if (!string.IsNullOrEmpty(userInput) && userInput.Equals("1") ||
                   userInput.Equals("2") ||
                   userInput.Equals("3") ||
                   userInput.Equals("4") ||
                   userInput.Equals("5") ||
                   userInput.Equals("6") ||
                   userInput.Equals("7") ||
                   userInput.Equals("8") ||
                   userInput.Equals("9")) //The number selected must be one of these or it is considered invalid
                {
                    int.TryParse(userInput, out var gamePlacementMarker);

                    char currentMarker = gameMarker[gamePlacementMarker - 1];

                    if (currentMarker.Equals('X') || currentMarker.Equals('O'))// Created to state if pos is taken
                    {
                        Console.WriteLine("This spot has already been taken. Please choose another spot");
                    }
                    else
                    {
                        gameMarker[gamePlacementMarker - 1] = GetPlayerMarker(currentPlayer);
                        notvalidMove = false;
                    }
                }
                else
                {
                    Console.WriteLine("Please select values within range!");
                }
            } while (notvalidMove);
        }
        public static char GetPlayerMarker(int player)// The actual X and O that identify each player
        {
            if (player % 2 == 0)
            {
                return 'O';
            }
            return 'X';
        }

        public static void DrawGameboard(char[] gameMarker)// the game board design as well as the index posistions
        {
            Console.WriteLine($"   {gameMarker[0]} | {gameMarker[1]} | {gameMarker[2]} ");
            Console.WriteLine("  ---+---+---");
            Console.WriteLine($"   {gameMarker[3]} | {gameMarker[4]} | {gameMarker[5]} ");
            Console.WriteLine("  ---+---+---");
            Console.WriteLine($"   {gameMarker[6]} | {gameMarker[7]} | {gameMarker[8]} ");
        }
        public static int GetNextPlayer(int player) // itterates between players
        {
            if (player.Equals(1))
            {

                return 2;
            }
            return 1;
        }
    }
}
