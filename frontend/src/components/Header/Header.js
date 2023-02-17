import React, { useContext } from 'react';
import { useState } from 'react';
import './Header.css';
import Button from 'react-bootstrap/Button';

function Header(props) {

    return (
        <div className='header-container'>
            <div className="dummy-header">
                <div className='title-container'>
                    <div>Groupstarter</div>
                    <div className='Register'>
                        <Button variant="dark">Register</Button>
                    </div>
                    <div className='Login'>
                        <Button variant="dark">Login</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Header;