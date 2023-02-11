import React, { useState, useEffect } from 'react'

const EcoFriendlyWebsites = () => {
    document.title = 'Eco Friendly Websites | EcoBrowse'

    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('All')

    useEffect(() => {
        setCategories(['All', 'Shopping', 'News', 'Social Media', 'Entertainment', 'Education', 'Others'])
    }, [])

    return (
        <>
            <h1 className='title'><u>Eco Friendly Websites</u></h1>
            <div className="row justify-content-between">
                <h3 className='col-4'>Category : {selectedCategory}</h3>
                <div className="dropdown col-4">
                    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Select Website Category
                    </button>
                    <ul className="dropdown-menu">
                        {categories.map((category, index) => (
                            <li key={index}><a class="dropdown-item" onClick={() => setSelectedCategory(category)}>{category}</a></li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default EcoFriendlyWebsites