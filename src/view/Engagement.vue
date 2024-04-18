<template>
  <h2 class=" text-center text-lg md:text-xl my-6">Select Project to Generate Message</h2>
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
  <CCO v-if="selectedProjectType ==='CCO'" @button-click="handleButtonClick" :show-phone-number-input="showPhoneNumberInput" :show-customer-name-input="showCustomerNameInput" @generate-message="handleGenerateMessage"/>

  <!-- MACT Messages -->
  <MACT v-if="selectedProjectType === 'MACT'" @button-click = "handleButtonClick" :show-phone-number-input="showPhoneNumberInput" :show-customer-name-input="showCustomerNameInput"  @generate-message="handleGenerateMessage"/>

  <BLSR v-if="selectedProjectType === 'BLSR'"  @button-click="handleButtonClick" :show-phone-number-input="showPhoneNumberInput" :show-customer-name-input="showCustomerNameInput" @generate-message="handleGenerateMessage"/>

  <EGPT v-if="selectedProjectType === 'EGPT'" @button-click="handleButtonClick" :show-phone-number-input="showPhoneNumberInput" :show-customer-name-input="showCustomerNameInput" @generate-message="handleGenerateMessage"/>

  <MPUE v-if="selectedProjectType === 'MPUE'"  @button-click="handleButtonClick" :show-phone-number-input="showPhoneNumberInput" :show-customer-name-input="showCustomerNameInput" @generate-message="handleGenerateMessage"/>

  <ACE v-if="selectedProjectType === 'ACE'" @button-click = "handleButtonClick" :show-phone-number-input="showPhoneNumberInput" :show-service-of-interest-input="showServiceOfInterestInput" :show-customer-name-input="showCustomerNameInput"  @generate-message="handleGenerateMessage"/>

  <SPA v-if="selectedProjectType === 'SPA'" @button-click="handleButtonClick" :show-phone-number-input="showPhoneNumberInput" :show-customer-name-input="showCustomerNameInput" @generate-message="handleGenerateMessage"/>
  

 </template>

