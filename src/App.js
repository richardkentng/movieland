import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import searchIcon from "./search.svg";
import spinner from "./spinner.gif";
import "./App.css";

const App = () => {
  const [movieData, setMovieData] = useState(null); //api will populate this
  const [searchTerm, setSearchTerm] = useState("");
  const [lastSearchTerm, setLastSearchTerm] = useState(""); //use case: no results for "lastSearchTerm"

  useEffect(() => {
    const titles = [
      "avengers",
      "iron man",
      "batman",
      "superman",
      "frozen",
      "titanic",
      "avatar",
    ];
    const randomTitle = titles[Math.floor(Math.random() * titles.length)];
    getSetMovieData(randomTitle);
  }, []);

  const getSetMovieData = async (title) => {
    setMovieData({ loading: true }); //show spinner
    setLastSearchTerm(title);

    axios
      .request({
        method: "GET",
        url: `http://localhost:8000/omdb?s=${title}&page=1`,
      })
      .then((res) => {
        setMovieData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    getSetMovieData(searchTerm);
  };

  return (
    <>
      <div className="app">
        <h1>MovieLand</h1>
        <form className="search" onSubmit={onSubmit}>
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            placeholder="title"
            required
            autoFocus
          />
          <button type="submit" className="search-btn">
            <img src={searchIcon} alt="search" />
          </button>
        </form>

        {movieData !== null &&
          (movieData.Search?.length > 0 ? (
            <>
              <div className="empty">
                <h2>
                  Showing 10 results for "{lastSearchTerm}"
                  {/* {movieData.totalResults} results for "{lastSearchTerm}" */}
                </h2>
              </div>

              {/* SHOW MOVIES */}
              <div className="container">
                {movieData.Search.map((movie) => (
                  <MovieCard key={uuidv4()} {...movie} />
                ))}
              </div>
            </>
          ) : (
            movieData.Error === "Movie not found!" && (
              <div className="empty">
                <h2>No results for "{lastSearchTerm}"</h2>
              </div>
            )
          ))}

        {movieData?.loading && (
          <img src={spinner} alt="spinner" className="spinner" />
        )}
      </div>
    </>
  );
};

export default App;
