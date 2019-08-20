const express = require('express')

const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/asigment_db");
mongoose.connection.once('open', function(){
    console.log('Connection sucsesful')

}).on('error', function (error){
    console.log('Connection error', error)
})

const app = express();
const port = 3005;

app.listen(port, () => console.log(`Listening to port ${port}`))
