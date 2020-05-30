<template>
    <div class="card">
        <h3 class="card-title">
        {{ title }}
        </h3>
        <div class="card-content">
        {{ description }}
        </div>
    </div>
</template>

<script>
export default {
    "props": {
        "title": {
            "type": String,
            "required": true
        },
        "description": {
            "type": String,
            "required": true
        }
    }
}
</script>

<style lang="sass" scoped></style>
