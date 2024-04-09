<template>
    <div  class="card p-6 mx-3 md:mx-auto max-w-3xl bg-[#4f4d4d] mt-8 shadow-md rounded-md">
        <h3 class="text-lg mb-4 text-[#fff]">New User Engagement Message</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 items-center text-black gap-8">
            <button class="bg-[#A569BD] text-xs text-white px-6 py-3 rounded"  @click="handleButtonClick('nue-1')">New user(app downloaded) - not responsive</button>
        </div>
  </div>
</template>

<script>
export default {
   methods:{
     handleButtonClick(action){
        this.$emit('button-click', action)
     }
   }
}
</script>