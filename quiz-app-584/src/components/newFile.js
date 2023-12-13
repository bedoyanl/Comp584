export default (await import('vue')).defineComponent({
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
return this.showInput ? 'Hide Original Input' : 'Show Original Input';
},
},

components: { QuizQuestion }
});
