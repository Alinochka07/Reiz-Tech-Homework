import React, {useState} from 'react';
import classes from "./GridView.module.scss";
import Button from '../Button/Button';
import Pagination from '../Pagination/Pagination';

const GridView = ({children, ...props}) => {
    const {country, index} = props;
   
  

    return (
        <>
            <div {...props} className={`${classes.MyGridView} flex flex-ac-sb flex-fw-w`}>
                <div className={`${classes.GridInfo} flex flex-jc-sb`}>
                    <div className={`${classes.GridInfoDetail} flex flex-jc-fs flex-fd-c`}>
                        <h3>{country.name.common}</h3>
                        <p>Capital: {country.capital}</p>
                        <p>Region: {country.region}</p>
                        <p>Area: {country.area}</p>
                    </div>
                    <img className={classes.GridImg} alt='country-flag' src={country.flags.png}/>
                </div>
                <Button>Click for more</Button>
                {children}
            </div>
            
        </>
    );
};

export default GridView;