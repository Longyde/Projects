<html>
  <head>
  <title>List all Contacts - Phonebook</title>
   <link rel="stylesheet" href="phone.css">
  </head>
  <body>
  <h1>List all Contacts</h1><br>
  
  <a href="index.php"><strong>Home</strong></a> &nbsp&nbsp&nbsp&nbsp
  <a href="AddContact.php"><strong>Add Contact</strong></a> &nbsp&nbsp&nbsp&nbsp
  <a href="ListAllContacts.php"><strong>List all Contacts</strong></a> &nbsp&nbsp&nbsp&nbsp
  <a href="ListByCategory.php"><strong>List by Category</strong></a> <br>
  
  <br><img src="phone.jpg" /><br><br>
  <?php
    if($db = sqlite_open('phonebook.db',0666, $sqlliteerror))
    {
      $query = sqlite_query($db,"SELECT name,category,number FROM contacts");
      $results = sqlite_fetch_all($query, SQLITE_ASSOC);
      
      foreach($results as $result)
      {
        printf("Contact Name: <em>%s</em> <br>&nbsp&nbsp Relationship category: %s <br>&nbsp&nbsp&nbsp&nbspPhone number <strong>%s</strong> <br />", $result['name'], $result['category'], $result['number']);
      }
    }
    else
    {
      die($sqlliteerror);
    }
  ?>
  </body>
</html> 