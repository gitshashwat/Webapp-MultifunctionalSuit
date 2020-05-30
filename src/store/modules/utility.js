/* ENUM or Stucture
   "loading": ["true", "false"]
   "notifications": [{
       id: state.utility.notifications.length++,
       type: ["toast-success", "toast-error", "toast-warning", "toast-default"],
       title: "", description: "", duration: ["", "1", "10000"], active: ["true", "false"]}]
   "processingData": [{filename: "", notificationId: ""}] */

export default {
    "state": {
        "loading": false,
        "notifications": [],
        "processingData": []
    },
    "mutations": {
        loading (state, payload) {

            state.loading = payload

        },
        notificationPush (state, payload) {

            let len = state.notifications.length++,
                temp = {...payload,
                    "id": len}
            if (!payload.duration) {

                temp = {...payload,
                    "duration": 5000}

            }
            state.notifications.push(temp)

        },
        notificationDismiss (state, payload) {

            let index = state.notifications.map((item) => {

                return item.id

            }).indexOf(payload.id)
            state.notifications[index].active = false

        },
        processingDataPush (state, payload) {

            state.processingData.push(payload)

        },
        processingDataComplete (state, payload) {

            let index = state.processingData.map((item) => {

                    return item.filename

                }).indexOf(payload.filename),
                notificationId = state.processingData[index].notificationId,
                notificationsIndex = state.notifications.map((item) => {

                    return item.id + 1

                }).indexOf(notificationId)

            state.notifications[notificationsIndex].active = false
            state.processingData.splice(index, 1)

        }
    },
    "actions": {
        loader ({commit}, payload) {

            commit("loading", payload)

        },
        notifications ({commit}, [
            notification,
            action
        ]) {

            if (action === "push") {

                commit("notificationPush", notification)

            } else if (action === "dismiss") {

                commit("notificationDismiss", notification)

            }

        },
        processingData ({commit}, [
            processingFile,
            action
        ]) {

            if (action === "push") {

                commit("processingDataPush", processingFile)

            } else if (action === "complete") {

                commit("processingDataComplete", processingFile)

            }

        }
    },
    "getters": {
        "isLoading": state => state.loading,
        "notifications": state => state.notifications.filter(notification => notification.active),
        "getNotificationId": state => state.notifications.length++,
        "processingData": state => state.processingData
    }
}
