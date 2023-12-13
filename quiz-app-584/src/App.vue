<template>
  <HelloWorld />
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
};
</script>

<style>
#app {
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
}

body { 
  margin: 0 !important; 
}
/* Add your styles here */
</style>