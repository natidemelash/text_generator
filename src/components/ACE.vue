<template>
    <div class="card p-6 mx-3 md:mx-auto max-w-4xl bg-[#4f4d4d] mt-8 shadow-md rounded-md">
        <h3 class="text-lg mb-4 text-[#fff]">ACE Engagement Messages</h3>

        <div class="grid grid-cols-1 md:grid-cols-3 items-center text-black gap-8">
          <button class="bg-[#e21e81] text-xs text-white px-6 py-3 rounded" @click="handleButtonClick('ace-01')">Customer from BlindSpot</button>
          <button class="bg-[#e21e81] text-xs text-white px-6 py-3 rounded" @click="handleButtonClick('ace-02')">Customer from Search</button>
          <button class="bg-[#e21e81] text-xs text-white px-6 py-3 rounded" @click="handleButtonClick('ace-03')">Newly Registered Customer</button>
          <button class="bg-[#e21e81] text-xs text-white px-6 py-3 rounded" @click="handleButtonClick('ace-04')">Closing Employer</button>
        </div>

        <!-- Customer Name -->
        <div v-if="showCustomerNameInput">
          <label class="customerName">Customer Name </label>
          <input v-model="customerName" type="text" placeholder="Employer name" class="py-1 px-3 bg-[#333] text-sm text-white rounded-md my-4" >
          <p v-if="customerNameError" class="text-amber-500 text-sm mt-1">{{ customerNameError }}</p>
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
export default{
  props: ['showPhoneNumberInput', 'showServiceOfInterestInput', 'showCustomerNameInput'],
  data(){
    return{
      phoneNumber: '',
      phoneNumberError: '',
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
      selectedService: null,
      customerName: '',
      customerNameError: ''
    }
  },
  methods:{
    handleButtonClick(action){
      this.selectedAction = action;
      this.$emit('button-click', action)
    },

    emitMessageEvent() {
      if(!this.customerName){
        this.customerNameError = 'Name can\'t be empty'
        return;
      }
      this.$emit('generate-message', {
        action: this.selectedAction,
        phoneNumber: this.phoneNumber,
        selectedService:this.selectedService,
        customerName: this.customerName
      });

      this.customerName = '';
      this.serviceOfInterest = null
    }
  }  
}
</script>