import React from 'react'
import cinema from '../assets/cinema.jpg'
import NavBar from '../layouts/NavBar';

function Landing() {
    return (
        <div>
            <NavBar />
            <img src={cinema} alt="cinema popcorn" />
            <h1>MoviePop!</h1>
        </div>
    )
}

export default Landing