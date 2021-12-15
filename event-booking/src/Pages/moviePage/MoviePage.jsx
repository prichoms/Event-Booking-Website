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
      history.push(`/booktickets/${id}`)
      
    } else {
      alert("Please login to book your tickets")
      setAction(true)
    }
  }

  const handleCloseLogin = (number) => {
    if (+number === 7275584516) {
        setAuth(true)
        alert("Successfully Logged in")
    }
    else if (+number === 123456789) {
        setAuth(true)
        alert("Successfully Logged in")
    }else if (+number === "") {
        alert("Please type your number")
        handleCloseLogin(number)
    }
    else {
        alert("You are not registered")
    }
    setAction(false);
  }
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
