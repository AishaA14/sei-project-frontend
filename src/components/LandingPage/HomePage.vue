<template>
    <body>
        <div>
        <!-- Top Navigation Section -->
        <nav class="navbar">
        <div class="container">
            <a class="navbar-brand" href="#">
            <img src="@/assets/strawhatslogo.png" alt="Logo" style="width: 80px;">
            </a> The One Piece Orchard
            <button class="navbar-toggler" type="button" @click="toggleDropdown">
            Account
            </button>
            <div :class="{ 'show': isDropdownOpen }" class="collapse navbar-collapse">
            <ul class="navbar-nav">
                <li class="nav-item">
                <router-link to="/my-fruits" class="nav-link">My Fruits</router-link>
                </li>
                <li class="nav-item">
                <router-link to="/favorites" class="nav-link">Favorites</router-link>
                </li>
                <li class="nav-item">
                <router-link to="/user/login" class="nav-link" @click="handleLogout">Log Out</router-link>
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
                <img src="@/assets/image3.png" alt="Image" class="img-fluid">
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
        isLoggedIn: false,
        isDropdownOpen: false,
        textTypingFinished: false,
      };
    },
    beforeRouteEnter(to, from, next) {
      const { cookies } = useCookies();
      const userSession = cookies.get('user_session');
  
      next((vm) => {
        vm.isLoggedIn = !!userSession;
      });
    },
    methods: {
      handleLogout() {
        // Implement logout logic here
      },
      toggleDropdown() {
        this.isDropdownOpen = !this.isDropdownOpen;
      },
    },
    mounted() {
      // Typewriter effect
  const text = "Devil fruits are mysterious and powerful fruits that grant those who consume them special abilities. However .  .  .  . this power comes at great cost to those who wish to rule the seas.  .  .  .  .  .  The user loses their ability to swim.  .  .  .  .  They become an anchor in the ocean. Check out all the weird and wonderful devil fruits we have collected so far. Down below";
  let i = 0;
  const speed = 30;
  
  const typeWriter = () => {
    if (i < text.length) {
      document.getElementById("typewriter-text").innerHTML += text.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    } else {
      // Typing has finished, set to true
      this.textTypingFinished = true;
    }
  };
  
  // Start typewriter effect when component is mounted
  typeWriter();
    }
  };
  </script>
  




  <style scoped>
  .navbar {
    background-color: black;
    color: white;
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

  body {
    margin: 0;
    padding: 0;
  }

  * {
    box-sizing: border-box;
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
  background-color: #33aaff; /* Hover color */
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
  