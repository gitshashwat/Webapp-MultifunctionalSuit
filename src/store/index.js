import Vue from "vue"
import Vuex from "vuex"

import auth from "@/store/modules/auth"
import utility from "@/store/modules/utility"
import data from "@/store/modules/data"
import upload from "@/store/modules/upload"
/* global process */

Vue.use(Vuex)

export default new Vuex.Store({
    "strict": process.env.NODE_ENV !== "production",
    "state": {
        "vueEnv": process.env,
        "apiBase": `${process.env.VUE_APP_APIBASE}/${process.env.VUE_APP_ENV}/`
    },
    "getters": {
        "vueEnv": state => state.vueEnv,
        "apiBase": state => state.apiBase
    },
    "mutations": {},
    "actions": {},
    "modules": {
        auth,
        utility,
        data,
        upload
    }
})
