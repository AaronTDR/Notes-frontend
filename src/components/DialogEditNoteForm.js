import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
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
  title,
  note,
  date,
  _id,
  history,
  saveQuery,
  handleClose,
  open,
}) => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [noteEdit, saveNoteEdit] = useState({
    title: title,
    note: note,
    date: "",
  });

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  // edit note
  const updateStatus = (e) => {
    saveNoteEdit((previousStateNote) => {
      return {
        ...previousStateNote,
        [e.target.name]: e.target.value,
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
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Date picker inline"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
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
