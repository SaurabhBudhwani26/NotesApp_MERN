const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://budhwanisaurabh:9218saur@cluster0.qgqojhi.mongodb.net/"


const connectToMongo = () =>{
    mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log("Mongoose sucesssfully connected")
}

module.exports = connectToMongo;