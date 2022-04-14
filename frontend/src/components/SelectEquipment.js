import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import IconButton from '@mui/material/IconButton'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'

import { data } from "./../data/data";

const equipment_options = Object.keys(data).map(function(key, index) {
    return { "label": key, "id": index }
});

export default function SelectEquipment() {

    const [checked, setChecked] = React.useState([0]);

    const [equipments, setEquipments] = React.useState([]);

    const handleChange = (value) =>
    {
      const equipment_list = value.map(function(a){return a.label;});
      setEquipments(oldArray => equipment_list)
      console.log(equipment_list);
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
        console.log(equipments)
        setChecked(newChecked);
    };
    //   setTheArray(oldArray => [...oldArray, newElement]);
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
            Add equipments to your list in priority order
        </Typography>
        <Grid container spacing={3} alignItems="center" justifyContent="center" direction="column">
          <Grid item xs={12} margin={2}>
            <Autocomplete
                freeSolo
                multiple
                disablePortal
                id="equipment-select"
                options={equipment_options}
                sx={{ width: 300 }}
                onChange={(event, value) => handleChange(value)}
                renderInput={(params) => <TextField {...params} label="Gym equipment" 
                        onKeyDown={e => {
                            if (e.code === 'enter' && e.target.value) {
                                // setEquipments(oldArray => [...oldArray, 'newElement']);
                                console.log("clicked enter")
                            }
                        }} 
                    />}
            />
          </Grid>

          <List sx={{ width: '100%', maxWidth: 240  , bgcolor: 'white' ,
            borderColor: 'grey.500', border: 1, borderRadius: 1 ,alignContent: 'center'}}>

            {equipments.map((value,index) => {
                const labelId = `checkbox-list-label-${value}`;

                return (
                <ListItem
                    sx = {{alignContent: 'center'}}
                    alignItems='center'
                    key={value}
                    disablePadding
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
      </React.Fragment>
    );
  }