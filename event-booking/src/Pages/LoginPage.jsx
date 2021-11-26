import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import '../Components/Styling/LoginPag.css'
import AdminPage from './AdminPage';
import UserPage from './UserPage';
import { useHistory } from 'react-router-dom';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});


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

