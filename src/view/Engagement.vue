<template>
  <div class="card p-6 mx-3 md:mx-auto max-w-4xl bg-[#ECF0F1] mt-8 shadow-md rounded-md">
    <h3 class="text-xl font-semibold mb-4 text-[#C21F80]">Engagement Messages</h3>

    <div class="grid grid-cols-1 md:grid-cols-3 items-center text-black gap-8">
      <button class="bg-[#640D4D] text-xs text-white px-6 py-3 rounded"  @click="handleButtonClick('emp-paid-noanswer')">Paid connection - No reply from EMP /ቀጣሪው ከክፍያ በኋላ ስልክ አያነሳም</button>
      <button class="bg-[#640D4D] text-xs text-white px-6 py-3 rounded" @click="handleButtonClick('still-searching')">Still Searching for SP / በ15 ደቂቃ ባለሙያ ማግኘት ካልተቻለ </button>
      <button class="bg-[#640D4D] text-xs text-white px-6 py-3 rounded" @click="handleButtonClick('sp-dispatched-noanswer')">Dispatched SP - Employer No answer / ባለሙያ ልከንለት ቀጣሪው ስልክ ሳያነሳ ሲቅር</button>

      <button class="bg-[#435f8c] text-xs text-white px-6 py-3 rounded"  @click="handleButtonClick('sp-noanswer')">SP did not answer /ለባለሙያው የቀጣሪ ስልክ መድረሱን ለማረጋጥ ካልተቻለ </button>
      <button class="bg-[#435f8c] text-xs text-white px-6 py-3 rounded"  @click="handleButtonClick('dispatched-sp-noanswer')">SP dispatched /ባለሙያው ለስራ ከተላኩ በኋላ ስልክ አያነሳም </button>
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
          case 'emp-paid-noanswer':
            message = `ጤና ይስጥልን! የባለሙያ ጥያቄዎን በተመለከተ ደውለን ነበር። እባክዎን በአስቸኳይ ይደውሉልን። ለበለጠ መረጃ በ${this.phoneNumber} ይደውሉ። መልካም ቀን!`;
            break;
          case 'still-searching':
            message = `የእርስዎን መስፈርት በሚገባ የሚያሟላ ባለሙያ ፍለጋ ላይ ነን። እባክዎን በትዕግስት ይጠብቁ። ለበለጠ መረጃ በ${this.phoneNumber} ይደውሉ። መልካም ቀን!`;
            break;
          case 'sp-dispatched-noanswer':
            message = `ሰላም! የላክንልዎ  የባለሙያ ስልክ ደረሰዎ?  በ24 ሰዓት ተነጋግረው ካላሳወቁን ሌላ ባለሙያ መላክ እንደማንችል በትህትና እናሳውቃለን። ለተጨማሪ መረጃ በ${this.phoneNumber} ይደውሉ።`;
            break;
          case 'sp-noanswer':
            message = `የቀጣሪ ስልክ ልከንልዎ ስልክዎን እያነሱልን አይደለም። በ3 ደቂቃ ውስጥ ካልደወሉልን ስራውን ለሌላ ባለሙያ ለማስተላለፍ እንገደዳለን። ለበለጠ መረጃ በ${this.phoneNumber} ይደውሉ። መልካም ቀን!`;
            break;
          case 'dispatched-sp-noanswer':
            message = `ሰላም! ለስራ ልከንዎት ስንደውል ልናገኝዎ አልቻልንም። ስራውን ለሌሎች ባለሙያዎች ከመላካችን በፊት በ${this.phoneNumber} ይደውሉ።`;
            break;
          default:
            break;
        }
        this.$emit('engagement-message', message);
        this.phoneNumber = '';
      },
  }    
}
</script>

