<template>
  <div>
    <Engagement  @engagement-message="updateEngagementMessage"/>
  </div>
</template>

<script>
import Engagement from '@/view/Engagement.vue';
  export default {
    components:{
      Engagement
    },
    methods: {
    updateEngagementMessage(message) {
      this.$emit('engagement-message', message);
    },
  },
  }
</script>

