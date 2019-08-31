import React from 'react';
import { NavLink } from 'react-router';
import { Link } from 'react-router-dom';

import { setAccessTokenUnplash } from '../unsplash/';
import { authenticationUrl } from '../unsplash/';

import "../styles/home.css";

class Home extends React.Component {

	handleClick() {
	    location.assign(authenticationUrl);
	}

	render() {
		const token = localStorage.getItem('token');

		return (
			<main className="home-page-block">
			<header>
				<nav className="nav-wrapper red lighten-1">
					<div className="container">
						<a className="brand-logo">Skillbox Unsplash App</a>
					</div>
				</nav>
				</header>
				<div className="btn-container">
					<div className="container">
						<div className="btn-center">
							<div className="row center">
								<div className="col s12 Authorization-text">Авторизация через Unsplash.com</div>
								<div>
								<button className="but_auth waves-effect waves-light btn-large" onClick={this.handleClick.bind(this)}>Authorization</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		)
	}
}

export default Home;
