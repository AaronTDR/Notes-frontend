import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import axiosCustomer from "../config/axios";
import Swal from "sweetalert2";
import DialogEditNoteForm from "./DialogEditNoteForm";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    minWidth: 300,
  },
  cardContent: {
    height: 200,
    width: "100%",
    overflow: "hidden",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  body: {
    fontSize: 12,
  },
  editBtn: {
    marginRight: "auto",
  },
}));

export default function Notes(props) {
  const classes = useStyles();
  // controls popup form
  const [open, setOpen] = useState(false);
  const [dataNoteEdit, setDataNoteEdit] = useState({});
  console.log("NOTE FROM Notes=>", dataNoteEdit);

  if (props.notes === 0) return null;

  // hides popup form
  const handleClose = () => {
    setOpen(false);
    props.setEditedOrUneditedDate(false);
  };

  return (
    <Fragment>
      <Grid container className={classes.root}>
        <Grid container justify="center" spacing={2}>
          {props.notes.map((note) => (
            <Grid
              key={note._id}
              item
              xs={12}
              sm={6}
              md={3}
              className={classes.card}
            >
              <Card variant="outlined">
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
                      Swal.fire({
                        title: "Are you sure?",
                        text: "You won't be able to revert this!",
                        icon: "warning",
                        iconColor: "#3085d6",
                        showCancelButton: true,
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
                            .delete(`/notes/${note._id}`)
                            .then((res) => {
                              props.saveQuery(true);
                            })
                            .catch((error) => {
                              console.log(error);
                            });
                        }
                      });
                    }}
                  >
                    <DeleteIcon fontSize="large" color="secondary" />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>

      <DialogEditNoteForm
        _id={dataNoteEdit.id}
        title={dataNoteEdit.title}
        note={dataNoteEdit.note}
        oldDate={dataNoteEdit.date}
        saveQuery={props.saveQuery}
        handleClose={handleClose}
        open={open}
        selectedDate={props.selectedDate}
        setSelectedDate={props.setSelectedDate}
        editedOrUneditedDate={props.editedOrUneditedDate}
        setEditedOrUneditedDate={props.setEditedOrUneditedDate}
      />
    </Fragment>
  );
}
