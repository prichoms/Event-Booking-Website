import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../../Redux/data/actions";
import { useHistory, useParams } from "react-router-dom";
import "../../Components/MoviePage/moviePage.css";
import Carousel from "react-elastic-carousel";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { RecommendedMovies } from "../../Components/HomePage/RecommendedMovies";
import Login from "../LoginPage";
import { storeAuth } from "../../Redux/app/actions";
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import userdata from '../../scraped_data/users.json';

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

const MoviePage = () => {
  const [isMuted] = React.useState(true)
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
  const data_temp = useSelector((state) => state.data);
  console.log(data_temp);
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
    let newdata = data;
    let per = (data.rating.no_of_ratings)*(data.rating.percentage) + rValue;
    newdata.rating.no_of_ratings = data.rating.no_of_ratings + 1;
    newdata.rating.percentage = Math.floor(per/newdata.rating.no_of_ratings);
    let n = document.getElementById("name").value;
    let brr = newdata.feedback;
    let nid = {"name":n,"rating":rValue};
    brr.push(nid);
    newdata.feedback = brr;
    console.log(newdata);
    fetch(`http://localhost:3001/events/${data.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newdata)
        })
    setOpen(false);
  };

  const handleClick = () => {
    if (isAuth) {
      history.push(`/booktickets/${data.id}`)
      
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

  const gotouserpage = (email) => {
    if ((+email === 9876543210)) {
      console.log("admin redirect");
      return "/admin"
    }
    else if (+email === 123456789) {
      console.log("user redirect");
      return "/user"
    }
    return ""
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
                <button onClick={handleClick}>Book Tickets</button>
              </div>
            </div>
          </div>
          <div className='rowC'>
          <div className="middleContainer">
            <div>
              <h1>About</h1>
              <p>{data.about}</p>
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
            <hr />
          </div>
          <div className="middleContainer_right">
            <div className="container__card">
              <img src={data.banner_image_url} alt="title" />
            </div>
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
              <div className="container__movieDetail">
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
            </div>
          </div>
          </div>
        </>
      )}
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <div style={{ textAlign: "center", position: "relative" }}>
                <p style={{ margin: 0, padding: 0 }}>
                  {data && data.movie_name}
                </p>
                <button
                  onClick={handleClose}
                  style={{ position: "absolute", right: 10, top: 0 }}
                >
                  X
                </button>
              </div>
              <hr />
              <div className={classes.root}>
                <Typography id="discrete-slider" gutterBottom>
                  Name
                </Typography>
                <div class="form-group">
                  <input class="form-control form-control-lg" type="text"  id="name" name="name" placeholder="Your Name...." /><br /><br />
                </div>
                <Typography id="discrete-slider" gutterBottom>
                  How would you rate the movie?
                </Typography>
                <Slider
                  onChange={handleChange}
                  defaultValue={10}
                  getAriaValueText={valuetext}
                  aria-labelledby="discrete-slider"
                  valueLabelDisplay="auto"
                  step={10}
                  marks
                  min={0}
                  max={100}
                  color="secondary"
                />

                <div
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    backgroundColor: "#f84464",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    marginLeft: 60,
                    position: "relative"
                  }}
                >
                  <h1 style={{ color: "white", margin: 0, position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                    {rValue}%
                  </h1>
                </div>
              </div>
              <button
                onClick={handleRating}
                style={{
                  width: "80%",
                  margin: "30px",
                  height: 50,
                  fontSize: 18,
                  color: "white",
                  backgroundColor: "#f84464",
                  borderRadius: 10,
                  border: "none",
                  outline: "none",
                  cursor: "pointer"
                }}
              >
                Submit Rating
              </button>
            </div>
          </Fade>
        </Modal>
      </div>
      <RecommendedMovies></RecommendedMovies>
    </div>
  );
};

export default MoviePage;
