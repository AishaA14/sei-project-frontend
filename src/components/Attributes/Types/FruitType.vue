<template>
  <div>
    <h1>{{ type }} Type Fruits</h1>
    <div v-for="fruit in filteredFruits" :key="fruit._id">
      <router-link :to="'/fruits/list/' + fruit._id">{{ fruit.name }}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FruitType',
  props: ['type'],
  computed: {
    filteredFruits() {
      // Filter fruits based on the selected type
      return this.$store.state.fruits.filter((fruit) => fruit.type === this.type);
    },
  },
};
</script>
