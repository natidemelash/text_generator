<template>
  <header class="bg-[#C21F80] px-8 py-4 ">
    <nav class="flex items-center justify-between flex-col lg:flex-row ">
      <div class="flex items-center justify-between w-full lg:w-auto">
        <h1>
          <router-link to="/">
            <img src="../assets/logo.png" alt="logo" width="50"/>
          </router-link>
        </h1>
        <!-- Hamburger menu button -->
        <button @click="toggleMobileMenu" class="text-white lg:hidden focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"/>
          </svg>
        </button>
      </div>

      <!-- Navigation links -->
      <div :class="{'hidden': !mobileMenuOpen, 'md:flex': !mobileMenuOpen, 'flex-col': mobileMenuOpen}" class="md:flex-row md:gap-4 flex-col items-center gap-4">
        <router-link to="/dispatch" class="text-[#ffffffc4] text-sm hover:text-white  hover:scale-110 transition duration-500">
          <button class="bg-[#640D4D] text-white px-4 py-1 rounded">Dispatch</button>
        </router-link>
        <router-link to="/payments" class="text-[#ffffffc4] text-sm hover:text-white  hover:scale-110 transition duration-500">
          <button class="bg-[#640D4D] text-white px-4 py-1 rounded">Payments</button>
        </router-link>
        <router-link to="/engagements" class="text-[#ffffffc4] text-sm hover:text-white  hover:scale-110 transition duration-500">
          <button class="bg-[#640D4D] text-white px-4 py-1 rounded">Engagements</button>
        </router-link>
        <router-link to="/custom" class="text-[#ffffffc4] text-sm hover:text-white  hover:scale-110 transition duration-500">
          <button class="bg-[#640D4D] text-white px-4 py-1 rounded">BLSR</button>
        </router-link>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      mobileMenuOpen: false
    };
  },
  methods: {
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
    }
  }
};
</script>

<style scoped>
/* Styles for hiding and showing the mobile menu */
@media (min-width: 1024px) {
  .lg\:hidden {
    display: none !important;
  }
  .lg\:block {
    display: block !important;
  }
}
</style>
