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
  <CCO v-if="selectedProjectType ==='CCO'" @button-click="handleButtonClick" :show-phone-number-input="showPhoneNumberInput" :show-service-of-interest-input="showServiceOfInterestInput" :show-customer-name-input="showCustomerNameInput" @generate-message="handleGenerateMessage"/>

  <!-- MACT Messages -->
  <MACT v-if="selectedProjectType === 'MACT'" @button-click = "handleButtonClick" :show-phone-number-input="showPhoneNumberInput" :show-service-of-interest-input="showServiceOfInterestInput" :show-customer-name-input="showCustomerNameInput" :show-reason-for-disable="showReasonForDisable"  @generate-message="handleGenerateMessage"/>

  <BLSR v-if="selectedProjectType === 'BLSR'"  @button-click="handleButtonClick" :show-phone-number-input="showPhoneNumberInput" :show-customer-name-input="showCustomerNameInput" @generate-message="handleGenerateMessage"/>

  <EGPT v-if="selectedProjectType === 'EGPT'" @button-click="handleButtonClick" :show-phone-number-input="showPhoneNumberInput" :show-customer-name-input="showCustomerNameInput" @generate-message="handleGenerateMessage"/>

  <MPUE v-if="selectedProjectType === 'MPUE'"  @button-click="handleButtonClick" :show-phone-number-input="showPhoneNumberInput" :show-customer-name-input="showCustomerNameInput" @generate-message="handleGenerateMessage"/>

  <ACE v-if="selectedProjectType === 'ACE'" @button-click = "handleButtonClick" :show-phone-number-input="showPhoneNumberInput" :show-service-of-interest-input="showServiceOfInterestInput" :show-customer-name-input="showCustomerNameInput"  @generate-message="handleGenerateMessage"/>

  <SPA v-if="selectedProjectType === 'SPA'" @button-click="handleButtonClick" :show-phone-number-input="showPhoneNumberInput" :show-customer-name-input="showCustomerNameInput" @generate-message="handleGenerateMessage"/>
  
  <ALSAM v-if="selectedProjectType === 'ALSAM'" @button-click = "handleButtonClick" :show-phone-number-input="showPhoneNumberInput" :show-service-of-interest-input="showServiceOfInterestInput" :show-customer-name-input="showCustomerNameInput" :show-time-input="showTimeInput" :show-date-input="showDateInput" :show-payment-amount-input="showPaymentAmountInput" @generate-message="handleGenerateMessage" />  
 
 </template>

