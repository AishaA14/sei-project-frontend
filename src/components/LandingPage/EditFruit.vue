<template>
  <div>
  <!-- Top Navigation Section -->
  <nav class="navbar">
        <div class="container">
            <a class="navbar-brand" href="#">
              <router-link to="/fruits" @click="$router.push({name: 'HomePage'})">
            <img src="@/assets/strawhatslogo.png" alt="Logo" style="width: 80px;">
            </router-link>
            </a> The One Piece Orchard
            <button class="navbar-toggler" type="button" @click="toggleDropdown" style="color: white">
            Account
            </button>
            <div :class="{ 'show': isDropdownOpen }" class="collapse navbar-collapse">
            <ul class="navbar-nav">
              <!-- add routes -->
                <li class="nav-item">
                <router-link v-if="isLoggedIn" to="/fruits/myfruits" class="nav-link" style="color: white">My Fruits</router-link>
                </li>
                <li><router-link v-if="isLoggedIn" to="/user/login" class="nav-link" style="color: white">
                    Log Out
                </router-link>
                 <router-link v-else to="/user/login" class="nav-link" style="color: white">Log In</router-link> 
                 </li> 
            </ul>
            </div>
        </div>
        </nav>
  <div>
    <h1>Edit "{{ fruit.name }}" fruit here</h1>

    <label for="editFruitName">Fruit Name:</label>
    <input type="text" v-model="fruit.name" name="editFruitName" id="editFruitName" placeholder="Fruit name">
   
    <label for="editFruitCharacter">Character Name:</label>
    <input type="text" v-model="fruit.character" name="editFruitCharacter" id="editFruitCharacter" placeholder="Character name">
   
    <label for="editFruitType">Type:</label>
    <select v-model="fruit.type" name="editFruitType" id="editFruitType">
      <option value="Paramecia">Paramecia</option>
      <option value="Logia">Logia</option>
      <option value="Zoan">Zoan</option>
    </select>

  
    
    <label for="editFruitAbilities">Abilities:</label>
    <input type="text" v-model="fruit.abilities" name="editFruitAbilities" id="editFruitAbilities" placeholder="Abilities">

    <button @click="editFruit">Submit Update</button>
  </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
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
        isLoggedIn: false, // Add a data property to track user's login status
        isDropdownOpen: false,
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    const { cookies } = useCookies();
    const userSession = cookies.get('user_session');

    // Check if the user is logged in
    const isLoggedIn = !!userSession;

    next((vm) => {
      vm.isLoggedIn = isLoggedIn; // Set the login status
    });
  },
  mounted() {
    const route = useRoute();
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
        toggleDropdown() {
          this.isDropdownOpen = !this.isDropdownOpen;
        },
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
  },
};
</script>
