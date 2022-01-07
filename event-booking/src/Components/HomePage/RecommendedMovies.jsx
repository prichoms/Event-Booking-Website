import React from "react";
import { useSelector } from "react-redux";
import { MovieCarousel } from "./MovieCarousel";
import styles from "../Styling/RecommendedMovies.module.css";

export const RecommendedMovies = () => {
    const movies_data = useSelector(state => state.app.movies_data);
    const filteredRecommendedMovies = movies_data.filter(moive => (
        !moive.is_premier
    ))
    return (
        <div className={styles.parent}>
            <div className={styles.parent__text}>
                <h1>Recommended Events</h1>
            </div>
            <MovieCarousel movies={filteredRecommendedMovies} />
        </div>
    )
}