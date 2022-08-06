const { Book } = require('../models');
const { Op } = require('sequelize');

const booksV1Controller = {
    showAllBooks: async (req, res) => {
        try{
            const books = await Book.findAll();

        return res.status(200).json(books);
    } catch(error) {
        if (error.name === "SequelizeConnectionRefusedError"){
          new Error(error.message = 'server down!');
          return res.status(500).json(error.message);
        }
    }
    },
    showOneBook: async (req, res) => {
        try{
        const {id} = req.params;

        const book = await Book.findByPk(id, {raw: true});

        if(!book ) {
            return res.status(400).json({error: true, message: "Don't search a book!"})
        }
        
        return res.status(200).json(book);

    } catch(error) {

        if (error.name === "SequelizeConnectionRefusedError"){
            new Error(error.message = 'server down!');
            return res.status(500).json(error.message);
        }
    }
    },
    createABook: async (req, res) => {
        try {
        const {title, total_pages, author, release_year, stock} = req.body;

        const verifyBookExists = await Book.findOne({where: {[Op.and]: [{title}, {author}]}})

        if(verifyBookExists){
            return res.status(422).json("Book already exists!")
        }

        const book = await Book.create({title, total_pages, author, release_year, stock})

        return res.status(201).json(book);
        } catch(error) {
            
                if (error.name === "SequelizeConnectionRefusedError"){
                new Error(error.message = 'server down!');
                return res.status(500).json(error.message);
            }
        }
    },
    updateABook: async (req, res) => {
        // try{
        //     const {id} = req.params;
        //     const {title, total_pages, author, release_year, stock} = req.body;
            
        //     const bookUpdated = {title, total_pages, author, release_year, stock};
        //     console.log(bookUpdated);

        //     const book = await Book.findByPk(id);

        // if(book) {
        //     await Book.update({title, total_pages, author, release_year, stock}, {where: {id}});

        //     return res.status(200).json();
        // }
        // return res.status(404).json("The book not found!");
        // } catch (errOR) {
        //     if (error.name === "SequelizeValidationError"){
        //         new Error(err.message = 'invalid field');
        //         return res.status(400).json(error.message);

        //     } 
        //     if (error.name === "SequelizeConnectionRefusedError"){
        //         new Error(err.message = 'server down!');
        //         return res.status(500).json(error.message);
        //     }
        // }
        try {
            const { id } = req.params;

            const { title, total_pages, author, release_year, stock } = req.body;

            const verifyBookExists = await Book.findByPk(id);
            if(!verifyBookExists) {
                return res.status(404).json("Livro não encontrado");
            }

            await Book.update({title, total_pages, author, release_year, stock}, {where: {id}});

            const book = await Book.findByPk(id);

            return res.status(200).json(book);

        } catch(error) {
            console.log(error);
        }

    },
    destroyABook: async (req, res) => {
        try {
            const {id} = req.params;

            const book = await Book.findByPk(id)

            if(book) {
                await Book.destroy(id);

                return res.statys(200).json(`The Book: ${book.titulo}, was removided!`);
            }

            return res.status(400).json("the book not found!")
        } catch(error) {
            if (error.name === "SequelizeValidationError"){
                new Error(err.message = 'invalid field');
                return res.status(400).json(error.message);

            } 
            if (error.name === "SequelizeConnectionRefusedError"){
                new Error(err.message = 'server down!');
                return res.status(500).json(error.message);
            } 
        }
    }

}

module.exports = booksV1Controller;