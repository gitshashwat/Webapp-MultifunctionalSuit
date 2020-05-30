<template>
  <div class="template-container">
    <div class="row text-center justify-content-center align-items-center m-0">
      <div class="column column-12">
        <img src="@/assets/images/404.svg" alt="404" height="300">
        <h1>Sorry! Couldn't find what you were looking for.</h1>
        <router-link
        to="/"
        tag="button"
        class="button button-theme"
        >
          Go Back Home
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="sass" scoped></style>
