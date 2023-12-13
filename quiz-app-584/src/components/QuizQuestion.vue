<template>
    <div class="quiz-question-wrapper">
        <div class="quiz-question">
            <div class="question-header">
                <p class="index">{{ indexString }}</p>
                <p class="question-text">{{ question }}</p>
            </div>
        
            <div class="options-container">
                <div
                    v-for="(option, index) in options"
                    :key="index"
                    :class="{
                        correctAnswer: answerIndex === index && showAnswer,
                        incorrectAnswer: answerIndex !== index && selected === index && showAnswer
                    }"
                    class="option"
                    @click="setSelected(index)"
                >
                    <input type="radio" :name="`question_${questionId}`" :checked="selected === index" />
                    <label> {{ option }}</label>
                </div>
            </div>
            <button @click="onShowAnswer" class="buttonClass">{{showButtonLabel}}</button>
        

            <div v-if="showAnswer" class="correct-answer">
                <p>Correct Answer:</p>
                <p>{{ options[answerIndex] }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        questionId: {
            type: Number,
            default: 0
        },

        question: {
            type: String,
            default: "Oops, something went wrong."
        },

        options: {
            type: Array,
            default: () => []
        },

        answerIndex: {
            type: Number,
            default: -1
        }
    },

    data() {
        return {
            showAnswer: false,
            selected: -1
        };
    },

    computed: {
        indexString() {
            return `${this.questionId + 1})`;
        },

        showButtonLabel() {
            return this.showAnswer ? "Hide Answer" : "Show Answer";
        },
    },

    methods: {
        onShowAnswer() {
            this.showAnswer = !this.showAnswer;
        },
        setSelected(selected) {
            this.selected = selected;
        }
    }
};
</script>

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

.index{
    font-size: 18px;
    margin-right: 10px;
}

.question-text{
    font-size: 18px;
}

.options-container{
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    width: 100%;
}

.option{
    display: flex;
    align-items: center;
    min-height: 25px;
    padding: 5px 0;
    cursor: pointer;
}

input[type="radio"]{
    margin-right: 10px;
}

label{
    font-size: 18px;
    cursor: pointer;
}

button{
    width: 100px;
    align-self: flex-end;
    margin-top: 20px;
}
</style>
