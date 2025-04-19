import express, { Request, Response } from 'express'
import { academyRouter } from './routes/courses-router'
import { academyCollection, runDb } from './repositiries/db'
import cors from 'cors'

const app = express()

const port = process.env.PORT || 3000

app.use(cors({
    origin: 'http://localhost:5173', // Укажите адрес вашего фронтенда
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// const jsonBodyMiddleware = express.json()
// app.use(jsonBodyMiddleware)



// app.use('/academy', academyRouter)
app.use('/academy', async (req, res) => {
    const result = await academyCollection.findOne({}, { projection: { events: 1, _id: 0 }})
    res.json(result.events);
})
app.use('/courses', async (req, res) => {
    const result = await academyCollection.findOne({}, { projection: { courses: 1, _id: 0 } })
    res.json(result.courses);
})
app.use('/tutors', async (req, res) => {
    const result = await academyCollection.findOne({}, { projection: { tutors: 1, _id: 0 } })
    res.json(result.tutors);
})
app.use('/ignoreDates', async (req, res) => {
    const result = await academyCollection.findOne({}, { projection: { ignoreDates: 1, _id: 0 } })
    res.json(result.ignoreDates);
})


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





