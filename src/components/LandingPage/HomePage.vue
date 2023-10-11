<!-- make nav page -->
<template>
    <div>
        <h1>The One Piece Orchard</h1>
        <button><router-link :to="'/fruits/list'">Search Devil Fruits</router-link></button>
        <button><router-link :to="'/fruits/add'">Add A New Fruit</router-link></button>
        <button><router-link :to="'/user/login'">Login to your account</router-link></button>
        <button><router-link :to="'/fruits/character'">Search Character</router-link></button>
        <!-- Conditionally render the list when devilFruits is available -->
        <!-- <div v-if="devilFruits.length > 0">
            <h2>Devil Fruits:</h2>
            <ul> -->
                <!-- loop through the array and display the information -->
                <!-- <li v-for="fruit in devilFruits" :key="fruit._id">{{ fruit.name }}</li>  -->
            <!-- </ul>
        </div> -->
    </div>
</template>

<script>
export default {
    name: 'HomePage',
    // data() {
    //     return {
    //         devilFruits: [] // store the list of devil fruits
    //     }
    // },
    // created() { // make an api request to fetch Devil Fruits when the component is created
    //     this.fetchDevilFruits()
    // },

    // methods: {
    //     async fetchDevilFruits() {
    //         try {
    //             const response = await fetch('http://localhost:4000')
    //             console.log(response)
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok')
    //             }
    //             const data = await response.json() // store the data in
    //             this.devilFruits = data
    //         } catch (error) {
    //             console.error('Error fetching Devil Fruits:', error)
    //         }
    //     }
    // }
}
</script>

<!-- made most of my components and routed them, work on restricting access and navigation page and styling -->
<!-- include regex and drop down menus -->
