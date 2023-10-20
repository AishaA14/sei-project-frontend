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
<div class="middle-section">
  <div class="add-fruit-container">
    <h1>Add a New Devil Fruit to the Collection</h1>

    <div class="form-group">
      <label for="name">Name:</label>
      <input type="text" v-model="fruitData.name" class="form-control" id="name" placeholder="Name of the Devil Fruit">
    </div>

    <div class="form-group">
      <label for="type">Type:</label>
      <select v-model="fruitData.type" class="form-control" id="type">
        <option value="Paramecia">Paramecia</option>
        <option value="Logia">Logia</option>
        <option value="Zoan">Zoan</option>
        <!-- <option value="MythicalZoan">Mythical Zoan</option> -->
      </select>
    </div>

    <div class="form-group">
      <label for="character">Character:</label>
      <input type="text" v-model="fruitData.character" class="form-control" id="character" placeholder="User of the Devil Fruit">
    </div>

    <div class="form-group">
      <label for="abilities">Abilities:</label>
      <input type="text" v-model="fruitData.abilities" class="form-control" id="abilities" placeholder="Abilities of the Devil Fruit">
    </div>

    <button @click="addNewFruit" class="btn btn-primary">Submit</button>
    <p v-if="error">{{ error }}</p>
    <p v-if="success">{{ success }}</p>
  </div>
</div>

    <!-- Footer Section -->
    <div class="footer">
      &copy; StrawHats
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

<style>
.middle-section {
  background-color: black;
}
.add-fruit-container {
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