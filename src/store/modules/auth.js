import axios from "axios"

import router from "@/router/index"
/* global gapi */

/* ENUM or Stucture
   "status": ["loading", "success", "error"]
   "token": "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc5YzgwOWRkMT..."
   "user": {SU: "", Ad: "", vW: "", wU: "", UK: "", zu: ""}
   user.getName(); user.getEmail() */

export default {
    "state": {
        "status": "",
        "token": sessionStorage.getItem("jwt") || "",
        "user": {}
    },
    "mutations": {
        authRequest (state) {

            state.status = "loading"

        },
        authSuccess (state, token, user) {

            state.status = "success"
            state.token = token
            state.user = user

        },
        authError (state) {

            state.status = "error"

        },
        logout (state) {

            state.status = ""
            state.token = ""

        }
    },
    "actions": {
        login ({dispatch, commit, rootState}) {

            return new Promise((resolve, reject) => {

                commit("authRequest")
                gapi.auth2.getAuthInstance().signIn().
                    then(() => {

                        const authRes = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse(),
                            token = authRes.id_token,
                            expiresAt = authRes.expires_at,
                            user = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile()

                        commit("authSuccess", {"token": token,
                            "user": user})
                        sessionStorage.setItem("jwt", token)
                        sessionStorage.setItem("expireJWT", expiresAt)
                        sessionStorage.setItem("userEmail", user.getEmail())

                        // Attach token to all header requests.
                        axios.defaults.headers.common.Authorization = token

                        let notification = {
                            "id": rootState.utility.notifications.length++,
                            "active": true,
                            "type": "toast-success",
                            "title": `Welcome! ${user.getName()}`,
                            "description": "Hi, You are successfully signed in."
                        }
                        dispatch("notifications", [
                            notification,
                            "push"
                        ])
                        dispatch("expiredToken")
                        resolve(authRes)

                    }).
                    catch(error => {

                        commit("authError")
                        sessionStorage.removeItem("jwt")
                        sessionStorage.removeItem("expireJWT")

                        let notification = {
                            "id": rootState.utility.notifications.length++,
                            "active": true,
                            "type": "toast-error",
                            "title": "Authentication Failed",
                            "description": "Something went wrong. Please try again later."
                        }
                        dispatch("notifications", [
                            notification,
                            "push"
                        ])
                        reject(new Error(error))

                    })

            })

        },
        logout ({dispatch, commit, rootState}) {

            return new Promise((resolve, reject) => {

                gapi.auth2.getAuthInstance().signOut().
                    then(() => {

                        commit("logout")
                        sessionStorage.removeItem("jwt")
                        sessionStorage.removeItem("expireJWT")
                        sessionStorage.clear()
                        delete axios.defaults.headers.common.Authorization
                        let notification = {
                            "id": rootState.utility.notifications.length++,
                            "active": true,
                            "type": "toast-warning",
                            "title": "See you soon",
                            "description": "Hi, You are successfully signed out."
                        }
                        dispatch("notifications", [
                            notification,
                            "push"
                        ])
                        resolve()

                    }).
                    catch(error => {

                        let notification = {
                            "id": rootState.utility.notifications.length++,
                            "active": true,
                            "type": "toast-error",
                            "title": "Failed!",
                            "description": "Something went wrong. Please try again later."
                        }
                        dispatch("notifications", [
                            notification,
                            "push"
                        ])
                        reject(new Error(error))

                    })

            })

        },
        isValidSession ({state}) {

            /* TODO: check if session is valid
               const authRes = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse(),
               token = authRes.id_token,
               expiresAt = authRes.expires_at,
               user = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile() */
            if (state.token) {

                return true

            }
            return false


        },
        expiredToken ({dispatch}) {

            let expireJWT = setInterval(() => {

                let expireJWTMillisec = sessionStorage.getItem("expireJWT")
                if (expireJWTMillisec) {

                    let date = new Date(parseInt(expireJWTMillisec, 10)),
                        now = new Date()
                    if (date - now <= 0) {

                        // TODO: Create good alert ui
                        alert("Session Expired. You are logged out.")
                        dispatch("logout").then(() => {

                            router.push({"name": "home"})
                            clearInterval(expireJWT)

                        })

                    }

                } else {

                    clearInterval(expireJWT)

                }

            }, 900000)

        }
    },
    "getters": {
        "isLoggedIn": state => Boolean(state.token),
        "authStatus": state => state.status
    }
}
