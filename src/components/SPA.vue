<template>
  <div class="card p-6 mx-3 md:mx-auto max-w-4xl bg-[#4f4d4d] mt-8 shadow-md rounded-md">
     <h3 class="text-lg mb-4 text-[#fff]">SPA Engagement Messages</h3>
     
     <div class="grid grid-cols-1 md:grid-cols-3 items-center text-black gap-8">
         <button class="bg-[#e21e81] text-xs text-white px-6 py-3 rounded"  @click="handleButtonClick('spa-01')">Service Provider not responsive</button>
     </div>
        <!-- Customer Name -->
        <InputField
            v-if="showCustomerNameInput"
            label="Customer Name"
            v-model="customerName"
            placeholder="Employer name"
            :error="customerNameError"
            class="my-4"
            @input="validateCustomerName"
        />
        <!-- CRM Number -->
        <InputField
            v-if="showCustomerNameInput"
            label="CRM Number"
            v-model="crmNumber"
            type="number"
            placeholder="CRM Number"
            :error="crmError"
            class="mt-4"
            @input="validateCRMNumber"
        />
        <div v-if="showPhoneNumberInput" class="mt-4">
            <InputField
                label="Phone Number/የዲስፓቸር ስልክ"
                v-model="phoneNumber"
                placeholder="Dispatcher phone"
                :error="phoneNumberError"
                @input="validatePhoneNumber"
            />
            <button
                @click="emitMessageEvent"
                class="mt-2 bg-[#333] cursor-pointer text-xs text-white px-4 py-2 rounded"
            >
                <img src="../assets/send.png" alt="" width="25" />
            </button>
        </div>

 </div>
</template>


<script>
import formDataMixin from '@/mixins/formDataMixin';
import InputField from './InputField.vue'
export default {
 props: ['showPhoneNumberInput', 'showCustomerNameInput'],
 mixins:[formDataMixin],
 components: {
    InputField
 },

}
</script>
