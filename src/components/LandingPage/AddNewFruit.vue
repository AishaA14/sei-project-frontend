<template>
  <div>
    <h1>Add a New Devil Fruit to the Collection</h1>
    <div>
      <label for="name">Name:</label>
      <input type="text" v-model="fruitData.name" name="name" id="name" placeholder="Name of the Devil Fruit">
      
      <label for="type">Type:</label>
      <select v-model="fruitData.type" name="type" id="type">
        <option value="Paramecia">Paramecia</option>
        <option value="Logia">Logia</option>
        <option value="Zoan">Zoan</option>
        <!-- <option value="MythicalZoan">Mythical Zoan</option> -->
      </select>
      
      <label for="character">Character:</label>
      <input type="text" v-model="fruitData.character" name="character" id="character" placeholder="User of the Devil Fruit">
      
      <!-- <label for="firstAppearance">First Appearance:</label>
      <input type="text" v-model="fruitData.firstAppearance" name="firstAppearance" id="firstAppearance" placeholder="First Appearance of the Devil Fruit"> -->
      
      <label for="abilities">Abilities:</label>
      <input type="text" v-model="fruitData.abilities" name="abilities" id="abilities" placeholder="Abilities of the Devil Fruit">

      <button @click="addNewFruit">Submit</button>
    </div>
    <p v-if="error">{{ error }}</p>
    <p v-if="success">{{ success }}</p>
  </div>
</template>

<script>
import { decodeCredential } from 'vue3-google-login'
const API_URL = 'http://localhost:4000/fruits/add';

export default {
  name: 'AddNewFruit',
  data() {
    return {
      error: '',
      success: '',
      fruitData: {
        name: '',
        type: '',
        character: '',
        // firstAppearance: '',
        abilities: '',
      },
      email: '', // Initialize user object
    };
  },
  // async created() {
  //   // Fetch user information and set it in the user object
  //   try {
  //     const userResponse = await fetch('/user/login');
  //     if (userResponse.ok) {
  //       this.user = await userResponse.json();
  //     }
  //   } catch (error) {
  //     console.error('Error fetching user information:', error);
  //   }
  // },
  mounted(){
        if (this.$cookies.isKey('user_session')) {
            this.isLoggedIn = true
            const userData = decodeCredential(this.$cookies.get('user_session'))
            this.userName = userData.given_name
            this.email = userData.email
            } else { 
                console.log('no user found')
            }                  
    },
  methods: {
    async addNewFruit() {
      this.error = '';
      this.success = '';

      if (!this.email) {
        this.error = 'User information is missing.';
        return;
      }

      const requestData = {
        name: this.fruitData.name,
        type: this.fruitData.type,
        character: this.fruitData.character,
        // firstAppearance: this.fruitData.firstAppearance,
        abilities: this.fruitData.abilities,
        user: this.email
      };

      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });

        if (response.ok) {
          this.success = 'Devil Fruit added successfully.';
          this.clearFields();
        } else {
          throw new Error('Failed to add Devil Fruit');
        }
      } catch (error) {
        this.error = 'An error occurred while adding the Devil Fruit. Please try again.';
        console.error(error);
      }
    },
    clearFields() {
      // Clear input fields
      this.fruitData.name = '';
      this.fruitData.type = '';
      this.fruitData.character = '';
      // this.fruitData.firstAppearance = '';
      this.fruitData.abilities = '';
    },
  },
};
</script>
