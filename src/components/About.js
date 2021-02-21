import React, { useState, Fragment } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Grid from "@material-ui/core/Grid";
import SaveIcon from "@material-ui/icons/Save";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme) => ({
  ActionsBtn: {
    marginRight: "10%",
  },
}));

const About = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <h1>From About</h1>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit the fields</DialogTitle>
        <DialogContent>
          <form noValidate autoComplete="off">
            <Grid container justify="center" spacing={4}>
              <Grid item xs={9}>
                <TextField
                  id="outlined"
                  label="Title"
                  variant="outlined"
                  type="string"
                  name="title"
                  fullWidth="true"
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
                />
              </Grid>

              <Grid item xs={9}>
                <TextField
                  id="datetime-local"
                  label="Next appointment"
                  type="datetime-local"
                  name="date"
                  defaultValue="2021-02-20T10:30"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth="true"
                />
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

export default About;
