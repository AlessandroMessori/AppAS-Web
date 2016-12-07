"use strict";
import React from "react";
import JsonTable from "react-json-table";
import SearchBar from "../searchBar/searchBar";
import ClassSelector from "../classSelector/classSelector";
import Navigator from "../navigator/navigator";
import AS_SDK from "../../lib/index";
import "./userTable.scss";

class UserTable extends React.Component {

    constructor(props) {
        super(props);

        this.data = AS_SDK.Settings.Configs;

        this.state = {
            maxLength: 7,
            index: 0,
            navLength: 0,
            departments: this.data.departments,
            classes: this.data.classes,
            numbers: this.data.numbers,
            cls: "",
            sect: "",
            searchBar: "",
            filteredItems: [],
            splitItems: [],
            items: [],
            columns: []
        };

        this.render = this.render.bind(this);
        this.onChange = this.onChange.bind(this);
        this.changePage = this.changePage.bind(this);
        this.navigate = this.navigate.bind(this);
        this.clearFilters = this.clearFilters.bind(this);
    }

    componentDidMount() {
        AS_SDK.Database.UserHandler.getUsers(users => {

            users = users.sort(AS_SDK.Utility.ArrayHandler.dynamicSort("defaultMail"));

            let columns = Object.keys(users[0]);
            columns.push(
                {
                    key: "key",
                    label: (<span>elimina</span>),
                    cell(item, columnKey) {
                        return (
                            <button className="btn btn-danger" onClick={() => alert("ciao")}>
                                <span className="glyphicon glyphicon-trash"/>
                            </button>
                        );
                    }
                });

            const splitItems = AS_SDK.Utility.ArrayHandler.splitItems(users, this.state.maxLength);

            this.setState({
                items: users,
                filteredItems: splitItems[this.state.index],
                splitItems,
                columns,
                navLength: splitItems.length
            });

        });
    }

    onChange(e, source) {
        const oldState = this.state;

        oldState[source] = e.target.value;
        const filteredItems = AS_SDK.Utility.FilterHandler.filterItems(oldState.items, oldState.searchBar, oldState.cls, oldState.sect);
        oldState.splitItems = AS_SDK.Utility.ArrayHandler.splitItems(filteredItems, this.state.maxLength);
        oldState.filteredItems = oldState.splitItems[0];
        oldState.navLength = oldState.splitItems.length;

        this.setState(oldState);
    }

    changePage(index) {
        this.setState({
            index,
            filteredItems: this.state.splitItems[index],
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
            filteredItems: this.state.splitItems[index],
        });
    }

    clearFilters() {

        const splitItems = AS_SDK.Utility.ArrayHandler.splitItems(this.state.items, this.state.maxLength);

        this.setState({
            splitItems,
            filteredItems: splitItems[0],
            cls: "",
            sect: "",
            searchBar: "",
            index: 0,
            navLength: splitItems.length
        });
    }

    render() {
        return (
            <section id="userTableSection">
                <h2 className="page-header">Tabella Studenti</h2>
                <section className="row">
                    <SearchBar onChange={e => this.onChange(e, "searchBar")} value={this.state.searchBar}/>

                    <ClassSelector value={this.state.cls} onChange={e => this.onChange(e, "cls")}
                                   options={this.state.classes} placeholder="Classe"/>

                    <ClassSelector value={this.state.sect} onChange={e => this.onChange(e, "sect")}
                                   options={this.state.departments} placeholder="Sezione"/>

                    <button className="btn btn-default clearBtn" onClick={this.clearFilters}>Pulisci Filtri</button>
                </section>
                <JsonTable rows={this.state.filteredItems} columns={this.state.columns} className="table"/>
                <hr/>
                <section id="pagSection">
                    <p>pagina {this.state.index + 1}</p>
                    <Navigator length={this.state.navLength} onItemClick={this.changePage}
                               onArrowClick={this.navigate}/>
                </section>
            </section>
        );
    }

}

export default UserTable;
