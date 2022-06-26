import React from "react";
import AppWrapper from "./AppWrapper";
import { Link } from "react-router-dom";
import { Box, Button, Grid, Heading, Main } from "grommet";

function Welcome() {
  return (
    <AppWrapper>
      <Main
        pad="large"
        direction="column"
        align="center"
        justify="center"
        background="brand"
      >
        <Heading>Welcome to MAX</Heading>
        <Link to="/create">
          <Button
            primary
            color="accent-4"
            label="Set Up Your Meeting"
            size="large"
          />
        </Link>
      </Main>
    </AppWrapper>
  );
}

export default Welcome;
