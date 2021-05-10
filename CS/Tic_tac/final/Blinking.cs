using System;
using System.Collections.Generic;
using System.Text;

namespace final
{
    public class Blinking //Added for blinking text
    {
        private static void WriteBlinkingText(string text, int delay, bool visible)
        {
            if (visible)
                Console.Write(text);
            else
                for (int i = 0; i < text.Length; i++)
                    Console.Write(" ");
            Console.CursorLeft -= text.Length;
            System.Threading.Thread.Sleep(delay);
        }
        public static void Flash(string s) //Controls making the text visible and non-visible 
        {
            int i = 0;
            while (i < 5)// Loop to control the number of blinks
            {
                WriteBlinkingText(s, 500, true); //The larger the number, the longer the "blink"
                WriteBlinkingText(s, 500, false);
                i++;
            }
            return;

        }
    }
}
