import React, { Component } from 'react'
//import {Route, Link, BrowserRouter} from 'react-router-dom';
import FurFriendlyContext from './FurFriendlyContext'

import Space from './Space';
import Filter from './Filter';


export default class SpaceContainer extends Component {
    static contextType = FurFriendlyContext;

    render() {
        const filterType = this.context.filterType;
        const filterCity = this.context.filterCity;

        var filteredSpaces = this.context.spaces;

        //Handles filtered results
        if(filterType === 'All' || filterCity ==='All'){
            filteredSpaces = this.context.spaces
        }
        if(filterType !== 'All'){
            filteredSpaces = filteredSpaces.filter(space => space.type === filterType)
        }
        if(filterCity !== 'All'){
            filteredSpaces = filteredSpaces.filter(space => space.city === filterCity)
        }

        var noResults = "";
        if(filteredSpaces.length === 0){
            noResults = `There are currently no spaces that fit your filter criteria - we'd love for you to go exploring and add new spaces to the list!`
        }

        return (
            <div>
                <Filter/>
                <div className="spaceContainer">
                    {filteredSpaces.map(space => <Space key={space.id} space={space}/> )}
                    <p>{noResults}</p>
                </div>
            </div>
        )
    }
}