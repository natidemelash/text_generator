<template>
  <div class="card p-6 mx-3 md:mx-auto max-w-4xl bg-[#4f4d4d] mt-8 shadow-md rounded-md">
     <h2 class="text-xl font-semibold mb-4 text-[#fff]">Payment related messages</h2>
     <div class="grid grid-cols-1 md:grid-cols-3 text-black gap-8">
      <button class="bg-[#e21e81] text-xs text-white px-6 py-3 rounded"  @click="handleButtonClick('bank-confirmation')">Bank information Confirmation / የመክፈያ መረጃ (ባንክ አካውንት) መድረሱን ለማረጋገጥ </button>
       <button class="bg-[#e21e81] text-xs text-white px-6 py-3 rounded"  @click="handleButtonClick('payment-received')">Received Payment / ክፍያ ደርሶናል</button>
       <button class="bg-[#e21e81] text-xs text-white px-6 py-3 rounded" @click="handleButtonClick('reminder')">Payment Reminder / የክፍያ ማስታወሻ</button>
       <button class="bg-[#e21e81] text-xs text-white px-6 py-3 rounded" @click="handleButtonClick('Closed Ticket')">Closing ticket / የመዝጊያ መልዕክት </button>
     </div>

        <!-- Employer Name -->
        <div v-if="showEmployerNameInput">
          <label for="employerName" class="text-sm">Customer Name </label>
          <input v-model="employerName" id="employerName" type="text" placeholder="Employer name" class="py-2 px-3 bg-[#333] text-sm text-white rounded-sm mt-8 mb-2 focus:outline-none
          " >
          <p v-if="employerNameError" class="text-amber-500 text-sm mt-1">{{ employerNameError }}</p>
        </div>
        
        <!-- Serivice field for  -->
        <di v-if="showServiceOfInterestInput">
          <label>Service of Interest </label> 
          <select v-model="selectedService" class="text-sm bg-[#333] py-1 px-4 rounded-md my-4">
            <option v-for="(service, index) in serviceOfInterest" :key="index">{{ service }}</option>
          </select>
        </di>

       <!-- Input field for phone number -->
      <div v-if="showPhoneNumberInput" class="mt-4">
        <label for="phoneNumber" class="text-sm  text-[#fff]">Phone Number/የዲስፓቸር ስልክ:</label>
        <input type="text" id="phoneNumber" v-model="phoneNumber" placeholder="Dispatcher phone" @input="validatePhoneNumber"  class="mt-2 px-4 py-2 text-black block w-[70%] bg-[#ECF0F1] shadow-sm sm:text-sm rounded-md focus:outline-none">
        <p v-if="phoneNumberError" class="text-amber-500 text-sm mt-2">{{ phoneNumberError }}</p>
      </div>
      <button @click="generateMessage" class="mt-2 bg-[#333] cursor-pointer text-xs text-white px-4 py-2 rounded">
        <img src="../assets//send.png" alt="" width="25">
      </button>
   </div>
 </template>
 
 <script>
 export default {
  data(){
    return{
      showPhoneNumberInput: false,
      showEmployerNameInput: false,
      showServiceOfInterestInput: false,
      serviceOfInterest: [
          'ምግብ አብሳይ',
          'የጽዳት',
          'ምግብ ዝግጅት',
          'ሞግዚት',
          'አስጠኚ',
          'ዲሽ',
          'ኤሌክትሪክ',
          'ቧንቧ',
          'ጥገና',
          'ቀለም ቅብ',
          'ግንባታ ስራ',
          'ጂፕሰም ስራ',
          'አልሙኒየም ስራ',
          'አናጺ',
          'ወለል ንጣፍ',
          'ሂሳብ ስራ',
          'ሽያጭ'     
      ],
      employerName: '',
      employerNameError: '',
      phoneNumber: '',
      selectedService: '',
      phoneNumberError: ''
    }
  }, 

  methods: {
    handleButtonClick(action) {
      this.showPhoneNumberInput = true;
      this.showEmployerNameInput = true;
      this.showServiceOfInterestInput = false;
      // Save the action to a data property to handle it later
      this.selectedAction = action;

      if(this.selectedAction !== 'bank-confirmation'){
        this.showServiceOfInterestInput = true;
        return;
      }
    },

    generateMessage() {
      let message = '';

      if (this.phoneNumber === '') {
        this.phoneNumberError = 'Phone number cannot be empty.';
        return;
      }

      if(!this.employerName){
        this.employerNameError = 'Employer name cannot be empty.';
        return;
      }


      if (!/^(09)\d{8}$/.test(this.phoneNumber)) {
        this.phoneNumberError = 'Invalid phone number format. It should start with 09 and should be 10 digits long.';
        return;
      }
      this.phoneNumberError = '';
      this.employerNameError = '';
      this.showPhoneNumberInput = false;
      this.showEmployerNameInput = false;
      this.showServiceOfInterestInput = false;

      switch (this.selectedAction) {
        case 'bank-confirmation':
          message = `ሰላም ${this.employerName}! የባንክ መረጃ እንደደረስዎት ለማረጋገጥ ደውለን ነበር። እባክዎን በ${this.phoneNumber} መልሰው በመደወል የተሻለ አገልግሎት እንድንሰጥዎ ያግዙን። መልካም ቀን!`;
          break;
        case 'payment-received':
          message = `ሰላም ${this.employerName}! ክፍያውን ስለፈጸሙ እናመሰግናለን። መስፈርትዎን የሚያሟላ የ${this.selectedService} ባለሙያ ስልክ ከ20 - 30 ደቂቃ ውስጥ ይደርሶታል። ለበለጠ መረጃ በ${this.phoneNumber} ይደውሉ። መልካም ቀን!`;
          break;
        case 'reminder':
          message = `ሰላም ${this.employerName}! ክፍያ ባለመፈጸምዎ የ${this.selectedService} ባለሙያ ጥያቄዎን ለማስተናገድ አልቻልንም። በቀረው 12 ሰዓት ውስጥ ክፍያውን በመፈጸም ፈጣን አገልግሎት ያግኙ። ለበለጠ መረጃ በ${this.phoneNumber} ይደውሉ። መልካም ቀን!`;
          break;
        case 'Closed Ticket':
          message = `ሰላም ${this.employerName}! ለ${this.selectedService} ባለሙያ ጥያቄዎ የአገልግሎት ክፍያ ባለመፈጸምዎ ሃሳብዎን እንደቀየሩ ተቆጥሮ ትዕዛዝዎ ተዘግቷል። በ${this.phoneNumber} ቢደውሉልን ልናገለግልዎ ዝግጁ ነን። መልካም ቀን!`;
          break;
        default:
          break;
      }
      this.$emit('payment-generated', message);
      this.phoneNumber = '';
      this.employerName = '';
      this.selectedService = this.serviceOfInterest
    },
  },
 };
 </script> 