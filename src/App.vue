<template>
  <div id="app">
    <Loader />
    <Toaster />
    <Header />
    <main class="container-fluid">
      <router-view />
    </main>
  </div>
</template>

<script>
// required packages
import axios from "axios"

export default {
    "components": {
        "Header": () => import("@/components/layout/Header"),
        "Loader": () => import("@/components/utility/Loader"),
        "Toaster": () => import("@/components/utility/Toaster")
    },
    created () {

        let user
        axios.interceptors.response.use(user, (err) => {

            return new Promise(() => {

                // eslint-disable-next-line no-underscore-dangle
                if (err.status === 401 && err.config && !err.config.__isRetryRequest) {

                    this.$store.dispatch("logout")

                }
                throw err

            })

        })

    }
}
</script>

<style lang="sass">
// require main sass file
@import '@/assets/sass/application'
</style>
