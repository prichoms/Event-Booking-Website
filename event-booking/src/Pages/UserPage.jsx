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
import '../Components/Styling/UserPage.css'
import { PopularEvents } from "../Components/HomePage/PopularEvents";
import { PremierMovies } from "../Components/HomePage/PremierMovies";
import { RecommendedMovies } from "../Components/HomePage/RecommendedMovies";
import { BookedEvents } from '../Components/BookedEvents';
import { useHistory, useParams } from "react-router-dom";
import jsondata from "../scraped_data/db.json"

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

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function UserPage({ action, handleCloseLogin }) {
  const { id } = useParams();
  const user_data = jsondata.users.filter(ele => ele.id == id)[0];



  return (
    <div>
      <div
        className="container_user"
        style={{
          backgroundImage: "linear-gradient(315deg, #f9484a 0%, #fbd72b 74%)",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >

      </div>
      <img className="profilepic" src={user_data.image}/>
      <div className="userdetails">
        <h1>{user_data.name}</h1>
        <h4>{user_data.about}</h4>
      </div>
      <br/><br/><br/><br/>

        <div style={{ backgroundColor: "#16161D" }}>
          <RecommendedMovies />
        </div>
        <div style={{ backgroundColor: "#16161D" }}>
          <BookedEvents />
        </div>

      <br/><br/><br/>
    </div>
  );
}

