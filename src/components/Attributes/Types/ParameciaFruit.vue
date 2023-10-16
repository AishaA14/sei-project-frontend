<template>
    <div>
      <h1>Paramecia Type Fruits</h1>
      <!-- Display all Paramecia type fruits here -->
      <div v-for="fruit in parameciaFruits" :key="fruit._id">
        <router-link :to="'/fruits/' + fruit._id">{{ fruit.name }}</router-link>
      </div>
      <!-- Additional information about Paramecia fruits -->
      <div>
        <h2>What are Paramecia Fruits?</h2>
        <p>Paramecia fruits are a type of Devil Fruit that...</p>
        <!-- Add more information -->
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ParameciaFruits',
    data() {
      return {
        parameciaFruits: [], // Populate this with the Paramecia type fruits
      }
    },
    // Fetch Paramecia type fruits from backend
    // Example:
    mounted() {
      // Fetch and populate this.parameciaFruits from backend
    this.fetchParameciaFruits()
  },
  methods: {
    async fetchParameciaFruits() {
      try {
        const response = await fetch(`${process.env.VUE_APP_BACKEND_URL}/fruits/type/paramecia`);
        if (!response.ok) {
          throw new Error('Failed to fetch Paramecia fruits')
        }
        const data = await response.json()
        this.parameciaFruits = data
      } catch (error) {
        console.error('Error fetching Paramecia fruits:', error)
      }
    },
  },
  }
  </script>
  