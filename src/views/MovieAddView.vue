<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import router from "@/router";

const API_URL = import.meta.env.VITE_API_URL || 'https://movieapi.jean-francoispayet.fr/api';


let editedMovieTitle = ref('')
let editedMovieSynopsis = ref('')
let editedMovieReleaseDate = ref('')
let editedMovieDuration = ref('')
let editedMovieCategory = ref('')
let categories = ref([])
let postMessage = ref('')

onMounted(async () => {
  await getCategories()
})

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

async function addMovie() {
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

    const newMovie = {
      title: editedMovieTitle.value,
      description: editedMovieSynopsis.value,
      releaseDate: editedMovieReleaseDate.value,
      duration: editedMovieDuration.value,
      category: `/api/categories/${editedMovieCategory.value}`,
    };

    const response = await axios.post(`${API_URL}/movies`, newMovie, { headers });
    if (response.status === 201) {
      postMessage.value = 'Le film a bien été ajouté';
    } else {
      postMessage.value = 'Une erreur s\'est produite lors de l\'ajout du film';
    }

    editedMovieTitle.value = '';
    editedMovieSynopsis.value = '';
    editedMovieReleaseDate.value = '';
    editedMovieDuration.value = '';
    editedMovieCategory.value = '';

  } catch (error) {
    if (error.response.data.code === 401) {
      localStorage.removeItem('token');
      await router.push('/login');
    }
  }
}

</script>

<template>
  <main>
    <h2>Ajouter un film</h2>
    <form @submit.prevent="addMovie">
      <div>
        <label for="title">Titre<span>*</span></label>
        <input type="text" id="title" v-model="editedMovieTitle" required>
      </div>
      <div>
        <label for="synopsis">Synopsis<span>*</span></label>
        <textarea id="synopsis" v-model="editedMovieSynopsis" minlength="5" required></textarea>
      </div>
      <div>
        <label for="releaseDate">Date de sortie<span>*</span></label>
        <input type="date" id="releaseDate" v-model="editedMovieReleaseDate" required>
      </div>
      <div>
        <label for="duration">Durée<span>*</span></label>
        <input type="number" id="duration" v-model="editedMovieDuration" required>
      </div>
      <div>
        <label for="category">Catégorie<span>*</span></label>
        <select id="category" v-model="editedMovieCategory" required>
          <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
        </select>
      </div>
      <button type="submit" class="btn-orange">Envoyer</button>
      <div class="infobox_sucess" v-if="postMessage"><p>{{ postMessage }}</p></div>
    </form>
  </main>
</template>

<style scoped>

</style>