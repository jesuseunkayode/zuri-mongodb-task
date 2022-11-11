const express = require('express');
const todos = require('./data.js');
const app = express();
const PORT = process.env.PORT || 4000;
const MongoClient = require('mongodb').MongoClient;
const connectionString = 'mongodb://localhost:27017/m001-student';
const client = new MongoClient((connectionString), {
    useNewurlParser: true,
    useUnifiedTopology: true
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Get all todos
app.get('/todos', (request, response) => {
   client.connect((err, connectedClient) => {
     if(err) return response.status(500).json({message: err});
     const db = connectedClient.db();
     db.collection('books').find({}).toArray((err, result) => {
        if(err) return response.status(500).json({message: err});
        return response.status(200).json({message: result}) 
     })
   })
    
})

//Add a single todo to todos
app.post('/todos', (request, response) => {
    const newTodo = {
        id : request.body.id,
        title: request.body.title,
        description: request.body.description,
        timestamp : request.body.timestamp
    }
    todos.push(newTodo);
    let stringedTodo = JSON.stringify(todos);
    fs.appendFile('./data.js', stringedTodo, todos, (err) => {
        if(err) {
            return response.status(500).json({message: err})
        }  
    }) 
    return response.status(200).json({message: `New task added successfully`})
});



//Update a single todo

//Delete a single todo







app.listen(PORT, () => {
    console.log(`The server is up and running on port ${PORT}`);
})