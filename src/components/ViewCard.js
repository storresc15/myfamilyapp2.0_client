import React, { useEffect, useState } from "react"
import '../App.css';
//import Button from '@material-ui/core/Button';
/*import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'; 
import { useStyles } from './UseStyles'; */
import ImageListItem from '@mui/material/ImageListItem';
import Grid from '@mui/material/Grid';
import Container from '@material-ui/core/Container';
import { useStyles } from '../UseStyles';
//import { UserContext } from "../context/UserContext"
import { useParams } from "react-router-dom";
import EditForm from "./EditForm";
import ViewReviews from "./ViewReviews";
import ReviewForm from './ReviewForm';
import DeleteMain from './DeleteMain';
import CircularProgress from '@mui/material/CircularProgress';


export default function ViewCard(props) {
	
	//const classes = useStyles();
	const { id } = useParams();
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [viewCard, setViewCard] = useState("");
	const [viewUrl, setViewUrl] = useState("");
	const [viewAuthor, setAuthor] = useState("");
	const [viewAuthorId, setAuthorId] = useState("");
	const [viewUserId, setUserId] = useState("");
	const [blogReviews, setBlogReviews] = useState([]);
	let userToken = localStorage.getItem("user");
	const classes = useStyles();
	
	useEffect(() => {
		setIsSubmitting(true);
		console.log('the id: ' + id);
		console.log('Th user TOken: ' + userToken);
		console.log('The user from props: ' + props.user)
		//console.log('The user id: ' + props.user._id )
		if(props.user)setUserId(props.user._id);
		fetch('/blogs/' + id, {
      method: "GET",
      credentials: "include",	
	  //body: formData,	
     headers: new Headers({ Authorization: `Bearer ${userToken}`, //"Content-Type": "application/json" 
			  }),
      /*body: JSON.stringify({ "title": title, "body": description, "image": image, "author": "6164e4a85f97e80a95ffb75c"}),*/
    })
		.then(res => res.json())
		.then(response => {
			setIsSubmitting(false);
			//cards = response;
			console.log('Checking response desc: ' + response.body)
			console.log('Checking response title: ' + response.title)
			console.log('Checking response author: ' + response.author.firstName)
			console.log('Checking response author ID: ' + response.author._id)
			setViewCard(response);
			setViewUrl(response.image.url);
			setAuthorId(response.author._id);
			setAuthor(response.author.firstName);
			//setAuthorId(response.author._id);
			setBlogReviews(response.reviews);
			console.log('The author ID: ' + viewAuthorId)
			console.log('Card Viewed: ' + viewCard);
			//console.log('The album: ' + albumCards);
			//console.log("The items retrieved: " + response[0].title)
		})
		.catch(function(error) {
			setIsSubmitting(false);
           console.log('Fetch error: ' + error.message);
         });
	// eslint-disable-next-line react-hooks/exhaustive-deps	
	}, [])
	
	function displayEditButtons () {
		console.log('Inside the display edit buttons')
		return(
			<>
			{viewAuthorId === viewUserId &&<Grid item> <EditForm cardTitle={viewCard.title} cardDescription={viewCard.body} cardId={id}></EditForm> 
			</Grid> }
		{viewAuthorId === viewUserId && <Grid item> <DeleteMain cardId = {id} item="blog"/>  </Grid>  }
	</>)

	}
	
	return (
	<>
		<Container className={classes.cardGrid} maxWidth="md">
		{isSubmitting && <CircularProgress />}	
		<h1>{viewCard.title}</h1>
		<Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12}}>
			<Grid item xs={6} md={8}>
				{viewCard.title && <div className = "maxImage">
				<ImageListItem key={viewCard.title}>
            <img src={viewUrl}
              alt={viewUrl}
              loading="lazy"
            />
				</ImageListItem> 
					</div> }
					<h2>{viewCard.title}</h2>
					<p>{viewCard.body}</p>
			{viewAuthor &&	<p>Autor: {viewAuthor}</p> } 
	<Grid container spacing={2} justifyContent="left">
		{viewUserId && displayEditButtons() }
		{/*viewAuthorId === props.user._id && <Grid item> <EditForm cardTitle={viewCard.title} cardDescription={viewCard.body} cardId={id}></EditForm> </Grid> */} 
		{ /*viewAuthorId === props.user._id && <Grid item> <Button size="small" variant="contained" color="secondary" > Delete </Button> </Grid> */ }
	</Grid>
			</Grid>
			<Grid item xs={6} md={4}>
				{isSubmitting && <CircularProgress />}
				<ViewReviews reviews={blogReviews} user={props.user}></ViewReviews> 
				<br></br>
		{viewCard._id &&	<ReviewForm cardId={viewCard._id} cardTitle={viewCard.title}></ReviewForm> }
			</Grid>
		</Grid>
		</Container>
	</>
	
	);
	
}