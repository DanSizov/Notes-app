import { all } from 'redux-saga/effects';
import { call, put, takeEvery } from 'redux-saga/effects';
import {
    FETCH_NOTES_REQUEST,
    FETCH_NOTES_SUCCESS,
    FETCH_NOTES_FAILURE
} from '../core/actionTypes';
import { fetchNotes } from '../core/service';

function* fetchNotesSaga() {
    try {
        const response = yield call(fetchNotes);
        const notesData = response.data;
        yield put({ type: FETCH_NOTES_SUCCESS, payload: notesData });
    } catch (error) {
        yield put({ type: FETCH_NOTES_FAILURE, payload: error.toString() });
    }
}

function* watchFetchNotes() {
    yield takeEvery(FETCH_NOTES_REQUEST, fetchNotesSaga);
}

export default function* notesSaga() {
    yield all([
        watchFetchNotes(),
    ]);
}
