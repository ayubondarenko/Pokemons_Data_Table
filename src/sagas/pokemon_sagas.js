/**
 * Created by alexander on 22.01.18.
 */
import axios from "axios";
import {delay} from "redux-saga";
import {all, call, fork, put, takeLatest} from "redux-saga/effects";
import {filterPokemons} from "../services/dataService";


function* fetchPokemon(action) {
    try {
        let {data: {results:types}} = yield call(axios.get, 'https://pokeapi.co/api/v2/type/');
        let {data: {results:pokemons}} = yield call(axios.get, 'https://pokeapi.co/api/v2/pokemon?limit=9999999999');

        yield put({type: "GET_POKEMON_PAGE", payload: {...action.payload, pokemons, types}});
        yield put({type: "FETCH_POKEMONS_SUCCESS", payload: {...action.payload, types, pokemons}});
    } catch (e) {
        yield put({type: "GET_DATA_FAILED", message: "Loading data error! \nPlease check network..."});
        yield call(console.log, 'ошибка загрузки данных:', e);
    }
}

// Здесь делается мутирующее преобразования массива pokemons. Те элементы массива без данных наполняются данными
// отдельными запросами на сервер. Мутирующее преобразование сделано для того чтобы минимизировать количесво
// обращений к серверу и при этом не не удваивать данные. Фактически программ за одними данными обращается
// на сервер однократно.
function* fetchPokemonPage(action) {
    try {
        const {
            payload: {
                pokemons, types, currentPage,
                pageLimit, filterStrByName, filterStrByType
            }
        } = action;

        //нужно ли запрашивать у сервера данные по выбранному типу пакемонов types[index],
        // за это отвечает параметр types[index].filled
        let typeIndex = -1;
        if (filterStrByType && filterStrByType.index && filterStrByType.index !== '-1') {
            typeIndex = parseInt(filterStrByType.index);
        }
        let {
            data:
                {
                    pokemon: typePokemons
                }
        } =  typeIndex !== -1 ? yield  call(axios.get, types[typeIndex].url) : {data: {pokemon: []}};

        const {foundElements, indexes} = yield call(filterPokemons, action.payload, typePokemons);
        const filterRegByName = new RegExp(filterStrByName);
        // этот прохоод по найденым элементам заполняет свойствами еще не заполненные элементы.
        let pageData = [];
        for (let i = 0; i < indexes.length; i++) {
            if (!pokemons[indexes[i]].id) {
                const {
                    data:
                        {
                            types, height, weight, id, base_experience,
                            sprites:{front_default: avatar}
                        }
                } = yield  call(axios.get, pokemons[indexes[i]].url);

                let type = yield types.reduce(((acc, tp) => (acc + ' ' + tp.type.name)), '');
                yield pokemons[indexes[i]] = {
                    ...pokemons[indexes[i]],
                    height,
                    weight,
                    id,
                    avatar,
                    type,
                    base_experience
                };

                if (i < indexes.length) yield put({
                    type: "GET_POKEMON_PAGE_GETTING",
                    payload: {...action.payload, pageData: [...pageData, pokemons[indexes[i]]], length: foundElements}
                });

                // yield call(console.log, 'нужные данные', action.payload.pokemons[i]);
            }
            pageData = yield [...pageData, pokemons[indexes[i]]];
        }

        yield put({
            type: "GET_POKEMON_PAGE_SUCCESS",
            payload: {...action.payload, pageData, length: foundElements}
        });
    } catch (e) {
        yield call(console.log, 'ошибка загрузки данных:', e);
        yield put({type: "GET_DATA_FAILED", message: e});
    }
}

function* fetchPokemonSaga() {
    yield takeLatest('FETCH_POKEMONS', fetchPokemon);
}

function* fetchPageSaga() {
    yield takeLatest('GET_POKEMON_PAGE', fetchPokemonPage);
}

export default function* pokemonSagas() {
    yield all([
        fork(fetchPokemonSaga),
        fork(fetchPageSaga),
    ]);
}