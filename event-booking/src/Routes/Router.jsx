import React from "react";
import { Switch, Route } from "react-router-dom";
import MoviePage from "../Pages/moviePage/MoviePage";
import { HomePage } from '../Pages/HomePage'
import SeeAll from "../Pages/SeeAll";
import { BookTicketsPage } from '../Pages/BookTicketsPage';
import AdminPage  from '../Pages/AdminPage';
import UserPage  from '../Pages/UserPage';
import AboutPage  from '../Pages/AboutPage';
import { BookingHistory } from "../Components/BookingHistory";

const Router = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/">
                    <HomePage />
                </Route>
                <Route exact path="/about">
                    <AboutPage />
                </Route>
                <Route exact path="/ncr/movies">
                    <SeeAll />
                </Route>
                <Route exact path="/booktickets/:id">
                    <BookTicketsPage />
                </Route>
                <Route exact path="/movies/:id">
                    <MoviePage></MoviePage>
                </Route>
                <Route exact path="/profile/booking-history">
                    <BookingHistory />
                </Route>
                <Route exact path="/admin">
                    <AdminPage />
                </Route>
                <Route exact path="/user">
                    <UserPage />
                </Route>
                <Route>
                    <div>404. Page not found</div>
                </Route>
            </Switch>
        </div>
    );
};

export default Router;
