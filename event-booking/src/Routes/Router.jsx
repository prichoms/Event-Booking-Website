import React from "react";
import { Switch, Route } from "react-router-dom";
import MoviePage from "../Pages/moviePage/MoviePage";
import { HomePage } from '../Pages/HomePage'
import SeeAll from "../Pages/SeeAll";
import { BookTicketsPage } from '../Pages/BookTicketsPage';
import AdminPage  from '../Pages/AdminPage';
import UserPage  from '../Pages/UserPage';
import ContactPage  from '../Pages/ContactPage';
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
                <Route exact path="/events/:id">
                    <MoviePage></MoviePage>
                </Route>
                <Route exact path="/admin">
                    <AdminPage />
                </Route>
                <Route exact path="/user">
                    <UserPage />
                </Route>
                <Route exact path="/contact">
                    <ContactPage />
                </Route>
                <Route>
                    <div>404. Page not found</div>
                </Route>
            </Switch>
        </div>
    );
};

export default Router;
