import React, { useState, useEffect } from 'react'

import Info from "../assets/info.svg"

const UserActivity = () => {
	document.title = 'My Activity | EcoBrowse'

	// Key : Website Domain, Value : Website Data
	const [websites, setWebsites] = useState({})
	const [showSessions, setShowSessions] = useState({})

	useEffect(() => {
		setWebsites({
			'google.com': {
				'Average Emission': 0,
				'Overall Emission': 0,
				'Sessions': [
					{
						'Time': '12:00:00',
						'Emission': 0,
						'Path': 'https://www.google.com/search?q=hello+world'
					},
					{
						'Time': '12:00:00',
						'Emission': 0,
						'Path': 'https://www.google.com/search?q=hello+world'
					},
				]
			},
			'facebook.com': {
				'Average Emission': 0,
				'Overall Emission': 0,
				'Sessions': [
					{
						'Time': '12:00:00',
						'Emission': 0,
						'Path': 'https://www.google.com/search?q=hello+world'
					},
				]
			},
		})
	}, [])

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
			<table className='table title'>
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
								<td>{website}</td>
								<td>{websites[website]['Average Emission']}</td>
								<td>{websites[website]['Overall Emission']}</td>
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
												</tr>
											</thead>
											<tbody className='table-group-divider'>
												{websites[website]['Sessions'].map((session, sindex) => (
													<tr key={sindex}>
														<td>{session['Time']}</td>
														<td>{session['Path']}</td>
														<td>{session['Emission']}</td>
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