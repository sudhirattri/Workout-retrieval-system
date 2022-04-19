import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SelectEquipment from './SelectEquipment';
import SelectMuscle from './SelectMuscle';
import RankedResults from './RankedResults';

import { example_request , example_response } from "./../data/example_query";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      <Link color="inherit" href="https://github.com/sudhirattri/workout-retrieval-system">
        IR project, group 37
      </Link>{' '}
    </Typography>
  );
}

const steps = ['Equipment', 'Body Part', 'Ranked search'];

const theme = createTheme();

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

const nextButtonName = ["Muscle Group","Find exercises"]
const secButtonName1 = ["Add manually","Add manually", "Toggele gifs/video"]
const secButtonName2 = ["Use Camera","Use visual Selector", "Toggele Description"]

const pageTitle = ["Select gym equipment","Select Muscle Group","Ranked query retrieval"]

export default function HomeLayout() {

  function updateEquipments(list){
    setEquipments(oldArray => list)
    console.log("ref func",list)
  }

  function closeDialog(list){
    setUseCamera(old => false)
  }

  function updateMuscleGroup(list){
    setMuscleGroups(oldArray => list)
    console.log("ref func",list)
  }

  function post_query(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "equipments": [
        "Barbell",
        "Dumbbells"
      ],
      "muscle_groups": [
        "Shoulders"
      ]
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
      mode:'no-cors'
    };
    
    // fetch("http://192.168.92.27:5001/", requestOptions)
    //   .then(response => {
    //     setRankedResults(oldArray => response.text)
    //     console.log(response.text);
    //   })
    //   .then(result => console.log(result))
    //   .catch(error => console.log('error', error));

    let formatted_response = example_response.map(function(item, index) {
      let exercise_obj = item["exercise"];
      let exercise_name = Object.keys(exercise_obj)[0];
      let desc = exercise_obj[exercise_name]
      return {
        exercise : exercise_name,
        desc : desc,
        equipment : item["equipment"],
        muscle_group : item["muscle_group"]
      }
    })
    setRankedResults(oldArray => formatted_response)
    console.log(formatted_response)
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <SelectEquipment equipments={equipments} close_dialog={closeDialog} ref_func={updateEquipments} useCamera={useCamera}/>;
      case 1:
        return <SelectMuscle muscleGroups={muscleGroups} ref_func={updateMuscleGroup} useVisualMuscles={useVisualMuscles}/>;
      case 2:
        return <RankedResults rankedResults={rankedResults} viewGif={viewGif}/>;
      default:
        throw new Error('Unknown step');
    }
  }

  
  const [activeStep, setActiveStep] = React.useState(0);

  const [useCamera, setUseCamera] = React.useState(false);
  const [useVisualMuscles, setUseVisualMuscles] = React.useState(false);
  const [viewGif, setviewGif] = React.useState(true);

  const [equipments, setEquipments] = React.useState([]);
  const [muscleGroups, setMuscleGroups] = React.useState([]);
  const [rankedResults, setRankedResults] = React.useState([]);

  const selectEquipmentRef = React.useRef(null);;
  const selectMuscleRef = React.useRef(null);;

  React.useEffect(() => post_query(), [])

  const getSecondaryButtonText = () => {
    switch (activeStep) {
      case 0:
        return useCamera? (secButtonName1[activeStep]):(secButtonName2[activeStep])
        break;
      case 1:
        return useVisualMuscles? (secButtonName1[activeStep]):(secButtonName2[activeStep])
        break;
      case 2:
        return viewGif? (secButtonName1[activeStep]):(secButtonName2[activeStep])
    }
  }
  const handleNext = () => {
    if(activeStep==1){
      post_query()
    }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSecondaryClick = () => {
    switch (activeStep) {
      case 0:
        setUseCamera(old => !old);
        break;
      case 1:
        setUseVisualMuscles(old => !old);
        break;
      case 2:
        setviewGif(old => !old);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Workout Retrieval System
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h4" variant="h5" align="center">
            {pageTitle[activeStep]}
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep,equipments,muscleGroups,rankedResults)}
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    {activeStep >= 0 &&
                      <Button
                      variant="outlined"
                      onClick={handleSecondaryClick}
                      sx={{ mt: 3, ml: 1 }}
                      >
                        {getSecondaryButtonText()}
                      </Button>
                    }
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      {activeStep !== 0 && (
                        <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                          Back
                        </Button>
                      )}
                      {activeStep !== steps.length - 1 &&
                        <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 3, ml: 1 }}
                        >
                          {nextButtonName[activeStep]}
                        </Button>
                      }
                    </Box>

                  </Box>

              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}