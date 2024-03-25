import React from 'react';

/*** CSS Imports ***/
import './SPButton.css';

function SPButton(props) {
    return (
        <div
            className={`sp_button ${props.variant || 'filled'} ${props.disabled ? 'disabled' : ''}`}
            {...props}>
            {props.children}
        </div>
    );
}

export default SPButton;