import React from "react";
import './Router.css';
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import AboutPage from "../Pages/AboutPage";


function Router() {
    return (
        <div className="navbar">
            <BrowserRouter>
                <Link to="/about">About</Link>
                <Link to="/">Home</Link>
                <Switch>
                    <Route exact path="/" ><HomePage/></Route>
                </Switch>
                <Switch>
                    <Route exact path="/about"><AboutPage/></Route>
                </Switch>


            </BrowserRouter>
        </div>

    );
};
export default Router;