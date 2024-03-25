import React, { useContext, useEffect, useState } from 'react';

/*** CSS Imports ***/
import './Sidebar.css';

/*** Component Imports ***/
import SidebarMenu from './SidebarMenu';

/*** Data Imports ***/
import SidebarMenuList from './SidebarMenuList';

/*** Context Imports ***/
import SidebarContext from 'contexts/SidebarContext';

function Sidebar() {

    /* useContext */
    const { isSidebarOpen } = useContext(SidebarContext);

    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

    /* useEffect */
    useEffect(() => {
        const handleResize = () => {
            setViewportWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <nav className={`${viewportWidth < 480 ? 'sidebar' : isSidebarOpen ? 'sidebar open' : 'sidebar'}`}>
            <SidebarMenu menuItems={SidebarMenuList} />
        </nav>
    );
}

export default Sidebar;