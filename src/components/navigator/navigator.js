"use strict";
import React from "react";
import "./navigator.scss";

class Navigator extends React.Component {

    constructor(props) {
        super(props);
        this.getElements = this.getElements.bind(this);
    }

    getElements() {

        let el = [];

        for (let i = 1; i <= this.props.length; i++) {
            el.push(<li key={i}>
                <a href="#">{i}</a>
            </li>);
        }

        return el;

    }

    render() {
        return (
            <nav aria-label="Page navigation">
                <ul className="pagination">
                    <li>
                        <a href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    {this.getElements()}
                    <li>
                        <a href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        );
    }

}

export default Navigator;