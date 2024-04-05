<template>
  <div class="flex flex-col md:flex-row gap-4 mx-4 justify-center my-4 max-w-[1000px]">
    <div
      v-for="(type, index) in projectTypes"
      :key="index"
      :class="['card p-4 md:w-[20%] bg-[#4f4d4d] text-[#F1C40F] font-semibold rounded-md cursor-pointer mr-4' , {'border-2 border-[#F1C40F]': selectedProjectType === type }]"
      @click="handleProjectType(type)"
    >
      {{ type }}
    </div>

  </div>

  <!-- CCO Messages -->
  <div  v-if="selectedProjectType === 'CCO'" class="card p-6 mx-3 md:mx-auto max-w-4xl bg-[#4f4d4d] mt-8 shadow-md rounded-md">
    <h3 class="text-lg mb-4 text-[#fff]">CCO Engagement Messages</h3>

    <div class="grid grid-cols-1 md:grid-cols-3 items-center text-black gap-8">
      <button class="bg-[#e21e81] text-xs text-white px-6 py-3 rounded"  @click="handleButtonClick('emp-paid-noanswer')">Paid connection - No reply from EMP /ቀጣሪው ከክፍያ በኋላ ስልክ አያነሳም</button>
      <button class="bg-[#e21e81] text-xs text-white px-6 py-3 rounded" @click="handleButtonClick('still-searching')">Still Searching for SP / በ15 ደቂቃ ባለሙያ ማግኘት ካልተቻለ </button>
      <button class="bg-[#e21e81] text-xs text-white px-6 py-3 rounded" @click="handleButtonClick('sp-dispatched-noanswer')">Dispatched SP - Employer No answer / ባለሙያ ልከንለት ቀጣሪው ስልክ ሳያነሳ ሲቅር</button>
      <button class="bg-[#e21e81] text-xs text-white px-6 py-3 rounded" @click="handleButtonClick('closing-without-SP')">No SP available / ባለሙያ ስናጣ ለቀጣሪው የሚላክ</button>

      <button class="bg-[#588fe8] text-xs text-white px-6 py-3 rounded"  @click="handleButtonClick('sp-noanswer')">SP did not answer /ለባለሙያው የቀጣሪ ስልክ መድረሱን ለማረጋጥ ካልተቻለ </button>
      <button class="bg-[#588fe8] text-xs text-white px-6 py-3 rounded"  @click="handleButtonClick('dispatched-sp-noanswer')">SP dispatched /ባለሙያው ለስራ ከተላኩ በኋላ ስልክ አያነሳም </button>
    </div>

    <!-- Input field for phone number -->
    <div v-if="showPhoneNumberInput" class="mt-4">
      <label for="phoneNumber" class="text-sm font-semibold text-[#fff]">Phone Number/የዲስፓቸር ስልክ:</label>
      <input type="text" id="phoneNumber" v-model="phoneNumber" @input="validatePhoneNumber" placeholder="Dispatcher phone"  class="mt-2 px-4 py-2 text-black block w-[70%] bg-[#ECF0F1] shadow-sm sm:text-sm border-2 rounded-md focus:outline-none">
      <p v-if="phoneNumberError" class="text-red-500 text-sm mt-2">{{ phoneNumberError }}</p>
      <button @click="generateMessage" class="mt-2 bg-[#333] cursor-pointer text-xs text-white px-4 py-2 rounded">
          <img src="../assets//send.png" alt="" width="25">
      </button>
    </div>
  </div>

  <!-- MACT Messages -->
  <div v-if="selectedProjectType === 'MACT'" class="card p-6 mx-3 md:mx-auto max-w-4xl bg-[#4f4d4d] mt-8 shadow-md rounded-md">
    <h3 class="text-lg mb-4 text-[#fff]">MACT Engagement Messages</h3>
    <div class="grid grid-cols-1 md:grid-cols-3 items-center text-black gap-8">
      <button class="bg-[#e21e81] text-xs text-white px-6 py-3 rounded"  @click="handleButtonClick('mact-emp-1st')">First call to employer - No answer/ቀጣሪው ስልክ አያነሳም (1ኛ ሙከራ)</button>
      <button class="bg-[#e21e81] text-xs text-white px-6 py-3 rounded"  @click="handleButtonClick('mact-emp-close')">Repeated calls to employer - No answer/ቀጣሪው ስልክ አያነሳም (መዝጊያ)</button>
    </div>

     <!-- Input field for phone number -->
     <div v-if="showPhoneNumberInput" class="mt-4">
      <label for="phoneNumber" class="text-sm font-semibold text-[#fff]">Phone Number/የዲስፓቸር ስልክ:</label>
      <input type="text" id="phoneNumber" v-model="phoneNumber" @input="validatePhoneNumber" placeholder="Dispatcher phone"  class="mt-2 px-4 py-2 text-black block w-[70%] bg-[#ECF0F1] shadow-sm sm:text-sm border-2 rounded-md focus:outline-none">
      <p v-if="phoneNumberError" class="text-red-500 text-sm mt-2">{{ phoneNumberError }}</p>
      <button @click="generateMessage" class="mt-2 bg-[#333] cursor-pointer text-xs text-white px-4 py-2 rounded">
          <img src="../assets//send.png" alt="" width="25">
      </button>
    </div>
  </div>

  <!-- BLSR Messages -->
  <div v-if="selectedProjectType === 'BLSR'" class="card p-6 mx-3 md:mx-auto max-w-4xl bg-[#4f4d4d] mt-8 shadow-md rounded-md">
    <h3 class="text-lg mb-4 text-[#fff]">BLSR Engagement Messages</h3>
  </div>

  <!-- NUE Message -->
  <div v-if="selectedProjectType === 'NUE'" class="card p-6 mx-3 md:mx-auto max-w-3xl bg-[#4f4d4d] mt-8 shadow-md rounded-md">
    <h3 class="text-lg mb-4 text-[#fff]">New User Engagement Message</h3>
    <div class="grid grid-cols-1 md:grid-cols-3 items-center text-black gap-8">
      <button class="bg-[#e21e81] text-xs text-white px-6 py-3 rounded"  @click="handleButtonClick('nue-1')">Only App downloaded</button>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        showPhoneNumberInput: false,
        selectedAction: null,
        phoneNumber: '',
        phoneNumberError: '',
        projectTypes: ['CCO', 'MACT', 'BLSR', 'NUE'],
        selectedProjectType: null,
      }
    },

    methods: {
      handleButtonClick(action) {
        // Reset phone number and error message
        this.phoneNumber = '';
        this.phoneNumberError = '';

        this.selectedAction = action;

        // Check if the selected action requires a phone number
        if (action === 'emp-paid-noanswer' || action === 'still-searching' || action === 'sp-dispatched-noanswer' || action === 'dispatched-sp-noanswer' || action === 'sp-noanswer') {
          this.showPhoneNumberInput = true;
        } else {
          // For other actions, directly generate the message without requiring a phone number
          this.generateMessage();
        }
      },

      handleProjectType(projectType){
        this.selectedProjectType = projectType;
      },

      generateMessage() {
        let message = '';

        if (this.selectedAction === 'emp-paid-noanswer' || this.selectedAction === 'still-searching' || this.selectedAction === 'sp-dispatched-noanswer' || this.selectedAction === 'dispatched-sp-noanswer' || this.selectedAction === 'sp-noanswer') {
            // Validate phone number
            if (!this.phoneNumber) {
              this.phoneNumberError = 'Phone number cannot be empty.';
              return;
            }
            if (!/^(09)\d{8}$/.test(this.phoneNumber)) {
              this.phoneNumberError = 'Invalid phone number format. It should start with 09 and be 10 digits long.';
              return;
            }
        }
        this.phoneNumberError = '';
        this.showPhoneNumberInput = false;

        switch (this.selectedAction) {
          case 'emp-paid-noanswer':
            message = `ሰላም! የባለሙያ ጥያቄዎን በተመለከተ ደውለን ነበር። እባክዎን በ${this.phoneNumber} መልሰው በመደወል የተሻለ አገልግሎት እንድንሰጥዎ ያግዙን።`;
            break;
          case 'still-searching':
            message = `ሰላም! የእርስዎን መስፈርት በሚገባ የሚያሟላ ባለሙያ ፍለጋ ላይ ነን። እባክዎን በትዕግስት ይጠብቁ። ለበለጠ መረጃ በ${this.phoneNumber} ይደውሉ። መልካም ቀን!`;
            break;
          case 'sp-dispatched-noanswer':
            message = `ሰላም! የባለሙያ ስልክ ልከን ለማረጋገጥ ደውለን ነበር። በ24 ሰዓት ውስጥ የደረሱበትን በ${this.phoneNumber} ደውለው ካላሳወቁን ሌላ ባለሙያ መላክ እንደማንችል ለመግለጽ እንወዳለን።`;
            break;
          case 'sp-noanswer':
            message = `የቀጣሪ ስልክ ልከንልዎ ስልክዎን እያነሱልን አይደለም። በ3 ደቂቃ ውስጥ ካልደወሉልን ስራውን ለሌላ ባለሙያ ለማስተላለፍ እንገደዳለን። ለበለጠ መረጃ በ${this.phoneNumber} ይደውሉ። መልካም ቀን!`;
            break;
          case 'dispatched-sp-noanswer':
            message = `ሰላም! ለስራ ልከንዎት ስንደውል ልናገኝዎ አልቻልንም። ስራውን ለሌሎች ባለሙያዎች ከመላካችን በፊት በ${this.phoneNumber} ይደውሉ።`;
            break;
          case 'closing-without-SP':
            message = `ብቁ ባለሙያዎች መተግበሪያችንን እንዲቀላቀሉ ተግተን ስለምንሰራ ለሚቀጥለው ጥያቄዎ ፈጣን ምላሽ እንደምንሰጥ በመተማመን የከፈሉትን ክፍያ በሌላ ጊዜ እንደሚገለገሉበት ለማሳወቅ እንወዳለን።`;
            break;
          case 'mact-emp-1st':
            message = `ሰላም! መተግበሪያችንን ስለተጠቀሙ እያመሰገንን፤ ስለደረሱበት ሁኔታ ለመከታተል ብሎም እገዛ ለማድረግ ስንደውል ማግኘት አልቻልንም። ለተሻለ አገልግሎት በ${this.phoneNumber} ይደውሉልን።`;
            break;
          case 'mact-emp-close':
            message = `ሰላም! የአገልግሎት ጥራታችንን ለማሻሻል በተደጋጋሚ በደወልን ሰዓት ማግኘት ስላልቻልን አገልግሎቱን እንዳልፈለጉ በመገንዘብ ካርዱን ዘግተነዋል። ለቀጣይ የባለሙያ ጥያቄ በ9675 አልያም +251949231010 ይደውሉልን። መልካም ቀን!`;
            break;
          case 'nue-1':
            message = `የ GoodayOn መተግበሪያን በማውረድዎ እናመሰግናለን። አጠቃቀሙ ላይ እገዛ ካስፈለግዎ በ +251949231010 ይደውሉ። መልካም ቀን!`
            break;
          default:
            break;
        }
        this.$emit('engagement-message', message);
        this.phoneNumber = '';
      },
  }    
}
</script>

