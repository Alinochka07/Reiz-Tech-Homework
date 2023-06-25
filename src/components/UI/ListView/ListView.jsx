import React, {useState} from 'react';
import classes from "./ListView.module.scss";
import Button from '../Button/Button';
import ModalWindow from '../../Modal/ModalWindow';


const ListView = ({children, ...props}) => {
    const [showModal, setShowModal] = useState(false);
    const {country} = props;

    const onCloseModal = () => {setShowModal(false)}
    
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
                
            </div>
            <div className={`${classes.ListImgBtn} flex flex-ai-c flex-jc-sb`}>
                <Button onClick={() => setShowModal(true)}>Click for more</Button>
                <img className={classes.ListImg} alt='country-flag' src={country.flags.png}/>
            </div>
                {children}
            <ModalWindow showModal={showModal} country={country} onCloseModal={onCloseModal} />
        </div>
    );
};

export default ListView;