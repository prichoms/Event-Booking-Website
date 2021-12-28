import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import '../Components/Styling/LoginPag.css'

import { useHistory } from 'react-router-dom';


const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);



export default function Login({ action, handleCloseLogin }) {
  let history = useHistory();

  const redirect_admin = () => {
    history.push('/admin')
  }
  const redirect_user = () => {
    history.push('/user')
  }
  return (
    <div>
      <Dialog onClose={handleCloseLogin} aria-labelledby="customized-dialog-title" open={action}>

        <DialogContent dividers style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '20px', width: '300px', margin: 'auto' }}>Get Started</div>

          <div className="google">
            <Button color="secondary" onClick={redirect_admin}>Admin</Button>
          </div>
          <div className="google">
            <Button color="primary" onClick={redirect_user}>User</Button>
          </div>
        </DialogContent>

      </Dialog>
    </div >
  );
}
