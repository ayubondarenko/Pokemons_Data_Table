import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";
import "webpack-icons-installer/bootstrap";
import "../app.css";
import React, {Component} from "react";
import {connect} from "react-redux";
import {StickyContainer, Sticky} from "react-sticky";
import TableBody from "../components/TableBody.jsx";

class Pokemons extends Component {

    constructor(props) {
        super(props);
        this.props.initData(1, this.props.pageLimit, this.props.pokemons);
        this.filterStrByName = '';
        this.filterStrByType = {name: 'All', index: '-1'};
        this.pageLimit = this.props.pageLimit;
        this.currentPage = this.props.currentPage;
    }

    isLastPage() {
        return this.props.currentPage * this.props.pageLimit >= this.props.length;
    }


    onSearchRemove = (evt) => {
        this.currentPage = 1;
        this.filterStrByName = '';
        this.filterStrByType = {name: 'All', index: '-1'};
        this.goToPage();
        this.searchInput.value = '';
    };

    onSearchByName = (evt) => {
        this.filterStrByName = evt.target.value;
        this.currentPage = 1;
        this.goToPage();
    };

    onPreviousPage = () => {
        if (this.props.currentPage < 2) return;
        this.currentPage -= 1;
        this.goToPage();
    };

    onNextPage = () => {
        if (this.isLastPage()) return;
        this.currentPage += 1;
        this.goToPage();
    };

    onTypeSelect = (evt) => {
        this.filterStrByType = {
            name: evt.target.getAttribute('name'),
            index: evt.target.getAttribute('index')
        };
        this.goToPage();
    };
    onPageLimitSelect = (evt) => {
        this.currentPage = 1;
        this.pageLimit = parseInt(evt.target.getAttribute('value'));
        this.goToPage();
    };

    goToPage() {
        this.props.goToPage(
            this.props.pokemons,
            this.props.types,
            this.currentPage,
            this.pageLimit,
            this.filterStrByName,
            this.filterStrByType);
    };

    render() {
        // this.filterStrByName = this.colByName('name').searchTerm;
        // console.log('Pokemons props:', this.props);
        return (
            <StickyContainer>
                <Sticky>
                    {({style}) => (
                        <nav style={style}
                             class="navbar navbar-default bg-dark justify-content-between navbarText ">
                            <div class=" d-flex flex-row">
                                <div class="form-inline nav-item d-none d-md-block p-2">
                                    <div class="navbar-brand ">Pokemons</div>
                                </div>
                                <div class="nav-item dropdown p-2">
                                    <div class="nav-link dropdown-toggle navbar-brand"
                                         data-toggle="dropdown"
                                         role="button" aria-haspopup="true"
                                         aria-expanded="false">
                                        {this.filterStrByType.name[0].toUpperCase() +
                                        this.filterStrByType.name.substr(1) }
                                    </div>
                                    <div class="dropdown-menu">
                                        <div class="dropdown-item"
                                             index="-1" name={'All'}
                                             onClick={e => this.onTypeSelect(e)}>All
                                        </div>
                                        {this.props.types.map((type, i) => (
                                            <div class="dropdown-item"
                                                 index={i.toString()} name={type.name}
                                                 onClick={e => this.onTypeSelect(e)}>{type.name}</div>
                                        ))}
                                    </div>
                                </div>
                                <div class="form-inline nav-item">
                                    <input
                                        type="text"
                                        ref={(input) => {
                                            this.searchInput = input
                                        }}
                                        onChange={e => this.onSearchByName(e)}
                                        class="form-control"
                                        placeholder="Search"/>
                                </div>
                                <div class="form-inline nav-item">
                                    <button onClick={e => this.onSearchRemove(e)}
                                            data-toggle="tooltip" data-placement="bottom" title="clean"
                                            class="navbar-button glyphicon glyphicon-remove bg-dark btn btn-secondary ">
                                    </button>
                                </div>
                            </div>

                            <div class="d-flex flex-row">

                                <div class="form-inline nav-item">
                                    <button onClick={e => this.onPreviousPage(e)}
                                            disabled={this.props.currentPage === 1}
                                            type="button"
                                            data-toggle="tooltip" data-placement="bottom" title="previous page"
                                            class="nav-item glyphicon glyphicon-chevron-left bg-dark btn btn-secondary navbar-button p-2">
                                    </button>
                                </div>
                                <div class="form-inline nav-item">
                                    <button onClick={e => this.onNextPage(e)}
                                            disabled={this.isLastPage()}
                                            type="button"
                                            data-toggle="tooltip" data-placement="bottom" title="next page"
                                            class="nav-item glyphicon glyphicon-chevron-right bg-dark btn btn-secondary navbar-button p-2">
                                    </button>
                                </div>
                                <div class="nav-item dropdown p-2">
                                    <div class="nav-link dropdown-toggle navbar-brand"
                                         data-toggle="dropdown"
                                         role="button" aria-haspopup="true"
                                         aria-expanded="false">On page {this.props.pageLimit}
                                    </div>
                                    <div class="dropdown-menu">
                                        <div class="dropdown-item"
                                             value="5"
                                             onClick={e => this.onPageLimitSelect(e)}>{' 5'}
                                        </div>
                                        <div class="dropdown-item"
                                             value="10"
                                             onClick={e => this.onPageLimitSelect(e)}>{'10'}
                                        </div>
                                        <div class="dropdown-item"
                                             value="20"
                                             onClick={e => this.onPageLimitSelect(e)}>{'20'}
                                        </div>
                                        <div class="dropdown-item"
                                             value="50"
                                             onClick={e => this.onPageLimitSelect(e)}>{'50'}
                                        </div>
                                    </div>

                                </div>
                                <div class="form-inline nav-item">
                                    <img src={"./pics/pokemons.png"} class="nav-picture"
                                         alt='pokemons'/>
                                </div>
                            </div>


                        </nav>
                    )}
                </Sticky>


                <TableBody
                    onColMove={this.props.onColMove}
                    onColSet={this.props.onColSet}
                    sort={this.props.sort}
                    columns={this.props.columns}
                    data={this.props.pageData}
                    dataName={'POKEMON'}
                />
                {this.props.loading ?
                    <div className="text-center flex ">
                        <div class="loader"></div>
                    </div>
                    : ""}
                {this.props.error ?
                    <div className="text-center ">
                        <div >
                            <h2>
                                <pre class="error">{this.props.error}</pre>
                            </h2>
                        </div>
                    </div>
                    : ""}
            </StickyContainer>
        )
    }
}

export default connect(state => (
        {
            ...state.pokemons
        }),
    dispatch => ({
        onColSet: (col, widthMin) => {
            dispatch({
                type: 'SET_POKEMONS_COL', payload: {col: col, width: widthMin}
            });
        },
        onColMove: (col, xDiff, widthMin) => {
            dispatch({
                type: 'MOVE_POKEMONS_COL', payload: {col: col, xDiff: xDiff, widthMin: widthMin}
            });
        },

        goToPage: (pokemons, types, currentPage, pageLimit, filterStrByName, filterStrByType) => {
            dispatch({
                type: 'GET_POKEMON_PAGE', payload: {
                    pokemons, types,
                    currentPage, pageLimit, filterStrByName, filterStrByType
                }
            });
        },
        initData: (currentPage, pageLimit) => {
            dispatch({type: 'FETCH_POKEMONS', payload: {currentPage, pageLimit}});
        }
    })
)
(Pokemons)