"use strict";
import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, IndexRoute, browserHistory} from "react-router";
import UserForm from "./components/userForm/userForm";
import Navbar from "./components/navbar/navbar";
import UserTable from "./components/userTable/userTable";
import Sidebar from "./components/sidebar/sidebar";
import LoginPage from "./components/loginPage/loginPage";
import AS_SDK from "./lib/index";

AS_SDK.Auth.LoginHandler.logOut();

class App extends React.Component {
    render() {
        return (
            <section>
                <Navbar/>
                <Sidebar/>
                <section className="col-xs-12 col-sm-9 col-sm-push-3 col-md-10 col-md-push-2">
                    {this.props.children}
                </section>
            </section>
        );
    }

}

const cont = (
    <Router history={browserHistory} onUpdate={() => window.scrollTo(0, 0) }>
        <Route name="app" path="/admin" component={App}>
            <IndexRoute component={LoginPage}/>
            <Route path="/admin/users" component={UserTable}/>
            <Route path="/admin/addUser" component={UserForm}/>
        </Route>
        <Route name="login" path="/" component={LoginPage}>
        </Route>
    </Router>
);


ReactDOM.render(cont, document.getElementById("root"));
