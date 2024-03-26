import React  from 'react';

/*** React Icon Imports  ***/
import { MdExitToApp } from 'react-icons/md';
import { FaUserTie, FaBuilding } from 'react-icons/fa';
import { RiCommunityFill } from 'react-icons/ri';

const SidebarMenuList = [
    {
        Text: 'Employees',
        URL: '/employee',
        Icon: <FaUserTie size={22} />
    },
    {
        Text: 'Departments',
        URL: '/department',
        Icon: <FaBuilding size={22} />
    },
    {
        Text: 'Units',
        URL: '/unit',
        Icon: <RiCommunityFill size={22} />
    },
    {
        Text: 'Logout',
        URL: '/logout',
        Icon: <MdExitToApp size={22} />
    },
    // {
    //     Text: 'Test',
    //     URL: '/test',
    //     SubMenu: [
    //         {
    //             Text: 'Test 1',
    //             URL: '/test1',
    //             Icon: HiOutlineDatabase
    //         },
    //         {
    //             Text: 'Test 2',
    //             URL: '/test2',
    //             Icon: HiOutlineDatabase
    //         },
    //         {
    //             Text: 'Test 3',
    //             URL: '/test3',
    //             Icon: HiOutlineDatabase
    //         },
    //     ],
    //     Icon: SlSettings
    // },
]

export default SidebarMenuList;