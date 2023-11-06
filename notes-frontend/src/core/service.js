import axios from 'axios';

const API_ENDPOINT = 'http://localhost:3000/api/notes';

export const fetchNotes = async () => {
    try {
        return (await axios.get(`${API_ENDPOINT}`));
    } catch (error) {
        throw error;
    }
}

export const createNote = async (noteData) => {
    try {
        const response = await axios.post(`${API_ENDPOINT}`, noteData);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateNote = async (noteId, noteData) => {
    try {
        const response = await axios.put(`${API_ENDPOINT}/${noteId}`, noteData);
        return noteId;
    } catch (error) {
        throw error;
    }
}

export const deleteNote = async (noteId) => {
    try {
        await axios.delete(`${API_ENDPOINT}/${noteId}`);
        return noteId;
    } catch (error) {
        throw error;
    }
}