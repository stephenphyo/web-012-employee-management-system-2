import React, { forwardRef } from 'react';

/*** CSS Imports ***/
import './FormButton.css';

const FormButton = forwardRef((props, ref) => {

    const { className, ...otherProps } = props;

    return (
        // <div ref={ref}
        //     className={`form_button ${props.disabled ? 'disabled' : ''} ${className}`}
        //     {...otherProps}>
        //     {otherProps?.children}
        // </div>
        <div className={`form_button ${className || ''}`}>
            <button {...otherProps}>
                {otherProps.children}
            </button>
        </div>
    );
});

FormButton.displayName = 'FormButton';

export default FormButton;