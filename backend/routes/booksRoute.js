import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// Route for Add a new Book
router.post("/", async (request, response) => {
    try {
        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(400).send({
                message: 'Require all fields: title, author, publishYear'
            });
        }

        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };

        const book = await Book.create(newBook);

        return response.status(200).send(book);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });       
    }
});

// Route for GET all Books from database
router.get("/", async (request, response) => {
    try {
        const books = await Book.find({});
        
        return response.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for GET One Book from database by id.
router.get("/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const book = await Book.findById(id);
        
        if (!book) {
            return response.status(404).send({ message: "Book not found!" });
        }

        return response.status(200).json(book);
        
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for Update a Book
router.put("/:id", async (request, response) => {
    try {
        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(400).send({
                message: "Require all fields: title, author, pulishYear"
            });
        }

        const { id } = request.params;

        const result = await Book.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: "Book not found" });
        }

        return response.status(200).json({ message: `Successfully Updated: ${result.title}` });
        
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for delete a book
router.delete("/:id", async (request, response) => {
    try {
        const { id } = request.params;

        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).send({ message: "Book not found" });
        }

        return response.status(200).json({ message: `Successfully Deleted: ${result.title}` });
        
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;