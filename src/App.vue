<template>
  <div>
    <Header />
    <router-view @message-generated="updateGeneratedMessage" @payment-generated="updatePaymentMessage"/>
    <div class="my-5">
      <MessageDisplay v-if="generatedMessage && !isPaymentRoute" :generatedMessage="generatedMessage" />
      <MessageDisplay v-if="isPaymentRoute && paymentMessage " :generatedMessage="paymentMessage" :isPaymentMessage="true" />
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
    };
  },
  methods: {
    updateGeneratedMessage(message) {
      this.generatedMessage = message;
    },
    updatePaymentMessage(message) {
      this.paymentMessage = message;
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
