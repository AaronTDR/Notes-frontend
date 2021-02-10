import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles({
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
  button: {
    marginRight: "auto",
  },
});

export default function OutlinedCard() {
  const classes = useStyles();

  return (
    <Card variant="outlined">
      <CardActionArea>
        <CardContent className={classes.cardContent}>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
            variant="h5"
            component="h2"
          >
            Gym mañana tempranoGym
          </Typography>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="body1"
            component="p"
          >
            Gym mañana tempranoGym mañana tempranoGym mañana tempranoGym mañana
            jndflkjnl nsf kdsf lknf kndsfl knowe ndsfGym mañana tempranoGym
            mañana tempranoGym mañana tempranoGym mañana jndflkjnl nsf kdsf lknf
            kndsfl knowe ndsfGym mañana tempranoGym mañana tempranoGym mañana
            tempranoGym mañana jndflkjnl nsf kdsf lknf kndsfl knowe ndsfGym
            mañana tempranoGym mañana tempranoGym mañana tempranoGym mañana
            jndflkjnl nsf kdsf lknf kndsfl knowe ndsf
          </Typography>
        </CardContent>
        <CardContent>
          <Typography
            component="p"
            variant="caution"
            align="right"
            gutterBottom
          >
            Hora: 7:17 pm. - Fecha: 6/02/21
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions>
        <Button color="primary" size="small">
          Learn More
        </Button>
        <IconButton aria-label="edit" className={classes.button}>
          <EditIcon fontSize="small" />
        </IconButton>

        <IconButton aria-label="delete">
          <DeleteIcon fontSize="large" color="secondary" />
        </IconButton>
      </CardActions>
    </Card>
  );
}
