<template>
  <div>
    <Header />
    <router-view @message-generated="updateGeneratedMessage" @payment-generated="updatePaymentMessage" @engagement-message="updateEngagementMessage"/>
    <div class="my-5">
      <MessageDisplay v-if="generatedMessage && !isPaymentRoute" :generatedMessage="generatedMessage" />
      <MessageDisplay v-if="isPaymentRoute && paymentMessage " :generatedMessage="paymentMessage" :isPaymentMessage="true" />
      <MessageDisplay v-if="!isPaymentRoute " :generatedMessage="engagementMessage"/>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import MessageDisplay from './components/MessageDisplay.vue';

  export default {
    components:{
      Header,
      MessageDisplay
    },
    data() {
    return {
      generatedMessage: '',
      isPaymentRoute:false,
      paymentMessage: '',
      engagementMessage: ''
    };
  },
  methods: {
    updateGeneratedMessage(message) {
      this.generatedMessage = message;
    },
    updatePaymentMessage(message) {
      this.paymentMessage = message;
    },
    updateEngagementMessage(message){
      this.engagementMessage = message;
    }
  },
  watch: {
    $route(to) {
      // Update isPaymentRoute based on the route
      this.isPaymentRoute = to.path === '/payments';
    },
  },
}
</script>

<style>
  button:focus {
    outline: none;
    border: 3px solid #111;
  }
</style>
