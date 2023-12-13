<template>
  <div class="chat-container">
    <div v-show="responseMessages.length === 0" class="input-section">
      <textarea v-model="userMessage" placeholder="Type your message" class="message-input"></textarea>
      <button @click="sendMessage" class="send-button">Send Message</button>
      <label v-if="errorMessage.length > 0" class="error-message">{{ errorMessage }}</label>
    </div>
    <div v-show="responseMessages.length > 0" class="question-wrapper">
      <div v-show="showInput" class="original-input">
        <PopupWindow>
          <p>
            {{ userMessage }}
          </p>
          <button @click="toggleInput" class="toggle-button">{{inputButtonLabel}}</button>
        </PopupWindow>
      </div>
      <div class="header-section">
        <h2>Your Quiz</h2>
      </div>
      <button @click="goBack" class="go-back-button">Go Back</button>
      <div class="quiz-list">
        <QuizQuestion
        v-for="(message, index) in responseMessages"
        :question="message.question" 
        :options="message.options" 
        :answerIndex="message.answerIndex" 
        :key="index" 
        :questionId="index"
        class="quiz-question">
        </QuizQuestion>
      </div>
      <div class="toggle-buttons">
        <button v-if="!showInput" @click="toggleInput" class="toggle-button">{{inputButtonLabel}}</button>
        <br>
        <button @click="goBack" class="go-back-button">Go Back</button>
      </div> 
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import QuizQuestion from "./QuizQuestion.vue";
import PopupWindow from "./PopupWindow.vue";

export default {
    data() {
        return {
            userMessage: '',
            responseMessages: [],
            errorMessage: '',
            showInput: false,
        };
    },
    computed: {
        inputButtonLabel() {
            return this.showInput ? 'Hide Original Input' : 'Submit Test';
        },
    },

  methods: {
    async sendMessage() {
      try {
        this.errorMessage = '';
        const response = await axios.post('/api/chat', {
          message: this.userMessage,
        });

        this.responseMessages = response.data;
      } catch (error) {
        console.error('Error sending message:', error);
        this.errorMessage = error.response?.data?.message || 'An error occurred';
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
  }
};
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.input-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.message-input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}

.send-button{
  width: 100%;
  padding: 8px;
  border: none;
  border-radius: 4px;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.send-button:hover{
  background-color: #45a049;
}

.error-message{
  color: red;
}

.question-wrapper{
  width: 100%;
  max-width: 800px;
}

.original-input{
  margin-bottom: 20px;
}

.toggle-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center;  */
  text-align: center;
  height: 100vh; 
}

.toggle-button{
  width: 50%;
  padding: 8px;
  border: none;
  border-radius: 4px;
  margin-top: 10px;
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

.quiz-list{
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.quiz-question{
  width: 100%;
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