"use strict";
import React from "react";

class UserCard extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={"panel panel-default " + this.props.className} key={this.props.user.mail}>
                <div className="panel-body">
                    <h3>{this.props.user.name} {this.props.user.surname}</h3>
                    <h4>{this.props.user.cls} {this.props.user.number} {this.props.user.sect}</h4>
                    <h4>Mail:{this.props.user.mail} Password:{this.props.user.pass}</h4>
                </div>
            </div>);
    }

}

export default UserCard;
