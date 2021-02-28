<?php
  $age = 0;
  $cash ="";
  $minor = "";
  
  echo("Welcome to my Console based old enough to buy alcohol app.\n ");
  echo("\n Please enter your age: " );
  fscanf(STDIN,"%d", $age);
  
  echo("\n Do you have enough money to buy? (Y//N): " );
  fscanf(STDIN,"%s", $cash);
  $cash1 = strtoupper($cash);
  if($age >= 21 and ($cash1 == "Y"))
  {
	  echo("\n Congratulations, you can buy the Booze! Be responsible!\n");
	  echo("\n Are you planning on selling or sharing with minors? (Y/N): ");
	  fscanf(STDIN, "%s", $minor);
	  $minor1 = strtoupper($minor);
	  if($minor1 == "Y")
	  {
  	  echo("\n That's not okay. You are banned from buying alcohol now!");
	  }
	  else
	  {
  	  echo("\n Good answer! Enjoy your day.");
	  }
  }
  else
  {
	  echo("\n You cannot buy alcohol!\n");
  }
  echo("\nPress any key to exit...");
  fscanf(STDIN, "%s", $buster);
?>