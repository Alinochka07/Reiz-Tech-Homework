import React from 'react';
import "./Header.scss";

const Header = () => {
    const handleRefresh = () => {
        window.location.reload()
    }
    return (
        <header>
            <div className='header__content flex flex-jc-fs flex-fw-w'>
                <h1 onClick={handleRefresh}>Reiz Tech Homework</h1>
            </div>
        </header>
    );
};

export default Header;