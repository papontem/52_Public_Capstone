import { Github, Linkedin, Wikipedia } from "react-bootstrap-icons";
import logo from "../logo.svg";
// import pam_logo from "./pam_logo.svg";
import wiki_logo from "../wiki_logo.svg";
import wiki_logo2 from "../Wikipedia-logo-v2.svg.png";
import "./Footer.css";

function Footer() {
	return (
		<footer id="My_Footer">
			<section className="Footer_Content">
				<div className="Footer_Content_PAM_creds">
					{/* <img src={pam_logo} className="App-logo" alt="logo" /> */}
					<p>&copy; Phedias A.M. | All Rights Reserved</p>
					{/* PAM'S Socials */}
					<div>
						<a href="https://github.com/papontem">
							<Github color="royalblue" />
							GitHub
						</a>
						&nbsp;
						<a href="https://www.linkedin.com/in/papontem/">
							<Linkedin color="royalblue" />
							LinkedIn
						</a>
					</div>
					{/* PAM'S Socials End */}
				</div>
				<div className="Footer_Content_Wiki_creds">
					{/* <img
						src="https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/206px-Wikipedia-logo-v2.svg.png?20111003033239"
						className="App-wiki-logo"
						alt="wiki-logo"
					/> */}
					<img src={wiki_logo2} className="App-wiki-logo" alt="wiki-logo" />
					<div>
						<a className="App-link" href="https://www.wikipedia.org/">
							<Wikipedia color="royalblue" />
							Go to Wikipedia
						</a>
					</div>
					<br />
					<img src={wiki_logo} className="App-wiki-logo" alt="wiki-logo" />
					<div>
						<a className="App-link" href="https://wikimediafoundation.org/">
							Go to Wikimedia
						</a>
					</div>
					<br />
					<div>
						<a
							className="App-link"
							href="https://api.wikimedia.org/wiki/Feed_API/Reference/On_this_day">
							Take a Look at the "On This Day" endpoint for their Feed API
						</a>
					</div>
				</div>
				<div className="Footer_Content_React_creds">
					<img src={logo} className="App-logo" alt="logo" />
					<div>
						<a
							className="App-link"
							href="https://reactjs.org"
							rel="noopener noreferrer">
							Learn React
						</a>
					</div>
				</div>
			</section>
		</footer>
	);
}

export default Footer;
