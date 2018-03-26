/**
 * Created by alexander on 25.01.18.
 */
import React, {Component} from "react";

export default class AvatarCell extends Component {


    render() {

        return (
            <div style={{width: 'inherit', padding: 0}}>
                <img class="avatar" src={this.props.value} alt="avatar"/>
            </div>
        )
    }
}