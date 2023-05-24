import React from "react";
import "./Pagination.css";

export default function Pagination({ dogsPerPage, allDogs, pagination }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <div className="pagination_container">
        {pageNumbers &&
          pageNumbers.map((number, i) => (
            <button
              className="pagination"
              key={i}
              onClick={() => pagination(number)}
            >
              {number}
            </button>
          ))}
      </div>
    </nav>
  );
}
