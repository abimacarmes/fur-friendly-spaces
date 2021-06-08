import React, { Component } from 'react'
//import {Route, Link, BrowserRouter} from 'react-router-dom';
import FurFriendlyContext from './FurFriendlyContext'

export default class AddSpace extends Component {
    static contextType = FurFriendlyContext;
    constructor (props){
        super(props);
        this.newSpaceName = React.createRef();
        this.newSpaceType = React.createRef();
    }
    state = {
        displaySearch: '',
        resultName: '',
        resultAddress: '',
        resultCity: '',
        resultType:''
    }

    spaceSearch = event => {
        event.preventDefault();
        var searchResult = {}
        
        const formattedSearch = this.newSpaceName.current.value.split(' ').join('%20');

        if(this.newSpaceName.current.value){    
            fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${formattedSearch}&inputtype=textquery&fields=formatted_address,name&key=AIzaSyB0ksRosNOMHsE-YH4uj5eB27eW0fHwdlc`,{mode:'no-cors'})
            .then(searchResult => {
                if(!searchResult.ok){
                    throw new Error('Something went wrong.');
                }
                console.log(searchResult)
                return searchResult.json()
            })
            .then(searchJson => {
                searchResult = searchJson
            })
            .catch(error =>
                console.log(error.message)
            )
        }
        
        
    }

    submitNewSpace = event => {
        event.preventDefault();

        console.log("New Space Added!")
        
        if(!this.newSpaceName.current.value || !this.newSpaceAddress.current.value){
            console.log("Name or address can't be blank.")
        }

        else{
            console.log(this.newSpaceName.current.value + this.newSpaceAddress.current.value + this.newSpaceType.current.value)
            this.context.addSpace(this.newSpaceName.current.value, this.newSpaceAddress.current.value, this.newSpaceCity.current.value, this.newSpaceType.current.value);      
            this.props.history.push('/spaces')
        }
    }



    //should add some form of address check/search? 
    render() { 

        return (
            <div>
                <h3>Create Note:</h3> 
                <form onSubmit={this.spaceSearch}>
                    <label>Name:</label>
                    <input type='text' id='space-name-input'ref={this.newSpaceName}></input>
                    <label>Location Type:</label>
                    <select ref={this.newSpaceType}>
                        {this.context.types.map(type => (
                            <option value={type}>{type}</option>
                        ))}
                    </select>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        )
    }
}
