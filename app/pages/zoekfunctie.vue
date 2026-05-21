<script setup>
const activeTab = useState('activeTab', () => 'zoekfunctie');

// Variables
const zoekbalkInput = ref('');
const locatieInput = ref('all');

const loading = ref(false);
const assignments = ref([]);
const jobs = ref([]);

const local = ref([]);

const filters = ref({
  search: '',
  remote: 'all'
})

// Data ophalen
onMounted(async () => {
  activeTab.value = 'zoekfunctie';
  assignments.value = await $fetch('http://localhost:4000/job');

  local.value = JSON.parse(localStorage.getItem('jobs')) || assignments.value; // local wordt gebruik om terug te vallen voor alle data en jobs wordt gebruikt om te filteren searchen etc zonder dat ik constant opnieuw de jobs data moet callen
  jobs.value = local.value
  console.log(jobs.value);

  setTimeout(() => {
    loading.value = true;
  }, 1000)
})

// Functions
function addToSearch() {
  filters.value = {
    search: zoekbalkInput.value,
    remote:
        locatieInput.value === 'all'
            ? 'all'
            : locatieInput.value === 'true'
  }

  handleSearch();
}

function handleSearch() {
  if (filters.value.remote === 'all' && filters.value.search === '') {
    jobs.value = local.value;
  } else {
    const zoekbalk = local.value.filter((job) => job.title.toLowerCase().includes(filters.value.search.toLowerCase()) || job.description.toLowerCase().includes(filters.value.search.toLowerCase()));
    const locatie = zoekbalk.filter((job) => job.isRemote === filters.value.remote || filters.value.remote === 'all');

    jobs.value = locatie;
  }
}

// Computed
const sorted = computed(() => {
  return [...jobs.value].sort(
      (a, b) => (b.client?.isPremium || false) - (a.client?.isPremium || false)
  );
})

const emptyReturn = computed(() => {
  if (jobs.value.length === 0) {
    return 'Geen opdrachten gevonden';
  }
})
</script>

<template>
  <navbar></navbar>
  <div v-if="!assignments" class="flex justify-center p-10 text-slate-700">
    <h1>Er is iets miss gegaan met het ophalen van de data</h1>
  </div>


  <div class="max-w-225 m-auto p-5">
    <h1 class="mb-6 text-slate-100 text-3xl font-bold">Opdrachten - Digital Project Managers</h1>
    <!--  zoekbalk  -->
    <div class="flex gap-3 mb-6 flex-wrap">
      <input
          class="flex-1 min-w-sm p-[10px_14px] border border-slate-700 rounded-md text-base bg-slate-900 text-slate-300"
          type="text" v-model="zoekbalkInput" placeholder="Zoek op titel of beschrijving...">
      <select class="p-[10px_14px] border border-slate-700 rounded-md bg-slate-900 text-base text-slate-300"
              v-model="locatieInput">
        <option value="all">Alle locaties</option>
        <option value="true">Alleen remote</option>
        <option value="false">Alleen on-site</option>
      </select>
      <button
          class="bg-orange-500 hover:bg-orange-600 transition-colors duration-200 text-white p-10-20 text-base cursor-pointer border-none rounded-md p-[10px_20px]"
          @click="addToSearch">Zoeken
      </button>
    </div>
    <!--  Loading  -->
    <div v-if="!loading" class="flex justify-center p-10 text-slate-500">
      <h1 class="flex items-center gap-3">Laden...
        <svg xmlns="http://www.w3.org/2000/svg" class="h-7" viewBox="0 0 200 200">
          <radialGradient id="a12" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)">
            <stop offset="0" stop-color="#E4E4E4"></stop>
            <stop offset=".3" stop-color="#E4E4E4" stop-opacity=".9"></stop>
            <stop offset=".6" stop-color="#E4E4E4" stop-opacity=".6"></stop>
            <stop offset=".8" stop-color="#E4E4E4" stop-opacity=".3"></stop>
            <stop offset="1" stop-color="#E4E4E4" stop-opacity="0"></stop>
          </radialGradient>
          <circle transform-origin="center" fill="none" stroke="url(#a12)" stroke-width="15" stroke-linecap="round"
                  stroke-dasharray="200 1000" stroke-dashoffset="0" cx="100" cy="100" r="70">
            <animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="2" values="360;0"
                              keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform>
          </circle>
          <circle transform-origin="center" fill="none" opacity=".2" stroke="#E4E4E4" stroke-width="15"
                  stroke-linecap="round" cx="100" cy="100" r="70"></circle>
        </svg>
      </h1>
    </div>

    <!-- Cards -->
    <div class="box-border m-0 p-0" v-else-if="loading">
      <div v-if="jobs.length >= 1">
        <div
            class="bg-slate-900 border border-slate-700 hover:border-slate-500 rounded-lg p-5 mb-4 transition-colors duration-200 cursor-pointer"
            v-for="job in sorted" :key="job.id">
          <NuxtLink :to="`/opdrachten/${job.title}`">
            <div class="grid grid-cols-2">
              <div>
                <h2 class="text-lg font-bold mb-2 text-slate-300">{{ job.title }}</h2>
              </div>
              <div>
                <h1 class="ml-75 text-slate-500">
                  {{ job.client.isPremium ? '⭐ Premium' : '' }}
                </h1>
              </div>
            </div>

            <div class="text-slate-500 text-base mb-2">
              {{ job.client.companyName }} <span>&#183;</span> {{ job.location || 'Geen Locatie' }} <span>&#183;</span>
              {{ job.hoursPerWeek }} uur/week <span>&#183;</span>
              {{ job.isRemote ? "Remote" : 'Onsite' }} <span>&#183;</span>
              €{{ job.hourlyRateMin }}-{{ job.hourlyRateMax }}/uur
            </div>
            <div class="text-slate-400 text-base leading-normal">
              {{ job.description }}
            </div>
            <div class="mt-2">
          <span v-for="skill in job.skills"
                class="bg-[rgba(255,103,21,0.15)] text-orange-500 m-1 p-[3px_10px] rounded-xl text-xs">{{
              skill.name
            }}</span>
            </div>
          </NuxtLink>
        </div>
      </div>
      <!-- Als zoek opdracht niks terug stuurt -->
      <div v-else class="flex justify-center p-10 text-slate-700">
        <h1>{{ emptyReturn }}</h1>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>