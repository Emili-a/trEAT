import dropAllCollections from "./cleanup"
import mongoose from 'mongoose'

// Connect to Mongoose
beforeAll(async () => {
    const url = `mongodb://127.0.0.1/testing-db`
    await mongoose.connect(url, { useNewUrlParser: true })
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