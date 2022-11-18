import express, { json, urlencoded } from 'express'
import dotenv from 'dotenv'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import MongoStore  from 'connect-mongo'

import sessionRoute from './routes/session.route.js'
import indexRoute from './routes/index.route.js'

dotenv.config();


const app = express();
const PORT = process.env.PORT || 4000;

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }


app.use(session({
    secret: process.env.KEY_SESSION,
    store: MongoStore.create({
        mongoUrl: process.env.MONGOATLAS_URL,
        mongoOptions: advancedOptions,
    }),
    resave: true, 
    saveUninitialized: true,
    cookie: {
        maxAge: 10 * 60
    }
}));

app.use(cookieParser(process.env.KEY_COOKIE));
app.use(json());
app.use(urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.use('', indexRoute)
app.use('/session', sessionRoute);


const server = app.listen(PORT, () => {
    console.log(`listen in http://localhost:${server.address().port}`);
});
