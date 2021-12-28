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
      if (+number === 9876543210){
        setAuth(true);
        alert("Successfully Logged in");
        redirect_admin();
      }
      else if(+number === ""){
        alert("Please type your number");
        handleCloseLogin(number);
      }else {
        alert("You are not registered");
      }
      setAction(false);
      setState(false);
    }
    else if (r=="User"){
      if (+number === 7275584516) {
        setAuth(true);
        alert("Successfully Logged in");
      } else if (+number === 123456789) {
        setAuth(true);
        alert("Successfully Logged in");
      } else if (+number === "") {
        alert("Please type your number");
        handleCloseLogin(number);
      }
      else {
        alert("You are not registered");
      }
      setAction(false);
      setState(false);
    }
    else{
      // if (+number) {
      // alert("Select User Type");
      // }
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
            {isAuth && <div>Hi, User..</div>}

            <Drawer anchor="right" open={state}>
            </Drawer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
