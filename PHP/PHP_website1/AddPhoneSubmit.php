<html>
  <head>
  <title>Add Phone Submit - Phonebook</title>
   <link rel="stylesheet" href="phone.css">
  </head>
  <body>
  <h1>Add to Phone book</h1>
  <a href="index.php"><strong>Home</strong></a> &nbsp&nbsp&nbsp&nbsp
  <a href="AddContact.php"><strong>Add Contact</strong></a> &nbsp&nbsp&nbsp&nbsp
  <a href="ListAllContacts.php"><strong>List all Contacts</strong></a> &nbsp&nbsp&nbsp&nbsp
  <a href="ListByCategory.php"><strong>List by Category</strong></a> <br>
  <br><h2><?php $name = $_GET["name"]; Printf("%s",$name);?> was added as Contact</h2><br>
  <br><img src="gtg.png" /><br><br>
  <?php
    $name = $_GET["name"];
    $category = $_GET["category"];
    $number = $_GET["number"];
    
    if($db = sqlite_open('phonebook.db',0666, $sqlliteerror))
    {
      sqlite_query($db,"INSERT INTO contacts Values('$name','$category','$number')");
    }
    else
    {
      die($sqlliteerror);
    }
  ?>
  </body>

</html> 