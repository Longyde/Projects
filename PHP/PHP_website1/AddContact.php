<html>
  <head>
  <title>Add Contact - Phonebook</title>
   <link rel="stylesheet" href="phone.css">
  </head>
  <body>
    <form action="AddPhoneSubmit.php">
  <h1>Add Contact</h1><br>
  
  <a href="index.php"><strong>Home</strong></a> &nbsp&nbsp&nbsp&nbsp
  <a href="AddContact.php"><strong>Add Contact</strong></a> &nbsp&nbsp&nbsp&nbsp
  <a href="ListAllContacts.php"><strong>List all Contacts</strong></a> &nbsp&nbsp&nbsp&nbsp
  <a href="ListByCategory.php"><strong>List by Category</strong></a> <br>
  <br>Conact Name: <input name="name" type="text" size="30" placeholder="John Doe" required> <br>
  <br>Category of Contact: &nbsp &nbsp <select name="category" required>
              <option>Friend</option>
              <option>Family</option>
              <option>Enemy</option>
              <option>Secret</option>
              <option>Work</option>
              <option>Other</option>
            </select> <br>
  <br>Contact Phone number: <input name="number" type="text" size="20" placeholder="555-555-5555" required><br>
  
    <br><input type="submit" /><br>
  <br><img src="phone.jpg" />
  <br>
  
    </form>
  </body>
</html> 