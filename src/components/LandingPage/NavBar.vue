<template>
  <div class="navbar">
    <button @click="goHome" class="home-button">Home</button>
    <button @click="toggleAccount" class="account-button">Account</button>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  methods: {
    goHome() {
     this.$router.push({ name: 'HomePage' });
    },
    toggleAccount() {
      // Implement the logic to open the account dropdown
    },
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  background-color: lightpink;
  padding: 10px;
}

.home-button {
  background-color: #ff00ff;
  color: #00ff00;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}

.account-button {
  background-color: #ff00ff;
  color: #00ff00;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}
</style>
