<template>
  <div>
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

    <!-- Add New Fruit Section -->
    <div class="add-fruit-container">
      <h1>Add a New Devil Fruit to the Collection</h1>
      <div class="add-fruit-form">
        <label for="name">Name:</label>
        <input type="text" v-model="fruitData.name" name="name" id="name" placeholder="Name of the Devil Fruit">
        
        <label for="type">Type:</label>
        <select v-model="fruitData.type" name="type" id="type">
          <option value="Paramecia">Paramecia</option>
          <option value="Logia">Logia</option>
          <option value="Zoan">Zoan</option>
          <!-- <option value="MythicalZoan">Mythical Zoan</option> -->
        </select>
        
        <label for="character">Character:</label>
        <input type="text" v-model="fruitData.character" name="character" id="character" placeholder="User of the Devil Fruit">
        
        <label for="abilities">Abilities:</label>
        <input type="text" v-model="fruitData.abilities" name="abilities" id="abilities" placeholder="Abilities of the Devil Fruit">

        <button @click="addNewFruit">Submit</button>
      </div>
      <p v-if="error">{{ error }}</p>
      <p v-if="success">{{ success }}</p>
    </div>
  </div>
</template>

<script>
import { decodeCredential } from 'vue3-google-login'
const API_URL = process.env.VUE_APP_BACKEND_URL + '/fruits/add';

export default {
  name: 'AddNewFruit',
  data() {
    return {
      error: '',
      success: '',
      fruitData: {
        name: '',
        type: '',
        character: '',
        abilities: '',
      },
      email: '', // Initialize user object
      isDropdownOpen: false, // Dropdown menu state
      isLoggedIn: false, // Login status
    };
  },

  mounted() {
    if (this.$cookies.isKey('user_session')) {
      this.isLoggedIn = true;
      const userData = decodeCredential(this.$cookies.get('user_session'));
      this.userName = userData.given_name;
      this.email = userData.email;
    } else {
      console.log('No user found');
    }
  },

  methods: {
    // Toggle the dropdown menu
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },

    async addNewFruit() {
      this.error = '';
      this.success = '';

      if (!this.email) {
        this.error = 'User information is missing.';
        return;
      }

      const requestData = {
        name: this.fruitData.name,
        type: this.fruitData.type,
        character: this.fruitData.character,
        abilities: this.fruitData.abilities,
        user: this.email,
      };

      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });

        if (response.ok) {
          this.success = 'Devil Fruit added successfully.';
          this.clearFields();
          this.$router.replace({ name: 'FruitList' });
        } else {
          throw new Error('Failed to add Devil Fruit');
        }
      } catch (error) {
        this.error = 'An error occurred while adding the Devil Fruit. Please try again.';
        console.error(error);
      }
    },

    clearFields() {
      // Clear input fields
      this.fruitData.name = '';
      this.fruitData.type = '';
      this.fruitData.character = '';
      this.fruitData.abilities = '';
    },
  },
};
</script>
