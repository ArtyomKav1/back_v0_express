import { MongoClient } from "mongodb"


const mongoUri = process.env.mongoURI || "mongodb://0.0.0.0:27017"
// const mongoUri = process.env.MONGO_URI || ""

const client = new MongoClient(mongoUri)
const db = client.db("academy_test")
// console.log(db)
export const academyCollection = db.collection("academy")
export const v1Collection = db.collection("v1")
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