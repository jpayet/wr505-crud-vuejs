<script setup>
  import {onMounted, ref} from 'vue'
  import CategoryCard from "../components/CategoryCard.vue";
  import router from "@/router";

  let data = ref()
  let completeList = ref()
  let searchword = ref('')
  const token = localStorage.getItem('token')

  onMounted(async () => {
    fetch('https://movieapi.jean-francoispayet.fr/api/categories', {
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

  function filterOnCategoryName() {
    data.value = completeList.value['hydra:member'].filter(function(data){
      return data.name.toLowerCase().includes(searchword.value.toLowerCase())
    })
  }

</script>

<template>
  <main>
    <h2>Films par catégories</h2>

    <div class="search-box">
      <input class="searchform" type="text" v-model.trim="searchword" @input="filterOnCategoryName" placeholder="Rechercher un acteur" />
    </div>

    <div class="category-box">
      <CategoryCard v-if="data" v-for="category in data['hydra:member'] || data" :category="category" />
    </div>
  </main>
</template>

<style scoped>

</style>