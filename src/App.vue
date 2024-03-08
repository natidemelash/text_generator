<template>
  <div>
    <Header />
    <router-view @message-generated="updateGeneratedMessage" @payment-generated="updatePaymentMessage" @engagement-message="updateEngagementMessage"/>
    <div class="my-5">
      <MessageDisplay v-if="generatedMessage && !isPaymentRoute && !isEngagementRoute" :generatedMessage="generatedMessage" />
      <MessageDisplay v-if="isPaymentRoute && paymentMessage " :generatedMessage="paymentMessage" :isPaymentMessage="true" />
      <MessageDisplay v-if="isEngagementRoute && engagementMessage" :generatedMessage="engagementMessage" :isEngagementRoute="true"/>
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
      isEngagementRoute:false,
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
      this.isPaymentRoute = to.path === '/payments';
      this.isEngagementRoute = to.path === '/engagements';
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
