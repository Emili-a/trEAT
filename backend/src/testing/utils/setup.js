import dropAllCollections from "./cleanup"
import mongoose from 'mongoose'
import { connectMongo } from "../../server"

// Connect to Mongoose
beforeAll(async () => {
    await connectMongo('test-database')
})

// Disconnect Mongoose
afterAll(async () => {
    try {
        await dropAllCollections();
        // Connection to Mongo killed.
        await mongoose.disconnect();
        await mongoose.connection.close()
        // Server connection closed.
    } catch (error) {
        console.error(`
    You did something wrong dummy!
    ${error}
  `);
        throw error;
    }
})