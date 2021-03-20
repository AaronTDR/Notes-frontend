import React, { useState } from "react";
import "date-fns";
import { format } from "date-fns";
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
  selectedDate,
  setSelectedDate,
  editedOrUneditedDate,
  setEditedOrUneditedDate,
}) => {
  let showDate;
  console.log("TITLE FROM FORM=>", title);
  console.log("NOTE FROM FORM=>", note);
  console.log("DATE FROM FORM=>", oldDate);

  if (editedOrUneditedDate) {
    showDate = selectedDate;
  } else {
    showDate = oldDate;
  }

  const classes = useStyles();
  const [noteEdit, saveNoteEdit] = useState({
    title: title,
    note: note,
    date: oldDate,
  });
  console.log("noteEdit FROM FORM=>", noteEdit);
  // edit note
  const updateStatus = (e) => {
    saveNoteEdit((previousStateNote) => {
      console.log("previousStateNote83=>", previousStateNote);
      return {
        ...previousStateNote,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleDateChange = (date) => {
    console.log("PARAMETRO DATE==>", date);
    setSelectedDate(date);
    console.log("selectedDate from handleDateChange=>", selectedDate);
    setEditedOrUneditedDate(true);
    saveNoteEdit((previousStateNote) => {
      return {
        ...previousStateNote,
        date: format(date, "LLLL dd, yyyy hh:mm a"),
      };
    });
  };

  const upgradeNote = (e) => {
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
        <form noValidate autoComplete="off" onSubmit={upgradeNote}>
          <Grid container justify="center" spacing={4}>
            <Grid item xs={9}>
              <TextField
                id="outlined"
                label="Title"
                variant="outlined"
                type="string"
                name="title"
                fullWidth
                defaultValue={title}
                onChange={updateStatus}
              />
            </Grid>

            <Grid item xs={9}>
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
                defaultValue={note}
                onChange={updateStatus}
              />
            </Grid>

            <Grid item xs={9}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                  variant="inline"
                  margin="normal"
                  label="Date"
                  value={showDate}
                  onChange={handleDateChange}
                  disablePast
                  format="yyyy/MM/dd hh:mm a"
                  inputVariant="outlined"
                />
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button
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
