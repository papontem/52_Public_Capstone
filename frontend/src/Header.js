// react essential components
import React, { useContext } from "react";
import AppContext from "./AppContext";

import "./Header.css";
import { Cone, ConeStriped } from "react-bootstrap-icons";

function Header() {
	return (
		<header className="App-header">
			<h1>Today I Learned: On This Day</h1>
			<h5>
				<small>
					<ConeStriped />
					<Cone />
					Under Construction
					<Cone />
					<ConeStriped />
				</small>
			</h5>
		</header>
	);
}

export default Header;
