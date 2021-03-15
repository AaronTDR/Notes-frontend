import "date-fns";
import React, { Fragment, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Grid from "@material-ui/core/Grid";
import SaveIcon from "@material-ui/icons/Save";
import axiosCustomer from "../config/axios";
import { makeStyles } from "@material-ui/core/styles";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  ActionsBtn: {
    marginRight: "10%",
  },
  date: {
    marginRight: "28%",
  },
}));

const EditNote = ({ title, noteToEdit, date, _id, setOpen, open }) => {
  const classes = useStyles();
  // today `s date
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [note, saveNote] = useState({
    title: "",
    note: "",
    date: "",
  });

  // close popup form
  const handleClose = () => {
    setOpen(false);
  };

  // read the form data
  const updateStatus = (e) => {
    saveNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // send a request to the API
  const upgradeNote = (e) => {
    console.log("DESDE EditNote ===>", note);
    e.preventDefault();

    axiosCustomer.put(`/notes/${_id}`, note).then((res) => {
      console.log("***nota actualizada***", res);
    });
  };

  return (
    <Fragment>
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
                  defaultValue={title}
                  fullWidth="true"
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
                  defaultValue={noteToEdit}
                  rowsMax="15"
                  fullWidth="true"
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
                onClick={handleClose}
                className={classes.ActionsBtn}
              >
                Save
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default EditNote;
