import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import React, { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"
import {
   useHistory
} from "react-router";
import '../App.css';
//cookies
import Cookies from 'universal-cookie';


const Login = () => {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [error, setError] = useState("")
  	const [email, setEmail] = useState("")
  	const [password, setPassword] = useState("")
	const [userContext, setUserContext] = useContext(UserContext)
	//Declaring cookie
	const cookies = new Cookies();
	
	//POC FOR BROWSER STORAGE
	const history = useHistory();
	
	const formSubmitHandler = e => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    const genericErrorMessage = "Something went wrong! Please try again later."

    fetch(`/api/users/login`, {
      method: "POST",
	  withCredentials: true,
      credentials: 'same-origin',
      headers: { Accept: 'application/json', "Content-Type": "application/json" },
      body: JSON.stringify({ "username": email, "password": password}),
    })
      .then(async response => {
        setIsSubmitting(false)
        if (!response.ok) {
          if (response.status === 400) {
            setError("Please fill all the fields correctly!")
          } else if (response.status === 401) {
            setError("Invalid email and password combination.")
          } else if (response.status === 500) {
            console.log(response)
            const data = await response.json()
            if (data.message) setError(data.message || genericErrorMessage)
          } else {
            setError(genericErrorMessage)
          }
        } else {
          const data = await response.json()

			//POC For cookie
			cookies.set('refreshToken', data.token, {secure: true, maxAge : 2592000000, path: "/"})
          setUserContext(oldValues => {
            return { ...oldValues, token: data.token }
          })
		  //setUserContext({token: data.token});	
		localStorage.setItem('user', data.token)
		history.push('/');
		window.location.reload(false);
        }
      })
      .catch(error => {
        setIsSubmitting(false)
        setError(genericErrorMessage)
      })
  }
	
	
  return (
    <>
	   {error && <Stack sx={{ width: '100%' }} spacing={2}>
		  <Alert severity="error">{error}
		  </Alert>
	  </Stack> }
		
	  <div className="auth-form">
      <form onSubmit={formSubmitHandler} className="login">
			
        <div>
          <TextField
			  required
			  id="outlined-required"
			  label="Email"
			  defaultValue="Email"
			  onChange={e => setEmail(e.target.value)}
			  value={email}
			/>
        </div>
		  <br/>
        <div>
           <TextField
          id="outlined-password-input"
          label="Contraseña"
          type="password"
          autoComplete="current-password"
		  onChange={e => setPassword(e.target.value)}
	      value={password}	   
        />
        </div>
		  <br/>
		  <br/>
       <Button type="submit" size="large" color="primary" variant="contained" disabled={isSubmitting}>
                      Login
	   </Button>
      </form>
	</div>	  
    </>
  )
}

export default Login