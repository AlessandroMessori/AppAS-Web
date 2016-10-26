"use strict";
import React from "react";
import stringService from "../../services/stringService";
import "./userForm.scss";

class UserForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            departments: this.getOptions(this.props.data.departments),
            classes: this.getOptions(this.props.data.classes),
            numbers: this.getOptions(this.props.data.numbers),
            name: "Nome",
            surname: "Cognome",
            sez: "",
            cls: "",
            number: ""
        };

        this.getOptions = this.getOptions.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.getNewUserData = this.getNewUserData.bind(this);
    }

    render() {
        return (
            <section id="formSection">

                <h2>Aggiungi Utente</h2>

                <form id="userForm">

                    <input
                        className="inputForm" type="text"
                        value={this.state.name} onChange={e => this.handleTextChange(e, "name")}
                    />

                    <input
                        className="inputForm" type="text"
                        value={this.state.surname} onChange={e => this.handleTextChange(e, "surname")}
                    />

                    <br></br>

                    <select value={this.state.sez}
                            onChange={e => this.handleTextChange(e, "sez")}>
                        <option value="" disabled selected>Sezione</option>
                        {this.state.departments}
                    </select>

                    <select value={this.state.cls}
                            onChange={e => this.handleTextChange(e, "cls")}>
                        <option value="" disabled selected>Classe</option>
                        {this.state.classes}
                    </select>

                    <select value={this.state.number }
                            onChange={e => this.handleTextChange(e, "number")}>
                        <option value="" disabled selected>N°</option>
                        {this.state.numbers}
                    </select>

                </form>


                <button className="btn btn-primary" onClick={this.getNewUserData}>Aggiungi
                </button>

            </section>
        );
    }

    getOptions(data) {
        let options = [];
        data.map(item => options.push(<option key={item}>{item}</option>));
        return options;
    }

    handleTextChange(e, source) {
        const oldState = this.state;
        oldState[source] = e.target.value;
        this.setState(oldState);
    }

    getNewUserData() {

        if (!this.state.name || !this.state.surname || !this.state.sez || !this.state.cls || !this.state.number) {
            alert("Compila tutti i campi");
        }
        else {

            let section;
            if (this.state.sez == "Classico")
                section = "C";
            if (this.state.sez == "Scientifico")
                section = "S";

            const mail = this.state.cls + section + this.state.number + "@ariostospallanzani.com";
            const username = this.state.name + " " + this.state.surname;
            const password = stringService.getRandomString(5);

            const user = {
                mail,
                password,
                username
            };

            console.log(user);
        }

    }
}

export default UserForm;


