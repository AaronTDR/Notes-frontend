import "date-fns";
import React, { Fragment, useState } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Grid from "@material-ui/core/Grid";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import axiosCustomer from "../config/axios";
import Swal from "sweetalert2";

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

const Note = (props) => {
  const {
    note: { title, note, date, _id },
  } = props;

  const classes = useStyles();

  // controls popup form
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [noteEdit, saveNoteEdit] = useState({
    title: "",
    note: "",
    date: "",
  });

  if (!props.note) {
    props.history.push("/");
    return null;
  }

  // show popup form
  const handleClickOpen = () => {
    setOpen(true);
  };
  // hides popup form
  const handleClose = () => {
    setOpen(false);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // edit note
  const updateStatus = (e) => {
    saveNoteEdit({
      ...noteEdit,
      [e.target.name]: e.target.value,
    });
  };

  const upgradeNote = (e) => {
    e.preventDefault();
    axiosCustomer
      .put(`/notes/${_id}`, noteEdit)
      .then((res) => {
        props.saveQuery(true);
        props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // delete note
  const deleteNote = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      iconColor: "#3085d6",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your note has been deleted.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });

        //Removed from the DB
        axiosCustomer
          .delete(`/notes/${id}`)
          .then((res) => {
            props.saveQuery(true);
            props.history.push("/");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  return (
    <Fragment>
      <Grid container justify="center" spacing={1}>
        <Grid key={_id} item xs={12} sm={10} md={10}>
          <Card variant="outlined">
            <CardContent className={classes.container}>
              <IconButton
                aria-label="edit"
                className={classes.editBtn}
                onClick={handleClickOpen}
              >
                <EditIcon fontSize="medium" />
              </IconButton>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="h5"
                component="h1"
                className={classes.title}
              >
                {title}
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body1"
                component="p"
                className={classes.body}
              >
                {note}
              </Typography>
            </CardContent>
            <CardContent>
              <Typography
                variant="caution"
                component="h3"
                align="right"
                gutterBottom
                className={classes.dateMargin}
              >
                {date}
              </Typography>
            </CardContent>

            <CardActions>
              <Grid container justify="center">
                <Grid item xs={12} sm={10} md={10}>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    fullWidth
                    className={classes.deleteBtn}
                    onClick={() => deleteNote(_id)}
                  >
                    Delete &times;
                  </Button>
                </Grid>
              </Grid>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      {handleClickOpen ? (
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
                    fullWidth="true"
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
                    fullWidth="true"
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
                  onClick={handleClose}
                  className={classes.ActionsBtn}
                >
                  Save
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      ) : null}
    </Fragment>
  );
};

export default withRouter(Note);
