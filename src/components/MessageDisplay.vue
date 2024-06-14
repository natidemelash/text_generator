<template>
  <div class="max-w-md mx-4 md:mx-auto mt-8">
    <div class="bg-[#4f4d4d] text-white p-6 rounded-md shadow-md flex flex-col items-start justify-between">
      <h2 class="text-lg font-semibold mb-6 text-white">Generated Message:</h2>
      <p class="text-base md:text-md" v-html="generatedMessage"></p>
      <button 
        @click="copyToClipboard" 
        class="mt-8 ml-auto p-2 bg-gray-200 hover:bg-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 transition duration-300">
        <img src="../assets/copy.svg" alt="Copy" width="20">
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    generatedMessage: {
      type: String,
      required: true
    },
    isPaymentMessage: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    copyToClipboard() {
      const message = this.generatedMessage.replace(/<br\s*\/?>/g, "\n");
      const el = document.createElement("textarea");
      el.value = message;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      alert("Message copied to clipboard successfully!");
      this.$emit('close');
    }
  }
};
</script>
