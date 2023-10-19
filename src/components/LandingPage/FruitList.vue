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
        <div class="middle">
          <div class="container mt-4">
            <p style="font-size: 20px; color:white;">
          <router-link v-if="isLoggedIn" to="/fruits/add">Add a new fruit to the collection</router-link>
          <router-link v-else to="/user/login">Login to add a new fruit to the collection</router-link>
        </p>
          <h1 style="font-size: 30px; color: white;">Browse through the collection</h1>
        </div>
        <input
            type="text"
            v-model="searchQuery"
            placeholder="Search by character or fruit name" style="width: 300px;"
          />
        <!-- Display Fruits as Cards -->
        <div class="container mt-4">
        <div class="fruit-gallery">
          <div class="small-card" v-for="fruit in filteredFruits" :key="fruit._id" :class="`${fruit.type.toLowerCase()}-gradient`">
            <p v-if="filteredFruits.length === 0">Can't find any matching fruits or characters.</p>

            <router-link :to="'/fruits/' + fruit._id" style="text-decoration: none; color: black">
              <h3>{{ fruit.name }}</h3>
              <p>Type: {{ fruit.type }}</p>
              <p>Character: {{ fruit.character }}</p>
            </router-link>
          </div>
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
const API_URL = process.env.VUE_APP_BACKEND_URL + '/fruits/list';

export default {
  name: 'FruitList',
  data() {
    return {
      loading: true,
      error: '',
      fruits: [],
      isLoggedIn: false, // Add a data property to track user's login status
      isDropdownOpen: false,
      searchQuery: '',
    };
  },
  computed: {
  filteredFruits() {
    const query = new RegExp(this.searchQuery, "i"); // "i" for case-insensitive search
    return this.fruits.filter(
      (fruit) =>
        query.test(fruit.character) || query.test(fruit.name)
    );
  },
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
/* .middle-section {
  background-color: #000;
  padding: 20px 0;
  text-align: center;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 25px;
}

.middle-section h1 {
  font-size: 2rem;
  margin: 20px 0;
} */

.middle {
  background-color: black;
}
.fruit-gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between; /* Adjust this to control spacing between cards */
}

.small-card {
  flex-basis: calc(20% - 10px); /* Adjust width and spacing */
  border: 1px solid #df8918;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  margin: 5px;
  padding: 10px;
  text-align: center;
  min-height: 200px;
  transition: transform 0.2s, box-shadow 0.2s;
  font-family: 'Young Serif', serif;
}

.small-card:hover {
  transform: scale(1.05);
  box-shadow: 0 5px 20px rgba(236, 150, 70, 0.849);
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
