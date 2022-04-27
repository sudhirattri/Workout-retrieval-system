import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'

import MuscleWiki from './MuscleWiki';

import { data } from "./../data/data";

function generate_muscle_groups(){
  let equips = Object.keys(data);
  let muscle_groups_set = new Set()
  muscle_groups_set.add("Any Muscle Group")
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

    const [useVisualMuscles, setUseVisualMuscles] = React.useState(false);

    React.useEffect(() => {
      setMuscleGroups(oldArray => props.muscleGroups)
    }, []);

    React.useEffect(() => {
      setUseVisualMuscles(old => props.useVisualMuscles)
    },[props.useVisualMuscles]);

    const handleChange = (value) =>
    {
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

    function selectMuscleFromDiagram(newMuscle){
      props.ref_func([ ...muscleGroups, newMuscle ])
      setMuscleGroups(oldArray => [ ...oldArray, newMuscle ])
      console.log("Adding muscle from diagram")
    }
    
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom marginLeft={4}>
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
                      disablePadding
                      key={index}
                  >
                      <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                      <ListItemText sx = {{ maxWidth: 120 , alignText: 'center'}} id={labelId} primary={`${index+1}. ${value}`} />
                      </ListItemButton>
                  </ListItem>
                  );
              })}
            </List>
          }

          {useVisualMuscles &&
          <React.Fragment>
            <MuscleWiki selectMuscleFromDiagram={selectMuscleFromDiagram}></MuscleWiki>
          </React.Fragment>
          }

        </Grid>
      </React.Fragment>
    );
}

// src="(.*)"
// src={require('$1')}

// /MuscleWiki_files/
// /images/

// .png">
// .png"/>