<template>
  <div>
    <h1>Zoan Type Fruits</h1>
    <!-- Display all Zoan type fruits here -->
    <div v-for="fruit in zoanFruits" :key="fruit._id">
      <router-link :to="'/fruits/' + fruit._id">{{ fruit.name }}</router-link>
    </div>
    <!-- Additional information about Zoan fruits -->
    <div>
      <h2>What are Zoan Fruits?</h2>
      <p>Zoan fruits are a type of Devil Fruit that...</p>
      <!-- Add more information -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'ZoanFruits',
  data() {
    return {
      zoanFruits: [], // Populate this with the Zoan type fruits
    }
  },
  // Fetch Zoan type fruits from backend
  // Example:
  mounted() {
    // Fetch and populate this.zoanFruits from backend
  this.fetchZoanFruits()
},
methods: {
  async fetchZoanFruits() {
    try {
      const response = await fetch('http://localhost:4000/fruits/type/zoan') 
      if (!response.ok) {
        throw new Error('Failed to fetch Zoan fruits')
      }
      const data = await response.json()
      this.zoanFruits = data
    } catch (error) {
      console.error('Error fetching Zoan fruits:', error)
    }
  },
},
}
</script>
