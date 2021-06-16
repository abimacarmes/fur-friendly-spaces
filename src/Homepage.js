import React, { Component } from 'react'
//import {Route, Link, BrowserRouter} from 'react-router-dom';
import FurFriendlyContext from './FurFriendlyContext'

export default class Homepage extends Component {
    static contextType = FurFriendlyContext;

    render() {
        const cities = [...new Set(this.context.spaces.map(space => space.city))]
        cities.unshift('All')
        
        const citiesFilter = [...new Set(cities)]

        return (
            <div className="homepage">
                <h1>Fur Friendly Spaces</h1>
                <h3>I'm not going unless my dog can come with me!</h3>
                <p>Fur Friendly Spaces aims to combine exploring all your city has to offer with quality time with your puppy!</p>
                <p>Whether you're visiting a new city or just trying to find a nice patio where you can both enjoy some time in the sun.</p>
                <p>Fur Friendly Spaces allows dog-lovers to find and submit places they've found that are dog friendly.</p>
                <p>If you visit one of the recommended spaces, feel free to give it a vote based on your experience with your pup! This just makes it easier for everyone to make sure wherever they go, their four-legged friend can too.</p>

                <h3>Browse the available cities below:</h3>
                {citiesFilter.map(city => (
                    <button key={city}
                        onClick={() => {
                            this.context.updateFilterCity(city);
                            this.props.history.push('/spaces');
                        }}
                        >{city}
                    </button>
                ))}
            </div>
        )
    }
}

