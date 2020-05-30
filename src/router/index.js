import Vue from "vue"
import VueRouter from "vue-router"

import store from "@/store/index"

Vue.use(VueRouter)

const router = new VueRouter({
    "mode": "history",
    "routes": [
        {
            "path": "",
            "name": "home",
            "component": () => import(/* webpackChunkName: "home" */ "@/views/Home"),
            "meta": {
                "guest": true
            }
        },
        {
            "path": "/welcome",
            "name": "welcome",
            "component": () => import(/* webpackChunkName: "welcome" */ "@/views/Welcome"),
            "meta": {
                "guest": true
            }
        },
        {
            "path": "*",
            "name": "errors",
            "component": () => import(/* webpackChunkName: "errors" */ "@/views/Errors"),
            "meta": {
                "guest": true
            }
        }
    ]
})

router.beforeEach((to, from, next) => {

    if (to.matched.some(record => record.meta.requiresAuth)) {

        store.dispatch("isValidSession").then(response => {

            if (response) {

                next()
                return

            }
            next({"name": "welcome"})


        })

    } else {

        next()


    }


})

export default router
