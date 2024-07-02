<template>
  <div class="card p-6 mx-3 md:mx-auto max-w-4xl bg-[#4f4d4d] mt-8 shadow-md rounded-md">
    <h3 class="text-lg mb-4 text-[#fff]">BLSR Engagement Messages</h3>

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

    <InputField
      v-if="showCustomerNameInput"
      label="CRM Number"
      v-model="crmNumber"
      type="number"
      placeholder="CRM Number"
      :error="crmError"
      @input="validateCustomerName"
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
import formDataMixin from '@/mixins/formDataMixin';
import InputField from './InputField.vue';

export default {
  components: {
    InputField
  },
  mixins: [formDataMixin],
  props: ['showPhoneNumberInput', 'showServiceOfInterestInput', 'showCustomerNameInput'],
  data() {
    return {
      buttons: [
        { action: 'blsr-01', label: 'Unreachable during FollowUp', class: 'bg-[#e21e81] text-xs text-white px-6 py-3 rounded' },
        { action: 'blsr-02', label: 'Employer does not contact SPs in 24 hours', class: 'bg-[#e21e81] text-xs text-white px-6 py-3 rounded' }
      ],
    }
  },
}
</script>
