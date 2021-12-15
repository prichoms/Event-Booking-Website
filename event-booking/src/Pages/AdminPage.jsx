import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import "../Components/Styling/admin.css";
import jsondata from "../scraped_data/db.json"




// const DialogContent = withStyles((theme) => ({
//   root: {
//     padding: theme.spacing(2),
//   },
// }))(MuiDialogContent);

// const DialogActions = withStyles((theme) => ({
//   root: {
//     margin: 0,
//     padding: theme.spacing(1),
//   },
// }))(MuiDialogActions);

export default function AdminPage({ action, handleCloseLogin }) {
  var feedback_data = jsondata.feed;
  return (
    <div>
      {/* <Dialog onClose={handleCloseLogin} aria-labelledby="customized-dialog-title" open={action}>
        
        <DialogContent dividers style={{textAlign:'center'}}>
         
          <Button>Admin</Button>
          <Button>User</Button>
          
        </DialogContent>
        <DialogActions>
          <Button  color="primary">
            Sign in
          </Button>
        
        </DialogActions>
      </Dialog> */}

<center>

<table className="styled-table">
  <thead>
    <tr>
    <th scope="col">S.No</th>
      <th scope="col">Name</th>
      <th scope="col">Feedback</th>
    </tr>
  </thead>
  <tbody>
    {feedback_data.map((i) => (
            <tr key={i.id}>
              <td>{i.id}</td>
              <td>{i.name}</td>
              <td>{i.feed}</td>
            </tr>
    ))}
  </tbody>
</table>
</center>
    </div>
  );
}

