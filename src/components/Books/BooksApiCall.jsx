//AIzaSyC0QdYVZ_DBTAbYaFFrYYSF0oRv61bKCPM---> Google Book Api
//

import { useState, useEffect } from "react";
import axios from "axios";

const BooksApiCall = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      //   const API_KEY = AIzaSyC0QdYVZ_DBTAbYaFFrYYSF0oRv61bKCPM;
      const res = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=Harry+Potter&key=AIzaSyC0QdYVZ_DBTAbYaFFrYYSF0oRv61bKCPM`
      );
      const bookData = res.data.items;
      setData(bookData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "20px",
        }}
      >
        {data.map((info) => (
          <div
            key={info.id}
            style={{
              border: "1px solid black",
              textAlign: "center",
            }}
          >
            <img
              src={info.volumeInfo.imageLinks?.thumbnail}
              alt="poster"
              style={{ marginTop: "10px" }}
            />
            <h1>{info.volumeInfo.title}</h1>
            <p>{info.volumeInfo.description}</p>
            <h4>Author : {info.volumeInfo.authors}</h4>
            <h5>Average Rating: {info.volumeInfo.averageRating}</h5>
            <h5>Published Data: {info.volumeInfo.publishedDate}</h5>
            <h5>Publisher: {info.volumeInfo.publisher}</h5>
          </div>
        ))}
      </div>
    </div>
  );
};

export { BooksApiCall };
