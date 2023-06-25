import React from 'react';
import "./Navbar.scss";
import { myRoutes } from '../../Routes';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const navigate = useNavigate();

    const handleRefresh = () => {
        window.location.reload()
    }


    return (
        <nav className='navbar flex flex-jc-sb'>
            <div className='flex flex-ai-c'>
                <h1 onClick={handleRefresh}>Reiz Tech Homework</h1>
            </div>
            <div className='navbar__menu flex flex-jc-fe flex-ai-c'>
                {myRoutes.map(routeMenu => {
                    return <div className='menu' onClick={() => (navigate(routeMenu.path), window.location.reload())} key={routeMenu.name}>{routeMenu.name}</div>
                })}
            </div>
        </nav>
    );
};

export default Navbar;