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
	HouseFill,
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
				<BoxArrowInLeft color="royalblue" />
				Log In
				<DoorOpen color="royalblue" />
			</NavLink>

			<NavLink to="/signUp">
				<DoorOpenFill color="royalblue" />
				Sign Up
				<BoxArrowInRight color="royalblue" />
			</NavLink>

			<NavLink to="/facts">
				Facts
				<Star color="royalblue" />
			</NavLink>

			{user && (
				<NavLink to="/favorites">
					Favorites
					<StarHalf color="royalblue" />
				</NavLink>
			)}

			<NavLink to="/random">
				Random Facts
				<Dice6 color="royalblue" />
			</NavLink>
		</nav>
	);
}

/**
 * 

react router v6 doesn't support exact anymore.

// old - v5 <Route exact path="/" component={Home} />

// new - v6 <Route path="/" element={<Home />} />

As stated in their documentation:

    You don't need to use an exact prop on <Route path="/"> anymore. This is because all paths match exactly by default. If you want to match more of the URL because you have child routes use a trailing * as in <Route path="users/*">.


 */
