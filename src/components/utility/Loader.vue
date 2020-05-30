<template>
  <div
    class="loader-container"
    v-if="isLoading"
  >
    <atom-spinner
          :animation-duration="1000"
          :size="100"
          :color="'#0d7ad4'"
     />
    <p class="mt-2">{{ message }}</p>
  </div>
</template>

<script>
import {AtomSpinner} from "epic-spinners"
export default {
    "components": {
        AtomSpinner
    },
    data () {

        return {
            "message": "Loading..."
        }

    },
    "computed": {
        "isLoading": function () {

            return this.$store.getters.isLoading

        }
    }
}
</script>

<style lang="sass" scoped></style>
