"use strict";
import React from "react";
import {browserHistory} from "react-router";
import LoginForm from "./loginForm.js";
import "./loginPage.scss";

export default class LoginPage extends React.Component {

    login() {
        browserHistory.push("/admin/users");
    }

    render() {
        return (
            <section id="LoginPage">
                <header>
                    <h2>Admin App Ariosto Spallanzani</h2>
                    <LoginForm onSubmit={this.login}/>
                </header>
            </section>
        );
    }
}
