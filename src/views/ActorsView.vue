<script setup>
  import {onMounted, ref} from 'vue'
  import ActorCard from "../components/ActorCard.vue"
  import MovieCard from "@/components/MovieCard.vue";
  import router from "@/router";

  let data = ref()
  let completeList = ref()
  let searchword = ref('')
  const token = localStorage.getItem('token')

  onMounted(async () => {
    fetch('http://localhost:8088/wra506/api/actors', {
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
            completeList.value = datas
          }
        });
  })

  function filterOnActorName() {
    data.value = completeList.value['hydra:member'].filter(function(data){
      return data.lastName.toLowerCase().includes(searchword.value.toLowerCase()) || data.firstName.toLowerCase().includes(searchword.value.toLowerCase())
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