"use strict";
import React from "react";
import JsonTable from "react-json-table";
import AS_SDK from "../../lib/index";
import "./userTable.scss";

class Header extends React.Component {

    constructor() {
        super();

        this.state = {
            items: []
        };
    }

    componentDidMount() {
        AS_SDK.Database.UserHandler.getUsers(users => {
            this.setState({items: users});
        });
    }

    render() {
        return (
            <section id="userTableSection">
                <h2 className="page-header">Tabella Studenti</h2>
                <JsonTable rows={this.state.items} className="table"/>
            </section>
        );
    }
}

export default Header;
