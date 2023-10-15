<template>
  <div>
   <!-- Top Navigation Section -->
   <nav class="navbar">
        <div class="container">
            <a class="navbar-brand" href="#">
            <img src="@/assets/strawhatslogo.png" alt="Logo" style="width: 80px;">
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
          <p><router-link v-if="isLoggedIn" to="/fruits/add">Add a new fruit to the collection</router-link></p>
      
    <h1>Browse through the collection</h1>
    <div v-if="loading">
      Loading...
    </div>
    <div v-else>
      <div v-for="fruit in fruits" :key="fruit._id">
        <div>
          <h5>
            <router-link :to="'/fruits/' + fruit._id">{{ fruit.name }}</router-link>
          </h5>
        </div>
      </div>
    </div>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import { useCookies } from 'vue3-cookies';
const API_URL = 'http://localhost:4000/fruits/list';

export default {
  name: 'FruitList',
  data() {
    return {
      loading: true,
      error: '',
      fruits: [],
      isLoggedIn: false, // Add a data property to track user's login status
      isDropdownOpen: false
    };
  },
  beforeRouteEnter(to, from, next) {
    const { cookies } = useCookies();
    const userSession = cookies.get('user_session');
  
    // Check if the user is logged in
    const isLoggedIn = !!userSession;
    console.log(isLoggedIn)
  
    next((vm) => {
      vm.isLoggedIn = isLoggedIn; // Set the login status
    });
  },
 
  mounted() {
    fetch(API_URL)
      .then((response) => response.json())
      .then((result) => {
        this.fruits = result;
        this.loading = false; // Set loading to false when data is received
      })
      .catch((error) => {
        console.error('Error fetching fruits:', error);
        this.error = 'Failed to fetch fruits.';
        this.loading = false; // Set loading to false in case of an error
      });
  },
  methods: {
    // handleLogoutConfirmation() {
    //     if (confirm('Are you sure you want to log out?')) {
    //       this.handleLogout
    //     }
    //   },
    //   handleLogout: function () {
    //             googleLogout()
    //             this.$cookies.remove('user_session')
    //             this.isLoggedIn = false
    //             this.$router.push({ name: 'HomePage' })
    //             },

      toggleDropdown() {
        this.isDropdownOpen = !this.isDropdownOpen;
      },
  }
};
</script>

<style scoped>





</style>
