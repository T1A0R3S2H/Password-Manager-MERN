const express = require('express')
// const dotenv = require('dotenv')
const { MongoClient } = require('mongodb');
const bodyparser = require('body-parser')
const cors = require('cors')

// dotenv.config()


// Connecting to the MongoDB Client
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);


// App & Database
const dbName = 'passman'
const app = express()
const port = 3000


// const db = client.db(dbName);

// Middleware
app.use(bodyparser.json())
app.use(cors())

client.connect();

// Get all the passwords
app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult).pretty
})

// Save a password
// Save a password
app.post('/', async (req, res) => { 
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    res.send({success: true, result: findResult})
})




// Delete a password by id
app.delete('/', async (req, res) => { 
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
    res.send({success: true, result: findResult})
})


// Update a password
app.put('/', async (req, res) => {
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const updateResult = await collection.updateOne(
      { id: password.id },
      { $set: { site: password.site, username: password.username, password: password.password } }
    );
    res.send({ success: true, result: updateResult });
  });


// Update a password
// app.put('/', async (req, res) => {
//     const db = client.db(dbName);
//     const collection = db.collection('documents');
//     const updateResult = await collection.updateOne(req.body[0], req.body[1]);
//     console.log(`${updateResult.matchedCount} document(s) matched the filter criteria.`);
//     console.log(`Updated ${updateResult.modifiedCount} document(s).`);
//     res.sendStatus(204) // No Content
// })

// Delete a password
// Delete a password by id
// app.delete('/', async (req, res) => {
//     try {
//       const db = client.db(dbName);
//       const collection = db.collection('passwords');
  
//       let deleteResult;
  
//       console.log('Request Body:', req.body); // Log the request body
  
//       // If req.body is an array, use the $or operator to match any document in the array
//       if (Array.isArray(req.body)) {
//         const query = { $or: req.body.map(doc => ({ id: doc.id })) };
//         console.log('Delete Query:', query); // Log the constructed query
  
//         deleteResult = await collection.deleteMany(query);
//       } else {
//         // If req.body is an object, delete the document matching the object
//         console.log('Delete Query:', req.body); // Log the query object
  
//         deleteResult = await collection.deleteMany(req.body);
//       }
  
//       console.log('Delete Result:', deleteResult); // Log the deleteResult object
  
//       if (deleteResult.deletedCount === 0) {
//         console.log('No documents matched the query'); // Log if no documents were deleted
//       }
  
//       res.send({ success: true, result: deleteResult });
//     } catch (err) {
//       console.error('Error deleting documents:', err); // Log any errors
//       res.status(500).send({ error: 'An error occurred while deleting documents' });
//     }
//   });
  







app.listen(port, () => {
    console.log(`PassMan listening on  http://localhost:${port}`)
})