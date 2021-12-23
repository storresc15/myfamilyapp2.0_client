import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router,
		Route,
		Link,
	   Redirect} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import LinkCore from '@material-ui/core/Link';
import { useStyles } from './UseStyles';
import  BasicForm  from './components/BasicForm';
import Register from './components/Register';
import Login from './components/Login';
import AlbumMain from './components/AlbumMain'
import ViewCard from './components/ViewCard';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <LinkCore color="inherit" href="https://material-ui.com/">
        My Beautiful Family URA-APP
      </LinkCore>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function DisplayLoginButtons() {
	return(
		<>
		<Grid item>
			<Link to="/register">
			<Button variant="contained" color="primary">
			Registrarme
			</Button>
			</Link>
		</Grid>
		<Grid item>
			<Link to="/login">
			<Button variant="contained" color="primary">
			 Login
			</Button>
			</Link>
		</Grid>
		</>
	)
}

function DisplayActionButtons(){
	return(
		<>
		<Grid item>
			<Link to="/addblog">
			<Button variant="contained" color="primary">
			 Agregar una foto?
		   </Button>
			</Link>	
		</Grid>
			<Grid item>
			<Link to="/album">	
			<Button variant="outlined" color="primary">
			 Ver Album
			</Button>
			</Link>
		</Grid>
		</>
)
}

export default function App() {
	const classes = useStyles();
	
	//POC FOR BROWSER STORAGE
	const [user, setUser] = useState();
	const [isSubmitting, setIsSubmitting] = useState(false)

  /*useEffect(() => {
    verifyUser()
  }, [verifyUser])*/
	
	const handleLogout = () => {
    setUser({});
    localStorage.clear();
	window.location.reload(false);	
  };
	
	const getUserInfo = () => {
	setIsSubmitting(true);	
	let userToken = localStorage.getItem("user");
	if(userToken) {	
	fetch('/users/me', {
      method: "GET",
	  withCredentials: true,
      //credentials: 'same-origin',
      headers: new Headers({ Authorization: `Bearer ${userToken}`, //"Content-Type": "application/json" 
			  }),	
    }).then(async response => {
      if (response.ok) {
        const data = await response.json()
		console.log('Inside the USER response ok: ' + data);
		setIsSubmitting(false);  
        setUser(data)
		console.log(user);  
      } else {
		  setIsSubmitting(false); 
		  return (
					<Redirect to="/login" /> 
				)
	}
	  }) 
	}  else {
		setIsSubmitting(false); 
		return (
					<Redirect to="/login" /> 
				)
	}
	}
	
	const renderCorrectButtons = () => {
		if(!isSubmitting) {
		if(user) {
			return (<DisplayActionButtons />)
		} else {
			return (<DisplayLoginButtons />)
		}
		}
	}
	
	
	// POC FOR LOCAL STORAGE
	useEffect(() => {
    getUserInfo();
	// eslint-disable-next-line react-hooks/exhaustive-deps	
  }, []);
	
	
  return (
<Router>
    <React.Fragment>
		<CssBaseline /> 
     <AppBar position="sticky">
        <Toolbar>
          <CameraIcon className={classes.icon} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Mi Hermosa Familia
          </Typography> 
		  {user &&
				<div className="avatarHeader">
				<Grid container wrap="nowrap" spacing={2}>
				 <Grid item xs>
					 {user.image && <Avatar src={user.image.url /*"https://res.cloudinary.com/ura-app/image/upload/v1639626259/FamilyApp/gnz5ydjznx9j0xmfnqdp.jpg"*/}></Avatar> }
				 </Grid>
				 <Grid item >
				<Button onClick={handleLogout}
				component="label"
				size="small">
				Salir	
				</Button>	
				</Grid>
				</Grid>
				</div>	
			}
		</Toolbar>	
      </AppBar>
		
      <main>
		  
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Mi Hermosa Familia
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Bienvenidos a nuestro album de mi hermosa familia!
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justifyContent="center">
				  {renderCorrectButtons()}
              </Grid>
            </div>
          </Container>
        </div>
		{/* Using routes */ }
		  {/*<Route
			exact
			path="/"
			render={() => {
				return (
					<Redirect to="/album" /> 
				)
			}}
		/>  */}
		<Route path="/album">
		{user && <AlbumMain></AlbumMain> }
		</Route>
		  <Route path="/view/:id" >
			  <ViewCard user={user} />
		</Route>
		<Route path="/addblog">
		<Container className={classes.cardGrid} maxWidth="md">	
		{user && <BasicForm></BasicForm> }
		</Container>	
		</Route>
		<Route path="/register">
		<Register/>	
		</Route>
		  <Route path="/login">
		<Login/>	
		</Route>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Mi Hermosa Familia
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Todos los derechos reservados
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
</Router>	
  );
}