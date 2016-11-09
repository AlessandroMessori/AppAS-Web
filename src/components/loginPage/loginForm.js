"use strict";
import React from "react";

export default class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            error: undefined,
            resultText: this.handleResultText("hide")
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleResultText = this.handleResultText.bind(this);
    }


    handleChange(event) { //save the new values from form in the component state every time they change
        let ob = this.state;
        ob.user[event.target.type] = event.target.value;
        this.setState(ob);
        //console.log(this.state);
    }

    handleResultText(result) {
        switch (result) {
            case "fail":
                return (
                    <div className="text-alert">
                        <p>Bad login information</p>
                        <br></br>
                    </div>
                );
            case "success":
                return (
                    <div className="text-success">
                        <p>Login Completed</p>
                        <br></br>
                    </div>
                );
            case "hide":
                return null;
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
                    <button type="button" className="btn btn-primary" onClick={this.props.onSubmit}>
                        Accedi
                    </button>
                    <br/>
                </form>
            </section>
        );
    }
}
