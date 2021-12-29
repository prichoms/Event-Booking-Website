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
      <img className="profilepic" src="https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(webp):focal(1390x540:1392x538)/origin-imgresizer.eurosport.com/2021/08/05/3195392-65463108-2560-1440.jpg"/>
      <div className="userdetails">
        <h1>Lionel Messi</h1>
        <h4>Lionel Andrés Messi, also known as Leo Messi, is an Argentine professional footballer who plays as a forward for Ligue 1 club Paris Saint-Germain and captains the Argentina national team. Often considered the best player in the world and widely regarded as one of the greatest players of all time, Messi has won a record seven Ballon d'Or awards, a record six European Golden Shoes, and in 2020 was named to the Ballon d'Or Dream Team. Until leaving the club in 2021, he had spent his entire professional career with Barcelona, where he won a club-record 35 trophies, including ten La Liga titles, seven Copa del Rey titles and four UEFA Champions Leagues. A prolific goalscorer and creative playmaker, Messi holds the records for most goals in La Liga (474), a La Liga and European league season (50), most hat-tricks in La Liga (36) and the UEFA Champions League (8), and most assists in La Liga (192), a La Liga season (21) and the Copa América (17). He also holds the record for most international goals by a South American male (80). Messi has scored over 750 senior career goals for club and country, and has the most goals by a player for a single club.</h4>
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

