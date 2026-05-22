<script setup>
const activeTab = useState('activeTab', () => '');
const route = useRoute();
const opdrachten = ref([]);
const opdracht = ref({});

onMounted(() => {
  activeTab.value = '';
  opdrachten.value = JSON.parse(localStorage.getItem("jobs")) || [];
  opdracht.value = opdrachten.value.find(job => route.params.title === job.title);
})
</script>

<template>
  <navbar />

  <div class="mx-auto w-full max-w-6xl p-4 sm:p-6">
    <div class="overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 text-slate-300 shadow-xl">
      <div class="p-6 sm:p-8">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div class="mb-3 flex flex-wrap items-center gap-2">
              <span
                  v-if="opdracht.client?.isPremium"
                  class="rounded-full bg-orange-500/15 px-3 py-1 text-sm font-semibold text-orange-400"
              >
                ⭐ Premium opdrachtgever
              </span>

              <span class="rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-400">
                {{ opdracht.isRemote ? 'Remote' : 'On-site' }}
              </span>
            </div>

            <h1 class="text-3xl font-bold text-slate-100 sm:text-4xl">
              {{ opdracht.title }}
            </h1>

            <p class="mt-2 text-lg text-slate-400">
              {{ opdracht.client?.companyName }} · {{ opdracht.location }}
            </p>
          </div>

          <div class="rounded-xl bg-slate-800 p-4 text-right">
            <p class="text-sm text-slate-400">Tarief</p>
            <p class="text-2xl font-bold text-slate-100">
              €{{ opdracht.hourlyRateMin }} - €{{ opdracht.hourlyRateMax }}
            </p>
            <p class="text-sm text-slate-500">per uur</p>
          </div>
        </div>

        <div class="my-8 border-t border-slate-700"></div>

        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div class="rounded-xl bg-slate-800 p-4">
            <p class="text-sm text-slate-500">Uren per week</p>
            <p class="mt-1 text-xl font-semibold text-slate-100">
              {{ opdracht.hoursPerWeek }} uur
            </p>
          </div>

          <div class="rounded-xl bg-slate-800 p-4">
            <p class="text-sm text-slate-500">Locatie</p>
            <p class="mt-1 text-xl font-semibold text-slate-100">
              {{ opdracht.location }}
            </p>
          </div>

          <div class="rounded-xl bg-slate-800 p-4">
            <p class="text-sm text-slate-500">Startdatum</p>
            <p class="mt-1 text-xl font-semibold text-slate-100">
              {{ opdracht.startDate }}
            </p>
          </div>

          <div class="rounded-xl bg-slate-800 p-4">
            <p class="text-sm text-slate-500">Einddatum</p>
            <p class="mt-1 text-xl font-semibold text-slate-100">
              {{ opdracht.endDate }}
            </p>
          </div>
        </div>

        <div class="mt-8 grid gap-6 lg:grid-cols-3">
          <div class="lg:col-span-2">
            <div class="rounded-2xl bg-slate-800 p-6">
              <h2 class="mb-3 text-2xl font-bold text-slate-100">
                Opdrachtomschrijving
              </h2>

              <p class="leading-7 text-slate-400">
                {{ opdracht.description }}
              </p>
            </div>
          </div>

          <div class="rounded-2xl bg-slate-800 p-6">
            <h2 class="mb-4 text-2xl font-bold text-slate-100">
              Opdrachtgever
            </h2>

            <div class="space-y-3">
              <div>
                <p class="text-sm text-slate-500">Bedrijf</p>
                <p class="font-semibold text-slate-100">
                  {{ opdracht.client?.companyName }}
                </p>
              </div>

              <div>
                <p class="text-sm text-slate-500">Status</p>
                <p class="font-semibold text-slate-100">
                  {{ opdracht.client?.isPremium ? 'Premium klant' : 'Standaard klant' }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 grid gap-6 lg:grid-cols-2">
          <div class="rounded-2xl bg-slate-800 p-6">
            <h2 class="mb-4 text-2xl font-bold text-slate-100">
              Skills
            </h2>

            <div class="flex flex-wrap gap-2">
              <span
                  v-for="skill in opdracht.skills"
                  :key="skill.name"
                  class="rounded-full bg-orange-500/15 px-3 py-1 text-sm font-medium text-orange-400"
              >
                {{ skill.name }}
              </span>
            </div>
          </div>

          <div class="rounded-2xl bg-slate-800 p-6">
            <h2 class="mb-4 text-2xl font-bold text-slate-100">
              Tools
            </h2>

            <div class="flex flex-wrap gap-2">
              <span
                  v-for="tool in opdracht.toolIds"
                  :key="tool"
                  class="rounded-full bg-slate-700 px-3 py-1 text-sm font-medium text-slate-300"
              >
                {{ tool }}
              </span>
            </div>
          </div>
        </div>

        <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <NuxtLink
              to="/zoekfunctie"
              class="rounded-lg border border-slate-700 px-5 py-3 text-center font-semibold text-slate-300 transition hover:bg-slate-800"
          >
            Terug naar opdrachten
          </NuxtLink>

          <button
              class="rounded-lg bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            Reageren op opdracht
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>