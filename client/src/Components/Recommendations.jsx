import React, { useState } from 'react'
import axios from 'axios'

const Recommendations = ({ Base_URL }) => {
    document.title = 'Recommendations | EcoBrowse'

    const [url, setUrl] = useState('')
    const [category, setCategory] = useState('')
    const [recommendations, setRecommendations] = useState([])

    const getRecommendations = () => {
        if (url === '') {
            alert('Please enter a URL')
            return
        }
        setCategory('')
        setRecommendations([])
        const data = new FormData()
        data.append('url', url)

        alert('Getting Recommendations ...')

        axios.post(`${Base_URL}/get_recommendations`, data)
            .then(res => {
                if (res.data["category"] === 'Adult' || res.data["websites"].length === 0) {
                    alert('No recommendations found for this website')
                    return
                }
                setCategory("Category : " + res.data["category"])
                setRecommendations(res.data["websites"])
            })
            .catch(err => console.log(err))
    }


    return (
        <>
            <div className="input-group mb-3 title">
                <input type="text" className="form-control border border-primary" placeholder="Enter Website URL" value={url} onChange={(e) => setUrl(e.target.value)} />
                <button className="btn btn-outline-dark" type="button" id="button-addon2" onClick={getRecommendations}>Get Recommendations</button>
            </div>

            <h3 className='mb-2' id="category">{category}</h3>

            <hr />

            <table className="table table-hover">
                <thead className='table-primary'>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Website Domain</th>
                        <th scope="col">Overall Emission</th>
                    </tr>
                </thead>
                <tbody>
                    {recommendations.map((website, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <th scope="row">{website.Domain}</th>
                            <th scope="row">{website.Overall_Emission}</th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Recommendations