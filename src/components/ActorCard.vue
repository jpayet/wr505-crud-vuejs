<script setup>
defineProps(['actor'])
</script>

<template>
  <div class="movie-card" v-if="actor">
    <p><span>Prénom :</span> {{actor.firstName}}</p>
    <p><span>Nom :</span> {{actor.lastName}}</p>

    <p><span>Nationalité :</span> {{actor.nationalite.nationalite}}</p>

    <div class="movies">
      <h4>Apparitions dans les films</h4>
      <ul v-for="movie in actor.movies">
        <li>
          <router-link  :to="{name: 'movies-info', params: {id: movie.id}}">{{movie.title}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.movie-card{
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px;
}
</style>