import React  from 'react';

/*** CSS Imports ***/
import './MainLayout.css';

/*** Router Imports ***/
import { Outlet } from 'react-router-dom';

/***  Component Imports ***/
import Header from 'components/Main/Header/Header';
import Sidebar from 'components/Main/Sidebar/Sidebar';

function MainLayout() {
    return (
        <>
            <section className='app_header'>
                <Header />
            </section>
            <section className='app_body'>
                <Sidebar />
                <div className='app_main'>
                    <Outlet />
                </div>
            </section>
        </>
    );
}

export default MainLayout;