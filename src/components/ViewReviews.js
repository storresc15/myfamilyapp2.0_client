import React, { useEffect, useState } from "react"
import '../App.css';
import Box from '@mui/material/Box';
//import { useStyles } from '../UseStyles';
import SingleReview from './SingleReview';

export default function ViewCard(props) {
	
	//const classes = useStyles();
	//const { id } = useParams();
	const [blogReviews, setBlogReviews] = useState([]);
	let userToken = localStorage.getItem("user");
	//const classes = useStyles();
	
	useEffect(() => {
		//console.log('the id: ' + id);
		console.log('Th user TOken: ' + userToken);
		//console.log('The user from props: ' + props.user)
		//console.log('The user id: ' + props.user._id )
		setBlogReviews(props.reviews);
		// eslint-disable-next-line react-hooks/exhaustive-deps	
	}, [/*userToken*/props.user, props.reviews] ) // check this line
	
	
	return (
		<>
		{blogReviews &&
		<Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
			{blogReviews.map((review) => (
			<SingleReview key={review._id} review={review} user={props.user._id} />
			))}
		</Box>
		}
		</>
		)
}