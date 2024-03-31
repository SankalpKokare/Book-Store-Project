import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from './Routes/booksRoute.js';
import cors from 'cors'

const app = express();

//Middleware for parsing request body
//change content-type=application/json
app.use(express.json());

//method 1
//app.use(cors());

//method 2
app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
)

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