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
  <CCO v-if="selectedProjectType ==='CCO'" @button-click="handleButtonClick" :show-phone-number-input="showPhoneNumberInput" @generate-message="handleGenerateMessage"/>

  <!-- MACT Messages -->
  <MACT v-if="selectedProjectType === 'MACT'" @button-click="handleButtonClick"/>

  <BLSR v-if="selectedProjectType === 'BLSR'" />

  <NUEP v-if="selectedProjectType === 'NUE'" @button-click="handleButtonClick" />
  
</template>

<script>
import BLSR from '../components/BLSR.vue'
import MACT from '../components/MACT.vue'
import CCO from '../components/CCO.vue'
import NUEP from '../components/NUEP.vue'

  export default {
    components:{
      CCO,
      BLSR,
      MACT,
      NUEP,
    },
    data(){
      return{
        showPhoneNumberInput: false,
        selectedAction: null,
        phoneNumber: '',
        phoneNumberError: '',
        projectTypes: ['CCO', 'MACT', 'BLSR', 'NUE', 'ACE'],
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

      handleGenerateMessage(messageData) {
        // Extract action and phone number from the emitted event data
        const { action, phoneNumber } = messageData;
        
        // Set the selected action and phone number
        this.selectedAction = action;
        this.phoneNumber = phoneNumber;

        // Generate the message
        this.generateMessage();
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
            message = `ሰላም! መተግበሪያችንን ስለተጠቀሙ እያመሰገንን፤ ስለደረሱበት ሁኔታ ለመከታተል ብሎም እገዛ ለማድረግ ስንደውል ማግኘት አልቻልንም። ለተሻለ አገልግሎት በ0949231010 ይደውሉልን።`;
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

