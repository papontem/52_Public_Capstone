import {
	Dice6,
	DoorOpenFill,
	StarHalf,
	BoxArrowInRight,
	HouseFill,
} from "react-bootstrap-icons";
import "./NavBar.css";

import { NavLink } from "react-router-dom";

function NavBar() {
	return (
		<nav className="NavBar">
			<NavLink to="/" >
				Home
				<HouseFill color="royalblue" />
			</NavLink>
			<NavLink to="/signIn" >
				<DoorOpenFill color="royalblue" />
				Sign In
				<BoxArrowInRight color="royalblue" />
			</NavLink>
			<NavLink to="/favorites" >
				Favorites
				<StarHalf color="royalblue" />
			</NavLink>
			<NavLink to="/random" >
				Random Facts
				<Dice6 color="royalblue" />
			</NavLink>
		</nav>
	);
}

export default NavBar;

/**
 * 

react router v6 doesn't support exact anymore.

// old - v5 <Route exact path="/" component={Home} />

// new - v6 <Route path="/" element={<Home />} />

As stated in their documentation:

    You don't need to use an exact prop on <Route path="/"> anymore. This is because all paths match exactly by default. If you want to match more of the URL because you have child routes use a trailing * as in <Route path="users/*">.


 */