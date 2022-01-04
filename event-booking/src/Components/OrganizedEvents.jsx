import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MovieCarousel } from "./HomePage/MovieCarousel";
import styles from "./Styling/RecommendedMovies.module.css";
import { RiArrowRightSLine } from "react-icons/ri";
import userdata from '../scraped_data/users.json';

export const OrganizedEvents = () => {
    const events_data = useSelector(state => state.app.movies_data);
    const user_events = userdata.organizers.filter(ele => ele.id == 1)[0].organized_events;

    const filteredPastEvents = events_data.filter(event => (
        user_events.includes(event.id) && !event.is_premier
    ))
    const filteredUpcomingEvents = events_data.filter(event => (
        user_events.includes(event.id) && event.is_premier
    ))
    return (
        <>
            <div className={styles.parent}>
                <div className={styles.parent__text}>
                    <h1>Upcoming Events</h1>
                </div>
                <MovieCarousel movies={filteredUpcomingEvents} />
            </div>
            <div className={styles.parent}>
            <div className={styles.parent__text}>
                <h1>Past Events</h1>
            </div>
            <MovieCarousel movies={filteredPastEvents} />
        </div>
        </>
    )
}