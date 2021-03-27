import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axiosCustomer from "./config/axios";
import { ThemeProvider } from "@material-ui/core";
import theme from "./themeConfig";
import ResponsiveDrawer from "./components/ResponsiveDrawer";
import NewNote from "./components/NewNote";
import Note from "./components/Note";
import Notes from "./components/Notes";
import Manage from "./components/Manage";

function App() {
  const [notes, saveNotes] = useState([]);
  const [query, saveQuery] = useState(true);

  useEffect(() => {
    if (query) {
      const consultApi = () => {
        axiosCustomer
          .get("/notes")
          .then((res) => {
            saveNotes(res.data);
            // disable query
            saveQuery(false);
          })
          .catch((error) => console.log(error));
      };
      consultApi();
    }
  }, [query]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            component={() => (
              <ResponsiveDrawer
                componentToRender={
                  <Notes notes={notes} saveQuery={saveQuery} />
                }
              />
            )}
          />

          <Route
            exact
            path="/new"
            component={() => (
              <ResponsiveDrawer
                componentToRender={<NewNote saveQuery={saveQuery} />}
              />
            )}
          />

          <Route
            exact
            path="/note/:id"
            render={(props) => {
              const note = notes.filter(
                (note) => note._id === props.match.params.id
              );
              return (
                <ResponsiveDrawer
                  componentToRender={
                    <Note note={note[0]} saveQuery={saveQuery} />
                  }
                />
              );
            }}
          />

          <Route
            exact
            path="/manage"
            component={() => (
              <ResponsiveDrawer componentToRender={<Manage />} />
            )}
          />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
