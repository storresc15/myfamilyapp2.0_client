import React, { useState } from "react"
import TextField from "@mui/material/TextField";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 280,
  height: 470,	
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
};

const EditForm = props => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [error, setError] = useState("")
  	const [title, setTitle] = useState(props.cardTitle)
  	const [description, setDescription] = useState(props.cardDescription)
	//const [image, setImage] = useState("")

	
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
	  let userToken = localStorage.getItem("user");
	  console.log('The token from storage' + userToken);
    fetch('/blogs/' + props.cardId, {
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
		  //history.push("/album");
		window.location.reload(false);	
          const data = await response.json();
		  //remove the following token console
		  console.log(data);	
		  console.log('The call was succesfull!!')

        }
      })
      .catch(error => {
        setIsSubmitting(false)
        setError(genericErrorMessage)
      })
	  
  }

  return (
    <div>
      <Button variant="contained" component="label" onClick={handleOpen}>Editar</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
			  {error && <Stack sx={{ width: '100%' }} spacing={2}>
		  <Alert severity="error">{error}
		  </Alert>
	  </Stack> }
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Editando {props.cardTitle}
            </Typography>
			<br></br>
            <form onSubmit={formSubmitHandler} >
			<div className="textFieldsInModal">	
          <TextField
          required
          id="outlined-required"
          label="Título"
		  onChange={e => setTitle(e.target.value)}
		  value={title}		  
        />
				<br></br>
				<br></br>
		<TextField
          id="standard-multiline-static"
          label="Descripción"
		  defaultValue={props.cardDescription}	
          multiline
          rows={5}
          variant="standard"
		  onChange={e => setDescription(e.target.value)}
		  value={description}		
        />
		</div>
				<br></br>
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
		<br></br>
				<br></br>
      <div>
		  <Button type="submit" size="large" color="primary" variant="contained" disabled={isSubmitting}> Salvar </Button>  
      </div>
	</form>
		{isSubmitting && <CircularProgress />}		  
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
export default EditForm;