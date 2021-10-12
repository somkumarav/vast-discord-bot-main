import { useState, useRef } from "react";
import "./App.scss";
import vastLogo from "./resources/vast.gif";
import discordLogo from "./resources/discord.svg";
import {
	AiOutlineUser,
	AiOutlineNumber,
	AiOutlineMail,
	AiOutlinePhone,
	AiOutlineLock,
	AiOutlineClose,
	AiOutlineCheck,
} from "react-icons/ai";

const App = () => {
	const [values, setValues] = useState({ email: "", rollNumber: "" });
	const [verification, setVerification] = useState(false);
	const [success, setSuccess] = useState(false);

	const nameRef = useRef();
	const admRef = useRef();
	const emailRef = useRef();
	const phoneRef = useRef();

	const discordid = new URLSearchParams(window.location.search).get(
		"discordid"
	);

	const handleSubmit = (e) => {
		e.preventDefault();
		setVerification(true);
		if (values.email.includes("vidyaacademy.ac.in")) {
			console.log("successful");
		} else {
			console.log("unsuccessful");
		}
	};

	const handleBack = () => {
		setVerification(false);
	};

	const handleVerification = (e) => {
		e.preventDefault();
		setSuccess(true);
	};

	const handleOtpResend = (e) => {
		e.preventDefault();
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
				{discordid ? (
					<>
						<span className="form-heading">
							<h3>Your Details</h3>
							<p>Tell us about yourself</p>
						</span>
						<form onSubmit={handleSubmit}>
							<span className="form-field">
								<input
									type="text"
									name="name"
									ref={nameRef}
									placeholder=" "
									required
								/>
								<AiOutlineUser className="icon" />
								<label htmlFor="name">Name</label>
								<i className="bar"></i>
							</span>
							<span className="form-field">
								<input
									type="text"
									name="admission"
									ref={admRef}
									placeholder=" "
									required
								/>
								<AiOutlineNumber className="icon" />
								<label htmlFor="admission">Admission Number</label>
								<i className="bar"></i>
							</span>
							<span className="form-field">
								<input
									type="email"
									name="email"
									ref={emailRef}
									pattern="[\w.%+-]+@vidyaacademy\.ac.in"
									placeholder=" "
									required
								/>
								<AiOutlineMail className="icon" />
								<label htmlFor="email">College Email ID</label>
								<i className="bar"></i>
							</span>
							<span className="form-field">
								<input
									type="tel"
									pattern="^[0-9 +]+$"
									name="phone"
									ref={phoneRef}
									placeholder=" "
									required
								/>
								<AiOutlinePhone className="icon" />
								<label htmlFor="phone">Phone Number</label>
								<i className="bar"></i>
							</span>
							<button type="submit">Proceed</button>
						</form>
						<div className={`verification ${verification ? "visible" : ""}`}>
							<button className="close" onClick={handleBack}>
								<AiOutlineClose />
							</button>
							<span className="form-heading">
								<h3>Verification</h3>
								<p>
									Let us see who you really are. Check your college mail for an
									OTP.
								</p>
							</span>
							<form onSubmit={handleVerification}>
								<span className="form-field">
									<input
										type="text"
										name="otp"
										id=""
										placeholder=" "
										required
									/>
									<AiOutlineLock className="icon" />
									<label htmlFor="otp">OTP</label>
									<i className="bar"></i>
								</span>
								<p className="otp-resend">
									Didn't get the OTP? <a onClick={handleOtpResend}>Resend it</a>
								</p>
								<button type="submit">Finish Up!</button>
							</form>
						</div>
						<div className={`success ${success ? "visible" : ""}`}>
							<span className="tick">
								<AiOutlineCheck />
							</span>
							<h4>Success! Head over to Discord.</h4>
						</div>
					</>
				) : (
					<div className="link-warning">
						<h4>Please use the link sent to you by our trusty bot!</h4>
					</div>
				)}
			</div>
		</div>
	);
};

export default App;
