import React from "react";
import { Card, Typography, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    textAlign: "center",
    backgroundColor: "#01579b",
  },
  text: {
    fontSize: 18,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
}));

function ManageCards(props) {
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

export default ManageCards;
