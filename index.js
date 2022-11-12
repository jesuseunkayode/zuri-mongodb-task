const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const MongoClient = require('mongodb').MongoClient;
const connectionString = 'mongodb://localhost:27017/todoapp';
const client = new MongoClient((connectionString), {
    useNewurlParser: true,
    useUnifiedTopology: true
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Get all todos
app.get('/todos', (request, response) => {
   client.connect((err, connectedClient) => {
     if(err) return response.status(500).json({message: err});
     const db = connectedClient.db();
     db.collection('todos').find({}).toArray((err, result) => {
        if(err) return response.status(500).json({message: err});
        return response.status(200).json({message: result}); 
     })
   })
    
})

//Add a single todo to todos
app.post('/todos', (request, response) => {
     client.connect((err, connectedClient) => {
        if(err) return response.status(500).json({message: err});
        const db = connectedClient.db();
        db.collection('todos').insertOne({
            title: request.body.title,
            description: request.body.description,
            timestamp: request.body.timestamp
        }, (err, result) => {
            if(err) return response.status(500).json({message: err});
            return response.status(200).json({message: "New todo task has been added"});
        })
     })
    
});


//Update a single todo
app.put('/todos/:id', (request, response) => {
    client.connect((err, connectedClient) => {
        if(err) return response.status(500).json({message: err});
        
        // const found = todos.some(todo => todo.id === parseInt(request.params.id))
        // if(found){
        //     const updatedTodo = request.body;
        //     todos.forEach(todo => {
        //         if(todo.id === parseInt(request.params.id)){
        //             todo.title = updatedTodo.title
        //             todo.description = updatedTodo.description
        //             todo.timestamp = updatedTodo
        //         }
                
        //     })
        // } 

        
        const db = connectedClient.db();
        db.collection('todos').update({
        

        }, (err, result) => {
            if(err) return response.status(500).json({message: err});
            return response.status(200).json({message:`You have updated your todo with id ${request.params.id}`});
        })
    })
})



//Delete a single todo







app.listen(PORT, () => {
    console.log(`The server is up and running on port ${PORT}`);
})