<script setup>
import router from "@/router";
import {ref} from "vue";

let email = ref()
let password = ref()


const error = localStorage.getItem('error')
localStorage.removeItem('error')

const login = () => {
  fetch('https://movieapi.jean-francoispayet.fr/api/login_check', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },

    body: JSON.stringify({
      username: email.value,
      password: password.value
    })
  })
      .then(response => response.json())
      .then(data => {
        if (data.token !== undefined) {
          localStorage.removeItem('error')
          localStorage.setItem('token', data.token)
          location.href = '/'
        } else {
          alert('Mauvais identifiants')
        }
      })
}
</script>

<template>
  <h1>Connexion</h1>

  <div class="card" style="width: 18rem">
    <div>
      <label for="email" class="form-label">Email</label>
      <input type="email" id="email" v-model="email" class="form-control mb10">
    </div>
    <div>
      <label for="password" class="form-label">Mot de passe</label>
      <input type="password" id="password" v-model="password" @keyup.enter="login" class="form-control mb10">
    </div>
    <button @click="login" class="btn btn-primary">Connexion</button>
  </div>
  <div v-if="error">
    <p>{{error}}</p>
  </div>
</template>

<style></style>