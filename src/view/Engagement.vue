<template>
  <h2 class="uppercase text-center text-lg md:text-2xl my-6">Select Project to Generate Message</h2>
  <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mx-4 md:mx-8 gap-4 items-center my-4 ">
    <div
      v-for="(type, index) in projectTypes"
      :key="index"
      :class="['card p-4 bg-[#4f4d4d] text-[#F1C40F] font-semibold rounded-md cursor-pointer mr-4' , {'border-2 border-[#F1C40F]': selectedProjectType === type }]"
      @click="handleProjectType(type)"
    >
      {{ type }}
    </div>

  </div>

  <!-- CCO Messages -->
  <CCO v-if="selectedProjectType ==='CCO'" @button-click="handleButtonClick" :show-phone-number-input="showPhoneNumberInput" @generate-message="handleGenerateMessage"/>

  <!-- MACT Messages -->
  <MACT v-if="selectedProjectType === 'MACT'" @button-click="handleButtonClick" :show-phone-number-input="showPhoneNumberInput"/>

  <BLSR v-if="selectedProjectType === 'BLSR'"  @button-click="handleButtonClick" :show-phone-number-input="showPhoneNumberInput" @generate-message="handleGenerateMessage"/>

  <NUEP v-if="selectedProjectType === 'NUE'" @button-click="handleButtonClick" />

  <ACE v-if="selectedProjectType === 'ACE'" @button-click = "handleButtonClick" :show-phone-number-input="showPhoneNumberInput" :show-service-of-interest-input="showServiceOfInterestInput" :show-employer-name-input="showEmployerNameInput"  @generate-message="handleGenerateMessage"/>
  
</template>

<script>
import BLSR from '../components/BLSR.vue'
import MACT from '../components/MACT.vue'
import CCO from '../components/CCO.vue'
import NUEP from '../components/NUEP.vue'
import ACE from '@/components/ACE.vue'

  export default {
    components:{
      CCO,
      BLSR,
      MACT,
      NUEP,
      ACE,
    },
    data(){
      return{
        showPhoneNumberInput: false,
        showServiceOfInterestInput: false,
        showEmployerNameInput: false,
        selectedAction: null,
        phoneNumber: '',
        phoneNumberError: '',
        projectTypes: ['CCO', 'MACT', 'BLSR', 'NUE', 'ACE'],
        selectedProjectType: null,
        selectedService:'',
        employerName: '', 
      }
    },

    methods: {
      handleButtonClick(action) {
        // Reset phone number and error message
        this.phoneNumber = '';
        this.phoneNumberError = '';

        this.selectedAction = action;

        // Check if the selected action requires a phone number
        if (action === 'emp-paid-noanswer' || action === 'still-searching' || action === 'sp-dispatched-noanswer' || action === 'dispatched-sp-noanswer' || action === 'sp-noanswer' || action === 'blsr-01') {
          this.showPhoneNumberInput = true;
        } else if(action === 'ace-01' || action === 'ace-02' ){  
          this.showServiceOfInterestInput = true;
          this.showEmployerNameInput = true;
          this.showPhoneNumberInput =true;
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
        const { action, phoneNumber, selectedService, employerName } = messageData;
        
        // Set the selected action and phone number
        this.selectedAction = action;
        this.phoneNumber = phoneNumber;
        this.selectedService = selectedService;
        this.employerName = employerName;

        // Generate the message
        this.generateMessage();
      },


      generateMessage() {
        let message = '';

        if (this.selectedAction === 'emp-paid-noanswer' || this.selectedAction === 'still-searching' || this.selectedAction === 'sp-dispatched-noanswer' || this.selectedAction === 'dispatched-sp-noanswer' || this.selectedAction === 'sp-noanswer' || this.selectedAction === 'blsr-01' || this.selectedAction === 'ace-01' || this.selectedAction === 'ace-02') {
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
            message = `ሰላም! በተደጋጋሚ በደወልን ሰዓት ማግኘት ስላልቻልን አገልግሎቱን እንዳልፈለጉ በመገንዘብ ካርዱን ዘግተነዋል። ለቀጣይ የባለሙያ ጥያቄ በ9675 አልያም በ+251949231010 ይደውሉልን።`;
            break;
          case 'blsr-01':
            message = `ሰላም! የአገልግሎት ጥራታችንን ለማሻሻል ለክትትል በደወልን ሰዓት ልናገኝዎ አልቻልንም። ስለደረሱበት ሁኔታ በ${this.phoneNumber} ደውለው ቢያሳውቁን ፈጣን አገልግሎት እንድንሰጥዎ ይረዳናል።`
            break;
          case 'ace-01':
            message=`ሰላም ${this.employerName}! የ${this.selectedService} ባለሙያ ማግኘት እንዳልቻሉ ስላየን እገዛ ለማድረግ ደውለን ነበር። በፍለጋው እንድንረዳዎ እባክዎ በ${this.phoneNumber} ይደውሉልን። መልካም ቀን!`
            break;   
          case 'ace-02':
            message = `ሰላም ${this.employerName}! የ${this.selectedService} ባለሙያ እንደፈለጉ ስላየን እገዛ ለማድረግ ደውለን ልናገኝዎ አልቻልንም። እገዛ ለማግኘት በ${this.phoneNumber} ይደውሉልን። መልካም ቀን!`
            break;
          case 'ace-03':
            message = `የGoodayOn መተግበሪያን በማውረድዎ እናመሰግናለን። አጠቃቀሙ ላይ እገዛ ካስፈለግዎ በ+251949231010 ይደውሉ። መልካም ቀን!`
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

