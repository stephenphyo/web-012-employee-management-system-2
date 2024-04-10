import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/*** CSS Imports ***/
import './App.css';

/*** Package Imports ***/
import { Toaster } from 'react-hot-toast';
import HealthCheck from 'HealthCheck';
import Dashboard from 'pages/Dashboard/Dashboard';

function App() {
    return (
        <main className='app'>
            <Toaster position='top-right' />
            <Router>
                <Routes>
                    <Route path='/' element={<Dashboard />} />
                    <Route path='/health' element={<HealthCheck />} />
                </Routes>
            </Router>
        </main>
    );
}

export default App;