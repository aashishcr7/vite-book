import { Box, FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";

const SignupPage = () => {
  return (
    <>
      <Box>
        <form>
          <Stack>
            <FormControl>
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input type="password" />
            </FormControl>
            <FormControl>
              <FormLabel>Phone Number</FormLabel>
              <Input type="text" />
            </FormControl>
          </Stack>
        </form>
      </Box>
    </>
  );
};

export { SignupPage };
