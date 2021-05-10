using System;
using System.Collections.Generic;
using System.Text;

namespace final
{
    class NameCheck
    {
        public static bool IsAlpha(string s) // Checks to ensure the user inputs letters
        {
            foreach (char c in s)
            {
                if (!Char.IsLetter(c))
                    return false;
            }
            return true;
        }
        public static void HeadsUpDisplay(int playerNumber, string name1, string name2)// This is the above gameboard information
        {
            Console.WriteLine("\t Tic-Tac-Toe Bonanza!");
            Console.WriteLine($"{name1}, you are player 1! You're: X\n{name2}, you are player 2! You're: O\n");
            Console.WriteLine($"Player {playerNumber}, you're up. Use number pad and select 1 through 9 on the game board.");
            Console.WriteLine();
        }
    }
}
