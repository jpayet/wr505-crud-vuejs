<script setup>

</script>

<template>
  <header>
    <nav>
      <router-link to="/">Accueil</router-link>
      <router-link to="/movies">Films</router-link>
      <router-link to="/actors">Acteurs</router-link>
      <router-link to="/categories">Categories</router-link>
    </nav>
  </header>

  <h1>Accueil</h1>

  <RouterView />
</template>

<style scoped>

</style>
