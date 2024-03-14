<template>
    <div class="card text-white p-6 mx-auto max-w-2xl bg-[#4f4d4d] mt-8 shadow-md rounded-md">
        <h3 class="text-xl font-semibold mb-4 ">Custom SMS for BLSR</h3>
        <div class="flex flex-col w-[80%]">
           <label for="service">Job Dispatched</label> 
           <select class="bg-[#333] py-3 px-4 rounded-md" v-model="selectedService">
            <option v-for="(service , index) in services" :key="index">{{ service }}</option>
           </select>
        </div>
        <div class="my-2 flex flex-col w-[70%]">
            <label for="SP_name">SP name / የባለሙያ ስም</label>
            <input type="text" name="SP_name" v-model="serviceProviderName" placeholder="Service Provider name" class="py-2 px-3 bg-[#ECF0F1] text-black my-1 rounded focus:outline-none">
        </div>
        <div class="mt-2 mb-6 flex flex-col w-[70%]">
            <label for="SP_phone">SP phone/የባለሙያ ስልክ ቁጥር</label>
            <input type="text" name="SP_phone" v-model="serviceProviderPhone" placeholder="Service Provider Phone number" class="py-2 px-3 bg-[#ECF0F1] text-black my-1 rounded focus:outline-none">
        </div>

        <button class="bg-[#e21e81] text-sm text-white px-4 py-2 rounded-full" @click="blsrMessage">Generate Msg</button>
    </div>
    <div v-if="message" class="card mx-auto max-w-sm bg-[#4f4d4d] mt-8 shadow-md rounded-md p-6">
        <p> {{ message }}</p>
        <button @click="copyToClipboard" class="mt-6 mr-auto p-2 bg-gray-400 hover:bg-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 transition duration-300">
            <img src="../assets//copy.svg" alt="" width="20">
        </button>
    </div>
</template>

<script>
export default {
    data(){
        return {
            selectedService: null,
            services: [
                'Accountant', 
                'Aluminium Works',
                'Auto Mechanic',
                'Barber', 
                'Beauty',
                'Broker',
                'Cameraman', 
                'Carpenter',
                'Catering',
                'Cellphone Tech',
                'Chauffeur',
                'Cleaning Maid',
                'Computer Tech',
                'Construction',
                'Cooking Maid',
                'Decor',
                'DJ',
                'Electrician',
                'Electronics Repair',
                'Embroidery',
                'Errand Runner',
                'Event Organizer',
                'Gardener',
                'Gypsum Works',
                'Hair Stylist ',
                'Handyman',
                'Home Appliance Repair',
                'Knitting',
                'Laborer',
                'Language Teacher',
                'Locksmith',
                'Machine Installation',
                'Machine Maintenance',
                'Machine Operator',
                'Manager',
                'Massage',
                'Motorcyclist',
                'Moving Truck',
                'Music Teacher',
                'Nanny',
                'Nurse',
                'Painter',
                'Personal Trainer',
                'Physician',
                'Physiotherapy',
                'Plumber',
                'Receptionist',
                'Salesman',
                'Satellite Dish Tech',
                'School Bus',
                'Secretary',
                'Security Guard',
                'Senior Care',
                'Shoe Cleaner',
                'Shoe Repair',
                'Special Needs ',
                'Tailor',
                'Tattoo Artist',
                'Teacher',
                'Tiling Works',
                'Tow Truck',
                'Translator',
                'Tutor',
                'Waitering',
                'Water Jar Delivery ',
                'Weaver',
                'Welding',
            ],
            serviceProviderName: '',
            serviceProviderPhone: '',
            message: ''
        }
    },

    methods:{
        blsrMessage() {
             this.message = `የ${this.selectedService} ባለሙያ ከGoodayOn ወደ (${this.serviceProviderName}) በ(${this.serviceProviderPhone}) ይደውሉ። መልካም ቀን`;

             this.serviceProviderName = '';
             this.serviceProviderPhone = '';

            return message;
        },
        copyToClipboard() {
            const el = document.createElement("textarea");
            el.value = this.message;
            document.body.appendChild(el);
            el.select();
            document.execCommand("copy");
            document.body.removeChild(el);
            // Optionally, you can provide some feedback to the user
            alert("Message copied to clipboard successfully!");

            this.message = '';
        },
    }
}
</script>