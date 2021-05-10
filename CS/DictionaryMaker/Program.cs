using System;
using System.Collections;

namespace Hash
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("This is a C# Dictionary that you create.");
            Console.WriteLine("");
            Console.WriteLine("You enter a word and give it a description. Then you can look up that word.");
            Hashtable myhashtable = new Hashtable();
            bool endadd = false;
            while (!endadd) //created a loop for continous input 
            {
                Console.WriteLine("");
                Console.WriteLine("List an item that interest you? ");
                string name = Console.ReadLine();
                Console.WriteLine("Now give it a description: ");
                string description = Console.ReadLine();
                myhashtable.Add(name, description);
                Console.Write("Press 'e' to move to the next step, or press any other key to enter a new pair: ");
                if (Console.ReadLine() == "e") //exit first loop
                {
                    endadd = true; //Added to change endApp to True to exit
                }
                Console.Clear();
            }
            bool endapp = false;
            while (!endapp)//created loop for continous searches
            {
                Console.WriteLine("Enter a name of an item: ");
                string names = Console.ReadLine();
                string descrip = (string)myhashtable[names];
                if (descrip == null)//catch if someone ask for non-exsistent description
                {
                    Console.WriteLine("We couldn't find that description.");
                }
                Console.WriteLine(descrip);
                Console.Write("Press 'e' then Enter to close the app, or press any other key to continue: ");
                if (Console.ReadLine() == "e")
                {
                    endapp = true; //Added to change endApp to True to exit
                }
            }
            Console.WriteLine("");
            Console.WriteLine("Enjoy your day!");

        }
    }
}
