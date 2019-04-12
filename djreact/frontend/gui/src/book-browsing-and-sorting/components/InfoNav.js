import React, { Component } from 'react'

class InfoNav extends Component{
    render(){
        return (
            <div className="content-container info-nav">
                <span className="">{this.props.title}</span>
            </div>
        );
    }
}

export default InfoNav;