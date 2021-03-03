<?php

  printf("\t Welcome to how to invest where you will learn how to invest.");
  a:
  echo("\n Enter your name: ");
  fscanf(STDIN, "%s", $name); //This is the users name
  if (ctype_alpha($name) != $name) //to ensure the user is entering a legit name (alphabet based)
  {
    echo("\n Please use a correct name!\n");
    sleep(2); 
    echo("\n Let's try this again\n"); 
    sleep(3);
    goto a; 
  }
  $name1 = strtoupper($name);
  printf("\n Alright, $name1, let us begin.");
  sleep(3);
  echo "\n\t Step 1 - Research the stocks.";
  sleep(4);
  ResearchStocks();
  sleep(4);
  echo "\n\t Step 2 - Research a brokerage account.";
  sleep(4);
  ResearchBroker();
  sleep(4);
  echo "\n\t Step 3 - Get a tarding account.";
  sleep(4);
  GetAccount();
  sleep(4);
  echo "\n\t Step 4 - Time to Invest.";
  sleep(4);
  Invest();
  sleep(4);
  echo "\n\t CONGRATULATIONS ON INVESTING!!!";
  echo "\nPRESS ANY KEY TO EXIT...";
  
  fscanf(STDIN, "%s", $buster); // prevents console from closing

  //End mainline
  
  function ResearchStocks()
  {
    echo "\n Research the industry you want to invest in.";
    sleep(4);
    echo "\n Research the companies you want to invest in.";
    sleep(4);
    echo "\n Research stock terms.";
    sleep(4);
    echo "\n Research Options trading.";
  }
  
  function ResearchBroker()
  {
    echo "\n Determine account fees at different brokerage firms.";
    sleep(4);
    echo "\n Research the trading stipulations at the different firms.";
    sleep(4);
    echo "\n Determine if they match your strategy for investing.";
    sleep(4);
    echo "\n Research customer service ratings.";
    sleep(4);
    echo "\n Call the brokerage firm.";
    sleep(4);
    echo "\n Look at their online and mobile presence.";
  }
  
  function GetAccount()
  {
    echo "\n Choose the firm you want.";
    sleep(4);
    echo "\n Schedule an appointment or sign-up online";
    sleep(4);
    echo "\n Fill out the appropriate forms and submit documentation as needed.";
    sleep(4);
    DepositFunds();
    sleep(4);
    echo "\n Wait whatever period for confirmation that your new account is ready.";
  }
  
  function DepositFunds()
  {
    echo "\n Set up an ACH transfer from your primary bank.";
    sleep(4);
    echo "\n Know what amount you want to invest";
    sleep(4);
    echo "\n Wait the alotted time for the ACH transfer to clear.";
  }
  
  function Invest()
  {
    echo "\n Log in after 09:30 ET to begin trading.";
    sleep(4);
    echo "\n Choose a stock you want.";
    sleep(4);
    echo "\n Choose the number of shares you want.";
    sleep(4);
    echo "\n Execute the trade.";
  }
  
  
  
  
?>