import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import React, { useState } from "react"
import {
   useHistory
} from "react-router";

import '../App.css';

const Register = () => {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [error, setError] = useState("")
  	const [firstName, setFirstName] = useState("")
  	const [lastName, setLastName] = useState("")
  	const [email, setEmail] = useState("")
  	const [password, setPassword] = useState("")
	const history = useHistory();

	
	const formSubmitHandler = e => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

	/*console.log(JSON.stringify({"firstName": firstName, "lastName": lastName, "username": email, "email": email, "password": password}));*/
    const genericErrorMessage = "Something went wrong! Please try again later."
	const fileInput = document.querySelector('input[type="file"]').files[0] ;
	  const formData = new FormData();
	  
	  formData.append('file', fileInput);
	  formData.append('firstName', firstName);
	  formData.append('lastName', lastName);
	  formData.append('username', email);
	  formData.append('email', email);
	  formData.append('password', password);
	  //formData.append('author', "6164e4a85f97e80a95ffb75c");
	  
	  console.log('The Form data: ' + formData);

    fetch(`/api/users/signup`, {
      method: "POST",
      credentials: "include",
      //headers: { "Content-Type": "application/json" },
      body: formData,/*JSON.stringify({"firstName": firstName, "lastName": lastName, "username": email, "email": email, "password": password}),*/
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
          /*setUserContext(oldValues => {
            return { ...oldValues, token: data.token }
          })*/
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
			  label="Nombre"
			  defaultValue="Nombre"
			  onChange={e => setFirstName(e.target.value)}
			  value={firstName}
			/>
        </div>
		  <br/>
        <div>
          <TextField
			  required
			  id="outlined-required"
			  label="Apellido"
			  defaultValue="Apellido"
			  onChange={e => setLastName(e.target.value)}
			  value={lastName}
			/>
        </div>
		  <br/>
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
	  	<Button
				variant="contained"
				component="label">
				Subir Foto
				<input
					type="file"
					name="fileName"
					hidden
					/>
			</Button>
		  <br/>
		  <br/>
       <Button type="submit" size="large" color="primary" variant="contained" disabled={isSubmitting}>
                      Registrarme
	   </Button>
      </form>
	</div>	  
    </>
  )
}

export default Register