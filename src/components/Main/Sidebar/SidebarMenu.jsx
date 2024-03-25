import React from 'react';

/*** Router Imports ***/
import { useLocation, useNavigate } from 'react-router-dom';

const SidebarMenu = ({ menuItems }) => {

    /* Router */
    const navigate = useNavigate();
    const location = useLocation();

    const checkURL = (url, locationPath) => {
        return new RegExp(`^${url}(?:\\/(.*))?$`).test(locationPath);
    }

    return (
        <ul className='list-unstyled'>
            {
                menuItems?.map((item, index) => (
                    <li key={index}
                        onClick={() => navigate(item?.URL)}
                        className={`sidebar_item ${checkURL(item?.URL, location.pathname) ? 'active' : ''}`}
                        tooltip={item?.Text}>
                        <span className='sidebar_icon'>{item?.Icon}</span>
                        <span className='sidebar_text'>{item?.Text}</span>
                    </li>
                ))
            }
        </ul>
    );
}

export default SidebarMenu;