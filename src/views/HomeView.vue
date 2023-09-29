<script setup>
import MovieCard from "../components/MovieCard.vue"
import ActorCard from "../components/ActorCard.vue"

import {onMounted, ref} from "vue";

const data_movies = ref()
const data_actors = ref()

onMounted(async () => {
  const response_movies = await fetch('http://localhost:8088/wra506/index.php/api/movies')
  const response_actors = await fetch('http://localhost:8088/wra506/index.php/api/actors')

  //MOVIES
  data_movies.value = await response_movies.json().then((data_movies) => {
    return data_movies['hydra:member'].sort(() => Math.random() - Math.random()).slice(0, 4)
  })
  //ACTORS
  data_actors.value = await response_actors.json().then((data_actors) => {
    return data_actors['hydra:member'].sort(() => Math.random() - Math.random()).slice(0, 4)
  })
})
</script>

<template>
  <main>
    <h2>Découvrez nos films</h2>
    <div class="carrousel-movies">
      <MovieCard v-if="data_movies" v-for="movie in data_movies" :movie="movie" />
    </div>

    <h2>Les acteurs en vedettes</h2>
    <div class="carrousel-actors">
      <ActorCard v-if="data_actors" v-for="actor in data_actors" :actor="actor" />
    </div>
  </main>
</template>

<style scoped>
h1{
  margin-bottom: 15px;
}

main{
  padding: 10px;
}

.carrousel-movies, .carrousel-actors{
  padding: 10px;
  display: flex;
  gap: 20px;
}
</style>
