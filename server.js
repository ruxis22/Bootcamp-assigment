import './utils/dotenv';
import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import mongo from 'connect-mongo';
import bodyParser from 'body-parser';
import cors from 'cors';

import authenticate from './middlewares/authenticate';
import authRouter from './routes/auth';
import user from './routes/user'
import media from './routes/media';
import index from './routes/index';

const app = express();
const MongoStore = mongo(session);
mongoose.Promise = global.Promise; // YOU MISS THIS LINE - I see now... Looked up what it dose...
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.once('open', function () {
    console.log('Connection sucsesful')

}).on('error', function (error) {
    console.log('Connection error', error)
})
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({
      url: process.env.MONGODB_URI,
      autoReconnect: true,
    }),
  }),
);

app.use('/uploads', express.static('uploads'));


app.use(`/api/v${process.env.API_VERSION}/auth`, authRouter);
app.use(`/api/v${process.env.API_VERSION}/users`, authenticate, user);

app.use(`/api/v${process.env.API_VERSION}/media`, authenticate, media);
app.use(`/api/v${process.env.API_VERSION}`, index);
const port = process.env.PORT || process.env.HOST_PORT;


app.listen(port, () => console.log(`Listening to port ${port}`))