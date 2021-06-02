import React, { Component } from 'react'
//import {Route, Link, BrowserRouter} from 'react-router-dom';
import FurFriendlyContext from './FurFriendlyContext'
import PropTypes from 'prop-types';

export default class AddSpace extends Component {
    static contextType = FurFriendlyContext;
    constructor (props){
        super(props);
        this.newSpaceName = React.createRef();
        this.newSpaceAddress = React.createRef();
        this.newSpaceType = React.createRef();
        this.newSpaceCity = React.createRef();
    }
    state = {
        errorMsg: ''
    }

    submitNewSpace = event => {
        event.preventDefault();

        console.log("New Space Added!")
        
        if(!this.newSpaceName.current.value || !this.newSpaceAddress.current.value){
            //this.setState({
            //    errorMsg: 'Space Name and Address are required and cannot be blank.'
            //})
            console.log("Name or address can't be blank.")
        }

        else{
            console.log(this.newSpaceName.current.value + this.newSpaceAddress.current.value + this.newSpaceType.current.value)
            this.context.addSpace(this.newSpaceName.current.value, this.newSpaceAddress.current.value, this.newSpaceCity.current.value, this.newSpaceType.current.value);      
        }
    }

    //should add some form of address check/search? 
    render() {
        return (
            <div>
                <h3>Create Note:</h3> 
                <form onSubmit={this.submitNewSpace}>
                    <label>Name:</label>
                    <input type='text' id='space-name-input'ref={this.newSpaceName}></input>
                    <label>Address:</label>
                    <input ref={this.newSpaceAddress}></input>
                    <label>City:</label>
                    <input ref={this.newSpaceCity}></input>
                    <label>Location Type:</label>
                    <select ref={this.newSpaceType}>
                        {this.context.types.map(type => (
                            <option value={type}>{type}</option>
                        ))}
                    </select>
                    <h3>{this.state.errorMsg}</h3>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        )
    }
}
