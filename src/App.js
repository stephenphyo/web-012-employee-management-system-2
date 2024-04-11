import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/*** CSS Imports ***/
import './App.css';

/*** Package Imports ***/
import { Toaster } from 'react-hot-toast';

/*** Page Imports ***/
import Dashboard from 'pages/Dashboard/Dashboard';

function App() {
    return (
        <main className='app'>
            <Toaster position='top-right' />
            <Router>
                <Routes>
                    <Route path='/' element={<Dashboard />} />
                </Routes>
            </Router>
        </main>
    );
}

export default App;