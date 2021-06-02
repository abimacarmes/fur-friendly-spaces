import React, { Component } from 'react'
//import {Route, Link, BrowserRouter} from 'react-router-dom';
import FurFriendlyContext from './FurFriendlyContext'
import PropTypes from 'prop-types';


export default class Homepage extends Component {
    static contextType = FurFriendlyContext;

    render() {
        return (
            <div className="homepage">
                <h1>Home Page Content</h1>
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

