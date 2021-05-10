<html>
  <head>
  <title>List by Category - Phonebook</title>
   <link rel="stylesheet" href="phone.css">
  </head>
  <body>
  <h1>All <?php $category = $_GET["category"]; printf("%s",$category); ?> Contacts in Phonebook</h1><br>
  
  <a href="index.php"><strong>Home</strong></a> &nbsp&nbsp&nbsp&nbsp
  <a href="AddContact.php"><strong>Add Contact</strong></a> &nbsp&nbsp&nbsp&nbsp
  <a href="ListAllContacts.php"><strong>List all Contacts</strong></a> &nbsp&nbsp&nbsp&nbsp
  <a href="ListByCategory.php"><strong>List by Category</strong></a> <br>
  <br><img src="phone.jpg" /><br><br>
  <?php
  
    $category = $_GET["category"];
    if($db = open('phonebook.db',0666, $sqlliteerror))
    {
      $query = query($db,"SELECT name,category,number FROM contacts WHERE category='$category'");
      $results = fetchArray($query, SQLITE_ASSOC);
      
      foreach($results as $result)
      {
        printf("<strong>C</strong>ontact Name: <em>%s</em> <br>&nbsp&nbsp Relationship category: %s <br>&nbsp&nbsp&nbsp&nbspPhone number <strong>%s</strong> <br />", $result['name'],$result['category'], $result['number']);
      }
    }
    else
    {
      die($sqlliteerror);
    }
  ?>
  </body>
</html> 