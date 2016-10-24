"use strict";
import React from "react";
import "./header.scss";
import {PageHeader,} from "react-bootstrap";

class Header extends React.Component {

    render() {
        return (
            <header>
                <PageHeader>Interfaccia Web App Ariosto Spallanzani!</PageHeader>
                <hr></hr>
            </header>
        );
    }
}

export default Header;
