"use strict";
import React from "react";
import IconList from "../IconList/IconList.js";
import "bootstrap/dist/js/bootstrap.min";
import "./navBar.scss";

export default class Navbar extends React.Component {

    render() {
        return (
            <nav id="navbar" className="navbar navbar-inverse navbar-fixed-top">
                <div className="navbar-header">
                    <button type="button" data-toggle="collapse" data-target=".navbar-collapse"
                            className="navbar-toggle">
                        <span className="icon-bar"/>
                        <span className="icon-bar"/>
                        <span className="icon-bar"/>
                    </button>
                    <a className="navbar-brand" href="/">Admin App Ariosto Spallanzani</a>
                </div>
                <div className="navbar-collapse collapse">
                    <ul className="nav navbar-nav">
                        <IconList id="iconList"/>
                    </ul>
                </div>
            </nav>
        );
    }

}



