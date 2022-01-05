import React from 'react';
import { Link } from "react-router-dom";
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
import '../Components/Styling/CreatePage.css'
import { PopularEvents } from "../Components/HomePage/PopularEvents";
import { PremierMovies } from "../Components/HomePage/PremierMovies";
import { RecommendedMovies } from "../Components/HomePage/RecommendedMovies";
import { BookedEvents } from '../Components/BookedEvents';
import data from "../scraped_data/db.json"
//import "../Components/MoviePage/moviePage.css";
import { useHistory} from "react-router-dom";

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

export default function CreateEvent({ action, handleCloseLogin }) {
  const history = useHistory();
  function getMax(arr, prop) {
    var max = -1;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].id > max)
        max = arr[i].id;
    }
    return max;
  }
  const submit_event = () => {
    let n = document.getElementById("name").value;
    let a = document.getElementById("about").value;
    let p = document.getElementById("poster").value;
    let d = document.getElementById("dur").value;
    let g = document.getElementById("genre").value;
    let dt = document.getElementById("date").value;
    let l = document.getElementById("location").value;
    g = [{"genre": g}];
    let r = {"percentage":88, "no_of_ratings": 197};
    let c = [{"original_name": "Gal Gadot","character": "as Wonder Woman/ Diana Prince","cast_image": "https://in.bmscdn.com/iedb/artist/images/website/poster/large/gal-gadot-11088-17-10-2017-11-45-36.jpg"},{"original_name": "Chris Pine","character": "as Steve Trevor","cast_image": "https://in.bmscdn.com/iedb/artist/images/website/poster/large/chris-pine-435-24-03-2017-13-51-09.jpg"},{"original_name": "Kristen Wiig","character": "as Cheetah","cast_image": "https://in.bmscdn.com/iedb/artist/images/website/poster/large/kristen-wiig-9007-24-03-2017-12-36-08.jpg"},{"original_name": "Pedro Pascal","character": "as Max Lord","cast_image": "https://in.bmscdn.com/iedb/artist/images/website/poster/large/pedro-pascal-1065016-24-03-2017-17-40-11.jpg"},{"original_name": "Connie Nielsen","character": "as Hippolyta","cast_image": "https://in.bmscdn.com/iedb/artist/images/website/poster/large/connie-nielsen-7706-15-05-2017-11-42-20.jpg"},{"original_name": "Robin Wright","character": "as Antiope","cast_image": "https://in.bmscdn.com/iedb/artist/images/website/poster/large/robin-wright-22180-24-03-2017-12-31-27.jpg"}]
    let brr = data.organizers.filter(a => a.id == 1)[0].organized_events;
    let nid = getMax(data.events) + 1;
    brr.push(nid);
    fetch("http://localhost:3001/events")
      .then(res => res.json())
      .then(result =>
        fetch("http://localhost:3001/events", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ "id": getMax(result) + 1, "name": n, "location": l, "about": a, "is_popular":false, "duration":d, "languages": "English, Hindi, Tamil, Telugu","release_date":dt,"is_premier":false,"genre": g, "banner_image_url": p ,"rating":r,"cast":c})
        })
      )
      .then(r => 
        fetch("http://localhost:3001/organizers/1", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ "id": 1, "organized_events":brr, "phone": "7021904275","email":"admin1@gmail.com","password":"admin1"})
        })
      )

      history.push('/')
  };
  return (
    <div>
        <div
            className="container_create"
            style={{
            backgroundImage: "linear-gradient(315deg, #f9484a 0%, #fbd72b 74%)",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            }}
        >
          <div className="title" style={{"margin-top":"200px", "margin-left":"50px", "fontSize":"20px"}}>
              <h1>Create A New Event</h1>
          </div>
        </div>
        <div className='formc'>
          <form>
              
              <div class="form-group">
                <label for="name">Event Name:</label><br />
                <input class="form-control" type="text" id="name" name="name" placeholder="Event name..." /><br /><br />
              </div>
              <div class="form-group">
                <label for="about">Event Details:</label><br />
                <textarea class="form-control form-control-lg" rows="4" cols="100" id="about" name="about" placeholder="Description..." /><br /><br />
              </div>
              <div class="form-group">
                <label for="poster">Event Poster</label><br/>
                <input class="form-control form-control-lg" type="text" id="poster" name="poster"/><br/><br/>
              </div>
              <div class="form-group">
                <label for="dur">Event Duration:</label><br />
                <input class="form-control form-control-lg" type="text"  id="dur" name="dur" placeholder="Duration..." /><br /><br />
              </div>
              <div class="form-group">
                <label for="genre">Genre:</label><br />
                <input class="form-control form-control-lg" type="text"  id="genre" name="genre" placeholder="Genre..." /><br /><br />
              </div>
              <div class="form-group">
                <label for="date">Event Date:</label><br />
                <input class="form-control form-control-lg" type="text"  id="date" name="date" placeholder="Date..." /><br /><br />
              </div>
              <div class="form-group">
                <label for="date">Event Location:</label><br />
                <input class="form-control form-control-lg" type="text"  id="location" name="location" placeholder="Location..." /><br /><br />
              </div>
          </form>
          <Link to="/" style={{ marginLeft: 20, color: "black" }}>  
            <button
              onClick={submit_event}
              style={{
                width: "80%",
                margin: "30px",
                height: 50,
                fontSize: 24,
                color: "white",
                backgroundColor: "#f84464",
                borderRadius: 10,
                border: "none",
                outline: "none",
                cursor: "pointer",
              }}
            >
              Create Event
            </button>
          </Link>
        </div>
      </div>
  );
}

