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
  button: {
    marginRight: "auto",
  },
}));

export default function Notes(props) {
  const classes = useStyles();

  if (props.notes === 0) return null;

  return (
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
              <CardActionArea>
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
                    variant="caution"
                    align="right"
                    gutterBottom
                  >
                    {note.time} - {note.date}
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
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
