<template>
  <div
      v-if="pending"
      class="text-3xl font-medium text-slate-400 animate-pulse"
  >
    Loading profile...
  </div>

  <div
      v-else-if="user"
      class="flex flex-col items-center gap-4"
  >
    <img
        :src="user.picture || placeholderImage"
        :alt="user.name || 'User'"
        class="w-[110px] h-[110px] rounded-full object-cover border-4 border-orange-500 transition-transform duration-300 hover:scale-105"
        @error="handleImageError"
    />

    <div class="text-center">
      <div class="text-3xl font-semibold text-slate-50 mb-2">
        {{ user.name }}
      </div>

      <div class="text-lg text-slate-400">
        {{ user.email }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const user = useUser()
const pending = ref(false)

const placeholderImage = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23f97316'/%3E%3Cpath d='M50 45c7.5 0 13.64-6.14 13.64-13.64S57.5 17.72 50 17.72s-13.64 6.14-13.64 13.64S42.5 45 50 45zm0 6.82c-9.09 0-27.28 4.56-27.28 13.64v3.41c0 1.88 1.53 3.41 3.41 3.41h47.74c1.88 0 3.41-1.53 3.41-3.41v-3.41c0-9.08-18.19-13.64-27.28-13.64z' fill='%23fff'/%3E%3C/svg%3E`

function handleImageError(e: Event) {
  const target = e.target as HTMLImageElement
  target.src = placeholderImage
}

onMounted(() => {
  pending.value = true

  nextTick(() => {
    pending.value = false
  })
})
</script>