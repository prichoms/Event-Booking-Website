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
      const updated = movie.filter(
        (item) =>
          item.genre?.find((gen) =>
            gen.genre === filterGenre[filterGenre.length - 1]
              ? gen.genre
              : genre
          ).genre === filterGenre[filterGenre.length - 1]
      );
      setMovie(updated);
    }
    if ( filterLanguage.length === 0 && filterGenre.length === 0) {
      setMovie(movies_data);
    }
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
        setFilterLanguage([...filterLanguage, language]);
      }
    } else {
      const index = filterGenre.indexOf(genre);
      if (index !== -1) {
        filterGenre.splice(index, 1);
      } else {
        setFilterGenre([...filterGenre, genre]);
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
  const displayItems=movie.slice(pagesVisited, pagesVisited+itemsPerPage).map((item) => <CardSeeAll {...item} />)

  const PageCount = Math.ceil(items.length / itemsPerPage);
  const changePage = ({selected})=>{
      setPageNumber(selected);
  };
  return (
    <div className={styles.container}>
      
      <div className={styles.leftsideNav}>
        <h2 style={{ background: "none", fontSize: "25px", fontWeight: "700" }}>
          Filters
        </h2>
        <div>
          <div className={styles.header}>
            <div onClick={() => SetLanguage(!language)}>
              <span
                style={{
                  marginLeft: "10px",
                  color: `${!language ? "black" : "#e67088"}`,
                }}
              >
                Languages
              </span>
            </div>
            <div onClick={() => handleClear("languages")}>Clear</div>
          </div>
          <div
            className={styles.dialogue}
           
          >
            <button
              style={
                filterLanguage.includes("Hindi")
                  ? { background: "#e67088", color: "white" }
                  : {}
              }
              onClick={() => handleFilter("Hindi", "")}
            >
              Hindi
            </button>
            <button
              style={
                filterLanguage.includes("English")
                  ? { background: "#e67088", color: "white" }
                  : {}
              }
              onClick={() => handleFilter("English", "")}
            >
              English
            </button>
            <button
              style={
                filterLanguage.includes("Telugu")
                  ? { background: "#e67088", color: "white" }
                  : {}
              }
              onClick={() => handleFilter("Telugu", "")}
            >
              Telugu
            </button>
            <button
              style={
                filterLanguage.includes("Kannada")
                  ? { background: "#e67088", color: "white" }
                  : {}
              }
              onClick={() => handleFilter("Kannada", "")}
            >
              Kannada
            </button>
            <button
              style={
                filterLanguage.includes("Japaniese")
                  ? { background: "#e67088", color: "white" }
                  : {}
              }
              onClick={() => handleFilter("Japaniese", "")}
            >
              Japaniese
            </button>
            <button
              style={
                filterLanguage.includes("Mulyalam")
                  ? { background: "#e67088", color: "white" }
                  : {}
              }
              onClick={() => handleFilter("Mulyalam", "")}
            >
              Mulyalam
            </button>
            <button
              style={
                filterLanguage.includes("Punjabi")
                  ? { background: "#e67088", color: "white" }
                  : {}
              }
              onClick={() => handleFilter("Punjabi", "")}
            >
              Punjabi
            </button>
          </div>
        </div>

        <div>
          <div className={styles.header}>
            <div onClick={() => SetGenre(!genre)}>
              <span
                style={{
                  marginLeft: "10px",
                  color: `${!genre ? "black" : "#e67088"}`,
                }}
              >
                Genre
              </span>
            </div>
            <div onClick={() => handleClear("genre")}>Clear</div>
          </div>
          <div
            className={styles.dialogue}
          >
            <button
              style={
                filterGenre.includes("Action")
                  ? { background: "#e67088", color: "white" }
                  : {}
              }
              onClick={() => handleFilter("", "Action")}
            >
              Action
            </button>
            <button
              style={
                filterGenre.includes("Drama")
                  ? { background: "#e67088", color: "white" }
                  : {}
              }
              onClick={() => handleFilter("", "Drama")}
            >
              Drama
            </button>
            <button
              style={
                filterGenre.includes("Triller")
                  ? { background: "#e67088", color: "white" }
                  : {}
              }
              onClick={() => handleFilter("", "Triller")}
            >
              Thriller
            </button>
            <button
              style={
                filterGenre.includes("Comedy")
                  ? { background: "#e67088", color: "white" }
                  : {}
              }
              onClick={() => handleFilter("", "Comedy")}
            >
              Comedy
            </button>
            <button
              style={
                filterGenre.includes("Adventure")
                  ? { background: "#e67088", color: "white" }
                  : {}
              }
              onClick={() => handleFilter("", "Adventure")}
            >
              Adventure
            </button>
            <button
              style={
                filterGenre.includes("Family")
                  ? { background: "#e67088", color: "white" }
                  : {}
              }
              onClick={() => handleFilter("", "Family")}
            >
              Family
            </button>
            <button
              style={
                filterGenre.includes("Fantasy")
                  ? { background: "#e67088", color: "white" }
                  : {}
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
            fontSize: "25px",
            fontWeight: "700",
            marginLeft: "30px",
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
