import React from 'react';
import Header from '../components/Header/Header';

const About = () => {
    return (
        <>
            <Header/>
            <div className='about'>
                <h1>This is an about page.</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Eius nostrum totam iure illum error nemo temporibus quidem alias itaque 
                    cupiditate exercitationem quo, reprehenderit voluptates, a rerum! 
                    Dolores totam excepturi fugiat.</p>
            </div>
        </>
    );
};

export default About;