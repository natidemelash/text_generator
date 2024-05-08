<template>
  <div class="card p-6 mx-3 md:mx-auto max-w-4xl bg-[#4f4d4d] mt-8 shadow-md rounded-md">
     <h3 class="text-lg mb-4 text-[#fff]">Project ALSAM Engagement Messages</h3>

     <div class="grid grid-cols-1 md:grid-cols-3 items-center text-black gap-8">
       <button class="bg-[#e21e81] text-xs text-white px-6 py-3 rounded"  @click="handleButtonClick('pa-01')">Detail Confirmation(1st SMS)</button>
       <button class="bg-[#e21e81] text-xs text-white px-6 py-3 rounded"  @click="handleButtonClick('pa-02')">Detail Confirmation(2nd SMS)</button>
       <button class="bg-[#e21e81] text-xs text-white px-6 py-3 rounded"  @click="handleButtonClick('pa-05')">Detail Confirmation(Last SMS)</button>
       <button class="bg-[#e21e81] text-xs text-white px-6 py-3 rounded"  @click="handleButtonClick('pa-03')">Appointment(1 day before)</button>
       <button class="bg-[#e21e81] text-xs text-white px-6 py-3 rounded"  @click="handleButtonClick('pa-04')">Payment Details</button>
       <button class="bg-[#e21e81] text-xs text-white px-6 py-3 rounded"  @click="handleButtonClick('pa-06')">Payment Reminder</button>
       <button class="bg-[#e21e81] text-xs text-white px-6 py-3 rounded"  @click="handleButtonClick('pa-07')">Payment Reminder(Final)</button>
       <button class="bg-[#e21e81] text-xs text-white px-6 py-3 rounded"  @click="handleButtonClick('pa-08')">Payment Received</button>
       <button class="bg-[#e21e81] text-xs text-white px-6 py-3 rounded"  @click="handleButtonClick('pa-09')">Appointment (on the day) </button>
       <button class="bg-[#e21e81] text-xs text-white px-6 py-3 rounded"  @click="handleButtonClick('pa-10')">Payment due on</button>
     </div>

     <!-- Customer Name -->
     <div v-if="showCustomerNameInput">
         <label class="customerName">Customer Name </label>
         <input v-model="customerName" type="text" placeholder="Customer name" class="py-2 px-3 bg-[#333] text-sm text-white rounded-md mt-4 mb-2 focus:outline-none" >
         <p v-if="customerNameError" class="text-amber-500 text-sm mt-1">{{ customerNameError }}</p>
     </div>

     <div v-if="showPaymentAmountInput">
         <label class="paymentAmount">Payment Amount: </label>
         <input v-model="paymentAmount" type="number" placeholder="payment amount" class="py-2 px-3 bg-[#333] text-sm text-white rounded-md mt-4 mb-2 focus:outline-none" >
         <p v-if="paymentAmountError" class="text-amber-500 text-sm mt-1">{{ paymentAmountError }}</p>
     </div>

     <div v-if="showDateInput">
      <label for="date">Select Date:</label>
      <input v-model="selectedDate" type="date" id="date" class="px-4 py-2 bg-[#333] text-sm text-white rounded-md mt-4 mb-2 focus:outline-none">
     </div>

     <div class="flex items-center gap-4">
        <!-- Serivice field for  -->
       <di v-if="showServiceOfInterestInput">
         <label>Service of Interest </label> 
         <select v-model="selectedService" class="text-sm bg-[#333] py-1 px-4 rounded-md my-4">
           <option v-for="(service, index) in expatServices" :key="index">{{ service }}</option>
         </select>
       </di>

       <!-- Time picker -->
       <div  v-if="showTimeInput" class="space-x-2">
         <label for="time">Select Time: </label>
         <input v-model="selectedTime" type="time" id="time" class="px-4 py-2 bg-[#333] text-sm text-white rounded-md mt-4 mb-2 focus:outline-none">
       </div>
     </div>
     
     <!-- CRM Number -->
     <div v-if="showCustomerNameInput" >
         <label class="crmNumber">CRM Number </label>
         <input v-model="crmNumber" type="number" placeholder="CRM Number" class="py-2 px-3 bg-[#333] text-sm text-white rounded-md mt-4 mb-2 focus:outline-none" >
         <p v-if="crmError" class="text-[#F1948A] text-sm">{{ crmError }}</p>
     </div>

     <!-- Input field for phone number -->
     <div v-if="showPaymentAmountInput" class="mt-4">
         <label for="phoneNumber" class="text-sm font-semibold text-[#fff]">Phone Number/የዲስፓቸር ስልክ:</label>
         <input type="text" id="phoneNumber" v-model="phoneNumber" @input="validatePhoneNumber" placeholder="Dispatcher phone"  class="mt-2 px-4 py-2 text-black block w-[70%] bg-[#ECF0F1] shadow-sm sm:text-sm border-2 rounded-md focus:outline-none">
     </div>

     <button @click="emitMessageEvent" class="mt-2 bg-[#333] cursor-pointer text-xs text-white px-4 py-2 rounded">
        <img src="../assets//send.png" alt="" width="25">
     </button>
  </div>
</template>


<script>
export default {
props: ['showPhoneNumberInput', 'showServiceOfInterestInput', 'showCustomerNameInput', 'showPaymentAmountInput', 'showTimeInput', 'showDateInput'],
 data(){
     return{
        customerName: '',
        expatServices: ['Cooking', 'Cleaning', 'Cooking & Cleaning'],
        selectedService: null,
        phoneNumber: '0900320880',
        crmNumber: '',
        crmError: '',
        paymentAmount: '',
        paymentAmountError: '',
        selectedTime: null,
        selectedDate: null
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
     
     if(!this.crmNumber){
       this.crmError = 'Please put CRM Number'
       return;
     }

    if(this.selectedAction === 'pa-04'){
      if(!this.paymentAmount || this.paymentAmount <= 0){
        this.paymentAmountError = 'Please provide the correct payment amount value'
        return;
      }
    }

     if(this.selectedAction === 'pa-03'){
       if(!this.selectedTime){
       this.selectedTimeError =  'Please add the appointment time'
       return;
       }
     }

     if(this.selectedAction === 'pa-10'){
      if(!this.selectedDate){
        this.selectedDateError = 'Please add the payment due on date'
        return;
      }
     }

     this.$emit('generate-message', {
       action: this.selectedAction,
       phoneNumber: this.phoneNumber,
       selectedService:this.selectedService,
       customerName: this.customerName,
       crmNumber: this.crmNumber,
       paymentAmount: this.paymentAmount,
       selectedTime: this.formattedTime,
       selectedDate: this.selectedDate 
     });

     this.customerName = '';
     this.selectedService = this.expatServices
     this.crmNumber= ''
     this.paymentAmount = ''
     this.selectedTime =  new Date()
     this.selectedDate = null
   }
 },

 computed:{
   formattedTime() {
   if (!this.selectedTime) return '';
     const time = new Date(`2000-01-01T${this.selectedTime}`);
    return time.toLocaleString('en-US',{ hour: 'numeric', minute: '2-digit', hour12: true });
   }
 }
}
</script>
