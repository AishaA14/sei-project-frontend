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
        <!-- Text Section -->
        <div class="container mt-4"> 
          <p><router-link v-if="isLoggedIn" to="/fruits/add">Add a new fruit to the collection</router-link></p>
          <h1>Browse through the collection</h1>
        </div>
      <!-- Two-Column Layout -->
    <div class="container mt-4">
      <div class="row">
        <div class="col-md-6">
          <!-- Left Column: List of Fruits -->
          <ul class="list-group">
            <li class="list-group-item" v-for="fruit in fruits" :key="fruit._id">
              <router-link :to="'/fruits/' + fruit._id" style="text-decoration: none; color: black">{{ fruit.name }}</router-link>
            </li>
          </ul>
        </div>
        <div class="col-md-6">
          <!-- Right Column (Empty for now) -->
        </div>
      </div>
    </div>

    <!-- Footer Section -->
    <div class="footer">
      &copy; StrawHats
    </div>
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
      // Sort the fruits array alphabetically by name
      this.fruits = result.sort((a, b) => a.name.localeCompare(b.name));
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
/* New CSS styles for the fruit list page */
.middle-section {
  background-color: #000;
  padding: 20px 0;
  text-align: center;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.middle-section h1 {
  font-size: 2rem;
  margin: 20px 0;
}

.fruits-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.fruits-list h5 {
  font-size: 1.5rem;
}
.list-group-item {
  text-decoration: none;
  cursor: pointer;
  color: black;
}

.list-group-item:hover {
  text-decoration: underline; 
  font-size: 18px; 
}
.footer {
  background-color: #f8f9fa;
  padding: 10px 0;
  text-align: center;
  color: #000;
}


</style>
