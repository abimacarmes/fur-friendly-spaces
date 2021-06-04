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

    //need function for up/down voting
    filterResults = event => {
        event.preventDefault();

        this.context.updateFilterType(this.filterType.current.value)
        this.context.updateFilterCity(this.filterCity.current.value)
    }

    render() {
        const cities =this.context.spaces.map(space => space.city)
        cities.unshift('All')
        
        const citiesFilter = [...new Set(cities)]

        const types = this.context.types
        types.unshift('All')
        

        return (
            <div className="filter">
                <form onSubmit={this.filterResults}>
                    <label>Filter By Location Type: </label>
                    <select ref={this.filterType}>
                        {types.map(type => (
                            <option value={type}>{type}</option>
                        ))}
                    </select>
                    <label>Filter By City: </label>
                    <select ref={this.filterCity}>
                        {citiesFilter.map(city => (
                            <option value={city}>{city}</option>
                        ))}
                    </select>
                    <button type='submit'>Submit</button>
                </form>
                <form onSubmit={function(event){event.preventDefault()}}>
                    <button><Link to='/add-space'>Add Space</Link></button>
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

