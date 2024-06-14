<template>
  <div>
    <Header />
    <router-view @message-generated="updateGeneratedMessage" @payment-generated="updatePaymentMessage" @engagement-message="updateEngagementMessage" />
    <div class="my-5">
      <MessageDisplay 
        v-if="currentMessage" 
        :generatedMessage="currentMessage" 
        :isPaymentMessage="isPaymentRoute" 
        :isEngagementRoute="isEngagementRoute" 
      />
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import MessageDisplay from './components/MessageDisplay.vue';

export default {
  components: {
    Header,
    MessageDisplay
  },
  data() {
    return {
      generatedMessage: '',
      paymentMessage: '',
      engagementMessage: '',
    };
  },
  computed: {
    isPaymentRoute() {
      return this.$route.path === '/payments';
    },
    isEngagementRoute() {
      return this.$route.path === '/engagements';
    },
    currentMessage() {
      if (this.isPaymentRoute) return this.paymentMessage;
      if (this.isEngagementRoute) return this.engagementMessage;
      return this.generatedMessage;
    }
  },
  methods: {
    updateGeneratedMessage(message) {
      this.generatedMessage = message;
    },
    updatePaymentMessage(message) {
      this.paymentMessage = message;
    },
    updateEngagementMessage(message) {
      this.engagementMessage = message;
    },
  }
};
</script>

<style scoped>
button:focus {
  outline: none;
  border: 3px solid #111;
}
input[type="date"]::-webkit-calendar-picker-indicator,
input[type="time"]::-webkit-calendar-picker-indicator {
  filter: invert(1);
}
</style>
