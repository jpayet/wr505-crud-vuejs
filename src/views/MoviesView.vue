  <script setup>
    import {onMounted, ref} from 'vue'
    import MovieCard from "../components/MovieCard.vue"
    import router from "@/router";
    import axios from 'axios'


    let data = ref()
    let completeList = ref()
    let searchword = ref('')
    let currentPage = ref(1)
    const token = localStorage.getItem('token')

    onMounted(async () => {
      fetch('https://movieapi.jean-francoispayet.fr/api/movies?page=' + currentPage.value, {
        headers: {
          'Authorization': 'Bearer ' + token,
        }
      })
        .then(response => {return response.json()})
        .then(datas => {
          console.log(datas)
          console.log(datas.code)
          if(datas.code===401){
            localStorage.setItem('error', datas.message)
            localStorage.removeItem('token')
            router.push({name: 'login'})
          } else {
            data.value = datas
            completeList.value = datas
          }
        });
    })

    function filterOnMovieName() {
      data.value = completeList.value['hydra:member'].filter(function(data){
        return data.title.toLowerCase().includes(searchword.value.toLowerCase())
      })
    }

    function uploadImage() {
      const fileInput = document.querySelector('input[type="file"]');
      const file = fileInput.files[0];
      console.log("f" + file)

      if (!file) {
        console.log("Veuillez sélectionner une image");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      // Appel de la fonction pour envoyer le media à l'API
      uploadToApi(formData);
    }

    async function uploadToApi(formData) {
      try {
        // Récupérer le JWT depuis le local storage
        // const token = localStorage.getItem("token");

        // Utilisation d'Axios pour envoyer l'image à l'API avec le JWT
        const response = await axios.post("http://127.0.0.1:8088/wra506/api/media_objects", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Réponse de l'API :", response.data);

        //--- RECUPERATION DE L'ID du media uploadé
        //--- ENVOI DE L'ID du media vers le point d'API de création ou update actor / media / etc

      } catch (error) {
        console.error("Erreur lors de l'envoi de l'image :", error);
      }
    }
  </script>

  <template>
    <main>
      <h2>Liste des films</h2>

      <button class="btn-orange" @click="router.push('/add-movie')">Ajouter un film</button>

      <div class="search-box">
        <input class="searchform" type="text" v-model.trim="searchword" @input="filterOnMovieName" placeholder="Rechercher un film" />
      </div>
      <div class="movies-box">
        <MovieCard v-if="data" v-for="movie in data['hydra:member'] || data" :movie="movie" />
      </div>

    </main>
  </template>

  <style scoped>
    .search-box{
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 20px;
    }
    .searchform{
      width: 40vw;
      border-radius: 20px;
      padding: 10px;
    }
    .movies-box{
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 20px;
    }
  </style>