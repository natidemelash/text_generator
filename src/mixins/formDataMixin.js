import { serviceOfInterest } from "@/data/serviceOfInterest";
export default {
  data() {
    return {
      customerName: '',
      customerNameError: '',
      crmNumber: '',
      crmError: '',
      phoneNumber: '',
      phoneNumberError: '',
      selectedService: '',
      selectedServiceError: '',
      serviceOfInterest,
      disabledFor: '',
      reasonForDisableError: '',
      reasonForDisable: [
        'ምላሽ ለመስጠት ፍቃደኛ ስላልሆኑ',
        'ለስራ ተልከው ስለቀሩ',
        'ያልተገባ ባህሪ በማሳየትዎ',
        'ሌላ ባለሙያ በመላክዎ'
      ],
      selectedAction: ''
    };
  },
  methods: {
    handleButtonClick(action) {
      this.selectedAction = action;
      this.$emit('button-click', action);
    },
    emitMessageEvent() {
      if (!this.validateForm()) return;

      // Emit an event with the action and phone number to be handled by the parent component
      this.$emit('generate-message', {
        action: this.selectedAction,
        phoneNumber: this.phoneNumber,
        customerName: this.customerName,
        selectedService: this.selectedService,
        crmNumber: this.crmNumber,
        disabledFor: this.disabledFor
      });

      // Reset form fields after emitting message
      this.customerName = '';
      this.phoneNumber = '';
      this.crmNumber = '';
      this.selectedService = '';
      this.disabledFor = '';
    },


    validateCustomerName() {
      this.customerNameError = this.customerName ? '' : "Name can't be empty";
    },
    validateCRMNumber() {
      this.crmError = this.crmNumber ? '' : 'Please enter CRM Number';
    },
    validatePhoneNumber() {
        const phoneNumberPattern = /^09\d{8}$/; // Pattern to match phone numbers starting with 09 and having 10 digits in total
        if (!this.phoneNumber) {
            this.phoneNumberError = 'Phone number is required.';
        } else if (!phoneNumberPattern.test(this.phoneNumber)) {
            this.phoneNumberError = 'Invalid phone number: Must start with 09 and be 10 digits long.';
        } else {
            this.phoneNumberError = '';
        }
    },    
    validateService() {
      this.selectedServiceError = this.selectedService ? '' : 'Please select a service';
    },
    validateReasonForDisable() {
      this.reasonForDisableError = this.disabledFor ? '' : 'Please choose the reason for disabling';
    },
    validateForm() {
      this.validateCustomerName();
      this.validateCRMNumber();
      this.validatePhoneNumber();

      if (this.selectedAction === 'cco-01' || this.selectedAction === 'cco-02' || this.selectedAction === 'cco-05' || this.selectedAction === 'mact-01' || this.selectedAction === 'mact-02' || this.selectedAction === 'ace-01' || this.selectedAction === 'ace-02' || this.selectedAction === 'blsr-02') {
        this.validateService();
      }
      if (this.selectedAction === 'mact-07' || this.selectedAction === 'cco-15') {
        this.validateReasonForDisable();
      }

      return !this.customerNameError && !this.crmError && !this.phoneNumberError && !this.selectedServiceError && !this.reasonForDisableError;
    }
  }
};
