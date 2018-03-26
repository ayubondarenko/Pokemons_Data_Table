/**
 * Created by alexander on 24.01.18.
 */
import React, {Component} from "react";
import CellByType from "../containers/CellByType.jsx";
import ColResizer from "../components/ColResizer.jsx";

export default class TableBody extends Component {
    constructor(props) {
        super(props);
        this.widthMin = 60;
    }

    onColMove = (col, xDiff) => {
        this.props.onColMove(col, xDiff, this.widthMin );
    };

    onColSet = (col) => {
        const mCol = document.getElementById(col.name);
        this.props.onColSet(col, mCol.offsetWidth );
    };

    render() {
        // console.log('TableBody:', this.props)
        return (
            <table class="table-bordered table-light table-fix">
                <thead>
                <tr class="bg-light">
                    {
                        this.props.columns ? this.props.columns.map(col => (
                                <th class="col-hd"
                                    style={{width: col.width}}>
                                    <div class="d-flex justify-content-start">
                                        <div id={col.name} class="col-name">{col.title}</div>

                                        <ColResizer col={col}
                                                    onDoubleClick = {this.onColSet}
                                                    onColMove={this.onColMove}/>
                                    </div>
                                </th>
                            )) : <h3> wait a bit please... </h3>
                    }
                </tr>
                </thead>
                <tbody>

                {this.props.data ? this.props.data.map(d => (
                    <tr key={d.id} class={d.select ? "selected" : "notSelected"}>

                        {this.props.columns.map(col => {
                            return <CellByType col={col}
                                               id={d.id}
                                               value={d[col.name]}
                                               dataName={this.props.dataName}
                            />
                        })}
                    </tr>
                )) : ''}
                </tbody>
            </table>

        )
    }
}
