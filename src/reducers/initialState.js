/**
 * Created by alexander on 22.03.18.
 */

export default () => ({
    pageLimit: 5,
    currentPage: 1,
    searchName: '',
    searchType: '',
    pokemons: [],
    pageData:[],
    types: [],
    columns: [
        {
            num: 1,
            name: "id",
            title: "№",
            type: "number",
            width: 40
        },
        {
            num: 2,
            name: "avatar",
            title: "Avatar",
            type: "avatar",
            editable: true,
            width: 100
        },
        {
            num: 3,
            name: "name",
            title: "Name",
            type: "string",
            width: 100
        },
        {
            num: 4,
            name: "base_experience",
            title: "Base experience",
            type: "string",
            width: 100
        },
        {
            num: 5,
            name: "weight",
            title: "Weight",
            type: "string",
            width: 100
        },
        {
            num: 6,
            name: "height",
            title: "Height",
            type: "string",
            width: 100
        },
        {
            num: 7,
            name: "type",
            title: "Type",
            type: "string",
            width: 100
        }

    ]
});
