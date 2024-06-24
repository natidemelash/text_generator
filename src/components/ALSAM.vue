<template>
  <div class="card p-6 mx-3 md:mx-auto max-w-4xl bg-[#4f4d4d] mt-8 shadow-md rounded-md">
    <h3 class="text-lg mb-4 text-[#fff]">Project ALSAM Engagement Messages</h3>
    <div class="grid grid-cols-1 md:grid-cols-3 items-center text-black gap-8">
      <button
        v-for="(button, index) in buttons"
        :key="index"
        :class="button.class"
        @click="handleButtonClick(button.action)"
      >
        {{ button.label }}
      </button>
    </div>
    <div v-if="showCustomerNameInput">
      <InputField
        label="Customer Name"
        :modelValue="customerName"
        @update:modelValue="customerName = $event"
        placeholder="Customer name"
        :error="customerNameError"
      />
    </div>
    <div v-if="showPaymentAmountInput">
      <InputField
        label="Payment Amount"
        :modelValue="paymentAmount"
        @update:modelValue="paymentAmount = $event"
        type="number"
        placeholder="Payment amount"
        :error="paymentAmountError"
      />
    </div>
    <div v-if="showDateInput">
      <InputField
        label="Select Date"
        :modelValue="selectedDate"
        @update:modelValue="selectedDate = $event"
        type="date"
        :error="selectedDateError"
      />
    </div>
    <div class="flex items-center gap-4">
      <div v-if="showServiceOfInterestInput">
        <label class="mr-3">Service of Interest</label>
        <select v-model="selectedService" class="text-sm bg-[#333] py-2 px-4 rounded-md my-4 focus:outline-none">
          <option v-for="(service, index) in expatServices" :key="index">{{ service }}</option>
        </select>
        <p v-if="selectedServiceError"  class="text-amber-500 text-sm mt-1">{{ selectedServiceError }}</p>
      </div>
      <div v-if="showTimeInput" class="space-x-2">
        <InputField
          label="Select Time"
          :modelValue="selectedTime"
          @update:modelValue="selectedTime = $event"
          type="time"
          :error="selectedTimeError"
        />
      </div>
    </div>
    <div v-if="showEmployerNameInput">
      <InputField
        label="Employer Name"
        :modelValue="employerName"
        @update:modelValue="employerName = $event"
        placeholder="Employer name"
        :error="employerNameError"
      />
    </div>
    <div v-if="showCustomerNameInput">
      <InputField
        label="CRM Number"
        :modelValue="crmNumber"
        @update:modelValue="crmNumber = $event"
        type="number"
        placeholder="CRM Number"
        :error="crmError"
      />
    </div>
    <div v-if="showPaymentAmountInput" class="mt-4">
      <InputField
        label="Phone Number"
        :modelValue="phoneNumber"
        @update:modelValue="phoneNumber = $event"
        placeholder="Dispatcher phone"
        :error="phoneNumberError"
        @input="validatePhoneNumber"
      />
    </div>
    <button @click="emitMessageEvent" class="mt-2 bg-[#333] cursor-pointer text-xs text-white px-4 py-2 rounded">
      <img src="../assets/send.png" alt="" width="25">
    </button>
  </div>

  <div>
    <hr class="my-12 px-8 mx-20" />
    <PricingCalculator />
  </div>
</template>


<script>
import InputField from './InputField.vue';
import PricingCalculator from './PricingCalculator.vue';

const validationMixin = {
  methods: {
    validateCustomerName() {
      this.customerNameError = this.customerName ? '' : "Name can't be empty";
    },
    validateCRMNumber() {
      this.crmError = this.crmNumber ? '' : 'Please put CRM Number';
    },
    validatePaymentAmount() {
      this.paymentAmountError = this.paymentAmount && this.paymentAmount > 0 ? '' : 'Please provide the correct payment amount value';
    },
    validateSelectedTime() {
      this.selectedTimeError = this.selectedTime ? '' : 'Please add the appointment time';
    },
    validateSelectedDate() {
      this.selectedDateError = this.selectedDate ? '' : 'Please add the payment due on date';
    },
    // validateSelectedService() {
    //   this.selectedServiceError = this.selectedService ? '' : 'Please select the service'
    // },
    validateServiceAndEmployerName() {
      this.selectedServiceError = this.selectedService ? '' : 'Please select the service';
      this.employerNameError = this.employerName ? '' : 'Please add the employer name';
    },
    validateForm() {
      this.validateCustomerName();
      this.validateCRMNumber();
      // this.validateSelectedService();
      if (this.selectedAction === 'pa-04') this.validatePaymentAmount();
      if (this.selectedAction === 'pa-03' || this.selectedAction === 'pa-12' || this.selectedAction === 'pa-13') this.validateSelectedTime();
      if (this.selectedAction === 'pa-10') this.validateSelectedDate();
      if (this.selectedAction === 'pa-12' || this.selectedAction === 'pa-13') this.validateServiceAndEmployerName();
      
      return !this.customerNameError && !this.crmError && !this.paymentAmountError && !this.selectedTimeError && !this.selectedDateError && !this.selectedServiceError && !this.employerNameError;
    }
  }
};

