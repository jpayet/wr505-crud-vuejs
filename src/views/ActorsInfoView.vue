<script setup>
import {onMounted, ref} from 'vue'
import { useRoute } from 'vue-router'
import router from "@/router";

const route = useRoute()
const id = route.params.id
const data = ref()
const token = localStorage.getItem('token')

onMounted(async () => {
  fetch('http://localhost:8088/wra506/api/actors/' + id, {
    headers: {
      'Authorization': 'Bearer ' + token,
    }
  })
      .then(response => {
        if (response.status === 401) {
          router.push({name: 'login'})
        } else {
          return response.json()
        }
      })
      .then(datas => {
        data.value = datas
      });
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