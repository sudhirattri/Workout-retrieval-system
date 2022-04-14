import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'

export default function RankedResults(props) {
  const [checked, setChecked] = React.useState([0]);

  const [rankedResults, setRankedResults] = React.useState(['test results']);

  // setRankedResults(oldArray => props.rankedResults)

  const handleToggle = (value) => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];

      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
      setChecked(newChecked);
    };
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Ranked Results
        </Typography>
        <Grid container spacing={3} alignItems="center" justifyContent="center">
        <Grid item xs={12} margin={2} alignItems="center" justifyContent="center" >
          <List sx={{ width: '100%' , bgcolor: 'white' ,
              borderColor: 'grey.500', border: 1, borderRadius: 1 ,alignContent: 'center'}}>

              {["res1 : owowowow","res2 : owowowow","res3 : owowowow","res4 : owowowow"].map((value,index) => {
                  const labelId = `checkbox-list-label-${value}`;

                  return (
                  <ListItem
                      sx = {{alignContent: 'center'}}
                      alignItems='center'
                      key={value}
                      disablePadding
                      key={index}
                  >
                      <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                      {/* <ListItemIcon>
                          <Checkbox
                          edge="start"
                          checked={checked.indexOf(value) !== -1}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ 'aria-labelledby': labelId }}
                          />
                      </ListItemIcon> */}
                      <ListItemText sx = {{ maxWidth: 120 , alignText: 'center'}} id={labelId} primary={`${index+1}. ${value}`} />
                      </ListItemButton>
                  </ListItem>
                  );
              })}
              </List>
              </Grid>
        </Grid>
      </React.Fragment>
    );
  }