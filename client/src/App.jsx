import "./App.scss";
import Form from "./components/Form";
import vastLogo from "./resources/vast.gif";
import discordLogo from "./resources/discord.svg";
import toast, { Toaster } from "react-hot-toast";

const App = () => {
	const notify = (type, message) => {
		console.log("Hi there");
		switch (type) {
			case "Ok":
				toast.success(message);
				break;
			case "Error":
				toast.error(message);
				break;
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
			<Form toaster={notify} />
			<Toaster />
		</div>
	);
};

export default App;
