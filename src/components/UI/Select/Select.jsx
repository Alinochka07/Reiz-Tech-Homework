import React from 'react';
import classes from "./Select.module.scss";


const Select = ({children, ...props}) => {
    return (
        <select {...props} className={classes.Select}>
            {children}
        </select>
    );
};

export default Select;