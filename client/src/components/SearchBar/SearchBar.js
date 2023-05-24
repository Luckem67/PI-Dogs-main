import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getDogsName } from '../../redux/actions/index';
import './SearchBar.css';

export default function SearchBar(){
    const dispatch = useDispatch()
    const [name, setName] = useState('') //lo seteo en un string vacío

function handleInputChange(e){ //el value del input va a tomar el value del useState
    e.preventDefault()
    setName(e.target.value)
}

function handleSubmit(e){
    e.preventDefault()
    if(!name.length){
        alert('Please enter a breed');
    } else {
        dispatch(getDogsName(name));//name es lo q está escribiendo el usuario
        setName(''); //es para q se borre lo q escriba en la searchbar

}
};   


    return (
        <form onSubmit={(e) => handleSubmit(e)}>
        <div className='searchBar'>
            <input
            type='text'
            value={name}
            placeholder='Write a breed...'
            onChange = {(e) => handleInputChange(e)}
            />
            <button className='searchBtn' type='submit'>Search</button>
        </div>
        </form>
    )
}