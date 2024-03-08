<template>
  <div class="max-w-md mx-auto mt-8">
    <div class="bg-white p-6 rounded-md shadow-md flex flex-col items-start justify-between">
      <h2 class="text-lg font-semibold mb-6 text-black">Generated Message:</h2>
      <p class="text-gray-800 text-lg">{{ generatedMessage }}</p>
      <button @click="copyToClipboard" class="mt-8 ml-auto p-2 bg-gray-200 hover:bg-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 transition duration-300">
        <img src="../assets//copy.svg" alt="" width="20">
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    generatedMessage: String,
    isPaymentMessage: Boolean,
  },
  methods: {
    copyToClipboard() {
      const el = document.createElement("textarea");
      el.value = this.generatedMessage;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      // Optionally, you can provide some feedback to the user
      alert("Message copied to clipboard successfully!");
    },
  },
};
</script>
