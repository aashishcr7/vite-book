import React from "react";

const MovieList = (props) => {
  return (
    <>
      {props.movies.map((movie, index) => (
        <div key={movie.imdbID}>
          <img src={movie.Poster} alt="image" />
        </div>
      ))}
    </>
  );
};

export { MovieList };
