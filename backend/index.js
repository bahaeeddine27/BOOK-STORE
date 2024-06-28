import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js"
import cors from 'cors';

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling Cors Policy
// Option 1: Allow all Origins with Default of Cors
app.use(cors());

// Option 2: Allow Custom Origins
//app.use(
//    cors({
//        origin: 'http://localhost:3300',
//        methods: ['GET', 'POST', 'PUT', 'DELETE'],
//        allowedHeaders: ['Content-Type'],
//    })
//);

app.get('/', (req, res) => {
    console.log(req);
    return res.status(200).send('Welcome To Backend');
});

app.use('/books', booksRoute)

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT || 3000, () => { 
            console.log(`App is listening to port: ${PORT || 3000}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });