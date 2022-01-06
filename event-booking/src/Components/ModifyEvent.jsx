import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMovies, putMovies } from "../Redux/data/actions";
import { useHistory, useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";
import "./MoviePage/moviePage.css";
import "./Styling/ModifyEvent.css"
import Carousel from "react-elastic-carousel";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Login from "../Pages/LoginPage";
import { storeAuth } from "../Redux/app/actions";
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import userdata from '../scraped_data/users.json';
import db from "../scraped_data/db.json"

function valuetext(value) {
  return `${value}`;
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    height: "400px",
    width: "300px",
  },
  root: {
    width: 250,
    margin: 20,
    textAlign: "center",
  },
}));

const ModifyEvent = () => {
  const [isMuted, setIsMuted] = React.useState(true)
  const video = 'https://vimeo.com/331414823';
  const [rValue, setRvalue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState(false);
  const classes = useStyles();
  const { id } = useParams();
  const data = useSelector((state) => state.data.movies.data);
  const dispatch = useDispatch();
  const history = useHistory();
  const [action, setAction] = React.useState(false);
  const isAuth = useSelector(state => state.app.isAuth)
  const [auth, setAuth] = React.useState(false);
  
  React.useEffect(() => {
    dispatch(getMovies(id));
    window.scrollTo(window.scrollX, 0);
  }, []);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e, v) => {
    setRvalue(v);
  };
  const handleRating = () => {
    dispatch(
      putMovies(id, {
        rating: {
          percentage: data.rating.percentage,
          no_of_ratings: data.rating.no_of_ratings + 1,
        },
      })
    );
    setOpen(false);
  };

  const handleClick = () => {
    if (isAuth) {
      history.push(`/booktickets/`)
      
    } else {
      alert("Please login to book your tickets")
      setAction(true)
    }
  }

  const redirect_admin = () => {
    history.push('/admin')
  }
  const redirect_user = () => {
    history.push('/user')
  }
  const signout_user = () => {
    setAuth(false);
    history.push('/')
  }


  const handleCloseLogin = (email, pass, number) => {
    let r = "";
    if (document.getElementById('tab-1').checked) {
      r = document.getElementById('tab-1').value;
    }
    else if (document.getElementById('tab-2').checked) {
      r = document.getElementById('tab-2').value;
    }
    else {
      alert("Select User Type");
    }

    if (r === "Organizer") {
      var obj_email_check = userdata.organizers.filter(ele => ele.email == +email);
      var obj_pass_check = userdata.organizers.filter(ele => ele.password == +pass);
      var obj_mob_check = userdata.organizers.filter(ele => ele.phone == +number)[0];
      if (obj_mob_check) {
        setAuth(true);
        alert("Successfully Logged in");
        redirect_admin();
      }
      else if (+number == "" && +email == "") {
        setAuth(false);
        alert("Both Email & Mob is missing");
      }
      else if (+number == "") {
        setAuth(false);
        if (obj_email_check && obj_pass_check) {
          setAuth(true);
          alert("Successfully Logged in");
          redirect_admin();
        }
        else if (+email == "") {
          setAuth(false);
          alert("Please type your email");
          //handleCloseLogin(email, pass, number);
        }
        else if (+pass == "") {
          setAuth(false);
          alert("Please type your passsword");
          //handleCloseLogin(email, pass, number);
        }

      }

      else {
        setAuth(false);
        alert("You are not registered");
      }
      setAction(false);
      setState(false);
    }
    else if (r=="User"){
      var obj_email_check = userdata.users.filter(ele => ele.email == +email);
      var obj_pass_check = userdata.users.filter(ele => ele.password == +pass);
      var obj_mob_check = userdata.users.filter(ele => ele.phone == +number)[0];
      if (obj_mob_check) {
        setAuth(true);
        alert("Successfully Logged in");
      }
      else if (+number == "" && +email == "") {
        setAuth(false);
        alert("Both Email & Mob is missing");
      }
      else if (+number == "") {
        setAuth(false);
        if (obj_email_check && obj_pass_check) {
          setAuth(true);
          alert("Successfully Logged in");
        }
        else if (+email == "") {
          setAuth(false);
          alert("Please type your email");
          handleCloseLogin(email, pass, number);
        }
        else if (+pass == "") {
          setAuth(false);
          alert("Please type your passsword");
          handleCloseLogin(email, pass, number);
        }

      }
      else {
        setAuth(false);
        alert("You are not registered");
      }
      setAction(false);
      setState(false);
    }
  };
    React.useEffect(() => {
      dispatch(storeAuth(auth))
  }, [auth])

  const [abtmod, setAbtmod] = React.useState(false);
  const abtmodchange = () => {
    setAbtmod(!abtmod);
  }
  const abtmodsave = () => {
    abtmodchange();
    let a = document.getElementById("about").value;
    let newdata = data;
    if (a != "" ){
      newdata.about = a;
    }
    fetch(`http://localhost:3001/events/${data.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newdata)
        }
    )
  }
  function Aboutbox(props) {
    const dat = props.dat;
    const abtmod1 = abtmod;
    let about;
    if (abtmod1) {
      about = <>
                <h1>About <button onClick={abtmodsave} className="bttn">Save</button></h1>
                <div class="form-group">
                  <textarea class="form-control form-control-lg" rows="4" cols="100" id="about" name="about" placeholder={dat.about} /><br /><br />
                </div>
              </>
    } else {
      about = <>
                <h1>About <button onClick={abtmodchange} className="bttn">Modify</button></h1>
                <p>{dat.about}</p>
              </>
    }
    return about;
  }

  const [imgmod, setImgmod] = React.useState(false);
  const imgmodchange = () => {
    setImgmod(!imgmod);
  }
  const imgmodsave = () => {
    imgmodchange();
    let a = document.getElementById("poster").value;
    let newdata = data;
    if (a != "" ){
      newdata.banner_image_url = a;
    }
    fetch(`http://localhost:3001/events/${data.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newdata)
        }
    )
  }
  function Posterbox(props) {
    const dat = props.dat;
    const imgmod1 = imgmod;
    let poster;
    if (imgmod1) {
      poster = <>
                <div className="container__card">
                  <img src={dat.banner_image_url} alt="title" />
                </div>
                <button onClick={imgmodsave} className="bttn_det">Save</button>
                <div class="form-group">
                  <input class="form-control form-control-lg" type="text" id="poster" name="poster"/><br/><br/>
                </div>
              </>
    } else {
      poster = <>
                <div className="container__card">
                  <img src={dat.banner_image_url} alt="title" />
                </div>
                <button onClick={imgmodchange} className="bttn_det">Modify</button>
              </>
    }
    return poster;
  }


  const [detmod, setDetmod] = React.useState(false);
  const detmodchange = () => {
    setDetmod(!detmod);
  }
  const detmodsave = () => {
    detmodchange();
    let a = document.getElementById("languages").value;
    let b = document.getElementById("duration").value;
    let c = document.getElementById("release_date").value;
    let newdata = data;
    if (a != "" ){
      newdata.languages = a;
    }
    if (b != "" ){
      newdata.duration = b;
    }
    if (c != "" ){
      newdata.release_date = c;
    }
    fetch(`http://localhost:3001/events/${data.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newdata)
        }
    )
  }
  function Detailsbox(props) {
    const dat = props.dat;
    const detmod1 = detmod;
    let details;
    if (detmod1) {
      details = <>
                <button onClick={detmodsave} className="bttn_det">Save</button>
                <div className="container__movieDetail">
                  <div style={{ color: "white", fontSize: 18 }}>
                    <div class="form-group otherdet">
                      <label for="languages"><h3>Languages:</h3></label><br />
                      <input class="form-control form-control-lg langbox" type="text"  id="languages" name="languages" placeholder={dat.languages} /><br /><br />
                    </div>

                    <div class="form-group otherdet">
                      <label for="duration"><h3>Duration:</h3></label><br />
                      <input class="form-control form-control-lg langbox" type="text"  id="duration" name="duration" placeholder={dat.duration} /><br /><br />
                    </div>
                    
                    <div class="form-group otherdet">
                      <label for="release_date"><h3>Release Date:</h3></label><br />
                      <input class="form-control form-control-lg langbox" type="text"  id="release_date" name="release_date" placeholder={dat.release_date} /><br /><br />
                    </div>
                  </div>
                </div>
              </>
    } else {
      details = <>
                <button onClick={detmodchange} className="bttn_det">Modify</button>
                <div className="container__movieDetail">
                  <div className="container__movieDetail_language">
                    <div>
                      <p>{dat.languages}</p>
                    </div>
                  </div>
                  <div style={{ color: "white", fontSize: 18 }}>
                    <h5 style={{ color: "white", fontSize: 18 }}>
                      {`${dat.duration} - ${dat.genre.map(
                        (e) => " " + e.genre
                      )} - ${dat.release_date}`}
                    </h5>
                  </div>
                </div>
              </>
    }
    return details;
  }
  
  function DeleteEvent(){
    let aa = window.confirm('Are you sure you want to delete this event?');
    if (aa) {
      fetch(`http://localhost:3001/events/${data.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      history.push("/")
    }
  }
  const Trash = ({size=40, color="#d0021b"}) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="square" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>);
  
  return (
    <div>
      {data && (
        <>
          <div
            className="container"
            style={{
              backgroundImage: "linear-gradient(315deg, #f9484a 0%, #fbd72b 74%)",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <Login action={action} handleCloseLogin={handleCloseLogin} />
            <div className="movie_details">
              <h1>{data.name}</h1>
              <div className="BookButton">
                <button >Book Tickets</button>
              </div>
            </div>
          </div>
          <center>
            <button className="Delete" onClick={DeleteEvent}>
              <Trash/><br/>
              Delete Event?
            </button>

          </center>
          <div className='rowC'>
          <div className="middleContainer">
            <div>
              {/* {about} */}
              <Aboutbox dat={data} />
            </div>
            <hr />
             <div>
              <h1>Starring</h1>
              <Carousel itemsToShow={5} pagination={true}>
                {data.cast.map((e) => (
                  <div key={e.id} className="carousel_cast">
                    <div>
                      <img
                        className="carousel_image"
                        src={e.cast_image}
                        alt="e.cast_image"
                      />
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <h4>{e.original_name}</h4>
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
            <hr />
            <div className="cimg">
              <h1>Highlights</h1>
              <AliceCarousel autoPlay autoPlayInterval="3000" infinite autoHeight>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOAcC4jk3L5nr5wp358To4YCDRvZJL8rS3zlL5VxWmoHriH6-6lwbNktamxKWAiF8FD1Y&usqp=CAU" className="sliderimg"/>
                    <img src="https://cdn.livekindly.co/wp-content/uploads/2021/01/male-chick.jpeg" className="sliderimg"/>
                    <img src="https://www.macmillandictionary.com/external/slideshow/full/155876_full.jpg" className="sliderimg"/>
                    <img src="https://media.wired.com/photos/5926ea678d4ebc5ab806be8c/master/w_2560%2Cc_limit/GettyImages-79312712-sa.jpg" className="sliderimg"/>
                    
              </AliceCarousel>
            </div>
          </div>
          <div className="middleContainer_right">
            {/* <div className="container__card">
              <img src={data.banner_image_url} alt="title" />
            </div> */}
            <Posterbox dat={data} />
            <div className="container__movieDetail_rating">
                <img
                  src="https://www.leadingwithhonor.com/wp-content/uploads/2021/02/redheart.png"
                  alt="Rating"
                  style={{ width: 30 }}
                />
                <h1>{data.rating.percentage}%</h1>
              </div>
              <h3>{Math.ceil(data.rating.no_of_ratings)} Ratings</h3>
              <div className="container__movieDetail_ratingButton">
                <div>
                  <h4 style={{ color: "white" }}>Your ratings matter</h4>
                </div>
                <div>
                  <button style={{ cursor: "pointer" }} onClick={handleOpen}>Rate Now</button>
                </div>
              </div>
              {/* <div className="container__movieDetail">
                <div className="container__movieDetail_language">
                  <div>
                    <p>{data.languages}</p>
                  </div>
                </div>
                <div style={{ color: "white", fontSize: 18 }}>
                  <h5 style={{ color: "white", fontSize: 18 }}>
                    {`${data.duration} - ${data.genre.map(
                      (e) => " " + e.genre
                    )} - ${data.release_date}`}
                  </h5>
                </div>
              </div> */}
            
              <Detailsbox dat={data} />
          </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ModifyEvent;
