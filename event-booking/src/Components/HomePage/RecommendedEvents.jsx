import React from "react";
import { useSelector } from "react-redux";
import { EventCarousel } from "./EventCarousel";
import styles from "../Styling/RecommendedEvents.module.css";

export const RecommendedEvents = () => {
    const events_data = useSelector(state => state.app.events_data);
    const filteredRecommendedEvents = events_data.filter(moive => (
        !moive.is_premier
    ))
    return (
        <div className={styles.parent}>
            <div className={styles.parent__text}>
                <h1>Recommended Events</h1>
            </div>
            <EventCarousel events={filteredRecommendedEvents} />
        </div>
    )
}