<template>
  <div class="container">
    <NavBar />
    <h1 class="animate-psychedelic text-3xl font-bold mb-4">Browse through our fruits</h1>
    <div v-if="loading" class="text-lg">
      Loading...
    </div>
    <div v-else>
      <div v-for="fruit in fruits" :key="fruit._id">
        <div class="bg-white rounded shadow-md mb-4 p-4">
          <h5 class="text-xl font-semibold">
            <router-link :to="'/fruits/' + fruit._id">{{ fruit.name }}</router-link>
          </h5>
        </div>
      </div>
    </div>
    <p v-if="error" class="text-red-600 text-lg">{{ error }}</p>
  </div>
</template>

<script>
const API_URL = 'http://localhost:4000/fruits/list';

export default {
  name: 'FruitList',
  data() {
    return {
      loading: true,
      error: '',
      fruits: [],
    };
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
};
</script>

<style scoped>
@keyframes psychedelic {
  0% {
    transform: scale(1);
    color: #ff00ff;
  }
  50% {
    transform: scale(1.1);
    color: #00ff00;
  }
  100% {
    transform: scale(1);
    color: #ff00ff;
  }
}

.container {
  background-color: lightpink;
  padding: 20px;
  margin-top: 20px;
}

h5 {
  color: #ff00ff;
  text-transform: uppercase;
}
</style>
