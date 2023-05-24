import React from 'react';
import './Pagination.css';

export default function Pagination({dogsPerPage, allDogs, pagination}) {
    const pageNumbers = [] //declaro arreglo vacio

    for (let i = 1; i <=Math.ceil(allDogs/dogsPerPage); i++) { //todos los perros dividido perros por pagina
        pageNumbers.push(i)  //pusheo en el arreglo
    }
    return (
        <nav>
            <div className='pagination_container'> 
                { pageNumbers && pageNumbers.map((number, i) => (
                     <button className='pagination' key={i} onClick={() => pagination(number)}>{number}</button>
                ))}
            </div>

        </nav>
    )

    
}

