
<template>
    <div class="card p-6 mx-3 md:mx-auto max-w-4xl bg-[#4f4d4d] mt-8 shadow-md rounded-md">
        <h3 class="text-lg mb-4 text-[#fff]">MACT Engagement Messages</h3>

        <div class="grid grid-cols-1 md:grid-cols-3 items-center text-black gap-8">
            <button class="bg-[#e21e81] text-xs text-white px-6 py-3 rounded"  @click="handleButtonClick('mact-01')">First call to employer - No answer/ቀጣሪው ስልክ አያነሳም (1ኛ ሙከራ)</button>
            <button class="bg-[#e21e81] text-xs text-white px-6 py-3 rounded"  @click="handleButtonClick('mact-02')">Repeated calls to employer - No answer/ቀጣሪው ስልክ አያነሳም (መዝጊያ)</button>
            <button class="bg-[#e21e81] text-xs text-white px-6 py-3 rounded"  @click="handleButtonClick('mact-03')">Asking Employer Feedback</button>
            <button class="bg-[#588fe8] text-xs text-white px-6 py-3 rounded"  @click="handleButtonClick('mact-04')">SP Not Answering - 1st Call SMS</button>
            <button class="bg-[#588fe8] text-xs text-white px-6 py-3 rounded"  @click="handleButtonClick('mact-05')">SP Not Answering - 2nd Call SMS </button>
            <button class="bg-[#588fe8] text-xs text-white px-6 py-3 rounded"  @click="handleButtonClick('mact-06')">SP Not Answering - Job Transfered to other</button>
            <button class="bg-[#588fe8] text-xs text-white px-6 py-3 rounded"  @click="handleButtonClick('mact-07')">Disable Ad</button>
        </div>

             <!-- Customer Name -->
        <div v-if="showCustomerNameInput">
          <label class="customerName">Customer Name </label>
          <input v-model="customerName" type="text" placeholder="Employer name" class="py-2 px-3 bg-[#333] text-sm text-white rounded-md mt-4 mb-2 focus:outline-none" >
          <p v-if="customerNameError" class="text-amber-500 text-sm mt-1">{{ customerNameError }}</p>
        </div>

         <!-- Serivice field for  -->
         <div v-if="showServiceOfInterestInput">
          <label>Service of Interest </label> 
          <select v-model="selectedService" class="text-sm bg-[#333] py-1 px-4 rounded-md my-4">
            <option v-for="(service, index) in serviceOfInterest" :key="index">{{ service }}</option>
          </select>
        </div>

        <!-- Resasons for disabling -->
        <div v-if="showReasonForDisable">
           <label>Reason for Disable</label> 
           <select v-model="disabledFor" class="text-sm bg-[#333] py-1 px-4 rounded-md my-4">
            <option v-for="(reason, index) in reasonForDisable" :key="index">{{ reason }}</option>
          </select>
        </div>

        <!-- CRM Number -->
        <div v-if="showCustomerNameInput">
            <label class="crmNumber">CRM Number </label>
            <input v-model="crmNumber" type="number" placeholder="CRM Number" class="py-2 px-3 bg-[#333] text-sm text-white rounded-md mt-4 mb-2 focus:outline-none" >
            <p v-if="crmError" class="text-amber-500 text-sm mt-1">{{ crmError }}</p>
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
    props: ['showPhoneNumberInput', 'showCustomerNameInput', 'showServiceOfI nterestInput', 'showReasonForDisable'],
    data(){
        return{
            reasonForDisable:[
                'ምላሽ ለመስጠት ፍቃደኛ ስላልሆኑ',
                'ለስራ ተልከው ስለቀሩ',
                'ያልተገባ ባህሪ በማሳየትዎ',
                'ሌላ ባለሙያ በመላክዎ'    
            ],
            serviceOfInterest: [
                'ምግብ አብሳይ',
                'የጽዳት',
                'ምግብ ዝግጅት',
                'ሞግዚት',
                'አስጠኚ',
                'ዲሽ',
                'ኤሌክትሪክ ስራ',
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
            customerName: '',
            customerNameError: '',
            crmNumber: '',
            crmError: '',  
            phoneNumber: '',
            selectedService: '',
            disabledFor:'',
            phoneNumberError: '',
        }
    },
    methods:{
        handleButtonClick(action) {
            this.selectedAction = action
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
            // Emit an event with the action and phone number to be handled by the parent component
            this.$emit('generate-message', {
                action: this.selectedAction,
                phoneNumber: this.phoneNumber,
                customerName: this.customerName,
                selectedService: this.selectedService,
                crmNumber: this.crmNumber,
                disabledFor: this.disabledFor
            });
            this.customerName = ''
            this.phoneNumber = ''
            this.crmNumber = ''
            this.selectedService = this.serviceOfInterest
            this.disabledFor = this.reasonForDisable
        }
    }
}
</script>
