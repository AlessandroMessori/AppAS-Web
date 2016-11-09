"use strict";
import React from "react";
import {Link} from "react-router";

export default class IconList extends React.Component {

    constructor() {
        super();
        this.state = {
            routes: [
                {
                    "link": "/admin/addUser",
                    "text": "Aggiungi Utente",
                    "icon": "glyphicon glyphicon-plus"
                },
                {
                    "link": "/admin/users",
                    "text": "Gestisci Utenti",
                    "icon": "glyphicon glyphicon-user"
                },
                {
                    "link": "/admin/printUsers",
                    "text": "Stampa Dati Utenti",
                    "icon": "glyphicon glyphicon-print"
                },
                {
                    "link": "/",
                    "text": "Disconnettiti",
                    "icon": "glyphicon glyphicon-log-out"
                }
            ]
        };
    }

    render() {
        return (
            <ul className="nav nav-sidebar">
                {this.state.routes.map((item) => {
                    return (<li key={item.text}>
                        <Link to={item.link}>
                            <span className={item.icon}> {item.text}</span>
                        </Link>
                    </li>);
                }) }
            </ul>
        );
    }

}
