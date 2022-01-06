import React from "react";
import styles from "../Components/Styling/SeeAll.module.css";
import "../Components/Styling/sa.css";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../Redux/app/actions";
import CardSeeAll from "../Components/Card_seeAll";
import ReactPaginate from "react-paginate";
import { useEffect,useState } from "react";

const SeeAll = () => {
  

  const [language, SetLanguage] = React.useState(false);
  const [genre, SetGenre] = React.useState(false);
  const [filterLanguage, setFilterLanguage] = React.useState([]);
  const [filterGenre, setFilterGenre] = React.useState([]);
  const [movie, setMovie] = React.useState([]);

  React.useEffect(() => {
    dispatch(getMovies());
    window.scrollTo(window.scrollX, 0);
  }, []);

  const movies_data = useSelector((state) => state.app.movies_data);
  const city = useSelector((state) => state.app.city);

  const dispatch = useDispatch();

  React.useEffect(() => {
    setMovie(movies_data);
  }, [movies_data]);
  console.log(movie);
  const filterMovies = () => {
    if (filterLanguage.length > 0) {
      const updated = movie.filter((item) =>
        item.languages.includes(filterLanguage[filterLanguage.length - 1])
      );
      setMovie(updated);
    }
    if (filterGenre.length > 0) {
      // let updated = movie.filter(
      //   (item) =>
      //     item.genre.find((gen) =>
      //       gen.genre == filterGenre[filterGenre.length - 1]
      //         ? gen.genre
      //         : "none"
      //     ).genre == filterGenre[filterGenre.length - 1]
      // );
      let updated = [];
      let flg=1;
      for(let ii=0;ii<movie.length;ii++){
        flg=1;
        let genre_m = [];
        for(let jj=0;jj<movie[ii].genre.length;jj++){
          let n = movie[ii].genre[jj].genre;
          genre_m.push(n);
        }
        for(let kk=0;kk<filterGenre.length;kk++){
          if(!genre_m.includes(filterGenre[kk])){
            flg=0;
          }
        }
        if(flg===1){
          updated.push(movie[ii]);
        }
      }
      setMovie(updated);
    }
    if ( filterLanguage.length === 0 && filterGenre.length === 0) {
      setMovie(movies_data);
    }
    updateevents();
  };

  React.useEffect(() => {
    if (
      filterLanguage.length === 0 &&
      filterGenre.length === 0 
    ) {
      setMovie(movies_data);
    }
  }, [movie]);
  const handleClear = (text) => {
    if (text === "languages") {
      setFilterLanguage([]);
    } else {
      setFilterGenre([]);
    }
    filterMovies();
  };

  const handleFilter = (language, genre) => {
    if (language !== "") {
      const index = filterLanguage.indexOf(language);
      if (index !== -1) {
        let newf = filterLanguage;
        newf.splice(index, 1);
        setFilterLanguage(newf);
      } else {
        let fff = filterLanguage;
        fff.push(language)
        setFilterLanguage(fff);
      }
    } else {
      const index = filterGenre.indexOf(genre);
      if (index !== -1) {
        filterGenre.splice(index, 1);
      } else {
        let fff = filterGenre;
        fff.push(genre)
        setFilterGenre(fff);
      }
    }
    filterMovies();
  };

  React.useEffect(() => {
    let lan = filterLanguage.includes("");
  });
  const itms = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];
  const[items, setItems]=useState(itms);
  const [pageNumber, setPageNumber]= useState(0);
  const itemsPerPage = 6
  const pagesVisited = pageNumber*itemsPerPage
  let displayItems=movie.slice(pagesVisited, pagesVisited+itemsPerPage).map((item) => <CardSeeAll {...item} />)

  let PageCount = Math.ceil(displayItems.length / itemsPerPage);
  const changePage = ({selected})=>{
      setPageNumber(selected);
  };
  const updateevents = () => {
    displayItems=movie.slice(pagesVisited, pagesVisited+itemsPerPage).map((item) => <CardSeeAll {...item} />)
  }
  return (
    <div className={styles.container}>
      
      <div className={styles.leftsideNav}>
        <h2 style={{ background: "none", fontSize: "30px", fontWeight: "700", color: "white" }}>
          Filters
        </h2>
        <div style={{"border-radius": "30px",	"border-width": "2px",	"border-style": "solid",	"border-color": "fuchsia"}}>
          <div className={styles.header}>
            <div onClick={() => SetLanguage(!language)}>
              <span
                style={{
                  marginLeft: "10px",
                  color: "#e67088",
                  fontSize: "25px"
                }}
              >
                Languages
              </span>
            </div>
            <div onClick={() => handleClear("languages")} style={{fontSize: "15px"}}>Clear</div>
          </div>
          <div
            className={styles.dialogue}
           
          >
            <button
              style={
                filterLanguage.includes("Hindi")
                  ? { background: "#e67088", color: "white", borderRadius: "15px" }
                  : {borderRadius: "15px", "border-style": "solid",	"border-color": "#e67088"}
              }
              onClick={() => handleFilter("Hindi", "")}
            >
              Hindi
            </button>
            <button
              style={
                filterLanguage.includes("English")
                  ? { background: "#e67088", color: "white", borderRadius: "15px" }
                  : {borderRadius: "15px", "border-style": "solid",	"border-color": "#e67088"}
              }
              onClick={() => handleFilter("English", "")}
            >
              English
            </button>
            <button
              style={
                filterLanguage.includes("Telugu")
                  ? { background: "#e67088", color: "white", borderRadius: "15px" }
                  : {borderRadius: "15px", "border-style": "solid",	"border-color": "#e67088"}
              }
              onClick={() => handleFilter("Telugu", "")}
            >
              Telugu
            </button>
            <button
              style={
                filterLanguage.includes("Tamil")
                  ? { background: "#e67088", color: "white", borderRadius: "15px" }
                  : {borderRadius: "15px", "border-style": "solid",	"border-color": "#e67088"}
              }
              onClick={() => handleFilter("Tamil", "")}
            >
              Tamil
            </button>
            <button
              style={
                filterLanguage.includes("Japanese")
                  ? { background: "#e67088", color: "white", borderRadius: "15px" }
                  : {borderRadius: "15px", "border-style": "solid",	"border-color": "#e67088"}
              }
              onClick={() => handleFilter("Japanese", "")}
            >
              Japanese
            </button>
            <button
              style={
                filterLanguage.includes("Malyalam")
                  ? { background: "#e67088", color: "white", borderRadius: "15px" }
                  : {borderRadius: "15px", "border-style": "solid",	"border-color": "#e67088"}
              }
              onClick={() => handleFilter("Malyalam", "")}
            >
              Malyalam
            </button>
            <button
              style={
                filterLanguage.includes("Punjabi")
                  ? { background: "#e67088", color: "white", borderRadius: "15px" }
                  : {borderRadius: "15px", "border-style": "solid",	"border-color": "#e67088"}
              }
              onClick={() => handleFilter("Punjabi", "")}
            >
              Punjabi
            </button>
          </div>
        </div>

        <div style={{"border-radius": "30px",	"border-width": "2px",	"border-style": "solid",	"border-color": "fuchsia", "marginTop": "30px"}}>
          <div className={styles.header}>
            <div onClick={() => SetGenre(!genre)}>
              <span
                style={{
                  marginLeft: "10px",
                  color: "#e67088",
                  fontSize: "25px"
                }}
              >
                Genre
              </span>
            </div>
            <div onClick={() => handleClear("genre")} style={{fontSize: "15px"}}>Clear</div>
          </div>
          <div
            className={styles.dialogue}
          >
            <button
              style={
                filterGenre.includes("Action")
                  ? { background: "#e67088", color: "white", borderRadius: "15px" }
                  : {borderRadius: "15px", "border-style": "solid",	"border-color": "#e67088"}
              }
              onClick={() => handleFilter("", "Action")}
            >
              Action
            </button>
            <button
              style={
                filterGenre.includes("Drama")
                  ? { background: "#e67088", color: "white", borderRadius: "15px" }
                  : {borderRadius: "15px", "border-style": "solid",	"border-color": "#e67088"}
              }
              onClick={() => handleFilter("", "Drama")}
            >
              Drama
            </button>
            <button
              style={
                filterGenre.includes("Triller")
                  ? { background: "#e67088", color: "white", borderRadius: "15px" }
                  : {borderRadius: "15px", "border-style": "solid",	"border-color": "#e67088"}
              }
              onClick={() => handleFilter("", "Triller")}
            >
              Thriller
            </button>
            <button
              style={
                filterGenre.includes("Comedy")
                  ? { background: "#e67088", color: "white", borderRadius: "15px" }
                  : {borderRadius: "15px", "border-style": "solid",	"border-color": "#e67088"}
              }
              onClick={() => handleFilter("", "Comedy")}
            >
              Comedy
            </button>
            <button
              style={
                filterGenre.includes("Adventure")
                  ? { background: "#e67088", color: "white", borderRadius: "15px" }
                  : {borderRadius: "15px", "border-style": "solid",	"border-color": "#e67088"}
              }
              onClick={() => handleFilter("", "Adventure")}
            >
              Adventure
            </button>
            <button
              style={
                filterGenre.includes("Family")
                  ? { background: "#e67088", color: "white", borderRadius: "15px" }
                  : {borderRadius: "15px", "border-style": "solid",	"border-color": "#e67088"}
              }
              onClick={() => handleFilter("", "Family")}
            >
              Family
            </button>
            <button
              style={
                filterGenre.includes("Fantasy")
                  ? { background: "#e67088", color: "white", borderRadius: "15px" }
                  : {borderRadius: "15px", "border-style": "solid",	"border-color": "#e67088"}
              }
              onClick={() => handleFilter("", "Fantasy")}
            >
              Fantasy
            </button>
          </div>
        </div>
      </div>

      <div>
        
        <h2
          style={{
            background: "none",
            fontSize: "30px",
            fontWeight: "700",
            marginLeft: "30px",
            color: "white"
          }}
        >
          All Events 
        </h2>
        <div className={styles.appliedFilter}>
          {[...filterLanguage, ...filterGenre].map((item) => (
            <div>{item}</div>
          ))}
        </div>
        <div className={styles.mainCards}>
            {displayItems}
        </div>
        <br/><br/>
        <center>
        <ReactPaginate  
             previousLabel={'<'}
             nextLabel={'>'}
             pageCount={PageCount}
             onPageChange={changePage}
             pageClassName={"hehehehe"}
             nextClassName={"nexthehe"}
             previousClassName={"prevhehe"}
             containerClassName={"paginationBttns"}
             previousLinkClassName={"previousBttn"}
             nextLinkClassName={"nextBttn"}
             disabledClassName={"paginationDisabled"}
             activeClassName={"paginationActive"}/>
        </center>
      </div>
      
    </div>
  );
};

export default SeeAll;
