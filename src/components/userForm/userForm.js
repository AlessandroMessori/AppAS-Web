"use strict";
import React from "react";
import {FormGroup, FormControl} from "react-bootstrap";
import stringService from "../../services/stringService";
import "./userForm.scss";

class UserForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            classes: this.getClasses(),
            numbers: this.getNumbers(),
            name: "",
            surname: "",
            cls: "1A",
            number: "1"
        };

        this.getClasses = this.getClasses.bind(this);
        this.getNumbers = this.getNumbers.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.getNewUserData = this.getNewUserData.bind(this);
    }

    render() {
        return (
            <section id="formSection">

                <h2>Aggiungi Utente</h2>

                <FormGroup id="userForm">

                    <FormControl
                        className="inputForm" type="text"
                        placeholder="Nome" value={this.state.name}
                        onChange={e => this.handleTextChange(e, "name")}
                    />

                    <FormControl
                        className="inputForm" type="text"
                        placeholder="Cognome" value={this.state.surname}
                        onChange={e => this.handleTextChange(e, "surname")}
                    />

                    <select value={this.state.cls}
                            onChange={e => this.handleTextChange(e, "cls")}>{this.state.classes}
                    </select>

                    <select value={this.state.number }
                            onChange={e => this.handleTextChange(e, "number")}>{this.state.numbers}
                    </select>

                </FormGroup>


                <button onClick={()=>console.log(this.getNewUserData())}>Aggiungi</button>

            </section>
        );
    }

    getClasses() {

        const Classes = ["1", "2", "3", "4", "5"];
        const Sections = ["A", "B", "C", "D", "E", "F"];
        let classes = [];

        Classes.map(item => {
            Sections.map(section => classes.push(<option key={item + section}>{item + section}</option>));
        });

        return classes;
    }

    getNumbers() {
        let numbers = [];

        for (let i = 1; i < 31; i++) {
            numbers.push(<option key={i}>{i}</option>);
        }

        return numbers;
    }

    handleTextChange(e, source) {
        const oldState = this.state;
        oldState[source] = e.target.value;
        this.setState(oldState);
    }

    getNewUserData() {

        const mail = this.state.cls + this.state.number + "@ariostospallanzani.com";
        const username = this.state.name + " " + this.state.surname;
        const password = stringService.getRandomString(5);

        return {
            mail,
            password,
            username
        };
    }
}

export default UserForm;


