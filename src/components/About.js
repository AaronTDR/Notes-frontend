import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import AppsIcon from "@material-ui/icons/Apps";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import AboutHeader from "./AboutHeader";
import AboutCards from "./AboutCards";
import AboutGraphics from "./AboutGraphics";
import TableAbout from "./TableAbout";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  icons: {
    color: "white",
  },
  container: {
    paddingTop: "40px",
    alignItems: "center",
  },
  containerGraphic: {
    marginTop: "40px",
  },
  containerTable: {
    marginTop: "40px",
  },
}));

const data = [
  {
    id: 1,
    tempus: "Donec elementum odio pellentesque mi tempus pharetra.",
    tempor: "05/04/21",
    scelerisque: 32,
  },
  {
    id: 2,
    tempus: "Nam convallis dolor sit amet vestibulum varius",
    tempor: "07/09/21",
    scelerisque: 31,
  },
  {
    id: 3,
    tempus:
      "Etiam ac faucibus ex. Donec pellentesque tortor ut faucibus bibendum. In elit augue, tempus eget eli.",
    tempor: "02/02/21",
    scelerisque: 21,
  },
];

function About() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
          <AboutHeader
            icon={<MailOutlineIcon className={classes.icons} />}
            title="Fusce sed leo erat"
            text="Nam tristique facilisis"
            color="rgba(248,80,50,1)"
            font="white"
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
          <AboutHeader
            icon={<AppsIcon className={classes.icons} />}
            title=" Curabitur"
            text="Sed at ante"
            color="rgba(248,80,50,1)"
            font="white"
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
          <AboutHeader
            icon={<ContactSupportIcon className={classes.icons} />}
            title="Pellentesque sit "
            text="85"
            color="rgba(248,80,50,1)"
            font="white"
          />
        </Grid>

        <Grid
          container
          spacing={1}
          className={classes.container}
          xs={12}
          sm={12}
          md={6}
          lg={6}
          xl={6}
        >
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <AboutCards title="Morbi tempor" text="692" />
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <AboutCards title="Lorem ipsum" text="111,092" />
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <AboutCards title="Donec elementum" text="2,504" />
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <AboutCards title="Vivamus faucibus" text="14.2%" />
          </Grid>
        </Grid>

        <Grid item xs={0} sm={0} md={1} lg={1} xl={1}></Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={5}
          lg={5}
          xl={5}
          className={classes.containerGraphic}
        >
          <AboutGraphics />
        </Grid>

        <Grid item xs={12} className={classes.containerTable}>
          <TableAbout data={data} />
        </Grid>
      </Grid>
    </div>
  );
}

export default About;
