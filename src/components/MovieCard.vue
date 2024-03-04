<script setup>
import axios from 'axios'
import {ref, onMounted} from 'vue'
const props = defineProps(['movie'])

import router from "@/router";

const API_URL = import.meta.env.VITE_API_URL || 'https://movieapi.jean-francoispayet.fr/api';

// Variables pour la gestion de l'édition du titre du film
let selectedMovieId = ref('')
let selectedMovie = ref(null)
let editedMovieTitle = ref('')
let editedMovieSynopsis = ref('')
let editedMovieReleaseDate = ref('')
let editedMovieDuration = ref('')
let editedMovieCategory = ref('')

let categories = ref([])

onMounted(async () => {
  await getCategories()
})


function toggleDetails(movieId){
  selectedMovieId.value = props.movie.id
  selectedMovie = props.movie
  editedMovieTitle = selectedMovie ? selectedMovie.title : '';
  editedMovieSynopsis = selectedMovie ? selectedMovie.description : '';
  editedMovieReleaseDate = selectedMovie ? selectedMovie.releaseDate : '';
  editedMovieDuration = selectedMovie ? selectedMovie.duration : '';
  editedMovieCategory = selectedMovie ? selectedMovie.category : '';
}

async function getMovies(){
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      //--- rediriger l'utilisateur vers la page de connexion
      await router.push({name: 'login'});
      return;
    }
    const response = await axios.get( `${API_URL}/movies`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    const props = response.data;
  } catch (error) {
    if(error.response.data.code==401){
      //---- détruire le token
      localStorage.removeItem('token');
      //--- rediriger l'utilisateur vers la page de connexion
      await router.push('/login');
      return;
    }
  }
}

async function getCategories() {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    const data = await response.json();
    if (data.code === 401) {
      return router.push('/login')
    } else {
      categories.value = data['hydra:member'];
    }
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la récupération des données.', error);
  }
}

async function updateMovie() {
  if (selectedMovie) {
    try {
      const token = localStorage.getItem('token'); // Récupérer le token d'authentification
      if (!token) {
        //--- rediriger l'utilisateur vers la page de connexion
        await router.push('/login');
        return;
      }
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/merge-patch+json',
      };
      const updatedMovie = {
        'title': `${editedMovieTitle}`,
        'description': `${editedMovieSynopsis}`,
        'releaseDate': `${editedMovieReleaseDate}`,
        'duration': parseInt(editedMovieDuration),
        'category': `/api/categories/${editedMovieCategory.id}`
      };

      // Envoyer la requête PATCH à l'API pour mettre à jour le titre du film
      await axios.patch( `${API_URL}/movies/${selectedMovie.id}`, updatedMovie, { headers });

      // Mise à jour de la liste des films dans les props (si les films sont dans les props)
      props.movie.title = editedMovieTitle;
      props.movie.description = editedMovieSynopsis;
      props.movie.releaseDate = editedMovieReleaseDate;
      props.movie.duration = editedMovieDuration;
      props.movie.category.name = editedMovieCategory.name;

      // Réinitialiser la sélection du film après modification && Réinitialiser editedMovieTitle après la mise à jour
      editedMovieTitle = '';
      editedMovieSynopsis = '';
      editedMovieReleaseDate = '';
      editedMovieDuration = null;
      editedMovieCategory.value = null;
      selectedMovieId.value = null;
    } catch (error) {
      console.error('Erreur lors de la mise à jour du titre du film :', error);
    }
  }
}

async function deleteMovie(movieId) {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      //--- rediriger l'utilisateur vers la page de connexion
      await router.push('/login');
      return;
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    // Envoyer la requête DELETE à l'API pour supprimer le film
    await axios.delete(`${API_URL}/movies/${movieId}`, {headers});

    // rafraîchir la  page
    location.reload();
  } catch (error) {
    console.error('Erreur lors de la suppression du film', error);
  }
}

</script>

<template>
  <div class="card" v-if="props.movie">
    <div class="card-body">
      <img :src="props.movie.Media.contentUrl" alt="Affiche du film" />
      <h3>{{props.movie.title}}</h3>
      <p><span>Synopsis :</span> {{props.movie.description}}</p>
      <p><span>Date de sortie :</span> {{props.movie.releaseDate}}</p>
      <p><span>Durée :</span> {{props.movie.duration}}m</p>

      <p><span>Genre :</span> {{props.movie.category.name}}</p>

      <div class="actors">
        <h4>Acteurs</h4>
        <ul v-for="actor in props.movie.actor">
          <li>
            <router-link  :to="{name: 'actors-info', params: {id: actor.id}}">{{actor.firstName}} {{actor.lastName}}</router-link>
          </li>
        </ul>
      </div>

      <router-link  :to="{name: 'movies-info', params: {id: props.movie.id}}">Voir la fiche de détails du film</router-link>
      <div class="edit-box">
        <button class="btn-edit" @click="toggleDetails(props.movie.id)">Edit</button>
      </div>

      <div :class="[{ 'd-none': !selectedMovieId }]">
        <h2 v-if="selectedMovie">{{ selectedMovie.title }}</h2>
        <form @submit.prevent="updateMovie">
          <div class="form-group">
            <label for="editMovieTitle">Titre du film :</label>
            <input
                type="text"
                class="form-control"
                id="editMovieTitle"
                v-if="selectedMovie"
                v-model="editedMovieTitle"
            />
            <label for="editMovieSynopsis">Synopsis :</label>
            <input
                type="text"
                class="form-control"
                id="editMovieSynopsis"
                v-if="selectedMovie"
                v-model="editedMovieSynopsis"
            />
            <label for="editMovieReleaseDate">Date de sortie :</label>
            <input
                type="text"
                class="form-control"
                id="editMovieReleaseDate"
                v-if="selectedMovie"
                v-model="editedMovieReleaseDate"
            />
            <label for="editMovieDuration">Durée :</label>
            <input
                type="number"
                class="form-control"
                id="editMovieDuration"
                v-if="selectedMovie"
                v-model="editedMovieDuration"
            />
            <label for="editMovieCategory">Catégorie :</label>
            <select
                class="form-control"
                id="editMovieCategory"
                v-if="selectedMovie"
                v-model="editedMovieCategory"
                >

              <option v-for="category in categories" :key="category.id" :value="category" :selected="category.id === editedMovieCategory.id">{{category.name}}</option>
            </select>

          </div>
          <button type="submit" class="btn btn-primary">Modifier</button>
        </form>
      </div>

      <div class="delete-box">
        <button class="btn-delete" @click="deleteMovie(props.movie.id)">Supprimer</button>
      </div>

    </div>
  </div>
</template>

<style scoped>

</style>
