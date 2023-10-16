<template>
    <body>
        <div class="main-container">
        <!-- Top Navigation Section -->
        <nav class="navbar">
        <div class="container">
            <a class="navbar-brand" href="#">
              <router-link to="/fruits" @click="$router.push({name: 'HomePage'})">
            <img src="@/assets/strawhatslogo.png" alt="Logo" style="width: 80px;">
            </router-link>
            </a> The One Piece Orchard
            <button class="navbar-toggler" type="button" @click="toggleDropdown" style="color: white">
            Account
            </button>
            <div :class="{ 'show': isDropdownOpen }" class="collapse navbar-collapse">
            <ul class="navbar-nav">
              <!-- add routes -->
                <li class="nav-item">
                <router-link v-if="isLoggedIn" to="/fruits/myfruits" class="nav-link" style="color: white">My Fruits</router-link>
                </li>
                <li><router-link v-if="isLoggedIn" to="/user/login" class="nav-link" style="color: white">
                    Log Out
                </router-link>
                 <router-link v-else to="/user/login" class="nav-link" style="color: white">Log In</router-link> 
                 </li> 
            </ul>
            </div>
        </div>
        </nav>
        <!-- Middle Content Section -->
        <div class="middle-section">
        <div class="container">
            <div class="row">
            <div class="col-md-8">
                <p id="typewriter-text"></p>
                <button v-if="textTypingFinished" class="button-pulsate"><router-link :to="'/fruits/list'">View Fruits</router-link></button>
            </div>
            <div class="col-md-4"> Spotlight
                <!-- <img src="@/assets/image3.png" alt="Image" class="img-fluid"> -->
            </div>
            </div>
            <div class="row mt-4">
            <div class="col-md-6">
                <h3>Latest News</h3>
                <ul>
                <li>Placeholder for latest news item 1.</li>
                <li>Placeholder for latest news item 2.</li>
                <li>Placeholder for latest news item 3.</li>
                </ul>
            </div>
            <div class="col-md-6">
                <h3>Top Rated Devil Fruits</h3>
                <ul>
                <li>Placeholder for upcoming event 1.</li>
                <li>Placeholder for upcoming event 2.</li>
                <li>Placeholder for upcoming event 3.</li>
                </ul>
            </div>
            </div>
        </div>
        </div>
        <!-- Footer Section -->
        <footer class="footer">
            <div class="container">
            &copy; StrawHats
            </div>
        </footer>
        </div>
    </body>
  </template>
  
  <script>
import { useCookies } from 'vue3-cookies';

export default {
  name: 'HomePage',
  data() {
    return {
      isLoggedIn: false, // Add a data property to track user's login status
      isDropdownOpen: false,
      textTypingFinished: false,
      typeWriterTimer: null, // Store the timer ID
    };
  },
  beforeRouteEnter(to, from, next) {
    const { cookies } = useCookies();
    const userSession = cookies.get('user_session');

    // Check if the user is logged in
    const isLoggedIn = !!userSession;

    next((vm) => {
      vm.isLoggedIn = isLoggedIn; // Set the login status
    });
  },
  beforeRouteLeave(to, from, next) {
    // Ensure the typewriter effect stops when leaving the page
    if (this.typeWriterTimer) {
      clearTimeout(this.typeWriterTimer);
    }
    next();
  },
  methods: {
    // handleLogoutConfirmation() {
    //     if (confirm('Are you sure you want to log out?')) {
    //       this.handleLogout()
    //     }
    //   },
      // handleLogout: function () {
      //           googleLogout()
      //           this.$cookies.remove('user_session')
      //           this.isLoggedIn = false
      //           this.$router.push({ name: 'HomePage' })
      //           },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
  },
  mounted() {
    // Typewriter effect
    const text =
      "Devil fruits are mysterious and powerful fruits that grant those who consume them special abilities. However .  .  .  this power comes at great cost to those who wish to rule the seas.  .  .  .  The user loses their ability to swim.  .  .  .  .  They become an anchor in the ocean. Check out all the weird and wonderful devil fruits we have collected so far. Down below";
    let i = 0;
    const speed = 30;

    const typeWriter = () => {
      console.log('hello')
      if (i < text.length) {
        document.getElementById("typewriter-text").innerHTML += text.charAt(i);
        i++;
        this.typeWriterTimer = setTimeout(typeWriter, speed);
      } else {
        // Typing has finished, set to true
        this.textTypingFinished = true;
      }
    };

    // Start typewriter effect when component is mounted
    typeWriter();
  },
};
</script>

  




  <style>
      * {
        box-sizing: border-box;
      }

     .main-container {
        margin: 0;
        padding: 0;
      }

    .navbar {
        background-color: black;
        color: white;
        font-family: 'Michroma', sans-serif;
        font-family: 'Yuji Hentaigana Akari', cursive;
    }

    .middle-section {
        background-color: black ;
        padding: 20px 0;
        text-align: center;
        color: white;
    }
    
    .footer {
        background-color: #f8f9fa;
        padding: 10px 0;
        text-align: center;
    }

    #typewriter-text {
        color: orange;
    }


    /* View fruits button */
    .button-pulsate {
    padding: 10px 20px;
    border: none;
    border-radius: 50px; /* Make it rounded */
    color: white;
    background-color: #33ccff; /* Neon color */
    font-size: 12px;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
    animation: pulse 2s infinite; /* Pulsating animation */
    box-shadow: 0 0 10px rgba(51, 204, 255, 0); /* Initial box shadow (transparent) */
    }

    .button-pulsate:hover {
    background-color: red; /* Hover color */
    box-shadow: 0 0 10px rgba(51, 204, 255, 0.7); /* Box shadow on hover */
    }

    @keyframes pulse {
    0% {
        transform: scale(1);
        box-shadow: 0 0 10px rgba(51, 204, 255, 0); /* Transparent box shadow */
    }
    50% {
        transform: scale(1.05); /* Scale up at 50% of the animation */
        box-shadow: 0 0 10px rgba(51, 204, 255, 0.7); /* Faded box shadow */
    }
    100% {
        transform: scale(1);
        box-shadow: 0 0 10px rgba(51, 204, 255, 0); /* Transparent box shadow */
    }
    }
  </style>
  