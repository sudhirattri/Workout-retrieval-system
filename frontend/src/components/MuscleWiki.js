import React from "react";
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

export default function MuscleWiki(props) {
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

    const onMuscleSelect = (muscle) =>
    {
        console.log("id",muscle.target.id)
        if(muscle.target.id==='background'){
            setOpenSnack(true);
            return;
        }
        let muscleName = "";
        switch (muscle.target.id) {
            case "traps-a":
            case "female-traps-a":
                muscleName = "Traps";
                break;
            case "traps-b":
            case "female-traps-b":
                muscleName = "Traps";
                break;
            case "shoulders-a":
            case "female-shoulders-a":
                muscleName = "Shoulders";
                break;
            case "shoulders-b":
            case "female-shoulders-b":
                muscleName = "Shoulders";
                break;
            case "pecs":
            case "female-pecs":
                muscleName = "Chest";
                break;
            case "biceps-a":
            case "female-biceps-a":
                muscleName = "Biceps";
                break;
            case "biceps-b":
            case "female-biceps-b":
                muscleName = "Biceps";
                break;
            case "forearm-a":
            case "female-forearm-a":
                muscleName = "Forearms";
                break;
            case "forearm-b":
            case "female-forearm-b":
                muscleName = "Forearms";
                break;
            case "obliques":
            case "female-abdominals":
                muscleName = "Abdominals";
                break;
            case "quads-a":
            case "female-quads-a":
                muscleName = "Quads";
                break;
            case "quads-b":
            case "female-quads-b":
                muscleName = "Quads";
                break;
            case "calves-a":
            case "female-calves-a":
                muscleName = "Calves";
                break;
            case "calves-b":
            case "female-calves-b":
                muscleName = "Calves";
                break;
            case "back-traps-a":
            case "female-back-traps-a":
                muscleName = "Traps";
                break;
            case "back-traps-b":
            case "female-back-traps-b":
                muscleName = "Traps_middle";
                break;
            case "back-shoulders-a":
            case "female-back-shoulders-a":
                muscleName = "Shoulders";
                break;
            case "back-shoulders-b":
            case "female-back-shoulders-b":
                muscleName = "Shoulders";
                break;
            case "triceps-a":
            case "female-triceps-a":
                muscleName = "Triceps";
                break;
            case "triceps-b":
            case "female-triceps-b":
                muscleName = "Triceps";
                break;
            case "back-upper-a":
            case "female-back-upper-a":
                muscleName = "Lats";
                break;
            case "back-upper-b":
            case "female-back-upper-b":
                muscleName = "Lats";
                break;
            case "back-lats-a":
            case "female-back-lats-a":
                muscleName = "Lats";
                break;
            case "back-lats-b":
            case "female-back-lats-b":
                muscleName = "Lats";
                break;
            case "back-lower":
            case "female-back-lower":
                muscleName = "Lowerback";
                break;
            case "back-forearms-a":
            case "female-back-forearms-a":
                muscleName = "Forearms";
                break;
            case "back-forearms-b":
            case "female-back-forearms-b":
                muscleName = "Forearms";
                break;
            case "back-glutes":
            case "female-back-glutes":
                muscleName = "Glutes";
                break;
            case "back-hamstrings-a":
            case "female-back-hamstrings-a":
                muscleName = "Hamstrings";
                break;
            case "back-hamstrings-b":
            case "female-back-hamstrings-b":
                muscleName = "Hamstrings";
                break;
            case "back-calves-a":
            case "female-back-calves-a":
                muscleName = "Calves";
                break;
            case "back-calves-b":
            case "female-back-calves-b":
                muscleName = "Calves";
                break;
            default:
                muscleName = "";
        }
        console.log(muscleName);
        props.selectMuscleFromDiagram(muscleName);
    };
    return (
        <React.Fragment>
            {/* <div id="mobile-muscle-map">
                <img onClick={onMuscleSelect.bind(this)} alt="muscleImage" id="mobilebg" src={require('./images/mobilebg.png')} style={{"width": "75%" , "height": "auto"}}/>
                <img onClick={onMuscleSelect.bind(this)} alt="muscleImage" id="traps-a" src={require('./images/08.-TrapsLeft.png')}/>
                <img onClick={onMuscleSelect.bind(this)} alt="muscleImage" id="traps-b" src={require('./images/08.-TrapsRight.png')}/>
                <img onClick={onMuscleSelect.bind(this)} alt="muscleImage" id="shoulders-a" src={require('./images/07.A-Deltoids.png')}/>
                <img onClick={onMuscleSelect.bind(this)} alt="muscleImage" id="shoulders-b" src={require('./images/07.B-Deltoids.png')}/>
                <img onClick={onMuscleSelect.bind(this)} alt="muscleImage" id="pecs" src={require('./images/06.-Pecs.png')}/>
                <img onClick={onMuscleSelect.bind(this)} alt="muscleImage" id="biceps-a" src={require('./images/05.A-Biceps.png')}/>
                <img onClick={onMuscleSelect.bind(this)} alt="muscleImage" id="biceps-b" src={require('./images/05.B-Biceps.png')}/>
                <img onClick={onMuscleSelect.bind(this)} alt="muscleImage" id="forearm-a" src={require('./images/14.A-Forearms.png')}/>
                <img onClick={onMuscleSelect.bind(this)} alt="muscleImage" id="forearm-b" src={require('./images/14.B-Forearms.png')}/>
                <img onClick={onMuscleSelect.bind(this)} alt="muscleImage" id="obliques" src={require('./images/04.-Obliques.png')}/>
                <img onClick={onMuscleSelect.bind(this)} alt="muscleImage" id="quads-a" src={require('./images/01.A-Quads.png')}/>
                <img onClick={onMuscleSelect.bind(this)} alt="muscleImage" id="quads-b" src={require('./images/01.B-Quads.png')}/>
                <img onClick={onMuscleSelect.bind(this)} alt="muscleImage" id="calves-a" src={require('./images/13.A-Calves.png')}/>
                <img onClick={onMuscleSelect.bind(this)} alt="muscleImage" id="calves-b" src={require('./images/13.B-Calves.png')}/>
                <img onClick={onMuscleSelect.bind(this)} alt="muscleImage" id="back-traps-a" src={require('./images/08.B-Traps.png')}/>
                <img onClick={onMuscleSelect.bind(this)} alt="muscleImage" id="back-traps-b" src={require('./images/08.C-Traps.png')}/>
                <img onClick={onMuscleSelect.bind(this)} alt="muscleImage" id="back-shoulders-a" src={require('./images/07.C-Deltoids.png')}/>
                <img onClick={onMuscleSelect.bind(this)} alt="muscleImage" id="back-shoulders-b" src={require('./images/07.D-Deltoids.png')}/>
                <img onClick={onMuscleSelect.bind(this)} alt="muscleImage" id="triceps-a" src={require('./images/09.A-Triceps.png')}/>
                <img onClick={onMuscleSelect.bind(this)} alt="muscleImage" id="triceps-b" src={require('./images/09.B-Triceps.png')}/>
                <img onClick={onMuscleSelect.bind(this)} alt="muscleImage" id="back-lats-a" src={require('./images/10.A-Lats.png')}/>
                <img onClick={onMuscleSelect.bind(this)} alt="muscleImage" id="back-lats-b" src={require('./images/10.B-Lats.png')}/>
                <img onClick={onMuscleSelect.bind(this)} alt="muscleImage" id="back-lower" src={require('./images/15.-Lower-Back.png')}/>
                <img onClick={onMuscleSelect.bind(this)} alt="muscleImage" id="back-forearms-a" src={require('./images/14.C-Forearms.png')}/>
                <img onClick={onMuscleSelect.bind(this)} alt="muscleImage" id="back-forearms-b" src={require('./images/14.D-Forearms.png')}/>
                <img onClick={onMuscleSelect.bind(this)} alt="muscleImage" id="back-glutes" src={require('./images/11.-Glutes.png')}/>
                <img onClick={onMuscleSelect.bind(this)} alt="muscleImage" id="back-hamstrings-a" src={require('./images/12.A-Hamstrings.png')}/>
                <img onClick={onMuscleSelect.bind(this)} alt="muscleImage" id="back-hamstrings-b" src={require('./images/12.B-Hamstrings.png')}/>
                <img onClick={onMuscleSelect.bind(this)} alt="muscleImage" id="back-calves-a" src={require('./images/13.C-Calves.png')}/>
                <img onClick={onMuscleSelect.bind(this)} alt="muscleImage" id="back-calves-b" src={require('./images/13.D-Calves.png')}/>
            </div> */}
            <div id="muscle-map">
                <img onClick={onMuscleSelect.bind(this)} alt="muscleImage" id="background" src={require('./images/00.-Blank-Figures.png')} style={{"width": "100%" , "height": "auto"}}/>
                <img onClick={onMuscleSelect.bind(this)} alt="muscleImage" id="traps-a" src={require('./images/08.-TrapsLeft.png')}/>
                <img onClick={onMuscleSelect.bind(this)} alt="muscleImage" id="traps-b" src={require('./images/08.-TrapsRight.png')}/>
                <img onClick={onMuscleSelect.bind(this)} alt="muscleImage" id="shoulders-a" src={require('./images/07.A-Deltoids.png')}/>
                <img onClick={onMuscleSelect.bind(this)} alt="muscleImage" id="shoulders-b" src={require('./images/07.B-Deltoids.png')}/>
                <img onClick={onMuscleSelect.bind(this)} alt="muscleImage" id="pecs" src={require('./images/06.-Pecs.png')}/>
                <img onClick={onMuscleSelect.bind(this)} alt="muscleImage" id="biceps-a" src={require('./images/05.A-Biceps.png')}/>
                <img onClick={onMuscleSelect.bind(this)} alt="muscleImage" id="biceps-b" src={require('./images/05.B-Biceps.png')}/>
                <img onClick={onMuscleSelect.bind(this)} alt="muscleImage" id="forearm-a" src={require('./images/14.A-Forearms.png')}/>
                <img onClick={onMuscleSelect.bind(this)} alt="muscleImage" id="forearm-b" src={require('./images/14.B-Forearms.png')}/>
                <img onClick={onMuscleSelect.bind(this)} alt="muscleImage" id="obliques" src={require('./images/04.-Obliques.png')}/>
                <img onClick={onMuscleSelect.bind(this)} alt="muscleImage" id="quads-a" src={require('./images/01.A-Quads.png')}/>
                <img onClick={onMuscleSelect.bind(this)} alt="muscleImage" id="quads-b" src={require('./images/01.B-Quads.png')}/>
                <img onClick={onMuscleSelect.bind(this)} alt="muscleImage" id="calves-a" src={require('./images/13.A-Calves.png')}/>
                <img onClick={onMuscleSelect.bind(this)} alt="muscleImage" id="calves-b" src={require('./images/13.B-Calves.png')}/>
                <img onClick={onMuscleSelect.bind(this)} alt="muscleImage" id="back-traps-a" src={require('./images/08.B-Traps.png')}/>
                <img onClick={onMuscleSelect.bind(this)} alt="muscleImage" id="back-traps-b" src={require('./images/08.C-Traps.png')}/>
                <img onClick={onMuscleSelect.bind(this)} alt="muscleImage" id="back-shoulders-a" src={require('./images/07.C-Deltoids.png')}/>
                <img onClick={onMuscleSelect.bind(this)} alt="muscleImage" id="back-shoulders-b" src={require('./images/07.D-Deltoids.png')}/>
                <img onClick={onMuscleSelect.bind(this)} alt="muscleImage" id="triceps-a" src={require('./images/09.A-Triceps.png')}/>
                <img onClick={onMuscleSelect.bind(this)} alt="muscleImage" id="triceps-b" src={require('./images/09.B-Triceps.png')}/>
                <img onClick={onMuscleSelect.bind(this)} alt="muscleImage" id="back-lats-a" src={require('./images/10.A-Lats.png')}/>
                <img onClick={onMuscleSelect.bind(this)} alt="muscleImage" id="back-lats-b" src={require('./images/10.B-Lats.png')}/>
                <img onClick={onMuscleSelect.bind(this)} alt="muscleImage" id="back-lower" src={require('./images/15.-Lower-Back.png')}/>
                <img onClick={onMuscleSelect.bind(this)} alt="muscleImage" id="back-forearms-a" src={require('./images/14.C-Forearms.png')}/>
                <img onClick={onMuscleSelect.bind(this)} alt="muscleImage" id="back-forearms-b" src={require('./images/14.D-Forearms.png')}/>
                <img onClick={onMuscleSelect.bind(this)} alt="muscleImage" id="back-glutes" src={require('./images/11.-Glutes.png')}/>
                <img onClick={onMuscleSelect.bind(this)} alt="muscleImage" id="back-hamstrings-a" src={require('./images/12.A-Hamstrings.png')}/>
                <img onClick={onMuscleSelect.bind(this)} alt="muscleImage" id="back-hamstrings-b" src={require('./images/12.B-Hamstrings.png')}/>
                <img onClick={onMuscleSelect.bind(this)} alt="muscleImage" id="back-calves-a" src={require('./images/13.C-Calves.png')}/>
                <img onClick={onMuscleSelect.bind(this)} alt="muscleImage" id="back-calves-b" src={require('./images/13.D-Calves.png')}/>
            </div>

            <Snackbar
                open={openSnack}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Click a muscle plz"
                action={action}
            />
        </React.Fragment>
    );
}