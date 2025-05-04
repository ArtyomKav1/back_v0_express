import express, { Request, Response } from 'express'
import { academyRouter, v1Router } from './routes/academy-router'
import { runDb } from './repositiries/db'
import cors from 'cors'

const app = express()

const port = process.env.PORT || 3000

app.use(cors({
    origin: 'http://localhost:5173', // Укажите адрес вашего фронтенда
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(cors({
    origin: 'http://localhost:5174', // Укажите адрес вашего фронтенда
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json())

// const dataT = [
//     {
//         id: 1,
//         dateCreate: "12:43",
//         inform: {
//             email: 'dsfsdf@gmai.com',
//             name: 'art',
//             Post: 'stud'
//         }
//     },
//     {
//         id: 2,
//         dateCreate: "12:43",
//         inform: {
//             email: 'dsfsdf@gmai.com',
//             name: 'art',
//             Post: 'stud'
//         }
//     },
//     {
//         id: 3,
//         dateCreate: "12:43",
//         inform: {
//             email: 'dsfsdf@gmai.com',
//             name: 'art',
//             Post: 'stud'
//         }
//     }
// ]

app.use('/academy', academyRouter)
app.use('/v1', v1Router)


app.get('/', (req: Request, res: Response) => {
    res.send('Hello from Academy Server!');
});


const startApp = async () => {
    await runDb()
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}


startApp()





