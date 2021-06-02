import React, { Component } from 'react'
//import {Route, Link, BrowserRouter} from 'react-router-dom';
import FurFriendlyContext from './FurFriendlyContext'

import SpaceContainer from './SpaceContainer';
import Space from './Space';


export default class Filter extends Component {
    static contextType = FurFriendlyContext;

    constructor (props){
        super(props);
        this.filterType = React.createRef();
        this.filterCity = React.createRef();
    }

    //need function for up/down voting
    filterResults = event => {
        event.preventDefault();

        this.context.updateFilterType(this.filterType.current.value)
        this.context.updateFilterCity(this.filterCity.current.value)
    }

    render() {
        const cities = [...new Set(this.context.spaces.map(space => space.city))]

        return (
            <div className="filter">
                <form onSubmit={this.filterResults}>
                    <label>Filter By Location Type: </label>
                    <select ref={this.filterType}>
                        <option value='All'>All</option>
                        {this.context.types.map(type => (
                            <option value={type}>{type}</option>
                        ))}
                    </select>
                    <label>Filter By City: </label>
                    <select ref={this.filterCity}>
                        <option value='All'>All</option>
                        {cities.map(city => (
                            <option value={city}>{city}</option>
                        ))}
                    </select>
                    <button type='submit'>Submit</button>
                </form>
                
            </div>
        )
    }
}

/*
Note.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            noteId: PropTypes.string.isRequired,
            history: PropTypes.object
        })
    }) 
}
*/