<script>
import BLSR from '@/components/BLSR.vue'
import MACT from '@/components/MACT.vue'
import CCO from '@/components/CCO.vue'
import EGPT from '@/components/EGPT.vue'
import ACE from '@/components/ACE.vue'
import MPUE from '@/components/MPUE.vue'
import SPA from '@/components/SPA.vue';

  export default {
    components:{
      CCO,
      BLSR,
      MACT,
      EGPT,
      ACE,
      MPUE,
      SPA,
    },
    data(){
      return{
        showPhoneNumberInput: false,
        showServiceOfInterestInput: false,
        showCustomerNameInput: false,
        selectedAction: null,
        phoneNumber: '',
        phoneNumberError: '',
        projectTypes: ['CCO', 'MACT', 'BLSR', 'EGPT', 'MPUE', 'ACE', 'SPA'],
        selectedProjectType: null,
        selectedService:'',
        customerName: '', 
      }
    },

    methods: {
      handleButtonClick(action) {
        // Reset phone number and error message
        this.phoneNumber = '';
        this.phoneNumberError = '';

        this.selectedAction = action;
        this.showPhoneNumberInput = true
        this.showCustomerNameInput = true;

        if(action === 'ace-01' || action === 'ace-02' ){
          this.showServiceOfInterestInput = true;
        }     
        else{
          this.generateMessage();
        }     
      },

      handleProjectType(projectType){
        this.selectedProjectType = projectType;
      },

      handleGenerateMessage(messageData) {
        // Extract action and phone number from the emitted event data
        const { action, phoneNumber, selectedService, customerName } = messageData;
        
        // Set the selected action and phone number
        this.selectedAction = action;
        this.phoneNumber = phoneNumber;
        this.selectedService = selectedService;
        this.customerName = customerName;

        // Generate the message
        this.generateMessage();
      },


      generateMessage() {
        let message = '';
        
        //Validate phone number
        if (!this.phoneNumber) {
          this.phoneNumberError = 'Phone number cannot be empty.';
          return;
        }

        if (!/^(09)\d{8}$/.test(this.phoneNumber)) {
          this.phoneNumberError = 'Invalid phone number format. It should start with 09 and be 10 digits long.';
          return;
        }

        this.phoneNumberError = '';
        this.showPhoneNumberInput = false;
        this.showCustomerNameInput = false;
        this.showServiceOfInterestInput =false;

        switch (this.selectedAction) {
          case 'emp-paid-noanswer':
            message = `ሰላም ${this.customerName}! የባለሙያ ጥያቄዎን በተመለከተ ደውለን ነበር። እባክዎን በ${this.phoneNumber} መልሰው በመደወል የተሻለ አገልግሎት እንድንሰጥዎ ያግዙን። መልካም ቀን!`;
            break;
          case 'still-searching':
            message = `ሰላም ${this.customerName}! የእርስዎን መስፈርት በሚገባ የሚያሟላ ባለሙያ ፍለጋ ላይ ነን። እባክዎን በትዕግስት ይጠብቁ። ለበለጠ መረጃ በ${this.phoneNumber} ይደውሉ። መልካም ቀን!`;
            break;
          case 'sp-dispatched-noanswer':
            message = `ሰላም ${this.customerName}! የባለሙያ ስልክ ልከን ለማረጋገጥ ነበር። በ24 ሰዓት ውስጥ የደረሱበትን በ${this.phoneNumber} ካላሳወቁን ሌላ ባለሙያ መላክ እንደማንችል ለመግለጽ እንወዳለን። መልካም ቀን!`;
            break;
          case 'feedback-from-employer':
            message = `ሰላም ${this.customerName}! አገልግሎታችንን ስለተጠቀሙ እያመሰገንን በላክንልዎ ባለሙያ ላይ ያልዎትን አስተያየት ለመውሰድ ደውለን ነበር። በ${this.phoneNumber} ቢደውሉልን ለአገልግሎት ጥራታችን ይረዳናል። መልካምቀን!`
            break;
          case 'feedback-from-SP':
            message = `ሰላም ${this.customerName}! በላክንዎት ስራ ላይ ያለዎትን አስተያየት ለመውሰድ ደውለን ነበር። በሌላ ጊዜ የስራ ጥሪዎች እንዲደርሱዎት ያለዎትን አስተያየት በ${this.phoneNumber} ስልክ ደውለው ያሳውቁን። መልካም ቀን!`
            break;
          case 'sp-noanswer':
            message = `ሰላም ${this.customerName}! የቀጣሪ ስልክ ልከንልዎ ስልክዎን እያነሱልን አይደለም። በ3 ደቂቃ ውስጥ ካልደወሉልን ስራውን ለሌላ ባለሙያ ለማስተላለፍ እንገደዳለን። ለበለጠ መረጃ በ${this.phoneNumber} ይደውሉ። መልካም ቀን!`;
            break;
          case 'dispatched-sp-noanswer':
            message = `ሰላም ${this.customerName}! ለስራ ልከንዎት ስንደውል ልናገኝዎ አልቻልንም። ስራውን ለሌሎች ባለሙያዎች ከመላካችን በፊት በ${this.phoneNumber} ይደውሉ።`;
            break;
          case 'emp-close':
            message = `ሰላም ${this.customerName}! በተደጋጋሚ ደውለን ልናገኝዎ አልቻልንም። ለባለሙያ ጥያቄዎ የተሰጠው የጊዜ ገደብ ስላለፈ ሃሳብዎን እንደቀየሩ ተቆጥሮ ትዕዛዝዎ ተዘግቷል። አገልግሎታችንን ሲፈልጉ በ${this.phoneNumber} ቢደውሉልን ልናገለግልዎ ዝግጁ ነን።`;
            break;
          case 'closing-without-SP':
            message = `ሰላም ${this.customerName}! ባለሙያ ማግኘት ስላልተቻለ የከፈሉትን ክፍያ ለቀጣይ ጥያቄዎ መጠቀም የሚችሉ መሆኑን በትህትና እንገልጻለን። ለተጨማሪ መረጃ በ${this.phoneNumber} ይደውሉልን። መልካም ቀን!`;
            break;
          case 'sp-noanswer-jobStarted':
            message = `ሰላም ${this.customerName}! ለስራ ልከንዎ ስለደረሱበት ሁኔታ ለመከታተል ደውለን ነበር። በ${this.phoneNumber} ደውለው የደረሱበትን እንዲያሳወቁን በትህትና እንጠይቃለን። መልካም ቀን!`
            break;
          case 'job-transfered':
            message = `ሰላም ${this.customerName}! ለስራ ልከንዎ ለክትትል በተደጋጋሚ ስንደውል ማግኘት ስላልቻልን ስራውን ለሌላ ባለሙያ ያስተላለፍነው መሆኑን ለማሳወቅ እንወዳለን። ለተጨማሪ መረጃ በ${this.phoneNumber} ይደውሉ። መልካም ቀን!`
            break;
          case 'mact-01':
            message = `ሰላም ${this.customerName}! መተግበሪያችንን ስለተጠቀሙ እያመሰገንን፤ ስለደረሱበት ለመከታተል ብሎም እገዛ ለማድረግ ስንደውል ማግኘት አልቻልንም። ለተሻለ አገልግሎት በ${this.phoneNumber} ይደውሉልን።`;
            break;
          case 'mact-02':
            message = `ሰላም ${this.customerName}! በተደጋጋሚ በደወልን ሰዓት ማግኘት ስላልቻልን በአገልግሎቱ ላይ እገዛችንን እንዳልፈለጉ በመገንዘብ ክትትላችንን አቋርጠነዋል። ለበለጠ መረጃ በ${this.phoneNumber} ይደውሉልን።`;
            break;
          case 'mact-03':
            message = `ሰላም ${this.customerName}! ከመተግበሪያው ላይ የስራ ጥሪ ተደርጎልዎ ለክትትል ስንደውል ማግኘት ስላልቻልን ስለደረሱበት ሁኔታ በ${this.phoneNumber} ደውለው ያሳውቁን። መልካም ቀን!`
            break;
          case 'mact-05':
            message = `ሰላም ${this.customerName}! ከመተግበሪያው ላይ የስራ ጥሪ ተደርጎልዎት ለክትትል ስንደውል ማግኘት ስላልቻልን ስራውን ለሌላ ባለሙያ ያስተላለፍነው መሆኑን ለማሳወቅ እንወዳለን። ለበለጠ መረጃ በ${this.phoneNumber} ይደውሉ። መልካም ቀን!`
            break;
          case 'egpt-01':
            message = `ሰላም ${this.customerName}! መተግበሪያችን ላይ ባለሙያ ለማግኘት ማስታወቂያ ለጥፈው ነበር። እገዛ ለማድረግ ስንደውል ማግኘት አልቻልንም። በሌላ ጊዜ ቀልጣፋ አገልግሎት እንድንሰጥዎ በ${this.phoneNumber} ይደውሉልን። መልካም ቀን!`
            break; 
          case 'blsr-01':
            message = `ሰላም ${this.customerName}! የአገልግሎት ጥራታችንን ለማሻሻል ለክትትል በደወልን ሰዓት ልናገኝዎ አልቻልንም። ስለደረሱበት ሁኔታ በ${this.phoneNumber} ደውለው ቢያሳውቁን ፈጣን አገልግሎት እንድንሰጥዎ ይረዳናል።`
            break;
          case 'blsr-02':
            message = `ሰላም ${this.customerName}! በ24 ሰዓታት ውስጥ ባለሙያዎቹን ባለማናገርዎ እንዲሁም በተደጋጋሚ ስንደውል ስላላገኘንዎ አገልግሎቱን ማስቀጠል አለመቻላችንን ለማሳወቅ እንወዳለን። ለተጨማሪ መረጃ በ${this.phoneNumber} ይደውሉ። መልካም ቀን!`
            break;  
          case 'ace-01':
            message=`ሰላም ${this.customerName}! የ${this.selectedService} ባለሙያ ማግኘት እንዳልቻሉ ስላየን እገዛ ለማድረግ ደውለን ነበር። በፍለጋው እንድንረዳዎ እባክዎ በ${this.phoneNumber} ይደውሉልን። መልካም ቀን!`
            break;   
          case 'ace-02':
            message = `ሰላም ${this.customerName}! የ${this.selectedService} ባለሙያ እንደፈለጉ ስላየን እገዛ ለማድረግ ደውለን ልናገኝዎ አልቻልንም። በ${this.phoneNumber} ቢደውሉልን ልናገለግልዎ ዝግጁ ነን። መልካም ቀን!`
            break;
          case 'ace-03':
            message = `ሰላም ${this.customerName}! የGoodayOn መተግበሪያን በማውረድዎ እናመሰግናለን። አጠቃቀሙ ላይ እገዛ ካስፈለግዎ በ${this.phoneNumber} ይደውሉ። መልካም ቀን!`
            break;
          case 'ace-04':
            message = `ሰላም ${this.customerName}! በባለሙያ ፍለጋ ሂደት ላይ እገዛ ሲፈልጉ በ${this.phoneNumber} በመደወል ፈጣን አገልግሎት ማግኘት ይችላሉ። መልካም ቀን!`
            break;
          case 'mpue-01':
            message = `ሰላም! የ GoodayOn መተግበሪያን በማውረድዎ እናመሰግናለን። አገልግሎታችንን ለማግኘት ምዝገባውን በአግባቡ ማጠናቀቅ ይኖርብዎታል። እገዛችንን ሲፈልጉ በ${this.phoneNumber} በስራ ሰዓት ይደውሉ። መልካም ቀን!`
            break;
          case 'spa-01':
            message = `ሰላም ${this.customerName}! የ GoodayOn መተግበሪያ ላይ በባለሙያነት ስለተመዘገቡ እናመሰግናለን። ቀሪውን የምዝገባ ሂደት በመጨረስ የስራ ገበያውን ለመቀላቀል በ${this.phoneNumber} ይደውሉ። መልካም ቀን!`
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

