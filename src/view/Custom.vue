
<template>
    <div class="flex justify-center items-center gap-8 mt-10">
        <h3>For Whom you are senting SMS / መልዕክቱ የሚላክለት</h3>
        <div class="flex flex-col ">
            <label class="inline-flex items-center">
                <input type="radio" class="form-radio h-5 w-5 text-indigo-600" v-model="messageFor" value="customer" />
                <span class="ml-2">Customer</span>
            </label>
            <label class="inline-flex items-center mt-4">
                <input type="radio" class="form-radio h-5 w-5 text-indigo-600" v-model="messageFor" value="serviceProvider" />
                <span class="ml-2">Service Provider</span>
            </label>
        </div>
    </div>
    <section v-if="messageFor === 'customer'" class="card text-white p-6 mx-auto max-w-2xl bg-[#4f4d4d] mt-8 shadow-md rounded-md">
        <h3 class="text-xl font-semibold mb-4 ">Custom SMS for BLSR</h3>
        <div class="flex flex-col w-[80%]">
           <label for="service">Job Dispatched</label> 
           <select class="bg-[#333] py-3 px-4 rounded-md" v-model="selectedService">
                <option disabled value="">Select Service</option>
                <option v-for="(service , index) in services" :key="index" :value="service">{{ service }}</option>
           </select>
           <div v-if="errors.selectedService" class="text-red-500">{{ errorMessage.selectedService }}</div>
        </div>
        <div class="my-2 flex flex-col w-[70%]">
            <label for="SP_name">SP name / የባለሙያ ስም</label>
            <input type="text" name="SP_name" v-model="serviceProviderName" placeholder="Service Provider name" class="py-2 px-3 bg-[#ECF0F1] text-black my-1 rounded focus:outline-none">
            <div v-if="errors.serviceProviderName" class="text-red-500 ">{{ errorMessage.name }}</div>
        </div>
        <div class="mt-2 mb-6 flex flex-col w-[70%]">
            <label for="SP_phone">SP phone/የባለሙያ ስልክ ቁጥር</label>
            <input type="text" name="SP_phone" v-model="serviceProviderPhone" placeholder="Service Provider Phone number" class="py-2 px-3 bg-[#ECF0F1] text-black my-1 rounded focus:outline-none">
            <div v-if="errors.serviceProviderPhone" class="text-red-500 w-3/4">{{ errorMessage.phone }}</div>
        </div>

        <button class="bg-[#e21e81] text-sm text-white px-4 py-2 rounded-full" @click="blsrMessage">Generate Msg</button>
    </section>
    <section v-if="messageFor === 'serviceProvider'" class="card text-white p-6 mx-auto max-w-2xl bg-[#4f4d4d] mt-8 shadow-md rounded-md">
        <div class="my-2 flex flex-col w-[70%]">
            <label for="Customer_name">Customer name/ የቀጣሪ ስም</label>
            <input type="text" name="Customer_name" v-model="name" placeholder="customer name" class="py-2 px-3 bg-[#ECF0F1] text-black my-1 rounded focus:outline-none">
            <div v-if="errors.name" class="text-red-500 ">{{ errorMessage.name }}</div>
        </div>
        <div class="mt-2 mb-6 flex flex-col w-[70%]">
            <label for="Customer_phone">Customer phone/የቀጣሪ ስልክ ቁጥር</label>
            <input type="text" name="Customer_phone" v-model="phone" placeholder="customer phone number" class="py-2 px-3 bg-[#ECF0F1] text-black my-1 rounded focus:outline-none">
            <div v-if="errors.serviceProviderPhone" class="text-red-500 w-3/4">{{ errorMessage.phone }}</div>
        </div>
        <button class="bg-[#e21e81] text-sm text-white px-4 py-2 rounded-full" @click="blsrMessage">Generate Msg</button>
    </section>
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
            messageFor: null,
            selectedService: null,
            serviceProviderName:'',
            serviceProviderPhone: '',
            customerName: '',
            customerPhone: '',
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
            name: '',
            phone: '',
            message: '',
            errors:{
                selectedService: false,
                serviceProviderName: false,
                customerName: false,
                serviceProviderPhone: false,
                customerPhone: false,
            },
            errorMessage: {
                selectedService: "Please select a service.",
                name: "Please enter a name.",
                phone: "Please enter a valid phone number",
            },
        }
    },

    methods:{
        validateForm() {
            if (this.messageFor === 'customer') {
                this.errors.selectedService = !this.selectedService;
                this.errors.serviceProviderName = !this.serviceProviderName;
                this.errors.serviceProviderPhone = !this.isValidPhoneNumber(this.serviceProviderPhone);
                return !this.errors.selectedService && !this.errors.serviceProviderName && !this.errors.serviceProviderPhone;
            } else if (this.messageFor === 'serviceProvider') {
                this.errors.name = !this.name;
                this.errors.phone = !this.isValidPhoneNumber(this.phone);
                return !this.errors.name && !this.errors.phone;
            }
        },
        isValidPhoneNumber(phone) {
            const phoneRegex = /^(\+2519\d{8}|09\d{8})$/;
            return phoneRegex.test(phone);
        },
        blsrMessage() {
            if(this.validateForm()){
                if(this.messageFor === 'customer'){
                    this.message = `የ${this.selectedService} ባለሙያ ከGoodayOn ወደ (${this.serviceProviderName}) በ(${this.serviceProviderPhone}) ይደውሉ። መልካም ቀን`;
                }else if (this.messageFor === 'serviceProvider'){
                    this.message = `የቀጣሪ ስም፡ ${this.name} - የቀጣሪ ስልክ ቁጥር ${this.phone}`;
                }
                this,this.selectedService = '';
                this.serviceProviderName = '';
                this.serviceProviderPhone = '';
                this.customerName = '';
                this.customerPhone = '';
                return message;
            }
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
