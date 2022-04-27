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

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

import { example_response } from "./../data/example_query";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      <Link color="inherit" href="https://github.com/sudhirattri/workout-retrieval-system">
        IR project, group 37 - Github Link
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

const blobToBase64 = blob => {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  return new Promise(resolve => {
    reader.onloadend = () => {
      resolve(reader.result);
    };
  });
};

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

  function post_query(development){

    setRankedResults(null)

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    console.log(muscleGroups,"Any Muscle Group" in muscleGroups)
    var raw = JSON.stringify({
      "equipments": (equipments.includes("Any Equipment"))?([]):(equipments),
      "muscle_groups": (muscleGroups.includes("Any Muscle Group"))?([]):(muscleGroups),
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    
    let api_endpoint = (development) ? ("http://127.0.0.1:5001/") :("https://workout-retrieval-system.herokuapp.com/")
    fetch(api_endpoint, requestOptions)
      .then(response => {
        response.json().then(response_json => {
          if(response_json["success"]==false){
            setRankedResults(oldArray => [])
          }
          else{
            console.log("respnse",response_json)
            let formatted_response = response_json.map(function(item, index) {
              return {
                exercise : item["name"],
                desc : item["description"],
                equipment : item["equipment"],
                muscle_group : item["muscle_group"]
              }
            })
            console.log("response came",formatted_response)
            setRankedResults(oldArray => formatted_response)
          }
        });
      })
      .catch(error => console.log('error', error));
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
  const [rankedResults, setRankedResults] = React.useState(null);

  const [resultCV, setResultCV] = React.useState(null);
  const [uploadStatus, setUploadStatus] = React.useState(0);

  const [uploadImageFile, setUploadImageFile] = React.useState(null);

  const [development, setDevelopment] = React.useState(false);

  const [openSnack, setOpenSnack] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
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
      if(equipments.length==0 && muscleGroups.length==0){
        // post_query()
        // setActiveStep(activeStep + 1);
        setOpenSnack(true);
      }
      else{
        post_query()
        setActiveStep(activeStep + 1);
      }
    }
    else{
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const uploadImageFromFiles = async (event) => {
    console.log("upload image dialog",event.target.files[0]);
    let objectURL = URL.createObjectURL(event.target.files[0]);

    let blob = await fetch(objectURL).then(r => r.blob());
    let base64image = await blobToBase64(blob)
    setUploadImageFile(objectURL)
    uploadImageToServer(base64image)
  };

  const uploadImageToServer = async (uploadImageFile) => {

    setUploadStatus(1);
    console.log("UPLOADING FILE TO SERVER")
    // await delay(100000);
    let api_endpoint = (development) ? ("http://127.0.0.1:5001/imageRecognize") :("http://workout-retrieval-system.herokuapp.com/imageRecognize")
    const formData = new FormData();
    formData.append("image", uploadImageFile);

    // console.log(uploadImageFile)

    const rawResponse = await fetch(api_endpoint, {
      method: 'POST',
      body: formData
    });

    let responseJSON = await rawResponse.json();
    console.log(responseJSON)
    if(responseJSON["success"]==true){
      let probs = responseJSON["probs"]
      setResultCV(responseJSON["equipment"])
      if(parseFloat(probs)<0.5){
        setResultCV("Not recognized as any equipment")
      }
      else{
        setResultCV("Identified as "+responseJSON["equipment"]+" prob: "+probs)
        setEquipments(oldArray => [...oldArray, responseJSON["equipment"]])
      }
    }
    // await delay(1000);
    setUploadStatus(2);

  };

  const clickUpload = () => {
    console.log("Click upload")
    document.getElementById("file-picker").click()
  };

  const captureCamera = (imageSource) => {
    // console.log("capture camera",imageSource)
    setUploadImageFile(imageSource)
    uploadImageToServer(imageSource)
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

  const handleChange = (event) => {
    console.log("hanldechange", event)
    setDevelopment(event.target.checked);
    console.log("handlenext", console.log(equipments))
    // setState({
    //   ...state,
    //   [event.target.name]: ,
    // });
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
          <FormGroup className='leftFloat'>
            <FormControlLabel
              control={
                <Switch checked={development} onChange={handleChange} name="development" />
              }
              label="Enable Dev API"
            />
          </FormGroup>
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
                {(uploadImageFile !== null && activeStep === 0)  && (
                  <Box display="flex" flexDirection="row" justifyContent="space-between" margin={2}
                    className={"imagePreviewBox"}
                  >
                    <img src={uploadImageFile} style={{"width": "50%" , "height": "auto", margin:"10px",padding:"0"}}/>
                    <Box display="flex" flexDirection="column" justifyContent="center" margin={2} style={{"width": "100%" , "height": "auto", margin:"0px",padding:"0"}}>
                    {uploadStatus === 1 && (
                      <React.Fragment>
                        <Box display="flex" flexDirection="column" justifyContent="space-around"
                        style={{ textAlign: "center", "width": "100%" , "height": "50%", margin:"0px",padding:"0"}}
                        >
                          <CircularProgress disableShrink className='circularProgress'/>
                          <Typography variant="h7" gutterBottom>
                            Uploading Results
                          </Typography>
                        </Box>
                      </React.Fragment>
                    )}
                    {uploadStatus === 2 && (
                      <React.Fragment>
                        <Box display="flex" flexDirection="column" justifyContent="flex-start"
                        style={{ textAlign: "center","width": "100%" , "height": "50%", margin:"0px",padding:"0", "marginLeft":"20px"}}
                        >
                          <Typography variant="h6" gutterBottom style={{"margin-bottom":"auto"}}>
                            Image Uploaded
                          </Typography>
                          <Typography variant="h7" gutterBottom>
                            {resultCV}
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
                      <input type="file" id='file-picker' onChange={uploadImageFromFiles} style={{"display":"none"}}/>
                      </Button>
                    }
                    {activeStep !== 2 &&
                    <Button
                    variant="outlined"
                    onClick={handleSecondaryClick}
                    sx={{ mt: 3, ml: 1 }}
                    >
                      {getSecondaryButtonText()}
                    </Button>
                    }
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
          <Snackbar
                open={openSnack}
                autoHideDuration={6000}
                onClose={handleClose}
                message="All parameters are empty"
                action={action}
            />
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}