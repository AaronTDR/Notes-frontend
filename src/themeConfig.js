import { createMuiTheme } from "@material-ui/core/styles";
import deepOrange from "@material-ui/core/colors/deepOrange";
import red from "@material-ui/core/colors/red";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: deepOrange[500],
    },
    secondary: {
      main: red[700],
    },
  },
});

export default theme;
