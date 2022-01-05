import React from "react";
import { Switch, Route } from "react-router-dom";
import MoviePage from "../Pages/moviePage/MoviePage";
import { HomePage } from "../Pages/HomePage";
import SeeAll from "../Pages/SeeAll";
import { BookTicketsPage } from "../Pages/BookTicketsPage";
import AdminPage from "../Pages/AdminPage";
import UserPage from "../Pages/UserPage";
import ContactPage from "../Pages/ContactPage";
import AboutPage from "../Pages/AboutPage";
import AllMoviesPage from "../Pages/AllMoviesPage";
import { BookingHistory } from "../Components/BookingHistory";
import FirstSection from "../Components/PaymentsPage/FirstSection";
import styles from "../Components/Styling/PaymentsPage.module.css";
import SecondSection from "../Components/PaymentsPage/SecondSection";
import CreateEvent from "../Components/CreateEvent";
import ModifyEvent from "../Components/ModifyEvent";
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
        <Route exact path="/allmovies">
          <AllMoviesPage />
        </Route>
        <Route exact path="/events/:id">
          <MoviePage></MoviePage>
        </Route>
        <Route exact path="/modifyevents/:id">
          <ModifyEvent></ModifyEvent>
        </Route>
        <Route exact path="/admin/:id">
          <AdminPage></AdminPage>
        </Route>
        <Route exact path="/user/:id">
          <UserPage></UserPage>
        </Route>
        <Route exact path="/create">
          <CreateEvent />
        </Route>
        <Route exact path="/contact">
          <ContactPage />
        </Route>
        <Route exact path="/user/booking-history">
          <BookingHistory />
          <FirstSection />
          <SecondSection />
        </Route>
        <Route exact path="/booktickets/:id">
          <BookTicketsPage></BookTicketsPage>
        </Route>
        <Route>
          <div>404. Page not found</div>
        </Route>
      </Switch>
    </div>
  );
};

export default Router;
