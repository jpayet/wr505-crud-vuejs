<script setup>
import {onMounted, ref} from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id

const data = ref()

onMounted(async () => {
  const response = await fetch('http://localhost:8088/wra506/index.php/api/actors/' + id)
  data.value = await response.json()
})
</script>

<template>
  <main v-if="data">
    <h2>{{data.firstName}} {{data.lastName}}</h2>
    <p>Nationalité : {{data.nationalite.nationalite}}</p>
    <div>
      <p>Liste de films joués :</p>
      <ul>
        <li v-for="movie in data.movies">
          <router-link  :to="{name: 'movies-info', params: {id: movie.id}}">{{movie.title}}</router-link>
        </li>
      </ul>
    </div>




  </main>
</template>

<style scoped>

</style>