// react essential components
import React, { useContext, useEffect } from "react";
import AppContext from "./AppContext";

// react-router-dom essential components
import { NavLink } from "react-router-dom";

// styling components
import "./NavBar.css";
import {
	Dice6,
	DoorOpen,
	DoorOpenFill,
	Star,
	StarHalf,
	BoxArrowInRight,
	BoxArrowInLeft,
	BoxArrowInUp,
	HouseFill,
	HouseExclamation,
} from "react-bootstrap-icons";

export default function NavBar() {
	const { appInfo, api, user } = useContext(AppContext);

	console.log("NavBar Component Context:", appInfo, api, user);

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
				Facts
				<Star color="royalblue" />
			</NavLink>

			{user && user.username !== "" && (
				<>
					<NavLink to="/favorites">
						Favorites
						<StarHalf color="royalblue" />
					</NavLink>

					<NavLink to="/profile">
						Profile
						<HouseExclamation color="royalblue" />
					</NavLink>
				</>
			)}

			<NavLink to="/random">
				Random Facts
				<Dice6 color="royalblue" />
			</NavLink>
		</nav>
	);
}
