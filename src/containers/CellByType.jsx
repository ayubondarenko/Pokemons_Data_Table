/**
 * Created by alexander on 25.01.18.
 */
import React, {Component} from "react";
import {connect} from "react-redux";
import StringCell from "../components/StringCell.jsx";
import AvatarCell from "../components/AvatarCell.jsx";

export default class CellByType extends Component {

    render() {
        let field = null;
        switch (this.props.col.type) {
            case "string":
            case "number":
                field = <StringCell
                    id={this.props.id}
                    name={this.props.col.name} // наименование колонки
                    value={this.props.value}
                    dataName={this.props.dataName}
                />;
                break;
            case "avatar":
                field = <AvatarCell
                    id={this.props.id}
                    name={this.props.col.name} // наименование колонки
                    value={this.props.value}
                    dataName={this.props.dataName}
                />;
                break;
        }


        return (
            <td style={{padding: 10, wordWrap: 'break-word', width: this.props.col.width}}>
                {field}
            </td>
        )
    }
}

