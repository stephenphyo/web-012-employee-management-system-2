import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/*** CSS Imports ***/
import './App.css';

/*** Package Imports ***/
import { Toaster } from 'react-hot-toast';

function App() {
    return (
        <main className='app'>
            <Toaster position='top-right' />
            <Router>
                <Routes>
                    <Route></Route>
                </Routes>
            </Router>
        </main>
    );
}

export default App;