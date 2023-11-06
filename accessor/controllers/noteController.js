import { Note } from 'mongoose-schemas';
import { bayeux } from '../middleware/fayeSetup.js';
class NoteController {
    
    async createNote(req, res) {
        try {
            const idempotencyKey = req.headers['idempotency-key'];
            if (idempotencyKey) {
                const existingNote = await Note.findOne({ idempotencyKey });
                if (existingNote) {
                    return res.status(200).send(existingNote);
                }
                req.body.idempotencyKey = idempotencyKey;
            }
            const note = new Note(req.body);
            await note.save();
            res.status(201).send(note);
            bayeux.getClient().publish('/notes', { action: 'create', note: note });
        } catch (error) {
            res.status(500).send({ message: 'Error creating note', error });
        }
    }

    async getAllNotes(req, res) {
        try {
            const notes = await Note.find();
            res.status(200).send(notes);
        } catch (error) {
            res.status(500).send({ message: 'Error fetching notes', error });
        }
    }

    async getOneNote(req, res) {
        try {
            const note = await Note.findById(req.params.id);
            if (!note) {
                return res.status(404).send({ message: 'Note not found' });
            }
            res.status(200).send(note);
        } catch (error) {
            res.status(500).send({ message: 'Error fetching the note', error });
        }
    }

    async updateNote(req, res) {
        try {
            const idempotencyKey = req.headers['idempotency-key'];
            if (idempotencyKey) {
                const existingNote = await Note.findOne({ idempotencyKey, _id: { $ne: req.params.id } });
                if (existingNote) {
                    return res.status(409).send({ message: 'Conflict: idempotency key already exists' });
                }
                req.body.idempotencyKey = idempotencyKey;
            }
            const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
            if (!note) {
                return res.status(404).send({ message: 'Note not found' });
            }
            res.status(200).send(note);
            bayeux.getClient().publish('/note', { action: 'update', note: note });
        } catch (error) {
            res.status(500).send({ message: 'Error updating the note', error });
        }
    }

    async deleteNote(req, res) {
        try {
            const idempotencyKey = req.headers['idempotency-key'];
            if (idempotencyKey) {
                const existingNote = await Note.findOne({ idempotencyKey, _id: req.params.id });
                if (!existingNote) {
                    return res.status(200).send({ message: 'Note already deleted or never existed' });
                }
            }
            const note = await Note.findByIdAndDelete(req.params.id);
            if (!note) {
                return res.status(404).send({ message: 'Note not found' });
            }
            res.status(200).send({ message: 'Note deleted successfully' });
            bayeux.getClient().publish('/notes', { action: 'delete', noteId: req.params.id });
        } catch (error) {
            res.status(500).send({ message: 'Error deleting the note', error });
        }
    }
}

export default new NoteController();
