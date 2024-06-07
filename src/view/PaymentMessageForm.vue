<template>
  <div class="card p-6 mx-3 md:mx-auto max-w-4xl bg-[#4f4d4d] mt-8 shadow-md rounded-md">
    <h2 class="text-xl font-semibold mb-4 text-[#fff]">Payment related messages</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 text-black gap-8">
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
      v-if="showEmployerNameInput"
      label="Employer Name"
      v-model="employerName"
      placeholder="Employer name"
      :error="employerNameError"
    />

    <div v-if="showServiceOfInterestInput">
      <label>Service of Interest</label>
      <select
        v-model="selectedService"
        class="text-sm bg-[#333] py-1 px-4 rounded-md my-4"
      >
        <option v-for="(service, index) in serviceOfInterest" :key="index">
          {{ service }}
        </option>
      </select>
    </div>

    <InputField
      v-if="showPhoneNumberInput"
      label="Phone Number/የዲስፓቸር ስልክ"
      v-model="phoneNumber"
      placeholder="Dispatcher phone"
      :error="phoneNumberError"
      @input="validatePhoneNumber"
    />

    <button
      @click="generateMessage"
      class="mt-2 bg-[#333] cursor-pointer text-xs text-white px-4 py-2 rounded"
    >
      <img src="../assets/send.png" alt="" width="25" />
    </button>
  </div>
</template>

<script>
import InputField from '@/components/InputField.vue';

const validationMixin = {
  methods: {
    validateCustomerName() {
      this.employerNameError = this.employerName ? '' : "Name can't be empty";
    },
    validatePhoneNumber() {
      const phoneNumberPattern = /^(09)\d{8}$/;
      this.phoneNumberError = phoneNumberPattern.test(this.phoneNumber)
        ? ''
        : 'Invalid phone number format. It should start with 09 and should be 10 digits long.';
    }
  }
}

export default {
  components: {
    InputField
  },
  mixins: [validationMixin],
  data() {
    return {
      showPhoneNumberInput: false,
      showEmployerNameInput: false,
      showServiceOfInterestInput: false,
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
        'ሽያጭ'
      ],
      employerName: '',
      employerNameError: '',
      phoneNumber: '',
      selectedService: '',
      phoneNumberError: '',
      selectedAction: '',
      buttons: [
        { action: 'bank-confirmation', label: 'Bank information Confirmation / የመክፈያ መረጃ (ባንክ አካውንት) መድረሱን ለማረጋገጥ', class: 'bg-[#e21e81] text-xs text-white px-6 py-3 rounded' },
        { action: 'payment-received', label: 'Received Payment / ክፍያ ደርሶናል', class: 'bg-[#e21e81] text-xs text-white px-6 py-3 rounded' },
        { action: 'reminder', label: 'Payment Reminder / የክፍያ ማስታወሻ', class: 'bg-[#e21e81] text-xs text-white px-6 py-3 rounded' },
        { action: 'Closed Ticket', label: 'Closing ticket / የመዝጊያ መልዕክት', class: 'bg-[#e21e81] text-xs text-white px-6 py-3 rounded' }
      ]
    }
  },
  methods: {
    handleButtonClick(action) {
      this.showPhoneNumberInput = true;
      this.showEmployerNameInput = true;
      this.showServiceOfInterestInput = action !== 'bank-confirmation';
      this.selectedAction = action;
    },
    generateMessage() {
      if (this.phoneNumber === '') {
        this.phoneNumberError = 'Phone number cannot be empty.';
        return;
      }
      if (!this.employerName) {
        this.employerNameError = 'Employer name cannot be empty.';
        return;
      }
      if (this.phoneNumberError) {
        return;
      }
      let message = '';
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
      this.resetForm();
    },
    resetForm() {
      this.phoneNumber = '';
      this.employerName = '';
      this.selectedService = '';
      this.phoneNumberError = '';
      this.employerNameError = '';
      this.showPhoneNumberInput = false;
      this.showEmployerNameInput = false;
      this.showServiceOfInterestInput = false;
    }
  }
};
</script>
