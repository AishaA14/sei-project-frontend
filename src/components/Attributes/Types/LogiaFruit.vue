<template>
  <div>
    <h1>Logia Type Fruits</h1>
    <!-- Display all Logia type fruits here -->
    <div v-for="fruit in LogiaFruits" :key="fruit._id">
      <router-link :to="'/fruits/' + fruit._id">{{ fruit.name }}</router-link>
    </div>
    <!-- Additional information about Logia fruits -->
    <div>
      <h2>What are Logia Fruits?</h2>
      <p>Logia fruits are a type of Devil Fruit that...</p>
      <!-- Add more information -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'LogiaFruits',
  data() {
    return {
      LogiaFruits: [], // Populate this with the Logia type fruits
    }
  },
  // Fetch Logia type fruits from backend
  // Example:
  mounted() {
    // Fetch and populate this.LogiaFruits from backend
  this.fetchLogiaFruits()
},
methods: {
  async fetchLogiaFruits() {
    try {
      const response = await fetch('http://localhost:4000/fruits/type/logia')
      if (!response.ok) {
        throw new Error('Failed to fetch Logia fruits')
      }
      const data = await response.json()
      this.LogiaFruits = data
    } catch (error) {
      console.error('Error fetching Logia fruits:', error)
    }
  },
},
}
</script>
