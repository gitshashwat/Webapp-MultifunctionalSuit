<template>
  <div
    class="toast toast-default"
    :class="type"
    @click="dismissNotification(notification)"
  >
    <h4
      class="toast-title"
      v-html="title"
    />
    <div class="toast-content">
      <p v-html="description" />
    </div>
  </div>
</template>

<script>
export default {
    "props": {
        "notification": {
            "type": Object,
            "required": true
        },
        "index": {
            "type": Number,
            "default": null
        }
    },
    "computed": {
        "id": function () {

            return this.notification.id

        },
        "active": function () {

            return this.notification.active ? this.notification.active : true

        },
        "type": function () {

            return this.notification.type ? this.notification.type : "toast-default"

        },
        "title": function () {

            return this.notification.title

        },
        "description": function () {

            return this.notification.description

        },
        "duration": function () {

            return this.notification.duration ? this.notification.duration : 5000

        }
    },
    "methods": {
        dismissNotification (notification) {

            this.$store.dispatch("notifications", [
                notification,
                "dismiss"
            ])

        }
    },
    created () {

        if (this.duration !== 1) {

            setTimeout(() => {

                this.dismissNotification(this.notification)

            }, this.duration)

        }

    }
}
</script>

<style lang="sass" scoped></style>
