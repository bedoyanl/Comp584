<template>
    <div style="width: 100%; max-width: 600px; margin: 0 auto; float: none; background-color: #fff; display: flex; flex-flow: column nowrap;">
        <div style="display: flex; flex-flow: row nowrap;">
            <p style="font-size: 18px; margin-right: 10px;">
                {{ indexString }}
            </p>
            <p style="font-size: 18px">
                {{ question }}
            </p>
        </div>
        <div style="display: flex; flex-flow: column nowrap; margin-left: 10px">
            <div v-for="(option, index) in options" :key="index" :class="{ correctAnswer: answerIndex == index && showAnswer, incorrectAnswer: answerIndex != index && selected == index && showAnswer}" style="display: flex; align-items: center; min-height: 25px; padding-top: 5px; padding-bottom: 5px">
                <input @click="setSelected(index)" type="radio" :name="questionId" style="margin-bottom: 2px; margin-right: 10px"/>
                <label style="font-size: 18px">{{ option }}</label>
            </div>
        </div>
        <button @click="onShowAnswer" class="buttonClass" style="width: 100px; align-self: flex-end; margin-top: 20px;">{{showButtonLabel}}</button>
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
            default: "Oops, something went wrong. Do you appreciate this default question?"
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
            showInput: false,
            selected: -1
        }
    },

    computed: {
        indexString: function () {
            let index = this.questionId + 1;
            return index + ")"
        },

        showButtonLabel: function() {
            if (this.showAnswer) return "Hide Answer";
            else return "Show Answer";
        },

        inputButtonLabel: function() {
            if (this.showInput) return "Hide Original Input";
            else return "Show Original Input";
        }
    },

    methods: {
        onShowAnswer: function() {
            this.showAnswer = !this.showAnswer;
        },

        setSelected: function(selected) {
            console.log("selected", selected);
            this.selected = selected;
        }
    },
}
</script>

<style scoped>
.correctAnswer {
  background-color: #41B883;
}

.incorrectAnswer {
  background-color: #bf616a;
}
</style>
