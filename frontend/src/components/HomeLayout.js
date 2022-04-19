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
import CircularProgress from '@mui/material/CircularProgress';

import { example_response } from "./../data/example_query";

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

const delay = ms => new Promise(res => setTimeout(res, ms));

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
    };
    
    fetch("http://127.0.0.1:5001/", requestOptions)
      .then(response => {
        // setRankedResults(oldArray => response.text)
        response.json().then(response_json => {
          let formatted_response = response_json.map(function(item, index) {
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
          // console.log("Response",formatted_response)
          setRankedResults(oldArray => formatted_response)
        });
      })
      .catch(error => console.log('error', error));

    // let formatted_response = example_response.map(function(item, index) {
    //   let exercise_obj = item["exercise"];
    //   let exercise_name = Object.keys(exercise_obj)[0];
    //   let desc = exercise_obj[exercise_name]
    //   return {
    //     exercise : exercise_name,
    //     desc : desc,
    //     equipment : item["equipment"],
    //     muscle_group : item["muscle_group"]
    //   }
    // })
    // setRankedResults(oldArray => formatted_response)
    // console.log("Example",formatted_response)
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <SelectEquipment captureCamera={captureCamera} equipments={equipments} close_dialog={closeDialog} ref_func={updateEquipments} useCamera={useCamera}/>;
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

  const [resultCV, setResultCV] = React.useState(null);
  const [uploadStatus, setUploadStatus] = React.useState(0);

  const [uploadImageFile, setUploadImageFile] = React.useState(null);


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

  const uploadImage = async (event) => {
    console.log("upload image dialog",event.target.files[0]);
    setUploadImageFile(URL.createObjectURL(event.target.files[0]))
    setUploadStatus(1);
    await delay(2000);
    setUploadStatus(2);
  };

  const clickUpload = () => {
    console.log("Click upload")
    document.getElementById("file-picker").click()
  };

  const captureCamera = (imageSource) => {
    console.log("capture camera",imageSource)
    setUploadImageFile(imageSource)
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
                  idk what
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep,equipments,muscleGroups,rankedResults)}
                {uploadImageFile !== null && (
                  <Box display="flex" flexDirection="row" justifyContent="space-between" margin={2}
                    className={"imagePreviewBox"}
                  >
                    <img src={uploadImageFile} style={{"width": "50%" , "height": "auto", margin:"10px",padding:"0"}}/>
                    <Box display="flex" flexDirection="column" justifyContent="center" margin={2} style={{"width": "100%" , "height": "auto", margin:"0px",padding:"0"}}>
                    {uploadStatus === 1 && (
                      <React.Fragment>
                        <Box display="flex" flexDirection="column" justifyContent="space-around"
                        style={{"width": "100%" , "height": "50%", margin:"0px",padding:"0"}}
                        >
                          <CircularProgress disableShrink style={{"align-self":"center"}}/>
                          <Typography variant="h7" gutterBottom>
                          Uploading Results
                          </Typography>
                        </Box>
                      </React.Fragment>
                    )}
                    {uploadStatus === 2 && (
                      <React.Fragment>
                        <Box display="flex" flexDirection="column" justifyContent="flex-start"
                        style={{"width": "100%" , "height": "50%", margin:"0px",padding:"0"}}
                        >
                          <Typography variant="h6" gutterBottom style={{"margin-bottom":"auto"}}>
                            Image Uploaded
                          </Typography>
                          <Typography variant="h7" gutterBottom>
                            Identified as : null
                          </Typography>
                        </Box>

                      </React.Fragment>
                    )}
                    </Box>
                  </Box>
                )} 
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>

                  <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                    {activeStep === 0 &&
                      <Button
                      variant="outlined"
                      sx={{ mt: 3, ml: 1 }}
                      onClick={clickUpload}
                      >
                        Upload  Image
                      <input type="file" id='file-picker' onChange={uploadImage} style={{"display":"none"}}/>
                      </Button>
                    }
                    <Button
                    variant="outlined"
                    onClick={handleSecondaryClick}
                    sx={{ mt: 3, ml: 1 }}
                    >
                      {getSecondaryButtonText()}
                    </Button>
                  </Box>
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