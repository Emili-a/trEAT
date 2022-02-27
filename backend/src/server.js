import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import router from './routes.js'


const app = express()


const PORT = 8000

// handle json
app.use(bodyParser.json({ extended: true }))

// origins should be spesified in prod
app.use(cors());
app.use(router);


export const connectMongo = (name) =>
    mongoose
        .connect(
            `mongodb+srv://henrikskog:JYN*yvn1dyk7anx*jmy@cluster0.ycj8k.mongodb.net/${name}?retryWrites=true&w=majority`,
            { useNewUrlParser: true, useUnifiedTopology: true }
        )
        .then(() => console.log("MongoDB connected"))
        .catch(err => console.log(err));



export default app