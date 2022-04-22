import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import IconButton from '@mui/material/IconButton'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Webcam from "react-webcam";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

import { BrowserView, MobileView } from 'react-device-detect';

import { data } from "./../data/data";
import { ThemeProvider, createTheme } from '@mui/material/styles';

const equipment_options = Object.keys(data).map(function(key, index) {
    return key
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const videoConstraintsBrowser = {
  facingMode: { exact: "user" }
};

const videoConstraintsMobile = {
  facingMode: { exact: "environment" }
};

const theme = createTheme();

console.log("options",equipment_options)

export default function SelectEquipment(props) {

    // console.log("props", props)

    const [checked, setChecked] = React.useState([0]);

    const [equipments, setEquipments] = React.useState([]);

    const [useCamera, setUseCamera] = React.useState(false);

    const [open, setOpen] = React.useState(false);

    const webcamRef = React.useRef(null);

    React.useEffect(() => {
      setEquipments(oldArray => props.equipments);
      setUseCamera(old => props.useCamera)
    }, []);

    React.useEffect(() => {
      if(props.useCamera){
        console.log("start dialog")
        setOpen(true);
      }
    },[props.useCamera]);

    const handleClose = () => {
      setUseCamera(old => false);
      props.close_dialog();
      setOpen(false);
    };

    const handleChange = (value) =>
    {
      setEquipments(oldArray => value)
      props.ref_func(value)
    };

    const captureCamera = () => {
      const imageSrc = webcamRef.current.getScreenshot();
      props.captureCamera(imageSrc);
      handleClose();
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

    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
            Add equipments to your list in priority order
        </Typography>
        <Grid container spacing={3} alignItems="center" justifyContent="center" direction="column">
          <Grid item xs={12} margin={2}>
          {true &&
            <Autocomplete
                freeSolo
                multiple
                disablePortal
                id="equipment-select"
                options={equipment_options}
                value = {equipments}
                sx={{ width: 300 }}
                onChange={(event, value) => handleChange(value)}
                renderInput={(params) => <TextField {...params} label="Select Equipment" 
                        onKeyDown={e => {
                            if (e.code === 'enter' && e.target.value) {
                                // setEquipments(oldArray => [...oldArray, 'newElement']);
                                console.log("clicked enter")
                            }
                        }} 
                    />}
            />
          }
          {useCamera === true &&
            <p>Open dialog</p>
          }
          </Grid>
          {equipments.length !== 0 &&
              <List sx={{ width: '100%', maxWidth: 240  , bgcolor: 'white' ,
                  borderColor: 'grey.500', border: 1, borderRadius: 1 ,alignContent: 'center'}}>
      
                  {equipments.map((value,index) => {
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
        </Grid>

        <ThemeProvider theme={theme}>
        <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        keepMounted
        sx={{backgroundColor: 'gray'}}
        >
          
            <AppBar sx={{ position: 'relative' }} color="primary">
              <Toolbar>
                <IconButton
                  edge="start"
                  onClick={handleClose}
                  aria-label="close"
                  style={{ color: 'white' }}
                >
                  <CloseIcon />
                </IconButton>
                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                  Scan gym equipment
                </Typography>
                <Button autoFocus color="inherit" onClick={handleClose}>
                  Back
                </Button>
              </Toolbar>
            </AppBar>
          <Box display="flex" flexDirection="column" justifyContent="center"
            className={"cameraBox"}
          >
            <BrowserView>
            {open &&
            <Webcam
              audio={false}
              mirrored={true}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraintsBrowser}
              ref={webcamRef}
            />
            }
            </BrowserView>
            <MobileView>
            {open &&
            <Webcam
              audio={false}
              mirrored={true}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraintsMobile}
            />
            }
            </MobileView>

          </Box>

          <Box height="10vh" display="flex" justifyContent="center" flexDirection="row" style={{"margin-top":"auto"}}>
            <Button
              variant="contained"
              sx={{ mt: 2, ml: 1, margin: 2, boxShadow: 10}}
              onClick={captureCamera}
              >
                Take Photo
            </Button>
          </Box>

        </Dialog>
        </ThemeProvider>
      </React.Fragment>
    );
  }