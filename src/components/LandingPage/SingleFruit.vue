<template>
  <div>
    <nav>
    <button @click="goHome" class="home-button">Home</button>
    <!-- Account dropdown button -->
    <div class="btn-group" @click="toggleDropdown">
      <button
        class="btn btn-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Account
      </button>
      <div class="dropdown-menu" :class="{ show: isDropdownOpen }">
        <router-link to="/my-fruits" class="dropdown-item">My Fruits</router-link>
        <router-link to="/favourites" class="dropdown-item">Favorites</router-link>
        <button @click="handleLogout" class="dropdown-item">Logout</button>
      </div>
    </div>
    </nav>
    <div v-if="fruit" class="single-fruit mt-4 text-center">
      <h1 class="">{{ fruit.name }}</h1>
      <h2>Type: 
        <router-link v-if="fruit.type === 'Paramecia'" :to="'/fruits/type/Paramecia'">Paramecia</router-link>
        <router-link v-if="fruit.type === 'Logia'" :to="'/fruits/type/Logia'">Logia</router-link>
        <router-link v-if="fruit.type === 'Zoan'" :to="'/fruits/type/Zoan'">Zoan</router-link>
      </h2>
      <p>Abilities: {{ fruit.abilities }}</p>
      <div>
        <button @click="deleteFruit" class="action-button">Delete this fruit from your collection</button>
        <button @click="editFruit" class="action-button">Edit this fruit</button>
      </div>
    </div>
    <!-- Display Reviews -->
    <div class="reviews">
      <h3>Reviews</h3>
      <ul>
        <li v-for="review in reviews" :key="review._id">
          <p><strong>Rating:</strong> {{ review.rating }}</p>
          <p><strong>Comment:</strong> {{ review.comment }}</p>
          <p v-if="review.user"><strong>User:</strong> {{ review.user.email }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';

const API_URL = 'http://localhost:4000/fruits';

export default {
  name: 'SingleFruit',
  data() {
    return {
      error: '',
      fruit: {
        _id: '',
        name: '',
        type: '',
        user: '',
        // firstAppearance: '',
        abilities: '',
      },
      reviews: []
    };
  },
  mounted() {
    try {
      const route = useRoute();
      fetch(`${API_URL}/${route.params.id}`)
        .then((response) => response.json())
        .then((result) => {
          this.fruit = result;
        });
        // Fetch reviews for the current fruit
      fetch(`${API_URL}/${route.params.id}/reviews`)
        .then((response) => response.json())
        .then((reviews) => {
          this.reviews = reviews;
        });
    } catch (error) {
      console.log('Cannot retrieve fruit', error);
    }
  },
  methods: {
    goHome() {
      this.$router.push({ name: 'HomePage' });
    },
    async deleteFruit() {
      if (confirm('Are you sure you want to delete this fruit?')) {
        try {
          await fetch(`${API_URL}/${this.fruit._id}`, {
            method: 'DELETE',
          });
          console.log('Fruit deleted');
          this.$router.replace({ name: 'FruitList' });
        } catch (error) {
          console.log('Error deleting fruit', error);
        }
      }
    },
    editFruit() {
      this.$router.push({
        name: 'EditFruit',
        params: { id: this.fruit._id },
      });
    },
  },
};
</script>
