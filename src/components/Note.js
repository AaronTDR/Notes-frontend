import React from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";

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
}));

const Note = (props) => {
  const classes = useStyles();

  if (!props.note) {
    props.history.push("/");
    return null;
  }
  const {
    note: { title, note, date, _id },
  } = props;
  return (
    <Grid container justify="center" spacing={1}>
      <Grid key={_id} item xs={12} sm={10} md={10}>
        <Card variant="outlined">
          <CardContent className={classes.container}>
            <IconButton aria-label="edit" className={classes.editBtn}>
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
                  variant="outlined"
                  color="secondary"
                  size="large"
                  fullWidth
                  className={classes.deleteBtn}
                >
                  Delete &times;
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default withRouter(Note);
