<script setup>
import MovieCard from "../components/MovieCard.vue"
import {onMounted, ref} from "vue";

const data = ref()

onMounted(async () => {
  const response = await fetch('http://localhost:8088/wra506/index.php/api/movies')
  data.value = await response.json().then((data) => {
    return data['hydra:member'].sort(() => Math.random() - Math.random()).slice(0, 4)
  })
  console.log(data)
})
</script>

<template>
  <main>
    <h2>Découvrez nos films</h2>
    <div class="carrousel-movies">
      <MovieCard v-if="data" v-for="movie in data" :movie="movie" />
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

.carrousel-movies{
  padding: 10px;
  display: flex;
  gap: 20px;
}
</style>
