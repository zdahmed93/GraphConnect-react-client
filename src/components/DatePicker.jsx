import 'moment';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateMomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function MaterialUIPickers({returnSelectedDate}) {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(new Date('1990-08-18T21:11:54'));

  const handleDateChange = date => {
    console.log(date)
    setSelectedDate(date);
    returnSelectedDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateMomentUtils}>
      <Grid item>
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Birth date"
          format="MM/DD/YYYY"
          value={selectedDate}
          inputVariant="outlined"
          fullWidth
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
