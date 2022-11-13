const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const connectionString = 'mongodb://localhost:27017/todoapp';
const client = new MongoClient((connectionString), {
    useNewurlParser: true,
    useUnifiedTopology: true
});



//Get all todos
router.get('/todos', (request, response) => {
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
 router.post('/todos', (request, response) => {
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
 router.put('/todos/:id', (request, response) => {
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
         db.collection('todos').findOneAndUpdate({
 
         }, (err, result) => {
             if(err) return response.status(500).json({message: err});
             return response.status(200).json({message:`You have updated your todo with id ${request.params.id}`});
         })
     })
 })
 
 
 
 //Delete a single todo
 
 router.delete('/todos/:id', (request, response) => {
     client.connect((err, connectedClient) => {
        if(err) return response.status(500).json({message: err});
        const db = connectedClient.db();
        db.collection('todos').deleteOne({
         title: request.body.title,
         description: request.body.description,
         timestamp: request.body.timestamp
           
         }, (err, result) => {
            if(err) return response.status(500).json({message: err});
          response.status(200).json({message: `Deleted todo id ${request.params.id}`});
        })
     })
    
 });
 
 
 
 
 
 
 





module.exports = router;