<script>
import BLSR from '@/components/BLSR.vue'
import MACT from '@/components/MACT.vue'
import CCO from '@/components/CCO.vue'
import EGPT from '@/components/EGPT.vue'
import ACE from '@/components/ACE.vue'
import MPUE from '@/components/MPUE.vue'
import SPA from '@/components/SPA.vue';
import ALSAM from '@/components/ALSAM.vue'

  export default {
    components:{
      CCO,
      BLSR,
      MACT,
      EGPT,
      ACE,
      MPUE,
      SPA,
      ALSAM
    },
    data(){
      return{
        showPhoneNumberInput: false,
        showServiceOfInterestInput: false,
        showCustomerNameInput: false,
        showPaymentAmountInput: false,
        showReasonForDisable: false,
        showTimeInput: false,
        showDateInput: false,
        selectedAction: null,
        phoneNumber: '',
        phoneNumberError: '',
        projectTypes: ['CCO', 'MACT', 'BLSR', 'EGPT', 'MPUE', 'ACE', 'SPA', 'ALSAM'],
        selectedProjectType: null,
        selectedService:'',
        customerName: '', 
        crmNumber: '',
        paymentAmount: '',
        selectedDate: '',
        selectedTime: '',
        feedbackFormLink: null,
        disabledFor: ''
      }
    },

    methods: {
      handleButtonClick(action) {
        // Reset phone number and error message
        this.phoneNumber = '';
        this.phoneNumberError = '';
        this.customerName = '',
        this.selectedService = ''

        this.selectedAction = action;
        this.showPhoneNumberInput = true
        this.showCustomerNameInput = true;

        if(action === 'pa-04' || action === 'pa-08'){
          this.showPaymentAmountInput = true
          this.showServiceOfInterestInput = true
          this.showTimeInput = false
          return;
        }

        if(action === 'pa-03' || action === 'pa-09'){
          this.showTimeInput = true;
          this.showServiceOfInterestInput = true;
          this.showPaymentAmountInput = false;
          return;
        }

        if(action === 'pa-10'){
          this.showDateInput = true;
          return;
        }

        if(action === 'mact-07'){
          this.showReasonForDisable = true;
          return
        }

        if(action === 'mact-01' || action === 'ace-01' || action === 'ace-02' || action === 'pa-01' || action === 'pa-02' || action === 'cco-01' || 'cco-02'|| 'cco-05'){
          this.showServiceOfInterestInput = true;
          this.showTimeInput = false;
          this.showPaymentAmountInput = false;
          return;
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
        const { action, phoneNumber, selectedService, customerName, crmNumber, paymentAmount, selectedTime, selectedDate, feedbackFormLink, disabledFor } = messageData;
        
        // Set the selected action and phone number
        this.selectedAction = action;
        this.phoneNumber = phoneNumber;
        this.selectedService = selectedService;
        this.customerName = customerName;
        this.paymentAmount = paymentAmount;
        this.crmNumber = crmNumber;
        this.selectedTime = selectedTime;
        this.selectedDate = selectedDate;
        this.feedbackFormLink = feedbackFormLink;
        this.disabledFor = disabledFor

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
        this.showTimeInput = false;
        this.showPaymentAmountInput = false;
        this.showReasonForDisable = false;

        switch (this.selectedAction) {
          case 'cco-01':
            message = `ሰላም ${this.customerName}! የ${this.selectedService} ባለሙያ ጥያቄዎን በተመለከተ ደውለን ነበር። እባክዎን በ${this.phoneNumber} መልሰው በመደወል የተሻለ አገልግሎት እንድንሰጥዎ ያግዙን። መለያ-${this.crmNumber}። መልካም ቀን!`;
            break;
          case 'cco-02':
            message = `ሰላም ${this.customerName}! የእርስዎን መስፈርት በሚገባ የሚያሟላ የ${this.selectedService} ባለሙያ ፍለጋ ላይ ነን። እባክዎን በትዕግስት ይጠብቁ። ለበለጠ መረጃ በ${this.phoneNumber} ይደውሉ። መለያ-${this.crmNumber}። መልካም ቀን!`;
            break;
          case 'cco-03':
            message = `ሰላም ${this.customerName}! የባለሙያ ስልክ እንደደረስዎ ለማረጋገጥ ነበር። በ24 ሰዓት ውስጥ የደረሱበትን በ${this.phoneNumber} ካላሳወቁን ሌላ ባለሙያ መላክ እንደማንችል ለመግለጽ እንወዳለን። መለያ-${this.crmNumber}። መልካም ቀን!`;
            break;
          case 'cco-04':
            message = `ሰላም ${this.customerName}! በተደጋጋሚ ደውለን ልናገኝዎ አልቻልንም። የተሰጠዎ የጊዜ ገደብ ስላለፈ ሃሳብዎን እንደቀየሩ ተቆጥሮ ትዕዛዝዎ ተዘግቷል። አገልግሎታችንን ሲፈልጉ በ${this.phoneNumber} ይደውሉ። መለያ-${this.crmNumber}። መልካም ቀን!`;
            break;
          case 'cco-05':
            message = `ሰላም ${this.customerName}! በአካባቢዎ የ${this.selectedService} ባለሙያ ማግኘት ስላልተቻለ የከፈሉትን ክፍያ ለቀጣይ ጥያቄዎ መጠቀም የሚችሉ መሆኑን በትህትና እንገልጻለን። ለተጨማሪ መረጃ በ${this.phoneNumber} ይደውሉልን። መለያ-${this.crmNumber}። መልካም ቀን!`;
            break;
          case 'cco-06':
            message = `ሰላም ${this.customerName}! አገልግሎታችንን ስለተጠቀሙ እያመሰገንን በላክንልዎ ባለሙያ ላይ ያልዎትን አስተያየት ለመውሰድ ደውለን ነበር። በ${this.phoneNumber} ቢደውሉልን ለአገልግሎት ጥራታችን ይረዳናል። መለያ-${this.crmNumber}። መልካምቀን!`
            break;
          case 'cco-07':
            message = `ሰላም ${this.customerName}! በላክንዎት ስራ ላይ ያለዎትን አስተያየት ለመውሰድ ደውለን ነበር። በሌላ ጊዜ የስራ ጥሪዎች እንዲደርሱዎት ያለዎትን አስተያየት በ${this.phoneNumber} ስልክ ደውለው ያሳውቁን። መለያ-${this.crmNumber}። መልካም ቀን!`
            break;
          case 'cco-08':
            message = `ሰላም ${this.customerName}! የቀጣሪ ስልክ ልከንልዎ ስልክዎን እያነሱልን አይደለም። በ3 ደቂቃ ውስጥ ካልደወሉልን ስራውን ለሌላ ባለሙያ ለማስተላለፍ እንገደዳለን። ለበለጠ መረጃ በ${this.phoneNumber} ይደውሉ። መለያ-${this.crmNumber}። መልካም ቀን!`;
            break;
          case 'cco-09':
            message = `ሰላም ${this.customerName}! ለስራ ልከንዎ ስለደረሱበት ሁኔታ ለመከታተል ደውለን ነበር። በ${this.phoneNumber} ደውለው የደረሱበትን እንዲያሳወቁን በትህትና እንጠይቃለን። መለያ-${this.crmNumber}። መልካም ቀን!`
            break;
          case 'cco-10':
            message = `ሰላም ${this.customerName}! ለስራ ልከንዎት ስንደውል ልናገኝዎ አልቻልንም። ስራውን ለሌሎች ባለሙያዎች ከማስተላለፋችን በፊት በ${this.phoneNumber} ይደውሉ። መለያ-${this.crmNumber}። መልካም ቀን!`;
            break;
          case 'cco-11':
            message = `ሰላም ${this.customerName}! ለስራ ልከንዎ ለክትትል በተደጋጋሚ ስንደውል ማግኘት ስላልቻልን ስራውን ለሌላ ባለሙያ አስተላልፈናል። ለተጨማሪ መረጃ በ${this.phoneNumber} ይደውሉ። መለያ-${this.crmNumber}። መልካም ቀን!`
            break;
          case 'mact-01':
            message = `ሰላም ${this.customerName}! መተግበሪያችንን ስለተጠቀሙ እያመሰገንን በ${this.selectedService} ባለሙያ ጥያቄዎ ላይ ዝርዝር መረጃ ለመውሰድ ደውለን ልናገኝዎ አልቻልንም። ለበለጠ መረጃ በ${this.phoneNumber} ይደውሉ። መለያ-${this.crmNumber}`;
            break;
          case 'mact-02':
            message = `ሰላም ${this.customerName}! ለ${this.selectedService} ባለሙያ ጥያቄዎ እገዛ ለማድረግ በተደጋጋሚ ደውለን ነበር። በአገልግሎቱ ላይ እገዛችንን እንዳልፈለጉ በመገንዘብ ክትትላችን አቋርጠናል። ለበለጠ መረጃ በ${this.phoneNumber} ይደውሉልን። መለያ-${this.crmNumber}`;
            break;
          case 'mact-03':
            message = `ሰላም ${this.customerName}! መተግበሪያችንን ስለተጠቀሙ እያመሰገንን፤ በአገልግሎታችን እና በባለሙያው ላይ ያልዎትን አስተያየት ለመውሰድ ደውለን ነበር። በ${this.phoneNumber} ቢደውሉልን የአገልግሎት ጥራታችን ለማሻሻል ይረዳናል። መለያ-${this.crmNumber}። መልካም ቀን!`
            break;
          case 'mact-04':
            message = `ሰላም ${this.customerName}! ለስራ ልከንዎ ስለደረሱበት ሁኔታ ለመከታተል ደውለን ነበር። በ${this.phoneNumber} ደውለው የደረሱበትን እንዲያሳወቁን በትህትና እንጠይቃለን። መለያ-${this.crmNumber}። መልካም ቀን!`
            break;
          case 'mact-05':
            message = `ሰላም ${this.customerName}! ለስራ ልከንዎት ስንደውል ልናገኝዎ አልቻልንም። ስራውን ለሌሎች ባለሙያዎች ከማስተላለፋችን በፊት በ${this.phoneNumber} ይደውሉ። መለያ-${this.crmNumber}። መልካም ቀን!`
            break;
          case 'mact-06':
            message = `ሰላም ${this.customerName}! ለስራ ልከንዎ ለክትትል በተደጋጋሚ ስንደውል ማግኘት ስላልቻልን ስራውን ለሌላ ባለሙያ አስተላልፈናል። ለተጨማሪ መረጃ በ${this.phoneNumber} ይደውሉ። መለያ-${this.crmNumber}። መልካም ቀን!`
            break; 
          case 'mact-07':
            message = `ሰላም ${this.customerName}! ${this.disabledFor} ከዚህ በኋላ በመተግበሪያችን የስራ ጥሪ እንደማይደርስዎ እንገልጻለን። ለበለጠ መረጃ 0979472677 ይደውሉልን። መለያ-${this.crmNumber}። መልካም ቀን!`
            break; 
          case 'egpt-01':
            message = `ሰላም ${this.customerName}! መተግበሪያችን ላይ ባለሙያ ለማግኘት ማስታወቂያ ለጥፈው ነበር። እገዛ ለማድረግ ስንደውል ማግኘት አልቻልንም። በሌላ ጊዜ ቀልጣፋ አገልግሎት እንድንሰጥዎ በ${this.phoneNumber} ይደውሉልን። መለያ-${this.crmNumber}። መልካም ቀን!`
            break; 
          case 'blsr-01':
            message = `ሰላም ${this.customerName}! የአገልግሎት ጥራታችንን ለማሻሻል ለክትትል በደወልን ሰዓት ልናገኝዎ አልቻልንም። ስለደረሱበት ሁኔታ በ${this.phoneNumber} ደውለው ቢያሳውቁን ፈጣን አገልግሎት እንድንሰጥዎ ይረዳናል። መለያ-${this.crmNumber}። መልካም ቀን!`
            break;
          case 'blsr-02':
            message = `ሰላም ${this.customerName}! በ24 ሰዓታት ውስጥ ባለሙያዎቹን ባለማናገርዎ  እና ስንደውል ስላላገኘንዎ አገልግሎቱን ማስቀጠል አልቻልንም። ለተጨማሪ መረጃ በ${this.phoneNumber} ይደውሉ። መለያ-${this.crmNumber}። መልካም ቀን!`
            break;  
          case 'ace-01':
            message=`ሰላም ${this.customerName}, የ${this.selectedService} ባለሙያ ማግኘት እንዳልቻሉ ስላየን እገዛ ለማድረግ ደውለን ነበር። በፍለጋው እንድንረዳዎ እባክዎ በ${this.phoneNumber} ይደውሉልን። መለያ-${this.crmNumber}። መልካም ቀን!`
            break;   
          case 'ace-02':
            message = `ሰላም ${this.customerName}, የ${this.selectedService} ባለሙያ እንደፈለጉ ስላየን እገዛ ለማድረግ ደውለን ልናገኝዎ አልቻልንም። በ${this.phoneNumber} ቢደውሉልን ልናገለግልዎ ዝግጁ ነን። መለያ-${this.crmNumber}። መልካም ቀን!` 
            break;
          case 'ace-03':
            message = `ሰላም ${this.customerName}, የ GoodayOn መተግበሪያን በማውረድዎ እናመሰግናለን። አጠቃቀሙ ላይ እገዛ ካስፈለግዎ በ${this.phoneNumber} ይደውሉ። መለያ-${this.crmNumber}። መልካም ቀን!`
            break;
          case 'ace-04':
            message = `ሰላም ${this.customerName}, በባለሙያ ፍለጋ ሂደት ላይ እገዛ ሲፈልጉ በ${this.phoneNumber} በመደወል ፈጣን አገልግሎት ማግኘት ይችላሉ። መለያ-${this.crmNumber}። መልካም ቀን!`
            break;
          case 'mpue-01':
            message = `ሰላም! የ GoodayOn መተግበሪያን በማውረድዎ እናመሰግናለን። አገልግሎታችንን ለማግኘት ምዝገባውን በአግባቡ ማጠናቀቅ ይኖርብዎታል። እገዛችንን ሲፈልጉ በ${this.phoneNumber} በስራ ሰዓት ይደውሉ። መለያ-${this.crmNumber}። መልካም ቀን!`
            break;
          case 'mpue-02':
            message = `ሰላም ${this.customerName}, ማንኛውንም ዓይነት መረጃ እና እርዳታ ሲፈልጉ በ${this.phoneNumber} ይደውሉ። መለያ-${this.crmNumber}። መልካም ቀን!`
            break;
          case 'spa-01':
            message = `ሰላም ${this.customerName}, የ GoodayOn መተግበሪያ ላይ በባለሙያነት ስለተመዘገቡ እናመሰግናለን። ቀሪውን የምዝገባ ሂደት በመጨረስ የስራ ገበያውን ለመቀላቀል በ${this.phoneNumber} ይደውሉ። መለያ-${this.crmNumber}። መልካም ቀን!`
            break;
          case 'pa-01':
            message = `Hi ${this.customerName}, following your recent request for ${this.selectedService} service. Please call 0900320880 to discuss the details. PA-${this.crmNumber}`
            break;
          case 'pa-02':
            message = `Hi ${this.customerName}, calling again to follow up on your ${this.selectedService} service request. Please call 0900320880 to discuss the details. PA-${this.crmNumber}`
            break;
          case 'pa-03':
            message = `Hi ${this.customerName}, Your ${this.selectedService} maid will arrive tomorrow at ${this.selectedTime} as planned. For any inquiries please call 0900320880. PA-${this.crmNumber}`
            break;
          case 'pa-04':
            message = `Hi ${this.customerName}, below are the payment details for your ${this.selectedService} service.<br>Telebirr: +251949231010 Tigist Afework<br>Amount: ETB ${this.paymentAmount}`
            break;
          case 'pa-05':
            message = `Hi ${this.customerName}, We were unable to contact you for the ${this.selectedService} service requested. If still interested, please call 0900320880.`
            break;
          case 'pa-06':
            message = `Hi ${this.customerName}, A gentle reminder on the service payment for your ${this.selectedService} service request . Please call 0900320880 for any support. PA-${this.crmNumber}`
            break;
          case 'pa-07':
            message = `Hi ${this.customerName}, We haven't been able to contact you about the payment for the requested ${this.selectedService} service. If you are still interested, please call at 0900320880. PA-${this.crmNumber}`
            break;
          case 'pa-08':
            message = `Hi ${this.customerName}, ETB ${this.paymentAmount} payment for ${this.selectedService} service is received. Thank you for trusting us. For any inquiries please call 0900320880`
            break;
          case 'pa-09':
            message = `Hi ${this.customerName}, Your requested ${this.selectedService} maid will arrive as scheduled Today at ${this.selectedTime}. For any inquiries please call 0900320880. PA-${this.crmNumber}`
            break;
          case 'pa-10':
            message = `Hi ${this.customerName}, Payment for the ${this.selectedService} service is due on ${this.selectedDate}. Thank you for using our service. PA-${this.crmNumber}`
            break;
          case 'pa-11':
            message = `Hi ${this.customerName}, Thank you for choosing GoodayOn, please use the link below to provide your feedback on the last ${this.selectedService}. For any enquiry please call 0900320880<br>${this.feedbackFormLink}`
          default:
            break;
        }
        this.$emit('engagement-message', message);
        this.phoneNumber = '';
      },
  }    
}
</script>

