const express = require('express');
const app = express();
const todoRouter = require('./routes/todo.js');


app.use(todoRouter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`The server is up and running on port ${PORT}`);
})