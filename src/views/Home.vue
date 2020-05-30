<template>
  <div class="template-container">
    <div class="row text-center justify-content-center align-items-center m-0">
<!--      <div class="column column-4 column-sm-12">-->
<!--        <h1><LogoGoogleIcon /></h1>-->
<!--        <h4>AUTHENTICATE</h4>-->
<!--        <p>Authenticate using Google</p>-->
<!--      </div>-->

      <div class="column column-4 column-sm-12">
        <h1><iosShirtIcon /></h1>
        <h4 @click="i1()">Multi-functional Suit</h4>
        <p>A Cloth integrated with Temperature, Pulse and ECG sensors</p>
      </div>

<!--      <div class="column column-4 column-sm-12">-->
<!--        <h1><IosStatsIcon /></h1>-->
<!--        <h4>VISUALIZE</h4>-->
<!--        <p>Lorem ipsum, dolor sit amet consectetur.</p>-->
<!--      </div>-->
    </div>

    <Footer />
  </div>
</template>

<script>
export default {
    "components": {
        "LogoGoogleIcon": () => import("vue-ionicons/dist/logo-google.vue"),
        "IosCloudUploadIcon": () => import("vue-ionicons/dist/ios-cloud-upload.vue"),
        "IosStatsIcon": () => import("vue-ionicons/dist/ios-stats.vue"),
        "iosShirtIcon": () => import("vue-ionicons/dist/ios-shirt.vue"),
        "Footer": () => import("@/components/layout/Footer")
    },
    "methods":
        {
            i1 () {

                // eslint-disable-next-line no-console
                console.log("yo")
                this.$router.push({"name": "welcome"})

            }
        }
}
</script>

<style lang="sass" scoped></style>
