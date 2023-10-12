<template>
    <!-- add place holder image -->
    <div v-if="fruit">
      <h1>{{ fruit.name }}</h1>
      <!-- Route to paramecia if the fruit is a paramecia -->
      <h2>Type: <router-link v-if="fruit.type === 'Paramecia'" to="/fruits/type/:type">Paramecia</router-link></h2> 
      <!-- <p>User: {{ fruit.user }}</p> -->
      <p>First Appearance: {{ fruit.firstAppearance }}</p>
      <p>Abilities: {{ fruit.abilities }}</p>
      <div>
        <button @click="deleteFruit">Delete this fruit from your collection</button>
        <button @click="editFruit">Edit this fruit</button>
      </div>
    </div>
  </template>
  
  <script>
  import { useRoute } from 'vue-router'
  const API_URL = 'http://localhost:4000/fruits'
  
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
          firstAppearance: '',
          abilities: '',
        },
      }
    },
    mounted() {
      try {
        const route = useRoute()
        fetch(`${API_URL}/${route.params.id}`)
          .then((response) => response.json())
          .then((result) => {
            this.fruit = result;
          });
      } catch (error) {
        console.log('Cannot retrieve fruit', error);
      }
    },
    methods: {
      async deleteFruit() {
    if (confirm('Are you sure you want to delete this fruit?')) {
      try {
        await fetch(`http://localhost:4000/fruits/${this.fruit._id}`, {
          method: 'DELETE',
        })
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
          params: { id: this.fruit._id }
        })
      }
    }
  }
  </script>
  