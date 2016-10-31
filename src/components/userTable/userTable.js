"use strict";
import React from "react";
import JsonTable from "react-json-table";
import "./userTable.scss";

class Header extends React.Component {

    constructor() {
        super();
        this.state = {
            items: [
                {Nome: "Mario Rossi", Classe: "1F", Registro: 13, Sezione: "Classico", Admin: "Si", Attivo: "Si"},
                {Nome: "Paolo Bianchi", Classe: "2D", Registro: 4, Sezione: "Scientifico", Admin: "Si", Attivo: "Si"},
                {Nome: "Giulio Gialli", Classe: "5E", Registro: 20, Sezione: "Scientifico", Admin: "No", Attivo: "No"}
            ]
        };
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
