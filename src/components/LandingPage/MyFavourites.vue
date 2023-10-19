<template>
    <div>
      <h1>My Favorite Fruits</h1>
      <div v-for="fruit in favoriteFruits" :key="fruit._id">
        <!-- Display favorite fruit details here -->
        <h2>{{ fruit.name }}</h2>
        <p>Type: {{ fruit.type }}</p>
        <p>Character: {{ fruit.character }}</p>
        <p>Abilities: {{ fruit.abilities }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MyFavourites',
    data() {
      return {
        favoriteFruits: [], // Initialize the list of favorite fruits
      };
    },
  };
  </script>
  