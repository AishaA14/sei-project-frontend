<template>
  <body>
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

    <!-- Section 1: Fruit Data -->
  <div class="middle-section">
    <div :class="['fruit-card', `${fruit.type.toLowerCase()}-gradient`]">
      <!-- <img src="@/assets/image2.png" alt="Fruit Image" class="fruit-image"> -->
      <div class="card-details">
        <h1>{{ fruit.name }}</h1>
        <div>
          <h2>Type:</h2>
          <router-link v-if="fruit.type === 'Paramecia'" :to="'/fruits/type/paramecia'" style="text-decoration: none; font-size: 30px;">Paramecia</router-link>
          <router-link v-if="fruit.type === 'Logia'" :to="'/fruits/type/logia'" style="text-decoration: none; font-size: 30px;">Logia</router-link>
          <router-link v-if="fruit.type === 'Zoan'" :to="'/fruits/type/zoan'" style="text-decoration: none; font-size: 30px;">Zoan</router-link>
        </div>
        <h2>Character: {{ fruit.character }}</h2>
        <p>Abilities: {{ fruit.abilities }}</p>
      </div>
    </div>
    
    <!-- Section 2: Delete and Edit Options -->
    <div class="delete-edit-favourite-options" v-if="isLoggedIn">
      <button @click="deleteFruit" class="action-button">Delete this fruit from your collection</button>
      <button @click="editFruit" class="action-button">Edit this fruit</button>
      <button @click="toggleFavourite(fruit)" class="action-button">Add to favourites</button>
    </div>
    </div>

    <!-- Section 3: Display Reviews -->
    <div class="reviews">
      <h3>Reviews</h3>
      <ul>
        <li v-for="review in reviews" :key="review._id">
          <p><strong>Rating:</strong> {{ review.rating }}</p>
          <p><strong>Comment:</strong> {{ review.comment }}</p>
        </li>
      </ul>
    </div>

    <!-- Section 4: Add Review Form -->
    <div class="add-review" v-if="isLoggedIn">
      <h3>Add a Review</h3>
      <label for="rating">Rating (out of 5):</label>
      <input type="number" v-model="reviewData.rating" name="rating" id="rating" min="1" max="5">

      <label for="comment">Comment:</label>
      <textarea v-model="reviewData.comment" name="comment" id="comment" rows="4" cols="50"></textarea>

      <button class="btn btn-secondary" @click="addReview">Submit Review</button>
    </div>

    <!-- Footer Section -->
    <footer class="footer">
     &copy; StrawHats
    </footer>
  </div>
  </body>
</template>


<script>
import { useRoute } from 'vue-router';
import { decodeCredential } from 'vue3-google-login';
import { useCookies } from 'vue3-cookies'

const API_URL = process.env.VUE_APP_BACKEND_URL + '/fruits';


export default {
  name: 'SingleFruit',
  data() {
    return {
      error: '',
      isLoggedIn: false, // Add a data property to track user's login status
      isDropdownOpen: false,
      fruit: {
        _id: '',
        name: '',
        type: '',
        user: '',
        character: '',
        abilities: '',
      },
      reviewData: {
        rating: 1, // Default to a minimum rating value
        comment: '',
        user: ''
      },
      reviews: [], // Initialize the reviews array
      favouriteFruits: [],
      favourite: false
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
    toggleDropdown() {
        this.isDropdownOpen = !this.isDropdownOpen;
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
    toggleFavourite(fruit) {
      const index = this.favouriteFruits.findIndex((fav) => fav._id === fruit._id);

      if (index === -1) {
        // Fruit is not in favourites, add it
        this.favouriteFruits.push(fruit);
      } else {
        // Fruit is already in favourites, remove it
        this.favouriteFruits.splice(index, 1);
      }
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


<style>

body {
  background-color: black;
}
.fruit-image {
  width: 80px;
  height: 80px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
/* Logia background */
  .logia-gradient {
    background: linear-gradient(135deg, #FF2E2E, #70E1D7, #A600FF);
  }

  /* Zoan background */
  .zoan-gradient {
    background: linear-gradient(135deg, #FFFF00, #00FF00, #0000FF);
  }

  /* Paramecia background */
  .paramecia-gradient {
    background: linear-gradient(135deg, #FF5733, #FFC300, #FF3333);
  }

.fruit-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background: linear-gradient(135deg, #FF6B6B, #70E1D7); Gradient background */
  border: 7px solid #df8918;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  margin: 0 auto;
  max-width: 400px;
  padding: 20px;
  text-align: center;
  min-height: 400px;
  transition: transform 0.2s, box-shadow 0.2s;
  animation: pulsate 2s infinite alternate, grow 0.2s;
}

.fruit-card:hover {
  transform: scale(1.05);
  box-shadow: 0 5px 20px rgba(236, 150, 70, 0.849);
}
.fruit-card a {
    
    color: black; /* Set link color to black */
  }

.card-details {
  color: #000000; /* White text */
  font-family: 'Young Serif', serif;
}

.card-details h1 {
  font-size: 35px; /* Larger title */
  margin: 0;
}

.card-details h2 {
  font-size: 30px; /* Larger subtitle */
  margin: 0;
}

.card-details p {
  font-size: 16px; /* Larger text */
  margin: 20px 0; /* Increased margin */
}
.add-review, .reviews {
  background-color: white;
}
.action-button{
  font-size: 20px;
  margin: 20px;
  font-family: 'Raleway', sans-serif;
  font-weight: 1000;
  color: black;
}
@keyframes pulsate {
    0% {
      transform: scale(1);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }
    100% {
      transform: scale(1.03);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }
  }

  @keyframes grow {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.02);
    }
  }
</style>
