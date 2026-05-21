<script setup>
// Variables
const loading = ref(false);
const opdrachten = ref(false);
const dialogRef = ref(null);

const skillsamount = ref(1);
const toolsamount = ref(1);
const skillsarray = ref([]);
const toolsarray = ref([]);

const opgeslagenData = ref([]);

const activeTab = useState('activeTab', () => 'opdracht');

const rol = 'client'; // wordt vervangen met Auth0 rol

// Fetch
const fetchApi = async () => {
  try {
    const tools = await $fetch('http://localhost:4000/tools');

    const skills = await $fetch('http://localhost:4000/skills');

    toolsarray.value = tools;
    skillsarray.value = skills;
  } catch (e) {
    console.error(e);
  }
}

// functions
const openModal = () => {
  dialogRef.value.showModal(); // ?
}

const required = value => {
  if (value === false) return true;
  if (value === 0) return true;
  return !!value || 'Dit veld is verplicht';
}

const positive = value => {
  return Number(value) >= 0 || 'Waarde mag niet negatief zijn';
}

const onSubmit = async (values) => {
  if (rol !== 'admin' && rol !== 'client') return;

  const body = {
    client: { // client wordt later automatisch op basis van je account toegevoegd aan de opdracht die je aanmaakt
      companyName: 'TulipsoftTest',
      isPremium: Boolean(true), // Dit wordt ook besloten op basis van je account of je een abbo hebt of niet voor nu laat ik het op true
    },
    clientProfileId: '', // Clientid wordt meegegeven wanneer je inlogd met auth0
    siteId: '', // SiteId is een deel van de API (die ik niet kan delen dus daarom staat het leeg)
    title: values.positieTitel,
    description: values.positieBeschrijving,
    hourlyRateMin: Number(values.salarisMin),
    hourlyRateMax: Number(values.salarisMax),
    hoursPerWeek: Number(values.urenPerWeek),
    location: values.locatie,
    isRemote: Boolean(values.remote),
    startDate: values.datumStart,
    endDate: values.datumEnd,
    skillIds: values.skills?.filter(Boolean) || [], // zijn eigenlijk ids die worden meegegeven aan de api geldt ook voor tools
    skills: values.skills?.map((skill) => ({name: skill})) || [],
    toolIds: values.tools?.filter(Boolean) || [],
  }

  try {
    opgeslagenData.value.push(body); // probeer straks bowy om error message te testen
    opdrachten.value = true;
    openModal();
  } catch (e) {
    opdrachten.value = false;
    openModal();
    console.error(e);
  }
}

// onMounted
onMounted(() => {
  fetchApi();

  opgeslagenData.value = JSON.parse(localStorage.getItem('jobs')) || [];

  activeTab.value = "opdracht";

  setTimeout(() => {
    loading.value = true;
  }, 1000)
});

// computed
const dialogH1 = computed(() => {
  if (opdrachten.value === true) {
    return "Je opdracht is opgeslagen";
  } else {
    return "Er is wat mis gegaan tijdens het opslaan";
  }
})

const svgMsg = computed(() => opdrachten.value === true);

// watch
watch(opgeslagenData, (newVal, oldVal) => {
  localStorage.setItem('jobs', JSON.stringify(newVal));
}, {deep: true})
</script>

