<script setup>
defineProps(['category'])
</script>

<template>
  <div class="card" v-if="category">
    <div class="card-body">
      <h3>{{category.name}}</h3>

      <div class="movies-by-categories">
        <ul v-for="movie in category.movies">
          <li>
            <router-link  :to="{name: 'movies-info', params: {id: movie.id}}">{{movie.title}}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.category-card{
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px;
}
</style>