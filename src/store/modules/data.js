import axios from "axios"

// an example to fetch data
export default {
    "state": {
        "apidata": []
    },
    "mutations": {
        saveData ({state}, payload) {

            state.apidata = payload

        }
    },
    "actions": {
        apiCall ({commit}) {

            axios.get("https://restcountries.eu/rest/v2/all").then(response => {

                commit("saveData", response.data)

            })

        }
    },
    "getters": {
        "apidata": state => state.apidata
    }
}
