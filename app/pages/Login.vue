<template>
  <div
      class="min-h-screen w-full bg-[#1a1e27] text-slate-200 flex items-center justify-center p-4"
  >
    <div
        class="w-[90%] max-w-[500px] bg-[#262a33] rounded-[20px] shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-white/5 p-12 flex flex-col items-center gap-8"
    >
      <img
          src="https://cdn.auth0.com/quantum-assets/dist/latest/logos/auth0/auth0-lockup-en-ondark.png"
          alt="Auth0 Logo"
          class="w-40 mb-6"
      />

      <h1
          class="text-4xl md:text-5xl font-bold text-center text-slate-50 drop-shadow-lg"
      >
        Welcome to Auth0 Nuxt
      </h1>

      <div
          v-if="user"
          class="w-full flex flex-col items-center gap-6"
      >
        <div class="text-2xl font-semibold text-green-400">
          ✅ Successfully authenticated!
        </div>

        <h2 class="text-3xl font-bold">
          Your Profile
        </h2>

        <div class="w-full p-8">
          <UserProfile />
        </div>

        <NuxtLink
            to="/zoekfunctie"
            class="px-6 py-3 rounded-xl bg-green-500 text-[#1a1e27] font-semibold uppercase tracking-wider shadow-lg hover:bg-green-600 transition-all duration-300 hover:-translate-y-1"
        >
          Ga verder
        </NuxtLink>

        <LogoutButton />
      </div>

      <div
          v-else
          class="w-full bg-[#2d313c] rounded-2xl shadow-inner shadow-black/30 p-10 flex flex-col items-center gap-7"
      >
        <p class="text-xl text-slate-300 text-center leading-relaxed">
          Login
        </p>

        <LoginButton />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const user = useUser()
</script>