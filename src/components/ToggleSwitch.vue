<!-- ToggleSwitch.vue -->
<template>
    <div
      @click="toggle"
      :class="{'bg-green-500': isActive, 'bg-red-300': !isActive}"
      class="relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer transition-colors duration-300"
    >
      <span
        :class="{'translate-x-6': isActive, 'translate-x-1': !isActive}"
        class="inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300"
      ></span>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      modelValue: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      isActive() {
        return this.modelValue;
      }
    },
    methods: {
      toggle() {
        this.$emit('update:modelValue', !this.modelValue);
      }
    }
  };
  </script>
  
  <style scoped>
  </style>
  