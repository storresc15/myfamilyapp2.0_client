import React from 'react';
import '../App.css';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../UseStyles';
import { Link } from 'react-router-dom';

export default function SingleCard(props) {
	
	const classes = useStyles();
	const card = props.card;
	let imageUrl;
	let imageName;
	if(card.image) {
	imageUrl = card.image.url;
	imageName = card.image.filename;	
	}
	
	return (
	<>	
	<Grid item={true} key={card.id} xs={12} sm={6} md={4} >	  
             <Card className={classes.card} key={card.id}>
                  <CardMedia
                    image= {imageUrl}
					component="img"
					height="210"  
                    title={imageName}
					key={card.id}
                  />
                  <CardContent className={classes.cardContent} key={card.id}>
                    <Typography gutterBottom variant="h5" component="h2" key={card.id}>
                      {card.title}
                    </Typography>
                    <Typography key={card.id} noWrap={true}>
                      {card.body}
                    </Typography>
                  </CardContent>
                  <CardActions key={card.id}>
					  <Link to={"/view/" + card._id} key={card.id}>	
                    <Button size="large" variant="contained" color="primary" key={card.id}>
                      Ver Publicación
                    </Button>
					  </Link>	  
					  { /*<Button size="small" color="primary" key={card.id}>
                      Edit
                    </Button> */}
                  </CardActions>
                </Card>
			</Grid>
	</>
	);
	
}