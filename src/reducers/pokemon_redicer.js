/**
 * Created by alexander on 23.01.18.
 */
import initialState from "./initialState";

const initState = initialState();
export default function pokemon(state = initState, action) {

    if (action.type === 'GET_DATA_FAILED') {
        console.log('Ошибка:', action.message);
        return {...state, error: action.message, loading: false};
    }

    if (action.type === 'REMOVE_POKEMONS_FILTER') {
        const newColumns = state.columns.map((col) => {
            return {...col, searchTerm: ''};
        });
        return {...state, columns: newColumns};
    }


    if (action.type === 'FILTER_USER_COL') {
        const newColumns = state.columns.map((col) => {
            if (col.name === action.payload.col.name) {
                const newCol = {...col, searchTerm: action.payload.searchTerm};
                return newCol;
            } else return col;
        });
        return {...state, columns: newColumns};
    }


    if (action.type === 'SET_POKEMONS_COL') {
        const newColumns = state.columns.map((col) => {
            if (col.name === action.payload.col.name) {
                col.width = action.payload.width;
                const newCol = {...col, width: col.width};
                return newCol;
            } else return col;
        });
        return {...state, columns: newColumns};
    }

    if (action.type === 'MOVE_POKEMONS_COL') {
        const newColumns = state.columns.map((col) => {
            if (col.name === action.payload.col.name) {
                col.width = col.width + action.payload.xDiff;
                if (col.width < action.payload.widthMin)
                    col.width = action.payload.widthMin;
                const newCol = {...col, width: col.width};
                return newCol;
            } else return col;
        });
        return {...state, columns: newColumns};
    }

    if (action.type === 'CHANGE_SEARCH_TERM') {

        if (action.payload) {
            const newColumns = state.columns.map((col) => {
                if (col.name === action.payload.col.name) {
                    return {...col, searchTerm: action.payload.searchTerm};
                } else return col;
            });
            return {...state, columns: newColumns};
        }
        return state;
    }

    if (action.type === 'GET_POKEMON_PAGE_SUCCESS') {
        return {...state, ...action.payload, loading: false};
    }

    if (action.type === 'GET_POKEMON_PAGE' || action.type === 'FETCH_POKEMONS') {
        return {...state, loading: true};
    }

    if (action.type === 'GET_POKEMON_PAGE_GETTING') {
        return {...state, ...action.payload};
    }

    if (action.type === 'FETCH_POKEMONS_SUCCESS') {
        // console.log('FETCH_POKEMONS_SUCCESS',{...state, ...action.payload});
        return {...state, ...action.payload};
    }

    return state;

}
