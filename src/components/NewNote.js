import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() => ({
  InputTitle: {
    marginTop: "40px",
  },
}));

const NewNote = (props) => {
  const classes = useStyles();
  return (
    <Fragment>
      <Typography
        color="textSecondary"
        gutterBottom
        variant="h3"
        component="h2"
        align="center"
      >
        Add a new note
      </Typography>
      <form noValidate autoComplete="off">
        <Grid container justify="center" spacing={4}>
          <Grid item xs={12} sm={7} md={7} className={classes.InputTitle}>
            <TextField
              id="outlined"
              label="Title"
              variant="outlined"
              type="string"
              fullWidth="true"
            />
          </Grid>

          <Grid item xs={12} sm={7} md={7}>
            <TextField
              id="standard-multiline-static"
              label="Note"
              multiline
              rows={8}
              variant="outlined"
              type="string"
              rowsMax="15"
              fullWidth="true"
            />
          </Grid>

          <Grid item xs={12} sm={7} md={7}>
            <TextField
              id="datetime-local"
              label="Next appointment"
              type="datetime-local"
              defaultValue="2021-02-13T10:30"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth="true"
            />
          </Grid>
          <Grid item xs={12} sm={7} md={7}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<SaveIcon />}
              fullWidth
              type="submit"
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </Fragment>
  );
};

export default NewNote;
