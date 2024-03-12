<template>
  <div class="card p-6 mx-auto max-w-2xl bg-[#ECF0F1] mt-8 shadow-md rounded-md">
     <h2 class="text-xl font-semibold mb-4 text-[#C21F80]">Payment related messages</h2>
     <div class="flex items-center text-black gap-8">
       <button class="bg-[#640D4D] text-xs text-white px-6 py-3 rounded"  @click="handleButtonClick('Well-received')">Received Payment / ክፍያ ደርሶናል</button>
       <button class="bg-[#640D4D] text-xs text-white px-6 py-3 rounded" @click="handleButtonClick('Reminder')">Payment Reminder / የክፍያ ማስታወሻ</button>
       <button class="bg-[#640D4D] text-xs text-white px-6 py-3 rounded" @click="handleButtonClick('Closed Ticket')">Closing ticket / የመዝጊያ መልዕክት </button>
     </div>

       <!-- Input field for phone number -->
      <div v-if="showPhoneNumberInput" class="mt-4">
        <label for="phoneNumber" class="text-sm font-semibold text-gray-700">Phone Number/የዲስፓቸር ስልክ:</label>
        <input type="text" id="phoneNumber" v-model="phoneNumber" @input="validatePhoneNumber"  class="mt-2 px-4 py-2 text-black block w-[70%] bg-[#ECF0F1] shadow-sm sm:text-sm border-2 border-gray-800 rounded-md">
        <p v-if="phoneNumberError" class="text-red-500 text-sm mt-2">{{ phoneNumberError }}</p>
        <button @click="generateMessage" class="mt-2 bg-[#333] cursor-pointer text-xs text-white px-4 py-2 rounded">
          <img src="../assets//send.png" alt="" width="25">
        </button>
      </div>
   </div>
 </template>
 
 <script>
 export default {
   
  data(){
    return{
      showPhoneNumberInput: false,
      phoneNumber: '',
      phoneNumberError: ''
    }
  }, 

  methods: {
    handleButtonClick(action) {
      this.showPhoneNumberInput = true;
      // Save the action to a data property to handle it later
      this.selectedAction = action;
    },

    generateMessage() {
      let message = '';

      if (!this.phoneNumber) {
        this.phoneNumberError = 'Phone number cannot be empty.';
        return;
      }

      if (!/^(09)\d{8}$/.test(this.phoneNumber)) {
        this.phoneNumberError = 'Invalid phone number format. It should start with 09 and be 10 digits long.';
        return;
      }
      this.phoneNumberError = '';
      this.showPhoneNumberInput = false;

      switch (this.selectedAction) {
        case 'Well-received':
          message = `ክፍያውን ስለፈጸሙ እናመሰግናለን። መስፈርትዎን የሚያሟላ የባለሙያ ስልክ ከ15 - 20 ደቂቃ ውስጥ ይደርሶታል። ለበለጠ መረጃ በ${this.phoneNumber} ይደውሉ። መልካም ቀን!`;
          break;
        case 'Reminder':
          message = `ክፍያ ባለመፈጸምዎ የባለሙያ ጥያቄዎን ለማስተናገድ አልቻልንም። በቀረው 12 ሰዓት ውስጥ ክፍያውን በመፈጸም ፈጣን አገልግሎት ያግኙ። ለበለጠ መረጃ በ${this.phoneNumber} ይደውሉ። መልካም ቀን!`;
          break;
        case 'Closed Ticket':
          message = `ላቀረቡት የባለሙያ ጥያቄ የአገልግሎት ክፍያ ባለመፈጸምዎ ሃሳብዎን እንደቀየሩ ተቆጥሮ ትዕዛዝዎ ተዘግቷል። አገልግሎታችንን በድጋሚ ሲፈልጉ ልናገለግልዎ ዝግጁ ነን። ለበለጠ መረጃ በ${this.phoneNumber} ይደውሉ። `;
          break;
        default:
          break;
      }
      this.$emit('payment-generated', message);
      this.phoneNumber = '';
    },
  },
 };
 </script>