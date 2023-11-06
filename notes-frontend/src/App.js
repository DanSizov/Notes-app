import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NoteList from './components/noteList';
import NoteCreateForm from './components/noteCreate';
//import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NoteList />} />
        <Route path="/create" element={<NoteCreateForm />} />
      </Routes>
    </Router>
  );
}

export default App;
