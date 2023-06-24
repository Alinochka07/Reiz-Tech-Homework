import React from 'react';
import classes from "./ListView.module.scss";
import Button from '../Button/Button';

const ListView = ({children, ...props}) => {
    const {country, index} = props
    return (
        <div {...props} className={`${classes.MyListView} flex`}>
            <div className={classes.ListInfo}>
                <div className={`${classes.ListInfoDetail}`}>
                    <h3>{country.name.common}</h3>
                    <p><span className='bold'>Capital:</span> {country.capital}</p>
                    
                </div>
                <div className={`${classes.ListInfoDetail} flex flex-jc-fs flex-fd-c`}>
                    
                </div>
                <div className={`${classes.ListInfoDetail} flex flex-jc-fs flex-fd-c`}>
                    <p>Region: {country.region}</p>
                    <p>Area: {country.area}</p>
                </div>
                <Button>Click for more</Button>
            </div>
            <img className={classes.ListImg} alt='country-flag' src={country.flags.png}/>
            
                {children}
        </div>
    );
};

export default ListView;