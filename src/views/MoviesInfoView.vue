<script setup>
import {onMounted, ref} from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id

const data = ref()

onMounted(async () => {
  const response = await fetch('http://localhost:8088/wra506/index.php/api/movies/' + id)
  data.value = await response.json()
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