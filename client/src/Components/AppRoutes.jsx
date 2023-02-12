import React from 'react'
import { Routes, Route } from "react-router-dom";

import Home from './Home'
import UserActivity from './UserActivity';
import EcoFriendlyWebsites from './EcoFriendlyWebsites';
import Recommendations from './Recommendations';

const AppRoutes = ({ Base_URL }) => {
	return (
		<>
			<Routes>
				<Route path='/' element={<Home Base_URL={Base_URL} />} />
				<Route path='/my_activity' element={<UserActivity Base_URL={Base_URL} />} />
				<Route path='/eco_friendly_websites' element={<EcoFriendlyWebsites Base_URL={Base_URL} />} />
				<Route path='/recommendations' element={<Recommendations Base_URL={Base_URL} />} />
			</Routes>
		</>
	)
}

export default AppRoutes