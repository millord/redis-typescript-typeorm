import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import bookRoutes from './routes/book.routes'
import { createConnection } from 'typeorm'


const app = express()
createConnection()

// middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())


// routes 

app.use("/api/v1/books", bookRoutes)


app.listen(3000, () => {
  console.log(`Server running on port 3000`)
})