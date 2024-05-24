<template>
    <div class="input-field">
      <label v-if="label">{{ label }}</label>
      <input
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        @input="handleInput"
        class="py-2 px-3 ml-3 bg-[#333] text-sm text-white rounded-md mt-4 mb-2 focus:outline-none"
      />
      <p v-if="error" class="text-amber-500 text-sm mt-1">{{ error }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      label: String,
      modelValue: [String, Number],
      placeholder: String,
      type: {
        type: String,
        default: 'text'
      },
      error: String
    },
    methods: {
      handleInput(event) {
        this.$emit('update:modelValue', event.target.value);
      }
    }
  }
  </script>
  
  <style scoped>
  .input-field {
    margin-bottom: 1rem;
  }
  </style>
  