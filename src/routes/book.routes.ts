import { Router } from 'express'
import { createBook, getBooks, getBook, updateBook, deleteBook } from '../controllers/book.controller'
import { checkCache } from '../utils/cache'



const router = Router()



router.get('/', getBooks)
router.get('/:id', checkCache, getBook)
router.post('/', createBook)
router.put('/:id', updateBook)
router.delete("/:id", deleteBook)



export default router