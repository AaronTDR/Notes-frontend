import { createMuiTheme } from "@material-ui/core/styles";
import deepOrange from "@material-ui/core/colors/deepOrange";
import pink from "@material-ui/core/colors/pink";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: deepOrange[500],
    },
    secondary: {
      main: pink[500],
    },
  },
});

export default theme;
