import { call, put, takeLatest } from 'redux-saga/effects';
import { CREATE_NOTE_REQUEST, CREATE_NOTE_SUCCESS, CREATE_NOTE_FAILURE } from '../core/actionTypes';
import { createNote } from '../core/service.js';

function* createNoteSaga(action) {
    try {
        const note = yield call(createNote, action.payload);
        yield put({ type: CREATE_NOTE_SUCCESS, payload: note });
    } catch (error) {
        yield put({ type: CREATE_NOTE_FAILURE, payload: error.message });
    }
}

function* watchCreateNote() {
    yield takeLatest(CREATE_NOTE_REQUEST, createNoteSaga);
}

export default watchCreateNote;