import { createMuiTheme } from "@material-ui/core/styles";
import deepOrange from "@material-ui/core/colors/deepOrange";
import red from "@material-ui/core/colors/red";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: red.A400,
    },
    secondary: {
      main: deepOrange[500],
    },
  },
});

export default theme;
