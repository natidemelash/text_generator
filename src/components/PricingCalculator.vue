<template>
    <div class="max-w-lg mx-auto p-6 bg-[#333] rounded-lg shadow-md">
      <h1 class="text-2xl font-bold mb-4">Service Pricing Calculator</h1>
      
      <label class="block mb-2">
        <span class="text-white">Service Type</span>
        <select v-model="selectedService" class="block w-full mt-1 py-2 px-3 text-gray-900">
          <option v-for="service in serviceTypes" :key="service" :value="service">{{ service }}</option>
        </select>
      </label>
      
      <label class="block mb-2">
        <span class="text-white">Job Type</span>
        <select v-model="selectedJobType" class="block w-full mt-1 py-2 px-3 text-gray-900">
          <option v-for="job in jobTypeOptions" :key="job" :value="job">{{ job }}</option>
        </select>
      </label>

      <label class="block mb-2">
        <span class="text-white">Apartment Room</span>
        <select v-model="selectedRoom" class="block w-full mt-1 py-2 px-3 text-gray-900">
          <option v-for="room in roomOptions" :key="room" :value="room">{{ room }}</option>
        </select>
      </label>
      
      <div v-if="pricing" class="mt-4 p-4 bg-gray-[#333] rounded">
        <h2 class="text-xl font-semibold">Pricing Details</h2>
        <p>Total Price: {{ pricing.total }}</p>
        <p>Gooday 20%: {{ pricing.gooday }}</p>
        <p>Service Provider 80%: {{ pricing.sp }}</p>
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
      }
    }
  };
  </script>