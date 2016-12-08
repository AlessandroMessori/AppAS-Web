"use strict";
import React from "react";
import UserCard from "../userCard/userCard";
//import "mobileTable.scss";

class MobileTable extends React.Component {

    constructor(props) {
        super(props);
        this.getCards = this.getCards.bind(this);
    }

    getCards() {
        let cards = [];
        this.props.items.map(item => cards.push(<UserCard user={item} key={item.mail}/>));
        return cards;
    }

    render() {
        return (
            <section id={this.props.id}>
                {this.getCards()}
            </section>);
    }

}

export default MobileTable;
