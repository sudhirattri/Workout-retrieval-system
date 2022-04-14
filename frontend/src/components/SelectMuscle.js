import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'

import { data } from "./../data/data";

function generate_muscle_groups(){
  let equips = Object.keys(data);
  let muscle_groups_set = new Set()
  equips.forEach(equipment => {
    // console.log(data[equipment])
    Object.keys(data[equipment]).forEach(muscle_group => {
      muscle_groups_set.add(muscle_group)
    });
  });
  return [...muscle_groups_set]
}

const muscle_options = generate_muscle_groups();

console.log("options",muscle_options)

export default function SelectMuscle(props) {
    
    console.log("props", props)
    const [muscleGroups, setMuscleGroups] = React.useState([]);
    const [checked, setChecked] = React.useState([0]);

    // setMuscleGroups(oldArray => props.muscleGroups)
    React.useEffect(() => setMuscleGroups(oldArray => props.muscleGroups), [])

    const handleChange = (value) =>
    {
      const muscle_groups_list = value.map(function(a){return a.label;});
      setMuscleGroups(oldArray => value)
      props.ref_func(value)
      console.log(value);
    };

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
    
        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
        
        console.log(newChecked)
        console.log(muscleGroups)
        setChecked(newChecked);
    };

    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Select Muscle Group
        </Typography>
        <Grid container spacing={3} alignItems="center" justifyContent="center" direction="column">
          <Grid item xs={12} margin={2}>
            <Autocomplete
                freeSolo
                multiple
                disablePortal
                id="equipment-select"
                options={muscle_options}
                value = {muscleGroups}
                sx={{ width: 300 }}
                onChange={(event, value) => handleChange(value)}
                renderInput={(params) => <TextField {...params} label="Select Muscle group" 
                        onKeyDown={e => {
                            if (e.code === 'enter' && e.target.value) {
                                // setEquipments(oldArray => [...oldArray, 'newElement']);
                                console.log("clicked enter")
                            }
                        }} 
                    />}
            />
          </Grid>
          {muscleGroups.length !== 0 &&
            <List sx={{ width: '100%', maxWidth: 240  , bgcolor: 'white' ,
              borderColor: 'grey.500', border: 1, borderRadius: 1 ,alignContent: 'center'}}>
  
              {muscleGroups.map((value,index) => {
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
          }

        </Grid>
      </React.Fragment>
    );
  }