export default {
  components:{
    InputField,
    PricingCalculator
  },
  props: ['showPhoneNumberInput', 'showServiceOfInterestInput', 'showCustomerNameInput', 'showPaymentAmountInput', 'showTimeInput', 'showDateInput', 'showEmployerNameInput'],
  mixins: [validationMixin],
  data() {
    return {
      customerName: '',
      expatServices: ['Cooking', 'Cleaning', 'Cooking & Cleaning'],
      selectedService: '',
      phoneNumber: '0900320880',
      crmNumber: '',
      employerName: '',
      paymentAmount: '',
      selectedTime: null,
      selectedDate: null,
      feedbackFormLink: 'bit.ly/3wJVGON',
      customerNameError: '',
      paymentAmountError: '',
      crmError: '',
      employerNameError: '',
      selectedTimeError: '',
      selectedDateError: '',
      selectedServiceError: '',
      newTime:null,
      buttons: [
        { label: 'Detail Confirmation(1st SMS)', action: 'pa-01', class: 'bg-[#e21e81] text-xs text-white px-6 py-3 rounded' },
        { label: 'Detail Confirmation(2nd SMS)', action: 'pa-02', class: 'bg-[#e21e81] text-xs text-white px-6 py-3 rounded' },
        { label: 'Detail Confirmation(Last SMS)', action: 'pa-05', class: 'bg-[#e21e81] text-xs text-white px-6 py-3 rounded' },
        { label: 'Appointment(1 day before)', action: 'pa-03', class: 'bg-[#e21e81] text-xs text-white px-6 py-3 rounded' },
        { label: 'Payment Details', action: 'pa-04', class: 'bg-[#e21e81] text-xs text-white px-6 py-3 rounded' },
        { label: 'Payment Reminder', action: 'pa-06', class: 'bg-[#e21e81] text-xs text-white px-6 py-3 rounded' },
        { label: 'Payment Reminder(Final)', action: 'pa-07', class: 'bg-[#e21e81] text-xs text-white px-6 py-3 rounded' },
        { label: 'Payment Received', action: 'pa-08', class: 'bg-[#e21e81] text-xs text-white px-6 py-3 rounded' },
        { label: 'Appointment (on the day)', action: 'pa-09', class: 'bg-[#e21e81] text-xs text-white px-6 py-3 rounded' },
        { label: 'Payment due on', action: 'pa-10', class: 'bg-[#e21e81] text-xs text-white px-6 py-3 rounded' },
        { label: 'Feedback Request', action: 'pa-11', class: 'bg-[#e21e81] text-xs text-white px-6 py-3 rounded' },
        { label: 'Notification for SP (on the day)', action: 'pa-12', class: 'bg-[#588fe8] text-xs text-white px-6 py-3 rounded' },
        { label: 'Notification for SP (one day before)', action: 'pa-13', class: 'bg-[#588fe8] text-xs text-white px-6 py-3 rounded' },
      ]
    };
  },
  methods: {
    addOneHour(timeStr) {
        const [hours, minutes] = timeStr.split(':').map(Number);
        const date = new Date();
        date.setHours(hours + 1, minutes);
        return date.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).replace(/\s/g, '');
    },
    handleButtonClick(action) {
      this.selectedAction = action;
      this.$emit('button-click', action);
    },
    emitMessageEvent() {
      if (!this.validateForm()) return;

      this.$emit('generate-message', {
        action: this.selectedAction,
        phoneNumber: this.phoneNumber,
        selectedService: this.selectedService,
        customerName: this.customerName,
        crmNumber: this.crmNumber,
        paymentAmount: this.paymentAmount,
        selectedTime: this.formattedTime,
        newTime: this.dueTime,
        selectedDate: this.selectedDate,
        feedbackFormLink: this.feedbackFormLink,
        employerName: this.employerName
      });

      this.resetForm();
    },
    resetForm() {
      this.customerName = '';
      this.selectedService = '';
      this.phoneNumber = '0900320880';
      this.crmNumber = '';
      this.employerName = '';
      this.paymentAmount = '';
      this.selectedDate = null,
      this.selectedTime = null
    },
  },

  computed: {
    formattedTime() {
        if (!this.selectedTime) return '';
        
        const time = new Date(`2000-01-01T${this.selectedTime}`);

        // Check if the messageType is 'pa-02'
        if (this.selectedAction === 'pa-12' || this.selectedAction === 'pa-13') {
            const hours = time.getHours();
            let prefix = '';
            // Check if the time is between 1:00 and 6:00
            if (hours >= 1 && hours < 6) {
                prefix = 'ጠዋት';
            } else {
                prefix = 'ከቀኑ';
            }
            return `${prefix} ${this.selectedTime.toLocaleString({hour:'numeric', hour12: true})}`;
        } else {
            // For other message types, simply format the time with AM/PM indicator
            return time.toLocaleString('en-US',{ hour: 'numeric', minute: '2-digit', hour12: true }).replace(/\s/g, '');
        }
    },
    dueTime(){
      let newTime = this.addOneHour(this.selectedTime)
      return newTime; 
    }
  }
} 

</script>