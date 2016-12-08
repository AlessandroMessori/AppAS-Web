"use strict";
import React from "react";
import AS_SDK from "../../lib/index";
import ClassSelector from "../classSelector/classSelector";
import Navigator from "../navigator/navigator";
import UserCard from "../userCard/userCard";
import "./printCred.scss";

class PrintCred extends React.Component {

    constructor(props) {
        super(props);

        this.data = AS_SDK.Settings.Configs;

        this.state = {
            departments: this.data.departments,
            classes: this.data.classes,
            numbers: this.data.numbers,
            sez: "Scientifico",
            cls: "1A",
            maxLength: 4,
            fullItems: [],
            filteredItems: [],
            splitItems: [],
            currentItems: [],
            index: 0
        };

        this.onChange = this.onChange.bind(this);
        this.changePage = this.changePage.bind(this);
        this.navigate = this.navigate.bind(this);
        this.getUserList = this.getUserList.bind(this);
        this.printCred = this.printCred.bind(this);
    }

    componentDidMount() {
        AS_SDK.Database.UserHandler.getUsers(users => {

            const fullItems = users.sort(AS_SDK.Utility.ArrayHandler.dynamicSort("mail"));
            const filteredItems = AS_SDK.Utility.FilterHandler.filterItems(fullItems, "", this.state.cls, this.state.sez);
            const splitItems = AS_SDK.Utility.ArrayHandler.splitItems(filteredItems, this.state.maxLength);
            const currentItems = splitItems[this.state.index];
            const navLength = splitItems.length;

            this.setState({fullItems, filteredItems, splitItems, currentItems, navLength});
        });
    }

    onChange(e, source) {
        const oldState = this.state;
        oldState[source] = e.target.value;

        oldState.filteredItems = AS_SDK.Utility.FilterHandler.filterItems(oldState.fullItems, "", oldState.cls, oldState.sez);
        oldState.splitItems = AS_SDK.Utility.ArrayHandler.splitItems(oldState.filteredItems, oldState.maxLength);
        oldState.currentItems = oldState.splitItems[0];
        oldState.index = 0;
        oldState.navLength = oldState.splitItems.length;

        this.setState(oldState);
    }

    changePage(index) {
        this.setState({
            index,
            currentItems: this.state.splitItems[index]
        });
    }

    navigate(direction) {

        let index = this.state.index;

        if (direction && this.state.index > 0) {
            index--;
        }

        if (!direction && this.state.index < this.state.navLength - 1) {
            index++;
        }

        this.setState({
            index,
            currentItems: this.state.splitItems[index]
        });
    }

    getUserList() {

        const items = this.state.currentItems;
        let users = [];

        if (items.length < 1) return (<p>Non ci sono studenti per questa classe</p>);

        items.map(item => users.push(<UserCard className="listItem" user={item} key={item.mail}/>));

        return users;

    }

    printCred() {
        const page = (this.state.index + 1).toString();
        const title = this.state.cls + " " + this.state.sez + " Pag " + page;
        const name = this.state.cls + this.state.sez + page;
        AS_SDK.Utility.PDFHandler.generatePDF(title, name, this.state.currentItems);
    }

    render() {
        return (
            <section id="printSection">

                <h2 className="page-header">Stampa Credenziali</h2>

                <ClassSelector value={this.state.sez} onChange={e => this.onChange(e, "sez")}
                               options={this.state.departments} placeholder="Sezione"/>

                <ClassSelector value={this.state.cls} onChange={e => this.onChange(e, "cls")}
                               options={this.state.classes} placeholder="Classe"/>

                <ul className="list">
                    {this.getUserList()}
                </ul>

                <hr/>

                <Navigator length={this.state.navLength} onItemClick={this.changePage} onArrowClick={this.navigate}/>
                <button className="btn btn-primary btn-lg" onClick={this.printCred}>Scarica Credenziali</button>
            </section>
        );
    }

}

export default PrintCred;




