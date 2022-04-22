import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Zoom from '@mui/material/Zoom';

export default function RankedResults(props) {
  const [checked, setChecked] = React.useState([0]);

  const [rankedResults, setRankedResults] = React.useState(['test results']);

  const [viewGif, setviewGif] = React.useState(true);

  const [zoomIn, setZoomIn] = React.useState(false);

  React.useEffect(() => {
    setRankedResults(oldArray => props.rankedResults)
    setviewGif(old => props.viewGif)
    setZoomIn(true)
  }, [props.rankedResults]);

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
        <Typography variant="h6" gutterBottom marginLeft={4}>
          Results
        </Typography>
        {rankedResults.length === 0 && (
          <Box sx={{ display: 'flex' , justifyContent: 'center', margin: '50px'}}>
            <CircularProgress />
          </Box>
        )}
        <Grid item xs={12} margin={2} alignItems="left" justifyContent="left" >
          <List className='resultsContainer' style={{maxHeight: 500, overflow: 'auto'}} sx={{ width: '100%' , bgcolor: 'white' ,
            alignContent: 'left'}}  className='result-card'>

            {rankedResults.map((item,index) => {
                const labelId = `checkbox-list-label-${index}`;

                return (
                  <React.Fragment key={index}>
                    <Zoom in={zoomIn} style={{ transitionDelay: Math.min(5000,(index*500)).toString()+'ms' }}>
                      <Box display="flex" flexDirection="row" justifyContent="space-around"
                        style={{ margin:"0px",padding:"0"}}
                      >
                        <Typography xs={2} gutterBottom variant="h5" component="h2" marginTop={2}>
                          {index+1}
                        </Typography>
                        <Card style={{"width":"90%", "margin-bottom":"10px"}}>
                          <CardContent>
                            <Typography gutterBottom variant="h6" component="h2">
                            {item.exercise}
                            </Typography>
                            <Typography variant="h7" color="textSecondary" component="p">
                              Equipment: {item.equipment} <br></br>
                              Muscle: {item.muscle_group} <br></br>
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                              Description: {item.desc} <br></br>
                            </Typography>
                          </CardContent>
                        </Card>
                      </Box>
                    </Zoom>
                    {/* <Divider variant="inset" component="li"/> */}
                  </React.Fragment>
                );
            })}
          </List>
        </Grid>
      </React.Fragment>
    );
  }