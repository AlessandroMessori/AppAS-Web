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
            items: [],
            columns: []
        };

        this.render = this.render.bind(this);
        this.onChange = this.onChange.bind(this);
        this.clearFilters = this.clearFilters.bind(this);
    }

    componentDidMount() {
        AS_SDK.Database.UserHandler.getUsers(users => {

            let columns = Object.keys(users[0]);
            columns.push(
                {
                    key: "key",
                    label: (<span>elimina</span>),
                    cell(item, columnKey) {
                        return (
                            <button className="btn btn-danger" onClick={()=>alert("ciao")}>
                                <span className="glyphicon glyphicon-trash"/>
                            </button>
                        );
                    }
                });

            //const splitItems = AS_SDK.Utility.ArrayHandler.splitItems(users, this.state.maxLength);

            this.setState({
                items: users,
                filteredItems: users,
                columns,
               //s navLength: splitItems.length
            });

        });
    }

    onChange(e, source) {
        const oldState = this.state;

        oldState[source] = e.target.value;
        oldState.filteredItems = AS_SDK.Utility.FilterHandler.filterItems(oldState.items, oldState.searchBar, oldState.cls, oldState.sect);

        this.setState(oldState);
    }

    clearFilters() {
        this.setState({
            filteredItems: this.state.items,
            cls: "",
            sect: "",
            searchBar: ""
        });
    }

    render() {
        return (
            <section id="userTableSection">
                <h2 className="page-header">Tabella Studenti</h2>
                <section className="row">
                    <SearchBar onChange={e => this.onChange(e, "searchBar")} value={this.state.searchBar}/>

                    <ClassSelector value={this.state.cls} onChange={e => this.onChange(e, "cls")}
                                   options={this.state.classes} placeholder="Filtra Classi"/>

                    <ClassSelector value={this.state.sect} onChange={e => this.onChange(e, "sect")}
                                   options={this.state.departments} placeholder="Filtra Sezione"/>

                    <button className="btn btn-default clearBtn" onClick={this.clearFilters}>Pulisci Filtri</button>
                </section>
                <JsonTable rows={this.state.filteredItems} columns={this.state.columns} className="table"/>
                <hr/>
                <Navigator length={this.state.navLength}/>
            </section>
        );
    }

}

export default UserTable;
