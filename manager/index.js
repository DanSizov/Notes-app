import express from 'express';
import { createServer } from 'http';
import { loggerMiddleware } from './middleware/loggerMiddleware.js';
import NotesRoutes from './routes/noteRoutes.js';
import NotesManager from './controllers/notesController.js';
import pkg from 'faye';
const { Client: FayeClient } = pkg;

const app = express();
const port = 3000;

app.use(express.json());
app.use(loggerMiddleware);

const fayeClient = new FayeClient('http://localhost:4000/faye');

fayeClient.subscribe('/notes', (message) => {
  console.log('Message from accessor:', message);
});

const server = createServer(app);
const notesManager = new NotesManager('http://localhost:4000', port, server, fayeClient);
//notesManager.setupWebSocket('/faye');
const notesRoutes = new NotesRoutes(notesManager);

app.use('/api', notesRoutes.router);

server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
  console.log(`WebSockets listening at http://localhost:${port}/faye`);
});
