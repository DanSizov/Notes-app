import {
  FETCH_NOTES_REQUEST,
  FETCH_NOTES_SUCCESS,
  FETCH_NOTES_FAILURE,
  CREATE_NOTE_REQUEST,
  CREATE_NOTE_SUCCESS,
  CREATE_NOTE_FAILURE,
  UPDATE_NOTE_REQUEST,
  UPDATE_NOTE_SUCCESS,
  UPDATE_NOTE_FAILURE,
  DELETE_NOTE_REQUEST,
  DELETE_NOTE_SUCCESS,
  DELETE_NOTE_FAILURE
} from './actionTypes.js';

export const fetchNotesRequest = () => ({
    type: FETCH_NOTES_REQUEST
});

export const fetchNotesSucceess = (notes) => ({
    type: FETCH_NOTES_SUCCESS,
    payload: notes
});

export const fetchNotesFailure = (error) => ({
    type: FETCH_NOTES_FAILURE,
    payload: error
});

export const createNoteRequest = (note) => ({
    type: CREATE_NOTE_REQUEST,
    payload: note
});

export const createNoteSuccess = (note) => ({
    type: CREATE_NOTE_SUCCESS,
    payload: note
});

export const createNoteFailure = (error) => ({
    type: CREATE_NOTE_FAILURE,
    payload: error
});

export const updateNoteRequest = (noteId, noteData) => ({
    type: UPDATE_NOTE_REQUEST,
    payload: { noteId, noteData }
});

export const updateNoteSuccess = (note) => ({
    type: UPDATE_NOTE_SUCCESS,
    payload: note
});

export const updateNoteFailure = (error) => ({
    type: UPDATE_NOTE_FAILURE,
    payload: error
});

export const deleteNoteRequest = (noteId) => ({
    type: DELETE_NOTE_REQUEST,
    payload: noteId
});

export const deleteNoteSuccess = (noteId) => ({
    type: DELETE_NOTE_SUCCESS,
    payload: noteId
});

export const deleteNoteFailure = (error) => ({
    type: DELETE_NOTE_FAILURE,
    payload: error
});