"use strict";
import React from "react";
import AS_SDK from "../../lib/index";
import ClassSelector from "../classSelector/classSelector";
import "./userForm.scss";


class UserForm extends React.Component {

    constructor(props) {
        super(props);

        this.data = AS_SDK.Settings.Configs;

        this.state = {
            departments: this.data.departments,
            classes: this.data.classes,
            numbers: this.data.numbers,
            name: "Nome",
            surname: "Cognome",
            sez: "",
            cls: "",
            number: ""
        };

        this.handleTextChange = this.handleTextChange.bind(this);
        this.getNewUserData = this.getNewUserData.bind(this);
        AS_SDK.Database.UserHandler.getUsers();
    }

    render() {
        return (
            <section id="formSection">

                <h2 className="page-header">Aggiungi Studente</h2>

                <form id="userForm">

                    <input
                        className="inputForm" type="text"
                        value={this.state.name} onChange={e => this.handleTextChange(e, "name")}
                    />

                    <input
                        className="inputForm" type="text"
                        value={this.state.surname} onChange={e => this.handleTextChange(e, "surname")}
                    />

                    <ClassSelector value={this.state.sez} onChange={e => this.handleTextChange(e, "sez")}
                                   options={this.state.departments} placeholder="Sezione"/>

                    <ClassSelector value={this.state.cls} onChange={e => this.handleTextChange(e, "cls")}
                                   options={this.state.classes} placeholder="Classe"/>

                    <ClassSelector value={this.state.number} onChange={e => this.handleTextChange(e, "number")}
                                   options={this.state.numbers} placeholder="N°"/>

                </form>

                <button className="btn btn-primary btn-lg" onClick={this.getNewUserData}>Aggiungi
                </button>
            </section>
        );
    }


    handleTextChange(e, source) {
        const oldState = this.state;
        oldState[source] = e.target.value;
        this.setState(oldState);
    }

    getNewUserData() {

        const {name, surname, sez, cls, number} = this.state;

        if (!name || !surname || !sez || !cls || !number) {
            alert("Compila tutti i campi");
        }
        else {

            let section;
            if (sez == "Classico")
                section = "C";
            if (this.state.sez == "Scientifico")
                section = "S";

            const mail = this.state.cls + section + this.state.number + "@ariostospallanzani.com";
            const password = AS_SDK.Utility.StringHandler.getRandomString(6);

            AS_SDK.Database.UserHandler.createUser(mail, name, surname, password, section, cls, number, ()=>alert("utente creato"));
        }

    }

}

export default UserForm;


