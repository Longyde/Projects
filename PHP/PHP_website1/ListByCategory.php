<html>
  <head>
  <title>List by Category - Phonebook</title>
   <link rel="stylesheet" href="phone.css">
  </head>
  <body>
  <h1>List by Category</h1><br>
  <form action="ListByCategorySubmit.php">
  <a href="index.php"><strong>Home</strong></a> &nbsp&nbsp&nbsp&nbsp
  <a href="AddContact.php"><strong>Add Contact</strong></a> &nbsp&nbsp&nbsp&nbsp
  <a href="ListAllContacts.php"><strong>List all Contacts</strong></a> &nbsp&nbsp&nbsp&nbsp
  <a href="ListByCategory.php"><strong>List by Category</strong></a> <br>
  <br><img src="phone.jpg" /><br><br>
  
  <br>Category: &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp  <select name="category">
              <option>Friend</option>
              <option>Family</option>
              <option>Enemy</option>
              <option>secret</option>
              <option>Work</option>
              <option>Other</option>
            </select> <br>
            <br>
    <input type="submit" >
    </form> 
  </body>

</html> 