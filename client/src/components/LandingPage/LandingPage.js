import React from 'react';
import {Link} from 'react-router-dom';
import './landingPage.css';


export default function LandingPage(){
    return (
        <div className='landing_page'>                
                <h1 className='title_landing'>¡WOOF WOOF!</h1>
                <h4 className='subtitle_landing'>Search breeds of dogs or create one</h4>
                <Link to = '/home'>
                    <button className='button_landing'>¡Woof!</button>
                </Link>
        </div>
    )
}