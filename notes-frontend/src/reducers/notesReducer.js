import {
  FETCH_NOTES_REQUEST,
  FETCH_NOTES_SUCCESS,
  FETCH_NOTES_FAILURE,
  CREATE_NOTE_SUCCESS,
  UPDATE_NOTE_SUCCESS,
  DELETE_NOTE_SUCCESS
} from '../core/actionTypes';

const initialState = {
    notes: [],
    isLoading: false,
    error: null,
};

function notesReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_NOTES_REQUEST:
            return { ...state, isLoading: true, error: null };
        case FETCH_NOTES_SUCCESS:
            return { ...state, isLoading: false, notes: action.payload };
        case FETCH_NOTES_FAILURE:
            return { ...state, isLoading: false, error: action.payload };
        case CREATE_NOTE_SUCCESS:
            return { ...state, notes: [...state.notes, action.payload] };
        case UPDATE_NOTE_SUCCESS:
            return {
                ...state,
                notes: state.notes.map(note =>
                    note._id === action.payload._id ? action.payload : note),
            };
        case DELETE_NOTE_SUCCESS:
            return {
                ...state,
                notes: state.notes.filter(note => note._id !== action.payload),
            };
        default:
            return state;
    }
}

export default notesReducer;
