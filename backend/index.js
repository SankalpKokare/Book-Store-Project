import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from './models/bookModel.js'

const app = express();

//Middleware for parsing request body
//change content-type=application/json
app.use(express.json());

app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send('Welcome to MERN Stack tutorial');
})

//Route to save a new book
app.post('/books', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({
                message: 'Send all required fields: title, author, publishYear'
            });
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        }

        //save book
        const book = await Book.create(newBook);

        return res.status(201).send(book);

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

//ROute for get all books from database

app.get('/books', async (req, res) => {
    try {
        const books = await Book.find({});
        //return res.status(200).json(books);
        return res.status(200).json({
            count: books.length,
            data: books
        })

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

//get book by id 
app.get('/books/:id', async (req, res) => {
    try {

        const { id } = req.params;
        const book = await Book.findById(id);
        //return res.status(200).json(books);
        return res.status(200).json(book);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

//Route for update a book
app.put('/books/:id', async (req, res) => {

    try {

        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({
                message: 'Send all required fields: title, author, publishYear'
            });
        }

        const { id } = req.params;

        const result = await Book.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(404).json({ message: 'Book not found' });
        }

        return res.status(200).send({ message: 'Book updated successfully ' })

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }

})

//Delete book 
app.delete('/books/:id', async (req, res) => {

    try {

        const { id } = req.params;

        const result = await Book.findByIdAndDelete(id);

        if (!res) {
            return res.status(404).json({ message: 'book not found' })
        }

        return res.status(200).send({ message: 'Book deleted successfully' })

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})

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