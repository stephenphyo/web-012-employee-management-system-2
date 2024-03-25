import React from 'react';

/*** CSS Imports ***/
import './SPDialogBox.css';

function SPDialogBox(props) {
    return (
        <div
            className={`sp_dialog_container slideY`}
            {...props}>
            {props.children}
        </div>
    );
}

/*** Dialog Box Header ***/
function Header(props) {
    return (
        <div
            className='sp_dialog_header'>
            <p>{props.children}</p>
        </div>
    );
}

/*** Dialog Box Body ***/
function Body(props) {
    if (!props.variant) {
        return console.error('Dialog Body must have \'variant\' property');
    } else {
        return (
            <div
                className={`sp_dialog_body ${props.variant}`}
                {...props}>
                <div className='sp_dialog_body_content'>
                    {props.children}
                </div>
            </div>
        )
    }
}

/*** Dialog Box Footer ***/
function Footer(props) {
    return (
        <div
            className='sp_dialog_footer'
            {...props}>
            {props.children}
        </div >
    );
}

SPDialogBox.Header = Header
SPDialogBox.Body = Body
SPDialogBox.Footer = Footer

export default SPDialogBox;