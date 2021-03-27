import React, { useState, useEffect } from "react";
import "date-fns";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import axiosCustomer from "../config/axios";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "380px",
    overflow: "hidden",
    margin: "15px",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
  },
  body: {
    fontSize: 20,
  },
  dateMargin: {
    marginRight: "10px",
  },
  editBtn: {
    marginLeft: "95%",
  },
  deleteBtn: {
    marginBottom: "15px",
  },
  ActionsBtn: {
    marginRight: "10%",
  },
  date: {
    marginRight: "28%",
  },
}));

const DialogEditNoteForm = ({
  _id,
  title,
  note,
  oldDate,
  history,
  saveQuery,
  handleClose,
  open,
}) => {
  // get date
  const [selectedDate, setSelectedDate] = useState(oldDate);
  const { register, errors, handleSubmit } = useForm();

  const classes = useStyles();
  const [noteEdit, saveNoteEdit] = useState({
    title: title,
    note: note,
    date: oldDate,
  });

  // wait for the DOM to load the variable with the old date to avoid an empty string
  useEffect(() => {
    if (oldDate !== undefined) {
      setSelectedDate(oldDate);
    }
  }, [oldDate]);

  // edit note
  const updateStatus = (e) => {
    saveNoteEdit((previousStateNote) => {
      return {
        ...previousStateNote,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    saveNoteEdit((previousStateNote) => {
      return {
        ...previousStateNote,
        date: format(date, "LLLL dd, yyyy hh:mm a"),
      };
    });
  };

  const onSubmit = (data, e) => {
    e.preventDefault();
    axiosCustomer
      .put(`/notes/${_id}`, noteEdit)
      .then((res) => {
        saveQuery(true);
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Edit the fields</DialogTitle>
      <DialogContent>
        <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <Grid container justify="center" spacing={4}>
            <Grid item xs={9}>
              <TextField
                id="outlined"
                placeholder="Enter the title"
                label="Title"
                name="title"
                type="string"
                variant="outlined"
                defaultValue={title}
                required
                fullWidth
                inputProps={{ maxLength: 35 }}
                onChange={updateStatus}
                inputRef={register({
                  required: "The title is required.",
                })}
                error={Boolean(errors.title)}
                helperText={errors?.title?.message}
              />
            </Grid>

            <Grid item xs={9}>
              <TextField
                id="standard-multiline-static"
                placeholder="Enter the note"
                label="Note"
                name="note"
                type="string"
                variant="outlined"
                defaultValue={note}
                multiline
                rowsMax="15"
                rows={8}
                required
                fullWidth
                inputProps={{ maxLength: 500 }}
                onChange={updateStatus}
                inputRef={register({
                  required: "The note is required.",
                })}
                error={Boolean(errors.note)}
                helperText={errors?.note?.message}
              />
            </Grid>

            <Grid item xs={9}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                  id="DateTimePicker"
                  label="Date"
                  name="date"
                  variant="inline"
                  inputVariant="outlined"
                  required
                  margin="normal"
                  value={selectedDate}
                  disablePast
                  format="yyyy/MM/dd hh:mm a"
                  onChange={handleDateChange}
                />
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>
          <DialogActions>
            <Button onClick={handleClose} variant="contained" color="secondary">
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              type="submit"
              className={classes.ActionsBtn}
            >
              Save
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogEditNoteForm;
