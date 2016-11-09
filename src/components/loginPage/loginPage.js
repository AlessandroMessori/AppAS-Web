"use strict";
import React from "react";
import LoginForm from "./loginForm.js";
import "./loginPage.scss";

export default class LoginPage extends React.Component {

    render() {
        return (
            <section id="LoginPage">
                <header>
                    <h2>Admin App Ariosto Spallanzani</h2>
                    <LoginForm/>
                </header>
            </section>
        );
    }
}
