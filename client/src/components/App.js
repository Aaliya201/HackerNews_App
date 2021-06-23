import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Login from './Login';
import Register from './Register';
import FavoritePage from './Bookmarks';
import AppRouter from '../router/AppRouter';
import Auth from "../hoc/auth";


function App(){

		return (
				<Router>
					<div className="App">
					<Switch>
					  <Route exact path="/register" component={Auth(Register, null)} />
						<Route exact path="/login" component={Auth(Login, null)} />
						<Route exact path="/top" component={Auth(AppRouter, null)} />
						<Route exact path="/bookmarks" component={Auth(FavoritePage, null)} />
						<Redirect from="/" to="login" />
					</Switch>
					</div>
				</Router>
		);
}
export default App;
