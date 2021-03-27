import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AppsIcon from "@material-ui/icons/Apps";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import EventIcon from "@material-ui/icons/Event";
import ManageHeader from "./ManageHeader";
import ManageCards from "./ManageCards";
import ManageTable from "./ManageTable";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
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
    title: "Donec elementum.",
    date: "April 18, 2021 10:19 PM",
    priority: "Low",
  },
  {
    id: 2,
    title: "Nam convallis",
    date: "May 20, 2021 8:00 AM",
    priority: "Low",
  },
  {
    id: 3,
    title: "Etiam ac faucibus pellentese.",
    date: "July 15, 2021 7:00 PM",
    priority: "High",
  },
];

function Manage() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
          <ManageHeader
            icon={<EventIcon />}
            title="Show calendar"
            text="Show calendar with scheduled dates"
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
          <ManageHeader
            icon={<AppsIcon />}
            title="Manage"
            text="Manage reminders"
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
          <ManageHeader
            icon={<ContactSupportIcon />}
            title="Help"
            text="Frequent questions"
          />
        </Grid>

        <Grid container spacing={1} className={classes.container}>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <ManageCards title="Total reminders" text="18" />
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <ManageCards title="Pending for this day" text="2" />
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <ManageCards title="Pending for this week" text="4" />
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <ManageCards title="Pending for this month" text="12" />
          </Grid>
        </Grid>

        <Grid item xs={12} className={classes.containerTable}>
          <ManageTable data={data} />
        </Grid>
      </Grid>
    </div>
  );
}

export default Manage;
