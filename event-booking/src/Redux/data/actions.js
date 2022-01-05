import * as actionType from "./actionTypes";
// import dat from '../../scraped_data/bookMyShow.json';
import datpop from '../../scraped_data/db.json';
import axios from "axios";
const getMovieRequest = () => {
  return {
    type: actionType.GET_MOVIE_REQUEST,
  };
};

const getMovieSuccess = (payload) => {
  return {
    type: actionType.GET_MOVIE_SUCCESS,
    payload,
  };
};

const getMovieFailure = (error) => {
  return {
    type: actionType.GET_MOVIE_FAILURE,
    payload: {
      error: error,
    },
  };
};


function getobj(id){
  var object_new = {"data":datpop.events.filter(ele => ele.id == id)[0]};
  return object_new;
}

// var jsondata = {"data":{"id":"60b87f8d01064602a7397856","name":"Wonder Woman 1984","grade":"UA","languages":"English, Hindi, Tamil, Telugu","banner_image_url":"https://i.imgur.com/CxvVAcK.jpg","cover_image_url":"https://in.bmscdn.com/iedb/movies/images/mobile/listing/xxlarge/wonder-woman-1984-et00077622-22-02-2021-07-00-29.jpg","rating":{"percentage":73,"no_of_ratings":11.5},"duration":"2h 31m","release_date":"24 Dec, 2020","is_premier":true,"screen_type":[{"type":"2D"},{"type":"MX4D"},{"type":"4DX"},{"type":"2D SCREEN X"},{"type":"IMAX 2D"}],"genre":[{"genre":"Action"},{"genre":"Adventure"},{"genre":"Fantasy"}],"about_movie":"Set in the 1980s, Wonder Woman`s next big screen adventure finds her facing two all-new foes, Max Lord and The Cheetah, and the unexpected return of a face from her past.","cast":[{"original_name":"Gal Gadot","character":"as Wonder Woman/ Diana Prince","cast_image":"https://in.bmscdn.com/iedb/artist/images/website/poster/large/gal-gadot-11088-17-10-2017-11-45-36.jpg"},{"original_name":"Chris Pine","character":"as Steve Trevor","cast_image":"https://in.bmscdn.com/iedb/artist/images/website/poster/large/chris-pine-435-24-03-2017-13-51-09.jpg"},{"original_name":"Kristen Wiig","character":"as Cheetah","cast_image":"https://in.bmscdn.com/iedb/artist/images/website/poster/large/kristen-wiig-9007-24-03-2017-12-36-08.jpg"},{"original_name":"Pedro Pascal","character":"as Max Lord","cast_image":"https://in.bmscdn.com/iedb/artist/images/website/poster/large/pedro-pascal-1065016-24-03-2017-17-40-11.jpg"},{"original_name":"Connie Nielsen","character":"as Hippolyta","cast_image":"https://in.bmscdn.com/iedb/artist/images/website/poster/large/connie-nielsen-7706-15-05-2017-11-42-20.jpg"},{"original_name":"Robin Wright","character":"as Antiope","cast_image":"https://in.bmscdn.com/iedb/artist/images/website/poster/large/robin-wright-22180-24-03-2017-12-31-27.jpg"}],"crew":[{"name":"Patty Jenkins","crew_position":"Director, Producer, Screenplay","crew_image":"https://in.bmscdn.com/iedb/artist/images/website/poster/large/patty-jenkins-1067968-05-02-2021-12-17-23.jpg"},{"name":"Gal Gadot","crew_position":"Producer","crew_image":"https://in.bmscdn.com/iedb/artist/images/website/poster/large/gal-gadot-11088-17-10-2017-11-45-36.jpg"},{"name":"Zack Snyder","crew_position":"Producer","crew_image":"https://in.bmscdn.com/iedb/artist/images/website/poster/large/zack-snyder-5255-24-03-2017-15-46-59.jpg"},{"name":"Deborah Snyder","crew_position":"Producer","crew_image":"https://in.bmscdn.com/iedb/artist/images/website/poster/large/deborah-snyder-iein018495-15-05-2017-11-47-22.jpg"},{"name":"Geoff Johns","crew_position":"Producer, Screenplay","crew_image":"https://in.bmscdn.com/iedb/artist/images/website/poster/large/geoff-johns-1074456-07-11-2017-10-24-41.jpg"},{"name":"Hans Zimmer","crew_position":"Musician","crew_image":"https://in.bmscdn.com/iedb/artist/images/website/poster/large/hans-zimmer-786-24-03-2017-12-32-04.jpg"},{"name":"Dave Callaham","crew_position":"Screenplay","crew_image":"https://in.bmscdn.com/iedb/artist/images/website/poster/large/dave-callaham-18618-24-03-2017-15-56-01.jpg"}]}};
export const getMovies = (id) => (dispatch) => {
  var jsonmoviedata = getobj(id);
  // console.log(jsonmoviedata);
  // jsonmoviedata = jsondata;
  // console.log(jsonmoviedata);
  dispatch(getMovieRequest());
  // return axios
  //   .get(jsonmoviedata)
  //   // .get({"data":dat.data.filter(ele => ele.id == id)})
  //   .then((res) => {
  //     dispatch(getMovieSuccess(res.data));
  //   })
  //   .catch((err) => dispatch(getMovieFailure(err)));
  return dispatch(getMovieSuccess(jsonmoviedata));
};

export const putMovies = (id, param) => (dispatch) => {
  // console.log(id, param);
  // dispatch(getMovieRequest());
  // return axios
  //   .patch(`https://bookmyshow-clone-masai.herokuapp.com/movies/${id}`, param)
  //   .then((res) => {
  //     dispatch(getMovies(id));
  //   })
  //   .catch((err) => dispatch(getMovieFailure(err)));
  return dispatch(getMovies(id));
};