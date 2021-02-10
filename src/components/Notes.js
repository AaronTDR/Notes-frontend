import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import OutlinedCard from "./OutlinedCard";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    minWidth: 300,
  },
}));

export default function Notes(props) {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Grid container justify="center" spacing={2}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((value) => (
          <Grid key={value} item xs={12} sm={6} md={3} className={classes.card}>
            <OutlinedCard />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
