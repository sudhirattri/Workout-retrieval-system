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

const buttonName = ["Muscle Group","Find exercises"]
const pageTitle = ["Select gym equipment","Select Muscle Group","Ranked query retrieval"]

export default function Checkout() {

  function updateEquipments(list){
    setEquipments(oldArray => list)
    console.log("ref func",list)
  }
  
  function updateMuscleGroup(list){
    setMuscleGroups(oldArray => list)
    console.log("ref func",list)
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <SelectEquipment equipments={equipments} ref_func={updateEquipments}/>;
      case 1:
        return <SelectMuscle muscleGroups={muscleGroups} ref_func={updateMuscleGroup}/>;
      case 2:
        return <RankedResults rankedResults={rankedResults}/>;
      default:
        throw new Error('Unknown step');
    }
  }

  
  const [activeStep, setActiveStep] = React.useState(0);
  const [equipments, setEquipments] = React.useState([]);
  const [muscleGroups, setMuscleGroups] = React.useState([]);
  const [rankedResults, setRankedResults] = React.useState([]);

  const selectEquipmentRef = React.useRef(null);;
  const selectMuscleRef = React.useRef(null);;

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
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
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
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
                      {buttonName[activeStep]}
                    </Button>
                  }

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