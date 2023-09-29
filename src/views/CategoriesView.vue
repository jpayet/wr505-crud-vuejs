<script setup>
import {onMounted, ref} from 'vue'
import CategoryCard from "../components/CategoryCard.vue";

const data = ref()

onMounted(async () => {
  const response = await fetch('http://localhost:8088/wra506/index.php/api/categories')
  data.value = await response.json()
})
</script>

<template>
  <main>
    <h2>Films par catégories</h2>

    <div class="category-box">
      <CategoryCard v-if="data" v-for="category in data['hydra:member']" :category="category" />
    </div>
  </main>
</template>

<style scoped>

</style>