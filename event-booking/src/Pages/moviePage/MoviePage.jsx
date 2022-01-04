import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovies, putMovies } from "../../Redux/data/actions";
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
import ReactPlayer from 'react-player'
import { ReactComponent as MuteIcon } from '../../static/mute.svg'
import { ReactComponent as UnmuteIcon } from '../../static/unmute.svg'
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
            <div className="event_details">
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
                    {`${data.movie_duration} - ${data.genre.map(
                      (e) => " " + e.genre
                    )} - ${data.release_date}`}
                  </h5>
                </div>
            </div>
          </div>
          </div>
        </>
      )}
      <RecommendedMovies></RecommendedMovies>
    </div>
  );
};

export default MoviePage;
