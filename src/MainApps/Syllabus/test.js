import {Typography, AppBar,Card, 
	CardActions, CardContent, 
	CardMedia, CssBaseline, Grid, 
	Toolbar, Container,Button } from '@material-ui/core';

import {PhotoCamera} from '@material-ui/icons';


import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme)=>({

	container:{
          backgroundColor: 'red',
	  padding: theme.spacing(8,0,6)
	}


}));




const SyllabusContainer=()=>{


const classes = useStyles();







const showPhotosHandler=()=>{

  console.log("see photos");
}


return (

<>

<CssBaseline/>
<AppBar position="relative">

 <Toolbar>

	<PhotoCamera/>
	<Typography variant='h6'>Photo Album </Typography>



 </Toolbar>
</AppBar>

  <main>
     <div className={classes.container}>
        <Container maxWidth="sm">
      
           <Typography variant='h2' align="center" color="textPrimary" gutterBottom>Photo Album </Typography>

           <Typography variant='h5' align="center" color="textSecondary" paragraph>
               its own audience, using a web browser. A typical wiki contains multiple pages for the subjects.

	   </Typography>

           <div>
              <Grid container spacing={2} justify="center">
                 <Grid item>
                     <Button variant="contained" color="primary" onClick={showPhotosHandler}>
	                 Discussion
                     </Button>
                 </Grid>

                 <Grid item>
                     <Button variant="contained" color="primary" onClick={showPhotosHandler}>
                         Discussion
                     </Button>
                 </Grid>


	        <Grid item>
                     <Button variant="contained" color="primary" onClick={showPhotosHandler}>
                         Discussion
                     </Button>
                 </Grid>

                <Grid item>
                     <Button variant="contained" color="primary" onClick={showPhotosHandler}>
                         Discussion
                     </Button>
                 </Grid>





              </Grid>
          </div>
	</Container>
    </div>	
  </main>

</>

);


}

export default SyllabusContainer;
