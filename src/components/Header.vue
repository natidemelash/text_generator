<template>
  <header class="bg-[#C21F80] px-8 py-5 ">
    <nav class="flex items-center justify-between ">
      <div>
        <h1>
          <router-link to="/">
            <img src="../assets/logo.png" alt="logo" width="50"/>
          </router-link>
        </h1>
      </div>
      <div class="flex items-center gap-8">
        <router-link to="/" class="text-[#ffffffc4] hover:text-white  hover:scale-110 transition duration-500">Message Generator</router-link>
        <router-link to="/about" class="text-[#ffffffc4] hover:text-white hover:scale-110 transition duration-500">About</router-link>
      </div>
    </nav>
  </header>
</template>



