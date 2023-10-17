<script setup>
  import {onMounted, ref} from 'vue'
  import MovieCard from "../components/MovieCard.vue"
  import router from "@/router";

  let data = ref()
  let completeList = ref()
  let searchword = ref('')
  let currentPage = ref(1)
  const token = localStorage.getItem('token')

  onMounted(async () => {
    fetch('http://localhost:8088/wra506/api/movies?page='+ currentPage.value, {
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
          completeList.value = datas
        });
  })

  function filterOnMovieName() {
    data.value = completeList.value['hydra:member'].filter(function(data){
      return data.title.toLowerCase().includes(searchword.value.toLowerCase())
    })
  }
</script>

<template>
  <main>
    <h2>Liste des films</h2>

    <div class="btn-page">
      <button @click="currentPage--">Page précédente</button>
      <button>{{currentPage}}</button>
      <button @click="currentPage++">Page suivante</button>
    </div>

    <div class="search-box">
      <input class="searchform" type="text" v-model.trim="searchword" @input="filterOnMovieName" placeholder="Rechercher un film" />
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