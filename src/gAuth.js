import Vue from "vue"
import GAuth from "vue-google-oauth2"

/* global process */

const gAuth = Vue.use(GAuth, {
    "clientId": process.env.VUE_APP_GAUTH_ID,
    "scope": process.env.VUE_APP_GAUTH_SCOPE,
    "prompt": process.env.VUE_APP_GAUTH_PROMPT
})

export default gAuth
