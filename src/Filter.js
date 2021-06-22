import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import FurFriendlyContext from './FurFriendlyContext'

export default class Filter extends Component {
    static contextType = FurFriendlyContext;

    constructor (props){
        super(props);
        this.filterType = React.createRef();
        this.filterCity = React.createRef();
    }

    //Upon submission of filter form
    filterResults = event => {
        event.preventDefault();

        this.context.updateFilterType(this.filterType.current.value)
        this.context.updateFilterCity(this.filterCity.current.value)
    }

    render() {
        //Add the "All" option and ensure no duplicates
        const cities =this.context.spaces.map(space => space.city)
        cities.unshift('All')
        
        const citiesFilter = [...new Set(cities)]

        //Add the "All" option and ensure no duplicates
        const types = this.context.types
        types.unshift('All')
        
        const typesFilter = [...new Set(types)]
        

        return (
            <div className="filter content">
                <form className="triple filterGroup" onSubmit={this.filterResults}>
                    <h4>Filter By</h4>
                    <label>Location Type: </label>
                    <select ref={this.filterType}>
                        {typesFilter.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                    <label>City: </label>
                    <select ref={this.filterCity}>
                        {citiesFilter.map(city => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                    <button type='submit'>Submit</button>
                </form>
                <div className="filterItem">
                    <form  onSubmit={function(event){event.preventDefault()}}>
                        <button><Link to='/add-space'>Add Space</Link></button>
                    </form>
                </div>
            </div>
        )
    }
}
