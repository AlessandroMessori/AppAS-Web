"use strict";
import React from "react";
import ReactDOM from "react-dom";
import UserForm from "./components/userForm/userForm";
import Header from "./components/header/header";
import UserTable from "./components/userTable/userTable";

class App extends React.Component {

    render() {
        return (
            <div>
                <Header/>
                <UserForm/>
                <UserTable/>
            </div>
        );
    }

}

ReactDOM.render(<App/>, document.getElementById("root"));
