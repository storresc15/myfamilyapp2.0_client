import React, { useState } from "react"
import TextField from "@mui/material/TextField";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams } from "react-router-dom";

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

const ReviewForm = props => {
	const { id } = useParams();
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [error, setError] = useState("")
  	const [description, setDescription] = useState(props.review.body)

	
	const formSubmitHandler = e => {
		
	e.preventDefault()
    setIsSubmitting(true)
    setError("")

    const genericErrorMessage = "Something went wrong! Please try again later."
	console.log('The id of params: ' + id)
		console.log('The description: ' + description)
	  let userToken = localStorage.getItem("user");
	  console.log('The token from storage' + userToken);
		const requestOptions = {
		method: "POST",
		headers: { Authorization: `Bearer ${userToken}`, Accept: 'application/json', "Content-Type": "application/json" },
		body: JSON.stringify({ "body": description, }),
    };
    fetch('/api/reviews/' + id + '/' + props.review._id, requestOptions)
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
		  console.log(data);
			console.log(error);
		  //remove the following token console
		  console.log('The call was succesfull!!')

        }
      })
      .catch(error => {
        setIsSubmitting(false)
        setError(genericErrorMessage)
		console.log(error);
      })
	  
  }

  return (
    <div>
      <Button size="small" variant="contained" component="label" onClick={handleOpen}>Editar</Button>
		  <br></br>  
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
		  
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Editar Comentario
            </Typography>
			<br></br>
			<br></br>
			<br></br>  
			<br></br>  
            <form onSubmit={formSubmitHandler} >
			<div className="textFieldsInModal">	
		<TextField
          id="standard-multiline-static"
          label="Descripciรณn"	
          multiline
          rows={5}
          variant="standard"
		  onChange={e => setDescription(e.target.value)}
		  value={description}		
        />
		</div>
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
export default ReviewForm;