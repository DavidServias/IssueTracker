import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog(props) { 
  const [state, setState] = React.useState({
    title: '',
    description: ''});

  const handleClose = () => {
    props.setFormOpen(false);
  };

  // This is an explanation for how the changehandler works.
  //https://www.pluralsight.com/guides/handling-multiple-inputs-with-single-onchange-handler-react
  const changeHandler = (event) => {
    setState({...state,[event.target.name]:[event.target.value]});
   
  };

  const handleSubmit = () => {
    console.log("handleSubmit");
    console.log(state.title);
    console.log(state.description);
    props.setFormOpen(false);
  };



  console.log("project id: " + props.projectId);
  return (
    
    <div>
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>New Issue</DialogTitle>
        <DialogContent>
          <TextField
            sx={{marginTop: '3ch'}}
            autoFocus
            fullWidth
            margin="dense"
            noValidate
            // TODO handle errors 
            //error={errorState?true:false}
            id="title"
            label="title"
            name = 'title'
            value = {state.title}
            placeholder="title"   
            onChange={changeHandler}
          />

          <TextField
            sx={{marginTop: '3ch'}}
            fullWidth
            margin="dense"
            noValidate
            // TODO handle errors 
            //error={errorState?true:false}
            id="description"
            label="description"
            name = 'description'
            value = {state.description}
            placeholder="description"   
            onChange={changeHandler}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
      </div>
  );
}
