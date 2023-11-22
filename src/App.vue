<script setup>
  import router from "@/router";

  const token = localStorage.getItem('token')
  const logout = () => {
    localStorage.removeItem('token')
    location.href = '/login'
  }
</script>

<template>
  <header>
    <nav>
      <router-link to="/">Accueil</router-link>
      <router-link to="/movies">Films</router-link>
      <router-link to="/actors">Acteurs</router-link>
      <router-link to="/categories">Categories</router-link>

      <router-link v-if="token" to="/login" @click="logout">Déconnexion</router-link>
      <router-link v-else to="/login">Connexion</router-link>
    </nav>
  </header>
  <RouterView />
</template>

<style scoped>

</style>
