import React, {useState} from 'react';
import classes from "./GridView.module.scss";
import Button from '../Button/Button';
import ModalWindow from '../../Modal/ModalWindow';

const GridView = ({children, ...props}) => {

    const [showModal, setShowModal] = useState(false);
    const {country} = props;
    

    const onCloseModal = () => {setShowModal(false)}
   
    return (
        <>
            <div className={`${classes.MyGridView} flex flex-ac-sb flex-fw-w`}>
                <div className={`${classes.GridInfo} flex flex-jc-sb`}>
                    <div className={`${classes.GridInfoDetail} flex flex-jc-fs flex-fd-c`}>
                        <h3>{country.name.common}</h3>
                        <p>Capital: {country.capital}</p>
                        <p>Region: {country.region}</p>
                        <p>Area: {country.area}</p>
                    </div>
                    <img className={classes.GridImg} alt='country-flag' src={country.flags.png}/>
                </div>
                <Button onClick={() => setShowModal(true)}>Click for more</Button>
                {children}
            </div>
            <ModalWindow showModal={showModal} country={country} onCloseModal={onCloseModal} />
        </>
    );
};

export default GridView;