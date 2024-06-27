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
  <component
    :is="selectedProjectType"
    v-if="selectedProjectType"
    @button-click="handleButtonClick"
    :show-phone-number-input="showPhoneNumberInput"
    :show-service-of-interest-input="showServiceOfInterestInput"
    :show-customer-name-input="showCustomerNameInput"
    :show-payment-amount-input="showPaymentAmountInput"
    :show-reason-for-disable="showReasonForDisable"
    :show-employer-name-input="showEmployerNameInput"
    :show-time-input="showTimeInput"
    :show-date-input="showDateInput"
    @generate-message="handleGenerateMessage"
  />
 
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
        showEmployerNameInput: false,
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
        disabledFor: '',
        employerName: '',
        message: '' 
      }
    },

    methods: {

       handleButtonClick(action) {
          // Reset phone number and error message
          this.phoneNumber = '';
          this.phoneNumberError = '';
          this.customerName = '';
          this.selectedService = '';

          this.selectedAction = action;
          this.showPhoneNumberInput = true;
          this.showCustomerNameInput = true;

          // Reset all input flags to false
          this.showPaymentAmountInput = false;
          this.showServiceOfInterestInput = false;
          this.showTimeInput = false;
          this.showDateInput = false;
          this.showReasonForDisable = false;
          this.showEmployerNameInput = false;

          // Set input flags based on the action
          if (['pa-04', 'pa-08'].includes(action)) {
              this.showPaymentAmountInput = true;
              this.showServiceOfInterestInput = true;
          } else if (['pa-03', 'pa-09'].includes(action)) {
              this.showTimeInput = true;
              this.showServiceOfInterestInput = true;
          } else if (action === 'pa-10') {
              this.showDateInput = true;
              this.showPaymentAmountInput = true;
              this.showServiceOfInterestInput = true;
          } else if (action === 'mact-07') {
              this.showReasonForDisable = true;
          } else if (['pa-12', 'pa-13'].includes(action)) {
              this.showEmployerNameInput = true;
              this.showTimeInput = true;
              this.showServiceOfInterestInput = true;
          } else if (['blsr-02', 'mact-01', 'mact-02', 'ace-01', 'ace-02', 'pa-01', 'pa-02', 'cco-01', 'cco-02', 'cco-05', 'cco-13', 'cco-14', 'pa-11'].includes(action)) {
              this.showServiceOfInterestInput = true;
          } else {
              this.generateMessage();
          }
        },

      handleProjectType(projectType){
        this.selectedProjectType = projectType;
      },

      handleGenerateMessage(messageData) {
        // Extract action and phone number from the emitted event data
        const { action, phoneNumber, selectedService, customerName, crmNumber, paymentAmount, selectedTime, selectedDate, feedbackFormLink, disabledFor, employerName, newTime } = messageData;
        
        // Set the selected action and phone number
        this.selectedAction = action;
        this.phoneNumber = phoneNumber;
        this.selectedService = selectedService;
        this.customerName = customerName;
        this.paymentAmount = paymentAmount;
        this.crmNumber = crmNumber;
        this.selectedTime = selectedTime;
        this.newTime = newTime;
        this.selectedDate = selectedDate;
        this.feedbackFormLink = feedbackFormLink;
        this.disabledFor = disabledFor
        this.employerName = employerName

        // Generate the message
        this.generateMessage();
      },


      generateMessage() {
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
        this.hideInputFields()
        
        // switch (this.selectedAction) {
        //   case 'cco-01':
        //     message = `ሰላም ${this.customerName}! የ${this.selectedService} ባለሙያ ጥያቄዎን በተመለከተ ደውለን ነበር። እባክዎን በ${this.phoneNumber} መልሰው በመደወል የተሻለ አገልግሎት እንድንሰጥዎ ያግዙን። መለያ-${this.crmNumber}። መልካም ቀን!`;
        //     break;
        //   case 'cco-02':
        //     message = `ሰላም ${this.customerName}! የእርስዎን መስፈርት በሚገባ የሚያሟላ የ${this.selectedService} ባለሙያ ፍለጋ ላይ ነን። እባክዎን በትዕግስት ይጠብቁ። ለበለጠ መረጃ በ${this.phoneNumber} ይደውሉ። መለያ-${this.crmNumber}። መልካም ቀን!`;
        //     break;
        //   case 'cco-03':
        //     message = `ሰላም ${this.customerName}! የባለሙያ ስልክ እንደደረስዎ ለማረጋገጥ ነበር። በ24 ሰዓት ውስጥ የደረሱበትን በ${this.phoneNumber} ካላሳወቁን ሌላ ባለሙያ መላክ እንደማንችል ለመግለጽ እንወዳለን። መለያ-${this.crmNumber}። መልካም ቀን!`;
        //     break;
        //   case 'cco-04':
        //     message = `ሰላም ${this.customerName}! በተደጋጋሚ ደውለን ልናገኝዎ አልቻልንም። የተሰጠዎ የጊዜ ገደብ ስላለፈ ሃሳብዎን እንደቀየሩ ተቆጥሮ ትዕዛዝዎ ተዘግቷል። አገልግሎታችንን ሲፈልጉ በ${this.phoneNumber} ይደውሉ። መለያ-${this.crmNumber}። መልካም ቀን!`;
        //     break;
        //   case 'cco-05':
        //     message = `ሰላም ${this.customerName}! በአካባቢዎ የ${this.selectedService} ባለሙያ ማግኘት ስላልተቻለ የከፈሉትን ክፍያ ለቀጣይ ጥያቄዎ መጠቀም የሚችሉ መሆኑን በትህትና እንገልጻለን። ለተጨማሪ መረጃ በ${this.phoneNumber} ይደውሉልን። መለያ-${this.crmNumber}። መልካም ቀን!`;
        //     break;
        //   case 'cco-06':
        //     message = `ሰላም ${this.customerName}! አገልግሎታችንን ስለተጠቀሙ እያመሰገንን በላክንልዎ ባለሙያ ላይ ያልዎትን አስተያየት ለመውሰድ ደውለን ነበር። በ${this.phoneNumber} ቢደውሉልን ለአገልግሎት ጥራታችን ይረዳናል። መለያ-${this.crmNumber}። መልካም ቀን!`
        //     break;
        //   case 'cco-07':
        //     message = `ሰላም ${this.customerName}! በላክንዎት ስራ ላይ ያለዎትን አስተያየት ለመውሰድ ደውለን ነበር። በሌላ ጊዜ የስራ ጥሪዎች እንዲደርሱዎት ያለዎትን አስተያየት በ${this.phoneNumber} ስልክ ደውለው ያሳውቁን። መለያ-${this.crmNumber}። መልካም ቀን!`
        //     break;
        //   case 'cco-08':
        //     message = `ሰላም ${this.customerName}! የቀጣሪ ስልክ ልከንልዎ ስልክዎን እያነሱልን አይደለም። በ3 ደቂቃ ውስጥ ካልደወሉልን ስራውን ለሌላ ባለሙያ ለማስተላለፍ እንገደዳለን። ለበለጠ መረጃ በ${this.phoneNumber} ይደውሉ። መለያ-${this.crmNumber}። መልካም ቀን!`;
        //     break;
        //   case 'cco-09':
        //     message = `ሰላም ${this.customerName}! ለስራ ልከንዎ ስለደረሱበት ሁኔታ ለመከታተል ደውለን ነበር። በ${this.phoneNumber} ደውለው የደረሱበትን እንዲያሳወቁን በትህትና እንጠይቃለን። መለያ-${this.crmNumber}። መልካም ቀን!`
        //     break;
        //   case 'cco-10':
        //     message = `ሰላም ${this.customerName}! ለስራ ልከንዎት ስንደውል ልናገኝዎ አልቻልንም። ስራውን ለሌሎች ባለሙያዎች ከማስተላለፋችን በፊት በ${this.phoneNumber} ይደውሉ። መለያ-${this.crmNumber}። መልካም ቀን!`;
        //     break;
        //   case 'cco-11':
        //     message = `ሰላም ${this.customerName}! ለስራ ልከንዎ ለክትትል በተደጋጋሚ ስንደውል ማግኘት ስላልቻልን ስራውን ለሌላ ባለሙያ አስተላልፈናል። ለተጨማሪ መረጃ በ${this.phoneNumber} ይደውሉ። መለያ-${this.crmNumber}። መልካም ቀን!`
        //     break;
        //   case 'cco-12':
        //     message = `ሰላም ${this.customerName}! ለስራ ልከንዎት ባሳዩት ያልተገባ ሙያዊ ሥነ-ምግባር ማስታወቂያዎ ላይ እገዳ ተደርጓል። ለበለጠ መረጃ በ${this.phoneNumber} ይደውሉ። መልካም ቀን!`
        //     break;
        //   case 'cco-13':
        //     if(this.selectedService === 'ኤሌክትሪክ ስራ' || this.selectedService === 'አልሙኒየም ስራ' ||  this.selectedService === 'ጂፕሰም ስራ' ||  this.selectedService === 'ግንባታ ስራ' ||  this.selectedService === 'ሂሳብ ስራ'){
        //       message = `ሰላም ${this.customerName}! ስለተላኩበት የ${this.selectedService} ለክትትል ደውለን ነበር። በ${this.phoneNumber} ደውለው ፈጣን ምላሽ በመስጠት የስራ ገበያዎን ያስፉ። መለያ-${this.crmNumber}። መልካም ቀን!`
        //     }else{
        //       message = `ሰላም ${this.customerName}! ስለተላኩበት የ${this.selectedService} ስራ ለክትትል ደውለን ነበር። በ${this.phoneNumber} ደውለው ፈጣን ምላሽ በመስጠት የስራ ገበያዎን ያስፉ። መለያ-${this.crmNumber}። መልካም ቀን!`
        //     }
        //     break;
        //   case 'cco-14':
        //     message = `ሰላም ${this.customerName}! ከላክንልዎ የ${this.selectedService} ባለሙያ ጋር ተስማምተው ስራው ሳይጀመር ከ1 ሳምንት በላይ ከቆየ የተቀያሪ ባለሙያ ጥያቄ የማናስተናግድ መሆኑን እናሳውቃለን። ለበለጠ መረጃ በ${this.phoneNumber} ይደውሉ። መልካም ቀን!`
        //     break;
        //   case 'mact-01':
        //     message = `ሰላም ${this.customerName}! መተግበሪያችንን ስለተጠቀሙ እያመሰገንን በ${this.selectedService} ባለሙያ ጥያቄዎ ላይ ዝርዝር መረጃ ለመውሰድ ደውለን ልናገኝዎ አልቻልንም። ለበለጠ መረጃ በ${this.phoneNumber} ይደውሉ። መለያ-${this.crmNumber}`;
        //     break;
        //   case 'mact-02':
        //     message = `ሰላም ${this.customerName}! ለ${this.selectedService} ባለሙያ ጥያቄዎ እገዛ ለማድረግ በተደጋጋሚ ደውለን ነበር። በአገልግሎቱ ላይ እገዛችንን እንዳልፈለጉ በመገንዘብ ክትትላችን አቋርጠናል። ለበለጠ መረጃ በ${this.phoneNumber} ይደውሉልን። መለያ-${this.crmNumber}`;
        //     break;
        //   case 'mact-03':
        //     message = `ሰላም ${this.customerName}! መተግበሪያችንን ስለተጠቀሙ እያመሰገንን፤ በአገልግሎታችን እና በባለሙያው ላይ ያልዎትን አስተያየት ለመውሰድ ደውለን ነበር። በ${this.phoneNumber} ቢደውሉልን የአገልግሎት ጥራታችን ለማሻሻል ይረዳናል። መለያ-${this.crmNumber}። መልካም ቀን!`
        //     break;
        //   case 'mact-04':
        //     message = `ሰላም ${this.customerName}! ለስራ ልከንዎ ስለደረሱበት ሁኔታ ለመከታተል ደውለን ነበር። በ${this.phoneNumber} ደውለው የደረሱበትን እንዲያሳወቁን በትህትና እንጠይቃለን። መለያ-${this.crmNumber}። መልካም ቀን!`
        //     break;
        //   case 'mact-05':
        //     message = `ሰላም ${this.customerName}! ለስራ ልከንዎት ስንደውል ልናገኝዎ አልቻልንም። ስራውን ለሌሎች ባለሙያዎች ከማስተላለፋችን በፊት በ${this.phoneNumber} ይደውሉ። መለያ-${this.crmNumber}። መልካም ቀን!`
        //     break;
        //   case 'mact-06':
        //     message = `ሰላም ${this.customerName}! ለስራ ልከንዎ ለክትትል በተደጋጋሚ ስንደውል ማግኘት ስላልቻልን ስራውን ለሌላ ባለሙያ አስተላልፈናል። ለተጨማሪ መረጃ በ${this.phoneNumber} ይደውሉ። መለያ-${this.crmNumber}። መልካም ቀን!`
        //     break; 
        //   case 'mact-07':
        //     message = `ሰላም ${this.customerName}! ${this.disabledFor} ከዚህ በኋላ በመተግበሪያችን የስራ ጥሪ እንደማይደርስዎ እንገልጻለን። ለበለጠ መረጃ 0979472677 ይደውሉልን። መለያ-${this.crmNumber}። መልካም ቀን!`
        //     break; 
        //   case 'mact-08':
        //     message = `ሰላም ${this.customerName}! ለስራ ልከንዎት ባሳዩት ያልተገባ ሙያዊ ሥነ-ምግባር ማስታወቂያዎ ላይ እገዳ ተደርጓል። ለበለጠ መረጃ በ${this.phoneNumber} ይደውሉ። መልካም ቀን!`
        //     break; 
        //   case 'egpt-01':
        //     message = `ሰላም ${this.customerName}! መተግበሪያችን ላይ ባለሙያ ለማግኘት ማስታወቂያ ለጥፈው ነበር። እገዛ ለማድረግ ስንደውል ማግኘት አልቻልንም። በሌላ ጊዜ ቀልጣፋ አገልግሎት እንድንሰጥዎ በ${this.phoneNumber} ይደውሉልን። መለያ-${this.crmNumber}። መልካም ቀን!`
        //     break; 
        //   case 'blsr-01':
        //     message = `ሰላም ${this.customerName}! የአገልግሎት ጥራታችንን ለማሻሻል ለክትትል በደወልን ሰዓት ልናገኝዎ አልቻልንም። ስለደረሱበት ሁኔታ በ${this.phoneNumber} ደውለው ቢያሳውቁን ፈጣን አገልግሎት እንድንሰጥዎ ይረዳናል። መለያ-${this.crmNumber}። መልካም ቀን!`
        //     break;
        //   case 'blsr-02':
        //     message = `ሰላም ${this.customerName}! በ24 ሰዓታት ውስጥ የ${this.selectedService} ባለሙያዎቹን ባለማናገርዎ  እና ስንደውል ስላላገኘንዎ አገልግሎቱን ማስቀጠል አልቻልንም። ለተጨማሪ መረጃ በ${this.phoneNumber} ይደውሉ። መለያ-${this.crmNumber}። መልካም ቀን!`
        //     break;  
        //   case 'ace-01':
        //     message=`ሰላም ${this.customerName}! የ${this.selectedService} ባለሙያ ማግኘት እንዳልቻሉ ስላየን እገዛ ለማድረግ ደውለን ነበር። በፍለጋው እንድንረዳዎ እባክዎ በ${this.phoneNumber} ይደውሉልን። መለያ-${this.crmNumber}። መልካም ቀን!`
        //     break;   
        //   case 'ace-02':
        //     message = `ሰላም ${this.customerName}! የ${this.selectedService} ባለሙያ እንደፈለጉ ስላየን እገዛ ለማድረግ ደውለን ልናገኝዎ አልቻልንም። በ${this.phoneNumber} ቢደውሉልን ልናገለግልዎ ዝግጁ ነን። መለያ-${this.crmNumber}። መልካም ቀን!` 
        //     break;
        //   case 'ace-03':
        //     message = `ሰላም ${this.customerName}! የ GoodayOn መተግበሪያን በማውረድዎ እናመሰግናለን። አጠቃቀሙ ላይ እገዛ ካስፈለግዎ በ${this.phoneNumber} ይደውሉ። መለያ-${this.crmNumber}። መልካም ቀን!`
        //     break;
        //   case 'ace-04':
        //     message = `ሰላም ${this.customerName}! በተለያዩ የሙያ ዘርፎች ባለሙያ እንደፈለጉ ስላየን እገዛ ለማድረግ ደውለን ልናገኝዎ አልቻልንም። በ${this.phoneNumber} ቢደውሉልን ልናገለግልዎ ዝግጁ ነን። መለያ-${this.crmNumber}። መልካም ቀን!`
        //     break;
        //   case 'mpue-01': 
        //     message = `ሰላም! የ GoodayOn መተግበሪያን በማውረድዎ እናመሰግናለን። አገልግሎታችንን ለማግኘት ምዝገባውን በአግባቡ ማጠናቀቅ ይኖርብዎታል። እገዛችንን ሲፈልጉ በ${this.phoneNumber} በስራ ሰዓት ይደውሉ። መለያ-${this.crmNumber}። መልካም ቀን!`
        //     break;
        //   case 'mpue-02':
        //     message = `ሰላም ${this.customerName}! ማንኛውንም ዓይነት መረጃ እና እርዳታ ሲፈልጉ በ${this.phoneNumber} ይደውሉ። መለያ-${this.crmNumber}። መልካም ቀን!`
        //     break;
        //   case 'spa-01':
        //     message = `ሰላም ${this.customerName}! የ GoodayOn መተግበሪያ ላይ በባለሙያነት ስለተመዘገቡ እናመሰግናለን። ቀሪውን የምዝገባ ሂደት በመጨረስ የስራ ገበያውን ለመቀላቀል በ${this.phoneNumber} ይደውሉ። መለያ-${this.crmNumber}። መልካም ቀን!`
        //     break;
        //   case 'pa-01':
        //     message = `Hi ${this.customerName}! following your recent request for ${this.selectedService} service. Please call 0900320880 to discuss the details. PA-${this.crmNumber}`
        //     break;
        //   case 'pa-02':
        //     message = `Hi ${this.customerName}! calling again to follow up on your ${this.selectedService} service request. Please call 0900320880 to discuss the details. PA-${this.crmNumber}`
        //     break;
        //   case 'pa-03':
        //     message = `Hi ${this.customerName}! Your ${this.selectedService} maid will arrive tomorrow between ${this.selectedTime} - ${this.newTime}. For any inquiries please call 0900320880. PA-${this.crmNumber}`
        //     break;
        //   case 'pa-04':
        //     message = `Hi ${this.customerName}! below are the payment details for your ${this.selectedService} service.<br>Telebirr: +251949231010 Tigist Afework<br>Amount: ETB ${this.paymentAmount}`
        //     break;
        //   case 'pa-05':
        //     message = `Hi ${this.customerName}! We were unable to contact you for the ${this.selectedService} service requested. If still interested, please call 0900320880.`
        //     break;
        //   case 'pa-06':
        //     message = `Hi ${this.customerName}! A gentle reminder on the service payment for your ${this.selectedService} service request . Please call 0900320880 for any support. PA-${this.crmNumber}`
        //     break;
        //   case 'pa-07':
        //     message = `Hi ${this.customerName}! We haven't been able to contact you about the payment for the requested ${this.selectedService} service. If you are still interested, please call at 0900320880. PA-${this.crmNumber}`
        //     break;
        //   case 'pa-08':
        //     message = `Hi ${this.customerName}! ETB ${this.paymentAmount} payment for ${this.selectedService} service is received. Thank you for trusting us. For any inquiries please call 0900320880`
        //     break;
        //   case 'pa-09':
        //     message = `Hi ${this.customerName}! Your ${this.selectedService} maid will arrive as scheduled Today between ${this.selectedTime} - ${this.newTime}. For any inquiries please call 0900320880. PA-${this.crmNumber}`
        //     break;
        //   case 'pa-10':
        //     message = `Hi ${this.customerName}! Payment of ETB ${this.paymentAmount} for the ${this.selectedService} service is due on ${this.selectedDate}. Thank you for using our service. PA-${this.crmNumber}`
        //     break;
        //   case 'pa-11':
        //     message = `Hi ${this.customerName}! Thank you for choosing GoodayOn, please use the link below to provide your feedback on the last ${this.selectedService} service. <br><br>${this.feedbackFormLink}`
        //     break;
        //   case 'pa-12':
        //     message = `ሰላም ${this.customerName}! ዛሬ ቀጣሪ ${this.employerName} ጋር የ${this.selectedService} ስራ ${this.selectedTime} ሰዓት ላይ ስላለዎ ሰዓትዎን አክብረው ይገኙ። ለበለጠ መረጃ በ0900320880 ይደውሉልን። PA-${this.crmNumber}። መልካም ቀን!`
        //     break;
        //   case 'pa-13':
        //     message = `ሰላም ${this.customerName}! ነገ ቀጣሪ ${this.employerName} ጋር የ${this.selectedService} ስራ ${this.selectedTime} ሰዓት ላይ እንዳለዎ ለማስታወስ እንወዳለን። ለበለጠ መረጃ በ0900320880 ይደውሉልን። PA-${this.crmNumber}። መልካም ቀን!`
        //   default:
        //     break;
        // }
        this.composeMessage()
        this.$emit('engagement-message', this.message);
        this.phoneNumber = '';
      },   
      // Hide Input fields
      hideInputFields() {
        this.showPhoneNumberInput = false;
        this.showCustomerNameInput = false;
        this.showServiceOfInterestInput = false;
        this.showTimeInput = false;
        this.showPaymentAmountInput = false;
        this.showReasonForDisable = false;
        this.showEmployerNameInput = false;
      },
      // Compose Message
      composeMessage(){
        switch (this.selectedAction) {
          case 'cco-01':
            this.message = `ሰላም ${this.customerName}! የ${this.selectedService} ባለሙያ ጥያቄዎን በተመለከተ ደውለን ነበር። እባክዎን በ${this.phoneNumber} መልሰው በመደወል የተሻለ አገልግሎት እንድንሰጥዎ ያግዙን። መለያ-${this.crmNumber}። መልካም ቀን!`;
            break;
          case 'cco-02':
            this.message = `ሰላም ${this.customerName}! የእርስዎን መስፈርት በሚገባ የሚያሟላ የ${this.selectedService} ባለሙያ ፍለጋ ላይ ነን። እባክዎን በትዕግስት ይጠብቁ። ለበለጠ መረጃ በ${this.phoneNumber} ይደውሉ። መለያ-${this.crmNumber}። መልካም ቀን!`;
            break;
          case 'cco-03':
            this.message = `ሰላም ${this.customerName}! የባለሙያ ስልክ እንደደረስዎ ለማረጋገጥ ነበር። በ24 ሰዓት ውስጥ የደረሱበትን በ${this.phoneNumber} ካላሳወቁን ሌላ ባለሙያ መላክ እንደማንችል ለመግለጽ እንወዳለን። መለያ-${this.crmNumber}። መልካም ቀን!`;
            break;
          case 'cco-04':
            this.message = `ሰላም ${this.customerName}! በተደጋጋሚ ደውለን ልናገኝዎ አልቻልንም። የተሰጠዎ የጊዜ ገደብ ስላለፈ ሃሳብዎን እንደቀየሩ ተቆጥሮ ትዕዛዝዎ ተዘግቷል። አገልግሎታችንን ሲፈልጉ በ${this.phoneNumber} ይደውሉ። መለያ-${this.crmNumber}። መልካም ቀን!`;
            break;
          case 'cco-05':
            this.message = `ሰላም ${this.customerName}! በአካባቢዎ የ${this.selectedService} ባለሙያ ማግኘት ስላልተቻለ የከፈሉትን ክፍያ ለቀጣይ ጥያቄዎ መጠቀም የሚችሉ መሆኑን በትህትና እንገልጻለን። ለተጨማሪ መረጃ በ${this.phoneNumber} ይደውሉልን። መለያ-${this.crmNumber}። መልካም ቀን!`;
            break;
          case 'cco-06':
            this.message = `ሰላም ${this.customerName}! አገልግሎታችንን ስለተጠቀሙ እያመሰገንን በላክንልዎ ባለሙያ ላይ ያልዎትን አስተያየት ለመውሰድ ደውለን ነበር። በ${this.phoneNumber} ቢደውሉልን ለአገልግሎት ጥራታችን ይረዳናል። መለያ-${this.crmNumber}። መልካም ቀን!`
            break;
          case 'cco-07':
            this.message = `ሰላም ${this.customerName}! በላክንዎት ስራ ላይ ያለዎትን አስተያየት ለመውሰድ ደውለን ነበር። በሌላ ጊዜ የስራ ጥሪዎች እንዲደርሱዎት ያለዎትን አስተያየት በ${this.phoneNumber} ስልክ ደውለው ያሳውቁን። መለያ-${this.crmNumber}። መልካም ቀን!`
            break;
          case 'cco-08':
            this.message = `ሰላም ${this.customerName}! የቀጣሪ ስልክ ልከንልዎ ስልክዎን እያነሱልን አይደለም። በ3 ደቂቃ ውስጥ ካልደወሉልን ስራውን ለሌላ ባለሙያ ለማስተላለፍ እንገደዳለን። ለበለጠ መረጃ በ${this.phoneNumber} ይደውሉ። መለያ-${this.crmNumber}። መልካም ቀን!`;
            break;
          case 'cco-09':
            this.message = `ሰላም ${this.customerName}! ለስራ ልከንዎ ስለደረሱበት ሁኔታ ለመከታተል ደውለን ነበር። በ${this.phoneNumber} ደውለው የደረሱበትን እንዲያሳወቁን በትህትና እንጠይቃለን። መለያ-${this.crmNumber}። መልካም ቀን!`
            break;
          case 'cco-10':
            this.message = `ሰላም ${this.customerName}! ለስራ ልከንዎት ስንደውል ልናገኝዎ አልቻልንም። ስራውን ለሌሎች ባለሙያዎች ከማስተላለፋችን በፊት በ${this.phoneNumber} ይደውሉ። መለያ-${this.crmNumber}። መልካም ቀን!`;
            break;
          case 'cco-11':
            this.message = `ሰላም ${this.customerName}! ለስራ ልከንዎ ለክትትል በተደጋጋሚ ስንደውል ማግኘት ስላልቻልን ስራውን ለሌላ ባለሙያ አስተላልፈናል። ለተጨማሪ መረጃ በ${this.phoneNumber} ይደውሉ። መለያ-${this.crmNumber}። መልካም ቀን!`
            break;
          case 'cco-12':
            this.message = `ሰላም ${this.customerName}! ለስራ ልከንዎት ባሳዩት ያልተገባ ሙያዊ ሥነ-ምግባር ማስታወቂያዎ ላይ እገዳ ተደርጓል። ለበለጠ መረጃ በ${this.phoneNumber} ይደውሉ። መልካም ቀን!`
            break;
          case 'cco-13':
            if(this.selectedService === 'ኤሌክትሪክ ስራ' || this.selectedService === 'አልሙኒየም ስራ' ||  this.selectedService === 'ጂፕሰም ስራ' ||  this.selectedService === 'ግንባታ ስራ' ||  this.selectedService === 'ሂሳብ ስራ'){
              this.message = `ሰላም ${this.customerName}! ስለተላኩበት የ${this.selectedService} ለክትትል ደውለን ነበር። በ${this.phoneNumber} ደውለው ፈጣን ምላሽ በመስጠት የስራ ገበያዎን ያስፉ። መለያ-${this.crmNumber}። መልካም ቀን!`
            }else{
              this.message = `ሰላም ${this.customerName}! ስለተላኩበት የ${this.selectedService} ስራ ለክትትል ደውለን ነበር። በ${this.phoneNumber} ደውለው ፈጣን ምላሽ በመስጠት የስራ ገበያዎን ያስፉ። መለያ-${this.crmNumber}። መልካም ቀን!`
            }
            break;
          case 'cco-14':
            this.message = `ሰላም ${this.customerName}! ከላክንልዎ የ${this.selectedService} ባለሙያ ጋር ተስማምተው ስራው ሳይጀመር ከ1 ሳምንት በላይ ከቆየ የተቀያሪ ባለሙያ ጥያቄ የማናስተናግድ መሆኑን እናሳውቃለን። ለበለጠ መረጃ በ${this.phoneNumber} ይደውሉ። መልካም ቀን!`
            break;
          case 'mact-01':
            this.message = `ሰላም ${this.customerName}! መተግበሪያችንን ስለተጠቀሙ እያመሰገንን በ${this.selectedService} ባለሙያ ጥያቄዎ ላይ ዝርዝር መረጃ ለመውሰድ ደውለን ልናገኝዎ አልቻልንም። ለበለጠ መረጃ በ${this.phoneNumber} ይደውሉ። መለያ-${this.crmNumber}`;
            break;
          case 'mact-02':
            this.message = `ሰላም ${this.customerName}! ለ${this.selectedService} ባለሙያ ጥያቄዎ እገዛ ለማድረግ በተደጋጋሚ ደውለን ነበር። እገዛችንን እንዳልፈለጉ በመገንዘብ ክትትላችን አቋርጠናል። ለበለጠ መረጃ በ${this.phoneNumber} ይደውሉልን። መለያ-${this.crmNumber}`;
            break;
          case 'mact-03':
            this.message = `ሰላም ${this.customerName}! መተግበሪያችንን ስለተጠቀሙ እያመሰገንን፤ በአገልግሎታችን እና በባለሙያው ላይ ያልዎትን አስተያየት ለመውሰድ ደውለን ነበር። በ${this.phoneNumber} ቢደውሉልን የአገልግሎት ጥራታችን ለማሻሻል ይረዳናል። መለያ-${this.crmNumber}። መልካም ቀን!`
            break;
          case 'mact-04':
            this.message = `ሰላም ${this.customerName}! ለስራ ልከንዎ ስለደረሱበት ሁኔታ ለመከታተል ደውለን ነበር። በ${this.phoneNumber} ደውለው የደረሱበትን እንዲያሳወቁን በትህትና እንጠይቃለን። መለያ-${this.crmNumber}። መልካም ቀን!`
            break;
          case 'mact-05':
            this.message = `ሰላም ${this.customerName}! ለስራ ልከንዎት ስንደውል ልናገኝዎ አልቻልንም። ስራውን ለሌሎች ባለሙያዎች ከማስተላለፋችን በፊት በ${this.phoneNumber} ይደውሉ። መለያ-${this.crmNumber}። መልካም ቀን!`
            break;
          case 'mact-06':
            this.message = `ሰላም ${this.customerName}! ለስራ ልከንዎ ለክትትል በተደጋጋሚ ስንደውል ማግኘት ስላልቻልን ስራውን ለሌላ ባለሙያ አስተላልፈናል። ለተጨማሪ መረጃ በ${this.phoneNumber} ይደውሉ። መለያ-${this.crmNumber}። መልካም ቀን!`
            break; 
          case 'mact-07':
            this.message = `ሰላም ${this.customerName}! ${this.disabledFor} ከዚህ በኋላ በመተግበሪያችን የስራ ጥሪ እንደማይደርስዎ እንገልጻለን። ለበለጠ መረጃ 0979472677 ይደውሉልን። መለያ-${this.crmNumber}። መልካም ቀን!`
            break; 
          case 'mact-08':
            this.message = `ሰላም ${this.customerName}! ለስራ ልከንዎት ባሳዩት ያልተገባ ሙያዊ ሥነ-ምግባር ማስታወቂያዎ ላይ እገዳ ተደርጓል። ለበለጠ መረጃ በ${this.phoneNumber} ይደውሉ። መልካም ቀን!`
            break; 
          case 'egpt-01':
            this.message = `ሰላም ${this.customerName}! መተግበሪያችን ላይ ባለሙያ ለማግኘት ማስታወቂያ ለጥፈው ነበር። እገዛ ለማድረግ ስንደውል ማግኘት አልቻልንም። በሌላ ጊዜ ቀልጣፋ አገልግሎት እንድንሰጥዎ በ${this.phoneNumber} ይደውሉልን። መለያ-${this.crmNumber}። መልካም ቀን!`
            break; 
          case 'blsr-01':
            this.message = `ሰላም ${this.customerName}! የአገልግሎት ጥራታችንን ለማሻሻል ለክትትል በደወልን ሰዓት ልናገኝዎ አልቻልንም። ስለደረሱበት ሁኔታ በ${this.phoneNumber} ደውለው ቢያሳውቁን ፈጣን አገልግሎት እንድንሰጥዎ ይረዳናል። መለያ-${this.crmNumber}። መልካም ቀን!`
            break;
          case 'blsr-02':
            this.message = `ሰላም ${this.customerName}! በ24 ሰዓታት ውስጥ የ${this.selectedService} ባለሙያዎቹን ባለማናገርዎ  እና ስንደውል ስላላገኘንዎ አገልግሎቱን ማስቀጠል አልቻልንም። ለተጨማሪ መረጃ በ${this.phoneNumber} ይደውሉ። መለያ-${this.crmNumber}። መልካም ቀን!`
            break;  
          case 'ace-01':
            this.message=`ሰላም ${this.customerName}! የ${this.selectedService} ባለሙያ ማግኘት እንዳልቻሉ ስላየን እገዛ ለማድረግ ደውለን ነበር። በፍለጋው እንድንረዳዎ እባክዎ በ${this.phoneNumber} ይደውሉልን። መለያ-${this.crmNumber}። መልካም ቀን!`
            break;   
          case 'ace-02':
            this.message = `ሰላም ${this.customerName}! የ${this.selectedService} ባለሙያ እንደፈለጉ ስላየን እገዛ ለማድረግ ደውለን ልናገኝዎ አልቻልንም። በ${this.phoneNumber} ቢደውሉልን ልናገለግልዎ ዝግጁ ነን። መለያ-${this.crmNumber}። መልካም ቀን!` 
            break;
          case 'ace-03':
            this.message = `ሰላም ${this.customerName}! የ GoodayOn መተግበሪያን በማውረድዎ እናመሰግናለን። አጠቃቀሙ ላይ እገዛ ካስፈለግዎ በ${this.phoneNumber} ይደውሉ። መለያ-${this.crmNumber}። መልካም ቀን!`
            break;
          case 'ace-04':
            this.message = `ሰላም ${this.customerName}! በተለያዩ የሙያ ዘርፎች ባለሙያ እንደፈለጉ ስላየን እገዛ ለማድረግ ደውለን ልናገኝዎ አልቻልንም። በ${this.phoneNumber} ቢደውሉልን ልናገለግልዎ ዝግጁ ነን። መለያ-${this.crmNumber}። መልካም ቀን!`
            break;
          case 'mpue-01': 
            this.message = `ሰላም! የ GoodayOn መተግበሪያን በማውረድዎ እናመሰግናለን። አገልግሎታችንን ለማግኘት ምዝገባውን በአግባቡ ማጠናቀቅ ይኖርብዎታል። እገዛችንን ሲፈልጉ በ${this.phoneNumber} በስራ ሰዓት ይደውሉ። መለያ-${this.crmNumber}። መልካም ቀን!`
            break;
          case 'mpue-02':
            this.message = `ሰላም ${this.customerName}! ማንኛውንም ዓይነት መረጃ እና እርዳታ ሲፈልጉ በ${this.phoneNumber} ይደውሉ። መለያ-${this.crmNumber}። መልካም ቀን!`
            break;
          case 'spa-01':
            this.message = `ሰላም ${this.customerName}! የ GoodayOn መተግበሪያ ላይ በባለሙያነት ስለተመዘገቡ እናመሰግናለን። ቀሪውን የምዝገባ ሂደት በመጨረስ የስራ ገበያውን ለመቀላቀል በ${this.phoneNumber} ይደውሉ። መለያ-${this.crmNumber}። መልካም ቀን!`
            break;
          case 'pa-01':
            this.message = `Hi ${this.customerName}! following your recent request for ${this.selectedService} service. Please call 0900320880 to discuss the details. PA-${this.crmNumber}`
            break;
          case 'pa-02':
            this.message = `Hi ${this.customerName}! calling again to follow up on your ${this.selectedService} service request. Please call 0900320880 to discuss the details. PA-${this.crmNumber}`
            break;
          case 'pa-03':
            this.message = `Hi ${this.customerName}! Your ${this.selectedService} maid will arrive tomorrow between ${this.selectedTime} - ${this.newTime}. For any inquiries please call 0900320880. PA-${this.crmNumber}`
            break;
          case 'pa-04':
            this.message = `Hi ${this.customerName}! below are the payment details for your ${this.selectedService} service.<br>Telebirr: +251949231010 Tigist Afework<br>Amount: ETB ${this.paymentAmount}`
            break;
          case 'pa-05':
            this.message = `Hi ${this.customerName}! We were unable to contact you for the ${this.selectedService} service requested. If still interested, please call 0900320880.`
            break;
          case 'pa-06':
            this.message = `Hi ${this.customerName}! A gentle reminder on the service payment for your ${this.selectedService} service request . Please call 0900320880 for any support. PA-${this.crmNumber}`
            break;
          case 'pa-07':
            this.message = `Hi ${this.customerName}! We haven't been able to contact you about the payment for the requested ${this.selectedService} service. If you are still interested, please call at 0900320880. PA-${this.crmNumber}`
            break;
          case 'pa-08':
            this.message = `Hi ${this.customerName}! ETB ${this.paymentAmount} payment for ${this.selectedService} service is received. Thank you for trusting us. For any inquiries please call 0900320880`
            break;
          case 'pa-09':
            this.message = `Hi ${this.customerName}! Your ${this.selectedService} maid will arrive as scheduled Today between ${this.selectedTime} - ${this.newTime}. For any inquiries please call 0900320880. PA-${this.crmNumber}`
            break;
          case 'pa-10':
            this.message = `Hi ${this.customerName}! Payment of ETB ${this.paymentAmount} for the ${this.selectedService} service is due on ${this.selectedDate}. Thank you for using our service. PA-${this.crmNumber}`
            break;
          case 'pa-11':
            this.message = `Hi ${this.customerName}! Thank you for choosing GoodayOn, please use the link below to provide your feedback on the last ${this.selectedService} service. <br><br>${this.feedbackFormLink}`
            break;
          case 'pa-12':
            this.message = `ሰላም ${this.customerName}! ዛሬ ቀጣሪ ${this.employerName} ጋር የ${this.selectedService} ስራ ${this.selectedTime} ሰዓት ላይ ስላለዎ ሰዓትዎን አክብረው ይገኙ። ለበለጠ መረጃ በ0900320880 ይደውሉልን። PA-${this.crmNumber}። መልካም ቀን!`
            break;
          case 'pa-13':
            this.message = `ሰላም ${this.customerName}! ነገ ቀጣሪ ${this.employerName} ጋር የ${this.selectedService} ስራ ${this.selectedTime} ሰዓት ላይ እንዳለዎ ለማስታወስ እንወዳለን። ለበለጠ መረጃ በ0900320880 ይደውሉልን። PA-${this.crmNumber}። መልካም ቀን!`
            break;
          case 'pa-14':
            this.message = `Hi ${this.customerName}, Thank you for your interest in our ${this.selectedService} service. Currently, we only operate within Addis Ababa & cannot accept requests from outside the city. ${this.crmNumber}.`
           break;
          default:
            break;
        }
      }
  }    
}
</script>

