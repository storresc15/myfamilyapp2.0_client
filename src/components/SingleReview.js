import React from 'react';
import '../App.css';
import Paper from '@mui/material/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@mui/material/Avatar';
//import { useStyles } from '../UseStyles';
import ReviewEditForm from './ReviewEditForm';
import DeleteMain from './DeleteMain';
import { useParams } from "react-router-dom";

export default function SingleReview(props) {
	
	const { id } = useParams();
	//const classes = useStyles();
	const userId = props.user;
	const review = props.review;
	
	
	return (
	<Paper sx={{ maxWidth: 700, my: 1, mx: 'auto', p: 1 }}>
		<Grid container wrap="nowrap" spacing={2}>
		 <Grid item >
			 {review.author.image &&
			<Avatar src={review.author.image.url}>W</Avatar> }
			 
		 </Grid>
		 <Grid item xs>
		<Typography align='left' >{review.body}</Typography>
		</Grid>
		{userId === review.author._id &&	
		<Grid item xs>
		<ReviewEditForm review={review}></ReviewEditForm>
		<br/>	 
		<DeleteMain item="review" review={review} cardId={id} />	 
		</Grid>	}
		</Grid>
	</Paper>
	
	)
	
	
}