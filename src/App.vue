<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
      <header class="d-flex flex-column align-items-center justify-content-center text-center mt-4">
        <div>
          <img alt="Vue logo" class="logo" src="/wardrobe.jpeg" width="125" height="125" />
        </div>
        <h2 class="mt-3">Wardrobe Management System</h2>
      </header>


  <RouterView />
</template>

<style scoped>


</style>
