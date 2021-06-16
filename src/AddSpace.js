import React, { Component } from 'react'
//import {Route, Link, BrowserRouter} from 'react-router-dom';
import FurFriendlyContext from './FurFriendlyContext'
import Space from './Space'

export default class AddSpace extends Component {
    static contextType = FurFriendlyContext;
    constructor (props){
        super(props);
        this.newSpaceName = React.createRef();
        this.newSpaceType = React.createRef();
    }
    state = {
        displaySearch: false,
        spaceSearch: {},
        errorMessage:''
    }

    spaceSearch = event => {
        event.preventDefault();
        this.setState({
            displaySearch:false,
            errorMessage:''
        })
        var searchResult = {}
        
        const formattedSearch = this.newSpaceName.current.value.split(' ').join('%20');

        if(this.newSpaceName.current.value){    
            fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${formattedSearch}&inputtype=textquery&fields=formatted_address,name&key=AIzaSyB0ksRosNOMHsE-YH4uj5eB27eW0fHwdlc`)
            .then(searchResult => {
                if(!searchResult.ok){
                    throw new Error('Something went wrong.');
                }
                return searchResult.json()
            })
            .then(searchJson => {
                searchResult = searchJson.candidates[0];
                this.setState({
                    displaySearch: true,
                    spaceSearch: {
                        "id": "N/A",
                        "name": searchResult.name,
                        "address":searchResult.formatted_address.split(', ')[0],
                        "city":searchResult.formatted_address.split(', ')[1],
                        "type": this.newSpaceType.current.value,
                        "upCount": 0,
                        "downCount": 0
                    }  
                });
            })
            .catch(error =>
                console.log(error.message)
            )
        }
    }

    submitNewSpace = event => {
        event.preventDefault();

        const currSpaces = this.context.spaces;

        var repeatSpace = currSpaces.filter(space => space.name===this.state.spaceSearch.name && space.address===this.state.spaceSearch.address && space.city===this.state.spaceSearch.city && space.type===this.state.spaceSearch.type)

        if(repeatSpace.length===0){
            this.context.addSpace(this.state.spaceSearch.name, this.state.spaceSearch.address, this.state.spaceSearch.city, this.state.spaceSearch.type);      
            this.props.history.push('/spaces')
        }
        else{
            this.setState({
                errorMessage:"We already have this location! Please try another one.",
                displaySearch: false
            })
        }
    }

    render() { 
        let sampleSpace;
        let sampleConfirmButton;
        let errorMessage = this.state.errorMessage;

        const types = this.context.types.filter(type => type !=='All');

        if(this.state.displaySearch){
            sampleSpace = <Space space={this.state.spaceSearch}/>
            sampleConfirmButton = <form onSubmit={this.submitNewSpace}><button type='submit'>Submit New Space</button></form>
        }

        return (
            <div>
                <h3>Create Note:</h3> 
                <form onSubmit={this.spaceSearch}>
                    <label>Name:</label>
                    <input type='text' id='space-name-input'ref={this.newSpaceName}></input>
                    <label>Location Type:</label>
                    <select ref={this.newSpaceType}>
                        {types.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                    <button type='submit'>Submit</button>
                </form>
                {sampleSpace}
                {sampleConfirmButton}
                {errorMessage}
            </div>
        )
    }
}
