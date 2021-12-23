import React from 'react';
import { useEffect, useState } from 'react';
import '../App.css';
import { useStyles } from '../UseStyles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import SingleCard from './SingleCard';
import CircularProgress from '@mui/material/CircularProgress';


export default function AlbumMain() {
	const [albumCards, setAlbumCards] = useState([]);
	const [isSubmitting, setIsSubmitting] = useState(false)
	const classes = useStyles();

	useEffect(() => {
		setIsSubmitting(true);
		fetch(`/blogs/all`)
		.then(res => res.json())
		.then(response => {
			//cards = response;
			setAlbumCards(response);
			setIsSubmitting(false);
			//console.log('The album: ' + albumCards);
			//console.log("The items retrieved: " + response[0].title)
		})
		.catch(function(error) {
           console.log('Fetch error: ' + error.message);
         });
	},[])
  return (
	
<Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
			  {isSubmitting && <CircularProgress />}
			  {albumCards.map((albumcard) => (
				<SingleCard key={albumcard._id} card = {albumcard} />
            ))}
          </Grid>
        </Container>
	)
}