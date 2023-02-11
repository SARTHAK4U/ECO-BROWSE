import "./App.css";
import React from "react";

import AppRoutes from "./Components/AppRoutes";
import Navbar from "./Components/Navbar";

function App() {
	const Base_URL = 'http://localhost:5000';

	return (
		<div className='App container'>
			<Navbar />
			<AppRoutes Base_URL={Base_URL} />
		</div>
	);
}

export default App;
