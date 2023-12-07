<template>
  <div>
    <div v-if="responseMessages.length == 0">
      <textarea v-model="userMessage" placeholder="Type your message"></textarea>
      <button @click="sendMessage">Send Message</button>
      <label v-if="errorMessage.length > 0">{{ errorMessage }}</label>
    </div>
    <div v-if="responseMessages.length > 0" class="questionWrapper">
      <span v-if="showInput">
        <PopupWindow>
          <p>
            {{ userMessage }}
          </p>
          <button @click="onShowInput" class="buttonClass inputButtonClass">{{inputButtonLabel}}</button>
        </PopupWindow>
      </span>
      <div class="headerDiv">
        <h2>Your Quiz</h2>
      </div>
      <QuizQuestion v-for="(message, index) in responseMessages" :question="message.question" :options="message.options" :answerIndex="message.answerIndex" :key="index" :questionId="index"/> 
      <button v-if="!showInput" @click="onShowInput" class="buttonClass inputButtonClass">{{inputButtonLabel}}</button>
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
      if (this.showInput) return "Hide Original Input";
      else return "Show Original Input"
    }
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
        this.errorMessage = 'An error occurred';
      }
    },

    onShowInput() {
      this.showInput = !this.showInput;
    },  
  },
  components: {
    QuizQuestion,
    PopupWindow,
  }
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.headerDiv {
  font-size: 40px;
  align-self: center;
  max-width: 600px;
  width: 100%;
}
.question {
  margin-top: 300px;
}

.questionWrapper {
  display: flex; 
  flex-flow: column nowrap;
  gap: 60px;
}

.inputButtonClass {
  max-width: 600px;
  width: 100%;
  height: 30px;
  font-weight: bold;
  font-size: 20;
  align-self: center;
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
</style>