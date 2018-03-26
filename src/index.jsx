import "bootstrap";
import "babel-polyfill";
import React from "react";
import ReactDOM, {render} from "react-dom";
import {Provider} from "react-redux";
import createSagaMiddleware from "redux-saga";
import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import pokemonSagas from "./sagas/pokemon_sagas";
import reducer from "./reducers";
import Pokemons from './containers/Pokemons'


const sagaMiddleware = createSagaMiddleware();
// const store = createStore(reducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(pokemonSagas);

ReactDOM.render(
    <Provider store={store}>
        <Pokemons/>
    </Provider>
    , document.getElementById('app'));

