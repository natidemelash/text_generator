<template>
  <div class="card p-6 mx-4 md:mx-auto max-w-4xl bg-[#4f4d4d] mt-8 shadow-md rounded-md">
    <h3 class="text-xl font-semibold mb-4 text-[#fff]">Dispatch Message</h3>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8">
      <div class="mb-5">
      <label for="service" class="block text-sm font-medium text-[#fff] mb-1">Select Service/የስራ ዘርፍ:</label>
      <select v-model="selectedService"  class="border-2 bg-[#ECF0F1] rounded-md p-2 text-black focus:outline-none">
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
        <option value="ስቶር ኪፐር">ስቶር ኪፐር</option>
      </select>
      <div v-if="errors.selectedService" class="text-red-500">{{ errorMessage.selectedService }}</div>
    </div>

    <div class="mb-5">
      <label for="crmNumber" class="block text-sm font-medium text-[#fff] mb-1">CRM Ticket Number/CRM ቲኬት ቁጥር:</label>
      <input v-model="crmTrackingNumber" type="number" class="border-2 bg-[#ECF0F1] rounded-md p-2 text-black focus:outline-none" placeholder="Enter CRM ticket number" />
      <div v-if="errors.crmTrackingNumber" class="text-red-500 ">{{ errorMessage.crmTrackingNumber }}</div>
    </div>

    <div class="mb-5">
      <label for="location" class="block text-sm font-medium text-[#fff] mb-1">Location /የስራ አካባቢ:</label>
      <input v-model="location" type="text" class="border-2 rounded-md bg-[#ECF0F1] p-2 text-black focus:outline-none" placeholder="Enter location" />
      <div v-if="errors.location" class="text-red-500 ">{{ errorMessage.location }}</div>
    </div>

    <!-- Job Type -->
    <div class="mb-5">
      <label for="jobType" class="block text-sm font-medium text-[#fff] mb-1">Job Type</label>
      <select v-model="jobType" @click="onJobTypeSelection"  class="border-2 bg-[#ECF0F1] rounded-md p-2 text-black focus:outline-none">
        <option value="taskBased">Task-based</option>
        <option value="monthly">Monthly</option>
      </select>
    </div>

    <!-- Working Days -->
    <div  class="mb-5" v-if="showDetailInput">
      <label for="workingDays"  class="block text-sm font-medium text-[#fff] mb-1">Working Days:</label>
      <input v-model="workingDays" type="number" class="border-2 rounded-md bg-[#ECF0F1] p-2 text-black focus:outline-none" placeholder="Enter working days"  />
      <div v-if="errors.workingDays" class="text-red-500 w-3/4">{{ errorMessage.workingDays }}</div>
    </div>

    <!-- Working Hour -->
    <div  class="mb-5" v-if="showDetailInput">
      <label for="workingHour"  class="block text-sm font-medium text-[#fff] mb-1">Working Hours:</label>
      <input v-model="workingHour" type="text" class="border-2 rounded-md bg-[#ECF0F1] p-2 text-black focus:outline-none" placeholder="Enter working hours" />
      <div v-if="errors.workingHour" class="text-red-500 w-3/4">{{ errorMessage.phone }}</div>
    </div>

    <div class="mb-10">
      <label for="phone" class="block text-sm font-medium text-[#fff] mb-1">Enter Phone/የዲስፓቸር ሰልክ ቁጥር:</label>
      <input v-model="phone" @input="onPhoneInput" type="text" class="border-2 rounded-md bg-[#ECF0F1] focus:border p-2 text-black focus:outline-none" placeholder="Enter phone number" />
      <div v-if="errors.phone" class="text-red-500 w-3/4">{{ errorMessage.workingHour }}</div>
    </div>
    </div>

    <button @click="generateMessage" class="block bg-[#e21e81] text-white px-4 py-2 rounded-md">Generate Message</button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      selectedService: '',
      location: '',
      crmTrackingNumber:'',
      showDetailInput: false,
      workingDays:'',
      workingHour: '',
      jobType: 'taskBased',
      phone: '',
      errors: {
        selectedService: false,
        crmTrackingNumber: false,
        workingDays: false,
        workingHour: false,
        location: false,
        phone: false,
      },
      errorMessage: {
        selectedService: "Please select a service.",
        crmTrackingNumber:"Please enter a CRM tracking number",
        workingDays: "Please enter number of working days",
        workingHour: "Please enter working hour",
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
          this.workingDays = "";
          this.workingHour = "";

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
      if(this.jobType === 'monthly'){
         this.errors.workingDays = this.workingDays === "";
         this.errors.workingHour = this.workingHour === "";
      }
      this.errors.phone = !this.isValidPhone();
    },
    hasErrors() {
      return Object.values(this.errors).some(error => error);
    },

    onJobTypeSelection(){
      if(this.jobType === 'monthly'){
        return this.showDetailInput = true;
      }else{
        return this.showDetailInput = false;
      } 
    },

    // template for specific services
    generateMessageTemplate() {
      // Define message templates for different services

      if(this.jobType === 'monthly'){
        const templates = {
            ማናጀር: `📣አስቸኳይ📣 ማናጀር በሳምንት ${this.workingDays} ቀን ፣ ከ${this.workingHour} መስራት የሚችል ${this.location} አካባቢ ይፈለጋል-በ${this.phone} ይደውሉ መለያ-${this.crmTrackingNumber}`,
            አስጠኚ: `📣አስቸኳይ📣 አስጠኚ በሳምንት ${this.workingDays} ቀን ፣ ከ${this.workingHour} መስራት የሚችል ${this.location} አካባቢ ይፈለጋል-በ${this.phone} ይደውሉ መለያ-${this.crmTrackingNumber}`,
            ግንበኛ: `📣አስቸኳይ📣 ግንበኛ በሳምንት ${this.workingDays} ቀን ፣ ከ${this.workingHour} መስራት የሚችል ${this.location} አካባቢ ይፈለጋል-በ${this.phone} ይደውሉ መለያ-${this.crmTrackingNumber}`,
            አናፂ: `📣አስቸኳይ📣 አናፂ በሳምንት ${this.workingDays} ቀን ፣ ከ${this.workingHour} መስራት የሚችል ${this.location} አካባቢ ይፈለጋል-በ${this.phone} ይደውሉ መለያ-${this.crmTrackingNumber}`,
            ጸሃፊ: `📣አስቸኳይ📣 ጸሃፊ በሳምንት ${this.workingDays} ቀን ፣ ከ${this.workingHour} መስራት የሚችል ${this.location} አካባቢ ይፈለጋል-በ${this.phone} ይደውሉ መለያ-${this.crmTrackingNumber}`,
            ሹፌር: `📣አስቸኳይ📣 ሹፌር በሳምንት ${this.workingDays} ቀን ፣ ከ${this.workingHour} መስራት የሚችል ${this.location} አካባቢ ይፈለጋል-በ${this.phone} ይደውሉ መለያ-${this.crmTrackingNumber}`,
            ኤሌክትሪሽያን: `📣አስቸኳይ📣 ኤሌክትሪሽያን በሳምንት ${this.workingDays} ቀን ፣ ከ${this.workingHour} መስራት የሚችል ${this.location} አካባቢ ይፈለጋል-በ${this.phone} ይደውሉ መለያ-${this.crmTrackingNumber}`,
            ሂሳብ_ባለሙያ: `📣አስቸኳይ📣 ሂሳብ ባለሙያ በሳምንት ${this.workingDays} ቀን ፣ ከ${this.workingHour} መስራት የሚችል ${this.location} አካባቢ ይፈለጋል-በ${this.phone} ይደውሉ መለያ-${this.crmTrackingNumber}`,
            ሞግዚት: `📣አስቸኳይ📣 ሞግዚት በሳምንት ${this.workingDays} ቀን ፣ ከ${this.workingHour} መስራት የሚችል ${this.location} አካባቢ ይፈለጋል-በ${this.phone} ይደውሉ መለያ-${this.crmTrackingNumber}`,
            ዲሽ_ቴክኒሽያን: `📣አስቸኳይ📣 ዲሽ ቴክኒሽያን በሳምንት ${this.workingDays} ቀን ፣ ከ${this.workingHour} መስራት የሚችል ${this.location} ይፈለጋል-በ${this.phone} ይደውሉ መለያ-${this.crmTrackingNumber}`,
            ነርስ: `📣አስቸኳይ📣 ነርስ በሳምንት ${this.workingDays} ቀን ፣ ከ${this.workingHour} መስራት የሚችል ${this.location} አካባቢ ይፈለጋል-በ${this.phone} ይደውሉ መለያ-${this.crmTrackingNumber}`,
            ጥበቃ: `📣አስቸኳይ📣 ጥበቃ በሳምንት ${this.workingDays} ቀን ፣ ከ${this.workingHour} መስራት የሚችል ${this.location} አካባቢ ይፈለጋል-በ${this.phone} ይደውሉ መለያ-${this.crmTrackingNumber}`,
            አውቶ_መካኒክ: `📣አስቸኳይ📣 አውቶመካኒክ በሳምንት ${this.workingDays} ቀን ፣ ከ${this.workingHour} መስራት የሚችል ${this.location} አካባቢ ይፈለጋል-በ${this.phone} ይደውሉ መለያ-${this.crmTrackingNumber}`,
        };

        return templates[this.selectedService] ||`📣አስቸኳይ📣 የ${this.selectedService} ባለሙያ  በሳምንት ${this.workingDays} ቀን ፣ ከ${this.workingHour} መስራት የሚችል ${this.location} አካባቢ ይፈለጋል-በ${this.phone} ይደውሉ መለያ-${this.crmTrackingNumber}`;
      }else{
        const templates = {
          ማናጀር: `📣አስቸኳይ📣 ማናጀር ${this.location} አካባቢ ይፈለጋል-በ${this.phone} ይደውሉ መለያ-${this.crmTrackingNumber}`,
          አስጠኚ: `📣አስቸኳይ📣 አስጠኚ ${this.location} አካባቢ ይፈለጋል-በ${this.phone} ይደውሉ መለያ-${this.crmTrackingNumber}`,
          ግንበኛ: `📣አስቸኳይ📣 ግንበኛ ${this.location} አካባቢ ይፈለጋል-በ${this.phone} ይደውሉ መለያ-${this.crmTrackingNumber}`,
          አናፂ: `📣አስቸኳይ📣 አናፂ ${this.location} አካባቢ ይፈለጋል-በ${this.phone} ይደውሉ መለያ-${this.crmTrackingNumber}`,
          ጸሃፊ: `📣አስቸኳይ📣 ጸሃፊ ${this.location} አካባቢ ይፈለጋል-በ${this.phone} ይደውሉ መለያ-${this.crmTrackingNumber}`,
          ሹፌር: `📣አስቸኳይ📣 ሹፌር ${this.location} አካባቢ ይፈለጋል-በ${this.phone} ይደውሉ መለያ-${this.crmTrackingNumber}`,
          ኤሌክትሪሽያን: `📣አስቸኳይ📣 ኤሌክትሪሽያን ${this.location} አካባቢ ይፈለጋል-በ${this.phone} ይደውሉ መለያ-${this.crmTrackingNumber}`,
          ሂሳብ_ባለሙያ: `📣አስቸኳይ📣 ሂሳብ ባለሙያ ${this.location} አካባቢ ይፈለጋል-በ${this.phone} ይደውሉ መለያ-${this.crmTrackingNumber}`,
          ሞግዚት: `📣አስቸኳይ📣 ሞግዚት ${this.location} አካባቢ ይፈለጋል-በ${this.phone} ይደውሉ መለያ-${this.crmTrackingNumber}`,
          ዲሽ_ቴክኒሽያን: `📣አስቸኳይ📣 ዲሽ ቴክኒሽያን ${this.location} ይፈለጋል-በ${this.phone} ይደውሉ መለያ-${this.crmTrackingNumber}`,
          ነርስ: `📣አስቸኳይ📣 ነርስ ${this.location} አካባቢ ይፈለጋል-በ${this.phone} ይደውሉ መለያ-${this.crmTrackingNumber}`,
          ጥበቃ: `📣አስቸኳይ📣 ጥበቃ ${this.location} አካባቢ ይፈለጋል-በ${this.phone} ይደውሉ መለያ-${this.crmTrackingNumber}`,
          አውቶ_መካኒክ: `📣አስቸኳይ📣 አውቶመካኒክ ${this.location} አካባቢ ይፈለጋል-በ${this.phone} ይደውሉ መለያ-${this.crmTrackingNumber}`,
      };

        return templates[this.selectedService] ||`📣አስቸኳይ📣 የ${this.selectedService} ባለሙያ ${this.location} አካባቢ ይፈለጋል-በ${this.phone} ይደውሉ መለያ-${this.crmTrackingNumber}`;
      }
      
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
      return message.length <= 119;
    }
  },
};
</script>

