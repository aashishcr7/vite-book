import { Routes, Route } from "react-router-dom";
import { BooksApiCall } from "./Books/BooksApiCall";
import { SearchBooks } from "./Books/SearchBooks";
import { MoviesApiCall } from "./Movies/MoviesApiCall";
import { SignupPage } from "./SignupPage";

const Routers = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<BooksApiCall />}></Route>
        <Route path="/books" element={<SearchBooks />}></Route>
        <Route path="/movies" element={<MoviesApiCall />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
      </Routes>
    </>
  );
};

export { Routers };
