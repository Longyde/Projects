<?php
 $loan = 0;
 printf("\t Welcome to my simple loan calculator!");
 printf("\n This calculator will tell you what amount your initial deposit will be.");
 a:
 printf("\n Enter loan amount: ");
 fscanf(STDIN, "%d", $loan);
 if(is_numeric($loan) != $loan) //Prevents letter inputs
 {
   printf("Please use numbers!");
   goto a;
 }
 
 
 if ($loan < 25000)
 {
	 $deposit = $loan * 0.05;
 }
 if ($loan >= 25000 AND $loan <50000)
 {
	 $deposit = 1250 + ($loan - 25000) * 0.10;
 }
 if ($loan >= 50000 AND $loan <100000)
 {
	 $deposit = 5000 + ($loan - 50000) * 0.25;
 }
 if ($loan > 100000)
 {
	 printf("\n Loans in excess of $100,000 are not allowed.");
 }
 
printf("\n Your deposit amount is: $%.2f", $deposit);
printf("\n Press any key to exit...");
  fscanf(STDIN, "%s", $buster); // 
?>