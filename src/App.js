import React from "react";
import { ThemeProvider } from "@material-ui/core";
import theme from "./themeConfig";
import ResponsiveDrawer from "./components/ResponsiveDrawer";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ResponsiveDrawer />
    </ThemeProvider>
  );
}

export default App;
