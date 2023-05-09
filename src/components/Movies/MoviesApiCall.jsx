import { useState, useEffect } from "react";
import axios from "axios";
import { Heading, Box, GridItem, Grid } from "@chakra-ui/react";
import "./Movies.css";
// import { MovieList } from "./MoviesList";
//import debounce from "lodash.debounce";

const MoviesApiCall = () => {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState([]);
  const [modalImageUrl, setModalImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [type, setType] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [blurBackground, setBlurBackground] = useState(false);

  // const [movies, setMovies] = useState([
  //   {
  //     Title: "Star Wars: Episode V - The Empire Strikes Back",
  //     Year: "1980",
  //     imdbID: "tt0080684",
  //     Type: "movie",
  //     Poster:
  //       "https://m.media-amazon.com/images/M/MV5BYmU1NDRjNDgtMzhiMi00NjZmLTg5NGItZDNiZjU5NTU4OTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
  //   },
  //   {
  //     Title: "Star Wars: Episode VI - Return of the Jedi",
  //     Year: "1983",
  //     imdbID: "tt0086190",
  //     Type: "movie",
  //     Poster:
  //       "https://m.media-amazon.com/images/M/MV5BOWZlMjFiYzgtMTUzNC00Y2IzLTk1NTMtZmNhMTczNTk0ODk1XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg",
  //   },
  // ]);

  const fetchMovie = async () => {
    try {
      let res = await axios.get(
        `http://www.omdbapi.com/?&apikey=784f2f29&s=${inputValue}`
      );

      const moviesData = res.data.Search;
      if (moviesData) {
        console.log(moviesData);
        setData(moviesData);
      } else {
        setData([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Debounce the API call with a 500ms delay

  // const debouncedFetchMovie = debounce(fetchMovie, 500);

  const handleInput = (e) => {
    const data = e.target.value;
    setInputValue(data);
    // debouncedFetchMovie();
  };

  const showData = (imageUrl, title, type, year) => {
    setModalImageUrl(imageUrl);
    setTitle(title);
    setYear(year);
    setType(type);
    setShowModal(true);
  };

  const hideModal = () => {
    setShowModal(false);
    setModalImageUrl("");
    setBlurBackground("false");
  };

  // Now we are  adding the debouncing

  let id;
  const debounce = (func, delay) => {
    if (id) {
      clearTimeout(id);
    }
    id = setTimeout(function () {
      func();
    }, delay);
  };

  useEffect(() => {
    // Cancel the debounce on unmount
    // return () => debouncedFetchMovie.cancel();
    debounce(fetchMovie, 3000);
  }, [inputValue]);

  return (
    <div className={"App ${blurBackground ? 'blur' : ''}"}>
      <Box style={{ textAlign: "center", padding: "50px" }}>
        <input
          type="text"
          placeholder="Enter the movie name"
          onChange={handleInput}
          style={{ textAlign: "center" }}
        ></input>
      </Box>
      {/* <Heading>Trending Movies</Heading> */}

      {/* <MovieList movies={movies} /> */}

      <div className="showMovie">
        <Grid templateColumns="repeat(2, 1fr)">
          {data.map((el) => (
            <GridItem key={el.imdbID} padding="50px">
              <div
                onClick={() => showData(el.Poster, el.Title, el.Type, el.Year)}
              >
                <img src={el.Poster} alt="poster" />

                <Heading as="h2" size="xl">
                  {el.Title}
                </Heading>
              </div>
            </GridItem>
          ))}
        </Grid>
      </div>

      {/* Now we are coding for the modal */}

      {showModal && (
        <div id="myModal" className="modal" onClick={hideModal}>
          <div className="modal-content">
            <span className="close">&times;</span>
            <img src={modalImageUrl} alt="poster" id="modalImage" />
            <h1>Movie Name : {title}</h1>
            <h1>Type: {type}</h1>
            <h1>Year: {year}</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export { MoviesApiCall };
