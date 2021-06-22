import React, { Component } from 'react'
import FurFriendlyContext from './FurFriendlyContext'


export default class Space extends Component {
    static contextType = FurFriendlyContext;
    state = {
        positiveImgSrc: "https://image.flaticon.com/icons/png/512/1533/1533907.png",
        negativeImgSrc: "https://image.flaticon.com/icons/png/512/1533/1533915.png"
    }

    //need function for up/down voting
    onUpVote = event => {
        event.preventDefault();

        if(this.props.space.id !== "N/A"){ 
            this.setState({
                positiveImgSrc: "https://image.flaticon.com/icons/png/512/1533/1533913.png"
            })

            this.context.upVote(this.props.space.id)
        }
    }

    onDownVote = event => {
        event.preventDefault();

        if(this.props.space.id !== "N/A"){
            this.setState({
                negativeImgSrc: 'https://image.flaticon.com/icons/png/512/1533/1533919.png'
            })
    
            this.context.downVote(this.props.space.id)
        }
    }

    render() {
        const {space} = this.props;

        return (
            <div className="space" key={space.id}>
                <div className="spaceInfo">
                    <h2>Name:  {space.name}</h2>
                    <h3>Address:  {space.address}</h3>
                    <h3>City:  {space.city}</h3>
                    <h3>Location Type:  {space.type}</h3>
                </div>
                <div className="spaceVotes">
                    <div className="upVote">
                        <img onClick={this.onUpVote} src={this.state.positiveImgSrc} alt="Positive Vote" width="10%" height="10%"/>
                        <h3>  {space.upcount}</h3>
                    </div>
                    <div className="downVote">
                        <img onClick={this.onDownVote} src={this.state.negativeImgSrc} alt="Negative Vote" width="10%" height="10%"/>
                        <h3>  {space.downcount}</h3>
                    </div>
                </div>
            </div>
        )
    }
}

