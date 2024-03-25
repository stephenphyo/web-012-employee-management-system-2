import React, { createContext, useState, useRef, useEffect, useContext } from 'react';

/*** CSS Imports ***/
import './Dropdown.css';

/*** Icon Imports ***/
import { IoMdArrowDropdown } from "react-icons/io";

/*** Context ***/
const DropdownContext = createContext();

/*** Context Provider ***/
const DropdownContextProvider = (props) => {
    /* useState */
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    /* Context Values */
    const value = {
        isDropdownOpen, setIsDropdownOpen
    };

    return (
        <DropdownContext.Provider value={value}>
            {props.children}
        </DropdownContext.Provider>
    );
}

/*** Dropdown ***/
function Dropdown(props) {
    return (
        <DropdownContextProvider>
            <div className='sp-dropdown'>
                {props.children}
            </div>
        </DropdownContextProvider>
    );
}

/*** Dropdown Title ***/
function Title(props) {

    /* useContext */
    const { isDropdownOpen, setIsDropdownOpen } = useContext(DropdownContext);

    /* Functions */
    const handleClick = (e) => {
        e.stopPropagation();
        setIsDropdownOpen(!isDropdownOpen);
    }

    return (
        <p className='sp-dropdown-title'
            onClick={(e) => handleClick(e)}>
            {props.children}
            {props.enableArrow && <IoMdArrowDropdown size={20} />}
        </p>
    )
}

/*** Dropdown Menu ***/
function Menu(props) {

    /* useContext */
    const { isDropdownOpen, setIsDropdownOpen } = useContext(DropdownContext);

    /* useRef */
    const dropdownRef = useRef(null);

    /* useEffect */
    useEffect(() => {
        const handleExternalClick = (e) => {
            if (isDropdownOpen && dropdownRef.current
                && !dropdownRef.current.contains(e.target)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener('click', handleExternalClick);

        return () => {
            document.removeEventListener('click', handleExternalClick);
        }
    }, [isDropdownOpen, setIsDropdownOpen]);

    return (
        <ul ref={dropdownRef} onClick={() => setIsDropdownOpen(false)}
            className={`sp-dropdown-menu ${isDropdownOpen ? 'open' : ''}`}>
            {props.children}
        </ul>
    );
}

/*** Dropdown Item ***/
function Item(props) {
    const clickable = props?.clickable ?? true;
    return (
        <div className={`sp-dropdown-item ${clickable ? 'clickable' : ''}`}
            {...props}>
            <span className='dropdown-item-icon-left'>{props.leftIcon}</span>
            {props.children}
            <span className='dropdown-item-icon-right'>{props.rightIcon}</span>
        </div>
    );
}

/*** Dropdown Separator ***/
function Separator(props) {
    return (
        <div className='sp-dropdown-separator'>
            <hr style={{
                backgroundColor: props?.color ?? '#FFFFFF',
                height: props?.height ?? '1px'
            }} />
        </div>
    );
}

Dropdown.Dropdown = Dropdown;
Dropdown.Title = Title
Dropdown.Menu = Menu;
Dropdown.Item = Item;
Dropdown.Separator = Separator;

export default Dropdown;