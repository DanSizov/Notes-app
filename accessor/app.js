import express from 'express';
import mongoose from 'mongoose';
import { loggerMiddleware } from './middleware/loggerMiddleware.js';
import noteRoutes from './routes/noteRoutes.js';
import { createServer } from 'http';
import { bayeux, attachBayeuxToServer } from './middleware/fayeSetup.js';

const app = express();
app.use(express.json());
const PORT = 4000;

app.use(loggerMiddleware);

app.get('/', (req, res) => {
    res.send('Accessor is up and running');
});

app.use('/notes', noteRoutes);

const server = createServer(app);
attachBayeuxToServer(server);

server.listen(PORT, () => {
    console.log(`Accessor app listening on port ${PORT}`);
});

mongoose.connect('mongodb://localhost:27017/my-notes-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to MongoDB');
})
    .catch(error => {
        console.error('Error connecting to MongoDB', error);
})