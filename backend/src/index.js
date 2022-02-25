import app from './server.js'
import mongoose from 'mongoose'

// Connect to mongodb
mongoose
    .connect(
        "mongodb+srv://henrikskog:JYN*yvn1dyk7anx*jmy@cluster0.ycj8k.mongodb.net/Cluster0?retryWrites=true&w=majority",
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));
app.listen(3000);