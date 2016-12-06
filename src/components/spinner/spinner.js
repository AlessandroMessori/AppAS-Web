"use strict";
import React from "react";
import "./spinner.scss";

export default class Spinner extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div className="spinner">
                <div className="double-bounce1"></div>
                <div className="double-bounce2"></div>
            </div>
        );
    }
}