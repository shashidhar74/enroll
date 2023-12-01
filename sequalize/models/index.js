const { Sequelize } = require('sequelize');
const express = require('express');
const BooksModel = require('./Books');
const bodyParser = require('body-parser');
const{Book}=require('./Books')
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3001;
app.use(cors());
// Create a Sequelize instance
const sequelize = new Sequelize('Sequalize_db', 'postgres', 'root', {
  host: 'localhost',
  dialect: 'postgres',
});
const Books = BooksModel(sequelize);
app.use(bodyParser.json());

const syncDatabase=async()=>{
  try{
    await Books.sync();
    console.log("The table for the User model was just created!");
  }catch{
    console.error("Error syncing database:", error);
  }
}

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.post('/api/add-book',async(req,res)=>{
  try{
    const{bookname,authour_id,authour_name}=req.body;
    const newBook=await Books.create({
      bookname,
      authour_id,
      authour_name
    });
    res.status(201).json(newBook);
  }catch(error){
    console.error('Error adding book:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

app.get('/api/get-books', async (req, res) => {
  try {
    const allBooks = await Books.findAll();
    res.status(200).json(allBooks);
  } catch (error) {
    console.error('Error getting books:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/delete-book/:bookname', async (req, res) => {
  const { bookname } = req.params;

  try {
    const existingBook = await Books.findOne({ where: { bookname } });

    if (!existingBook) {
      return res.status(404).json({ error: 'Book not found' });
    }
    await existingBook.destroy();

    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/api/get-book-details/:bookname', async (req, res) => {
  const { bookname } = req.params;
  try {
    const bookDetails = await Books.findOne({ where: { bookname } });

    if (!bookDetails) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.status(200).json(bookDetails);
  } catch (error) {
    console.error('Error getting book details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/update-book/:bookname', async (req, res) => {
  const { bookname } = req.params;
  const updatedData = req.body; // Assuming the updated data is sent in the request body

  try {
    const existingBook = await Books.findOne({ where: { bookname } });

    if (!existingBook) {
      return res.status(404).json({ error: 'Book not found' });
    }
    await existingBook.update(updatedData);
    const updatedBook = await Books.findOne({ where: { bookname } });
    res.status(200).json(updatedBook);
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


syncDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to synchronize with the database:', error);
  });