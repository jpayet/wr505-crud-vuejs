<script setup>
  import {onMounted, ref} from 'vue'
  import MovieCard from "../components/MovieCard.vue"

  const data = ref()

  onMounted(async () => {
    const response = await fetch('http://localhost:8088/wra506/index.php/api/movies')
    data.value = await response.json()
    console.log(data)
  })
</script>

<template>
  <main>
    <h2>Liste des films</h2>

    <div class="movies-box">
      <MovieCard v-if="data" v-for="movie in data['hydra:member']" :movie="movie" />
    </div>
  </main>
</template>

<style scoped>

</style>