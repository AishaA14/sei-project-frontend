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
          <router-link to="/user/login">Login</router-link>
        </div>
      </div>
    </nav>
    <div v-if="fruit" class="single-fruit mt-4 text-center">
      <h1 class="">{{ fruit.name }}</h1>
      <h2>Type: 
        <router-link v-if="fruit.type === 'Paramecia'" :to="'/fruits/type/paramecia'">Paramecia</router-link>
        <router-link v-if="fruit.type === 'Logia'" :to="'/fruits/type/logia'">Logia</router-link>
        <router-link v-if="fruit.type === 'Zoan'" :to="'/fruits/type/zoan'">Zoan</router-link>
      </h2>
      <p>Abilities: {{ fruit.abilities }}</p>
      <div>
        <button v-if="isLoggedIn" @click="deleteFruit" class="action-button">Delete this fruit from your collection</button>
        <button v-if="isLoggedIn" @click="editFruit" class="action-button">Edit this fruit</button>
      </div>
    </div>
    <!-- Display Reviews -->
    <div class="reviews">
      <h3>Reviews</h3>
      <ul>
        <li v-for="review in reviews" :key="review._id">
          <p><strong>Rating:</strong> {{ review.rating }}</p>
          <p><strong>Comment:</strong> {{ review.comment }}</p>
        </li>
      </ul>
    </div>
    
    <!-- Add review form -->
    <div v-if="isLoggedIn">
      <h3>Add a Review</h3>
      <label for="rating">Rating (out of 5):</label>
      <input type="number" v-model="reviewData.rating" name="rating" id="rating" min="1" max="5">

      <label for="comment">Comment:</label>
      <textarea v-model="reviewData.comment" name="comment" id="comment" rows="4" cols="50"></textarea>

      <button @click="addReview">Submit Review</button>
    </div>
    <p v-if="errorReview">{{ errorReview }}</p>
    <p v-if="successReview">{{ successReview }}</p>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import { decodeCredential } from 'vue3-google-login';

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
        abilities: '',
      },
      reviewData: {
        rating: 1, // Default to a minimum rating value
        comment: '',
        user: ''
      },
      reviews: [] // Initialize the reviews array
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

    try {
      const route = useRoute();
      console.log('fetching fruit')
      fetch(`${API_URL}/${route.params.id}`)
        .then((response) => response.json())
        .then((result) => {
          this.fruit = result;
          console.log('Fruit data:', this.fruit);
        });

      // Fetch reviews for the current fruit
      fetch(`${API_URL}/${route.params.id}/reviews`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((reviews) => {
          this.reviews = reviews;
          console.log('Reviews:', this.reviews);
        })
        .catch((error) => {
          console.error('Error fetching reviews:', error);
        });
    } catch (error) {
      console.error('Cannot retrieve fruit:', error);
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
          console.error('Error deleting fruit:', error);
        }
      }
    },
    editFruit() {
      this.$router.push({
        name: 'EditFruit',
        params: { id: this.fruit._id },
      });
    },
    
    async addReview() {
      console.log('addReview method called');
      console.log('reviewData:', this.reviewData);
      console.log(this.fruit._id);
      const fruitId = this.fruit._id;

      this.errorReview = '';
      this.successReview = '';
      const userData = decodeCredential(this.$cookies.get('user_session'));
      console.log('userData', userData);

      const requestData = {
        rating: this.reviewData.rating,
        comment: this.reviewData.comment,
        fruitId: fruitId, // Fruit ID (or another way to identify the associated fruit)
      };
      try {
        const response = await fetch(`${API_URL}/${this.fruit._id}/reviews/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });

        if (response.ok) {
          this.successReview = 'Review added successfully.';
          this.clearReviewFields();
        } else {
          throw new Error('Failed to add review');
        }
      } catch (error) {
        this.errorReview = 'An error occurred while adding the review. Please try again.';
        console.error('Error adding review:', error);
      }
    },
    clearReviewFields() {
      this.reviewData.rating = 1;
      this.reviewData.comment = '';
    },
  },
};
</script>


