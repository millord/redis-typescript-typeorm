import { Request, Response } from 'express'
import { Book } from '../entity/Book'
import { getRepository } from "typeorm"

import Redis from 'ioredis'


const redis = new Redis({
  port: 6379
}); // uses defaults unless given configuration object



//  get all books 
export const getBooks = async (req: Request, res: Response): Promise<Response> => {
  try {
    const books = await getRepository(Book).find()
    return res.status(200).json({ success: true, count: books.length, data: books })
  } catch (err) {
    return res.status(400).json({ success: false, msg: err })
  }

}

// create a book
export const createBook = async (req: Request, res: Response): Promise<Response> => {
  try {
    const book = getRepository(Book).create(req.body)
    const newBook = await getRepository(Book).save(book)
    return res.status(201).json({ success: true, data: newBook })
  } catch (err) {
    return res.status(400).json({ success: false, msg: err })
  }
}

// get a single book 
export const getBook = async (req: Request, res: Response): Promise<Response> => {
  try {
    const book = await getRepository(Book).findOne(req.params.id)
    const { id } = req.params
    redis.setex(id, 3600, id)
    return res.status(200).json({ success: true, data: book })
  } catch (err) {
    return res.status(400).json({ success: false, msg: err })
  }
}


// update a book 
export const updateBook = async (req: Request, res: Response): Promise<Response> => {
  try {
    const book = await getRepository(Book).findOne(req.params.id)
    if (!book) {
      return res.status(400).json({ success: false, msg: 'No book found!' })
    }
    getRepository(Book).merge(book, req.body)
    const updatedBook = await getRepository(Book).save(book)
    return res.status(200).json({ success: true, data: updatedBook })


  } catch (err) {
    return res.status(400).json({ success: false, msg: err })
  }
}



// delete  a book 
export const deleteBook = async (req: Request, res: Response): Promise<Response> => {
  try {
    const removeBook = getRepository(Book).delete(req.params.id)
    return res.status(200).json({ success: true, data: {} })
  } catch (err) {
    return res.status(400).json({ success: false, msg: err })
  }
}