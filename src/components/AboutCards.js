import React from "react";
import { Card, Typography, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    textAlign: "center",
    backgroundColor: "rgba(73,155,234,1)",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
  },
}));

function AboutCards(props) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title}>{props.title}</Typography>

        <Typography className={classes.text}>{props.text}</Typography>
      </CardContent>
    </Card>
  );
}

export default AboutCards;
