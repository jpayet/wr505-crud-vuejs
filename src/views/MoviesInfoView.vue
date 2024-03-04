<script setup>
import {onMounted, ref} from 'vue'
import { useRoute } from 'vue-router'
import router from "@/router";

const route = useRoute()
const id = route.params.id
const data = ref()
const token = localStorage.getItem('token')

onMounted(async () => {
  fetch('https://movieapi.jean-francoispayet.fr/api/movies/' + id, {
    headers: {
      'Authorization': 'Bearer ' + token,
    }
  })
      .then(response => {return response.json()})
      .then(datas => {
        if(datas.code===401){
          localStorage.setItem('error', datas.message)
          localStorage.removeItem('token')
          router.push({name: 'login'})
        } else {
          data.value = datas
        }
      });
})
</script>

<template>
  <main v-if="data">
    <h2>{{data.title}}</h2>
    <p><span>Synopsis :</span> {{data.description}}</p>
    <p><span>Date de sortie :</span> {{data.releaseDate}}</p>
    <p><span>Durée :</span> {{data.duration}}m</p>

    <p><span>Genre :</span> {{data.category.name}}</p>

    <div class="actors">
      <h4>Acteurs</h4>
      <ul v-for="actor in data.actor">
        <li>
          <router-link  :to="{name: 'actors-info', params: {id: actor.id}}">{{actor.firstName}} {{actor.lastName}}</router-link>
        </li>
      </ul>
    </div>




  </main>
</template>

<style scoped>

</style>