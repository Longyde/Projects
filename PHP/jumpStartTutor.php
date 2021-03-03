<?php
  //start mainline
  // This program is a guide to jump start a car... But its purpose is to show functions and order of operation
  
  printf("\tWelcome to jumpstarting your car.");
  
  getmaterials();
  donGear();
  attachcables();
  {
    printf("\n start good car");
    sleep(3);
    printf("\n wait 5 minutes");
    sleep(10);
    printf("\n start weak car");
  }
  removecables();
  {
     printf("\n remove gloves");
     printf("\n remove glasses");
     sleep(5);
  }
  
  sleep(5);
  returnmaterials();
  printf("\n Congrats on jumpstarting your car!!!");
  
  
  fscanf(STDIN, "%s", $buster);
  //end mainline
  function getmaterials()
  {
    getcar();
    printf("\n Grab the following: ");
    sleep(3);
    printf("\n Get cables");
    sleep(3);
    printf("\n Get gloves");
    sleep(3);
    printf("\n Get glasses");
    sleep(3);
    printf("\n Now we put the gear on.");
    sleep(5) ;
  }
  function donGear()
  {
    printf("\n Don the glasses");
    sleep(3);
    printf("\n Don the gloves");
    sleep(5);
    
  }
  function getcar()
  {
    printf("\n Put the car in park.");
    sleep(5);
    printf("\n Remove the keys from the ignition.");
    sleep(5);
    printf("\n Now we get the safety gear.");
    sleep(5);
    
  }
  function attachcables()
  {
    printf("\n Attach + good cable");
    sleep(3);
    printf("\n Attach + weak cable");
    sleep(3);
    printf("\n Attach - good cable");
    sleep(3);
    printf("\n Attach - weak cable");
    sleep(5);
  }
  function removecables()
  {
    printf("\n remove - good cable");
    sleep(3);
    printf("\n remove - weak cable");
    sleep(3);
    printf("\n remove + good cable");
    sleep(3);
    printf("\n remove + weak cable");
    sleep(5);
  }
  function returnmaterials()
  {
    printf("\n Return car");
    sleep(3);
    printf("\n Return cables");
    sleep(3);
    printf("\n Return glasses");
    sleep(3);
    printf("\n Return car");
    sleep(5);
  }  
  
  
?>

