/**
 * Created by alexander on 25.01.18.
 */
import React, {Component} from "react";

export default class StringCell extends Component {


    render() {
        this.value = this.props.value === undefined ? '' : this.props.value;
        return (
            <div style={{width: 'inherit', padding: 0}}>
                <div class="text-view"
                     id={this.props.id}> {this.props.value}</div>
            </div>
        )
    }
}