import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDogs,
  getTemperament,
  filterDogsByTemperament,
  filterCreated,
  orderByName,
  orderByWeight,
} from "../../redux/actions/index";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import Loader from "../Loader/Loader";
import SearchBar from "../SearchBar/SearchBar";
import "./home.css";

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const allTemperament = useSelector((state) => state.temperament);
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(8);
  const [setOrder] = useState("");
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);
  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getTemperament());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  if (!allDogs.length) {
    return <Loader />;
  }

  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs());
  }

  function handleFilterTemperament(e) {
    e.preventDefault();
    dispatch(filterDogsByTemperament(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  function handleFilterCreated(e) {
    e.preventDefault();
    dispatch(filterCreated(e.target.value)); //el payload
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  function handleWeight(e) {
    e.preventDefault();
    dispatch(orderByWeight(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  return (
    <div className="fondo">
      <SearchBar />

      <div className="filt">
        <select
          onClick={(e) => {
            handleSort(e);
          }}
        >
          <option value="Asc">A-Z</option>
          <option value="Desc">Z-A</option>
        </select>
        <select
          onClick={(e) => {
            handleFilterCreated(e);
          }}
        >
          <option>Dogs</option>
          <option value="Created">Created</option>
          <option value="Api">Existent</option>
        </select>
        <select onChange={(e) => handleFilterTemperament(e)}>
          <option>Temperaments</option>
          <option value="All">All</option>
          {allTemperament.map((temperament) => (
            <option key={temperament.name} value={temperament.name}>
              {temperament.name}
            </option>
          ))}
        </select>

        <select
          onClick={(e) => {
            handleWeight(e);
          }}
        >
          <option>Weight</option>
          <option value="Heavy">Heavy</option>
          <option value="Light">Light</option>
        </select>
      </div>
      <div className="posLinks">
        <Link className="create_button" to="/dogs">
          Create Dog
        </Link>
        <button
          className="reload_dogs"
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Reload
        </button>
      </div>
      <div>
        <ul className="card_grid">
          {currentDogs?.map((el) => {
            return (
              <Card
                id={el.id}
                name={el.name}
                image={el.image}
                temperament={
                  el.temperament
                    ? el.temperament
                    : el.temperaments?.map((ele, index) =>
                        el.temperaments.length - 1 === index
                          ? ele.name
                          : ele.name + ", "
                      )
                }
                weight={
                  el.weight ? el.weight : el.weightMin + " - " + el.weightMax
                }
                key={el.id}
              />
            );
          })}
        </ul>
      </div>
      <div>
        <Pagination
          dogsPerPage={dogsPerPage}
          allDogs={allDogs.length}
          pagination={pagination}
        />
      </div>
    </div>
  );
}
