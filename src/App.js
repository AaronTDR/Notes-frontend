import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import theme from "./themeConfig";
import ResponsiveDrawer from "./components/ResponsiveDrawer";
import NewNote from "./components/NewNote";
import Note from "./components/Note";
import Notes from "./components/Notes";
import About from "./components/About";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            component={() => <ResponsiveDrawer componentToRender={<Notes />} />}
          />

          <Route
            exact
            path="/new"
            component={() => (
              <ResponsiveDrawer componentToRender={<NewNote />} />
            )}
          />

          <Route exact path="/note/:id" component={Note} />

          <Route
            exact
            path="/about"
            component={() => <ResponsiveDrawer componentToRender={<About />} />}
          />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
