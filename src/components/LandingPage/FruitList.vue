<template>
    <div>
      <h1>Browse through our fruits</h1>
      <div v-if="loading">Loading...</div>
      <div v-else>
        <div v-for="fruit in fruits" :key="fruit._id">
          <p><router-link :to="'/fruits/' + fruit._id">{{ fruit.name }}</router-link></p>
          <!-- Other fruit details can be displayed here if needed -->
        </div>
        <div>
            <!-- Use 'TypeView', 'UserView', and 'FirstAppearanceView' components -->
            <!-- <TypeView attribute-name="Paramecia" />
            <UserView attribute-name="User Name" />
            <FirstAppearanceView attribute-name="Arc Name" /> -->
        </div>
      </div>
      <p v-if="error">{{ error }}</p>
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
  