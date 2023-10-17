<template>
  <div class="paramecia-page">
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

    <!-- Section 1: Introduction to Paramecia Fruits -->
    <div class="paramecia-intro">
      <h1>Paramecia Type Fruits</h1>
      <h4>What are Paramecia Fruits?</h4>
      <p>
        Paramecia fruits are a type of Devil Fruit that grant users a wide range of superhuman abilities.
        They are known for their incredible versatility and are considered one of the three main categories of Devil Fruits in the One Piece world.
        Users of Paramecia fruits can develop unique and often bizarre powers, such as transforming their bodies, manipulating objects, or controlling elements.
      </p>
      <!-- You can add more information about Paramecia fruits here -->
    </div>

   <!-- Section 2: List of Paramecia Fruits -->
   <div class="paramecia-list">
      <h2>List of Paramecia Type Fruits in the Collection</h2>
      <!-- Display Paramecia type fruits as sorted cards -->
      <div class="fruit-card" v-for="fruit in sortedParameciaFruits" :key="fruit._id">
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
    name: 'ParameciaFruits',
    data() {
      return {
        parameciaFruits: [], // Populate this with the Paramecia type fruits
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
    
    // Fetch Paramecia type fruits from backend
    // Example:
    mounted() {
      // Fetch and populate this.parameciaFruits from backend
    this.fetchParameciaFruits()
  },
  computed: {
    // Create a computed property that sorts the fruits alphabetically
    sortedParameciaFruits() {
      return this.parameciaFruits.slice().sort((a, b) => a.name.localeCompare(b.name));
    },
  },
  methods: {
    async fetchParameciaFruits() {
      try {
        const response = await fetch(`${process.env.VUE_APP_BACKEND_URL}/fruits/type/paramecia`);
        if (!response.ok) {
          throw new Error('Failed to fetch Paramecia fruits')
        }
        const data = await response.json()
        this.parameciaFruits = data
      } catch (error) {
        console.error('Error fetching Paramecia fruits:', error)
      }
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
  },
  }
  </script>
  
  <style scoped>
  
    .paramecia-page {
      background: linear-gradient(135deg, #FF5733, #FFC300, #FF3333);
      /* Other styles specific to this page */
      font-family: 'Croissant One', serif;
      min-height: 100vh; /* Set the minimum height to fill the viewport */
      margin: 0; /* Remove margin */
      padding: 0; /* Remove padding */
      font-family: 'Young Serif', serif;
      color: black;
        }
    .paramecia-intro {
      text-align: center;
      padding-top: 50px;
      padding-left: 200px;
      padding-right: 200px;
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