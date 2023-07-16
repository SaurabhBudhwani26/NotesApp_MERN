const connectToMongo = require("./DB")
const express = require('express');

connectToMongo();

const app = express();
const port = 5000;

app.use(express.json())
//Available Routes
app.use('/auth', require('./routes/auth'))
app.use('/notes', require('./routes/notes'))

app.listen(port, ()=>{
    console.log(`app listening at localhost:${port}`)
})