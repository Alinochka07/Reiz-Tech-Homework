import React from 'react';
import "./Modal.scss";
import Button from '../UI/Button/Button';



const ModalWindow = ({showModal, onCloseModal, country}) => {

    const currency = Object.values(country.currencies)
    const language = Object.values(country.languages)

    if(!showModal) {
        return null
    } 

        return (
            <div className='modal flex flex-jc-c flex-ai-c'>
                <div className='modal__content'>
                    <div className='modal__header'>
                        <h3>{country.name.common}</h3>
                        
                    </div>
                    <div className='modal__body flex flex-jc-sb'>
                        <div>
                            <p><span className='bold'>Official name:</span> {country.name.official}</p>
                            <p><span className='bold'>Capital:</span> {country.capital}</p>
                            <p><span className='bold'>Area:</span> {country.area} km²</p>
                            <p><span className='bold'>Region:</span>{country.region}</p>
                            <p><span className='bold'>Currency:</span> {currency[0].name}, symbol: {currency[0].symbol}</p>
                            <p><span className='bold'>Population:</span> {country.population}</p>
                            <p><span className='bold'>Language spoken:</span> {language.map(lan => <span> {lan},</span>)}</p>
                            <p><span className='bold'>Time zone:</span> {country.timezones[0]}</p>
                        </div>
                        <div className='flex flex-jc-fe'>
                            <img className='modal__img' alt='country-flag' src={country.flags.png}/>
                        </div>
                    </div>
                    <div className='modal__footer flex flex-jc-fe'>
                        <Button onClick={onCloseModal}>Close</Button>
                    </div>
                </div>
            </div>   
        );

    
};

export default ModalWindow;




