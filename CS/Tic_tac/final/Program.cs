using System;
using System.IO;

namespace final
{
    class Program
    {
        static void Main(string[] args)
        {
            char beep = '\u0007';
            bool endApp = false;
            while (!endApp) // To allow the game to be played if user wants to.
            {
                int gameStatus = 0; // Tells wehther game is win, draw or still going
                int currentPlayer = -1; //The player
                char[] gameMarker = { '1', '2', '3', '4', '5', '6', '7', '8', '9' }; // The number for the spaces on the board
                Console.WriteLine("\t Hello , welcome to my Tic-Tac-Toe Bonanza!"); //Placed the following 4 lines to get the users names to remind which letter they are.
                Name1: // reference to where to goto
                Console.WriteLine("Player 1: Enter your name: ");
                string name1 = Console.ReadLine().ToUpper();
                if (NameCheck.IsAlpha(name1) != true) //loop to check if the user entered a real letter only name
                {
                    Console.Clear();
                    Console.WriteLine("\t Hello , welcome to my Tic-Tac-Toe Bonanza!");
                    Console.WriteLine("Please use only characters!");
                    goto Name1;
                }
                Name2:
                Console.WriteLine("Player 2: Enter your name: ");
                string name2 = Console.ReadLine().ToUpper();
                if (NameCheck.IsAlpha(name2) != true)
                {
                    Console.Clear();//To clear the console to prevent scrolling
                    Console.WriteLine("\t Hello , welcome to my Tic-Tac-Toe Bonanza!");
                    Console.WriteLine("Please use only Alpha characters!");
                    goto Name2;
                }
                do
                {   
                    Console.Clear();
                    currentPlayer = GameMeat.GetNextPlayer(currentPlayer);
                    NameCheck.HeadsUpDisplay(currentPlayer,name1,name2);
                    GameMeat.DrawGameboard(gameMarker);

                    GameMeat.GameEngine(gameMarker, currentPlayer);
                    gameStatus = GameMeat.CheckWinner(gameMarker);

                } while (gameStatus.Equals(0));

                Console.Clear();
                NameCheck.HeadsUpDisplay(currentPlayer, name1, name2);
                GameMeat.DrawGameboard(gameMarker);
                if (gameStatus.Equals(1))// To throw winner if 3 rows,columns, or diagnol from same player
                {
                    Console.WriteLine(beep);
                    string win = $"Congratulations!! Player {currentPlayer} is the winner";
                    Blinking.Flash(win);
                }
                if (gameStatus.Equals(2)) //To throw a draw if all spaces are filled with no winner
                {
                    Console.WriteLine(beep);
                    string draw = "Shucks, the game is a draw!";
                    Blinking.Flash(draw);
                }
                Console.Write("Press 'e' then Enter to close the app, or press any other key to continue: ");
                if (Console.ReadLine() == "e")
                {
                    Blinking.Flash("Thanks for playing!");
                    endApp = true; //Added to change endApp to True to exit
                }
                Console.Clear();
            }

            return;
        }

       
        
        
    }
}
