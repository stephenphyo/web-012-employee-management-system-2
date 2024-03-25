import React, { forwardRef } from 'react';

/*** CSS Imports ***/
import './SPFormSelect.css';

/** Form Select **/
const SPFormSelect = forwardRef((props, ref) => {
    const { className, ...otherProps } = props;
    return (
        <div className={`sp_form_select ${className || ''}`}>
            <label>{props?.label}</label>
            <div className='sp_form_select_wrapper'>
                <select {...otherProps}>
                    {props.children}
                </select>
                <span id='arrow'></span>
            </div>
        </div>
    );
});

/** Form Select Option **/
const Option = (props) => {
    return (
        <option {...props}>
            {props.children}
        </option>
    );
}

SPFormSelect.Option = Option;

export default SPFormSelect;