<template>
   <div class="card p-6 mx-3 md:mx-auto max-w-4xl bg-[#4f4d4d] mt-8 shadow-md rounded-md">
        <h3 class="text-lg mb-4 text-[#fff]">Appreciation Messages</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 items-center text-black gap-8">
            <button class="bg-[#e21e81] text-xs text-white px-6 py-3 rounded"  @click="handleButtonClick('success')">Successful Hire</button>
            <button class="bg-[#e21e81] text-xs text-white px-6 py-3 rounded"  @click="handleButtonClick('tg-link')">Telegram Links</button>
            <button class="bg-[#e21e81] text-xs text-white px-6 py-3 rounded"  @click="handleButtonClick('missed-call')">Missed-Call</button>
        </div>

        <div v-if="showCustomerNameInput">
            <label class="customerName">Customer Name </label>
            <input v-model="customerName" type="text" placeholder="Employer name" class="py-2 px-3 bg-[#333] text-sm text-white rounded-md mt-4 mb-2 focus:outline-none" >
            <p v-if="customerNameError" class="text-amber-500 text-sm mt-1">{{ customerNameError }}</p>
        </div>

        <button v-if="showCustomerNameInput" class="bg-[#e21e81] text-sm text-white px-4 py-2 my-6 rounded-full" @click="generateMessage">Generate Msg</button>
   </div>

    <div v-if="message" class="card mx-auto max-w-sm bg-[#4f4d4d] mt-8 shadow-md rounded-md p-6">
        <p class="whitespace-pre-line" v-html="message"></p>
        <button @click="copyToClipboard" class="mt-6 mr-auto p-2 bg-gray-400 hover:bg-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 transition duration-300">
            <img src="../assets//copy.svg" alt="" width="20">
        </button>
    </div>


</template>


<script>
export default {
    data(){
        return{
            showCustomerNameInput: false,
            message: '',
            messageFor: '',
            customerName: '',
            customerNameError: '',
            appLink: 'onelink.to/goodayonapp',
            tgLink: 'https://t.me/goodayon '
        }
    },

    methods: {
        handleButtonClick(action){
            this.showCustomerNameInput = !this.showCustomerNameInput
            this.messageFor = action;
        },
        generateMessage() {
            if(this.messageFor !== 'missed-call'){
                if(!this.customerName){
                    this.customerNameError = 'Name can\'t be empty'
                    return;
                }
            }
            if(this.messageFor === 'success'){
                this.message = `ሰላም ${this.customerName}! አገልግሎታችንን ስለተጠቀሙ እናመሰግናለን። ስለ GoodayOn ለወዳጅ ዘመድ ያጋሩ። ለቀልጣፋ አገልግሎት በ0949231010 ይደውሉ። መልካም ቀን! <br><br>Download፡ onelink.to/goodayonapp`;
            }else if(this.messageFor === 'tg-link'){
                this.message = `ሰላም ${this.customerName}! <br>የስራ ማስታወቂያዎች በብዛት እንዲደርስዎ የቴሌግራም ቻናላችን አባል ይሁኑ!<br>${this.tgLink}<br>ለቀልጣፋ አገልግሎት በ0970014434 ይደውሉ። መልካም ቀን!`
            }else if(this.messageFor === 'missed-call'){
                this.showCustomerNameInput = false;
                this.message = `ጤና ይስጥልን! ወደ Gooday(ጉዳይ) ስለደወሉ እናመሰግናለን። ጥሪዎ ስላመለጠን መልሰን ብንደውልም አላገኘንዎትም። እባክዎን በ9675 አልያም በ0949231010 መልሰው ይደውሉልን። መልካም ቀን!`
            }

            return this.message;

        },

        copyToClipboard() {
             // Replace <br> tags with newline characters
            const message = this.message.replace(/<br\s*\/?>/g, "\n");
            const el = document.createElement("textarea");
            el.value = message;
            document.body.appendChild(el);
            el.select();
            document.execCommand("copy");
            document.body.removeChild(el);
            // Optionally, you can provide some feedback to the user
            alert("Message copied to clipboard successfully!");
            this.message = ""
        },
    },
}
</script>