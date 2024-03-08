<template>
  <header class="bg-[#C21F80] px-8 py-4 ">
    <nav class="flex items-center justify-between ">
      <div>
        <h1>
          <router-link to="/dispatch">
            <img src="../assets/logo.png" alt="logo" width="50"/>
          </router-link>
        </h1>
      </div>

      <div class="flex items-center gap-4">
        <router-link to="/dispatch" class="text-[#ffffffc4] text-sm hover:text-white  hover:scale-110 transition duration-500">
          <button class="bg-[#640D4D] text-white px-4 py-1 rounded">Dispatch</button>
        </router-link>
        <router-link to="/payments" class="text-[#ffffffc4] text-sm hover:text-white  hover:scale-110 transition duration-500">
          <button class="bg-[#640D4D] text-white px-4 py-1 rounded">Payments</button>
        </router-link>
      </div>
    </nav>
  </header>
</template>



