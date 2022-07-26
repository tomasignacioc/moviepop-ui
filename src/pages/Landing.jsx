import React from 'react'
import cinema from '../assets/cinema-modified.png'
import NavBar from '../layouts/NavBar';

import './Landing.css'

function Landing() {
    return (
        <div className='landing-container'>
            <NavBar />
            <div className='landing-center'>
                <img src={cinema} alt="cinema popcorn" className='landing-logo' />
                <h1 className='landing-title'>MoviePop!</h1>
            </div>
        </div>
    )
}

export default Landing