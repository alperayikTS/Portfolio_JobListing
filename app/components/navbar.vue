<script setup>
const activeTab = useState('activeTab', () => 'zoekfunctie')

const opdrachtStyling = computed(() => {
  return activeTab.value === 'opdracht'
      ? "bg-white text-black p-2 font-bold"
      : "bg-orange-500 text-white font-bold p-2 rounded-bl-md rounded-tl-md cursor-pointer"
})

const zoekfunctieStyling = computed(() => {
  return activeTab.value === 'zoekfunctie'
      ? "bg-white text-black p-2 font-bold"
      : "bg-orange-500 text-white font-bold p-2 rounded-bl-md rounded-tl-md cursor-pointer"
})
</script>

<template>
  <div class="flex justify-end">
    <div class="flex m-5 p-3 bg-orange-500 w-fit border-2 border-black rounded-md">
      <div>
        <NuxtLink to="/opdrachtplaatsen">
          <button :class="opdrachtStyling" @click="activeTab = 'opdracht'">Opdrachtplaatsen</button>
        </NuxtLink>
      </div>
      <div>
        <NuxtLink to="/zoekfunctie">
          <button :class="zoekfunctieStyling" @click="activeTab = 'zoekfunctie'">Zoekfunctie</button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>