<template>
    <div class="card p-6 mx-3 md:mx-auto max-w-4xl bg-[#4f4d4d] mt-8 shadow-md rounded-md">
        <h3 class="text-lg mb-4 text-[#fff]">CCO Engagement Messages</h3>

        <div class="grid grid-cols-1 md:grid-cols-3 items-center text-black gap-8">
            <button class="bg-[#e21e81] text-xs text-white px-6 py-3 rounded"  @click="handleButtonClick('emp-paid-noanswer')">Paid connection - No reply from EMP /ቀጣሪው ከክፍያ በኋላ ስልክ አያነሳም</button>
            <button class="bg-[#e21e81] text-xs text-white px-6 py-3 rounded" @click="handleButtonClick('still-searching')">Still Searching for SP / በ15 ደቂቃ ባለሙያ ማግኘት ካልተቻለ </button>
            <button class="bg-[#e21e81] text-xs text-white px-6 py-3 rounded" @click="handleButtonClick('sp-dispatched-noanswer')">Dispatched SP - Employer No answer / ባለሙያ ልከንለት ቀጣሪው ስልክ ሳያነሳ ሲቅር</button>
            <button class="bg-[#e21e81] text-xs text-white px-6 py-3 rounded" @click="handleButtonClick('closing-without-SP')">No SP available / ባለሙያ ስናጣ ለቀጣሪው የሚላክ</button>
            <button class="bg-[#e21e81] text-xs text-white px-6 py-3 rounded" @click="handleButtonClick('feedback-from-employer')">Asking Employer Feedback/ ስለ ባለሙያ ከ ቀጣሪ አስተያየት ለመጠየቅ</button>
            <button class="bg-[#588fe8] text-xs text-white px-6 py-3 rounded" @click="handleButtonClick('feedback-from-SP')">Asking SPs Feedback/ ከ ባለሙያ አስተያየት ለመጠየቅ</button>
            <button class="bg-[#588fe8] text-xs text-white px-6 py-3 rounded"  @click="handleButtonClick('sp-noanswer')">SP did not answer /ለባለሙያው የቀጣሪ ስልክ መድረሱን ለማረጋጥ ካልተቻለ </button>
            <button class="bg-[#588fe8] text-xs text-white px-6 py-3 rounded"  @click="handleButtonClick('dispatched-sp-noanswer')">SP dispatched /ባለሙያው ለስራ ከተላኩ በኋላ ስልክ አያነሳም </button>
            <button class="bg-[#588fe8] text-xs text-white px-6 py-3 rounded"  @click="handleButtonClick('job-transfered')">SP Replacement notification/ስራው ለሌላ ባለሙያ ተላልፏል </button>
        </div>

           <!-- Customer Name -->
        <div v-if="showCustomerNameInput">
          <label class="customerName">Customer Name </label>
          <input v-model="customerName" type="text" placeholder="Customer name" class="py-2 px-3 bg-[#333] text-sm text-white rounded-md mt-4 mb-2 focus:outline-none" >
          <p v-if="customerNameError" class="text-amber-500 text-sm mt-1">{{ customerNameError }}</p>
        </div>

        <!-- Input field for phone number -->
        <div v-if="showPhoneNumberInput" class="mt-4">
            <label for="phoneNumber" class="text-sm font-semibold text-[#fff]">Phone Number/የዲስፓቸር ስልክ:</label>
            <input type="text" id="phoneNumber" v-model="phoneNumber" @input="validatePhoneNumber" placeholder="Dispatcher phone"  class="mt-2 px-4 py-2 text-black block w-[70%] bg-[#ECF0F1] shadow-sm sm:text-sm border-2 rounded-md focus:outline-none">
            <p v-if="phoneNumberError" class="text-red-500 text-sm mt-2">{{ phoneNumberError }}</p>
        </div>
        <button @click="emitMessageEvent" class="mt-2 bg-[#333] cursor-pointer text-xs text-white px-4 py-2 rounded">
            <img src="../assets//send.png" alt="" width="25">
        </button>
  </div>
</template>

<script>
export default {
    props:['showPhoneNumberInput', 'showCustomerNameInput'],
    data() {
        return {
            customerName: '',
            customerNameError: '',  
            phoneNumber: '',
            phoneNumberError: '',
        };
  },
    methods: {
        handleButtonClick(action){
            this.selectedAction = action;
            this.$emit('button-click', action)
        },

        emitMessageEvent() {
            if(!this.customerName){
                this.customerNameError = 'Name can\'t be empty'
                return;
            }
            // Emit an event with the action and phone number to be handled by the parent component
            this.$emit('generate-message', {
                action: this.selectedAction,
                phoneNumber: this.phoneNumber,
                customerName: this.customerName
            });
            this.customerName = ''
            this.phoneNumber = ''
        }
    }
}
</script>