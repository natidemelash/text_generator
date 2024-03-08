<template>
 <div class="card p-6 mx-auto max-w-2xl bg-[#ECF0F1] mt-8 shadow-md rounded-md">
    <h2 class="text-xl font-semibold mb-4 text-[#C21F80]">Payment related messages</h2>
    <div class="flex items-center text-black gap-8">
      <button class="bg-[#640D4D] text-xs text-white px-6 py-3 rounded"  @click="handleButtonClick('Well-received')">Received Payment / ክፍያ ደርሶናል</button>
      <button class="bg-[#640D4D] text-xs text-white px-6 py-3 rounded" @click="handleButtonClick('Reminder')">Payment Reminder / የክፍያ ማስታወሻ</button>
      <button class="bg-[#640D4D] text-xs text-white px-6 py-3 rounded" @click="handleButtonClick('Closed Ticket')">Closing ticket / የመዝጊያ መልዕክት </button>
    </div>
  </div>

</template>

<script>
export default {
  methods: {
    handleButtonClick(action) {
      
      let message = '';

      switch (action) {
        case 'Well-received':
          message = 'ክፍያውን ስለፈጸሙ እናመሰግናለን። መስፈርትዎን የሚያሟላ የባለሙያ ስልክ ከ15 - 20 ደቂቃ ውስጥ ይደርሶታል። መልካም ቀን!';
          break;
        case 'Reminder':
          message = 'ክፍያ ባለመፈጸምዎ የባለሞያ ጥያቄዎን ለማስተናገድ አልቻልንም።  በቀረው 12 ሰዓት ውስጥ ክፍያውን በመፈጸም ፈጣን አገልግሎት ያግኙ። መልካም ቀን!';
          break;
        case 'Closed Ticket':
          message = 'ላቀረቡት የባለሙያ ጥያቄ የአገልግሎት ክፍያ ባለመፈጸምዎ  ሃሳብዎን እንደቀየሩ ተቆጥሮ ትዕዛዝዎ ተዘግቷል። አገልግሎታችንን  በድጋሚ ሲፈልጉ  ልናገለግልዎ ዝግጁ ነን።';
          break;
        default:
          break;
      }
      this.$emit('payment-generated', message);
    },
  },
};
</script>


