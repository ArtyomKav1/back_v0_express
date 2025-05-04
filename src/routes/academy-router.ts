import { Router, Request, Response } from "express"
import { academyCollection, v1Collection } from "../repositiries/db"
// import { body, validationResult } from "express-validator"
// import { inputValidationMiddleware } from "../midleware/input-validation-middleware"
// import { coursesService } from "../domain/courses-service"





// const HTTP_STATUSES = {
//     OK_200: 200,
//     CREATED_201: 201,
//     NO_CONTENT_204: 204,
//     BAD_REQUEST_400: 400,
//     NOT_FOUND_404: 404

// }
export const academyRouter = Router()
// const tilteValidation = body('title').trim().isLength({ min: 3, max: 10 }).withMessage("Title length should be from 3 to 10")





// academyRouter.get('/academy',
//     // tilteValidation,
//     // inputValidationMiddleware,
//     async (req: Request, res: Response) => {

//         // const foundCourses = await coursesService.findProducts(req.query.title?.toString())
//         res.json("ok")
//     })


academyRouter.get('/events', async (req: Request, res: Response) => {
    const result = await academyCollection.findOne({}, { projection: { events: 1, _id: 0 } })
    res.json(result?.events);
})
academyRouter.get('/courses', async (req: Request, res: Response) => {
    const result = await academyCollection.findOne({}, { projection: { courses: 1, _id: 0 } })
    res.json(result?.courses);
})
academyRouter.get('/tutors', async (req: Request, res: Response) => {
    const result = await academyCollection.findOne({}, { projection: { tutors: 1, _id: 0 } })
    res.json(result?.tutors);
})
academyRouter.get('/ignoreDates', async (req: Request, res: Response) => {
    const result = await academyCollection.findOne({}, { projection: { ignoreDates: 1, _id: 0 } })
    res.json(result?.ignoreDates);
})






export const v1Router = Router()

v1Router.get('/', async (req: Request, res: Response) => {
    try {
        const result = await v1Collection.find().toArray()
        res.status(201).json({ result });
    } catch (error) {
        res.status(500)
        // .json(
        //     { error: error?.message }
        // );
    }
})

v1Router.post('/', async (req: Request, res: Response) => {
    try {
        const { name, email, post } = req.body;
        const user = {
            name,
            email,
            post,
            id: +(new Date().getTime()),
            dateCreate: new Date()
        }
        await v1Collection.insertOne(user)
        res.status(201).json({ message: 'User added successfully', user });
    } catch (error) {
        res.status(500)
        // .json(
        //     { error: error?.message }
        // );
    }
})










// coursesRouter.get('/courses/:id',
//     async (req: Request, res: Response) => {
//         const foundCourses = await coursesService.getProductsById(+req.params.id)
//         if (!foundCourses) {
//             res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
//             return
//         }
//         res.json(foundCourses)
//     })

// coursesRouter.post('/courses',
//     tilteValidation,
//     inputValidationMiddleware,
//     async (req: Request, res: Response) => {

//         if (!req.body.title.trim()) {
//             res.status(HTTP_STATUSES.BAD_REQUEST_400).send({ message: "Title is required" })
//             return
//         }
//         const createCourses = await coursesService.createCourses(req.query.title)
//         res.status(HTTP_STATUSES.CREATED_201).json(createCourses)
//     })

// coursesRouter.delete('/courses/:id',
//     async (req: Request, res: Response) => {
//         const completed = await coursesService.deleteCourses(+req.params.id)
//         if (completed) {
//             res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
//         } else {
//             res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
//         }
//     })

// coursesRouter.put('/courses/:id',
//     async (req: Request, res: Response) => {
//         if (!req.body.title.trim()) {
//             res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
//             return
//         }
//         const isUpdated = await coursesService.updateCourses(+req.params.id, req.body.title)
//         if (isUpdated) {
//             const updatedCourses = await coursesService.getProductsById(+req.params.id)
//             res.json(updatedCourses)
//         } else {
//             res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)

//         }







//     })

