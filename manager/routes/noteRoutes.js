import express from 'express';

class NotesRoutes {
    constructor(notesManager) {
        this.notesManager = notesManager;
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post('/notes', this.createNote.bind(this));
        this.router.get('/notes', this.getNotes.bind(this));
        this.router.put('/notes/:id', this.updateNote.bind(this));
        this.router.delete('/notes/:id', this.deleteNote.bind(this));
    }

    async createNote(req, res) {
        try {
            const noteData = req.body;
            const newNote = await this.notesManager.createNote(noteData);
            res.status(201).json(newNote);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getNotes(req, res) {
        try {
            const notes = await this.notesManager.getNotes();
            res.status(200).json(notes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateNote(req, res) {
        try {
            const noteId = req.params.id;
            const noteData = req.body;
            const updatedNote = await this.notesManager.updateNote(noteId, noteData);
            res.status(200).json(updatedNote);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteNote(req, res) {
        try {
            const noteId = req.params.id;
            await this.notesManager.deleteNote(noteId);
            res.status(200).json({ message: 'Note deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default NotesRoutes;   