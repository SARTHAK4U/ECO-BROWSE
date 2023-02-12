import React, { useState, useEffect } from 'react'
import axios from 'axios'

const EcoFriendlyWebsites = ({ Base_URL }) => {
    document.title = 'Eco Friendly Websites | EcoBrowse'

    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('')
    const [websites, setWebsites] = useState([])

    useEffect(() => {
        axios.get(`${Base_URL}/get_website_categories`)
            .then(res => setCategories(res.data["categories"]))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        // Fetch data from API
        const data = new FormData()
        data.append('category', selectedCategory)
        axios.post(`${Base_URL}/get_eco_websites`, data)
            .then(res => setWebsites(res.data["websites"]))
            .catch(err => console.log(err))
    }, [selectedCategory])

    return (
        <>
            <h1 className='title'><u>Eco Friendly Websites</u></h1>
            <div className="row justify-content-between mt-4">
                <h3 className='col-4'>Category : {selectedCategory}</h3>
                <div className="dropdown col-4">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Select Website Category
                    </button>
                    <ul className="dropdown-menu">
                        {categories.map((category, index) => (
                            <li key={index}><a className="dropdown-item" onClick={() => setSelectedCategory(category)}>{category}</a></li>
                        ))}
                    </ul>
                </div>
            </div>
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
                    {websites.map((website, index) => (
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

export default EcoFriendlyWebsites