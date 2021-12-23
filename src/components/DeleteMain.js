import React, { useState } from "react"
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { useHistory } from "react-router";

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

const DeleteMain = props => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [error, setError] = useState("")
	const history = useHistory();
	
	const formSubmitHandler = e => {
		
	e.preventDefault()
    setIsSubmitting(true)
    setError("")

    const genericErrorMessage = "Something went wrong! Please try again later."
	
	  let userToken = localStorage.getItem("user");
	  let urlByType = "";
		let actionAfter = "";
	  	
	  console.log('The token from storage' + userToken);
	if(props.item === "blog") {
	urlByType = '/blogs/' + props.cardId;
	actionAfter = "blog";	
	}
	if(props.item === "review")	{
	urlByType = '/reviews/' + props.cardId + '/' + props.review._id;
	actionAfter = "review"	
	}
		
    fetch(urlByType, {
      method: "DELETE",
      credentials: "include",	
	  //body: formData,	
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
			// eslint-disable-next-line
			if(actionAfter == "blog"){
			history.push("/album");	
			}
			// eslint-disable-next-line 
			if(actionAfter == "review") {
			window.location.reload(false);
			}
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
      <Button color="secondary" variant="contained" component="label" onClick={handleOpen}>Borrar</Button>
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
		  <Alert severity="success">
		  </Alert>
	  </Stack> }
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Borrar publilcación ?
            </Typography>
			<br></br>
			<Typography>Click en borrar para eliminar ésta publicación</Typography>
            <form onSubmit={formSubmitHandler} >
			<div className="textFieldsInModal">	
		  <Button type="submit" size="large" color="secondary" variant="contained" disabled={isSubmitting}> Borrar </Button>  
      </div>
	</form>
		{isSubmitting && <CircularProgress />}		  
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
export default DeleteMain;