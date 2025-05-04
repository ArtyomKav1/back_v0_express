import express, { Request, Response } from 'express'
import { academyRouter, v1Router } from './routes/academy-router'
import { runDb } from './repositiries/db'
import cors from 'cors'

const app = express()

const port = process.env.PORT || 3000

const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://personal-website.duckdns.org:8080',
    'http://personal-website.duckdns.org:8081',
    'http://212.23.211.54:8080',
    'http://212.23.211.54:8081'
];

app.use(cors({
    origin: (origin, callback) => {
        // Разрешаем запросы без origin (например, от мобильных приложений или Postman)
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            const msg = `CORS policy: ${origin} not allowed`;
            return callback(new Error(msg), false);
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,  // Если нужно передавать куки/авторизацию
    optionsSuccessStatus: 200  // Для старых браузеров
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





