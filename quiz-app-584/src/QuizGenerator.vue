<template>
  <!-- Front Page Section -->

  <!-- v-show is a conditional rendering property    -->
  <!-- from the Vue framework. When the condition  -->
  <!-- is true the div is rendered. When it's      -->
  <!-- false the div and its contents are hidden.  -->
  <div v-show="responseMessages.length === 0" class="input-wrapper">
    <!-- Input section for the quiz -->
    <div class="input-section">
      <h1 class="page-title">Welcome to the Quiz Generator</h1>
      <!-- v-model binds the userMessage variable to the -->
      <!-- text entered by the user into the textarea.   -->
      <textarea
        v-model="userMessage"
        placeholder="Enter your reference information."
        class="message-input"
      ></textarea>
      <!-- @click is similar to the button property onclick. -->
      <!-- When the button is clicked the sendMessage method -->
      <!-- is called.                                        -->
      <button @click="sendMessage" class="send-button">Send Message</button>
      <!-- v-if is a conditional rendering property      -->
      <!-- from the Vue framework. When the condition  -->
      <!-- is true the label is rendered. When it's    -->
      <!-- false the label is hidden                   -->
      <label v-if="errorMessage.length > 0" class="error-message">{{
        errorMessage
      }}</label>
      <!-- v-show is a conditional rendering property    -->
      <!-- from the Vue framework. When the condition  -->
      <!-- is true the componenet is rendered. When    -->
      <!-- its false the component is hidden.          -->
      <LoadingSpinner v-show="loading" />
    </div>
  </div>

  <!-- Quiz Section -->

  <!-- Div wrapper for the entire quiz section. -->
  <!-- v-show is a conditional rendering property    -->
  <!-- from the Vue framework. When the condition  -->
  <!-- is true the div is rendered. When it's      -->
  <!-- false the div and its contents are hidden.  -->
  <div v-show="responseMessages.length > 0" class="quiz-wrapper">
    <!-- Popup Window Section -->

    <!-- Display popup window when showInput is true -->
    <!-- v-show is a conditional rendering property    -->
    <!-- from the Vue framework. When the condition  -->
    <!-- is true the div is rendered. When it's      -->
    <!-- false the div and its contents are hidden.  -->
    <div v-show="showInput">
      <PopupWindow>
        <div class="popup-content">
          <h2 class="page-title">Original Input</h2>
          <p class="old-input-wrapper">{{ userMessage }}</p>
          <!-- @click is similar to the button property onclick. -->
          <!-- When the button is clicked the toggleInput method -->
          <!-- is called.                                        -->
          <button @click="toggleInput" class="toggle-button">
            {{ inputButtonLabel }}
          </button>
        </div>
      </PopupWindow>
    </div>

    <!-- Header Section -->

    <!-- Header for the quiz -->
    <h1 class="page-title">Your Quiz</h1>

    <!-- Question Section -->

    <!-- Wrapper for displaying quiz questions -->
    <div class="question-wrapper">
      <!-- QuizQuestion component that renders a         -->
      <!-- multiple choice question based on the input   -->
      <!-- properties: question (string), options (array -->
      <!-- of strings), answerIndex (index of answer in  -->
      <!-- options array), and questionId (the number    -->
      <!-- prefixed before the question).                -->

      <!-- v-for is a list rendering property provided by-->
      <!-- the Vue framework. It can be used to render a -->
      <!-- list of items based on the data in an array.  -->
      <!-- The key property is a unique key required by  -->
      <!-- the v-for property.                           -->
      <QuizQuestion
        v-for="(message, index) in responseMessages"
        :question="message.question"
        :options="message.options"
        :answerIndex="message.answerIndex"
        :key="index"
        :questionId="index"
      />
    </div>

    <!-- Bottom Buttons Section -->

    <!-- Container for bottom buttons -->
    <div class="bottom-buttons-div">
      <!-- @click is similar to the button property onclick. When  -->
      <!-- the button is clicked the toggleInput method is called. -->
      <button @click="toggleInput" class="toggle-button">
        {{ inputButtonLabel }}
      </button>
      <br />
      <!-- @click is similar to the button property onclick. When -->
      <!-- the button is clicked the goBack method is called.     -->
      <button @click="goBack" class="go-back-button goBackButton">
        Go Back
      </button>
    </div>
  </div>
