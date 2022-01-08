import React from "react";
import { useSelector } from "react-redux";
import { EventCarousel } from "./EventCarousel";
import styles from "../Styling/RecommendedEvents.module.css";
import db from "../../database/db.json"

export const RecommendedEvents = () => {
    const events_data = db.events;
    const filteredRecommendedEvents = events_data.filter(moive => (
        !moive.is_premier
    ))
    console.log(events_data);
    return (
        <div className={styles.parent}>
            <div className={styles.parent__text}>
                <h1>Recommended Events</h1>
            </div>
            <EventCarousel events={filteredRecommendedEvents} />
        </div>
    )
}