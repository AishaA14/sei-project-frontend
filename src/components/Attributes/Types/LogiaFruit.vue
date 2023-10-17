<template>
  <div class="logia-page">
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

    <!-- Section 1: Introduction to Logia Fruits -->
    <div class="logia-intro">
      <h1>Logia Type Fruits</h1>
      <h4>What are Logia Fruits?</h4>
      <p>
    Logia fruits are a category of Devil Fruits known for their extraordinary abilities. They are among the three primary categories of Devil Fruits in the One Piece world, alongside Paramecia and Zoan fruits.
      <br>
      <br>
    Logia fruits bestow their users with incredible versatility and often grant the power to control and manipulate natural elements.
    <br>
    <br>
    Users of Logia fruits can harness these elements for various purposes, making them formidable and elusive opponents. One of the distinguishing features of Logia fruit users is their ability to transform their bodies into the element they control, granting them near-invulnerability and the capacity to launch devastating attacks.

  </p>
    </div>

   <!-- Section 2: List of Logia Fruits -->
   <div class="logia-list">
      <h2>List of Logia Type Fruits in the Collection</h2>
      <!-- Display Logia type fruits as sorted cards -->
      <div class="fruit-card" v-for="fruit in sortedLogiaFruits" :key="fruit._id">
        <router-link :to="'/fruits/' + fruit._id" class="fruit-link">
          <div class="fruit-name">{{ fruit.name }}</div>
          <div class="character-name">{{ fruit.character }}</div>
        </router-link>
      </div>
    </div>


    <!-- Footer -->
    <footer>
      &copy; Strawhats 2023
    </footer>
  </div>
</template>
  
  <script>
 import { useCookies } from 'vue3-cookies';
  export default {
    name: 'LogiaFruits',
    data() {
      return {
        logiaFruits: [], // Populate this with the Logia type fruits
        isLoggedIn: false, // Add a data property to track user's login status
        isDropdownOpen: false,
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
    
    // Fetch Logia type fruits from backend
    // Example:
    mounted() {
      // Fetch and populate this.logiaFruits from backend
    this.fetchLogiaFruits()
  },
  computed: {
    // Create a computed property that sorts the fruits alphabetically
    sortedLogiaFruits() {
      return this.logiaFruits.slice().sort((a, b) => a.name.localeCompare(b.name));
    },
  },
  methods: {
    async fetchLogiaFruits() {
      try {
        const response = await fetch(`${process.env.VUE_APP_BACKEND_URL}/fruits/type/logia`);
        if (!response.ok) {
          throw new Error('Failed to fetch Logia fruits')
        }
        const data = await response.json()
        this.logiaFruits = data
      } catch (error) {
        console.error('Error fetching Logia fruits:', error)
      }
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
  },
  }
  </script>
  
  <style scoped>
  
    .logia-page {
      background: linear-gradient(135deg, #FF2E2E, #70E1D7, #A600FF);
      /* Other styles specific to this page */
      font-family: 'Croissant One', serif;
      min-height: 100vh; /* Set the minimum height to fill the viewport */
      margin: 0; /* Remove margin */
      padding: 0; /* Remove padding */font-family: 'Young Serif', serif;
      color: black;
        }
    .logia-intro {
      text-align: center;
      padding-top: 50px;
      padding-left: 150px;
      padding-right: 150px;
    }
    .fruit-card {
    display: inline-block;
    margin: 10px;
    padding: 10px;
    background-color: #FFFFFF;
    border: 1px solid #CCCCCC;
    border-radius: 5px;
    width: 200px; /* Adjust the card width as needed */
    text-align: center;
  }

  .fruit-link {
    text-decoration: none;
    color: #333333;
  }

  .fruit-name {
    font-weight: bold;
  }

  </style>