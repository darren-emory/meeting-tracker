import React from "react";
import { Grommet } from "grommet";

const theme = {
  global: {
    colors: {
      brand: "#B53471",
    },
    font: {
      family: "Nunito",
      weight: "400",
      size: "20px",
      height: "25px",
    },
  },
};
function AppWrapper(props: any) {
  return (
    <Grommet theme={theme} full themeMode="dark">
      {props.children}
    </Grommet>
  );
}

export default AppWrapper;
