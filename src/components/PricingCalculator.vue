<template>
    <div class="max-w-xl mx-auto p-6 bg-[#548562] rounded-lg shadow-md">
      <h1 class="text-2xl font-bold mb-4">Service Pricing Calculator</h1>
      
      <label class="block mb-2">
        <span class="text-white">Service Type</span>
        <select v-model="selectedService" class="block w-full mt-1 px-4 py-2.5 text-gray-700 focus:outline-none rounded-md">
          <option v-for="service in serviceTypes" :key="service" :value="service">{{ service }}</option>
        </select>
      </label>

      <label class="block mb-2">
        <span class="text-white">Job Type</span>
        <select v-model="selectedJobType" class="block w-full mt-1 px-4 py-2.5 text-gray-700 focus:outline-none rounded-md">
          <option v-for="job in jobTypeOptions" :key="job" :value="job">{{ job }}</option>
        </select>
      </label>
      
      <label class="block mb-2">
        <span class="text-white">Apartment Room</span>
        <select v-model="selectedRoom" class="block w-full mt-1 px-4 py-2.5 text-gray-700 focus:outline-none rounded-md">
          <option v-for="room in roomOptions" :key="room" :value="room">{{ room }}</option>
        </select>
      </label>
      
      
      <div v-if="pricing" class="mt-4 p-6 bg-[#FDEBD0] text-black rounded">
        <h2 class="text-[1.3rem] font-semibold mb-2">Pricing Details(ETB)</h2>
        <p class="font-medium my-2 border-b border-gray-400">Total Price{{ discountLabel }}: {{ discountedPricing.total }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import { servicesData } from '@/data/serviceData';
  
  export default {
    data() {
      return {
        selectedService: '',
        selectedRoom: '',
        selectedJobType: '',
        servicesData
      };
    },
    computed: {
      serviceTypes() {
        return Object.keys(this.servicesData);
      },
      roomOptions() {
        if (this.selectedService && this.selectedJobType) {
          return Object.keys(this.servicesData[this.selectedService][this.selectedJobType]);
        }
        return [];
      },
      jobTypeOptions() {
        if (this.selectedService) {
          return Object.keys(this.servicesData[this.selectedService]);
        }
        return [];
      },
      pricing() {
        if (this.selectedService && this.selectedJobType && this.selectedRoom) {
          return this.servicesData[this.selectedService][this.selectedJobType][this.selectedRoom];
        }
        return null;
      },
      discountedPricing() {
        if (!this.pricing) return null;
  
        const discountRates = {
          "One time": 0.1,
          "1/week": 0.1,
          "2/week": 0.2,
          "3/week": 0.25
        };
  
        const discountRate = this.selectedService === "Cooking & Cleaning" ? discountRates[this.selectedJobType] : 0;
        const totalPrice = this.pricing.total * (1 - discountRate);
        const goodayShare = totalPrice * 0.2;
        const serviceProviderShare = totalPrice * 0.8;
  
        return {
          total: totalPrice,
          gooday: goodayShare,
          sp: serviceProviderShare
        };
      },
      discountLabel() {
        const discountRates = {
          "One time": 0.1,
          "1/week": 0.1,
          "2/week": 0.2,
          "3/week": 0.25
        };
  
        const discountRate = this.selectedService === "Cooking & Cleaning" ? discountRates[this.selectedJobType] : 0;
        return discountRate > 0 ? ' (with discount)' : '';
      }
    }
  };
  </script>