<script setup>
import {onMounted, ref} from 'vue'
import CategoryCard from "../components/CategoryCard.vue";

let data = ref()
let completeList = ref()
let searchword = ref('')

onMounted(async () => {
  const response = await fetch('http://localhost:8088/wra506/index.php/api/categories')
  data.value = await response.json()
  completeList.value = data.value
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