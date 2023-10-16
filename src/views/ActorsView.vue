<script setup>
import {onMounted, ref} from 'vue'
import ActorCard from "../components/ActorCard.vue"
import MovieCard from "@/components/MovieCard.vue";

let data = ref()
let completeList = ref()
let searchword = ref('')

onMounted(async () => {
  const response = await fetch('http://localhost:8088/wra506/index.php/api/actors')
  data.value = await response.json()
  completeList.value = data.value
})

function filterOnActorName() {
  data.value = completeList.value['hydra:member'].filter(function(data){
    return data.lastName.toLowerCase().includes(searchword.value.toLowerCase())
  })
}
</script>

<template>
  <main>
    <h2>Liste des acteurs</h2>

    <div class="search-box">
      <input class="searchform" type="text" v-model.trim="searchword" @input="filterOnActorName" placeholder="Rechercher un acteur" />
    </div>

    <div class="actors-box">
      <ActorCard v-if="data" v-for="actor in data['hydra:member'] || data" :actor="actor" />
    </div>
  </main>
</template>

<style scoped>

</style>