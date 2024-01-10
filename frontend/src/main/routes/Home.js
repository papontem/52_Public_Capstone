// Home.js

import OnThisDay from "../OnThisDay.js";
import "./Home.css"

function Home(props) {
	return (
		<div className="Home">
			<h2>Home</h2>
			<p>Welcome to the Today I learned: On This Day React App!</p>
			<p>Below you will find the react component that will be running the show.</p>
			<OnThisDay />
		</div>
	);
}
export default Home;
