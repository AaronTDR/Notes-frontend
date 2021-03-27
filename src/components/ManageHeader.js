import React from "react";
import { Card, Typography, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

function ManageHeader(props) {
  const useStyles = makeStyles(() => ({
    root: {
      textAlign: "center",
    },
    text: {
      fontSize: 18,
    },
    title: {
      fontWeight: "bold",
      fontSize: 22,
    },
  }));

  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        {props.icon}
        <Typography className={classes.title}>{props.title}</Typography>

        <Typography className={classes.text}>{props.text}</Typography>
      </CardContent>
    </Card>
  );
}

export default ManageHeader;
