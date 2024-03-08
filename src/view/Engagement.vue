<template>
  <div class="card p-6 mx-auto max-w-3xl bg-[#ECF0F1] mt-8 shadow-md rounded-md">
    <h3 class="text-xl font-semibold mb-4 text-[#C21F80]">Engagement Messages</h3>

    <div class="grid grid-cols-1 md:grid-cols-3 items-center text-black gap-8">
      <button class="bg-[#640D4D] text-xs text-white px-6 py-3 rounded"  @click="handleButtonClick('emp-paid-noanswer')">Paid connection - No reply from EMP /ቀጣሪው ከክፍያ በኋላ ስልክ አያነሳም</button>
      <button class="bg-[#640D4D] text-xs text-white px-6 py-3 rounded" @click="handleButtonClick('still-searching')">Still Searching for SP / በ15 ደቂቃ ባለሙያ ማግኘት ካልተቻለ </button>
      <button class="bg-[#640D4D] text-xs text-white px-6 py-3 rounded" @click="handleButtonClick('sp-dispatched-noanswer')">Dispatched SP - Employer No answer / ባለሙያ ልከንለት ቀጣሪው ስልክ ሳያነሳ ሲቅር</button>

      <button class="bg-[#435f8c] text-xs text-white px-6 py-3 rounded"  @click="handleButtonClick('sp-noanswer')">SP did not answer /ለባለሙያው የቀጣሪ ስልክ መድረሱን ለማረጋጥ ካልተቻለ </button>
      <button class="bg-[#435f8c] text-xs text-white px-6 py-3 rounded"  @click="handleButtonClick('dispatched-sp-noanswer')">SP dispatched /ባለሙያው ለስራ ከተላኩ በኋላ ስልክ አያነሳም </button>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      handleButtonClick(action){
        let message = '';

        switch (action) {
        case 'emp-paid-noanswer':
          message = 'ክፍያውን ስለፈጸሙ እናመሰግናለን። መስፈርትዎን የሚያሟላ የባለሙያ ስልክ ከ15 - 20 ደቂቃ ውስጥ ይደርሶታል። መልካም ቀን!';
          break;
        case 'still-searching':
          message = 'የእርስዎን መስፈርት በሚገባ የሚያሟላ ባለሙያ ፍለጋ ላይ ነን። እባክዎን በትዕግስት ይጠብቁ። መልካም ቀን!';
          break;
        case 'sp-dispatched-noanswer':
          message = 'ሰላም! የባለሙያ ስልክ ልከንልዎ ለማረጋገጥ ስንደውል ማግኘት አልቻልንም። ከባለሙያው ጋር በ24 ሰዓት ውስጥ ተነጋግረው ካላሳወቁን ሌላ ባለሙያ ለመላክ ሲስተሙ እንደማይፈቅድልን እናሳውቃለን።';
          break;
        case 'sp-noanswer':
          message = 'የቀጣሪ ስልክ ልከንልዎ ስልክዎን እያነሱልን አይደለም በ3 ደቂቃ ውስጥ ካልደወሉልን ስራውን ለሌላ ባለሙያ ለማስተላለፍ እንገደዳለን። መልካም ቀን!';
          break;
        case 'dispatched-sp-noanswer':
          message = 'የተላኩበትን ስራ በተመለከተ ደውለን ነበር። በ3 ደቂቃ ውስጥ ካልደወሉልን ስራውን ለሌላ ባለሙያ ለማስተላለፍ እንገደዳለን። መልካም ቀን!';
          break;
        default:
          break;
      }
      this.$emit('engagement-message', message);
    }
  }    
}
</script>

