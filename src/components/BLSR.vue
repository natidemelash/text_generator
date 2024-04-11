<template>
  <div class="card p-6 mx-3 md:mx-auto max-w-4xl bg-[#4f4d4d] mt-8 shadow-md rounded-md">
    <h3 class="text-lg mb-4 text-[#fff]">BLSR Engagement Messages</h3>

    <div class="grid grid-cols-1 md:grid-cols-3 items-center text-black gap-8">
        <button class="bg-[#e21e81] text-xs text-white px-6 py-3 rounded"  @click="handleButtonClick('blsr-01')">Unreachable during FollowUp</button>
    </div>

     <!-- Employer Name -->
    <div v-if="showEmployerNameInput">
        <label class="customerName">Customer Name </label>
        <input v-model="employerName" type="text" placeholder="Employer name" class="py-1 px-3 bg-[#333] text-sm text-white rounded-md my-4" >
    </div>

    <!-- Input field for phone number -->
    <div v-if="showPhoneNumberInput" class="mt-4">
        <label for="phoneNumber" class="text-sm font-semibold text-[#fff]">Phone Number/የዲስፓቸር ስልክ:</label>
        <input type="text" id="phoneNumber" v-model="phoneNumber" @input="validatePhoneNumber" placeholder="Dispatcher phone"  class="mt-2 px-4 py-2 text-black block w-[70%] bg-[#ECF0F1] shadow-sm sm:text-sm border-2 rounded-md focus:outline-none">
        <p v-if="phoneNumberError" class="text-red-500 text-sm mt-2">{{ phoneNumberError }}</p>
        <button @click="emitMessageEvent" class="mt-2 bg-[#333] cursor-pointer text-xs text-white px-4 py-2 rounded">
            <img src="../assets//send.png" alt="" width="25">
        </button>
    </div>
  </div>
</template>

<script>
export default {
  props:['showPhoneNumberInput'],
  data(){
    return{
      phoneNumber: '',
      phoneNumberError: ''
    }
  },
  methods:{
    handleButtonClick(action){
      this.selectedAction = action;
      this.$emit('button-click', action)
    },

    emitMessageEvent() {
      // Emit an event with the action and phone number to be handled by the parent component
      this.$emit('generate-message', {
        action: this.selectedAction,
        phoneNumber: this.phoneNumber
      });
    }
  },
}
</script>