<template>
  <div class="card p-6 mx-3 md:mx-auto max-w-4xl bg-[#4f4d4d] mt-8 shadow-md rounded-md">
    <h3 class="text-lg mb-4 text-[#fff]">ACE Engagement Messages</h3>

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

    <!-- Customer Name -->
    <InputField
      v-if="showCustomerNameInput"
      label="Customer Name"
      v-model="customerName"
      placeholder="Employer name"
      :error="customerNameError"
      class="my-4"
    />

    <!-- Service of Interest -->
    <div v-if="showServiceOfInterestInput">
      <label class="mr-3">Service of Interest</label>
      <select
        v-model="selectedService"
        class="text-sm bg-[#333] py-2 px-4 rounded-md my-4 focus:outline-none"
        @change="validateService"
      >
        <option  v-for="(service, index) in serviceOfInterest" :key="index">
          {{ service }}
        </option>
      </select>
      <p v-if="selectedServiceError" class="text-amber-500 text-sm mt-1">{{ selectedServiceError }}</p>
    </div>

    <!-- CRM Number -->
    <InputField
      v-if="showCustomerNameInput"
      label="CRM Number"
      v-model="crmNumber"
      type="number"
      placeholder="CRM Number"
      :error="crmError"
      class="mt-4"
    />

    <!-- Input field for phone number -->
    <div v-if="showPhoneNumberInput" class="mt-4">
      <InputField
        label="Phone Number/የዲስፓቸር ስልክ"
        v-model="phoneNumber"
        placeholder="Dispatcher phone"
        :error="phoneNumberError"
        @input="validatePhoneNumber"
      />
      <button
        @click="emitMessageEvent"
        class="mt-2 bg-[#333] cursor-pointer text-xs text-white px-4 py-2 rounded"
      >
        <img src="../assets/send.png" alt="" width="25" />
      </button>
    </div>
  </div>
</template>

<script>
import InputField from './InputField.vue';


const validationMixin = {
  methods: {
    validateCustomerName() {
      this.customerNameError = this.customerName ? '' : "Name can't be empty";
    },
    validateCRMNumber() {
      this.crmError = this.crmNumber ? '' : 'Please put CRM Number';
    },
    validateService() {
      this.selectedServiceError = this.selectedService ? '' : 'Please select a service';
    },
    // validateSelectedService() {
    //   this.selectedServiceError = this.selectedService ? '' : 'Please select the service'
    // },
  
    // validateForm() {
    //   this.validateCustomerName();
    //   this.validateCRMNumber();
    //   // this.validateSelectedService();
    //   if (this.selectedAction === 'pa-04') this.validatePaymentAmount();
    //   if (this.selectedAction === 'pa-03' || this.selectedAction === 'pa-12' || this.selectedAction === 'pa-13') this.validateSelectedTime();
    //   if (this.selectedAction === 'pa-10') this.validateSelectedDate();
    //   if (this.selectedAction === 'pa-12' || this.selectedAction === 'pa-13') this.validateServiceAndEmployerName();
      
    //   return !this.customerNameError && !this.crmError && !this.paymentAmountError && !this.selectedTimeError && !this.selectedDateError && !this.selectedServiceError && !this.employerNameError;
    // }
  }
};

export default {
  components: {
    InputField,
  },
  props: ['showPhoneNumberInput', 'showServiceOfInterestInput', 'showCustomerNameInput'],
  mixins: [validationMixin],
  data() {
    return {
      buttons: [
        { action: 'ace-01', label: 'Customer from BlindSpot', class: 'bg-[#e21e81] text-xs text-white px-6 py-3 rounded' },
        { action: 'ace-02', label: 'Customer from Search', class: 'bg-[#e21e81] text-xs text-white px-6 py-3 rounded' },
        { action: 'ace-03', label: 'Newly Registered Customer', class: 'bg-[#e21e81] text-xs text-white px-6 py-3 rounded' },
        { action: 'ace-04', label: 'Multiple Search', class: 'bg-[#e21e81] text-xs text-white px-6 py-3 rounded' },
      ],
      phoneNumber: '',
      phoneNumberError: '',
      serviceOfInterest: [
        'ምግብ አብሳይ',
        'ጽዳት',
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
        'ሽያጭ',
      ],
      selectedService: null,
      selectedServiceError: '',
      customerName: '',
      customerNameError: '',
      crmNumber: '',
      crmError: '',
    };
  },
  methods: {
    handleButtonClick(action) {
      this.selectedAction = action;
      this.$emit('button-click', action);
    },

    emitMessageEvent() {
      // Implement your validation logic here before emitting the event
      if (!this.customerName) {
        this.customerNameError = "Name can't be empty";
        return;
      }

      if (!this.crmNumber) {
        this.crmError = 'Please put CRM Number';
        return;
      }

      // Emit the event if validation passes
      this.$emit('generate-message', {
        action: this.selectedAction,
        phoneNumber: this.phoneNumber,
        selectedService: this.selectedService,
        customerName: this.customerName,
        crmNumber: this.crmNumber,
      });

      // Reset form fields after emitting the event
      this.phoneNumber = ''
      this.customerName = '';
      this.selectedService = null;
      this.crmNumber = '';
      this.selectedServiceError = '';
    },
  },
};
</script>
