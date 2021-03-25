import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import axiosCustomer from "../config/axios";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(2),
    position: "absolute",
  },
  dialogTitle: {
    textAlign: "center",
  },
  dialogContent: {
    textAlign: "center",
  },
  dialogActions: {
    justifyContent: "center",
  },
  titleIcon: {
    color: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: theme.palette.background.paper,
      cursor: "default",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "8rem",
    },
  },
}));

export default function DeleteNote({
  id,
  saveQuery,
  handleCloseAlert,
  openAlert,
}) {
  const classes = useStyles();

  // removed note from DB
  const deleteNoteFromDB = (id) => {
    axiosCustomer
      .delete(`/notes/${id}`)
      .then(() => {
        saveQuery(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Dialog
        open={openAlert}
        onClose={handleCloseAlert}
        classes={{ paper: classes.dialog }}
      >
        <DialogTitle id="alert-dialog-title" className={classes.dialogTitle}>
          <IconButton disableRipple className={classes.titleIcon}>
            <ErrorOutlineIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <Typography variant="h6">
            Are you sure you want to delete this note?
          </Typography>

          <Typography variant="subtitle2">
            A deleted note cannot be recovered
          </Typography>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button
            onClick={handleCloseAlert}
            variant="contained"
            color="primary"
          >
            No
          </Button>
          <Button
            onClick={() => {
              handleCloseAlert();
              deleteNoteFromDB(id);
            }}
            variant="contained"
            color="secondary"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
