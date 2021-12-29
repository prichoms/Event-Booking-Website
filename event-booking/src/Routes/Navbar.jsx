import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../Components/Styling/Navbar.module.css";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import clsx from "clsx";
import { useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cityRequest, storeAuth } from "../Redux/app/actions";
import Login from "../Pages/LoginPage";
import { useHistory } from 'react-router-dom';
import userdata from '../scraped_data/users.json';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles({
  list: {
    width: 350,
  },
  fullList: {
    width: "auto",
  },
});

function getobj(id){
  var obj = userdata.users.filter(ele => ele.id == id)[0];
  console.log("Nav");
  console.log(obj);
  console.log(obj.phone);
  console.log(obj.name);
}

const Navbar = () => {
  const [query, setQuery] = React.useState("");
  const [city, setCity] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [cityName, setCityName] = React.useState("Select City");
  const theme = useTheme();
  const classes = useStyles();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [state, setState] = React.useState(false);
  const [auth, setAuth] = React.useState(false);
  const [action, setAction] = React.useState(false);
  const isAuth = useSelector((state) => state.app.isAuth);
  let history = useHistory();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleLocation = (name) => {
    setOpen(false);
    setCityName(name);
  };

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(cityRequest(cityName));
  }, [cityName]);

  const toggleDrawer = (open) => (event) => {
    setState(!state);
  };

  const handleSignIn = () => {
    setAction(true);
    setState(false);
  };

  const redirect_admin = () => {
    history.push('/admin')
  }
  const redirect_user = () => {
    history.push('/user')
  }
  
  const gotouserpage = (number) => {
    if ((+number === 9876543210)){
      console.log("admin redirect");
      return "/admin"
    }
    else if(+number === 123456789){
      console.log("user redirect");
      return "/user"
    }
    return ""
  }
  
  const handleCloseLogin = (number) => {
    let r = "";
    if (document.getElementById('tab-1').checked) {
      r = document.getElementById('tab-1').value;
    }
    else if (document.getElementById('tab-2').checked) {
      r = document.getElementById('tab-2').value;
    }
    else{
      alert("Select User Type");
    }
    if (r==="Organizer"){
      var obj = userdata.organizers.filter(ele => ele.phone == +number)[0];
      if (obj){
        setAuth(true);
        alert("Successfully Logged in");
        redirect_admin();
      }
      else if (+number == ""){
        setAuth(false);
        alert("Please type your number");
        handleCloseLogin(number);
      }
      else{
        setAuth(false);
        alert("You are not registered");
      }
      setAction(false);
      setState(false);
    }
    else if (r=="User"){
      var obj = userdata.users.filter(ele => ele.phone == +number)[0];
      if (obj){
        setAuth(true);
        alert("Successfully Logged in");
      }
      else if (+number == ""){
        setAuth(false);
        alert("Please type your number");
        handleCloseLogin(number);
      }
      else{
        setAuth(false);
        alert("You are not registered");
      }
      setAction(false);
      setState(false);
    }
    else{
      setAction(false);
      setState(false);
    }
  };
  React.useEffect(() => {
    dispatch(storeAuth(auth));
  }, [auth]);

  return (
    <div>
      <div className={styles.navbar}>
        <div style={{ display: "flex", alignItems: "center", width: "60%", height: "100%"}}>
          <Link className={styles.link} to="/">
            <svg style={{marginTop: "55px"}} >
              <image height="100" width="100"
                href="//www.iasplus.com/en/images/responsive/badges/g20/@@images/465e1ae9-46a0-4131-b3d0-984fcbb8233a.png"
              ></image>
            </svg>
          </Link> 
        </div>
        <div>
          <Link className={styles.link} to="">
            Events
          </Link>
          <Link className={styles.link} to="/about">
            About
          </Link>
          <Link className={styles.link} to="/contact">
            Contact
          </Link>
          <Link className={styles.link} to="#">
            ABC
          </Link>
          <Link className={styles.link} to="#">
            XYZ
          </Link>
        </div>
        <div style={{ display: "flex", alignItems: "center", fontSize: "20px" , size: "20px"}}>
          
          {!isAuth && (
            <button onClick={handleSignIn} className={styles.signBtn}>
              <p>Sign In</p>

            </button>
          )}
          <Login action={action} handleCloseLogin={handleCloseLogin} />
          <div
            onClick={toggleDrawer(true)}
            onClose={toggleDrawer(false)}
            className={styles.profile}
          >
            {isAuth && <AccountCircleIcon style={{ fontSize: "40px" }} />}
            {isAuth && <div >Hi, User..</div>}

            <Drawer anchor="right" open={state}>
            <div className={styles.drawer}>
                <div>
                  <div>Hi, User </div>
                  {/* <Link
                    style={{ marginLeft: 0, fontSize: "17px" }}
                    className={styles.link}
                  >
                    Edit Profile
                  </Link> */}
                </div>
                <AccountCircleIcon style={{ fontSize: "40px" }} />
              </div>
              <div className={styles.sideber_content}>
                <Link
                    to="/user"
                    style={{ marginLeft: 20, color: "black" }}
                >
                <div>
                  <AccountCircleIcon style={{ fontSize: "20px" }} />
                    <span>Profile</span>
                  </div>
                  </Link>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#666"
                      fill-rule="evenodd"
                      d="M13.977 5.094l.002.002-.005-.002v.001l-.021-.005.206.045A5.002 5.002 0 0 1 18 10v6.974L20 19h-2l-3.55-.001a2.5 2.5 0 1 1-4.9 0L7.027 19v.004h-3L6 17.003V10a5.002 5.002 0 0 1 4.048-4.91l-.049.01L10 4a2 2 0 1 1 4 0l.001 1.1-.008-.002-.035-.008.018.004zm-.563 13.905h-2.829a1.5 1.5 0 1 0 2.83 0zM13 6h-2a4 4 0 0 0-4 4v6.978L7.014 18H17v-8a4 4 0 0 0-4-4zm.983-.904l.003.001.007.001-.008-.001-.002-.001zm-.002 0h.002l-.005-.002.003.002zm-.28-.047l.112.017.018.002-.13-.019zm-3.388-.003l-.057.009.036-.005.02-.004zm.267-.029l-.172.018.148-.016.024-.002zm2.928.008l.082.01a5.014 5.014 0 0 0-.082-.01zm-2.803-.016l-.125.008h.015l.11-.008zm2.538-.003h.013l.05.003-.063-.003zM12 3a1 1 0 0 0-1 1v1h2V4a1 1 0 0 0-1-1z"
                    ></path>
                  </svg>
                  <span>Notifications</span>
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#666"
                      fill-rule="evenodd"
                      d="M9.5 2A3.5 3.5 0 0 1 13 5.5V6h3l.375 6H22v3a2 2 0 1 0 0 4v3H2L3 6h3v-.5A3.5 3.5 0 0 1 9.5 2zM21 13H7v1.17a3.001 3.001 0 0 1 0 5.66V21h14v-1.17a3.001 3.001 0 0 1 0-5.66V13zM6 7H3.94l-.876 14H6v-2a2 2 0 1 0 0-4v-3h9.372l-.311-5H13v2h-1V7H7v2H6V7zm8 7.5l.735 1.489 1.643.238-1.19 1.16.281 1.636L14 18.25l-1.47.773.281-1.637-1.189-1.159 1.643-.238L14 14.5zM9.5 3A2.5 2.5 0 0 0 7 5.5V6h5v-.5A2.5 2.5 0 0 0 9.5 3z"
                    ></path>
                  </svg>
                  <Link
                    to="/profile/booking-history"
                    style={{ marginLeft: 20, color: "black" }}
                  >
                    <span>Booking History</span>
                  </Link>
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#666"
                      fill-rule="evenodd"
                      d="M14 2c.25 0 .46.18.49.42l.38 2.65c.61.25 1.17.58 1.69.98l2.49-1a.5.5 0 0 1 .61.22l2 3.46c.12.22.07.49-.12.64l-2.11 1.65c.04.32.07.64.07.98 0 .34-.03.66-.07.98l2.11 1.65c.19.15.24.42.12.64l-2 3.46c-.09.16-.26.25-.43.25-.06 0-.12-.01-.18-.03l-2.49-1c-.52.39-1.08.73-1.69.98l-.38 2.65c-.03.24-.24.42-.49.42h-4c-.25 0-.46-.18-.49-.42l-.38-2.65c-.61-.25-1.17-.58-1.69-.98l-2.49 1a.5.5 0 0 1-.61-.22l-2-3.46a.505.505 0 0 1 .12-.64l2.11-1.65A7.93 7.93 0 0 1 4.5 12c0-.33.03-.66.07-.98L2.46 9.37a.493.493 0 0 1-.12-.64l2-3.46c.09-.16.26-.25.43-.25.06 0 .12.01.18.03l2.49 1c.52-.39 1.08-.73 1.69-.98l.38-2.65c.03-.24.24-.42.49-.42zm-.437 1h-3.126l-.398 2.778-.53.217a6.672 6.672 0 0 0-1.469.855l-.45.338-.523-.21-2.076-.836-1.568 2.712 2.21 1.727-.07.563A6.881 6.881 0 0 0 5.5 12c0 .251.02.524.062.856l.07.563-.446.349-1.763 1.378 1.567 2.71 2.607-1.047.453.348c.461.355.945.637 1.46.848l.529.217.08.566.318 2.212h3.126l.398-2.778.53-.217a6.672 6.672 0 0 0 1.469-.855l.45-.338.523.21 2.076.836 1.568-2.712-2.21-1.727.07-.563A6.73 6.73 0 0 0 18.5 12c0-.258-.02-.518-.062-.856l-.07-.563.446-.349 1.763-1.378-1.567-2.71-2.607 1.047-.453-.348a6.305 6.305 0 0 0-1.46-.848l-.529-.217-.08-.566L13.562 3zM12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"
                    ></path>
                  </svg>
                  <span>Settings</span>
                </div>
                <div className={styles.signout_button}>
                  <button>Sign out</button>
                </div>
              </div>
            </Drawer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
