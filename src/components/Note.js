import React, { Fragment, useState } from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DialogEditNoteForm from "./DialogEditNoteForm";
import DeleteNote from "./DeleteNote";

const useStyles = makeStyles((theme) => ({
  cardContent: {
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
    marginLeft: "90%",
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
  const classes = useStyles();

  // controls popup form
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  if (!props.note) {
    props.history.push("/");
    return null;
  }

  const {
    note: { title, note, date, _id },
  } = props;

  // show popup form
  const handleClickOpen = () => {
    setOpen(true);
  };
  // hides popup form
  const handleClose = () => {
    setOpen(false);
  };

  // show alert
  const handleClickOpenAlert = () => {
    setOpenAlert(true);
  };
  // hides alert
  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  return (
    <Fragment>
      <Grid container justify="center" spacing={1}>
        <Grid key={_id} item xs={12} sm={10} md={10}>
          <Card variant="outlined">
            <CardContent className={classes.cardContent}>
              <IconButton
                aria-label="edit"
                className={classes.editBtn}
                onClick={handleClickOpen}
              >
                <EditIcon />
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
                variant="body1"
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
                    onClick={handleClickOpenAlert}
                  >
                    Delete &times;
                  </Button>
                </Grid>
              </Grid>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <DialogEditNoteForm
        _id={_id}
        title={title}
        note={note}
        oldDate={date}
        history={props.history}
        saveQuery={props.saveQuery}
        handleClose={handleClose}
        open={open}
      />

      <DeleteNote
        id={_id}
        history={props.history}
        saveQuery={props.saveQuery}
        handleCloseAlert={handleCloseAlert}
        openAlert={openAlert}
      />
    </Fragment>
  );
};

export default withRouter(Note);
