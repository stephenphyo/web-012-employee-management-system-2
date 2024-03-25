import React from 'react';

/*** CSS Imports ***/
import './Form.css';

function Form({ children, headers }) {
    return (
        <div className='form'>
            <div className='form_header'>
                <span id='large'>{headers?.large}</span>
                <span id='small'>{headers?.small}</span>
            </div>
            {children}
        </div>
    );
}

/*** Form Header ***/
function Header() {

}

/*** Form Body ***/
function Body(props) {
    return (
        <div className='form_body'>
            <div className='row w-100'>
                {props.children}
            </div>
        </div>
    );
}

/*** Form Footer ***/
function Footer(props) {
    return (
        <div className='form_footer'>
            <div className='row w-100'>
                {props.children}
            </div>
        </div>
    );
}

Form.Header = Header;
Form.Body = Body;
Form.Footer = Footer;

export default Form;