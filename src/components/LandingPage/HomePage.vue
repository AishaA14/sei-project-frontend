<template>
    <div>
      <h1>The One Piece Orchard</h1>
      <router-link :to="'/fruits/list'">Search Devil Fruits</router-link>
      <router-link :to="'/user/login'">Login to your account</router-link>
      <router-link :to="'/fruits/character'">Search Character</router-link>
  
      <router-link v-if="isLoggedIn" :to="'/fruits/add'">Add New Fruit</router-link>
    </div>
  </template>
  
  <script>
  import { useCookies } from 'vue3-cookies'
  export default {
    name: 'HomePage',
    data() {
      return {
        isLoggedIn: false,
      };
    },
    beforeRouteEnter(to, from, next) {
    // Check the user's login status here and update the isLoggedIn status
    const { cookies } = useCookies();
    const userSession = cookies.get('user_session');

    next((vm) => {
      vm.isLoggedIn = !!userSession; // Convert to a boolean
    });
    },
  };
  </script>
  