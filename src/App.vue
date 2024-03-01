<template>
  <div>
    <Header />
    <MessageGenerator v-show="!generatedMessage"  @message-generated="updateGeneratedMessage" />
    <MessageDisplay v-if="generatedMessage" :generatedMessage="generatedMessage" />
  </div>
  <RouterView />
</template>

<script>
import Header from './components/Header.vue';
import MessageGenerator from './components/MessageGenerator.vue';
import MessageDisplay from './components/MessageDisplay.vue';
  export default {
    components:{
      Header,
      MessageGenerator,
      MessageDisplay
    },
    data() {
    return {
      generatedMessage: '',
    };
  },
  methods: {
    updateGeneratedMessage(message) {
      this.generatedMessage = message;
    },
  },
  }
</script>
