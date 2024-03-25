import React, { forwardRef } from 'react';

/*** CSS Imports ***/
import './SPFormInputText.css';

const FormInputText = forwardRef((props, ref) => {

    const { className, ...otherProps } = props;

    return (
        <div className={`sp_form_input_text ${className || ''}`}>
            <label>{otherProps?.label}</label>
            <input
                type='text'
                ref={ref}
                {...otherProps} />
            <span className='sp_form_input_error'>
                {otherProps?.error}
            </span>
        </div>
    );
});

export default FormInputText;