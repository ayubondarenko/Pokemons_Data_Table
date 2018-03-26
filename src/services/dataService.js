/**
 * Created by alexander on 23.03.18.
 */
import axios from "axios"


// Возвращае массив индексов пакемонов которые удвлетворяют фильтру.
export const filterPokemons = (statePokemons, typePokemons) => {

        //фильтровать по типам или заполнять типы или вообще ничего не делать с типами
        let typeIndex = -1;
        let whatDoWithType = 'Nothing';
        if (statePokemons.filterStrByType && statePokemons.filterStrByType.index) {
            if (statePokemons.filterStrByType.index !== '-1') {
                typeIndex = parseInt(statePokemons.filterStrByType.index);
                if (statePokemons.types[typeIndex].filled) whatDoWithType = 'NeedToFilter';

                else if (typePokemons && typePokemons.length) whatDoWithType = 'NeedToUpdate'
            }
        }

//границы страницы
        const i1 = (statePokemons.currentPage - 1) * statePokemons.pageLimit;
        const i2 = i1 + statePokemons.pageLimit - 1;
        let foundElements = 0;
        const filterRegByName = new RegExp(statePokemons.filterStrByName);
        const indexes = statePokemons.pokemons.reduce((acc, pok, i) => {

            if (whatDoWithType === 'NeedToUpdate') {
                const notFoundInTypePokemons = typePokemons.every(tpPok => (
                tpPok.pokemon.name !== pok.name));
                if (notFoundInTypePokemons) return acc;
                pok.type = (pok.type ? pok.type + ' ' : '') + statePokemons.types[typeIndex].name;
            }
            if (whatDoWithType === 'NeedToFilter') {
                if (!pok.type) return acc;
                const regType = new RegExp('\\b' + statePokemons.types[typeIndex].name + '\\b');
                if (!pok.type.match(regType)) return acc;
            }

            if (!pok.name.match(filterRegByName)) return acc;

            foundElements += 1;
            if (foundElements - 1 < i1 || foundElements - 1 > i2) return acc;
            return [...acc, i];
        }, []);
        if (whatDoWithType === 'NeedToUpdate') statePokemons.types[typeIndex].filled = true;
        return {foundElements, indexes};
    };


// export function fetchTypeData() {
//     return axios.get('https://pokeapi.co/api/v2/type/')
//         .then(response => ({ response }))
//         .catch(error => ({ error }))
// }
//
// export function fetchPokemonData() {
//     return axios.get('https://pokeapi.co/api/v2/pokemon?limit=9999999999')
//         .then(response => ({ response }))
//         .catch(error => ({ error }))
// }

