import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MovieCarousel } from "./HomePage/MovieCarousel";
import styles from "./Styling/RecommendedMovies.module.css";
import { RiArrowRightSLine } from "react-icons/ri";
import userdata from '../scraped_data/users.json';

export const BookedEvents = () => {
    const events_data = useSelector(state => state.app.movies_data);
    const user_events = userdata.users.filter(ele => ele.id == 1)[0].booked_events;

    const filteredBookedEvents = events_data.filter(event => (
        user_events.includes(event.id)
    ))
    return (
        <div className={styles.parent}>
            <div className={styles.parent__text}>
                <h1>Booked Events</h1>
            </div>
            <MovieCarousel movies={filteredBookedEvents} />
        </div>
    )
}