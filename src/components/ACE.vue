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
      placeholder="Customer name"
      :error="customerNameError"
      @input="validateCustomerName"
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
      @input="validateCRMNumber"
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
import formDataMixin from '@/mixins/formDataMixin';

export default {
  components: {
    InputField,
  },
  props: ['showPhoneNumberInput', 'showServiceOfInterestInput', 'showCustomerNameInput'],
  mixins: [formDataMixin],
  data() {
    return {
      buttons: [
        { action: 'ace-01', label: 'Customer from BlindSpot', class: 'bg-[#e21e81] text-xs text-white px-6 py-3 rounded' },
        { action: 'ace-02', label: 'Customer from Search', class: 'bg-[#e21e81] text-xs text-white px-6 py-3 rounded' },
        { action: 'ace-03', label: 'Newly Registered Customer', class: 'bg-[#e21e81] text-xs text-white px-6 py-3 rounded' },
        { action: 'ace-04', label: 'Multiple Search', class: 'bg-[#e21e81] text-xs text-white px-6 py-3 rounded' },
      ],
    };
  },

};
</script>
