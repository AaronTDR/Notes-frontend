import React, { Fragment, useState } from "react";
import "date-fns";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
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
  const { register, errors, handleSubmit } = useForm();
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
  };

  // send a request to the API
  const onSubmit = (data, e) => {
    e.preventDefault();
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
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <Grid container justify="center" spacing={4}>
          <Grid item xs={12} sm={7} md={7} className={classes.InputTitle}>
            <TextField
              id="outlined"
              placeholder="Enter the title of the note"
              label="Title"
              name="title"
              type="string"
              variant="outlined"
              required
              fullWidth
              inputProps={{ maxLength: 35 }}
              onChange={updateStatus}
              inputRef={register({
                required: "Title required.",
              })}
              error={Boolean(errors.title)}
              helperText={errors?.title?.message}
            />
          </Grid>

          <Grid item xs={12} sm={7} md={7}>
            <TextField
              id="standard-multiline-static"
              placeholder="Enter the note"
              label="Note"
              name="note"
              type="string"
              variant="outlined"
              multiline
              rowsMax="15"
              rows={8}
              required
              fullWidth
              inputProps={{ maxLength: 500 }}
              onChange={updateStatus}
              inputRef={register({
                required: "This field is required.",
              })}
              error={Boolean(errors.note)}
              helperText={errors?.note?.message}
            />
          </Grid>

          <Grid item xs={12} sm={7} md={7}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DateTimePicker
                id="DateTimePicker"
                label="Date"
                name="date"
                variant="inline"
                inputVariant="outlined"
                margin="normal"
                value={selectedDate}
                required
                disablePast
                format="yyyy/MM/dd hh:mm a"
                onChange={handleDateChange}
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
