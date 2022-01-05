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


export default function AdminPage({ action, handleCloseLogin }) {
  var feedback_data = jsondata.feed;
  const user_events = jsondata.organizers.filter(ele => ele.id == 1)[0].organized_events;
  const events_data = jsondata.events;
  const filteredEvents = events_data.filter(event => (
    user_events.includes(event.id) 
  ))
  
  // ddd.sort((a, b) => (a.rating > b.rating) ? 1 : -1);
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
        <h1>Lionel Messi</h1>
        <h4>Lionel Andrés Messi, also known as Leo Messi, is an Argentine professional footballer who plays as a forward for Ligue 1 club Paris Saint-Germain and captains the Argentina national team. Often considered the best player in the world and widely regarded as one of the greatest players of all time, Messi has won a record seven Ballon d'Or awards, a record six European Golden Shoes, and in 2020 was named to the Ballon d'Or Dream Team. Until leaving the club in 2021, he had spent his entire professional career with Barcelona, where he won a club-record 35 trophies, including ten La Liga titles, seven Copa del Rey titles and four UEFA Champions Leagues. A prolific goalscorer and creative playmaker, Messi holds the records for most goals in La Liga (474), a La Liga and European league season (50), most hat-tricks in La Liga (36) and the UEFA Champions League (8), and most assists in La Liga (192), a La Liga season (21) and the Copa América (17). He also holds the record for most international goals by a South American male (80). Messi has scored over 750 senior career goals for club and country, and has the most goals by a player for a single club.</h4>
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
          <OrganizedEvents />
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

