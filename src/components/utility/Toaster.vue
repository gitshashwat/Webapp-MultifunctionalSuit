<template>
  <div class="toast-container">
    <transition-group
      name="slide-fade"
      tag="div"
    >
      <Toast
        v-for="(notification, index) of notifications"
        :key="index+0"
        :notification="notification"
        :id="index"
      />
    </transition-group>
  </div>
</template>

<script>
export default {
    "components": {
        "Toast": () => import("@/components/utility/Toast")
    },
    "computed": {
        "notifications": function () {

            return this.$store.getters.notifications

        }
    }
}
</script>

<style lang="sass" scoped>
.list-item
    display: block
.list-enter-active,
.list-leave-active
    transition: all 1s
.list-enter,
.list-leave-to
    opacity: 0
    transform: translateY(40px)
.fade-enter-active,
.fade-leave-active
    transition: opacity .5s
.fade-enter,
.fade-leave-to
    opacity: 0
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active
    transition: all .3s ease
.slide-fade-leave-active
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0)
/* .slide-fade-leave-active below version 2.1.8 */
.slide-fade-enter, .slide-fade-leave-to
    transform: translateY(40px)
    opacity: 0
</style>
