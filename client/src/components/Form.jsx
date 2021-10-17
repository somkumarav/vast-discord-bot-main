import { useState, useRef } from "react";
import {
	AiOutlineUser,
	AiOutlineNumber,
	AiOutlineMail,
	AiOutlinePhone,
	AiOutlineLock,
	AiOutlineClose,
	AiOutlineCheck,
} from "react-icons/ai";

const Form = ({ toaster }) => {
	const [verification, setVerification] = useState(false);
	const [success, setSuccess] = useState(false);

	const nameRef = useRef();
	const admRef = useRef();
	const emailRef = useRef();
	const phoneRef = useRef();
	const otpRef = useRef();

	const discordid = new URLSearchParams(window.location.search).get(
		"discordid"
	);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const user = {
			email: emailRef.current.value,
			admissionNumber: admRef.current.value,
		};

		await fetch("https://api.vastdiscord.ml/add", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.type === "Ok") {
					setVerification(true);
				} else {
					toaster(data.type, data.msg);
				}
			});
	};

	const handleBack = () => {
		setVerification(false);
	};

	const handleVerification = async (e) => {
		e.preventDefault();
		const user = {
			discordId: discordid,
			name: nameRef.current.value,
			email: emailRef.current.value,
			admissionNumber: admRef.current.value,
			department: admRef.current.value.substring(6, 8),
			otp: parseInt(otpRef.current.value),
		};
		await fetch("https://api.vastdiscord.ml/verify", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.type === "Ok") {
					setSuccess(true);
				} else {
					toaster(data.type, data.msg);
				}
			});
	};

	const handleOtpResend = async (e) => {
		e.preventDefault();
		const user = {
			email: emailRef.current.value,
			admissionNumber: admRef.current.value,
		};
		await fetch("https://api.vastdiscord.ml/regen", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.type === "Ok") {
					toaster(data.type, data.msg);
				}
			});
	};

	return (
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
									ref={otpRef}
									required
								/>
								<AiOutlineLock className="icon" />
								<label htmlFor="otp">OTP</label>
								<i className="bar"></i>
							</span>
							<p className="otp-resend">
								Didn't get the OTP?{" "}
								<button class="link-button" onClick={handleOtpResend}>
									Resend it
								</button>
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
	);
};

export default Form;
