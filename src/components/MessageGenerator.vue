<template>
  <div class="card p-6 mx-auto max-w-2xl bg-white mt-8 shadow-md rounded-md">
    <h3 class="text-2xl font-semibold mb-4 text-[#C21F80]">Generate Message</h3>

    <div class="mb-5">
      <label for="service" class="block text-sm font-medium text-gray-600 mb-1">Select Service/የስራ ዘርፍ:</label>
      <select v-model="selectedService"  class="w-[50%] border-2 rounded-md border-black  focus:border-b-[#C21F80] p-2 text-black">
        <option value="" disabled>Select a Service</option>
        <option value="ምግብ አብሳይ">ምግብ አብሳይ</option>
        <option value="ጽዳት">ጽዳት</option>
        <option value="ምግብ እና ጽዳት">ምግብ እና ጽዳት</option>
        <option value="ሞግዚት">ሞግዚት</option>
        <option value="ሹፌር">ሹፌር</option>
        <option value="ኤሌክትሪሽያን">ኤሌክትሪሽያን</option>
        <option value="ቧንቧ">ቧንቧ</option>
        <option value="ቀለም ቀቢ">ቀለም ቀቢ</option>
        <option value="ጂፕሰም ስራ">ጂፕሰም ስራ</option>
        <option value="አናፂ">አናፂ</option>
        <option value="ግንበኛ">ግንበኛ</option>
        <option value="ዲሽ_ቴክኒሽያን">ዲሽ ቴክኒሽያን</option>
        <option value="ሂሳብ_ባለሙያ">ሂሳብ ባለሙያ</option>
        <option value="ሽያጭ">ሽያጭ</option>
        <option value="ማናጀር">ማናጀር</option>
        <option value="TV_ጥገና">TV ጥገና</option>
        <option value="ፍሪጅ_ጥገና">ፍሪጅ ጥገና</option>
        <option value="አልሙኒየም ስራ">አልሙኒየም ስራ</option>
        <option value="ልብስ ማጠቢያ ማሽን ጥገና">ልብስ ማጠቢያ ማሽን ጥገና</option>
        <option value="ምጣድ_ጥገና">ምጣድ ጥገና</option>
        <option value="አስጠኚ">አስጠኚ</option>
      </select>
      <div v-if="errors.selectedService" class="text-red-500">{{ errorMessage.selectedService }}</div>
    </div>

    <div class="mb-5">
      <label for="location" class="block text-sm font-medium text-gray-600 mb-1">Location /የስራ አካባቢ:</label>
      <input v-model="location" type="text" class="w-[50%] border-2 rounded-md border-black  focus:border-b-[#C21F80] p-2 text-black" placeholder="Enter location" />
      <div v-if="errors.location" class="text-red-500 ">{{ errorMessage.location }}</div>
    </div>

    <div class="mb-10">
      <label for="phone" class="block text-sm font-medium text-gray-600 mb-1">Enter Phone/የዲስፓቸር ሰልክ ቁጥር:</label>
      <input v-model="phone" @input="onPhoneInput" type="text" class="w-[50%] border-2 rounded-md border-black focus:border focus:border-[#C21F80] p-2 text-black " placeholder="Enter phone number" />
      <div v-if="errors.phone" class="text-red-500 w-3/4">{{ errorMessage.phone }}</div>
    </div>


    <button @click="generateMessage" class="block bg-blue-500 text-white px-4 py-2 rounded-md">Generate Message</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedService: '',
      location: '',
      phone: '',
      errors: {
        selectedService: false,
        location: false,
        phone: false,
      },
      errorMessage: {
        selectedService: "Please select a service.",
        location: "Please enter a location.",
        phone: "Please enter a valid phone number starting with '09..' and having a total of 10 digits.",
      },
    };
  },
  methods: {
    generateMessage() {
      this.validateForm();
      if (!this.hasErrors()) {
        const messageTemplate = this.generateMessageTemplate();
        const message = messageTemplate
          .replace('{service}', this.selectedService)
          .replace('{location}', this.location)
          .replace('{phone}', this.phone);

        this.$emit("message-generated", message);
      } else {
        // alert("Please fill in all fields correctly before generating a message.");
      }
    },
    validateForm() {
      this.errors.selectedService = this.selectedService === "";
      this.errors.location = this.location.trim() === "";
      this.errors.phone = !this.isValidPhone();
    },
    hasErrors() {
      return Object.values(this.errors).some(error => error);
    },

    // template for specific services
    generateMessageTemplate() {
      // Define message templates for different services
      const templates = {
        ማናጀር: `📣አስቸኳይ📣 ማናጀር ${this.location} አካባቢ ይፈለጋል-በ${this.phone} ይደውሉ`,
        አስጠኚ: `📣አስቸኳይ📣 አስጠኚ ${this.location} አካባቢ ይፈለጋል-በ${this.phone} ይደውሉ`,
        ግንበኛ: `📣አስቸኳይ📣 ግንበኛ ${this.location} አካባቢ ይፈለጋል-በ${this.phone} ይደውሉ`,
        አናፂ: `📣አስቸኳይ📣 አናፂ ${this.location} አካባቢ ይፈለጋል-በ${this.phone} ይደውሉ`,
        ሹፌር: `📣አስቸኳይ📣 ሹፌር ${this.location} አካባቢ ይፈለጋል-በ${this.phone} ይደውሉ`,
        ኤሌክትሪሽያን: `📣አስቸኳይ📣 ኤሌክትሪሽያን ${this.location} አካባቢ ይፈለጋል-በ${this.phone} ይደውሉ`,
        ሂሳብ_ባለሙያ: `📣አስቸኳይ📣 ሂሳብ ባለሙያ ${this.location} አካባቢ ይፈለጋል-በ${this.phone} ይደውሉ`,
        ሞግዚት: `📣አስቸኳይ📣 ሞግዚት ${this.location} አካባቢ ይፈለጋል-በ${this.phone} ይደውሉ`,
        ዲሽ_ቴክኒሽያን: `📣አስቸኳይ📣 ዲሽ ቴክኒሽያን ${this.location} አካባቢ ይፈለጋል-በ${this.phone} ይደውሉ`,
      };

      return templates[this.selectedService] ||`📣አስቸኳይ📣 የ${this.selectedService} ባለሙያ ${this.location} አካባቢ ይፈለጋል-በ${this.phone} ይደውሉ`;
    },
    isValidPhone() {
      // Check if the phone number has a total count of 10 digits and starts with '0'
      const phoneRegex = /^0[0-9]{9}$/;
      return phoneRegex.test(this.phone.trim());
    },
    onPhoneInput() {
      // Remove non-numeric characters from the phone number input
      this.phone = this.phone.replace(/\D/g, '');
    },
  },
};
</script>

