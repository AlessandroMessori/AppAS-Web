"use strict";
import React from "react";
import JsonTable from "react-json-table";
import SearchBar from "../searchBar/searchBar";
import ClassSelector from "../classSelector/classSelector";
import AS_SDK from "../../lib/index";
import "./userTable.scss";

class Header extends React.Component {

    constructor(props) {
        super(props);

        this.data = AS_SDK.Settings.Configs;

        this.state = {
            departments: this.data.departments,
            classes: this.data.classes,
            numbers: this.data.numbers,
            cls: "",
            sect: "",
            filteredItems: [],
            items: [],
            searchBar: ""
        };

        this.render = this.render.bind(this);
        this.onChange = this.onChange.bind(this);
        this.clearFilters = this.clearFilters.bind(this);
    }

    componentDidMount() {
        AS_SDK.Database.UserHandler.getUsers(users => {
            this.setState({items: users, filteredItems: users});
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
                <JsonTable rows={this.state.filteredItems} className="table"/>
            </section>
        );
    }

}

export default Header;
