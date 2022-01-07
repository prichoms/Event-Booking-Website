import React from "react";
import { Ticket } from "./Ticket";
import styles from "./Styling/Ticket.module.css";
import db from "../scraped_data/db.json"

export const BookingHistory = () => {
    const booking_data = db.booking;
    booking_data.sort((a, b) => {
        if (a.date === b.date) {
            const aShowTime = a.time.split(":").map(Number).shift();
            const bShowTime = b.time.split(":").map(Number).shift();
            if (aShowTime > bShowTime) {
                return 1
            }
            return -1
        }
        return a.date - b.date;
    })
    const previous_booking = booking_data?.filter(item => (
        item.date < new Date().getDate()
    ))
    return (
        <div className={styles.container} >
            <div>
                <h1>BOOKING DETAILS</h1>
                <div className={styles.ticket__container}>
                    {
                        booking_data?.map(item => {
                            return item.date >= new Date().getDate() && <Ticket key={item.id} {...item} />
                        })
                    }
                </div>
            </div>
            { previous_booking.length > 0 && <div>
                <h1>Previous Bookings</h1>
                <div className={styles.ticket__container}>
                    {
                        previous_booking?.map(item => {
                            return <Ticket key={item.id} {...item} />
                        })
                    }
                </div>
            </div>}
        </div>
    )
}