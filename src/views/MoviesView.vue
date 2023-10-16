<script setup>
  import {onMounted, ref} from 'vue'
  import MovieCard from "../components/MovieCard.vue"

  let data = ref()
  let completeList = ref()
  let searchword = ref('')

  onMounted(async () => {
    const response = await fetch('http://localhost:8088/wra506/index.php/api/movies')
    data.value = await response.json()
    completeList.value = data.value
    console.log(data.value)
    console.log(completeList.value)
  })

  function filterOnName() {
    console.log(data.value)
    data.value = completeList.value['hydra:member'].filter(function(data){
      return data.title.toLowerCase().includes(searchword.value.toLowerCase())
    })
    console.log(searchword.value)
    console.log(data.value)
  }
</script>

<template>
  <main>
    <h2>Liste des films</h2>

    <div class="search-box">
      <input class="searchform" type="text" v-model.trim="searchword" @input="filterOnName" placeholder="Rechercher un film" />
    </div>
    <div class="movies-box">
      <MovieCard v-if="data" v-for="movie in data['hydra:member'] || data" :movie="movie" />
    </div>
  </main>
</template>

<style scoped>
.search-box{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
}
.searchform{
  width: 40vw;
  border-radius: 20px;
  padding: 10px
;
}
</style>