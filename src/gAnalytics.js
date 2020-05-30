import Vue from "vue"
import GAnalytics from "vue-analytics"

/* global process */

import router from "@/router/index"

const gAnalytics = Vue.use(GAnalytics, {
    "id": process.env.VUE_APP_GANALYTICS_ID,
    router
})

export default gAnalytics
