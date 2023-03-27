import React from 'react'
import { Navbar } from '../components'
import AddProperty from './AddProperty'
import Properties from './Properties'

const Home = () => {
    const isAdmin = localStorage.getItem('is_admin')
    console.log(isAdmin)
    return (
        <>
            <Navbar />
            {
                isAdmin === "true" ? (<AddProperty />) : (<Properties />)
            }
        </>
    )
}

export default Home