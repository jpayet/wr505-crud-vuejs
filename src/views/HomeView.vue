<script setup>
import MovieCard from "../components/MovieCard.vue"
import ActorCard from "../components/ActorCard.vue"

import {onMounted, ref} from "vue";
import router from "@/router";

const data_movies = ref()
const data_actors = ref()
const token = localStorage.getItem('token')

onMounted(async () => {
  fetch('https://movieapi.jean-francoispayet.fr/api/movies', {
    headers: {
      'Authorization': 'Bearer ' + token,
    }
  })
      .then(response => {return response.json()})
      .then(data => {
        if (data.code != 401) {
          data_movies.value = data['hydra:member'].sort(() => Math.random() - Math.random()).slice(0, 4)
        }
      });


  fetch('https://movieapi.jean-francoispayet.fr/api/actors', {
    headers: {
      'Authorization': 'Bearer ' + token,
    }
  })
      .then(response => response.json())
      .then(data => {
        if (data.code != 401){
          data_actors.value = data['hydra:member'].sort(() => Math.random() - Math.random()).slice(0, 4)
        }
      });
})

</script>

<template>
  <main>
    <h1>Accueil</h1>

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
