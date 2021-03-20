import React, { useState, Fragment } from "react";
import "date-fns";
import { format } from "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import Grid from "@material-ui/core/Grid";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDateTimePicker,
  DateTimePicker,
} from "@material-ui/pickers";

const About = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log("HORA Y FECHA===>", selectedDate);
  };

  return (
    <Fragment>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <KeyboardDateTimePicker
            //disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker"
            label="Date Picker"
            value={selectedDate}
            onChange={handleDateChange}
            disablePast
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />

          <DateTimePicker
            variant="inline"
            margin="normal"
            label="Basic example"
            value={selectedDate}
            onChange={handleDateChange}
            disablePast
            inputVariant="outlined"
          />

          <KeyboardDateTimePicker
            variant="inline"
            margin="normal"
            label="With keyboard"
            value={selectedDate}
            onChange={handleDateChange}
            onError={console.log}
            disablePast
            format="yyyy/MM/dd hh:mm a"
            inputVariant="outlined"
          />
        </Grid>
      </MuiPickersUtilsProvider>
      <p>{`Hora: ${format(selectedDate, "hh:mm a")}`}</p>
      <p>{`Fecha: ${format(selectedDate, "yyyy/MM/dd")}`}</p>
    </Fragment>
  );
};

export default About;
