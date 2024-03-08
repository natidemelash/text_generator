<template>
  <div class="card p-6 mx-auto max-w-2xl bg-[#ECF0F1] mt-8 shadow-md rounded-md">
    <h3 class="text-xl font-semibold mb-4 text-[#C21F80]">Dispatch Message</h3>

    <div class="mb-5">
      <label for="service" class="block text-sm font-medium text-gray-600 mb-1">Select Service/የስራ ዘርፍ:</label>
      <select v-model="selectedService"  class="w-[50%] border-2 bg-[#ECF0F1] rounded-md border-black  focus:border-b-[#C21F80] p-2 text-black">
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
        <option value="ቲቪ ጥገና">ቲቪ ጥገና</option>
        <option value="ፍሪጅ ጥገና">ፍሪጅ ጥገና</option>
        <option value="አልሙኒየም">አልሙኒየም</option>
        <option value="ልብስ ማጠቢያ ጥገና">ልብስ ማጠቢያ ጥገና</option>
        <option value="ምጣድ ጥገና">ምጣድ ጥገና</option>
        <option value="ኦቭን ጥገና">ኦቭን ጥገና</option>
        <option value="ስቶቭ ጥገና">ስቶቭ ጥገና</option>
        <option value="ፕሪንተር ጥገና">ፕሪንተር ጥገና</option>
        <option value="አስጠኚ">አስጠኚ</option>
        <option value="ጸሃፊ">ጸሃፊ</option>
        <option value="ካሜራ">ካሜራ</option>
        <option value="ዲኮር ስራ">ዲኮር ስራ</option>
        <option value="መስተንግዶ">መስተንግዶ</option>
        <option value="ልብስ ስፌት">ልብስ ስፌት</option>
        <option value="ፀጉር ስራ">ፀጉር ስራ</option>
        <option value="ነርስ">ነርስ</option>
        <option value="ብየዳ ስራ">ብየዳ ስራ</option>
        <option value="አውቶ_መካኒክ">አውቶ መካኒክ</option>
        <option value="ሴራሚክ">ሴራሚክ</option>
        <option value="ትርጉም ስራ">ትርጉም ስራ</option>
        <option value="ጥበቃ">ጥበቃ</option>
      </select>
      <div v-if="errors.selectedService" class="text-red-500">{{ errorMessage.selectedService }}</div>
    </div>

    <div class="mb-5">
      <label for="crmNumber" class="block text-sm font-medium text-gray-600 mb-1">CRM Ticket Number/CRM ቲኬት ቁጥር:</label>
      <input v-model="crmTrackingNumber" type="number" class="w-[50%] border-2 bg-[#ECF0F1] rounded-md border-black  focus:border-b-[#C21F80] p-2 text-black" placeholder="Enter CRM ticket number" />
      <div v-if="errors.crmTrackingNumber" class="text-red-500 ">{{ errorMessage.crmTrackingNumber }}</div>
    </div>

    <div class="mb-5">
      <label for="location" class="block text-sm font-medium text-gray-600 mb-1">Location /የስራ አካባቢ:</label>
      <input v-model="location" type="text" class="w-[50%] border-2 rounded-md border-black bg-[#ECF0F1]  focus:border-b-[#C21F80] p-2 text-black" placeholder="Enter location" />
      <div v-if="errors.location" class="text-red-500 ">{{ errorMessage.location }}</div>
    </div>

    <div class="mb-10">
      <label for="phone" class="block text-sm font-medium text-gray-600 mb-1">Enter Phone/የዲስፓቸር ሰልክ ቁጥር:</label>
      <input v-model="phone" @input="onPhoneInput" type="text" class="w-[50%] border-2 rounded-md bg-[#ECF0F1] border-black focus:border focus:border-[#C21F80] p-2 text-black " placeholder="Enter phone number" />
      <div v-if="errors.phone" class="text-red-500 w-3/4">{{ errorMessage.phone }}</div>
    </div>


    <button @click="generateMessage" class="block bg-[#640D4D] text-white px-4 py-2 rounded-md">Generate Message</button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      selectedService: '',
      location: '',
      crmTrackingNumber:'',
      phone: '',
      errors: {
        selectedService: false,
        crmTrackingNumber: false,
        location: false,
        phone: false,
      },
      errorMessage: {
        selectedService: "Please select a service.",
        crmTrackingNumber:"Please enter a CRM tracking number",
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
          .replace('{crmTrackingNumber}', this.crmTrackingNumber)
          .replace('{location}', this.location)
          .replace('{phone}', this.phone);

          // Clear input values after successful message generation
          this.selectedService = "";
          this.location = "";
          this.phone = "";
          this.crmTrackingNumber = "";

          // validation for message(characters should be <= 69)
        if(this.isValidMessageLength(message)){
          this.$emit("message-generated", message);
        }else{
          alert("Generated message exceeds the character limit. Please adjust your inputs.");
        }

      }
    },
    validateForm() {
      this.errors.selectedService = this.selectedService === "";
      this.errors.location = this.location.trim() === "";
      this.errors.crmTrackingNumber = this.crmTrackingNumber=== "";
      this.errors.phone = !this.isValidPhone();
    },
    hasErrors() {
      return Object.values(this.errors).some(error => error);
    },

    // template for specific services
    generateMessageTemplate() {
      // Define message templates for different services
      const templates = {
        ማናጀር: `📣አስቸኳይ📣 ማናጀር ${this.location} ይፈለጋል-በ${this.phone} ይደውሉ መለያ-${this.crmTrackingNumber}`,
        አስጠኚ: `📣አስቸኳይ📣 አስጠኚ ${this.location} ይፈለጋል-በ${this.phone} ይደውሉ መለያ-${this.crmTrackingNumber}`,
        ግንበኛ: `📣አስቸኳይ📣 ግንበኛ ${this.location} ይፈለጋል-በ${this.phone} ይደውሉ መለያ-${this.crmTrackingNumber}`,
        አናፂ: `📣አስቸኳይ📣 አናፂ ${this.location} ይፈለጋል-በ${this.phone} ይደውሉ መለያ-${this.crmTrackingNumber}`,
        ጸሃፊ: `📣አስቸኳይ📣 ጸሃፊ ${this.location} ይፈለጋል-በ${this.phone} ይደውሉ መለያ-${this.crmTrackingNumber}`,
        ሹፌር: `📣አስቸኳይ📣 ሹፌር ${this.location} ይፈለጋል-በ${this.phone} ይደውሉ መለያ-${this.crmTrackingNumber}`,
        ኤሌክትሪሽያን: `📣አስቸኳይ📣 ኤሌክትሪሽያን ${this.location} ይፈለጋል-በ${this.phone} ይደውሉ መለያ-${this.crmTrackingNumber}`,
        ሂሳብ_ባለሙያ: `📣አስቸኳይ📣 ሂሳብ ባለሙያ ${this.location} ይፈለጋል-በ${this.phone} ይደውሉ መለያ-${this.crmTrackingNumber}`,
        ሞግዚት: `📣አስቸኳይ📣 ሞግዚት ${this.location} ይፈለጋል-በ${this.phone} ይደውሉ መለያ-${this.crmTrackingNumber}`,
        ዲሽ_ቴክኒሽያን: `📣አስቸኳይ📣 ዲሽ ቴክኒሽያን ${this.location} ይፈለጋል-በ${this.phone} ይደውሉ መለያ-${this.crmTrackingNumber}`,
        ነርስ: `📣አስቸኳይ📣 ነርስ ${this.location} ይፈለጋል-በ${this.phone} ይደውሉ መለያ-${this.crmTrackingNumber}`,
        ጥበቃ: `📣አስቸኳይ📣 ጥበቃ ${this.location} ይፈለጋል-በ${this.phone} ይደውሉ መለያ-${this.crmTrackingNumber}`,
        አውቶ_መካኒክ: `📣አስቸኳይ📣 አውቶ መካኒክ ${this.location} ይፈለጋል-በ${this.phone} ይደውሉ መለያ-${this.crmTrackingNumber}`,
      };

      return templates[this.selectedService] ||`📣አስቸኳይ📣 የ${this.selectedService} ባለሙያ ${this.location} ይፈለጋል-በ${this.phone} ይደውሉ መለያ-${this.crmTrackingNumber}`;
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
    isValidMessageLength(message){
      return message.length <= 69;
    }
  },
};
</script>

