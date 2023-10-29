# The One Piece Orchard Frontend
![Game Screenshot](.png)


## Description

This is the frontend code for The One Piece Orchard, a web application that serves as an online library for fans of the One Piece series. It allows logged-in users to create new "Devil Fruit" entries, edit existing ones, and even delete them. This project was built using the Bootstrap, MEVN stack, consisting of MongoDB, Express.js, Vue.js, and Node.js.

## Table of Contents

- [Deployment Link](#deployment-link)
- [Features](#features)
- [How to Play](#how-to-play)
- [Installation](#installation)
- [Timeframe & Working Team](#timeframe--working-team)
- [Technologies Used](#technologies-used)
- [Brief](#brief)
- [Planning](#planning)
  - [Initial Steps](#initial-steps)
  - [Sketches and Diagrams](#sketches-and-diagrams)
  - [Logic Flow](#logic-flow)
- [Build/Code Process](#buildcode-process)
  - [Setting Up the Game Board](#setting-up-the-game-board)
  - [Handling Snake Movement](#handling-snake-movement)
  - [Game Over Conditions](#game-over-conditions)
- [Challenges](#challenges)
  - [Technical Challenges](#technical-challenges)
    - [Managing Snake Movement](#1-managing-snake-movement)
    - [Game Over State Management](#2-game-over-state-management)
- [Key Learnings/Takeaways](#key-learningstakeaways)
- [Bugs](#bugs)
- [Future Improvements](#future-improvements)



## Deployment Link

[Check out the website](https://the-one-piece-orchard.netlify.app/fruits)

To be able add entries or make edits, click the account tab and click on login to login with google.

## Features

Our Devil Fruit Catalog application offers a range of features to enhance the user experience and provide a comprehensive database of Devil Fruits from the One Piece universe. Here are some of the core features:

### 1. Devil Fruit Listings

- **Browse Devil Fruits**: View a list of all known Devil Fruits, each with detailed information, including their names, types, characteristics, and abilities.

- **Search and Filter**: Use the search bar and filters to easily find specific Devil Fruits based on their attributes, making it a breeze to locate your favorite or learn about new discoveries.

### 2. Single Fruit Details

- **In-Depth Information**: Access detailed information about a specific Devil Fruit by clicking on its card in the list. This includes comprehensive descriptions, properties, and user-contributed notes.

- **Edit and Delete**: For logged-in users, the ability to edit or delete Devil Fruit entries provides an interactive and community-driven aspect to the catalog.

### 3. User Authentication

- **User Accounts**: Create a personal account to log in and access additional functionality. User accounts are required for editing or deleting Devil Fruit entries.

- **Authentication Status**: User sessions are used to determine authentication status. The application intelligently displays or hides features like editing or deleting fruits based on user login status.

### 4. Add New Fruit

- **Contribute New Entries**: Authenticated users can add new Devil Fruits to the catalog, including providing detailed information about the fruit's name, type, characteristics, and abilities.

- **Validation and Error Handling**: The application provides feedback and error messages to ensure that all submitted Devil Fruits meet the required criteria.

### 5. Responsive Design

- **Mobile and Desktop Friendly**: The application is designed to work seamlessly on various devices, offering an optimized user experience on both mobile phones and desktop computers.

### 6. Intuitive User Interface

- **User-Friendly Interface**: We've focused on creating an intuitive and visually appealing design to ensure easy navigation and exploration of Devil Fruit information.

These features combine to make our Devil Fruit Catalog a valuable resource for One Piece enthusiasts and a collaborative platform for sharing knowledge about these mystical and intriguing fruits.



## Installation

Clone the repository to your local machine:

Open your terminal or command prompt and navigate to the directory where you want to store the game on your local machine. 
Then, use the following command to clone the repository: 

```
git clone https://github.com/AishaA14/snake_project.git
```
## Timeframe & Working Team

This project was completed within a week, working independently. 

## Technologies Used

Frontend: Vue.js
Backend: Node.js, Express.js
Database: MongoDB
Version Control: Git
Development Tools: Visual Studio Code, Postman.

## Brief

This project was developed as part of my coding bootcamp curriculum. The project's goal was to create a user-friendly online library where fans could contribute and manage entries related to the One Piece series, specifically the Devil Fruits.

## Planning

During the planning phase, I created wireframes and sketched the user interface. Below are some of the planning elements:

Wireframes: Here is the proposed design of the website:
Wireframe

ERD Diagram: The Entity-Relationship Diagram outlines the relationships within the database. Here's an example:

### Initial Steps

Before diving into the code, I took some time to plan out the website. This planning stage was crucial for understanding how the website would work, defining its logic, and ensuring a smooth development process.

### Sketches and Diagrams

I used Excalidraw, a collaborative whiteboard tool, to create visual sketches and diagrams that helped me visualize the website's components and user interactions. These sketches allowed me to map out the following key aspects of the website:

insert here

### Logic Flow

insert

[Excalidraw Diagram](excalidraw.png)

## Build/Code Process

### Adding a New Fruit

To add a new Devil Fruit to the database, I used the `addNewFruit` method.  It first ensures that the user information is provided then it makies a POST request to the API, creating a new Devil Fruit entry.  Below is the JavaScript code for the `addNewFruit` method:

```javascript
async addNewFruit() {
  this.error = ''
  this.success = ''

  if (!this.email) {
    this.error = 'User information is missing.'
    return;
  }

  const requestData = {
    name: this.fruitData.name,
    type: this.fruitData.type,
    character: this.fruitData.character,
    abilities: this.fruitData.abilities,
    user: this.email,
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })

    if (response.ok) {
      this.success = 'Devil Fruit added successfully.'
      this.clearFields();
      this.$router.replace({ name: 'FruitList' })
    } else {
      throw new Error('Failed to add Devil Fruit')
    }
  } catch (error) {
    this.error = 'An error occurred while adding the Devil Fruit. Please try again.'
    console.error(error)
  }
}
```

### Editing an Existing Fruit

the EditFruit method creates an 'updatedFruit' object with the updated details of the devil fruit. It then makes a put request to the api with the updated fruit data, targeting the specific devil fruits to be edited using its 'id'. If the updater is successful, the user is redirected to the Fruit List page showing the updated information. Below is the JavaScript code for the `editFruit` method:

```javascript
async editFruit() {
  console.log(this.fruit);

  const updatedFruit = {
    name: this.fruit.name,
    type: this.fruit.type,
    character: this.fruit.character,
    loggedInUser: this.userData.email,
    abilities: this.fruit.abilities,
  };

  await fetch(`${process.env.VUE_APP_BACKEND_URL}/fruits/update/${this.fruit._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedFruit),
  })

  this.$router.replace({ name: 'FruitList' })
}
```

### deleting an Existing Fruit

The 'deleteFruit' method sends a delete request to the API, targeting the specific devil fruit by its 'id'. After successful deletion the user is redirected to the Fruit List page where the deleted fruit will no longer appear. Below is the JavaScript code for the `deleteFruit` method:

```javascript
 async deleteFruit() {
      if (confirm('Are you sure you want to delete this fruit?')) {
        try {
          await fetch(`${API_URL}/${this.fruit._id}`, {
            method: 'DELETE',
          })
          this.$router.replace({ name: 'FruitList' })
        } catch (error) {
          console.error('Error deleting fruit:', error)
        }
      }
    },

```
## Challenges

Implementing user authentication posed several challenges, primarily centered around restricting access to certain features and actions based on the user's login status. Below are the key challenges and the solutions I implemented:

### Challenge 1: Restricting Edit and Add Options

Originally, I faced the challenge of allowing all users to see and potentially use the "Edit" and "Add" options for Devil Fruits. My initial approach was to check if a user was logged in and then decide whether to grant access. However, implementing this logic proved to be complex, and I encountered issues.

### Solution 1: Single Fruit Page Authentication

To address the challenge, I implemented a more straightforward solution. On the "Single Fruit" page, we check if a user session exists, which indicates that the user is logged in. This determines whether the "Edit" and "Delete" buttons are visible. If the user is not logged in, these options are hidden.

### Challenge 2: Restricting Access to the "Add New Fruit" Link

Another challenge was determining whether users should have access to the "Add New Fruit" link on the Fruit List page. I needed to restrict this link based on the user's login status.

### Solution 2: Fruit List Page Authentication

To overcome this challenge, I examined the user's existence as opposed to their login status on the Fruit List page. If the user exists (i.e., they are logged in), the "Add New Fruit" link is visible. If the user does not exist, the link remains hidden.

These solutions provided a more intuitive and user-friendly way to handle user authentication and access control for our Devil Fruit application. 

## Key Learnings/Takeaways

Through this project, I gained confidence in working with Vue.js and express. I also improved my understanding of project management practices. This experience has enhanced my problem-solving skills and logical thinking.

## Future Improvements

Implement user profiles and avatars.
Include drag and drop image function for users to add images of Devil Fruits.
Generate rankings based on user ratings.
Enhance the search and filter functionality for Devil Fruit entries.
Include community forum











