import './utils/dotenv';
import express from 'express';
import mongoose from 'mongoose';

mongoose.Promise = global.Promise; // YOU MISS THIS LINE
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.once('open', function () {
    console.log('Connection sucsesful')

}).on('error', function (error) {
    console.log('Connection error', error)
})



const app = express();
const port = 3005;

app.listen(port, () => console.log(`Listening to port ${port}`))
