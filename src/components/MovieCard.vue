<script setup>
defineProps(['movie'])
</script>

<template>
  <div class="movie-card" v-if="movie">
    <h3>{{movie.title}}</h3>
    <p><span>Synopsis :</span> {{movie.description}}</p>
    <p><span>Date de sortie :</span> {{movie.releaseDate}}</p>
    <p><span>Durée :</span> {{movie.duration}}</p>

    <p><span>Genre :</span> {{movie.category.name}}</p>

    <div class="actors">
      <h4>Acteurs</h4>
      <ul v-for="actor in movie.actor">
        <li>
          <router-link  :to="{name: 'actors-info', params: {id: actor.id}}">{{actor.firstName}} {{actor.lastName}}</router-link>
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