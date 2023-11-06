import { combineReducers } from '@reduxjs/toolkit';
import notesReducer from './notesReducer.js';

const rootReducer = combineReducers({
    notes: notesReducer,
});

export default rootReducer;
