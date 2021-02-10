import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axiosCustomer from "./config/axios";
import { ThemeProvider } from "@material-ui/core";
import theme from "./themeConfig";
import ResponsiveDrawer from "./components/ResponsiveDrawer";
import NewNote from "./components/NewNote";
import Note from "./components/Note";

function App() {
  const [notes, saveNotes] = useState([]);

  useEffect(() => {
    const consultApi = () => {
      axiosCustomer
        .get("/notes")
        .then((res) => {
          saveNotes(res.data);
        })
        .catch((error) => console.log(error));
    };
    consultApi();
  }, []);

  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          component={() => (
            <ThemeProvider theme={theme}>
              <ResponsiveDrawer notes={notes} />
            </ThemeProvider>
          )}
        />

        <Route exact path="/new" component={NewNote} />

        <Route exact path="/note/:id" component={Note} />
      </Switch>
    </Router>
  );
}

export default App;
