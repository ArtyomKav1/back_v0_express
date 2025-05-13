import express, { Request, Response } from 'express'
import { academyRouter, v1Router, v2Router } from './routes/academy-router'
import { runDb } from './repositiries/db'
import cors from 'cors'

const app = express()
const port = process.env.PORT || 3000
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://212.23.211.54:8080',
    'http://212.23.211.54:8081',
    'http://localhost:8080',
];
app.use(cors({
    origin: (origin, callback) => {
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
    credentials: true,  
    optionsSuccessStatus: 200  
}));
app.use(express.json())




app.use('/academy', academyRouter)
app.use('/v1', v1Router)
app.use('/v2', v2Router)





app.get('/', (req: Request, res: Response) => {
    res.send('Hello from Academy Server!');
});
const startApp = async () => {
    try {
        await runDb();
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}
startApp()





