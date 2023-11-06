import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNoteRequest } from '../core/action';

const NoteCreateForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        //validation
        dispatch(createNoteRequest({ title, content }));
        setTitle('');
        setContent('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='title'>Title:</label>
                <input
                    id='title'
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor='content'>Content:</label>
                <textarea
                    id='content'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>
            <button type='submit'>Create Note</button>
        </form>
    );
};

export default NoteCreateForm;
