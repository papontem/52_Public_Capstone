// react essential components
import React, { useContext, useEffect } from "react";
import AppContext from "./AppContext";

// react-router-dom essential components
import { NavLink, Link } from "react-router-dom";

// styling components
import "./NavBar.css";
import {
	Dice6,
	DoorOpen,
	DoorOpenFill,
	Star,
	StarHalf,
	Search,
	BoxArrowInRight,
	BoxArrowRight,
	BoxArrowInUp,
	HouseFill,
	HouseExclamation,
} from "react-bootstrap-icons";

export default function NavBar() {
	const { appInfo, api, user, token, logout } = useContext(AppContext);

	console.log("NavBar Component Context:", appInfo, api, user);
	const handleLogoffClick = () => {
		logout();
	};
	return (
		<nav className="NavBar">
			<h3>{appInfo}</h3>
			<NavLink to="/">
				Home
				<HouseFill color="royalblue" />
			</NavLink>
			<NavLink to="/logIn">
				<DoorOpen color="royalblue" />
				Log In
				<BoxArrowInRight color="royalblue" />
			</NavLink>

			<NavLink to="/signUp">
				<DoorOpenFill color="royalblue" />
				Sign Up
				<BoxArrowInUp color="royalblue" />
			</NavLink>

			<NavLink to="/facts">
				<Search color="royalblue" />
				Facts
				<Star color="royalblue" />
			</NavLink>

			{token && user && user.username !== "" && (
				<>
					<NavLink to="/favorites">
						<Search color="royalblue" />
						Favorites
						<StarHalf color="royalblue" />
					</NavLink>

					<NavLink to="/profile">
						Profile
						<HouseExclamation color="royalblue" />
					</NavLink>

					<Link to="/" onClick={handleLogoffClick}>
						Logout
						<BoxArrowRight color="royalblue" />
					</Link>
				</>
			)}

			<NavLink to="/random">
				Random Facts
				<Dice6 color="royalblue" />
			</NavLink>
		</nav>
	);
}
