"use strict";
import React from "react";
import JsonTable from "react-json-table";
import SearchBar from "../searchBar/searchBar";
import AS_SDK from "../../lib/index";
import includes from "lodash/includes";
import "./userTable.scss";

class Header extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            filteredItems: [],
            items: [],
            searchBarValue: ""
        };

        this.render = this.render.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        AS_SDK.Database.UserHandler.getUsers(users => {
            this.setState({items: users, filteredItems: users});
        });
    }

    onChange(e) {
        const oldState = this.state;
        oldState.searchBarValue = e.target.value;

        oldState.filteredItems = this.filterItems(oldState.items, oldState.searchBarValue);

        this.setState(oldState);
    }

    filterItems(items, field) {
        return items.filter(el => {
            let result = false;

            Object.keys(el).map(key => {

                if (includes(el[key], field)) {
                    result = true;
                }
            });

            return result;
        });
    }


    render() {
        return (
            <section id="userTableSection">
                <h2 className="page-header">Tabella Studenti</h2>
                <SearchBar onChange={e => this.onChange(e)} value={this.state.searchBarValue}/>
                <JsonTable rows={this.state.filteredItems} className="table"/>
            </section>
        );
    }
}

export default Header;
