<template>
    <div v-show="responseMessages.length === 0" class="input-wrapper">
      <div class="input-section">
        <textarea v-model="userMessage" placeholder="Type your message" class="message-input"></textarea>
        <button @click="sendMessage" class="send-button">Send Message</button>
        <label v-if="errorMessage.length > 0" class="error-message">{{ errorMessage }}</label>
        <LoadingSpinner v-show="loading" />
      </div>
    </div>
    <div v-show="responseMessages.length > 0" class="quiz-wrapper">
      <div v-show="showInput">
        <PopupWindow>
          <div class="popup-content">
            <h2>Original Input</h2>
            <p class="old-input-wrapper">
              {{ userMessage }}
            </p>
            <button @click="toggleInput" class="toggle-button">{{inputButtonLabel}}</button>
          </div>
        </PopupWindow>
      </div>
      <div class="header-section">
        <h2>Your Quiz</h2>
        <button @click="goBack" class="go-back-button">Go Back</button>
      </div>
      <div class="question-wrapper">
        <QuizQuestion
          v-for="(message, index) in responseMessages"
          :question="message.question" 
          :options="message.options" 
          :answerIndex="message.answerIndex" 
          :key="index" 
          :questionId="index"
        />
      </div>
      <div class="bottom-buttons-div">
        <button @click="toggleInput" class="toggle-button">{{inputButtonLabel}}</button>
        <br>
        <button @click="goBack" class="go-back-button">Go Back</button>
      </div> 
    </div>
</template>

<script>
import axios from 'axios';
import QuizQuestion from "./QuizQuestion.vue";
import PopupWindow from "./PopupWindow.vue";
import LoadingSpinner from './LoadingSpinner.vue'; 

export default {
    data() {
        return {
            userMessage: '',
            responseMessages: [],
            errorMessage: '',
            showInput: false,
            loading: false,
        };
    },
    computed: {
        inputButtonLabel() {
            return this.showInput ? 'Hide Original Input' : 'Show Original Input';
        },
    },

  methods: {
    async sendMessage() {
      try {
        this.errorMessage = '';
        this.loading = true;
        const response = await axios.post('/api/chat', {
          message: this.userMessage,
        });

        this.responseMessages = response.data;
      } catch (error) {
        console.error('Error sending message:', error);
        this.errorMessage = error.response?.data?.message || 'An error occurred! Please Try Again.';
      } finally {
        this.loading = false;
      }
    },

    toggleInput() {
      this.showInput = !this.showInput;
    },  
    goBack() {
            window.location.reload();
    }
  },
  components: {
    QuizQuestion,
    PopupWindow,
    LoadingSpinner,
  }
};
</script>

<style scoped>
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
  background-color: #4CAF50;
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

.original-input{
  margin-bottom: 20px;
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
}

.toggle-button:hover{
  background-color: #2980b9;
}

.header-section{
  display:flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
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

.go-back-button:hover{
  background-color: #d32f2f;
}

.old-input-wrapper {
  padding: 20px; 
  border-radius: 5px;   
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
  height: 50vh; 
  max-height: 50%; 
  overflow-y: scroll;
}

.popup-content {
  display: flex; 
  flex-direction: column; 
  height: 100%;
  align-items: center;
}
</style>

<style>
.buttonClass {
  border-width:1px;
  color:#ffffff;
  border-color:#057fd0;
  border-top-left-radius:6px;
  border-top-right-radius:6px;
  border-bottom-left-radius:6px;
  border-bottom-right-radius:6px;
  box-shadow: 0px 1px 0px 0px #f0f7fa;
  text-shadow: 0px -1px 0px #5b6178;
  background:linear-gradient(#33bdef, #019ad2);
}

.buttonClass:hover {
  background: linear-gradient(#019ad2, #33bdef);
}

.goBackButton {
  /* Add your unique styles here */
  background-color: #4CAF50;
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
}
</style>