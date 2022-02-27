import app, { connectMongo } from './server.js'

// Connect to mongodb
connectMongo('Cluster0')
app.listen(3000);