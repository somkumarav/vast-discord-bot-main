import { useState } from "react";
import "./App.scss";
import vastLogo from "./resources/vast.gif";
import discordLogo from "./resources/discord.svg";
import {
	AiOutlineUser,
	AiOutlineNumber,
	AiOutlineMail,
	AiOutlinePhone,
} from "react-icons/ai";

const App = () => {
	const [values, setValues] = useState({ email: "", rollNumber: "" });

	const handleSubmit = (e) => {
		e.preventDefault();
		if (values.email.includes("vidyaacademy.ac.in")) {
			console.log("successful");
		} else {
			console.log("unsuccessful");
		}
	};

	return (
		<div className="app">
			<header>
				<h1>Hop On</h1>
				<h2>VAST Discord Community</h2>
				<div className="icons">
					<span className="icon-cirlce">
						<img src={vastLogo} alt="VAST Logo" />
					</span>
					<span className="icon-cirlce">
						<img src={discordLogo} alt="Discord Logo" />
					</span>
				</div>
			</header>
			<div className="form-container">
				<h3>Details Please</h3>
				<form action="">
					<span className="form-field">
						<input type="text" name="name" id="" required />
						<AiOutlineUser className="icon" />
						<label htmlFor="name">Name</label>
						<i className="bar"></i>
					</span>
					<span className="form-field">
						<input type="text" name="admission" id="" required />
						<AiOutlineNumber className="icon" />
						<label htmlFor="admission">Admission Number</label>
						<i className="bar"></i>
					</span>
					<span className="form-field">
						<input type="email" name="email" id="" required />
						<AiOutlineMail className="icon" />
						<label htmlFor="email">College Email ID</label>
						<i className="bar"></i>
					</span>
					<span className="form-field">
						<input type="tel" name="phone" id="" required />
						<AiOutlinePhone className="icon" />
						<label htmlFor="phone">Phone Number</label>
						<i className="bar"></i>
					</span>
					<button type="submit">Proceed</button>
				</form>
			</div>
		</div>
	);
};

export default App;
