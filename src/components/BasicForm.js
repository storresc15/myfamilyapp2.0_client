import TextField from "@mui/material/TextField";
//import React, { Component } from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import React, { useState } from "react"
import { useHistory } from "react-router";

const BasicForm = () => {
	
	
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [error, setError] = useState("")
  	const [title, setTitle] = useState("")
  	const [description, setDescription] = useState("")
	//const [image, setImage] = useState("")
	const history = useHistory();

	
  const formSubmitHandler = e => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    const genericErrorMessage = "Something went wrong! Please try again later."
	//Information about Form
	const fileInput = document.querySelector('input[type="file"]').files[0] ;
	  const formData = new FormData();
	  
	  formData.append('file', fileInput);
	  formData.append('title', title);
	  formData.append('body', description);
	  //formData.append('author', "6164e4a85f97e80a95ffb75c");
	  
	  console.log('The Form data: ' + formData);
	  //console.log('The Token: ' + userContext.token);
	  let userToken = localStorage.getItem("user");
	  console.log('The token from storage' + userToken);
    fetch(`/api/blogs/`, {
      method: "POST",
      credentials: "include",	
	  body: formData,	
     headers: new Headers({ Authorization: `Bearer ${userToken}`, //"Content-Type": "application/json" 
			  }),
      /*body: JSON.stringify({ "title": title, "body": description, "image": image, "author": "6164e4a85f97e80a95ffb75c"}),*/
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
		  history.push("/album");		
          const data = await response.json()
		  //remove the following token console
		  console.log('The call was succesfull!!' + data)

        }
      })
      .catch(error => {
        setIsSubmitting(false)
        setError(genericErrorMessage)
		console.log(error);
      })
  }	



    return (
		<>
		{error && <Stack sx={{ width: '100%' }} spacing={2}>
		  <Alert severity="error">{error}
		  </Alert>
	  </Stack> }
        <Box
      sx={{
        '& .MuiTextField-root': { m: 1, width: '60ch' },
      }}
      noValidate
      autoComplete="off"
    >
		<form onSubmit={formSubmitHandler} >	
			<Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12}}>
        <Grid item xs={6} md={8}>	
          <TextField
          required
          id="outlined-required"
          label="Titulo"
		  onChange={e => setTitle(e.target.value)}
		  value={title}		  
        />	
		<TextField
          id="standard-multiline-static"
          label="Descripciรณn"
          multiline
          rows={5}
          variant="standard"
		  onChange={e => setDescription(e.target.value)}
		  value={description}		
        />
        </Grid>
        <Grid item xs={6} md={4}>
			{/* <TextField 
				id="standard-basic" 
				label="Image" 
				variant="standard"
				onChange={e => setImage(e.target.value)}
				value={image}	/>	*/}
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
        </Grid>
			</Grid>
		<br></br>	
		  <Button type="submit" size="large" color="primary" variant="contained" disabled={isSubmitting}> Save </Button>
	</form>
	<br></br>	
	{isSubmitting && <CircularProgress />}	
    </Box>
</>
    );
  }


export default BasicForm;