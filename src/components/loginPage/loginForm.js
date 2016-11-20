"use strict";
import React from "react";
import AS_SDK from "../../lib/index";
import {browserHistory} from "react-router";

export default class LoginForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {},
            resultText: null
        };

        this.login = this.login.bind(this);
        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.render = this.render.bind(this);
    }

    handleChange(event) { //save the new values from form in the component state every time they change
        let ob = this.state;
        ob.user[event.target.type] = event.target.value;
        this.setState(ob);
    }

    login() {
        browserHistory.push("/admin/users");
    }

    submit() {

        if (this.state.user.email && this.state.user.password) {

            let resultText = (<div className="text-result">
                <p>Caricamento...</p>
                <br/>
            </div>);

            this.setState({resultText});

            AS_SDK.Auth.LoginHandler.login(this.state.user.email, this.state.user.password, this.login, (error)=> {
                const resultText = (<div className="text-alert">
                    <p>{error}</p>
                    <br/>
                </div>);
                this.setState({resultText});
            });
        }
        else {
            const resultText = (<div className="text-alert">
                <p>Compila Tutti i Campi</p>
                <br/>
            </div>);
            this.setState({resultText});
        }

    }

    render() {
        return (
            <section className="col-md-4 col-md-push-4">
                <form onSubmit={this.handleSubmit}>
                    <h3>Login</h3>
                    <input type="email" value={this.state.email} className="form-control" onChange={this.handleChange}
                           placeholder="Email" required/>
                    <input type="password" value={this.state.password} className="form-control"
                           onChange={this.handleChange} placeholder="Password" required/>
                    {this.state.resultText}
                    <button type="button" className="btn btn-primary" onClick={this.submit}>
                        Accedi
                    </button>
                    <br/>
                </form>
            </section>
        );
    }

}
