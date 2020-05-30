/* Import Vue Packages
 * axios - https://vuejs.org/v2/cookbook/using-axios-to-consume-apis.html
 * v-select - https://vue-select.org/
 * v-pagination - https://www.npmjs.com/package/vuejs-paginate */
import Vue from "vue"
import axios from "axios"
import vSelect from "vue-select"
import Paginate from "vuejs-paginate"
import vSlider from "vue-slider-component"
import "vue-slider-component/theme/default.css"

Vue.component("v-select", vSelect)
Vue.component("paginate", Paginate)
Vue.component("v-slider", vSlider)

/* Google Authentication and Google Analytics
 * Generate oauth2 token and gtag token and give permissions to app url
 * Use console.developers.google.com to get oauth2 token
 * Use analytics.google.com to get gtag token */
import gAuth from "@/gAuth"
import gAnalytics from "@/gAnalytics"

/* Learn more about state management
 * https://vuex.vuejs.org/guide/state.html */
import store from "@/store/index"

/* Learn more about router
 * https://router.vuejs.org/ */
import router from "@/router/index"

/* Learn more about filters
 * https://vuejs.org/v2/guide/filters.html */
import {} from "@/filter/index"

// Import base app template
import App from "@/App.vue"

// Checking AUthenticate loads the page
const token = sessionStorage.getItem("jwt")
if (token) {

    // Attach token to all header requests.
    axios.defaults.headers.common.Authorization = token

    // Check every 60 seconds if Google Authentication Token has expired
    store.dispatch("expiredToken")

}

Vue.config.productionTip = false

new Vue({
    gAuth,
    gAnalytics,
    store,
    router,
    "render": h => h(App)
}).$mount("#app")
