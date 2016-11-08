"use strict";
import React from "react";
import IconList from "../iconList/iconList.js";
import "./sidebar.scss";

export default class Sidebar extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <aside className="container-fluid">
                <section className="row">
                    <nav className="col-sm-3 col-md-2 sidebar">
                        <IconList/>
                    </nav>
                </section>
            </aside>
        );
    }

}
