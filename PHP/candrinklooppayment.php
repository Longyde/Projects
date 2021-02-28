<?php

$age = 0;
$cash = "x";
$debit = "x";
$old = 21;
a: // a place holder to send the program back to this spot from different locations
echo("\n\t Welcome to the revised buying alcohol. A little more dynamic."); //The title introduction
echo("\n Enter your name: ");
fscanf(STDIN, "%s", $name); //This is the users name
if (ctype_alpha($name) != $name) //to ensure the user is entering a legit name (alphabet based)
{
 echo("\nPlease use a correct name!\n");
 sleep(2); 
 echo("\nLet's try this again\n"); 
 sleep(3);
 goto a; 
}

$name1 = strtoupper($name); //This converts the users name to all caps
echo("\n Hello $name1, Please enter your age or press (0) to exit: ");
fscanf(STDIN, "%d", $age);
if (is_numeric($age) != $age) //this ensures the user is entering numbers only. if $age is not == numbers, it restarts program from a:
{
  if($age == 0)// This is added incase user wants to exit immediatly
  {
      echo("Have a good one!");
  sleep(3);
  exit();
  }
  echo("\nPlease enter a valid, whole number. eg (1,2,3...) \n");
  sleep(2);
  echo("\nLet's try this again\n"); 
  sleep(3);
  goto a;
 }
try //to try and catch unknown errors
	{
  while($age != 0)// This creates a loop to ensure that the user MUST press (0) to exit.
  {
    echo("\n $name1, you are $age years old.");
	  printf("\n Do you have enough money to buy alcohol?: (Y/N): ");
    fscanf(STDIN, "%s", $cash);
    $cash1 = strtoupper($cash); //This is to set the one letter response to caps to keep the program runnable
	
    if ( $age >= 21 AND $cash1 == "Y") //checks to see if the user has cash and is over 21
  	{
  		echo("\n $name1, $age is legally old enough to buy Booze. One more question!");
  		sleep(5);
  	  echo("\n Are you planning on selling or sharing this alcohol with minors? (Y/N): ");
  	  fscanf(STDIN, "%s", $minor);
  	  $minor1 = strtoupper($minor);
  	  if($minor1 == "Y") //
  	  {
    	  echo("\n That's not okay. You are banned from buying alcohol now!");
    	  sleep(3);
      	echo("\nProgram restarting...\n");
      	sleep(5);
  	  }
  	  else
  	  {
    	  echo("\n Good answer! Enjoy your Booze and have a good day.");
    	  sleep(3);
      	echo("\nProgram restarting...\n");
      	sleep(5);
  	  }
  	}
  	else
  	{
    	if($cash1 == "N")
    	{
      	if ($age <21 and $cash1 == "N")
    	  {
      	  $diff = $old - $age;
      	  echo("\n$name1, You are not only too young by $diff year(s), but you're broke! You get No Booze.\n ");
      	  sleep(3);
      	  echo("\nProgram restarting...\n");
      	  sleep(3);
      	  goto a;
    	  }
      	echo("\n$name1, you need money to buy alcohol.\n");
      	sleep(3);
      	echo("\nProgram restarting...\n");
      	sleep(3);
      	goto a;
    	}
    		$diff = $old - $age;
  		printf("\n $name1, $age years old is too young. Come back in $diff year(s) and bring money. No Booze for you today.");
  		sleep(3);
      echo("\nProgram restarting...\n");
      sleep(5);
  	}
  	goto a;
   }
   throw new Exception();
 }
   catch (Exception $e)
   {
    echo("\n Soemthing went wrong. Please try again. \n"); 
    goto a;
   }

?>