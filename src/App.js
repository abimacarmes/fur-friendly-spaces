import React, { Component } from 'react'
import {Route, Link, BrowserRouter} from 'react-router-dom';
import './App.css';

import FurFriendlyContext from './FurFriendlyContext'

import SpaceContainer from './SpaceContainer'
import AddSpace from './AddSpace'
import Homepage from './Homepage'

import STORE from './dummy-store';

const API_URL_BASE = "https://enigmatic-basin-32386.herokuapp.com/api"

export default class App extends Component {
    static contextType = FurFriendlyContext;
    state = {
        spaces: [],
        filterType: "All",
        filterCity: "All"
    }  

    componentDidMount(){
        console.log(`${API_URL_BASE}/spaces`)

        fetch(`${API_URL_BASE}/spaces`)
        .then(spacesResult => {
            if(!spacesResult.ok){
                throw new Error('Something went wrong.');
            }
            return spacesResult.json()
        })
        .then(spacesJson => {
            this.setState({
                spaces: spacesJson
            })
            
        })
        .catch(error =>
            console.log(error.message)
        )
    }
    

    addSpace = (name, address, city, type) => {
        console.log('Adding Space: '+ name)
        const oldSpaces = this.state.spaces

        oldSpaces.push({
            "name":`${name}`,
            "address":`${address}`,
            "city":`${city}`,
            "type":`${type}`
        })

        this.setState({
            spaces: oldSpaces
        })

        fetch(`${API_URL_BASE}/spaces`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify({
                "name":`${name}`,
                "address":`${address}`,
                "city":`${city}`,
                "type":`${type}`
            })
          }
        )
        .then(result => {
            if(!result.ok){
                throw new Error('Something went wrong.')
            }
            return result.json()
        })
        .catch(error => {
            console.log(error.message)
        })
        
    }

    updateFilterType = (filter) => {
        console.log('Filter by ' + filter);
        
        this.setState({
            filterType: filter
        })
    }

    updateFilterCity = (filter) => {
        console.log('Filter by ' + filter);

        this.setState({
            filterCity: filter
        })
    }

    upVote = (id) => {
        const spaceIndex = this.state.spaces.findIndex(space => space.id === id);
        
        const oldSpaces = this.state.spaces;
        oldSpaces[spaceIndex].upcount = oldSpaces[spaceIndex].upcount + 1;

        const newUpCount = oldSpaces[spaceIndex].upcount;
        const downCount = oldSpaces[spaceIndex].downcount;
        
        this.setState({
            spaces: oldSpaces
        })

        fetch(`${API_URL_BASE}/spaces/${id}`, {
            method: 'PATCH',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify({
                "id":`${id}`,
                "upCount":`${newUpCount}`,
                "downCount":`${downCount}`
            })
          }
        )
        .then(result => {
            if(!result.ok){
                throw new Error('Something went wrong.')
            }
            return result.json()
        })
        .catch(error => {
            console.log(error.message)
        })
    }

    downVote = (id) => {
        const spaceIndex = this.state.spaces.findIndex(space => space.id === id)
        
        const oldSpaces = this.state.spaces
        oldSpaces[spaceIndex].downcount = oldSpaces[spaceIndex].downcount + 1;

        const upCount = oldSpaces[spaceIndex].upcount;
        const newDownCount = oldSpaces[spaceIndex].downcount;
        
        this.setState({
            spaces: oldSpaces
        })

        fetch(`${API_URL_BASE}/spaces/${id}`, {
            method: 'PATCH',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify({
                "id":`${id}`,
                "upCount":`${upCount}`,
                "downCount":`${newDownCount}`
            })
          }
        )
        .then(result => {
            if(!result.ok){
                throw new Error('Something went wrong.')
            }
            return result.json()
        })
        .catch(error => {
            console.log(error.message)
        })
    }
    
    mainRoutes = () => {
        return(
            <>
                <Route exact path='/' component={Homepage}/>
                <Route path='/spaces' component={SpaceContainer}/>
                <Route path='/add-space' component={AddSpace}/>
            </>
        )
    }

    render(){
        const contextValue = {
            spaces: this.state.spaces,
            types: STORE.types,
            addSpace: this.addSpace,
            updateFilterType: this.updateFilterType,
            filterType: this.state.filterType,
            updateFilterCity: this.updateFilterCity,
            filterCity: this.state.filterCity,
            upVote: this.upVote,
            downVote: this.downVote
        }       

        return(
            <BrowserRouter>
                <FurFriendlyContext.Provider value={contextValue}>
                    <header>
                        <Link to='/'><h1>Fur Friendly Spaces</h1></Link>
                    </header>
                    <div className='app'>
                            <main>
                                {this.mainRoutes()}
                            </main>
                    </div>
                </FurFriendlyContext.Provider>
            </BrowserRouter>
            
        )
    }
}
