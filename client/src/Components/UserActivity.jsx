import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Info from "../assets/info.svg"

const UserActivity = ({ Base_URL }) => {
	document.title = 'My Activity | EcoBrowse'

	// Key : Website Domain, Value : Website Data\
	const [userId, setUserId] = useState('')
	const [userData, setUserData] = useState({})
	const [websites, setWebsites] = useState({})
	const [showSessions, setShowSessions] = useState({})

	useEffect(() => {
		const Id = localStorage.getItem('EcoBrowse-Id')
		if (!Id) {
			alert('No User Id Found')
			return
		}
		setUserId(localStorage.getItem('EcoBrowse-Id'))
	}, [])

	useEffect(() => {
		if (userId) {
			const data = new FormData()
			data.append('user_id', userId)

			axios.post(`${Base_URL}/get_user`, data)
				.then(res => {
					console.log(res)
					setUserData(res.data)
					setWebsites(res.data['Website_Data'])
				})
				.catch(err => console.log(err))
		}
	}, [userId])

	useEffect(() => {
		// for index of websites, set showSessions to false
		const obj = {};
		Object.keys(websites).forEach((website, index) => {
			obj['session-' + index] = false;
		});
		setShowSessions(obj);
	}, [websites])

	const showSession = (id) => {
		setShowSessions({ ...showSessions, [id]: !showSessions[id] })
	}

	// Each Row in the table will show Website Name, Average Emission, Overall Emission
	// On click of the row, it will show the list of sessions
	return (
		<>
			<div className="row justify-content-between title">
				<h3 className='col-4'>Overall CO2e Emission : {userData['Overall_Emission']}</h3>
				<h3 className='col-4'>Total Packets Lost : {userData['Packets_Lost']}</h3>
			</div>
			<table className='table'>
				<thead>
					<tr className='table-info'>
						<th scope="col">#</th>
						<th scope="col">Website Domain</th>
						<th scope="col">Average Emission</th>
						<th scope="col">Overall Emission</th>
						<th scope="col">Sessions Info</th>
					</tr>
				</thead>
				<tbody>
					{Object.keys(websites).map((website, index) => (
						<>
							<tr className='table-warning' key={index} onClick={() => showSession("session-" + index)}>
								<th scope="row">{index + 1}</th>
								<td>{websites[website]['Domain']}</td>
								<td>{websites[website]['Average_Emission']}</td>
								<td>{websites[website]['Overall_Emission']}</td>
								<td>
									<a onClick={() => showSession("session-" + index)}>
										<img src={Info} alt="Info" />
									</a>
								</td>
							</tr>

							{showSessions['session-' + index] &&
								<tr key={'session-' + index}>
									<td colSpan="5" style={{ padding: "0" }}>
										<table className='table table-group-divider table-hover table-bordered'>
											<thead>
												<tr className='table'>
													<th scope="col">Time</th>
													<th scope="col">Path</th>
													<th scope="col">Emission</th>
													<th scope="col">Packets Lost</th>
												</tr>
											</thead>
											<tbody className='table-group-divider'>
												{websites[website]['Session_Data'].map((session, sindex) => (
													<tr key={sindex}>
														<td>{session['Time']}</td>
														<td>{session['Path']}</td>
														<td>{session['Emission']}</td>
														<td>{session['Packets_Lost']}</td>
													</tr>
												))}
											</tbody>
										</table>
									</td>
								</tr>
							}
						</>
					))}
				</tbody>
			</table>
		</>
	)
}

export default UserActivity