import React from "react";
import { ThemeProvider } from "@material-ui/core";
import theme from "./themeConfig";
import Notes from "./components/Notes";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Notes />
    </ThemeProvider>
  );
}

export default App;
