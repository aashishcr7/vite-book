// https://www.googleapis.com/books/v1/volumes?q={search terms}

import axios from "axios";
import { useState } from "react";
import {
  Input,
  Box,
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  GridItem,
  Grid,
} from "@chakra-ui/react";
import { useEffect } from "react";
import "./Books.css";

const SearchBooks = () => {
  const MAX_LENGTH = 50;
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [desc, setDesc] = useState("");
  const [author, setAuthor] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [blurBackground, setBlurBackground] = useState(false);
  const [title, setTitle] = useState("");

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
  };

  const fetchBookData = async () => {
    try {
      const API_KEY = "AIzaSyC0QdYVZ_DBTAbYaFFrYYSF0oRv61bKCPM";
      const res = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${inputValue}&key=${API_KEY}`
      );
      const bookData = res.data.items;
      console.log(bookData);

      if (bookData) {
        setData(bookData);
      } else {
        setData([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const showData = (imageUrl, description, title) => {
    setDesc(description);
    setImageUrl(imageUrl);
    setTitle(title);
    setShowModal(true);
  };

  const hideModal = () => {
    setShowModal(false);
    setBlurBackground("false");
  };

  let id;

  const debounce = (func, delay) => {
    if (id) {
      clearInterval(id);
    }

    id = setTimeout(function () {
      func();
    }, delay);
  };

  useEffect(() => {
    debounce(fetchBookData, 3000);
  }, [inputValue]);

  return (
    <div>
      <Box style={{ textAlign: "center", padding: "50px" }}>
        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          width="250px"
        />
      </Box>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        {data.map((info) => (
          <GridItem key={info.id}>
            <Card
              maxW="sm"
              backgroundColor="teal.200"
              alignItems="center"
              justifyContent="space-between"
              onClick={() =>
                showData(
                  info.volumeInfo.imageLinks.thumbnail,
                  info.volumeInfo.description,
                  info.volumeInfo.title
                )
              }
            >
              <CardBody textAlign="center">
                <Box display="flex" justifyContent="center" alignItems="center">
                  {info.volumeInfo.imageLinks?.thumbnail && (
                    <Image
                      src={info.volumeInfo.imageLinks.thumbnail}
                      alt="poster"
                      borderRadius="lg"
                    />
                  )}
                </Box>

                <Stack mt="6" spacing="3">
                  <Heading size="md">{info.volumeInfo.title}</Heading>
                  <Text>
                    {/* {info.volumeInfo?.description.substring(0, 100)}... */}
                    {info.volumeInfo?.description &&
                      info.volumeInfo.description.substring(0, 100)}
                    ...
                  </Text>
                  <Text color="blue.600" fontSize="2xl">
                    Author : {info.volumeInfo.authors}
                  </Text>
                </Stack>
              </CardBody>
            </Card>
          </GridItem>
        ))}
      </Grid>
      {showModal && (
        <div id="myModal" className="modal" onClick={hideModal}>
          <div className="modal-content">
            <span className="close">&times;</span>
            <img src={imageUrl} alt="poster" id="modalImage" />
            <h1>Name: {title}</h1>
            <h1>Novel Description : {desc}</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export { SearchBooks };
