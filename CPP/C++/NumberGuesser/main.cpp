#include <iostream>


using namespace std;
//Convert string to uppercase
void convert (string& s)
{
    for(int i = 0; i < s.length(); i++)
    {
        s[i] = toupper(s[i]);
    }
};
int main()
{

    string name;
    char next;
    int maxx = 100;
    int minn = 1;
    cout << "Welcome to my number guesser!" << endl << "What is your name? ";
    cin >> name;
    convert(name);
    cout << "So " + name << ", you're job is to think of a number and I will guess it!"<< endl;
    cout << "I need you to press (H) if my guess need to be higher or (L) if my guess needs to be lower! or (R) if I guess it!"<< endl;
    cout << "Pick a number between 1 and 100." << endl;
    int guess = 50;
    start:
    cout << "My guess is " << guess << " (H) (L) (R)" << endl;
    while(next != 'r')
    {
        cin >> next;
        if (next == 'h')
    {
        minn = guess;
        guess = (maxx + minn) /2;
        cout << "My guess is " << guess << "(H) for higher (L) for lower (R) for right" << endl;
    }
    else if (next == 'l')
    {
        maxx = guess;
        guess = (maxx + minn) /2;
        cout << "My guess is " << guess << " (H) for higher (L) for lower (R) for right" << endl;
    }
    else
    {
        cout << "Why must you try to break things?" << endl << "You must use (H) for higher (L) for lower (R) for right";
        goto start;
    }
    }

    cout << "Yeah buddy, I did it!" << "I knew it was " << guess +1 << endl;
    return 0;
}
