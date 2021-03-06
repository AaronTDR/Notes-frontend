import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import DialogEditNoteForm from "./DialogEditNoteForm";
import DeleteNote from "./DeleteNote";

const useStyles = makeStyles(() => ({
  gridItem: {
    minWidth: 400,
    margin: 1,
  },
  card: {
    minWidth: 345,
  },
  cardContent: {
    height: 200,
    width: "90%",
    overflow: "hidden",
    padding: 20,
    maxWidth: 345,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  editBtn: {
    marginRight: "auto",
  },
}));

export default function Notes(props) {
  const classes = useStyles();
  // controls popup form
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [dataNoteEdit, setDataNoteEdit] = useState({});
  const [dataNoteDelete, setDataNoteDelete] = useState({});

  if (props.notes === 0) return null;

  // hides popup form
  const handleClose = () => {
    setOpen(false);
  };

  // show confirmation alert
  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  return (
    <Fragment>
      <Box p={2}>
        <Grid container justify="center" spacing={4}>
          {props.notes.map((note) => (
            <Grid
              key={note._id}
              item
              xs={12}
              sm={3}
              className={classes.gridItem}
            >
              <Card variant="outlined" className={classes.card}>
                <CardActionArea component={Link} to={`/note/${note._id}`}>
                  <CardContent className={classes.cardContent}>
                    <Typography
                      className={classes.title}
                      color="textSecondary"
                      gutterBottom
                      variant="h5"
                      component="h2"
                    >
                      {note.title}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      gutterBottom
                      variant="body1"
                      component="p"
                    >
                      {note.note}
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <Typography
                      component="p"
                      variant="body1"
                      align="right"
                      gutterBottom
                    >
                      {note.date}
                    </Typography>
                  </CardContent>
                </CardActionArea>

                <CardActions>
                  <Button
                    color="primary"
                    size="small"
                    component={Link}
                    to={`/note/${note._id}`}
                  >
                    Learn More
                  </Button>
                  <IconButton
                    aria-label="edit"
                    className={classes.editBtn}
                    onClick={() => {
                      setDataNoteEdit({
                        id: note._id,
                        date: note.date,
                        note: note.note,
                        title: note.title,
                      });
                      setOpen(true);
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>

                  <IconButton
                    aria-label="delete"
                    onClick={() => {
                      setDataNoteDelete({
                        id: note._id,
                      });
                      setOpenAlert(true);
                    }}
                  >
                    <DeleteIcon fontSize="large" color="secondary" />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <DialogEditNoteForm
        _id={dataNoteEdit.id}
        title={dataNoteEdit.title}
        note={dataNoteEdit.note}
        oldDate={dataNoteEdit.date}
        history={props.history}
        saveQuery={props.saveQuery}
        handleClose={handleClose}
        open={open}
      />

      <DeleteNote
        id={dataNoteDelete.id}
        saveQuery={props.saveQuery}
        handleCloseAlert={handleCloseAlert}
        openAlert={openAlert}
      />
    </Fragment>
  );
}
