<template>
  <div>
    <h1 class="text-black text-2xl">Payment Section</h1>
    <PaymentMessageForm @payment-generated="updatePaymentMessage" />
  </div>
</template>

<script>
import PaymentMessageForm from '@/view/PaymentMessageForm.vue';

export default {
  components: {
    PaymentMessageForm,
  },
  methods: {
    updatePaymentMessage(message) {
      this.$emit('payment-generated', message);
    },
  },
};
</script>
