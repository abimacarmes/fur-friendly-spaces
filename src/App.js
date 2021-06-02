import React, { Component } from 'react'
import {Route, Link, BrowserRouter} from 'react-router-dom';
import './App.css';

import FurFriendlyContext from './FurFriendlyContext'

import Filter from './Filter'
import SpaceContainer from './SpaceContainer'
import AddSpace from './AddSpace'
import Map from './Map'
import Homepage from './Homepage'

import STORE from './dummy-store';

export default class App extends Component {
    static contextType = FurFriendlyContext;
    state = {
        spaces: STORE.spaces,
        filterType: "All",
        filterCity: "All"
    }
    /*
    componentDidMount(){
        fetch('https://obscure-hollows-57839.herokuapp.com/notes')
        .then(notesResult => {
            if(!notesResult.ok){
                throw new Error('Something went wrong.');
            }
            return notesResult.json()
        })
        .then(notesJson => {
            this.setState({
                notes: notesJson
            })
        })
        .catch(error =>
            console.log(error.message)
        )

        fetch('https://obscure-hollows-57839.herokuapp.com/folders')
        .then(foldersResult => {
            if(!foldersResult.ok){
                throw new Error('Something went wrong.');
            }
            return foldersResult.json()
        })
        .then(foldersJson => {
            this.setState({
                folders: foldersJson
            })
        })
        .catch(error =>
            console.log(error.message)
        )
    }
    */

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

        /*
        fetch(`https://obscure-hollows-57839.herokuapp.com/notes/`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify({
                "id":`${this.generateID()}`,
                "name":`${noteName}`,
                "modified":`${modified}`,
                "folderid":`${folder.folderid}`,
                "content":`${noteText}`
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
        */
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
    
    mainRoutes = () => {
        return(
            <>
                <Route exact path='/' component={Homepage}/>
                <Route path='/spaces' component={SpaceContainer}/>
                <Route path='add-space' component={AddSpace}/>
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
            filterCity: this.state.filterCity
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
