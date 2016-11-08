"use strict";
import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, IndexRoute, browserHistory} from "react-router";
import UserForm from "./components/userForm/userForm";
import Navbar from "./components/navbar/navbar";
import UserTable from "./components/userTable/userTable";
import Sidebar from "./components/sidebar/sidebar";

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
        <Route name="app" path="/" component={App}>
            <IndexRoute component={UserForm}/>
            <Route path="users" component={UserTable}/>
            <Route path="addUser" component={UserForm}/>
        </Route>
    </Router>
);


ReactDOM.render(cont, document.getElementById("root"));
