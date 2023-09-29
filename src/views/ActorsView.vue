<script setup>
import {onMounted, ref} from 'vue'
import ActorCard from "../components/ActorCard.vue"
import MovieCard from "@/components/MovieCard.vue";

const data = ref()

onMounted(async () => {
  const response = await fetch('http://localhost:8088/wra506/index.php/api/actors')
  data.value = await response.json()
})
</script>

<template>
  <main>
    <h2>Liste des acteurs</h2>

    <div class="actors-box">
      <ActorCard v-if="data" v-for="actor in data['hydra:member']" :actor="actor" />
    </div>
  </main>
</template>

<style scoped>

</style>