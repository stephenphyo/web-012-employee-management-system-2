import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/*** CSS Imports ***/
import './App.css';

/*** Layout Imports ***/
import MainLayout from 'layouts/MainLayout/MainLayout';

/*** Component Imports ***/
// import ProtectedRoute from 'components/Common/ProtectedRoute/ProtectedRoute';

/*** Package Imports ***/
import { Toaster } from 'react-hot-toast';

/*** Page Imports ***/
import Dashboard from 'pages/Dashboard/Dashboard';

import Employee from './pages/Employee/Employee';
import EmployeeInfo from 'pages/Employee/EmployeeInfo';

import Department from 'pages/Department/Department';
import DepartmentInfo from 'pages/Department/DepartmentInfo';

import Unit from 'pages/Unit/Unit';

function App() {
    return (
        <main className='app'>
            <Toaster position='top-right' />
            <Router>
                <Routes>

                    <Route element={<MainLayout />}>
                        <Route path='/' element={<Dashboard />} />

                        <Route path='/employee' element={<Employee />} />
                        <Route path='/employee/:id' element={<EmployeeInfo />} />

                        <Route path='/department' element={<Department />} />
                        <Route path='/department/:id' element={<DepartmentInfo />} />

                        <Route path='/unit' element={<Unit />} />
                    </Route>

                </Routes>
            </Router>
        </main>
    );
}

export default App;