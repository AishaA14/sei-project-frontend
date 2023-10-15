<template>
  <div>
    <h1>Edit "{{ fruit.name }}" fruit here</h1>
    <label for="editFruitName">Fruit Name:</label>
    <input type="text" v-model="fruit.name" name="editFruitName" id="editFruitName" placeholder="Fruit name">
    <label for="editFruitType">Type:</label>
    <select v-model="fruit.type" name="editFruitType" id="editFruitType">
      <option value="Paramecia">Paramecia</option>
      <option value="Logia">Logia</option>
      <option value="Zoan">Zoan</option>
    </select>

  
    
    <label for="editFruitAbilities">Abilities:</label>
    <input type="text" v-model="fruit.abilities" name="editFruitAbilities" id="editFruitAbilities" placeholder="Abilities">

    <button @click="editFruit">Submit Update</button>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';

export default {
  name: 'EditFruit',
  data() {
    return {
      error: '',
      fruit: {
        _id: '',
        name: '',
        type: '',
        user: '',
        abilities: '',
      }
    }
  },
  mounted() {
    const route = useRoute();
    try {
      fetch(`http://localhost:4000/fruits/${route.params.id}`)
        .then(result => result.json())
        .then(data => {
          this.fruit._id = route.params.id;
          this.fruit.name = data.name;
          this.fruit.type = data.type;
          this.fruit.user = data.user;
          this.fruit.abilities = data.abilities;
        });
    } catch (error) {
      console.log('Could not get data from another page', error);
    }
  },
  methods: {
    async editFruit() {
      console.log(this.fruit);

      const updatedFruit = {
        name: this.fruit.name,
        type: this.fruit.type,
        user: this.fruit.user,
        loggedInUser: '',
        abilities: this.fruit.abilities,
      };

      await fetch(`http://localhost:4000/fruits/update/${this.fruit._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFruit),
      });

      this.$router.replace({ name: 'FruitList' });
    },
  },
};
</script>
