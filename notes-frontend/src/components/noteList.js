import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNotesRequest } from '../core/action';

const NoteList = () => {
    const dispatch = useDispatch();
    const { notes, isLoading, error } = useSelector(state => state.notes);

    useEffect(() => {
        dispatch(fetchNotesRequest());
    }, [dispatch]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Notes</h2>
            <ul>
                {Array.isArray(notes) ? (
                    notes.map(note => (
                        <li key={note._id}>{note.title}</li>
                    ))
                ) : (
                    <li>No notes found.</li>
                )}
            </ul>
        </div>
    );
};

export default NoteList;
