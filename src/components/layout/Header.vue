<template>
  <header class="header">
    <nav class="navbar">
      <router-link
        to="/"
        class="navbar-brand"
      >
<!--        <img-->
<!--          alt="Vue logo"-->
<!--          src="@/assets/logo-with-text.png"-->
<!--        >-->
      </router-link>

      <button class="navbar-btn navbar-collapse">
        <IosMenuIcon />
      </button>

      <ul class="navbar-nav nav-right">
        <li class="nav-item">
          <router-link
            to="/welcome"
            class="nav-link"
            v-if="isAuthenticated"
          >Welcome</router-link>
        </li>
<!--        <li-->
<!--          class="nav-item"-->
<!--          v-if="!isAuthenticated"-->
<!--        >-->
<!--          <a-->
<!--            href="#"-->
<!--            @click.prevent="signIn($event)"-->
<!--            class="nav-link"-->
<!--          ><LogoGoogleIcon /> Sign in using Google</a>-->
<!--        </li>-->
        <li
          class="nav-item"
          v-if="isAuthenticated"
        >
          <a
            href="#"
            @click.prevent="signOut($event)"
            class="nav-link"
          ><IosLogInIcon /> Sign Out</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import IosMenuIcon from "vue-ionicons/dist/ios-menu.vue"
import LogoGoogleIcon from "vue-ionicons/dist/logo-google.vue"
import IosLogInIcon from "vue-ionicons/dist/ios-log-in.vue"

export default {
    "name": "Header",
    "components": {
        IosMenuIcon,
        LogoGoogleIcon,
        IosLogInIcon
    },
    data () {

        return {
            "timer": null
        }

    },
    "computed": {
        "processingData": function () {

            return this.$store.getters.processingData

        },
        "isAuthenticated": function () {

            return this.$store.getters.isLoggedIn

        }
    },
    "watch": {
        processingData (val) {

            clearInterval(this.timer)
            if (val.length !== 0) {

                this.timerProcessingData()

            } else {

                clearInterval(this.timer)

            }

        }
    },
    "methods": {
        timerProcessingData () {

            this.timer = setInterval(() => {

                this.$store.dispatch("fetchProject")

            }, 10000)

        },
        signIn () {

            this.$store.dispatch("login").then(() => {

                this.$router.push({"name": "welcome"})

            })

        },
        signOut () {

            this.$store.dispatch("logout").then(() => {

                this.$router.push({"name": "welcome"})

            })

        }
    },
    mounted () {

        clearInterval(this.timer)
        if (!this.$store.getters.isLoggedIn) {

            let notification = {
                "id": this.$store.getters.getNotificationId,
                "active": true,
                "type": "toast-warning",
                "title": "Welcome!",
                "description": "Hi!"
            }
            this.$store.dispatch("notifications", [
                notification,
                "push"
            ])

        }

    }
}
</script>

<style lang="sass" scoped></style>
