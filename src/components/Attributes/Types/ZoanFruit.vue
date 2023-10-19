<template>
  <div class="zoan-page">
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

    <!-- Section 1: Introduction to Zoan Fruits -->
    <div class="zoan-intro">
      <h4>Exploring the World of Zoan Fruits</h4>
      <p>
        Zoan fruits are a fascinating category of Devil Fruits that offer unique transformative abilities. Users of Zoan fruits have the extraordinary power to morph into different forms, often including human, animal, and hybrid variations. 
        <br>
        <br>
        Zoan fruits are known for their versatility, enabling users to adapt to various situations and challenges. Whether it's taking on the characteristics of a mighty beast, soaring through the skies as a majestic bird, or unleashing the agility of a cunning predator, Zoan fruits provide an array of skills and strengths.
      </p>
    </div>
    <div>
      <img src="@/assets/image13.png" alt="Image" class="img-fluid" style="width: 80px; border-radius: 10%;">
      <img src="@/assets/image12.png" alt="Image" class="img-fluid" style="width: 80px; border-radius: 10%;">
      <img src="@/assets/image17.png" alt="Image" class="img-fluid" style="width: 80px; border-radius: 10%;">
      <img src="@/assets/image15.png" alt="Image" class="img-fluid" style="width: 80px; border-radius: 10%;">
    </div>
   <!-- Section 2: List of Zoan Fruits -->
   <div class="zoan-list">
      <h2>List of Zoan Type Fruits in the Collection</h2>
      <!-- Display Zoan type fruits as sorted cards -->
      <div class="tiny-card" v-for="fruit in sortedZoanFruits" :key="fruit._id">
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
    name: 'ZoanFruits',
    data() {
      return {
        zoanFruits: [], // Populate this with the Zoan type fruits
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
    
    // Fetch Zoan type fruits from backend
    // Example:
    mounted() {
      // Fetch and populate this.zoanFruits from backend
    this.fetchZoanFruits()
  },
  computed: {
    // Create a computed property that sorts the fruits alphabetically
    sortedZoanFruits() {
      return this.zoanFruits.slice().sort((a, b) => a.name.localeCompare(b.name));
    },
  },
  methods: {
    async fetchZoanFruits() {
      try {
        const response = await fetch(`${process.env.VUE_APP_BACKEND_URL}/fruits/type/zoan`);
        if (!response.ok) {
          throw new Error('Failed to fetch Zoan fruits')
        }
        const data = await response.json()
        this.zoanFruits = data
      } catch (error) {
        console.error('Error fetching Zoan fruits:', error)
      }
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
  },
  }
  </script>
  
  <style scoped>
  
    .zoan-page {
      background: linear-gradient(135deg, #FFFF00, #00FF00, #0000FF);
      /* Other styles specific to this page */
      font-family: 'Croissant One', serif;
      min-height: 100vh; /* Set the minimum height to fill the viewport */
      margin: 0; /* Remove margin */
      padding: 0; /* Remove padding */font-family: 'Young Serif', serif;
      color: black;
        }
    .zoan-intro {
      text-align: center;
      padding-top: 50px;
      padding-left: 150px;
      padding-right: 150px;
    }
    .tiny-card {
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