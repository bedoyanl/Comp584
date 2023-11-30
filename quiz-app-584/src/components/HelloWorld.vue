<template>
  <div>
    <textarea v-model="userMessage" placeholder="Type your message"></textarea>
    <button @click="sendMessage">Send Message</button>
    <div v-if="responseMessages.length > 0">
      <p v-for="(message, index) in responseMessages" :key="index">{{ message }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      userMessage: '',
      responseMessages: [],
    };
  },
  methods: {
    async sendMessage() {
      try {
        const response = await axios.post('/api/chat', {
          message: this.userMessage,
        });

        // Assuming the OpenAI response is an array of choices
        const choices = response.data;

        // Extracting the text from each choice
        const messages = choices.map((choice) => choice?.text || '');

        // Updating the responseMessages array
        this.responseMessages = messages;
      } catch (error) {
        console.error('Error sending message:', error);
        this.responseMessages = ['An error occurred'];
      }
    },
  },
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
</style>
