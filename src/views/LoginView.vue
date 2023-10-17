<script setup>
import router from "@/router";
import {ref} from "vue";

let email = ref()
let password = ref()

const login = () => {
  fetch('http://localhost:8088/wra506/api/login_check', {
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
  <div>
    <div>
      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" class="border-b">
    </div>
    <div>
      <label for="password">Mot de passe</label>
      <input type="password" id="password" v-model="password" @keyup.enter="login" class="border-b">
    </div>
    <button @click="login">Connexion</button>
  </div>
</template>

<style></style>