<template>
  <div edit-fruit-page>
  <!-- Top Navigation Section -->
  <nav class="navbar">
      <div class="container">
        <a class="navbar-brand" href="#">
          <router-link to="/fruits" @click="$router.push({ name: 'HomePage' })">
            <img src="@/assets/strawhatslogo.png" alt="Logo" style="width: 80px;" />
          </router-link>
        </a>
        The One Piece Orchard
        <button class="navbar-toggler" type="button" @click="toggleDropdown" style="color: white">
          Account
        </button>
        <div :class="{ 'show': isDropdownOpen }" class="collapse navbar-collapse">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link v-if="isLoggedIn" to="/fruits/myfruits" class="nav-link" style="color: white">My Fruits</router-link>
            </li>
            <li>
              <router-link v-if="isLoggedIn" to="/user/login" class="nav-link" style="color: white">
                Log Out
              </router-link>
              <router-link v-else to="/user/login" class="nav-link" style="color: white">Log In</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  <div class="middle-section">
    <div class="edit-fruit-container">
        <h1>Edit "{{ fruit.name }}" fruit here</h1>

        <div class="form-group">
          <label for="editFruitName">Fruit Name:</label>
          <input type="text" v-model="fruit.name" class="form-control" id="editFruitName" placeholder="Fruit name">
        </div>

        <div class="form-group">
          <label for="editFruitCharacter">Character Name:</label>
          <input type="text" v-model="fruit.character" class="form-control" id="editFruitCharacter" placeholder="Character name">
        </div>

        <div class="form-group">
          <label for="editFruitType">Type:</label>
          <select v-model="fruit.type" class="form-control" id="editFruitType">
            <option value="Paramecia">Paramecia</option>
            <option value="Logia">Logia</option>
            <option value="Zoan">Zoan</option>
          </select>
        </div>

        <div class="form-group">
          <label for="editFruitAbilities">Abilities:</label>
          <input type="text" v-model="fruit.abilities" class="form-control" id="editFruitAbilities" placeholder="Abilities">
        </div>

        <button @click="editFruit" class="btn btn-primary">Submit Update</button>
      </div>
     </div> 
    <!-- Footer Section -->
    <div class="footer">
      &copy; StrawHats
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import { decodeCredential } from 'vue3-google-login';
import { useCookies } from 'vue3-cookies';

export default {
  name: 'EditFruit',
  data() {
    return {
      error: '',
      fruit: {
        _id: '',
        name: '',
        type: '',
        character: '',
        user: '',
        abilities: '',
      },
      isLoggedIn: false, // Add a data property to track user's login status
      isDropdownOpen: false,
    }
  },
  mounted() {
    const route = useRoute();
    const { cookies } = useCookies();
    const userSession = cookies.get('user_session');

    if (userSession) {
      const userData = decodeCredential(userSession);
      this.isLoggedIn = true;
      this.fruit.user = userData.email;
    }

    try {
      fetch(`${process.env.VUE_APP_BACKEND_URL}/fruits/${route.params.id}`)
        .then(result => result.json())
        .then(data => {
          this.fruit._id = route.params.id;
          this.fruit.name = data.name;
          this.fruit.type = data.type;
          this.fruit.character = data.character;
          this.fruit.user = data.user;
          this.fruit.abilities = data.abilities;
        });
    } catch (error) {
      console.log('Could not get data from another page', error);
    }
  },
  methods: {
    async editFruit() {
      console.log(this.fruit);
      
      const updatedFruit = {
        name: this.fruit.name,
        type: this.fruit.type,
        character: this.fruit.character,
        user: this.fruit.user,
        loggedInUser: '',
        abilities: this.fruit.abilities,
      };
      
      await fetch(`${process.env.VUE_APP_BACKEND_URL}/fruits/update/${this.fruit._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFruit),
      });
      
      this.$router.replace({ name: 'FruitList' });
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
  },
};
</script>

<style scoped>
.middle-section {
  background-color: black;
}
.edit-fruit-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #62c8a8;
  font-family: 'Raleway', sans-serif;
  color: black;
  height: 500px;
}

.form-group {
  margin-bottom: 15px;
  font-size: 20px;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn {
  display: block;
  width: 200px;
  align-content: center;
}
</style>