"use strict";
import React from "react";
import "./classSelector.scss";

export default class ClassSelector extends React.Component {

    constructor(props) {
        super(props);
        this.getOptions = this.getOptions.bind(this);
    }

    render() {
        return (
            <select value={this.props.value} onChange={this.props.onChange}>
                <option value="" disabled selected>{this.props.placeholder}</option>
                {this.getOptions(this.props.options)}
            </select>);
    }

    getOptions(data) {
        let options = [];
        data.map(item => options.push(<option key={item}>{item}</option>));
        return options;
    }

}
