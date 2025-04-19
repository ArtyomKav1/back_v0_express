import { MongoClient } from "mongodb"


const mongoUri = process.env.mongoURI = "mongodb://0.0.0.0:27017"

const client = new MongoClient(mongoUri)
const db = client.db("academy_test")
// console.log(db)
export const academyCollection = db.collection("academy")
// console.log(academyCollection)

export async function runDb() {
    try {
        await client.connect();
        await client.db("academy_test").command({ ping: 1 })
        console.log("Connected successfuly to mongo server")
    } catch {
        console.log("Can`t connect to server")
        await client.close()
    }
} 