<template>
  <navbar></navbar>

  <div v-if="!loading" class="flex justify-center p-10 text-slate-500">
    <h1 class="flex items-center gap-3">Laden...
      <!--   spinner logo   -->
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

  <!-- form -->
  <div class="mx-auto w-full max-w-5xl p-4 sm:p-6" v-else>
    <h1 class="mb-6 text-2xl sm:text-3xl font-bold text-slate-100">
      Opdracht-plaatsen
    </h1>

    <Form
        @submit="onSubmit"
        :initial-values="{ remote: '', skills: [], tools: [] }"
        class="grid grid-cols-1 gap-5"
    >
      <div class="rounded-md bg-slate-900 p-4 sm:p-6 md:p-10 text-slate-300">
        <h2 class="mb-6 text-xl sm:text-2xl font-bold text-slate-100">
          Vacature informatie
        </h2>

        <label>* Positie titel:</label>
        <Field
            name="positieTitel"
            :rules="required"
            type="text"
            placeholder="Positie titel..."
            class="mt-2 w-full bg-slate-600 p-2"
        />
        <ErrorMessage name="positieTitel" class="mt-1 mb-3 block text-red-400"/>

        <label class="mt-5 block">* Beschrijving:</label>
        <Field
            name="positieBeschrijving"
            :rules="required"
            as="textarea"
            placeholder="Beschrijving..."
            class="mt-2 w-full bg-slate-600 p-2 min-h-28"
        />
        <ErrorMessage name="positieBeschrijving" class="mt-1 mb-3 block text-red-400"/>

        <label class="mt-5 block">Uren:</label>
        <div class="mt-5 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-10">
          <div>
            <label>* Min uurloon €:</label>
            <Field
                name="salarisMin"
                :rules="[required, positive]"
                type="number"
                placeholder="€30"
                class="mt-2 w-full bg-slate-600 p-2"
            />
            <ErrorMessage name="salarisMin" class="mt-1 block text-red-400"/>
          </div>

          <div>
            <label>* Max uurloon €:</label>
            <Field
                name="salarisMax"
                :rules="[required, positive]"
                type="number"
                placeholder="€35"
                class="mt-2 w-full bg-slate-600 p-2"
            />
            <ErrorMessage name="salarisMax" class="mt-1 block text-red-400"/>
          </div>

          <div>
            <label>* Uren per week:</label>
            <Field
                name="urenPerWeek"
                :rules="[required, positive]"
                type="number"
                placeholder="Uren"
                class="mt-2 w-full bg-slate-600 p-2"
            />
            <ErrorMessage name="urenPerWeek" class="mt-1 block text-red-400"/>
          </div>
        </div>

        <label class="mt-5 block">Locatie:</label>
        <div class="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
          <div>
            <label>* Stad / plaats:</label>
            <Field
                name="locatie"
                :rules="required"
                type="text"
                placeholder="Locatie"
                class="mt-2 w-full bg-slate-600 p-2"
            />
            <ErrorMessage name="locatie" class="mt-1 block text-red-400"/>
          </div>

          <div>
            <label>* Werkvorm:</label>
            <Field
                name="remote"
                :rules="required"
                as="select"
                class="mt-2 w-full bg-slate-600 p-2"
            >
              <option disabled value="">...</option>
              <option value="true">Remote</option>
              <option value="false">On-site</option>
            </Field>
            <ErrorMessage name="remote" class="mt-1 block text-red-400"/>
          </div>
        </div>

        <label class="mt-5 block">Datum:</label>
        <div class="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
          <div>
            <label>* Startdatum</label>
            <Field
                name="datumStart"
                :rules="required"
                type="date"
                class="mt-2 w-full bg-slate-600 p-2"
            />
            <ErrorMessage name="datumStart" class="mt-1 block text-red-400"/>
          </div>

          <div>
            <label>* Einddatum</label>
            <Field
                name="datumEnd"
                :rules="required"
                type="date"
                class="mt-2 w-full bg-slate-600 p-2"
            />
            <ErrorMessage name="datumEnd" class="mt-1 block text-red-400"/>
          </div>
        </div>

        <label class="mt-5 block">Skills/Tools:</label>
        <div class="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
          <div class="grid grid-cols-1 gap-3">
            <Field
                v-for="n in skillsamount"
                :key="`skill-${n}`"
                :name="`skills[${n - 1}]`"
                as="select"
                class="w-full bg-slate-600 p-2"
            >
              <option value="">Selecteer skill</option>
              <option
                  v-for="item in skillsarray"
                  :key="item.id"
                  :value="item.id"
              >
                {{ item.name }}
              </option>
            </Field>
          </div>

          <div class="grid grid-cols-1 gap-3">
            <Field
                v-for="n in toolsamount"
                :key="`tool-${n}`"
                :name="`tools[${n - 1}]`"
                as="select"
                class="w-full bg-slate-600 p-2"
            >
              <option value="">Selecteer tool</option>
              <option
                  v-for="item in toolsarray"
                  :key="item.id"
                  :value="item.id"
              >
                {{ item.name }}
              </option>
            </Field>
          </div>
        </div>

        <div class="mt-6 flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3">
          <button
              v-if="skillsamount > 1 && toolsamount > 1"
              type="button"
              @click="[skillsamount--, toolsamount--]"
              class="w-full sm:w-auto bg-slate-600 hover:bg-slate-700 transition-colors duration-200 text-white cursor-pointer border border-slate-950 px-5 py-2"
          >
            Verwijder skill/tool
          </button>

          <button
              type="button"
              @click="[skillsamount++, toolsamount++]"
              class="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 transition-colors duration-200 text-white cursor-pointer border border-slate-950 px-5 py-2"
          >
            Voeg skill/tool toe
          </button>
        </div>

        <button
            type="submit"
            class="mt-6 w-full sm:w-auto bg-orange-500 hover:bg-orange-600 transition-colors duration-200 text-white cursor-pointer border border-slate-950 px-5 py-2"
        >
          Submit
        </button>
      </div>
    </Form>
  </div>

  <!--  Dialog -->
  <dialog
      ref="dialogRef"
      class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
      w-[90%] max-w-md sm:w-full
      rounded-lg bg-slate-800 p-6 sm:p-10 text-white shadow-2xl border-none outline-none backdrop:bg-black/70 backdrop:backdrop-blur-sm"
  >
    <div class="grid grid-cols-1">
      <div class="flex justify-center items-center">
        <div v-if="svgMsg"
             class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20 text-green-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
               stroke="currentColor" class="w-8 h-8">
            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/>
          </svg>
        </div>

        <div v-else
             class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/20 text-red-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
               stroke="currentColor" class="w-8 h-8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </div>
      </div>

      <h1 class="flex justify-center text-2xl font-bold">{{ dialogH1 }}</h1>
      <NuxtLink to="/zoekfunctie" class="flex justify-center mt-4">
        <button
            class="m-2 bg-orange-500 hover:bg-orange-600 transition-colors duration-200 text-white text-base cursor-pointer border border-slate-950 p-[10px_20px] border rounded-md"
        >Home
        </button>
      </NuxtLink>
    </div>
  </dialog>
</template>

<style scoped>

</style>