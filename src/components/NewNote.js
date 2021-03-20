import React, { Fragment, useState } from "react";
import "date-fns";
import { format } from "date-fns";
import { withRouter } from "react-router-dom";
import axiosCustomer from "../config/axios";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import Typography from "@material-ui/core/Typography";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";

const useStyles = makeStyles(() => ({
  InputTitle: {
    marginTop: "40px",
  },
}));

const NewNote = (props) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  let formatDate = format(selectedDate, "LLLL dd, yyyy hh:mm a");
  const [note, saveNote] = useState({
    title: "",
    note: "",
    date: formatDate,
  });
  // read the form data
  const updateStatus = (e) => {
    saveNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    saveNote((previousStateNote) => {
      return {
        ...previousStateNote,
        date: format(date, "LLLL dd, yyyy hh:mm a"),
      };
    });
    console.log("NOTE1===>", note);
  };

  // send a request to the API
  const createNewNote = (e) => {
    e.preventDefault();
    console.log("NOTE2===>", note);
    axiosCustomer.post("/notes", note).then(() => {
      props.saveQuery(true);
      props.history.push("/");
    });
  };

  const classes = useStyles();
  return (
    <Fragment>
      <Typography
        color="textSecondary"
        gutterBottom
        variant="h3"
        component="h2"
        align="center"
      >
        Add a new note
      </Typography>
      <form noValidate autoComplete="off" onSubmit={createNewNote}>
        <Grid container justify="center" spacing={4}>
          <Grid item xs={12} sm={7} md={7} className={classes.InputTitle}>
            <TextField
              id="outlined"
              label="Title"
              variant="outlined"
              type="string"
              name="title"
              fullWidth
              onChange={updateStatus}
            />
          </Grid>

          <Grid item xs={12} sm={7} md={7}>
            <TextField
              id="standard-multiline-static"
              label="Note"
              multiline
              rows={8}
              variant="outlined"
              type="string"
              name="note"
              rowsMax="15"
              fullWidth
              onChange={updateStatus}
            />
          </Grid>

          <Grid item xs={12} sm={7} md={7}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DateTimePicker
                variant="inline"
                margin="normal"
                label="Date"
                value={selectedDate}
                onChange={handleDateChange}
                disablePast
                format="yyyy/MM/dd hh:mm a"
                inputVariant="outlined"
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={12} sm={7} md={7}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<SaveIcon />}
              fullWidth
              type="submit"
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </Fragment>
  );
};

export default withRouter(NewNote);
