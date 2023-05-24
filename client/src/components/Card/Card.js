import React from 'react';
import { Link } from 'react-router-dom';
import './card.css';

export default function Card({image, name, temperament, weight, id}) {
    return (
        <div className='content'>
            <Link to={'/dogs/' + id}>
            <img className='card_image' src={image} alt='img not found'/>
            </Link>
            <h3>{name}</h3>
            <p>TEMPERAMENTS:<br/> 
                {temperament}<br/> 
                <br/>  
                {weight}
            </p>
           
            
        </div>
    );

}