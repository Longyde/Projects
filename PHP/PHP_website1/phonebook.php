<html>
  <head>
  <title>Phonebook</title>
   <link rel="stylesheet" href="phone.css">
  </head>
  <body>
  Home page<br>
  
  <a href="index.php">Home</a> <br>
  <a href="AddContact.php">Add Contact</a> <br>
  <a href="ListAllContacts.php">List all contacts</a> <br>
  <a href="ListByCategory.php">List by category</a> <br>
   <?php
    if($db = sqlite_open('phonebook.db',0666, $sqlliteerror))
    {
      sqlite_query($db, 'drop table contacts');
      sqlite_query($db, 'create table contacts(name varchart(30),category varchart(20),number varchart(20))');
      printf("database created");
    }
    else
    {
      die($sqlliteerror);
    }
  ?>
  </body>
</html> 