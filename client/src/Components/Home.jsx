import React from 'react'
import Illustration from '../assets/Illustration_Home.png'

const Home = () => {
	document.title = "Home | EcoBrowse"
	return (
		<>
			<h1 className='title'><u>Welcome to EcoBrowse</u></h1>
			<div className='row mt-5'>
				<div className='col'>
					<img src={Illustration} alt='Illustration' className='img-fluid' width="80%" />
				</div>
				<div className='col main'>
					<div className="card" style={{ width: "60vh" }}>
						<div className="card-header"> Guide </div>
						<ul className="list-group list-group-flush text-start">
							<li className="list-group-item"><b>My Activity</b> : Show User Activity</li>
							<li className="list-group-item"><b>Eco Friendly Websites</b> : For Each Category of Websites, Show Top Websites that produce low carbon emissions.</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	)
}

export default Home