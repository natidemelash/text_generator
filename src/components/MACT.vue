<template>
    <div class="card p-6 mx-3 md:mx-auto max-w-4xl bg-[#4f4d4d] mt-8 shadow-md rounded-md">
      <h3 class="text-lg mb-4 text-[#fff]">MACT Engagement Messages</h3>
  
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
  
      <InputField
        v-if="showCustomerNameInput"
        label="Customer Name"
        v-model="customerName"
        placeholder="Employer name"
        :error="customerNameError"
        @input="validateCustomerName"
      />
  
      <div v-if="showServiceOfInterestInput">
        <label class="mr-2">Service of Interest</label>
        <select
          v-model="selectedService"
          class="text-sm bg-[#333] py-1 px-4 rounded-md my-4"
          @change="validateService"
        >
          <option v-for="(service, index) in serviceOfInterest" :key="index">
            {{ service }}
          </option>
        </select>
        <p v-if="selectedServiceError" class="text-amber-500 text-sm mt-1">{{ selectedServiceError }}</p>
      </div>
  
      <div v-if="showReasonForDisable">
        <label class="mr-2">Reason for Disable</label>
        <select
          v-model="disabledFor"
          class="text-sm bg-[#333] py-1 px-4 rounded-md my-4"
          @change="validateReasonForDisable"
        >
          <option v-for="(reason, index) in reasonForDisable" :key="index">
            {{ reason }}
          </option>
        </select>
        <p v-if="reasonForDisableError" class="text-amber-500 text-sm mt-1">{{ reasonForDisableError }}</p>
      </div>
  
      <InputField
        v-if="showCustomerNameInput"
        label="CRM Number"
        v-model="crmNumber"
        type="number"
        placeholder="CRM Number"
        :error="crmError"
      />
  
      <div v-if="showPhoneNumberInput" class="mt-4">
        <InputField
          label="Phone Number/የዲስፓቸር ስልክ"
          v-model="phoneNumber"
          placeholder="Dispatcher phone"
          :error="phoneNumberError"
          @input="validatePhoneNumber"
        />
        <button @click="emitMessageEvent" class="mt-2 bg-[#333] cursor-pointer text-xs text-white px-4 py-2 rounded">
          <img src="../assets/send.png" alt="" width="25" />
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import { serviceOfInterest } from '@/data/serviceOfInterest';
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
      validateReasonForDisable() {
        this.reasonForDisableError = this.disabledFor ? '' : 'Please choose the reason for disabling';
      },
      validateForm() {
        this.validateCustomerName();
        this.validateCRMNumber();
  
        if (this.selectedAction === 'mact-01' || this.selectedAction === 'mact-02') this.validateService();
        if (this.selectedAction === 'mact-07') this.validateReasonForDisable();
  
        return !this.customerNameError && !this.crmError && !this.selectedServiceError;
      }
    }
  }
  
  export default {
    components: {
      InputField
    },
    mixins: [validationMixin],
    props: ['showPhoneNumberInput', 'showCustomerNameInput', 'showServiceOfInterestInput', 'showReasonForDisable'],
    data() {
      return {
        buttons: [
          { action: 'mact-01', label: 'First call to employer - No answer/ቀጣሪው ስልክ አያነሳም (1ኛ ሙከራ)', class: 'bg-[#e21e81] text-xs text-white px-6 py-3 rounded' },
          { action: 'mact-02', label: 'Repeated calls to employer - No answer/ቀጣሪው ስልክ አያነሳም (መዝጊያ)', class: 'bg-[#e21e81] text-xs text-white px-6 py-3 rounded' },
          { action: 'mact-03', label: 'Asking Employer Feedback', class: 'bg-[#e21e81] text-xs text-white px-6 py-3 rounded' },
          { action: 'mact-04', label: 'SP Not Answering - 1st Call SMS', class: 'bg-[#588fe8] text-xs text-white px-6 py-3 rounded' },
          { action: 'mact-05', label: 'SP Not Answering - 2nd Call SMS', class: 'bg-[#588fe8] text-xs text-white px-6 py-3 rounded' },
          { action: 'mact-06', label: 'SP Not Answering - Job Transfered to other', class: 'bg-[#588fe8] text-xs text-white px-6 py-3 rounded' },
          { action: 'mact-07', label: '🚫 Disable Ad', class: 'bg-[#588fe8] text-sm text-white px-6 py-3 rounded' }
        ],
        customerName: '',
        customerNameError: '',
        crmNumber: '',
        crmError: '',
        phoneNumber: '',
        selectedService: '',
        selectedServiceError: '',
        disabledFor: '',
        reasonForDisableError: '',
        reasonForDisable: [
          'ምላሽ ለመስጠት ፍቃደኛ ስላልሆኑ',
          'ለስራ ተልከው ስለቀሩ',
          'ያልተገባ ባህሪ በማሳየትዎ',
          'ሌላ ባለሙያ በመላክዎ'
        ],
        selectedAction: '',
        serviceOfInterest
      }
    },
    methods: {
      handleButtonClick(action) {
        this.selectedAction = action;
        this.$emit('button-click', action);
      },
      emitMessageEvent() {
        if (!this.validateForm()) return;
  
        // Emit an event with the action and phone number to be handled by the parent component
        this.$emit('generate-message', {
          action: this.selectedAction,
          phoneNumber: this.phoneNumber,
          customerName: this.customerName,
          selectedService: this.selectedService,
          crmNumber: this.crmNumber,
          disabledFor: this.disabledFor
        });
  
        this.customerName = '';
        this.phoneNumber = '';
        this.crmNumber = '';
        this.selectedService = '';
        this.disabledFor = '';
      }
    }
  }
</script>