</template>

<!-- This is calling from the other files in the folder -->
<script>
import axios from "axios"; // promise-based HTML requests
import QuizQuestion from "./components/QuizQuestion.vue"; // Component that generates an individual quiz question
import PopupWindow from "./components/PopupWindow.vue"; // Component that pops up a window over the current page
import LoadingSpinner from "./components/LoadingSpinner.vue"; // Component that displays a loading icon while waiting for the server

export default {
  // Name of the application/component
  name: "Quiz-Generator",

  // member variables for the application
  data() {
    return {
      userMessage: "",
      responseMessages: [],
      errorMessage: "",
      showInput: false,
      loading: false,
    };
  },

  // variables that must be computed during the rendering process
  computed: {
    inputButtonLabel() {
      return this.showInput ? "Hide Original Input" : "Show Original Input";
    },
  },

  // methods used by the application/component
  methods: {
    // Asnyc method that sends the user's input to our backend server
    // and updates the bage once a response has been received.
    async sendMessage() {
      try {
        this.errorMessage = "";
        this.loading = true;
        // Post the user input to the server api endpoint "/api/chat"
        const response = await axios.post("/api/chat", {
          message: this.userMessage,
        });
        this.responseMessages = response.data;
      } catch (error) {
        // Error handling
        console.error("Error sending message:", error);
        this.errorMessage =
          error.response?.data?.message ||
          "An error occurred! Please Try Again.";
      } finally {
        // Disable the loading icon when a response has been received
        this.loading = false;
      }
    },

    // Function that toggles the original input popup window
    toggleInput() {
      this.showInput = !this.showInput;
    },

    // Function that returns the user to the front page
    goBack() {
      window.location.reload();
    },
  },

  // Components used in this application/component
  components: {
    QuizQuestion,
    PopupWindow,
    LoadingSpinner,
  },
};
</script>

<!-- Scoped Styles: These styles only exist within the scope of this file. -->
<style scoped>
/* CSS styles */
.page-title {
  font-size: 3em;
  text-align: center;
  color: #333;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.input-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-family: Arial, sans-serif;
  width: 100%;
}

.input-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
  width: 60%;
  height: 100%;
  row-gap: 20px;
  padding-top: 20px;
}

.message-input {
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  height: 50vh;
}

.send-button {
  width: 100%;
  padding: 8px;
  border: none;
  border-radius: 4px;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.send-button:hover {
  background-color: #45a049;
}

.error-message {
  color: red;
}

.quiz-wrapper {
  display: flex;
  flex-flow: column nowrap;
}

.question-wrapper {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  gap: 60px;
}

.bottom-buttons-div {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center;  */
  text-align: center;
  margin-top: 30px;
  margin-bottom: 10px;
}

.toggle-button {
  max-width: 600px;
  width: 100%;
  padding: 8px;
  border: none;
  border-radius: 4px;
  background-color: #3498db;
  align-items: center;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 16px;
}

.toggle-button:hover {
  background-color: #2980b9;
}

.go-back-button {
  padding: 8px;
  border: none;
  border-radius: 4px;
  margin-top: 10px;
  background-color: #f44336;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.go-back-button:hover {
  background-color: #d32f2f;
}

.old-input-wrapper {
  padding: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 50vh;
  max-height: 50%;
  overflow-y: auto;
  width: 560px;
}

.popup-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
}
</style>

<!-- Global Styles: These styles exist throughout the codebase. -->
<style>
.buttonClass {
  border-width: 1px;
  color: #ffffff;
  border-color: #057fd0;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  box-shadow: 0px 1px 0px 0px #f0f7fa;
  text-shadow: 0px -1px 0px #5b6178;
  background: linear-gradient(#33bdef, #019ad2);
}

.buttonClass:hover {
  background: linear-gradient(#019ad2, #33bdef);
}

.goBackButton {
  /* Add your unique styles here */
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 5px;
  max-width: 600px;
  width: 100%;
}

#app {
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
}

body {
  margin: 0 !important;
  background-color: #f5f5f5;
}
</style>