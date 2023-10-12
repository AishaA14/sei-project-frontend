<template>
  <div class="container">
    <h1 class="display-4">Browse through our fruits</h1>
    <div v-if="loading" class="alert alert-info">
      Loading...
    </div>
    <div v-else>
      <div v-for="fruit in fruits" :key="fruit._id">
        <div class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">
              <router-link :to="'/fruits/' + fruit._id">{{ fruit.name }}</router-link>
            </h5>
          </div>
        </div>
      </div>
    </div>
    <p v-if="error" class="alert alert-danger">{{ error }}</p>
  </div>
</template>

  
  <script>
  const API_URL = 'http://localhost:4000/fruits/list'

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
        .then(response => response.json())
        .then(result => {
          this.fruits = result;
          this.loading = false; // Set loading to false when data is received
        })
        .catch(error => {
          console.error('Error fetching fruits:', error);
          this.error = 'Failed to fetch fruits.';
          this.loading = false; // Set loading to false in case of an error
        });
    },
  };
  </script>
  
  <style>
 h1 {
    font-family: 'Croissant One', sans-serif;
  }
  p {
    font-family: 'Young Serif', sans-serif;
  }
  .container{
    background-color: lightpink;
  }
</style>