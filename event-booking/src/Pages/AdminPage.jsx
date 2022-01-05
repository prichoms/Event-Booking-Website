import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import "../Components/Styling/admin.css";
import jsondata from "../scraped_data/db.json"
import { OrganizedEvents } from '../Components/OrganizedEvents';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AddIcon from "@material-ui/icons/Add";
import { useHistory, useParams } from "react-router-dom";
import { MovieCarousel } from "../Components/HomePage/MovieCarousel";
import { ModifyCarousel } from "../Components/HomePage/ModifyCarousel";
import styles from "../Components/Styling/RecommendedMovies.module.css";

export default function AdminPage({ action, handleCloseLogin }) {
  const { id } = useParams();
  const admin_data = jsondata.organizers.filter(ele => ele.id == id)[0];
  var feedback_data = jsondata.feed;
  const user_events = jsondata.organizers.filter(ele => ele.id == id)[0].organized_events;
  const events_data = jsondata.events;
  const filteredEvents = events_data.filter(event => (
    user_events.includes(event.id) 
  ))
  const filteredPastEvents = events_data.filter(event => (
    user_events.includes(event.id) && !event.is_premier
  ))
  const filteredUpcomingEvents = events_data.filter(event => (
      user_events.includes(event.id) && event.is_premier
  ))
  const [ascmod, setAscmod] = React.useState(true);
  const ascmodchange = () => {
    setAscmod(!ascmod);
  }
  function SortButton(props){
    let ddd = [];
    let zz = 0;
    for(let i=0;i<filteredEvents.length;i++){
      for(let j=0;j<filteredEvents[i].feedback.length;j++){
        zz = zz + 1;
        ddd.push({"name": filteredEvents[i].feedback[j].name, "rating": filteredEvents[i].feedback[j].rating, "id": zz, "event":filteredEvents[i].name});
      }
    }
    let btn;
    if (ascmod){
      ddd.sort((a, b) => (a.rating > b.rating) ? 1 : -1);
      btn = <>
              <button onClick={ascmodchange}>Sort in Descending?</button>
              <table className="styled-table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Event</th>
                    <th scope="col">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {ddd.map((i) => (
                          <tr key={i.id}>
                            <td>{i.name}</td>
                            <td>{i.event}</td>
                            <td>{i.rating}</td>
                          </tr>
                  ))}
                </tbody>
              </table>
            </>
    }else{
      ddd.sort((a, b) => (a.rating > b.rating) ? -1 : 1);
      btn = <>
      <button onClick={ascmodchange}>Sort in Ascending?</button>
      <table className="styled-table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Event</th>
            <th scope="col">Score</th>
          </tr>
        </thead>
        <tbody>
          {ddd.map((i) => (
                  <tr key={i.id}>
                    <td>{i.name}</td>
                    <td>{i.event}</td>
                    <td>{i.rating}</td>
                  </tr>
          ))}
        </tbody>
      </table>
    </>
    }
    return btn;
  }
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
        <h1>{admin_data.name}</h1>
        <h4>{admin_data.about}</h4>
      </div>
      <br/><br/><br/><br/>
      <center>
        <Button autoFocus variant="contained" color="primary">
          <Link to="/create" style={{ marginLeft: 20, color: "black" }}>
              <div>
                <AddIcon style={{ fontSize: "20px" }} />
                <span>Create New Event</span>
              </div>
          </Link>
        </Button>
      </center>
      <br/><br/><br/><br/>
      <div style={{ backgroundColor: "#16161D" }}>
          {/* <OrganizedEvents /> */}
          <>
            <div className={styles.parent}>
                <div className={styles.parent__text}>
                    <h1>Upcoming Events</h1>
                </div>
                <MovieCarousel movies={filteredUpcomingEvents} />
            </div>
            <div className={styles.parent}>
                <div className={styles.parent__text}>
                    <h1>Past Events</h1>
                </div>
                <MovieCarousel movies={filteredPastEvents} />
            </div>
            <div className={styles.parent}>
                <div className={styles.parent__text}>
                    <h1>Modify Events</h1>
                </div>
                <ModifyCarousel movies={filteredEvents} />
            </div>
        </>
      </div>

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
<br/><br/>
<h1 style={{"color":"white"}}>Feedback for Each Event</h1>
<br/>
<div>
  <SortButton />
</div>
{/* <table className="styled-table">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Event</th>
      <th scope="col">Score</th>
    </tr>
  </thead>
  <tbody>
    {ddd.map((i) => (
            <tr key={i.id}>
              <td>{i.name}</td>
              <td>{i.event}</td>
              <td>{i.rating}</td>
            </tr>
    ))}
  </tbody>
</table> */}
</center>
    </div>
  );
}

