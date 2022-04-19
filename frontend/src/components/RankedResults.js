import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function RankedResults(props) {
  const [checked, setChecked] = React.useState([0]);

  const [rankedResults, setRankedResults] = React.useState(['test results']);

  const [viewGif, setviewGif] = React.useState(true);

  React.useEffect(() => {
    setRankedResults(oldArray => props.rankedResults)
    setviewGif(old => props.viewGif)
  }, []);

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
          <List className='resultsContainer' style={{maxHeight: 500, overflow: 'auto'}} sx={{ width: '100%' , bgcolor: 'white' ,
              borderColor: 'grey.500', border: 1, borderRadius: 1 ,alignContent: 'center'}}>

              {rankedResults.map((item,index) => {
                  const labelId = `checkbox-list-label-${index}`;

                  return (
                    <React.Fragment key={index}>
                      <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Equipment : {item.equipment}
                          </Typography>
                          <Typography variant="h5" component="div">
                           Exercise Name : {item.exercise}
                          </Typography>
                          <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            Muscle : {item.muscle_group}
                          </Typography>
                          <Typography variant="body2">
                            Description : {item.desc}
                          </Typography>
                        </CardContent>
                      </Card>
                      <Divider />
                    </React.Fragment>

                  );
              })}
              </List>
              </Grid>
        </Grid>
      </React.Fragment>
    );
  }