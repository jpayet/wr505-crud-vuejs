<script setup>
defineProps(['actor'])
</script>

<template>
  <div class="card" v-if="actor">
    <div class="card-body">
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
      <router-link  :to="{name: 'actors-info', params: {id: actor.id}}">Voir la fiche de détails de l'acteur</router-link>
    </div>
  </div>
</template>

<style scoped>
.actor-card{
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px;
}
</style>