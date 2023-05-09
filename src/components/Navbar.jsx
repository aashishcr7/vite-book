import { GridItem, Grid, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div style={{ border: "1px solid black", textAlign: "center" }}>
      <Grid templateColumns="repeat(3, 1fr)">
        <GridItem>
          <Link to="/books">
            <Heading size="lg">Search Books</Heading>
          </Link>
        </GridItem>
        <GridItem>
          <Link to="/movies">
            <Heading size="lg">Search Movies</Heading>
          </Link>
        </GridItem>
        <GridItem>
          <Link to="/signup">
            <Heading size="lg">Signup</Heading>
          </Link>
        </GridItem>
      </Grid>
    </div>
  );
};

export { Navbar };
