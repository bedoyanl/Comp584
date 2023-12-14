<template>
  <!-- Outter Div for the question. Provides the background color, outline, and dropshadow. -->
  <div class="quiz-question-wrapper">
    <!-- Div containing the question and answers. -->
    <div class="quiz-question">
      <!-- Div for the actual question and it's index. -->
      <div class="question-header">
        <p class="index">{{ indexString }}</p>
        <p class="question-text">{{ question }}</p>
      </div>

      <!-- Div that contains the multiple choice options -->
      <div class="options-container">
        <!-- Div for a single multiple choice option. -->

        <!-- v-for is a list rendering property provided by-->
        <!-- the Vue framework. It can be used to render a -->
        <!-- list of items based on the data in an array.  -->
        <!-- The key property is a unique key required by  -->
        <!-- the v-for property.                           -->

        <!-- @click is similar to the button property onclick. When  -->
        <!-- the button is clicked the setSelected method is called. -->

        <!-- By adding a colon (:) before a regular HTML propery Vue -->
        <!-- will use Javascript to compute the value of the poperty.-->
        <!-- In this case the class property is either correctAnswer -->
        <!-- or incorrectAnswer depending on which conditionals are  -->
        <!-- true.                                                   -->
        <div
          v-for="(option, index) in options"
          :key="index"
          :class="{
            correctAnswer: answerIndex === index && showAnswer,
            incorrectAnswer:
              answerIndex !== index && selected === index && showAnswer,
          }"
          class="option"
          @click="setSelected(index)"
        >
          <!-- Radio input for question option. -->
          <input
            type="radio"
            :name="`question_${questionId}`"
            :checked="selected === index"
          />
          <!-- Label for question option. -->
          <label> {{ option }}</label>
        </div>
      </div>

      <!-- Show Answer Button -->
      <!-- @click is similar to the button property onclick. When  -->
      <!-- the button is clicked the onShowAnswer method is called.-->
      <button @click="onShowAnswer" class="buttonClass">
        {{ showButtonLabel }}
      </button>

      <!-- Answer Div -->
      <!-- v-if is a conditional rendering property    -->
      <!-- from the Vue framework. When the condition  -->
      <!-- is true the div is rendered. When it's      -->
      <!-- false the div is hidden.                    -->
      <div v-if="showAnswer" class="correct-answer">
        <p>Correct Answer:</p>
        <p>{{ options[answerIndex] }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // Properties provide by the parent component.
  // This is kind of like parameters for a defualt constructor
  props: {
    // The id/index for this question.
    questionId: {
      type: Number,
      default: 0,
    },

    // The question string.
    question: {
      type: String,
      default: "Oops, something went wrong.",
    },

    // An array of different multiple-choice options for the question.
    options: {
      type: Array,
      default: () => [],
    },

    // The index of the correct answer in the options array.
    answerIndex: {
      type: Number,
      default: -1,
    },
  },

  // Member variables
  data() {
    return {
      showAnswer: false,
      selected: -1,
    };
  },

  // variables that must be computed during the rendering process
  computed: {
    indexString() {
      return `${this.questionId + 1})`;
    },

    showButtonLabel() {
      return this.showAnswer ? "Hide Answer" : "Show Answer";
    },
  },

  // methods used by the component
  methods: {
    // onShowAnswer toggle's the answer display
    onShowAnswer() {
      this.showAnswer = !this.showAnswer;
    },

    // setSelected sets with option the user selected
    setSelected(selected) {
      this.selected = selected;
    },
  },
};
</script>

<!-- Scoped Styles: These styles only exist within the scope of this file. -->
<style scoped>
.quiz-question {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
}
.quiz-question-wrapper {
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.question-header {
  display: flex;
  flex-flow: row nowrap;
}

.index {
  font-size: 18px;
  margin-right: 10px;
}

.question-text {
  font-size: 18px;
}

.options-container {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  width: 100%;
}

.option {
  display: flex;
  align-items: center;
  min-height: 25px;
  padding: 5px 0;
  cursor: pointer;
}
.correctAnswer {
  background-color: #41b883;
}

.incorrectAnswer {
  background-color: #bf616a;
}

input[type="radio"] {
  margin-right: 10px;
}

label {
  font-size: 18px;
  cursor: pointer;
}

button {
  width: 100px;
  align-self: flex-end;
  margin-top: 20px;
}
</style>
