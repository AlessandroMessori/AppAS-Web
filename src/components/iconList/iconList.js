"use strict";
import React from "react";
import {Link, browserHistory} from "react-router";
import AS_SDK from "../../lib/index";
import "./iconList.scss";

export default class IconList extends React.Component {

    constructor() {
        super();
        this.state = {
            routes: [
                {
                    "link": "/admin/addUser",
                    "text": "Crea Utente",
                    "icon": "glyphicon glyphicon-plus"
                },
                {
                    "link": "/admin/users",
                    "text": "Gestisci Utenti",
                    "icon": "glyphicon glyphicon-user"
                },
                {
                    "link": "/admin/printUsers",
                    "text": "Stampa Dati",
                    "icon": "glyphicon glyphicon-print"
                }
            ]
        };
    }


    logOut() {
        AS_SDK.Auth.LoginHandler.logOut(() => browserHistory.push("/"));
    }

    render() {
        return (
            <ul className="nav nav-sidebar" id="iconList">
                {this.state.routes.map((item) => {
                    return (<li key={item.text}>
                        <Link to={item.link}>
                            <span className={item.icon + " link"}> {item.text}</span>
                        </Link>
                    </li>);
                })
                }
                <li onClick={this.logOut}>
                    <Link>
                        <span className="glyphicon glyphicon-log-out link"> Esci</span>
                    </Link>
                </li>
            </ul>
        );
    }

}
