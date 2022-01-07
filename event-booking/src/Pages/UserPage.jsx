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
import { PremierEvents } from "../Components/HomePage/PremierEvents";
import { RecommendedEvents } from "../Components/HomePage/RecommendedEvents";
import { BookedEvents } from '../Components/BookedEvents';
import { useHistory, useParams, Link } from "react-router-dom";
import jsondata from "../database/db.json"

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
  let user_data = jsondata.users.filter(ele => ele.id == id)[0];
  let eligible=[];
  let fraands = [];
  let acceptf = [];
  let goodfraands = [];
  const sendRequest = (tid) => {
    const target = jsondata.users.filter(ele => ele.id == tid)[0];
    target.friend_requests.push(user_data.id);
    fetch(`http://localhost:3001/users/${target.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(target)
    })
    user_data.friends.push({"id":tid,"status":"requested"})
    fetch(`http://localhost:3001/users/${user_data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user_data)
    })
    const index = eligible.indexOf(tid);
    if (index > -1) {
      eligible.splice(index, 1);
    }
  }
  const acceptRequest = (tid) => {
    const target = jsondata.users.filter(ele => ele.id == tid)[0];
    let s=0;
    for(let ii=0;ii<target.friends.length;ii++){
      if(target.friends[ii].id==user_data.id ){
        target.friends[ii].status="accepted";
        s=1;
        break;
      }
    }
    if(s==0){
      target.friends.push({"id":user_data.id,"status":"accepted"})
    }
    fetch(`http://localhost:3001/users/${tid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(target)
    })
    const index = user_data.friend_requests.indexOf(target.id);
    if (index > -1) {
      user_data.friend_requests.splice(index, 1);
    }
    user_data.friends.push({"id":target.id,"status":"accepted"})
    fetch(`http://localhost:3001/users/${user_data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user_data)
    })
  }
  const Fraand = () => {
    let ret;
    if (user_data.friend_interest){
      let allusers = jsondata.users.filter(ele => ele.friend_interest  && ele.id!=user_data.id);
      let flg=0;
      let kk=0;
      let fids=[];
      for(let rr=0;rr<user_data.friends.length;rr++){
        fids.push(user_data.friends[rr].id);
      }
      eligible=[];
      for(let i=0;i<allusers.length;i++){
        flg=0;
        if (!fids.includes(allusers[i].id)){
          if(!user_data.friend_requests.includes(allusers[i].id)){
            if(!eligible.includes(allusers[i].id)){
              eligible.push(allusers[i].id);
            }
          }
        }
      }
      fraands = jsondata.users.filter(ele => eligible.includes(ele.id))
      acceptf = user_data.friend_requests;
      acceptf = jsondata.users.filter(ele => acceptf.includes(ele.id));
      fids=[];
      for(let rr=0;rr<user_data.friends.length;rr++){
        if(user_data.friends[rr].status=="accepted"){
          fids.push(user_data.friends[rr].id);
        }
      }
      goodfraands = jsondata.users.filter(ele => fids.includes(ele.id));
      ret=(<center>
        <h1 style={{color:"white"}}>Fraaaand Requests</h1>
        <table className="styled-table">
          <thead>
            <tr>
            <th scope="col">S.No</th>
              <th scope="col">Name</th>
              <th scope="col">Profile</th>
              <th scope="col">Send Request?</th>
            </tr>
          </thead>
          <tbody>
            {fraands.map((i) => (
                    <tr key={i.id}>
                      <td>{i.id}</td>
                      <td>{i.name}</td>
                      <td><Link to={{ pathname: `/user/${i.id}`}}><button>{i.name}'s Profile</button></Link></td>
                      {/* <td><button onClick={sendRequest(i.id)} >Send Request</button></td>  */}
                      <td><button onClick={() => sendRequest(i.id)}>Send</button></td>
                      {/* onClick={sendRequest(i.id)} */}
                    </tr>
            ))}
          </tbody>
        </table>

        <h1 style={{color:"white"}}>Accept Fraaaands</h1>
        <table className="styled-table">
          <thead>
            <tr>
            <th scope="col">S.No</th>
              <th scope="col">Name</th>
              <th scope="col">Profile</th>
              <th scope="col">Accept Request?</th>
            </tr>
          </thead>
          <tbody>
            {acceptf.map((i) => (
                    <tr key={i.id}>
                      <td>{i.id}</td>
                      <td>{i.name}</td>
                      <td><Link to={{ pathname: `/user/${i.id}`}}><button>{i.name}'s Profile</button></Link></td>
                      {/* <td><button onClick={sendRequest(i.id)} >Send Request</button></td>  */}
                      <td><button onClick={() => acceptRequest(i.id)}>Accept</button></td>
                      {/* onClick={sendRequest(i.id)} */}
                    </tr>
            ))}
          </tbody>
        </table>

        <h1 style={{color:"white"}}>Fraaaands</h1>
        <table className="styled-table">
          <thead>
            <tr>
            <th scope="col">S.No</th>
              <th scope="col">Name</th>
              <th scope="col">Profile</th>
              <th scope="col">E-mail</th>
            </tr>
          </thead>
          <tbody>
            {goodfraands.map((i) => (
                    <tr key={i.id}>
                      <td>{i.id}</td>
                      <td>{i.name}</td>
                      <td><Link to={{ pathname: `/user/${i.id}`}}><button>{i.name}'s Profile</button></Link></td>
                      {/* <td><button onClick={sendRequest(i.id)} >Send Request</button></td>  */}
                      <td>{i.email}</td>
                      {/* onClick={sendRequest(i.id)} */}
                    </tr>
            ))}
          </tbody>
        </table>
      </center>)
    }else{
      ret=(<></>)
    }
    return ret;
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
      <img className="profilepic" src={user_data.image}/>
      <div className="userdetails">
        <h1>{user_data.name}</h1>
        <h4>{user_data.about}</h4>
      </div>
      <br/><br/><br/><br/>

        <div style={{ backgroundColor: "#16161D" }}>
          <RecommendedEvents />
        </div>
        <div style={{ backgroundColor: "#16161D" }}>
          <BookedEvents />
        </div>
        <Fraand/>
      <br/><br/><br/>
    </div>
  );
}

