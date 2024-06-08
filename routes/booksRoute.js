import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();
  
router.post("/", async (require, response) => {
    try {
      if (
        !require.body.title ||
        !require.body.author ||
        !require.body.publishYear
      ) {
        return response.status(400).send({
          message: "Send all required fields: title, author, publishYear",
        });
      }
      const newBook = {
        title: require.body.title,
        author: require.body.author,
        publishYear: require.body.publishYear,
      };
  
      const book = await Book.create(newBook);
      return response.status(201).send(book);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
  router.get("/", async (require, response) => {
    try {
      const books = await Book.find({});
      return response.status(200).json({
        count: books.length,
        data: books,
      });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
  router.get("/:id", async (require, response) => {
    try {
      const { id } = require.params;
  
      const book = await Book.findById(id);
  
      return response.status(200).json(book);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
  router.put("/:id", async (require, response) => {
    try {
      if (
        !require.body.title ||
        !require.body.author ||
        !require.body.publishYear
      ) {
        return response.status(400).send({
          message: "Send all required fields: title, author, publishYear",
        });
      }
  
      const  { id } = require.params;
  
      const result = await Book.findByIdAndUpdate(id, require.body);
  
      if (!result) {
          return response.status(404).json({ message: 'Book not found'});
      }
  
      return response.status(200).send({ message: 'Book is updated successfully!' });
  
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
  router.delete('/:id', async (require, response) => {
      try {
        const { id } = require.params;
    
        const result = await Book.findByIdAndDelete(id);
    
        if (!result) {
          return response.status(404).json({ message: 'Book not found' });
        }
    
        return response.status(200).send({ message: 'Book deleted successfully' });
      } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
      }
    });

    export default router;