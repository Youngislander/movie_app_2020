import React from "react";
import {HashRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Home from "Routes/Home";
import TV from "Routes/TV";
import Search from "Routes/Search";
import Header from "Components/Header"
import Detail from "Routes/Detail"

export default () => (
    <Router>
        <>
        <Header />
        <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/tv" exact component={TV} />
        <Route path="/search" component={Search} />
        <Route path="/movie/:id" component={Detail} />
        <Route path="/tv/:id" component={Detail} />
        </Switch>
        </>
    </Router>
)