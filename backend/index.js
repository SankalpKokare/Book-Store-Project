import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from './models/bookModel.js'
import booksRoute from './Routes/booksRoute.js';

const app = express();

//Middleware for parsing request body
//change content-type=application/json
app.use(express.json());

app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send('Welcome to MERN Stack tutorial');
})

app.use('/books', booksRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        //connect only when connected to mongoose
        app.listen(PORT, () => {
            console.log(`App is listening to ${PORT}`)
        });
    })
    .catch((error) => {
        console.log(error);
    })