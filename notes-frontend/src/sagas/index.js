import { all } from 'redux-saga/effects';
import notesSaga from './getNotesSaga';
import watchCreateNote from './createNoteSaga';

export default function* rootSaga() {
    yield all([
        notesSaga(),
        watchCreateNote()
    ]);
}