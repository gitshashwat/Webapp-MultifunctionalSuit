<template>
  <div class="template-container">
<!--    <h1>Welcome!</h1>-->
       <div class="mt-5"></div>
    <div class="d-flex justify-content-space-around">
      <div class="column">
        <label>BODY TEMPERATURE</label>
        <div class="demo-box">
            <v-slider
                    v-model="temp"
                    :marks="tempmarks"
                    :min=95
                    :max=110
                    :tooltip="'always'"
                    :disabled="true"
            >
            </v-slider>
        </div>
      </div>
      <div class="column">
        <label>PULSE RATE</label>
        <div class="demo-box"> <v-slider
                v-model="pulse"
                :interval="10"
                :marks="pulsemarks"
                :tooltip="'always'"
                :disabled="true"
        >
        </v-slider></div>
      </div>
      <div class="column">
        <label>OUTSIDE TEMPERATURE</label>
        <div class="demo-box">
          <v-slider
                v-model="envtemp"
                :interval="10"
                :min=70
                :max=110
                :marks="tempmarks1"
                :tooltip="'always'"
                :disabled="true"
        >
        </v-slider></div>
      </div>
    </div>
    <div class="mt-5"></div>
    <div class="mt-5"></div>

    <div class="d-flex justify-content-space-around">
  <div class="column">
    <button class="button button-theme" @click.prevent="getInstance()">Get Status</button>
  </div>
  </div>

      <div>    <Footer /></div>
  </div>


</template>

<script>
import axios from "axios"
export default {
    "components": {
        "Footer": () => import("@/components/layout/Footer")
    },
    data () {

        return {
            "tempmarks": {
                "95": {"label": "95°F"},
                "110": {"label": "110°F"}
            },
            "tempmarks1": {
                "70": {"label": "70°F"},
                "110": {"label": "110°F"}
            },
            "pulsemarks": [
                0,
                100
            ],
            "temp": 95,
            "pulse": 0,
            "heartrate": 0,
            "country": "",
            "cities": [
                "Bangalore",
                "Delhi",
                "Mumbai",
                "Chennai",
                "Kochi",
                "Kolkata",
                "Jaipur",
                "New Delhi",
                "Pune",
                "Rachi"
            ],
            "city": [],
            "envtemp": 70
        }

    },
    "methods":
{
    getInstance () {

        this.$store.dispatch("loader", true)

        axios.get("https://formal-branch-254305.firebaseio.com/.json", {
        }).
            then(response => {

                return response.data

            }).
            then(response => {

                // eslint-disable-next-line no-console
                console.log(response)
                this.temp = response.body_temp
                this.pulse = response.pulse_rate
                this.envtemp = response.env_temp

            }).
            finally(() => {

                this.$store.dispatch("loader", false)

            })

    }

},
    created () {

        // this.getInstance()


    }

}
</script>

<style lang="css" scoped>
  .vue-slider {
    width: 150px !important;
  }

</style>
