import { Router } from 'express';
import noteController from '../controllers/noteController.js';

class NoteRoutes {

    constructor() {
        this.router = Router();
        this.initRoutes();
    }

    initRoutes() {
        this.router.post('/', noteController.createNote);
        this.router.get('/', noteController.getAllNotes);
        this.router.get('/:id', noteController.getOneNote);
        this.router.put('/:id', noteController.updateNote);
        this.router.delete('/:id', noteController.deleteNote);
    }
}

export default new NoteRoutes().router;